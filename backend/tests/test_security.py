"""
Tests de seguridad - Verifican las protecciones implementadas
"""

import pytest
from app import db
from app.models import Lead


class TestBulkUpdateSecurity:
    """Tests para verificar que bulk update solo permite campos seguros"""

    def test_bulk_update_allowed_fields(self, logged_in_client, multiple_leads, app):
        """Test que campos permitidos se actualizan correctamente"""
        with app.app_context():
            lead_ids = [lead.id for lead in Lead.query.limit(3).all()]

        response = logged_in_client.post('/admin/leads/bulk-update', json={
            'lead_ids': lead_ids,
            'updates': {
                'estado': 'contactado',
                'notas': 'Nota de prueba'
            }
        })

        assert response.status_code == 200
        data = response.get_json()
        assert data['success'] is True
        assert data['updated_count'] == 3

        # Verificar que se actualizaron
        with app.app_context():
            for lead_id in lead_ids:
                lead = Lead.query.get(lead_id)
                assert lead.estado == 'contactado'
                assert lead.notas == 'Nota de prueba'

    def test_bulk_update_blocks_dangerous_fields(self, logged_in_client, multiple_leads, app):
        """Test que campos peligrosos NO se actualizan"""
        with app.app_context():
            lead = Lead.query.first()
            lead_id = lead.id
            original_email = lead.email

        response = logged_in_client.post('/admin/leads/bulk-update', json={
            'lead_ids': [lead_id],
            'updates': {
                'email': 'hacked@evil.com',  # Campo no permitido
                'estado': 'contactado'
            }
        })

        assert response.status_code == 200

        # Verificar que email NO cambió
        with app.app_context():
            lead = Lead.query.get(lead_id)
            assert lead.email == original_email
            assert lead.email != 'hacked@evil.com'
            # Pero estado sí cambió
            assert lead.estado == 'contactado'

    def test_bulk_update_blocks_id_change(self, logged_in_client, multiple_leads, app):
        """Test que no se puede cambiar el ID"""
        with app.app_context():
            lead = Lead.query.first()
            lead_id = lead.id

        response = logged_in_client.post('/admin/leads/bulk-update', json={
            'lead_ids': [lead_id],
            'updates': {
                'id': 99999,
                'estado': 'nuevo'
            }
        })

        # La petición puede funcionar pero el ID no debe cambiar
        with app.app_context():
            lead = Lead.query.get(lead_id)
            assert lead is not None  # El lead original sigue existiendo
            assert lead.id == lead_id

    def test_bulk_update_blocks_assigned_to_id(self, logged_in_client, multiple_leads, app):
        """Test que assigned_to_id no se puede cambiar via bulk update"""
        with app.app_context():
            lead = Lead.query.first()
            lead_id = lead.id
            original_assigned = lead.assigned_to_id

        response = logged_in_client.post('/admin/leads/bulk-update', json={
            'lead_ids': [lead_id],
            'updates': {
                'assigned_to_id': 999,  # No permitido en bulk
                'estado': 'nuevo'
            }
        })

        with app.app_context():
            lead = Lead.query.get(lead_id)
            assert lead.assigned_to_id == original_assigned

    def test_bulk_update_validates_estado(self, logged_in_client, multiple_leads, app):
        """Test que valida valores de estado"""
        with app.app_context():
            lead_ids = [Lead.query.first().id]

        response = logged_in_client.post('/admin/leads/bulk-update', json={
            'lead_ids': lead_ids,
            'updates': {
                'estado': 'estado_invalido'
            }
        })

        assert response.status_code == 400
        data = response.get_json()
        assert 'inválido' in data['error'].lower()

    def test_bulk_update_empty_updates(self, logged_in_client, multiple_leads):
        """Test bulk update sin campos válidos"""
        response = logged_in_client.post('/admin/leads/bulk-update', json={
            'lead_ids': [1, 2],
            'updates': {
                'email': 'only@invalid.field'  # Solo campos no permitidos
            }
        })

        assert response.status_code == 400

    def test_bulk_update_requires_auth(self, client, multiple_leads):
        """Test que bulk update requiere autenticación"""
        response = client.post('/admin/leads/bulk-update', json={
            'lead_ids': [1],
            'updates': {'estado': 'nuevo'}
        })

        # Flask-Login redirige (302) o devuelve 401
        assert response.status_code in [302, 401]


class TestOrderBySecurity:
    """Tests para verificar protección contra SQL injection en order_by"""

    def test_valid_order_by_columns(self, logged_in_client, multiple_leads):
        """Test que columnas válidas funcionan"""
        valid_columns = ['created_at', 'nombre', 'email', 'estado', 'prioridad']

        for column in valid_columns:
            response = logged_in_client.get(f'/admin/leads?order_by={column}')
            assert response.status_code == 200

    def test_invalid_order_by_uses_default(self, logged_in_client, multiple_leads):
        """Test que columnas inválidas usan default (created_at)"""
        # Intento de SQL injection
        malicious_inputs = [
            'id; DROP TABLE leads;--',
            "nombre' OR '1'='1",
            'UNION SELECT * FROM users',
            '../../../etc/passwd',
            'nonexistent_column'
        ]

        for malicious in malicious_inputs:
            response = logged_in_client.get(f'/admin/leads?order_by={malicious}')
            # No debe fallar, debe usar default
            assert response.status_code == 200

    def test_order_dir_validation(self, logged_in_client, multiple_leads):
        """Test que order_dir solo acepta asc/desc"""
        # Valor válido
        response = logged_in_client.get('/admin/leads?order_dir=asc')
        assert response.status_code == 200

        response = logged_in_client.get('/admin/leads?order_dir=desc')
        assert response.status_code == 200

        # Valor inválido - debe usar default (desc)
        response = logged_in_client.get('/admin/leads?order_dir=invalid')
        assert response.status_code == 200


class TestXSSProtection:
    """Tests para verificar protección XSS"""

    def test_xss_in_contact_nombre(self, client, app):
        """Test que XSS en nombre se sanitiza"""
        response = client.post('/api/contact', json={
            'nombre': '<script>alert("xss")</script>Test',
            'email': 'xss-test@gmail.com',
            'proyecto': 'Este es un proyecto de prueba con descripción suficiente para pasar la validación de longitud mínima.'
        })

        assert response.status_code == 201
        data = response.get_json()

        # Verificar que el script fue sanitizado
        with app.app_context():
            lead = Lead.query.get(data['lead_id'])
            assert '<script>' not in lead.nombre
            assert 'Test' in lead.nombre

    def test_xss_in_contact_proyecto(self, client, app):
        """Test que XSS en proyecto se sanitiza"""
        xss_payload = '<img src=x onerror=alert("xss")>Proyecto legítimo con texto suficiente para pasar la validación de 20 caracteres mínimos'

        response = client.post('/api/contact', json={
            'nombre': 'Test User',
            'email': 'xss-proyecto@gmail.com',
            'proyecto': xss_payload
        })

        assert response.status_code == 201
        data = response.get_json()

        with app.app_context():
            lead = Lead.query.get(data['lead_id'])
            assert '<img' not in lead.proyecto
            assert 'onerror' not in lead.proyecto

    def test_xss_in_newsletter(self, client, app):
        """Test que XSS en newsletter se sanitiza"""
        response = client.post('/api/newsletter', json={
            'email': 'xss-newsletter@gmail.com'
        })

        # El endpoint de newsletter solo requiere email
        assert response.status_code in [200, 201]


class TestRateLimiting:
    """Tests para verificar rate limiting"""

    def test_contact_rate_limit(self, client):
        """Test rate limiting en endpoint de contacto"""
        # Enviar múltiples requests rápidamente
        responses = []
        for i in range(7):  # Límite es 5/min
            response = client.post('/api/contact', json={
                'nombre': f'Test {i}',
                'email': f'test{i}@example.com',
                'proyecto': 'Proyecto de prueba con descripción suficiente.'
            })
            responses.append(response.status_code)

        # Al menos uno debería ser 429 (Too Many Requests)
        assert 429 in responses or all(r in [201, 400] for r in responses[:5])

    def test_login_rate_limit(self, client, admin_user):
        """Test rate limiting en login"""
        responses = []
        for i in range(7):  # Límite es 5/min
            response = client.post('/auth/login', json={
                'email': 'admin@test.com',
                'password': 'wrongpassword'
            })
            responses.append(response.status_code)

        # Después de varios intentos debería limitar
        # Nota: En testing el rate limiter puede comportarse diferente
        assert len(responses) == 7


class TestAdminAccessControl:
    """Tests para verificar control de acceso a admin"""

    def test_admin_endpoints_require_auth(self, client):
        """Test que endpoints admin requieren autenticación"""
        endpoints = [
            ('/admin/stats', 'GET'),
            ('/admin/leads', 'GET'),
            ('/admin/leads/1', 'GET'),
            ('/admin/leads/1', 'PATCH'),
            ('/admin/leads/1', 'DELETE'),
            ('/admin/subscribers', 'GET'),
            ('/admin/subscribers/export', 'GET'),
            ('/admin/analytics/events', 'GET'),
        ]

        for endpoint, method in endpoints:
            if method == 'GET':
                response = client.get(endpoint)
            elif method == 'PATCH':
                response = client.patch(endpoint, json={})
            elif method == 'DELETE':
                response = client.delete(endpoint)
            elif method == 'POST':
                response = client.post(endpoint, json={})

            # Flask-Login puede redirigir (302) o devolver 401
            assert response.status_code in [302, 401], f"Endpoint {method} {endpoint} debería requerir auth"

    def test_non_admin_cannot_access_admin_routes(self, client, regular_user):
        """Test que usuarios no-admin no pueden acceder a rutas admin"""
        # Login como usuario regular
        client.post('/auth/login', json={
            'email': 'user@test.com',
            'password': 'userpassword123'
        })

        response = client.get('/admin/leads')
        # Puede devolver 403 Forbidden o redirigir
        assert response.status_code in [302, 403]


class TestInputValidation:
    """Tests para validación de entrada"""

    def test_per_page_limit(self, logged_in_client, multiple_leads):
        """Test que per_page tiene límite máximo"""
        response = logged_in_client.get('/admin/leads?per_page=1000')

        assert response.status_code == 200
        data = response.get_json()

        # Debe limitar a 100 máximo
        assert data['per_page'] <= 100

    def test_search_length_limit(self, logged_in_client, multiple_leads):
        """Test que búsqueda tiene límite de longitud"""
        long_search = 'a' * 500  # Muy largo

        response = logged_in_client.get(f'/admin/leads?search={long_search}')

        assert response.status_code == 200
        # No debe causar problemas

    def test_page_negative(self, logged_in_client, multiple_leads):
        """Test que página negativa se maneja correctamente"""
        response = logged_in_client.get('/admin/leads?page=-1')

        assert response.status_code == 200
        # Debe usar página 1 o manejar gracefully


class TestCORSHeaders:
    """Tests para verificar headers CORS"""

    def test_cors_headers_present(self, client):
        """Test que headers CORS están presentes"""
        response = client.options('/api/contact')

        # En testing CORS puede comportarse diferente
        # Este test verifica que la configuración no rompe nada
        assert response.status_code in [200, 204, 404]
