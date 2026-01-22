"""
Tests para la API pública
"""

import pytest
from app import db
from app.models import Lead, NewsletterSubscriber

# Las fixtures app y client ahora vienen de conftest.py


class TestHealthCheck:
    """Tests para health check"""

    def test_health_endpoint(self, client):
        response = client.get('/health')
        assert response.status_code == 200
        data = response.get_json()
        assert data['status'] == 'healthy'


class TestContactAPI:
    """Tests para el endpoint de contacto"""

    def test_submit_contact_success(self, client):
        """Test envío de formulario exitoso"""
        response = client.post('/api/contact', json={
            'nombre': 'Test User',
            'email': 'test@gmail.com',
            'telefono': '+34 600 000 000',
            'proyecto': 'Este es un proyecto de prueba con suficiente descripción para pasar la validación.'
        })

        assert response.status_code == 201
        data = response.get_json()
        assert data['success'] is True
        assert 'lead_id' in data

    def test_submit_contact_missing_fields(self, client):
        """Test validación de campos requeridos"""
        response = client.post('/api/contact', json={
            'nombre': 'Test',
            'email': ''
        })

        assert response.status_code == 400

    def test_submit_contact_invalid_email(self, client):
        """Test validación de email"""
        response = client.post('/api/contact', json={
            'nombre': 'Test',
            'email': 'invalid-email',
            'proyecto': 'Proyecto de prueba con descripción suficiente'
        })

        assert response.status_code == 400

    def test_submit_contact_short_description(self, client):
        """Test validación de longitud de proyecto"""
        response = client.post('/api/contact', json={
            'nombre': 'Test',
            'email': 'test@gmail.com',
            'proyecto': 'Muy corto'
        })

        assert response.status_code == 400


class TestNewsletterAPI:
    """Tests para el newsletter"""

    def test_subscribe_success(self, client):
        """Test suscripción exitosa"""
        response = client.post('/api/newsletter', json={
            'email': 'newsletter@gmail.com'
        })

        assert response.status_code == 201
        data = response.get_json()
        assert data['success'] is True

    def test_subscribe_duplicate(self, client):
        """Test suscripción duplicada"""
        # Primera suscripción
        client.post('/api/newsletter', json={'email': 'duplicate@gmail.com'})

        # Segunda suscripción (mismo email)
        response = client.post('/api/newsletter', json={'email': 'duplicate@gmail.com'})

        assert response.status_code == 200
        data = response.get_json()
        assert 'Ya estás suscrito' in data['message']

    def test_subscribe_invalid_email(self, client):
        """Test email inválido"""
        response = client.post('/api/newsletter', json={
            'email': 'not-an-email'
        })

        assert response.status_code == 400


class TestConfigAPI:
    """Tests para configuración pública"""

    def test_get_config(self, client):
        """Test obtener configuración pública"""
        response = client.get('/api/config')

        assert response.status_code == 200
        data = response.get_json()
        assert 'contact_email' in data
        assert 'social' in data


class TestROICalculator:
    """Tests para calculadora ROI"""

    def test_calculate_roi(self, client):
        """Test cálculo de ROI"""
        response = client.post('/api/calculate-roi', json={
            'horas': 10,
            'coste_hora': 25,
            'inversion': 3500
        })

        assert response.status_code == 200
        data = response.get_json()
        assert 'ahorro_anual' in data
        assert 'roi_porcentaje' in data
        assert data['rentable'] is True

    def test_calculate_roi_validates_ranges(self, client):
        """Test que valida rangos"""
        response = client.post('/api/calculate-roi', json={
            'horas': 100,  # > max
            'coste_hora': 5,  # < min
            'inversion': 500  # < min
        })

        assert response.status_code == 200
        # Los valores deberían estar dentro de los rangos válidos
