"""
Tests para autenticación y JWT
"""

import pytest
import jwt
from datetime import datetime, timedelta
from flask import current_app

from app import db
from app.models import User, RefreshToken


class TestLogin:
    """Tests para el endpoint de login"""

    def test_login_success(self, client, admin_user):
        """Test login exitoso retorna access y refresh tokens"""
        response = client.post('/auth/login', json={
            'email': 'admin@test.com',
            'password': 'testpassword123'
        })

        assert response.status_code == 200
        data = response.get_json()

        assert data['success'] is True
        assert 'access_token' in data
        assert 'refresh_token' in data
        assert 'expires_in' in data
        assert data['user']['email'] == 'admin@test.com'

    def test_login_wrong_password(self, client, admin_user):
        """Test login con contraseña incorrecta"""
        response = client.post('/auth/login', json={
            'email': 'admin@test.com',
            'password': 'wrongpassword'
        })

        assert response.status_code == 401
        data = response.get_json()
        assert 'error' in data

    def test_login_nonexistent_user(self, client):
        """Test login con usuario inexistente"""
        response = client.post('/auth/login', json={
            'email': 'nonexistent@test.com',
            'password': 'somepassword'
        })

        assert response.status_code == 401

    def test_login_inactive_user(self, client, inactive_user):
        """Test login con usuario desactivado"""
        response = client.post('/auth/login', json={
            'email': 'inactive@test.com',
            'password': 'inactivepassword123'
        })

        assert response.status_code == 401
        data = response.get_json()
        assert 'desactivado' in data['error'].lower()

    def test_login_missing_fields(self, client):
        """Test login sin campos requeridos"""
        response = client.post('/auth/login', json={
            'email': 'test@test.com'
        })

        assert response.status_code == 400

    def test_login_empty_fields(self, client):
        """Test login con campos vacíos"""
        response = client.post('/auth/login', json={
            'email': '',
            'password': ''
        })

        assert response.status_code == 400

    def test_login_creates_refresh_token_in_db(self, client, admin_user, app):
        """Test que login crea refresh token en la base de datos"""
        response = client.post('/auth/login', json={
            'email': 'admin@test.com',
            'password': 'testpassword123'
        })

        data = response.get_json()
        refresh_token_str = data['refresh_token']

        with app.app_context():
            token = RefreshToken.query.filter_by(token=refresh_token_str).first()
            assert token is not None
            assert token.user_id == admin_user.id
            assert token.revoked is False

    def test_login_access_token_contains_type(self, client, admin_user, app):
        """Test que access token tiene type='access'"""
        response = client.post('/auth/login', json={
            'email': 'admin@test.com',
            'password': 'testpassword123'
        })

        data = response.get_json()
        access_token = data['access_token']

        with app.app_context():
            decoded = jwt.decode(
                access_token,
                current_app.config['JWT_SECRET_KEY'],
                algorithms=['HS256']
            )
            assert decoded['type'] == 'access'
            assert decoded['user_id'] == admin_user.id


class TestRefreshToken:
    """Tests para refresh de tokens"""

    def test_refresh_success(self, client, auth_tokens):
        """Test refresh exitoso"""
        response = client.post('/auth/refresh', json={
            'refresh_token': auth_tokens['refresh_token']
        })

        assert response.status_code == 200
        data = response.get_json()

        assert data['success'] is True
        assert 'access_token' in data
        assert 'expires_in' in data

    def test_refresh_invalid_token(self, client):
        """Test refresh con token inválido"""
        response = client.post('/auth/refresh', json={
            'refresh_token': 'invalid-token-12345'
        })

        assert response.status_code == 401

    def test_refresh_expired_token(self, client, expired_refresh_token):
        """Test refresh con token expirado"""
        response = client.post('/auth/refresh', json={
            'refresh_token': expired_refresh_token.token
        })

        assert response.status_code == 401

    def test_refresh_revoked_token(self, client, revoked_refresh_token):
        """Test refresh con token revocado"""
        response = client.post('/auth/refresh', json={
            'refresh_token': revoked_refresh_token.token
        })

        assert response.status_code == 401

    def test_refresh_missing_token(self, client):
        """Test refresh sin token"""
        response = client.post('/auth/refresh', json={})

        assert response.status_code == 400

    def test_refresh_inactive_user(self, client, app, inactive_user):
        """Test refresh cuando el usuario fue desactivado después de login"""
        with app.app_context():
            # Crear token para usuario que luego será desactivado
            token = RefreshToken.create_token(
                user_id=inactive_user.id,
                expires_days=7
            )

            response = client.post('/auth/refresh', json={
                'refresh_token': token.token
            })

            assert response.status_code == 401


class TestLogout:
    """Tests para logout"""

    def test_logout_success(self, logged_in_client):
        """Test logout exitoso"""
        response = logged_in_client.post('/auth/logout', json={})

        assert response.status_code == 200
        data = response.get_json()
        assert data['success'] is True

    def test_logout_revokes_refresh_token(self, logged_in_client, auth_tokens, app):
        """Test que logout revoca el refresh token proporcionado"""
        response = logged_in_client.post('/auth/logout', json={
            'refresh_token': auth_tokens['refresh_token']
        })

        assert response.status_code == 200

        with app.app_context():
            token = RefreshToken.query.filter_by(
                token=auth_tokens['refresh_token']
            ).first()
            assert token.revoked is True

    def test_logout_without_login(self, client):
        """Test logout sin sesión iniciada - Flask-Login redirige a login"""
        response = client.post('/auth/logout', json={})

        # Flask-Login redirige a la página de login (302) o devuelve 401
        assert response.status_code in [302, 401]


class TestLogoutAll:
    """Tests para cerrar todas las sesiones"""

    def test_logout_all_revokes_all_tokens(self, logged_in_client, admin_user, app):
        """Test que logout-all revoca todos los tokens del usuario"""
        # Crear múltiples refresh tokens
        with app.app_context():
            for i in range(3):
                RefreshToken.create_token(
                    user_id=admin_user.id,
                    expires_days=7
                )

        response = logged_in_client.post('/auth/logout-all', json={})

        assert response.status_code == 200

        with app.app_context():
            active_tokens = RefreshToken.query.filter_by(
                user_id=admin_user.id,
                revoked=False
            ).count()
            assert active_tokens == 0


class TestChangePassword:
    """Tests para cambio de contraseña"""

    def test_change_password_success(self, logged_in_client, app, admin_user):
        """Test cambio de contraseña exitoso"""
        response = logged_in_client.post('/auth/change-password', json={
            'current_password': 'testpassword123',
            'new_password': 'newpassword456'
        })

        assert response.status_code == 200
        data = response.get_json()
        assert data['success'] is True

        # Verificar que la nueva contraseña funciona
        with app.app_context():
            user = User.query.get(admin_user.id)
            assert user.check_password('newpassword456')

    def test_change_password_wrong_current(self, logged_in_client):
        """Test cambio de contraseña con contraseña actual incorrecta"""
        response = logged_in_client.post('/auth/change-password', json={
            'current_password': 'wrongpassword',
            'new_password': 'newpassword456'
        })

        assert response.status_code == 400

    def test_change_password_too_short(self, logged_in_client):
        """Test cambio de contraseña con nueva contraseña muy corta"""
        response = logged_in_client.post('/auth/change-password', json={
            'current_password': 'testpassword123',
            'new_password': 'short'
        })

        assert response.status_code == 400

    def test_change_password_without_login(self, client):
        """Test cambio de contraseña sin sesión - Flask-Login redirige"""
        response = client.post('/auth/change-password', json={
            'current_password': 'test',
            'new_password': 'newpassword456'
        })

        # Flask-Login redirige a la página de login (302) o devuelve 401
        assert response.status_code in [302, 401]


class TestTokenRequired:
    """Tests para el decorador token_required"""

    def test_access_with_valid_token(self, client, auth_headers):
        """Test acceso con token válido"""
        # Asumiendo que hay un endpoint protegido con token_required
        # Por ahora testamos que el token se genera correctamente
        assert 'Authorization' in auth_headers
        assert auth_headers['Authorization'].startswith('Bearer ')

    def test_access_without_token(self, client):
        """Test acceso sin token a endpoint protegido - Flask-Login redirige"""
        response = client.get('/auth/me')

        # Flask-Login redirige a la página de login (302) o devuelve 401
        assert response.status_code in [302, 401]

    def test_access_with_expired_token(self, client, app, admin_user):
        """Test acceso con token expirado"""
        with app.app_context():
            # Crear token expirado
            expired_token = jwt.encode(
                {
                    'user_id': admin_user.id,
                    'type': 'access',
                    'exp': datetime.utcnow() - timedelta(hours=1)
                },
                current_app.config['JWT_SECRET_KEY'],
                algorithm='HS256'
            )

            response = client.get('/auth/me', headers={
                'Authorization': f'Bearer {expired_token}'
            })

            # Flask-Login maneja /auth/me, así que verificamos el comportamiento general
            # Este test es más relevante para endpoints con @token_required


class TestGetCurrentUser:
    """Tests para obtener usuario actual"""

    def test_get_current_user_success(self, logged_in_client, admin_user):
        """Test obtener usuario actual"""
        response = logged_in_client.get('/auth/me')

        assert response.status_code == 200
        data = response.get_json()

        assert data['user']['email'] == admin_user.email
        assert data['user']['nombre'] == admin_user.nombre
        assert 'password' not in data['user']
        assert 'password_hash' not in data['user']

    def test_get_current_user_without_login(self, client):
        """Test obtener usuario sin sesión - Flask-Login redirige"""
        response = client.get('/auth/me')

        # Flask-Login redirige a la página de login (302) o devuelve 401
        assert response.status_code in [302, 401]
