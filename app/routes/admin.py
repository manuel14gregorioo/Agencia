"""
Admin Routes - Panel de administración
"""

from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from datetime import datetime, timedelta
from sqlalchemy import func

from app import db
from app.models.lead import Lead
from app.models.newsletter import NewsletterSubscriber
from app.models.analytics import AnalyticsEvent, PageView

admin_bp = Blueprint('admin', __name__)


def admin_required(f):
    """Decorador para verificar que el usuario es admin"""
    from functools import wraps

    @wraps(f)
    @login_required
    def decorated(*args, **kwargs):
        if not current_user.is_admin:
            return jsonify({'error': 'Acceso denegado'}), 403
        return f(*args, **kwargs)

    return decorated


# ============================================
# DASHBOARD / STATS
# ============================================

@admin_bp.route('/stats', methods=['GET'])
@admin_required
def get_stats():
    """Estadísticas del dashboard"""

    # Período (últimos 30 días por defecto)
    days = request.args.get('days', 30, type=int)
    start_date = datetime.utcnow() - timedelta(days=days)

    # Leads
    leads_total = Lead.query.count()
    leads_nuevos = Lead.query.filter(Lead.created_at >= start_date).count()
    leads_pendientes = Lead.query.filter(Lead.estado == 'nuevo').count()

    leads_por_estado = db.session.query(
        Lead.estado,
        func.count(Lead.id)
    ).group_by(Lead.estado).all()

    # Newsletter
    suscriptores_total = NewsletterSubscriber.query.filter_by(is_active=True).count()
    suscriptores_nuevos = NewsletterSubscriber.query.filter(
        NewsletterSubscriber.created_at >= start_date,
        NewsletterSubscriber.is_active == True
    ).count()

    # Analytics
    eventos_total = AnalyticsEvent.query.filter(
        AnalyticsEvent.timestamp >= start_date
    ).count()

    # Leads por día (últimos 7 días)
    leads_por_dia = db.session.query(
        func.date(Lead.created_at).label('fecha'),
        func.count(Lead.id).label('total')
    ).filter(
        Lead.created_at >= datetime.utcnow() - timedelta(days=7)
    ).group_by(
        func.date(Lead.created_at)
    ).order_by('fecha').all()

    return jsonify({
        'leads': {
            'total': leads_total,
            'nuevos_periodo': leads_nuevos,
            'pendientes': leads_pendientes,
            'por_estado': {estado: count for estado, count in leads_por_estado},
            'por_dia': [{'fecha': str(fecha), 'total': total} for fecha, total in leads_por_dia],
        },
        'newsletter': {
            'total_activos': suscriptores_total,
            'nuevos_periodo': suscriptores_nuevos,
        },
        'analytics': {
            'eventos_periodo': eventos_total,
        },
        'periodo_dias': days
    })


# ============================================
# LEADS
# ============================================

@admin_bp.route('/leads', methods=['GET'])
@admin_required
def list_leads():
    """Listar todos los leads con filtros y paginación"""

    # Parámetros
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    estado = request.args.get('estado')
    search = request.args.get('search', '').strip()
    order_by = request.args.get('order_by', 'created_at')
    order_dir = request.args.get('order_dir', 'desc')

    # Query base
    query = Lead.query

    # Filtros
    if estado:
        query = query.filter(Lead.estado == estado)

    if search:
        search_term = f"%{search}%"
        query = query.filter(
            db.or_(
                Lead.nombre.ilike(search_term),
                Lead.email.ilike(search_term),
                Lead.proyecto.ilike(search_term)
            )
        )

    # Ordenación
    order_column = getattr(Lead, order_by, Lead.created_at)
    if order_dir == 'desc':
        query = query.order_by(order_column.desc())
    else:
        query = query.order_by(order_column.asc())

    # Paginación
    pagination = query.paginate(page=page, per_page=per_page, error_out=False)

    return jsonify({
        'leads': [lead.to_dict() for lead in pagination.items],
        'total': pagination.total,
        'pages': pagination.pages,
        'current_page': page,
        'per_page': per_page,
        'has_next': pagination.has_next,
        'has_prev': pagination.has_prev,
    })


@admin_bp.route('/leads/<int:lead_id>', methods=['GET'])
@admin_required
def get_lead(lead_id):
    """Obtener detalle de un lead"""
    lead = Lead.query.get_or_404(lead_id)
    return jsonify(lead.to_dict(include_tracking=True))


@admin_bp.route('/leads/<int:lead_id>', methods=['PATCH'])
@admin_required
def update_lead(lead_id):
    """Actualizar un lead"""
    lead = Lead.query.get_or_404(lead_id)
    data = request.get_json()

    # Campos actualizables
    allowed_fields = ['estado', 'prioridad', 'notas', 'servicio_interes']

    for field in allowed_fields:
        if field in data:
            setattr(lead, field, data[field])

    # Si se marca como contactado, actualizar fecha
    if data.get('estado') == 'contactado' and lead.estado == 'nuevo':
        lead.contacted_at = datetime.utcnow()

    # Asignar a usuario
    if 'assigned_to_id' in data:
        lead.assigned_to_id = data['assigned_to_id']

    db.session.commit()

    return jsonify({
        'success': True,
        'lead': lead.to_dict()
    })


@admin_bp.route('/leads/<int:lead_id>', methods=['DELETE'])
@admin_required
def delete_lead(lead_id):
    """Eliminar un lead"""
    lead = Lead.query.get_or_404(lead_id)
    db.session.delete(lead)
    db.session.commit()

    return jsonify({'success': True, 'message': 'Lead eliminado'})


@admin_bp.route('/leads/bulk-update', methods=['POST'])
@admin_required
def bulk_update_leads():
    """Actualización masiva de leads"""
    data = request.get_json()

    lead_ids = data.get('lead_ids', [])
    updates = data.get('updates', {})

    if not lead_ids:
        return jsonify({'error': 'No se especificaron leads'}), 400

    leads = Lead.query.filter(Lead.id.in_(lead_ids)).all()

    for lead in leads:
        for field, value in updates.items():
            if hasattr(lead, field):
                setattr(lead, field, value)

    db.session.commit()

    return jsonify({
        'success': True,
        'updated_count': len(leads)
    })


# ============================================
# NEWSLETTER SUBSCRIBERS
# ============================================

@admin_bp.route('/subscribers', methods=['GET'])
@admin_required
def list_subscribers():
    """Listar suscriptores del newsletter"""

    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 50, type=int)
    active_only = request.args.get('active_only', 'true') == 'true'

    query = NewsletterSubscriber.query

    if active_only:
        query = query.filter_by(is_active=True)

    query = query.order_by(NewsletterSubscriber.created_at.desc())
    pagination = query.paginate(page=page, per_page=per_page, error_out=False)

    return jsonify({
        'subscribers': [sub.to_dict() for sub in pagination.items],
        'total': pagination.total,
        'pages': pagination.pages,
        'current_page': page,
    })


@admin_bp.route('/subscribers/export', methods=['GET'])
@admin_required
def export_subscribers():
    """Exportar emails de suscriptores activos"""

    subscribers = NewsletterSubscriber.query.filter_by(is_active=True).all()

    return jsonify({
        'emails': [sub.email for sub in subscribers],
        'count': len(subscribers)
    })


# ============================================
# ANALYTICS
# ============================================

@admin_bp.route('/analytics/events', methods=['GET'])
@admin_required
def list_events():
    """Listar eventos de analytics"""

    days = request.args.get('days', 7, type=int)
    event_name = request.args.get('event')

    start_date = datetime.utcnow() - timedelta(days=days)

    query = AnalyticsEvent.query.filter(AnalyticsEvent.timestamp >= start_date)

    if event_name:
        query = query.filter(AnalyticsEvent.event_name == event_name)

    # Agrupar por evento
    events_grouped = db.session.query(
        AnalyticsEvent.event_name,
        func.count(AnalyticsEvent.id)
    ).filter(
        AnalyticsEvent.timestamp >= start_date
    ).group_by(AnalyticsEvent.event_name).all()

    return jsonify({
        'events_by_type': {name: count for name, count in events_grouped},
        'periodo_dias': days
    })
