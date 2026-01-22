"""
Authentication Routes
"""

from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required, current_user
import jwt
from datetime import datetime, timedelta

from app import db, limiter
from app.models.user import User

auth_bp = Blueprint('auth', __name__)


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

    # Generar token JWT (opcional, para API stateless)
    from flask import current_app
    token = jwt.encode(
        {
            'user_id': user.id,
            'exp': datetime.utcnow() + timedelta(hours=24)
        },
        current_app.config['JWT_SECRET_KEY'],
        algorithm='HS256'
    )

    return jsonify({
        'success': True,
        'user': user.to_dict(),
        'token': token
    })


@auth_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    """Logout"""
    logout_user()
    return jsonify({'success': True, 'message': 'Sesión cerrada'})


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
    """Decorador para endpoints que requieren token JWT"""
    from functools import wraps

    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization', '').replace('Bearer ', '')

        if not token:
            return jsonify({'error': 'Token requerido'}), 401

        try:
            from flask import current_app
            data = jwt.decode(
                token,
                current_app.config['JWT_SECRET_KEY'],
                algorithms=['HS256']
            )
            user = User.query.get(data['user_id'])
            if not user or not user.is_active:
                return jsonify({'error': 'Token inválido'}), 401

        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token expirado'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Token inválido'}), 401

        return f(user, *args, **kwargs)

    return decorated
