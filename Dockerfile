# mgmautomations.es — web-CV estática servida por Flask + Gunicorn
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY server.py .
COPY site ./site

RUN useradd --create-home --uid 10001 web
USER web

# Railway pone $PORT; en local, 8080
CMD exec gunicorn server:app --bind 0.0.0.0:${PORT:-8080} --workers 2 --threads 4 --timeout 30 --access-logfile -
