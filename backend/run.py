"""
Entry point para ejecutar la aplicación Flask
"""

import os
from app import create_app
from config import get_config

# Determinar configuración automáticamente
config_name = get_config()
app = create_app(config_name)

if __name__ == '__main__':
    # En desarrollo, ejecutar con debug
    debug = config_name == 'development'
    port = int(os.environ.get('PORT', 5000))

    print(f"""
    ╔══════════════════════════════════════════════════════╗
    ║             AGENCIA DEV - BACKEND API                ║
    ╠══════════════════════════════════════════════════════╣
    ║  Modo: {config_name.upper():^44} ║
    ║  URL:  http://localhost:{port:<40} ║
    ║  Health: http://localhost:{port}/health{' ':31} ║
    ╚══════════════════════════════════════════════════════╝
    """)

    app.run(host='0.0.0.0', port=port, debug=debug)
