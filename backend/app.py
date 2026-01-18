"""
WSGI Entry point para Gunicorn (Railway/Producción)
"""

from app import create_app
from config import get_config

# Crear app con configuración automática
app = create_app(get_config())
