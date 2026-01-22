"""
API Routes - Endpoints públicos para el frontend
"""

from flask import Blueprint, request, jsonify, current_app
from email_validator import validate_email, EmailNotValidError
import bleach

from app import db, limiter
from app.models.lead import Lead
from app.models.newsletter import NewsletterSubscriber
from app.models.analytics import AnalyticsEvent
from app.services.email_service import send_lead_notification, send_lead_confirmation

api_bp = Blueprint('api', __name__)


# ============================================
# SANITIZACIÓN HTML (prevención XSS)
# ============================================

def sanitize_html(text, max_length=None):
    """
    Elimina todo HTML/scripts del texto para prevenir XSS.
    Solo permite texto plano.
    """
    if not text:
        return text

    # Eliminar todas las etiquetas HTML
    cleaned = bleach.clean(text, tags=[], attributes={}, strip=True)

    # Limitar longitud si se especifica
    if max_length and len(cleaned) > max_length:
        cleaned = cleaned[:max_length]

    return cleaned.strip()


# ============================================
# CONTACTO / LEADS
# ============================================

@api_bp.route('/contact', methods=['POST'])
@limiter.limit("5 per minute")
def submit_contact():
    """
    Endpoint para el formulario de contacto
    Crea un nuevo lead y envía notificaciones
    """
    data = request.get_json()

    # Validar campos requeridos
    required_fields = ['nombre', 'email', 'proyecto']
    for field in required_fields:
        if not data.get(field):
            return jsonify({'error': f'El campo {field} es obligatorio'}), 400

    # Validar email
    try:
        valid = validate_email(data['email'])
        email = valid.email
    except EmailNotValidError as e:
        return jsonify({'error': 'Email no válido'}), 400

    # Validar longitud del proyecto
    if len(data['proyecto'].strip()) < 20:
        return jsonify({'error': 'Por favor, describe tu proyecto con más detalle'}), 400

    # Obtener datos de tracking
    ip_address = request.headers.get('X-Forwarded-For', request.remote_addr)
    user_agent = request.headers.get('User-Agent', '')[:500]
    referrer = request.headers.get('Referer', '')[:500]

    # Crear lead (con sanitización HTML para prevenir XSS)
    lead = Lead(
        nombre=sanitize_html(data['nombre'], max_length=100),
        email=email,
        telefono=sanitize_html(data.get('telefono', ''), max_length=20) or None,
        proyecto=sanitize_html(data['proyecto'], max_length=2000),
        servicio_interes=sanitize_html(data.get('servicio'), max_length=50),
        fuente='landing',
        ip_address=ip_address,
        user_agent=user_agent,
        referrer=referrer,
        utm_source=sanitize_html(data.get('utm_source'), max_length=100),
        utm_medium=sanitize_html(data.get('utm_medium'), max_length=100),
        utm_campaign=sanitize_html(data.get('utm_campaign'), max_length=100),
    )

    db.session.add(lead)
    db.session.commit()

    # Enviar notificaciones por email (async en producción)
    try:
        send_lead_notification(lead)
        send_lead_confirmation(lead)
    except Exception as e:
        current_app.logger.error(f"Error sending emails: {e}")

    return jsonify({
        'success': True,
        'message': 'Mensaje recibido. Te responderemos en menos de 24 horas.',
        'lead_id': lead.id
    }), 201


# ============================================
# NEWSLETTER
# ============================================

@api_bp.route('/newsletter', methods=['POST'])
@limiter.limit("3 per minute")
def subscribe_newsletter():
    """Suscripción al newsletter"""
    data = request.get_json()

    email = data.get('email', '').strip()
    if not email:
        return jsonify({'error': 'El email es obligatorio'}), 400

    # Validar email
    try:
        valid = validate_email(email)
        email = valid.email
    except EmailNotValidError:
        return jsonify({'error': 'Email no válido'}), 400

    # Verificar si ya existe
    existing = NewsletterSubscriber.query.filter_by(email=email).first()
    if existing:
        if existing.is_active:
            return jsonify({'message': 'Ya estás suscrito al newsletter'}), 200
        else:
            # Reactivar suscripción
            existing.is_active = True
            existing.unsubscribed_at = None
            db.session.commit()
            return jsonify({'success': True, 'message': 'Suscripción reactivada'}), 200

    # Crear nueva suscripción (con sanitización HTML)
    subscriber = NewsletterSubscriber(
        email=email,
        nombre=sanitize_html(data.get('nombre'), max_length=100),
        source='landing',
        ip_address=request.headers.get('X-Forwarded-For', request.remote_addr)
    )

    db.session.add(subscriber)
    db.session.commit()

    return jsonify({
        'success': True,
        'message': 'Te has suscrito correctamente'
    }), 201


@api_bp.route('/newsletter/unsubscribe', methods=['POST'])
def unsubscribe_newsletter():
    """Desuscribirse del newsletter"""
    data = request.get_json()
    email = data.get('email', '').strip()

    subscriber = NewsletterSubscriber.query.filter_by(email=email).first()
    if subscriber:
        subscriber.unsubscribe()
        return jsonify({'success': True, 'message': 'Te has dado de baja correctamente'})

    return jsonify({'error': 'Email no encontrado'}), 404


# ============================================
# ANALYTICS
# ============================================

@api_bp.route('/analytics/event', methods=['POST'])
@limiter.limit("60 per minute")
def track_event():
    """Registra un evento de analytics"""
    data = request.get_json()

    event_name = data.get('event')
    if not event_name:
        return jsonify({'error': 'Event name required'}), 400

    # Sanitizar event_data si es un dict (solo valores string)
    event_data = data.get('data')
    if isinstance(event_data, dict):
        event_data = {
            sanitize_html(str(k), max_length=50): sanitize_html(str(v), max_length=500)
            for k, v in event_data.items()
        }

    event = AnalyticsEvent(
        event_name=sanitize_html(event_name, max_length=100),
        event_data=event_data,
        url=sanitize_html(data.get('url', ''), max_length=500),
        referrer=sanitize_html(data.get('referrer', ''), max_length=500),
        session_id=sanitize_html(data.get('session_id'), max_length=100),
        ip_address=request.headers.get('X-Forwarded-For', request.remote_addr),
        user_agent=request.headers.get('User-Agent', '')[:500],
        utm_source=sanitize_html(data.get('utm_source'), max_length=100),
        utm_medium=sanitize_html(data.get('utm_medium'), max_length=100),
        utm_campaign=sanitize_html(data.get('utm_campaign'), max_length=100),
    )

    db.session.add(event)
    db.session.commit()

    return jsonify({'success': True}), 201


# ============================================
# CONFIGURACIÓN PÚBLICA
# ============================================

@api_bp.route('/config', methods=['GET'])
def get_public_config():
    """Configuración pública para el frontend"""
    return jsonify({
        'contact_email': 'hola@agenciadev.es',
        'phone': '+34 600 000 000',
        'social': {
            'linkedin': 'https://linkedin.com/company/agenciadev',
            'github': 'https://github.com/agenciadev',
        },
        'features': {
            'newsletter': True,
            'analytics': True,
        }
    })


# ============================================
# CALCULADORA ROI
# ============================================

@api_bp.route('/calculate-roi', methods=['POST'])
def calculate_roi():
    """Calcula el ROI estimado basado en los parámetros"""
    data = request.get_json()

    horas_semana = data.get('horas', 10)
    coste_hora = data.get('coste_hora', 25)
    inversion = data.get('inversion', 3500)

    # Validar rangos
    horas_semana = max(1, min(40, horas_semana))
    coste_hora = max(10, min(100, coste_hora))
    inversion = max(1000, min(50000, inversion))

    # Cálculos
    ahorro_semanal = horas_semana * coste_hora * 0.8  # 80% automatizable
    ahorro_anual = ahorro_semanal * 52
    roi = ((ahorro_anual - inversion) / inversion) * 100
    payback_meses = inversion / (ahorro_semanal * 4) if ahorro_semanal > 0 else 999

    return jsonify({
        'ahorro_semanal': round(ahorro_semanal, 2),
        'ahorro_mensual': round(ahorro_semanal * 4, 2),
        'ahorro_anual': round(ahorro_anual, 2),
        'roi_porcentaje': round(roi, 1),
        'payback_meses': round(payback_meses, 1),
        'rentable': roi > 0
    })
