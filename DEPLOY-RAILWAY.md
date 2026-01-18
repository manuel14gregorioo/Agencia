# Desplegar en Railway (Gratis)

## Pasos para desplegar

### 1. Crear cuenta en Railway
Ve a [railway.app](https://railway.app) y crea una cuenta con GitHub.

### 2. Crear nuevo proyecto
1. Click en **"New Project"**
2. Selecciona **"Deploy from GitHub repo"**
3. Conecta tu cuenta de GitHub si no lo has hecho
4. Selecciona el repositorio de `agencia`

### 3. Añadir base de datos PostgreSQL
1. En tu proyecto, click en **"+ New"**
2. Selecciona **"Database"** → **"Add PostgreSQL"**
3. Railway creará automáticamente la variable `DATABASE_URL`

### 4. Configurar variables de entorno
En el servicio de tu app (no en PostgreSQL), ve a **"Variables"** y añade:

```
SECRET_KEY=tu-clave-secreta-muy-larga-y-segura
ADMIN_EMAIL=tu@email.com
ADMIN_PASSWORD=tu-password-seguro
FLASK_ENV=production
```

**Opcionales (para emails):**
```
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=tu@gmail.com
MAIL_PASSWORD=tu-app-password
MAIL_DEFAULT_SENDER=tu@gmail.com
```

### 5. Desplegar
Railway detectará automáticamente el `nixpacks.toml` y:
1. Instalará Node.js y Python
2. Construirá el frontend (React)
3. Iniciará el backend (Flask + Gunicorn)

### 6. Obtener URL pública
1. Ve a **"Settings"** → **"Domains"**
2. Click en **"Generate Domain"**
3. Tu app estará en: `tu-proyecto.up.railway.app`

---

## Comandos útiles

### Subir a GitHub primero
```bash
cd /Users/mgm/Desktop/agencia
git init
git add .
git commit -m "Initial commit - AgenciaDev landing"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/agencia.git
git push -u origin main
```

### Ver logs en Railway
En el dashboard de Railway, click en tu servicio → **"Logs"**

---

## Estructura del proyecto
```
agencia/
├── frontend/          # React + Vite
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── backend/           # Flask API
│   ├── app/
│   ├── requirements.txt
│   └── app.py         # Entry point para Gunicorn
├── nixpacks.toml      # Configuración de build
├── Procfile           # Comando de inicio
└── railway.toml       # Configuración Railway
```

---

## Costos
- **Plan gratuito**: 500 horas/mes (suficiente para un proyecto personal)
- **PostgreSQL gratis**: Incluido en las 500 horas
- **Sin tarjeta de crédito** para empezar

---

## Troubleshooting

### Error: "No module named 'app'"
Asegúrate de que el `Procfile` tiene `cd backend &&` antes del comando.

### Error: "DATABASE_URL not found"
Añade PostgreSQL al proyecto y verifica que la variable se creó.

### Build falla en frontend
Verifica que `npm run build` funciona localmente:
```bash
cd frontend && npm install && npm run build
```

### La app no carga
1. Revisa los logs en Railway
2. Verifica que `/health` responde
3. Asegúrate de que las variables de entorno están configuradas
