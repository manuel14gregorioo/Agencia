# AgenciaDev - Landing Page + Backend

Plataforma completa para la landing page de la agencia con backend de gestión de leads.

## Estructura del Proyecto

```
agencia/
├── frontend/          # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/           # Flask API
│   ├── app/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── services/
│   │   └── templates/
│   ├── requirements.txt
│   └── run.py
│
├── docker-compose.yml
└── README.md
```

## Inicio Rápido

### Opción 1: Docker (Recomendado)

```bash
docker-compose up --build
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Admin Panel: http://localhost:5000/admin

### Opción 2: Manual

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
flask db upgrade
python run.py
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Endpoints API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/contact` | Enviar formulario de contacto |
| GET | `/api/leads` | Listar leads (auth requerida) |
| GET | `/api/leads/:id` | Detalle de lead |
| PATCH | `/api/leads/:id` | Actualizar estado de lead |
| POST | `/api/newsletter` | Suscribirse a newsletter |
| GET | `/api/stats` | Estadísticas dashboard |

## Variables de Entorno

Crear archivo `.env` en `/backend`:

```env
FLASK_ENV=development
SECRET_KEY=tu-clave-secreta-aqui
DATABASE_URL=sqlite:///agencia.db
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=tu-email@gmail.com
MAIL_PASSWORD=tu-app-password
ADMIN_EMAIL=admin@agenciadev.es
ADMIN_PASSWORD=password-seguro
```

## Licencia

MIT
