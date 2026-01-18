"""
AgenciaDev Backend - Application Factory
"""

import os
from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_mail import Mail
from flask_login import LoginManager
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

from config import config

# Extensiones
db = SQLAlchemy()
migrate = Migrate()
mail = Mail()
login_manager = LoginManager()
limiter = Limiter(key_func=get_remote_address)


def create_app(config_name='default'):
    """Factory pattern para crear la aplicación Flask"""

    # Detectar si hay build de frontend
    static_folder = os.path.join(os.path.dirname(__file__), '..', 'static')
    static_folder = os.path.abspath(static_folder)

    if os.path.exists(static_folder):
        app = Flask(__name__, static_folder=static_folder, static_url_path='')
    else:
        app = Flask(__name__)

    app.config.from_object(config[config_name])

    # Inicializar extensiones
    db.init_app(app)
    migrate.init_app(app, db)
    mail.init_app(app)
    login_manager.init_app(app)
    limiter.init_app(app)

    # CORS
    CORS(app, origins=app.config['CORS_ORIGINS'], supports_credentials=True)

    # Configurar login manager
    login_manager.login_view = 'auth.login'

    # Registrar blueprints
    from app.routes.api import api_bp
    from app.routes.auth import auth_bp
    from app.routes.admin import admin_bp

    app.register_blueprint(api_bp, url_prefix='/api')
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(admin_bp, url_prefix='/admin')

    # User loader para Flask-Login
    from app.models.user import User

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    # Crear tablas y admin por defecto
    with app.app_context():
        db.create_all()
        _create_default_admin(app)

    # Health check endpoint
    @app.route('/health')
    def health():
        return {'status': 'healthy', 'service': 'agencia-backend'}

    # Servir React frontend (solo si existe el build)
    if os.path.exists(static_folder):
        @app.route('/')
        def serve_index():
            return send_from_directory(app.static_folder, 'index.html')

        @app.errorhandler(404)
        def not_found(e):
            # Para SPA: devolver index.html para rutas no encontradas
            return send_from_directory(app.static_folder, 'index.html')

    return app


def _create_default_admin(app):
    """Crea el usuario admin por defecto si no existe"""
    from app.models.user import User

    admin_email = app.config['ADMIN_EMAIL']
    admin = User.query.filter_by(email=admin_email).first()

    if not admin:
        admin = User(
            email=admin_email,
            nombre='Administrador',
            is_admin=True
        )
        admin.set_password(app.config['ADMIN_PASSWORD'])
        db.session.add(admin)
        db.session.commit()
        print(f"Admin user created: {admin_email}")
