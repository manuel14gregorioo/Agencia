"""
Authentication Routes
"""

from flask import Blueprint, request, jsonify, current_app
from flask_login import login_user, logout_user, login_required, current_user
import jwt
from datetime import datetime, timedelta

from app import db, limiter
from app.models.user import User
from app.models.refresh_token import RefreshToken

auth_bp = Blueprint('auth', __name__)

# Duración de tokens
ACCESS_TOKEN_EXPIRES_MINUTES = 15
REFRESH_TOKEN_EXPIRES_DAYS = 7


def create_access_token(user_id):
    """Crea un access token JWT de corta duración"""
    return jwt.encode(
        {
            'user_id': user_id,
            'type': 'access',
            'exp': datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRES_MINUTES)
        },
        current_app.config['JWT_SECRET_KEY'],
        algorithm='HS256'
    )


@auth_bp.route('/login', methods=['POST'])
@limiter.limit("5 per minute")
def login():
    """Login de administradores"""
    data = request.get_json()

    email = data.get('email', '').strip()
    password = data.get('password', '')

    if not email or not password:
        return jsonify({'error': 'Email y contraseña requeridos'}), 400

    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return jsonify({'error': 'Credenciales incorrectas'}), 401

    if not user.is_active:
        return jsonify({'error': 'Usuario desactivado'}), 401

    # Login con Flask-Login
    login_user(user)
    user.update_last_login()

    # Generar access token (corta duración: 15 min)
    access_token = create_access_token(user.id)

    # Generar refresh token (larga duración: 7 días)
    user_agent = request.headers.get('User-Agent', '')
    ip_address = request.headers.get('X-Forwarded-For', request.remote_addr)
    refresh_token = RefreshToken.create_token(
        user_id=user.id,
        expires_days=REFRESH_TOKEN_EXPIRES_DAYS,
        user_agent=user_agent,
        ip_address=ip_address
    )

    return jsonify({
        'success': True,
        'user': user.to_dict(),
        'access_token': access_token,
        'refresh_token': refresh_token.token,
        'expires_in': ACCESS_TOKEN_EXPIRES_MINUTES * 60  # segundos
    })


@auth_bp.route('/refresh', methods=['POST'])
@limiter.limit("30 per minute")
def refresh():
    """Obtener nuevo access token usando refresh token"""
    data = request.get_json()
    refresh_token_str = data.get('refresh_token', '')

    if not refresh_token_str:
        return jsonify({'error': 'Refresh token requerido'}), 400

    # Buscar token válido
    refresh_token = RefreshToken.get_valid_token(refresh_token_str)

    if not refresh_token:
        return jsonify({'error': 'Refresh token inválido o expirado'}), 401

    # Verificar que el usuario sigue activo
    user = User.query.get(refresh_token.user_id)
    if not user or not user.is_active:
        refresh_token.revoke()
        return jsonify({'error': 'Usuario no válido'}), 401

    # Generar nuevo access token
    access_token = create_access_token(user.id)

    return jsonify({
        'success': True,
        'access_token': access_token,
        'expires_in': ACCESS_TOKEN_EXPIRES_MINUTES * 60
    })


@auth_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    """Logout - revoca refresh token si se proporciona"""
    data = request.get_json() or {}
    refresh_token_str = data.get('refresh_token')

    # Revocar refresh token específico si se proporciona
    if refresh_token_str:
        refresh_token = RefreshToken.get_valid_token(refresh_token_str)
        if refresh_token and refresh_token.user_id == current_user.id:
            refresh_token.revoke()

    logout_user()
    return jsonify({'success': True, 'message': 'Sesión cerrada'})


@auth_bp.route('/logout-all', methods=['POST'])
@login_required
def logout_all():
    """Cerrar todas las sesiones del usuario"""
    RefreshToken.revoke_all_user_tokens(current_user.id)
    logout_user()
    return jsonify({'success': True, 'message': 'Todas las sesiones cerradas'})


@auth_bp.route('/me', methods=['GET'])
@login_required
def get_current_user():
    """Obtener usuario actual"""
    return jsonify({
        'user': current_user.to_dict()
    })


@auth_bp.route('/change-password', methods=['POST'])
@limiter.limit("3 per minute")
@login_required
def change_password():
    """Cambiar contraseña"""
    data = request.get_json()

    current_password = data.get('current_password', '')
    new_password = data.get('new_password', '')

    if not current_user.check_password(current_password):
        return jsonify({'error': 'Contraseña actual incorrecta'}), 400

    if len(new_password) < 8:
        return jsonify({'error': 'La nueva contraseña debe tener al menos 8 caracteres'}), 400

    current_user.set_password(new_password)
    db.session.commit()

    return jsonify({'success': True, 'message': 'Contraseña actualizada'})


# Decorador para verificar token JWT
def token_required(f):
    """Decorador para endpoints que requieren token JWT (access token)"""
    from functools import wraps

    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization', '').replace('Bearer ', '')

        if not token:
            return jsonify({'error': 'Token requerido'}), 401

        try:
            data = jwt.decode(
                token,
                current_app.config['JWT_SECRET_KEY'],
                algorithms=['HS256']
            )

            # Verificar que es un access token, no un refresh token
            if data.get('type') != 'access':
                return jsonify({'error': 'Tipo de token inválido'}), 401

            user = User.query.get(data['user_id'])
            if not user or not user.is_active:
                return jsonify({'error': 'Usuario no válido'}), 401

        except jwt.ExpiredSignatureError:
            return jsonify({
                'error': 'Token expirado',
                'code': 'TOKEN_EXPIRED'
            }), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Token inválido'}), 401

        return f(user, *args, **kwargs)

    return decorated
