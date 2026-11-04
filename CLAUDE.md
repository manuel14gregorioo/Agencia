# CLAUDE.md — mgmautomations.es (web-CV de Manuel Gregorio Medina)

Desde el 4-11-2026 este repo ya NO es la web de la agencia M.G.M Automations: es la **web-CV personal** de Manuel
Gregorio Medina, publicada en https://mgmautomations.es. La versión antigua (Flask + React, leads, blog) está guardada
en la etiqueta `agencia-final-2026-11-04` (`git checkout agencia-final-2026-11-04` para verla).

## Estructura

```
site/                 # TODO lo público (estático): se sirve tal cual
  index.html          # la página (sin CSS ni JS en línea: la CSP es estricta)
  404.html
  assets/site.css     # estilos (JetBrains Mono en toda la página)
  assets/site.js      # índice que marca la sección visible (sin dependencias)
  fonts/              # JetBrains Mono woff2 autoalojada (licencia OFL en fonts/LICENSE-OFL.txt)
  img/                # foto, capturas de los productos (webp + respaldo), og.png, iconos
  cv/                 # CV en PDF que enlaza la web
  robots.txt, sitemap.xml
tools/                # fuentes y scripts para regenerar el PDF y la imagen og (no se publican)
server.py             # Flask: sirve site/, 301 de rutas antiguas a /, cabeceras de seguridad y caché, /health
tests/test_server.py  # pytest del servidor
Dockerfile            # python:3.12-slim + gunicorn (Railway usa este Dockerfile: ver railway.json)
railway.json          # builder DOCKERFILE + healthcheck /health
```

## Comandos

```bash
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt pytest
.venv/bin/python -m pytest -q                  # pruebas del servidor
.venv/bin/python server.py                     # http://127.0.0.1:8000
.venv/bin/gunicorn server:app -b 127.0.0.1:8080   # como en producción
```

## Despliegue

- Railway: proyecto `passionate-nurturing`, servicio `Agencia`, se despliega solo al hacer push a `main`.
  Dominios: `mgmautomations.es` y `agencia-production-0070.up.railway.app`.
- DNS en Hostinger (ns1/ns2.dns-parking.com). `www` no está añadido en Railway.
- El Postgres del proyecto ya no se usa (era de la web antigua); no se ha borrado.

## Reglas de contenido

- Todo dato de la web sale de lo que ha dicho el dueño: no inventar cifras, clientes ni funciones.
- Español de España; fechas con mes abreviado con punto y semirraya («mar. 2026 – actualidad»).
- Nada en línea (style=, <style>, <script> sin src): la CSP de server.py lo bloquearía.
