"""
Tests para endpoints de administración
"""

import pytest
from app import db
from app.models import Lead, NewsletterSubscriber


class TestAdminStats:
    """Tests para estadísticas del dashboard"""

    def test_get_stats(self, logged_in_client, multiple_leads):
        """Test obtener estadísticas"""
        response = logged_in_client.get('/admin/stats')

        assert response.status_code == 200
        data = response.get_json()

        assert 'leads' in data
        assert 'newsletter' in data
        assert 'analytics' in data
        assert data['leads']['total'] >= 10

    def test_get_stats_with_days_param(self, logged_in_client, multiple_leads):
        """Test estadísticas con parámetro de días"""
        response = logged_in_client.get('/admin/stats?days=7')

        assert response.status_code == 200
        data = response.get_json()
        assert data['periodo_dias'] == 7

    def test_get_stats_requires_admin(self, client, regular_user):
        """Test que estadísticas requieren ser admin"""
        client.post('/auth/login', json={
            'email': 'user@test.com',
            'password': 'userpassword123'
        })

        response = client.get('/admin/stats')
        assert response.status_code == 403


class TestAdminLeads:
    """Tests para gestión de leads"""

    def test_list_leads(self, logged_in_client, multiple_leads):
        """Test listar leads"""
        response = logged_in_client.get('/admin/leads')

        assert response.status_code == 200
        data = response.get_json()

        assert 'leads' in data
        assert 'total' in data
        assert 'pages' in data
        assert len(data['leads']) > 0

    def test_list_leads_pagination(self, logged_in_client, multiple_leads):
        """Test paginación de leads"""
        response = logged_in_client.get('/admin/leads?page=1&per_page=5')

        assert response.status_code == 200
        data = response.get_json()

        assert len(data['leads']) <= 5
        assert data['per_page'] == 5
        assert data['current_page'] == 1

    def test_list_leads_filter_by_estado(self, logged_in_client, multiple_leads):
        """Test filtrar leads por estado"""
        response = logged_in_client.get('/admin/leads?estado=nuevo')

        assert response.status_code == 200
        data = response.get_json()

        # Todos los leads retornados deben tener estado 'nuevo'
        for lead in data['leads']:
            assert lead['estado'] == 'nuevo'

    def test_list_leads_search(self, logged_in_client, multiple_leads):
        """Test búsqueda de leads"""
        response = logged_in_client.get('/admin/leads?search=Lead')

        assert response.status_code == 200
        data = response.get_json()
        assert len(data['leads']) > 0

    def test_list_leads_order_by(self, logged_in_client, multiple_leads):
        """Test ordenación de leads"""
        # Orden ascendente
        response = logged_in_client.get('/admin/leads?order_by=nombre&order_dir=asc')
        assert response.status_code == 200
        data = response.get_json()

        if len(data['leads']) > 1:
            nombres = [l['nombre'] for l in data['leads']]
            assert nombres == sorted(nombres)

    def test_get_lead_detail(self, logged_in_client, sample_lead):
        """Test obtener detalle de lead"""
        response = logged_in_client.get(f'/admin/leads/{sample_lead.id}')

        assert response.status_code == 200
        data = response.get_json()

        assert data['id'] == sample_lead.id
        assert data['email'] == sample_lead.email

    def test_get_lead_not_found(self, logged_in_client):
        """Test lead no encontrado"""
        response = logged_in_client.get('/admin/leads/99999')

        assert response.status_code == 404

    def test_update_lead(self, logged_in_client, sample_lead, app):
        """Test actualizar lead"""
        response = logged_in_client.patch(
            f'/admin/leads/{sample_lead.id}',
            json={
                'estado': 'contactado',
                'notas': 'Lead contactado por teléfono'
            }
        )

        assert response.status_code == 200
        data = response.get_json()

        assert data['success'] is True
        assert data['lead']['estado'] == 'contactado'
        assert data['lead']['notas'] == 'Lead contactado por teléfono'

    def test_update_lead_contacted_sets_date(self, logged_in_client, app):
        """Test que al marcar como contactado desde 'nuevo' se guarda la fecha"""
        # Crear un lead con estado 'nuevo'
        with app.app_context():
            lead = Lead(
                nombre='Contact Test',
                email='contact-test@gmail.com',
                proyecto='Proyecto para probar contacted_at',
                estado='nuevo'
            )
            db.session.add(lead)
            db.session.commit()
            lead_id = lead.id

        response = logged_in_client.patch(
            f'/admin/leads/{lead_id}',
            json={'estado': 'contactado'}
        )

        assert response.status_code == 200

        with app.app_context():
            lead = Lead.query.get(lead_id)
            assert lead.contacted_at is not None

    def test_delete_lead(self, logged_in_client, sample_lead, app):
        """Test eliminar lead"""
        lead_id = sample_lead.id

        response = logged_in_client.delete(f'/admin/leads/{lead_id}')

        assert response.status_code == 200
        data = response.get_json()
        assert data['success'] is True

        # Verificar que se eliminó
        with app.app_context():
            lead = Lead.query.get(lead_id)
            assert lead is None

    def test_delete_lead_not_found(self, logged_in_client):
        """Test eliminar lead inexistente"""
        response = logged_in_client.delete('/admin/leads/99999')

        assert response.status_code == 404


class TestAdminBulkOperations:
    """Tests para operaciones masivas"""

    def test_bulk_update_success(self, logged_in_client, multiple_leads, app):
        """Test actualización masiva exitosa"""
        with app.app_context():
            lead_ids = [l.id for l in Lead.query.limit(3).all()]

        response = logged_in_client.post('/admin/leads/bulk-update', json={
            'lead_ids': lead_ids,
            'updates': {'estado': 'en_proceso'}
        })

        assert response.status_code == 200
        data = response.get_json()
        assert data['updated_count'] == 3

    def test_bulk_update_empty_ids(self, logged_in_client):
        """Test bulk update sin IDs"""
        response = logged_in_client.post('/admin/leads/bulk-update', json={
            'lead_ids': [],
            'updates': {'estado': 'nuevo'}
        })

        assert response.status_code == 400

    def test_bulk_update_nonexistent_ids(self, logged_in_client):
        """Test bulk update con IDs inexistentes"""
        response = logged_in_client.post('/admin/leads/bulk-update', json={
            'lead_ids': [99998, 99999],
            'updates': {'estado': 'nuevo'}
        })

        assert response.status_code == 200
        data = response.get_json()
        assert data['updated_count'] == 0


class TestAdminSubscribers:
    """Tests para gestión de suscriptores"""

    def test_list_subscribers(self, logged_in_client, sample_subscriber):
        """Test listar suscriptores"""
        response = logged_in_client.get('/admin/subscribers')

        assert response.status_code == 200
        data = response.get_json()

        assert 'subscribers' in data
        assert 'total' in data

    def test_list_subscribers_active_only(self, logged_in_client, app):
        """Test listar solo suscriptores activos"""
        with app.app_context():
            # Crear suscriptor inactivo
            inactive = NewsletterSubscriber(
                email='inactive@sub.com',
                is_active=False
            )
            db.session.add(inactive)
            db.session.commit()

        response = logged_in_client.get('/admin/subscribers?active_only=true')

        assert response.status_code == 200
        data = response.get_json()

        for sub in data['subscribers']:
            assert sub['is_active'] is True

    def test_export_subscribers(self, logged_in_client, sample_subscriber):
        """Test exportar suscriptores"""
        response = logged_in_client.get('/admin/subscribers/export')

        assert response.status_code == 200
        data = response.get_json()

        assert 'emails' in data
        assert 'count' in data
        assert isinstance(data['emails'], list)


class TestAdminAnalytics:
    """Tests para analytics"""

    def test_list_events(self, logged_in_client):
        """Test listar eventos"""
        response = logged_in_client.get('/admin/analytics/events')

        assert response.status_code == 200
        data = response.get_json()

        assert 'events_by_type' in data
        assert 'periodo_dias' in data

    def test_list_events_with_days(self, logged_in_client):
        """Test eventos con parámetro de días"""
        response = logged_in_client.get('/admin/analytics/events?days=14')

        assert response.status_code == 200
        data = response.get_json()
        assert data['periodo_dias'] == 14


class TestAdminErrorHandling:
    """Tests para manejo de errores en admin"""

    def test_invalid_json(self, logged_in_client, sample_lead):
        """Test con JSON inválido"""
        response = logged_in_client.patch(
            f'/admin/leads/{sample_lead.id}',
            data='not valid json',
            content_type='application/json'
        )

        # Debe manejar el error gracefully
        assert response.status_code in [400, 500]

    def test_missing_content_type(self, logged_in_client, sample_lead):
        """Test sin content-type"""
        response = logged_in_client.patch(
            f'/admin/leads/{sample_lead.id}',
            data='{"estado": "nuevo"}'
        )

        # Flask debería manejar esto
        assert response.status_code in [200, 400, 415]
