"""
Tests para modelos de base de datos
"""

import pytest
from datetime import datetime, timedelta

from app import db
from app.models import User, Lead, NewsletterSubscriber, RefreshToken


class TestUserModel:
    """Tests para el modelo User"""

    def test_create_user(self, app):
        """Test crear usuario"""
        with app.app_context():
            user = User(
                email='newuser@test.com',
                nombre='New User',
                is_admin=False
            )
            user.set_password('securepassword123')
            db.session.add(user)
            db.session.commit()

            assert user.id is not None
            assert user.email == 'newuser@test.com'
            assert user.is_active is True

    def test_password_hashing(self, app):
        """Test que la contraseña se hashea correctamente"""
        with app.app_context():
            user = User(email='hash@test.com', nombre='Hash Test')
            user.set_password('mypassword123')

            # La contraseña no se guarda en texto plano
            assert user.password_hash != 'mypassword123'
            # Pero se puede verificar
            assert user.check_password('mypassword123') is True
            assert user.check_password('wrongpassword') is False

    def test_password_hash_unique(self, app):
        """Test que el mismo password genera hashes diferentes (salt)"""
        with app.app_context():
            user1 = User(email='user1@test.com', nombre='User 1')
            user1.set_password('samepassword')

            user2 = User(email='user2@test.com', nombre='User 2')
            user2.set_password('samepassword')

            # Mismo password, diferentes hashes (por el salt)
            assert user1.password_hash != user2.password_hash

    def test_to_dict_excludes_sensitive_data(self, admin_user, app):
        """Test que to_dict no incluye datos sensibles"""
        with app.app_context():
            user = User.query.get(admin_user.id)
            user_dict = user.to_dict()

            assert 'password' not in user_dict
            assert 'password_hash' not in user_dict
            assert 'email' in user_dict
            assert 'nombre' in user_dict

    def test_update_last_login(self, admin_user, app):
        """Test actualización de último login"""
        with app.app_context():
            user = User.query.get(admin_user.id)
            old_login = user.last_login

            user.update_last_login()

            assert user.last_login is not None
            if old_login:
                assert user.last_login >= old_login

    def test_email_unique_constraint(self, admin_user, app):
        """Test que email es único"""
        with app.app_context():
            duplicate = User(
                email='admin@test.com',  # Mismo email que admin_user
                nombre='Duplicate'
            )
            duplicate.set_password('password123')
            db.session.add(duplicate)

            with pytest.raises(Exception):  # IntegrityError
                db.session.commit()


class TestLeadModel:
    """Tests para el modelo Lead"""

    def test_create_lead(self, app):
        """Test crear lead"""
        with app.app_context():
            lead = Lead(
                nombre='Test Lead',
                email='lead@test.com',
                proyecto='Descripción del proyecto de prueba'
            )
            db.session.add(lead)
            db.session.commit()

            assert lead.id is not None
            assert lead.estado == 'nuevo'  # Default
            assert lead.created_at is not None

    def test_lead_default_values(self, app):
        """Test valores por defecto del lead"""
        with app.app_context():
            lead = Lead(
                nombre='Default Test',
                email='default@test.com',
                proyecto='Proyecto test'
            )
            db.session.add(lead)
            db.session.commit()

            assert lead.estado == 'nuevo'
            assert lead.prioridad == 0  # 0=normal, 1=alta, 2=urgente
            assert lead.fuente == 'landing'

    def test_lead_to_dict(self, sample_lead, app):
        """Test serialización de lead"""
        with app.app_context():
            lead = Lead.query.get(sample_lead.id)
            lead_dict = lead.to_dict()

            assert 'id' in lead_dict
            assert 'nombre' in lead_dict
            assert 'email' in lead_dict
            assert 'estado' in lead_dict
            assert 'created_at' in lead_dict

    def test_lead_to_dict_with_tracking(self, sample_lead, app):
        """Test serialización con datos de tracking"""
        with app.app_context():
            lead = Lead.query.get(sample_lead.id)
            lead.ip_address = '192.168.1.1'
            lead.user_agent = 'Test Browser'
            db.session.commit()

            lead_dict = lead.to_dict(include_tracking=True)

            assert 'ip_address' in lead_dict
            assert 'user_agent' in lead_dict

    def test_lead_estados(self, app):
        """Test diferentes estados de lead"""
        estados = ['nuevo', 'contactado', 'en_proceso', 'propuesta', 'ganado', 'perdido', 'descartado']

        with app.app_context():
            for estado in estados:
                lead = Lead(
                    nombre=f'Lead {estado}',
                    email=f'{estado}@test.com',
                    proyecto='Test proyecto',
                    estado=estado
                )
                db.session.add(lead)

            db.session.commit()

            for estado in estados:
                lead = Lead.query.filter_by(estado=estado).first()
                assert lead is not None


class TestRefreshTokenModel:
    """Tests para el modelo RefreshToken"""

    def test_create_token(self, admin_user, app):
        """Test crear refresh token"""
        with app.app_context():
            token = RefreshToken.create_token(
                user_id=admin_user.id,
                expires_days=7
            )

            assert token.id is not None
            assert token.token is not None
            assert len(token.token) > 50  # Token suficientemente largo
            assert token.revoked is False
            assert token.expires_at > datetime.utcnow()

    def test_token_uniqueness(self, admin_user, app):
        """Test que cada token es único"""
        with app.app_context():
            tokens = set()
            for _ in range(10):
                token = RefreshToken.create_token(user_id=admin_user.id)
                tokens.add(token.token)

            # Todos los tokens deben ser únicos
            assert len(tokens) == 10

    def test_get_valid_token(self, valid_refresh_token, app):
        """Test obtener token válido"""
        with app.app_context():
            token = RefreshToken.get_valid_token(valid_refresh_token.token)

            assert token is not None
            assert token.id == valid_refresh_token.id

    def test_get_valid_token_expired(self, expired_refresh_token, app):
        """Test que token expirado no se obtiene"""
        with app.app_context():
            token = RefreshToken.get_valid_token(expired_refresh_token.token)

            assert token is None

    def test_get_valid_token_revoked(self, revoked_refresh_token, app):
        """Test que token revocado no se obtiene"""
        with app.app_context():
            token = RefreshToken.get_valid_token(revoked_refresh_token.token)

            assert token is None

    def test_revoke_token(self, valid_refresh_token, app):
        """Test revocar token"""
        with app.app_context():
            token = RefreshToken.query.get(valid_refresh_token.id)
            token.revoke()

            assert token.revoked is True
            assert token.revoked_at is not None

    def test_revoke_all_user_tokens(self, admin_user, app):
        """Test revocar todos los tokens de un usuario"""
        with app.app_context():
            # Crear varios tokens
            for _ in range(5):
                RefreshToken.create_token(user_id=admin_user.id)

            # Revocar todos
            RefreshToken.revoke_all_user_tokens(admin_user.id)

            # Verificar que todos están revocados
            active_count = RefreshToken.query.filter_by(
                user_id=admin_user.id,
                revoked=False
            ).count()

            assert active_count == 0

    def test_is_valid_method(self, app, admin_user):
        """Test método is_valid"""
        with app.app_context():
            # Token válido
            valid = RefreshToken.create_token(user_id=admin_user.id)
            assert valid.is_valid() is True

            # Token revocado
            valid.revoke()
            assert valid.is_valid() is False

    def test_cleanup_expired_tokens(self, app, admin_user):
        """Test limpieza de tokens expirados"""
        with app.app_context():
            # Crear token expirado
            expired = RefreshToken(
                token='cleanup-test-token',
                user_id=admin_user.id,
                expires_at=datetime.utcnow() - timedelta(days=1)
            )
            db.session.add(expired)
            db.session.commit()

            expired_id = expired.id

            # Limpiar
            RefreshToken.cleanup_expired_tokens()

            # Verificar que se eliminó
            token = RefreshToken.query.get(expired_id)
            assert token is None

    def test_token_stores_metadata(self, admin_user, app):
        """Test que el token guarda metadata"""
        with app.app_context():
            token = RefreshToken.create_token(
                user_id=admin_user.id,
                user_agent='Mozilla/5.0 Test Browser',
                ip_address='192.168.1.100'
            )

            assert token.user_agent == 'Mozilla/5.0 Test Browser'
            assert token.ip_address == '192.168.1.100'


class TestNewsletterSubscriberModel:
    """Tests para el modelo NewsletterSubscriber"""

    def test_create_subscriber(self, app):
        """Test crear suscriptor"""
        with app.app_context():
            subscriber = NewsletterSubscriber(
                email='new@subscriber.com',
                nombre='New Subscriber'
            )
            db.session.add(subscriber)
            db.session.commit()

            assert subscriber.id is not None
            assert subscriber.is_active is True

    def test_subscriber_to_dict(self, sample_subscriber, app):
        """Test serialización de suscriptor"""
        with app.app_context():
            subscriber = NewsletterSubscriber.query.get(sample_subscriber.id)
            sub_dict = subscriber.to_dict()

            assert 'email' in sub_dict
            assert 'is_active' in sub_dict
            assert 'created_at' in sub_dict

    def test_email_unique(self, sample_subscriber, app):
        """Test que email es único"""
        with app.app_context():
            duplicate = NewsletterSubscriber(
                email='subscriber@test.com'  # Mismo que sample_subscriber
            )
            db.session.add(duplicate)

            with pytest.raises(Exception):
                db.session.commit()
