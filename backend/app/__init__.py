"""
AgenciaDev Backend - Application Factory
"""

import os
from datetime import datetime
from flask import Flask, send_from_directory, request, g
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

# Intentar importar flask-compress (opcional)
try:
    from flask_compress import Compress
    compress = Compress()
    HAS_COMPRESS = True
except ImportError:
    HAS_COMPRESS = False


def create_app(config_name='default'):
    """Factory pattern para crear la aplicación Flask"""

    # Detectar si hay build de frontend
    static_folder = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'static')

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

    # Compression (gzip/brotli)
    if HAS_COMPRESS:
        app.config['COMPRESS_MIMETYPES'] = [
            'text/html', 'text/css', 'text/xml', 'text/javascript',
            'application/json', 'application/javascript', 'application/xml'
        ]
        app.config['COMPRESS_LEVEL'] = 6
        app.config['COMPRESS_MIN_SIZE'] = 500
        compress.init_app(app)

    # Security Headers Middleware
    @app.after_request
    def add_security_headers(response):
        # Prevenir clickjacking
        response.headers['X-Frame-Options'] = 'SAMEORIGIN'
        # Prevenir MIME sniffing
        response.headers['X-Content-Type-Options'] = 'nosniff'
        # XSS Protection (legacy browsers)
        response.headers['X-XSS-Protection'] = '1; mode=block'
        # Referrer Policy
        response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
        # Permissions Policy
        response.headers['Permissions-Policy'] = 'geolocation=(), microphone=(), camera=()'

        # Content Security Policy (ajustar según necesidades)
        if not app.debug:
            csp = (
                "default-src 'self'; "
                "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://assets.calendly.com https://www.googletagmanager.com; "
                "style-src 'self' 'unsafe-inline' https://assets.calendly.com https://fonts.googleapis.com; "
                "font-src 'self' https://fonts.gstatic.com; "
                "img-src 'self' data: https:; "
                "connect-src 'self' https://calendly.com https://www.google-analytics.com; "
                "frame-src https://calendly.com; "
            )
            response.headers['Content-Security-Policy'] = csp

        return response

    # Cache Headers para assets estáticos
    @app.after_request
    def add_cache_headers(response):
        # Cache para assets estáticos (CSS, JS, imágenes)
        if request.path.startswith('/assets/') or request.path.endswith(('.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.woff', '.woff2')):
            # Cache por 1 año (inmutable con hash en filename)
            response.headers['Cache-Control'] = 'public, max-age=31536000, immutable'
        elif request.path == '/' or request.path.endswith('.html'):
            # HTML: no cachear (siempre verificar versión)
            response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
        elif request.path.startswith('/api/'):
            # API: no cachear
            response.headers['Cache-Control'] = 'no-store'

        return response

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

    # Health check endpoint (verifica DB)
    @app.route('/health')
    def health():
        try:
            # Verificar conexión a base de datos
            db.session.execute(db.text('SELECT 1'))
            db_status = 'ok'
        except Exception as e:
            db_status = f'error: {str(e)}'
            return {
                'status': 'unhealthy',
                'service': 'agencia-backend',
                'database': db_status,
                'timestamp': datetime.utcnow().isoformat()
            }, 503

        return {
            'status': 'healthy',
            'service': 'agencia-backend',
            'database': db_status,
            'timestamp': datetime.utcnow().isoformat()
        }

    # Readiness probe (para Kubernetes/Railway)
    @app.route('/ready')
    def ready():
        try:
            db.session.execute(db.text('SELECT 1'))
            return {'ready': True}
        except Exception:
            return {'ready': False}, 503

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
