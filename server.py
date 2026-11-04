"""Servidor de mgmautomations.es: la web-CV personal de Manuel Gregorio Medina.

Sirve los ficheros estáticos de `site/`, redirige las rutas de la web antigua (agencia, blog, legales)
a la portada con 301 y añade cabeceras de seguridad y de caché. Sin base de datos ni formularios.
"""

import gzip
import os
import re

from flask import Flask, abort, redirect, request, send_from_directory

SITE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "site")
DOMINIO = "mgmautomations.es"

# Rutas de la web antigua de la agencia: se redirigen a la portada para no dejar enlaces rotos.
# (Ojo: nada que exista en site/, como /favicon.svg, puede estar aquí.)
ANTIGUAS = re.compile(
    r"^/(demo|blog|guia-dominio|privacidad|terminos|cookies|admin|login|portfolio|servicios|contacto"
    r"|llms\.txt|manifest\.json|og-image\.jpg|demos|images|videos)(/.*)?$"
)

# Tipos de texto que se comprimen con gzip si el navegador lo acepta.
COMPRIMIBLES = {"text/html", "text/css", "text/javascript", "application/javascript", "image/svg+xml",
                "text/plain", "application/xml", "text/xml"}

CSP = (
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; "
    "connect-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"
)

app = Flask(__name__, static_folder=None)


@app.before_request
def canonico():
    """www.mgmautomations.es → mgmautomations.es (si algún día se añade www en Railway)."""
    host = (request.host or "").split(":")[0].lower()
    if host == "www." + DOMINIO:
        return redirect(f"https://{DOMINIO}{request.full_path.rstrip('?')}", code=301)
    return None


@app.after_request
def cabeceras(resp):
    resp.headers["Content-Security-Policy"] = CSP
    resp.headers["X-Content-Type-Options"] = "nosniff"
    resp.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    resp.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    resp.headers["X-Frame-Options"] = "DENY"
    resp.headers["Strict-Transport-Security"] = "max-age=31536000"
    ruta = request.path
    if resp.status_code == 200:
        if ruta.startswith("/fonts/"):
            resp.headers["Cache-Control"] = "public, max-age=31536000, immutable"  # no cambian nunca
        elif ruta.startswith("/img/") or ruta.endswith((".png", ".ico", ".svg")):
            resp.headers["Cache-Control"] = "public, max-age=86400"  # 1 día
        else:
            # HTML, CSS, JS, PDF…: siempre se revalidan (ETag/304), así un cambio se ve al momento
            resp.headers["Cache-Control"] = "no-cache"
    return comprimir(resp)


def comprimir(resp):
    """gzip para respuestas de texto (HTML, CSS, JS, SVG…) si el cliente lo acepta."""
    if (
        request.method != "GET"
        or resp.status_code not in (200, 404)
        or resp.mimetype not in COMPRIMIBLES
        or "gzip" not in request.headers.get("Accept-Encoding", "").lower()
        or "Content-Encoding" in resp.headers
    ):
        return resp
    resp.direct_passthrough = False
    datos = resp.get_data()
    if len(datos) < 512:
        return resp
    resp.set_data(gzip.compress(datos, compresslevel=6))
    resp.headers["Content-Encoding"] = "gzip"
    resp.vary.add("Accept-Encoding")
    etag, debil = resp.get_etag()
    if etag:
        resp.set_etag(etag, weak=True)  # misma entidad, otra codificación
    return resp


@app.get("/health")
def salud():
    return "ok", 200, {"Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store"}


@app.get("/")
def portada():
    return send_from_directory(SITE, "index.html")


@app.get("/<path:ruta>")
def fichero(ruta):
    if ANTIGUAS.match("/" + ruta) or ruta == "index.html":
        return redirect("/", code=301)
    if ruta == "404.html":
        abort(404)
    completa = os.path.normpath(os.path.join(SITE, ruta))
    if not completa.startswith(SITE + os.sep) or not os.path.isfile(completa):
        abort(404)
    return send_from_directory(SITE, ruta)


@app.errorhandler(404)
def no_encontrada(_err):
    pagina = os.path.join(SITE, "404.html")
    if os.path.isfile(pagina):
        resp = send_from_directory(SITE, "404.html")
        resp.status_code = 404
        return resp
    return "No encontrada", 404


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=int(os.environ.get("PORT", "8000")), debug=True)
