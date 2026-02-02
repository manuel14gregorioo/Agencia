# CLAUDE.md - Agencia (M.G.M Automations)

## Proyecto

Web full-stack para agencia digital **M.G.M Automations** (Madrid). Captura leads, muestra servicios, gestiona contactos desde admin. Dominio: mgmautomations.es

## Estructura

```
agencia/
├── backend (Flask)
│   ├── app/
│   │   ├── __init__.py          # App Factory: create_app(), extensiones (db, migrate, mail, login_manager, limiter)
│   │   ├── models/
│   │   │   ├── user.py          # User (email, password_hash bcrypt, is_admin, last_login)
│   │   │   ├── lead.py          # Lead (nombre, email, proyecto, estado, fuente, utm_*, ip, tracking)
│   │   │   ├── newsletter.py    # NewsletterSubscriber (email, is_active, confirmed, frequency)
│   │   │   └── analytics.py     # AnalyticsEvent + PageView (event_name, event_data JSON, session_id)
│   │   ├── routes/
│   │   │   ├── api.py           # Blueprint /api: contact, newsletter, analytics/event, config, calculate-roi
│   │   │   ├── auth.py          # Blueprint /auth: login (JWT HS256 24h), logout, me, change-password, token_required decorator
│   │   │   └── admin.py         # Blueprint /admin: stats, leads CRUD+bulk, subscribers, analytics/events. admin_required decorator
│   │   └── services/
│   │       └── email_service.py # send_lead_notification() + send_lead_confirmation() via Flask-Mail (SMTP). HTML templates inline
│   ├── requirements.txt
│   └── venv/
├── frontend (React + Vite)
│   ├── src/
│   │   ├── main.jsx             # Entry: ReactDOM.createRoot, HelmetProvider > App
│   │   ├── App.jsx              # Router custom (History API, NO React Router). parseRoute(), navigate(), Link component, RouterContext
│   │   ├── index.css            # Tailwind + design system CSS vars (--color-noir, --color-lime, --color-coral, --color-cream)
│   │   ├── components/
│   │   │   ├── Landing.jsx      # Pagina principal: ThemeProvider > ToastProvider > CookieConsentProvider > LandingContent
│   │   │   ├── DemoReservas.jsx # Pagina demo/booking
│   │   │   ├── ContactForm.jsx  # Formulario contacto con validacion
│   │   │   ├── contexts/        # ThemeContext (dark/light localStorage), CookieConsentContext (GDPR), ToastContext
│   │   │   ├── hooks/           # useScrollTracking, useActiveSection, useScrollAnimation, useParallax, useCountUp
│   │   │   ├── pages/           # Blog, PrivacyPolicy, TermsOfService, CookiePolicy, DomainGuide
│   │   │   ├── sections/        # HeroSection, ValueProposition, TestimonialSection, PortfolioSection, ComparisonSection, ServiciosSection, ProcesoSection, FAQSection, CTASection
│   │   │   ├── ui/              # Navbar, Footer, WhatsAppButton, ScrollToTopButton, ExitIntentPopup, CalendlyButton, VideoModal, LazyImage
│   │   │   └── seo/             # SEOHead, getLandingSchemas (structured data)
│   │   ├── utils/
│   │   │   ├── api.js           # APIError class, request() wrapper, submitContact, subscribeNewsletter, getConfig, trackEvent
│   │   │   ├── analytics.js     # initGA4, initMetaPixel, ConversionEvents object, UTM params save/get
│   │   │   └── scroll.js        # Scroll utilities
│   │   └── data/                # Datos estaticos (servicios, FAQ, etc.)
│   ├── public/                  # Assets estaticos (imagenes, videos)
│   ├── dist/                    # Build output
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
├── config.py                    # Config, DevelopmentConfig, ProductionConfig, TestingConfig. Auto-detect Railway
├── run.py                       # Entry point: create_app(), app.run(port=5000)
├── nixpacks.toml                # Railway build: Node 18 + Python 3.11, frontend build -> static/
├── vercel.json                  # SPA rewrites para Vercel
└── railway.json                 # Railway deployment config
```

## Tech Stack

- **Backend**: Flask 3.0, SQLAlchemy 2.0, Flask-Login, Flask-Mail, Flask-Limiter, PyJWT, bcrypt, psycopg2-binary
- **Frontend**: React 18.2, Vite 5.0, TailwindCSS 3.3, Lucide React (iconos), React-Helmet-Async (SEO)
- **DB**: PostgreSQL (prod) / SQLite (dev)
- **Deploy**: Railway (Nixpacks) + Vercel (frontend only)
- **Server**: Gunicorn (prod)

## Comandos

```bash
# Backend
cd /Users/mgm/Desktop/agencia
source backend/venv/bin/activate
python run.py                        # Dev server en :5000

# Frontend
cd /Users/mgm/Desktop/agencia/frontend
npm run dev                          # Vite dev en :5173 (proxy /api -> :5000)
npm run build                        # Build a dist/
npm run lint                         # ESLint

# Deploy (Railway)
# Push a git -> build automatico via nixpacks.toml
# Frontend build se copia a static/ y Flask lo sirve
```

## Base de Datos - Modelos

### Lead (tabla: leads)
- Estados: `nuevo` -> `contactado` -> `en_proceso` -> `propuesta` -> `ganado`/`perdido`/`descartado`
- Fuentes: landing, referido, linkedin, google, otro
- Tracking: ip_address, user_agent, referrer, utm_source/medium/campaign
- FK: assigned_to_id -> users.id

### User (tabla: users)
- Auth: bcrypt password hashing
- Admin auto-creado si ADMIN_PASSWORD env var esta definida

### NewsletterSubscriber (tabla: newsletter_subscribers)
- Reactivacion: si se desuscribe y vuelve, is_active=True, unsubscribed_at=None

### AnalyticsEvent (tabla: analytics_events) + PageView (tabla: page_views)

## API Endpoints

| Metodo | Ruta | Rate Limit | Descripcion |
|--------|------|------------|-------------|
| POST | /api/contact | 5/min | Crear lead + enviar emails |
| POST | /api/newsletter | 3/min | Suscribir newsletter |
| POST | /api/newsletter/unsubscribe | - | Desuscribir |
| POST | /api/analytics/event | 60/min | Track evento |
| GET | /api/config | - | Config publica |
| POST | /api/calculate-roi | - | Calculadora ROI |
| POST | /auth/login | - | Login -> JWT token |
| POST | /auth/logout | auth | Logout |
| GET | /auth/me | auth | Usuario actual |
| POST | /auth/change-password | auth | Cambiar password |
| GET | /admin/stats | admin | Dashboard stats |
| GET | /admin/leads | admin | Listar leads (paginado, filtros) |
| GET | /admin/leads/:id | admin | Detalle lead |
| PATCH | /admin/leads/:id | admin | Actualizar lead |
| DELETE | /admin/leads/:id | admin | Eliminar lead |
| POST | /admin/leads/bulk-update | admin | Bulk update leads |
| GET | /admin/subscribers | admin | Listar suscriptores |
| GET | /admin/subscribers/export | admin | Exportar emails |
| GET | /admin/analytics/events | admin | Eventos analytics |
| GET | /health | - | Health check |

## Routing Frontend

Router custom en App.jsx (NO usa React Router). Usa History API + popstate.

```
/              -> Landing (lazy)
/demo          -> DemoReservas (lazy)
/privacidad    -> PrivacyPolicy (lazy)
/terminos      -> TermsOfService (lazy)
/cookies       -> CookiePolicy (lazy)
/guia-dominio  -> DomainGuide (lazy)
/blog          -> Blog (lazy)
/blog/:postId  -> Blog con postId (lazy)
#/* rutas      -> Redirect a clean URL automatico
```

Navegacion interna: usar `navigate(path)` o componente `<Link to="/ruta">` exportados de App.jsx.

## Design System

Estilo **brutalist noir** con TailwindCSS custom.

**Colores**: noir (grises), lime (#BFFF00 - acento), coral (#FF6B4A - CTAs), cream (#F7F7F5 - fondos)
**Fonts**: Clash Display (headings), Outfit (body), JetBrains Mono (code) - via Fontshare API
**Shadows**: brutal (4px hard), brutal-lg, brutal-lime, brutal-coral, glow-lime, glow-coral
**Dark mode**: class-based (`dark:` utilities), toggle en Navbar, persiste en localStorage

## Patrones Importantes

- **App Factory**: create_app() en app/__init__.py registra blueprints, extensiones, crea tablas, admin default
- **Context providers**: Landing envuelve todo en ThemeProvider > ToastProvider > CookieConsentProvider
- **Code splitting**: React.lazy() para todas las paginas excepto referencia directa. Chunks: vendor-react, vendor-icons
- **Email dual**: Resend API (si configurado) o Flask-Mail SMTP como fallback
- **GDPR**: CookieConsentContext controla GA4/Meta Pixel. No se trackea sin consentimiento
- **SPA fallback**: 404 en Flask devuelve index.html para que el router del frontend maneje la ruta
- **Proxy dev**: Vite proxea /api -> localhost:5000 en desarrollo

## Variables de Entorno (Produccion)

```
SECRET_KEY=           # Requerido
DATABASE_URL=         # PostgreSQL URL (Railway la provee automaticamente)
ADMIN_EMAIL=          # Default: admin@agenciadev.es
ADMIN_PASSWORD=       # Requerido para crear admin
MAIL_SERVER=          # Default: smtp.gmail.com
MAIL_PORT=            # Default: 587
MAIL_USE_TLS=         # Default: true
MAIL_USERNAME=        # SMTP user
MAIL_PASSWORD=        # SMTP password
MAIL_DEFAULT_SENDER=  # Default: noreply@agenciadev.es
CORS_ORIGINS=         # Comma-separated origins
JWT_SECRET_KEY=       # Default: usa SECRET_KEY
REDIS_URL=            # Para rate limiter (default: memory://)
RESEND_API_KEY=       # Si se usa Resend en vez de SMTP
```

## Seguridad

- JWT HS256 con expiracion 24h
- bcrypt para passwords
- Rate limiting por endpoint (Flask-Limiter, storage memory)
- CORS whitelist (no wildcard)
- Input validation: email-validator, longitud minima proyecto (20 chars)
- Headers: X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, CSP, Referrer-Policy
- Admin: admin_required decorator verifica is_admin
- Token: token_required decorator verifica JWT en header Authorization: Bearer

## Convenciones de Codigo

- Backend: Python, snake_case, docstrings en espanol, blueprints con prefijo
- Frontend: JSX, camelCase funciones/variables, PascalCase componentes
- CSS: Tailwind utilities, custom classes en index.css con @layer
- Commits/docs: En espanol preferentemente
- Componentes React: Funcionales con hooks, no clases
- Estado: Context API (no Redux), useState para estado local
- API calls: utils/api.js wrapper con APIError class
