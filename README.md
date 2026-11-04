# mgmautomations.es

Web-CV de **Manuel Gregorio Medina**: Doble Grado en Economía e Inteligencia de Negocios (Universidad CEU San Pablo),
fundador de [Norven](https://norven.io) y [VOCAP](https://vocap.io).

Página estática (HTML + CSS, JetBrains Mono autoalojada) servida por un Flask mínimo con Gunicorn en Railway.

```bash
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt pytest
.venv/bin/python -m pytest -q
.venv/bin/python server.py   # http://127.0.0.1:8000
```

La web anterior de la agencia está en la etiqueta `agencia-final-2026-11-04`.
