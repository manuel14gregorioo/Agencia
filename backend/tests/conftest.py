"""
Pytest Configuration and Shared Fixtures
"""

import pytest
from datetime import datetime, timedelta

from app import create_app, db
from app.models import User, Lead, NewsletterSubscriber, RefreshToken


@pytest.fixture(scope='function')
def app():
    """Crea instancia de la app para testing"""
    app = create_app('testing')

    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()


@pytest.fixture
def client(app):
    """Cliente de testing"""
    return app.test_client()


@pytest.fixture
def app_context(app):
    """Application context para tests que lo necesiten"""
    with app.app_context():
        yield app


@pytest.fixture
def admin_user(app):
    """Crea un usuario admin para testing"""
    with app.app_context():
        user = User(
            email='admin@test.com',
            nombre='Admin Test',
            is_admin=True,
            is_active=True
        )
        user.set_password('testpassword123')
        db.session.add(user)
        db.session.commit()

        # Refresh para obtener el ID
        db.session.refresh(user)
        yield user


@pytest.fixture
def regular_user(app):
    """Crea un usuario no-admin para testing"""
    with app.app_context():
        user = User(
            email='user@test.com',
            nombre='Regular User',
            is_admin=False,
            is_active=True
        )
        user.set_password('userpassword123')
        db.session.add(user)
        db.session.commit()

        db.session.refresh(user)
        yield user


@pytest.fixture
def inactive_user(app):
    """Crea un usuario inactivo para testing"""
    with app.app_context():
        user = User(
            email='inactive@test.com',
            nombre='Inactive User',
            is_admin=True,
            is_active=False
        )
        user.set_password('inactivepassword123')
        db.session.add(user)
        db.session.commit()

        db.session.refresh(user)
        yield user


@pytest.fixture
def auth_headers(client, admin_user):
    """Obtiene headers de autenticación para un admin"""
    response = client.post('/auth/login', json={
        'email': 'admin@test.com',
        'password': 'testpassword123'
    })
    data = response.get_json()
    access_token = data.get('access_token')

    return {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }


@pytest.fixture
def auth_tokens(client, admin_user):
    """Obtiene ambos tokens (access y refresh) para un admin"""
    response = client.post('/auth/login', json={
        'email': 'admin@test.com',
        'password': 'testpassword123'
    })
    data = response.get_json()

    return {
        'access_token': data.get('access_token'),
        'refresh_token': data.get('refresh_token'),
        'user': data.get('user')
    }


@pytest.fixture
def logged_in_client(client, admin_user):
    """Cliente con sesión iniciada (Flask-Login)"""
    client.post('/auth/login', json={
        'email': 'admin@test.com',
        'password': 'testpassword123'
    })
    return client


@pytest.fixture
def sample_lead(app):
    """Crea un lead de ejemplo"""
    with app.app_context():
        lead = Lead(
            nombre='Lead Test',
            email='lead@test.com',
            telefono='+34600000000',
            proyecto='Este es un proyecto de prueba con descripción suficiente para testing.',
            estado='nuevo',
            prioridad=0,  # 0=normal, 1=alta, 2=urgente
            servicio_interes='automatizacion'
        )
        db.session.add(lead)
        db.session.commit()

        db.session.refresh(lead)
        yield lead


@pytest.fixture
def multiple_leads(app):
    """Crea múltiples leads para testing de listados"""
    with app.app_context():
        leads = []
        estados = ['nuevo', 'contactado', 'en_proceso', 'propuesta', 'ganado']

        for i in range(10):
            lead = Lead(
                nombre=f'Lead {i}',
                email=f'lead{i}@test.com',
                proyecto=f'Proyecto de prueba número {i} con descripción suficiente.',
                estado=estados[i % len(estados)],
                prioridad=0  # 0=normal
            )
            db.session.add(lead)
            leads.append(lead)

        db.session.commit()

        for lead in leads:
            db.session.refresh(lead)

        yield leads


@pytest.fixture
def sample_subscriber(app):
    """Crea un suscriptor de ejemplo"""
    with app.app_context():
        subscriber = NewsletterSubscriber(
            email='subscriber@test.com',
            nombre='Test Subscriber',
            is_active=True
        )
        db.session.add(subscriber)
        db.session.commit()

        db.session.refresh(subscriber)
        yield subscriber


@pytest.fixture
def valid_refresh_token(app, admin_user):
    """Crea un refresh token válido"""
    with app.app_context():
        token = RefreshToken.create_token(
            user_id=admin_user.id,
            expires_days=7,
            user_agent='Test Agent',
            ip_address='127.0.0.1'
        )
        yield token


@pytest.fixture
def expired_refresh_token(app, admin_user):
    """Crea un refresh token expirado"""
    with app.app_context():
        token = RefreshToken(
            token='expired-test-token-12345',
            user_id=admin_user.id,
            expires_at=datetime.utcnow() - timedelta(days=1),  # Expirado
            revoked=False
        )
        db.session.add(token)
        db.session.commit()

        db.session.refresh(token)
        yield token


@pytest.fixture
def revoked_refresh_token(app, admin_user):
    """Crea un refresh token revocado"""
    with app.app_context():
        token = RefreshToken(
            token='revoked-test-token-12345',
            user_id=admin_user.id,
            expires_at=datetime.utcnow() + timedelta(days=7),
            revoked=True,
            revoked_at=datetime.utcnow()
        )
        db.session.add(token)
        db.session.commit()

        db.session.refresh(token)
        yield token
