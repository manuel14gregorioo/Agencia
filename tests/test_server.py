"""Pruebas del servidor de la web-CV (rutas, redirecciones y cabeceras)."""

import os
import sys

import pytest

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from server import app  # noqa: E402


@pytest.fixture()
def cliente():
    app.config["TESTING"] = True
    return app.test_client()


def test_salud(cliente):
    r = cliente.get("/health")
    assert r.status_code == 200 and r.data == b"ok"


def test_portada(cliente):
    r = cliente.get("/")
    assert r.status_code == 200
    assert b"Manuel Gregorio Medina" in r.data
    assert r.headers["Cache-Control"] == "no-cache"
    assert "default-src 'self'" in r.headers["Content-Security-Policy"]
    assert r.headers["X-Content-Type-Options"] == "nosniff"


@pytest.mark.parametrize("ruta", [
    "/blog", "/blog/cuanto-cuesta-web-2025", "/demo", "/privacidad", "/terminos", "/cookies",
    "/guia-dominio", "/admin", "/admin/leads", "/llms.txt",
])
def test_rutas_antiguas_redirigen(cliente, ruta):
    r = cliente.get(ruta)
    assert r.status_code == 301
    assert r.headers["Location"].endswith("/")


def test_no_existe(cliente):
    r = cliente.get("/esto-no-existe")
    assert r.status_code == 404


@pytest.mark.parametrize("ruta", ["/../server.py", "/%2e%2e/server.py", "/site/../server.py"])
def test_no_sale_de_site(cliente, ruta):
    assert cliente.get(ruta).status_code == 404


def test_www_redirige(cliente):
    r = cliente.get("/?a=1", headers={"Host": "www.mgmautomations.es"})
    assert r.status_code == 301
    assert r.headers["Location"] == "https://mgmautomations.es/?a=1"


def test_fuentes_con_cache_larga(cliente):
    r = cliente.get("/fonts/jetbrains-mono-latin-400-normal.woff2")
    assert r.status_code == 200
    assert "max-age=31536000" in r.headers["Cache-Control"]


def test_favicon_svg_se_sirve(cliente):
    r = cliente.get("/favicon.svg")
    assert r.status_code == 200
    assert r.mimetype == "image/svg+xml"


@pytest.mark.parametrize("ruta", ["/img/og.png", "/img/foto.jpg", "/cv/manuel-gregorio-medina-cv.pdf",
                                  "/favicon-32.png", "/apple-touch-icon.png", "/robots.txt", "/sitemap.xml",
                                  "/assets/site.css", "/assets/site.js"])
def test_ficheros_publicos(cliente, ruta):
    assert cliente.get(ruta).status_code == 200


def test_index_html_redirige_y_404_html_no_existe(cliente):
    r = cliente.get("/index.html")
    assert r.status_code == 301 and r.headers["Location"].endswith("/")
    assert cliente.get("/404.html").status_code == 404


def test_gzip(cliente):
    import gzip as gz
    r = cliente.get("/", headers={"Accept-Encoding": "gzip, br"})
    assert r.headers.get("Content-Encoding") == "gzip"
    assert "Accept-Encoding" in r.headers.get("Vary", "")
    assert b"Manuel Gregorio Medina" in gz.decompress(r.data)
    r2 = cliente.get("/")
    assert "Content-Encoding" not in r2.headers
    assert b"Manuel Gregorio Medina" in r2.data


def test_no_comprime_imagenes(cliente):
    r = cliente.get("/img/og.png", headers={"Accept-Encoding": "gzip"})
    assert "Content-Encoding" not in r.headers


def test_404_con_pagina_y_gzip(cliente):
    import gzip as gz
    r = cliente.get("/no-existe", headers={"Accept-Encoding": "gzip"})
    assert r.status_code == 404
    cuerpo = gz.decompress(r.data) if r.headers.get("Content-Encoding") == "gzip" else r.data
    assert b"Esta p" in cuerpo


def test_css_se_revalida(cliente):
    assert cliente.get("/assets/site.css").headers["Cache-Control"] == "no-cache"
    assert "interest-cohort" not in cliente.get("/").headers["Permissions-Policy"]
