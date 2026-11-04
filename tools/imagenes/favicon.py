#!/usr/bin/env python3
"""Monograma «MG» en JetBrains Mono 700 convertido a trazos (no depende de fuentes del sistema).

Necesita fontTools + brotli (para leer la woff2):
  python3 -m venv /tmp/fontvenv && /tmp/fontvenv/bin/pip install fonttools brotli pillow
  /tmp/fontvenv/bin/python favicon.py

Escribe site/favicon.svg (viewBox 32×32), site/favicon-32.png y site/apple-touch-icon.png (180×180, opaco).
Tinta #151515 sobre #fafaf7, sin adornos.
"""
from pathlib import Path

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.recordingPen import RecordingPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw

RAIZ = Path(__file__).resolve().parents[2]
WOFF2 = RAIZ / "site" / "fonts" / "jetbrains-mono-latin-700-normal.woff2"
TINTA, FONDO = "#151515", "#fafaf7"
TEXTO = "MG"
TRACKING = -40  # unidades de la fuente entre letras (ligeramente más juntas que el monoespaciado)
ANCHO_TINTA = 0.74  # fracción del lado que ocupa el monograma

font = TTFont(str(WOFF2))
gs = font.getGlyphSet()
cmap = font.getBestCmap()

# Posición de cada glifo (unidades de la fuente, eje Y hacia arriba) y caja de tinta total.
x = 0
colocados = []
for ch in TEXTO:
    nombre = cmap[ord(ch)]
    colocados.append((nombre, x))
    x += gs[nombre].width + TRACKING
bp = BoundsPen(gs)
for nombre, dx in colocados:
    gs[nombre].draw(TransformPen(bp, (1, 0, 0, 1, dx, 0)))
x0, y0, x1, y1 = bp.bounds


def trazos(lado: float) -> tuple[str, float, float, float]:
    """Devuelve el path SVG ya escalado y centrado en un cuadrado de `lado`."""
    s = lado * ANCHO_TINTA / (x1 - x0)
    tx = (lado - (x1 - x0) * s) / 2 - x0 * s
    ty = (lado + (y1 - y0) * s) / 2 + y0 * s  # Y invertida: la línea base queda en ty
    pen = SVGPathPen(gs, ntos=lambda v: f"{v:.2f}".rstrip("0").rstrip("."))
    for nombre, dx in colocados:
        gs[nombre].draw(TransformPen(pen, (s, 0, 0, -s, tx + dx * s, ty)))
    return pen.getCommands(), s, tx, ty


d, _, _, _ = trazos(32)
svg = (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">'
    f'<rect width="32" height="32" rx="4" fill="{FONDO}"/>'
    f'<path fill="{TINTA}" d="{d}"/></svg>\n'
)
(RAIZ / "site" / "favicon.svg").write_text(svg)


def png(lado: int, salida: Path) -> None:
    """Rasteriza los mismos trazos con supermuestreo ×8 (PIL no lee woff2: se usa el path)."""
    k = 8
    L = lado * k
    img = Image.new("RGB", (L, L), FONDO)
    _, s, tx, ty = trazos(L)
    # Aplana cada contorno a polígonos y los pinta con regla par-impar (agujeros de la G/M).
    mascara = Image.new("1", (L, L), 0)
    for nombre, dx in colocados:
        rec = RecordingPen()
        gs[nombre].draw(TransformPen(rec, (s, 0, 0, -s, tx + dx * s, ty)))
        for poly in _poligonos(rec.value):
            capa = Image.new("1", (L, L), 0)
            ImageDraw.Draw(capa).polygon(poly, fill=1)
            mascara = Image.frombytes("1", (L, L), bytes(a ^ b for a, b in zip(mascara.tobytes(), capa.tobytes())))
    img.paste(TINTA, mask=mascara)
    img = img.resize((lado, lado), Image.LANCZOS)
    img.save(salida, optimize=True)


def _poligonos(ops, pasos: int = 12):
    """Convierte las órdenes de RecordingPen (líneas y cuadráticas/cúbicas) en listas de puntos."""
    polis, actual, p0 = [], [], None
    for op, pts in ops:
        if op == "moveTo":
            actual = [pts[0]]
            p0 = pts[0]
        elif op == "lineTo":
            actual.append(pts[0])
            p0 = pts[0]
        elif op == "qCurveTo":
            # TrueType: varios puntos de control con puntos implícitos en medio.
            ctrl = list(pts[:-1])
            fin = pts[-1]
            segs = []
            for i, c in enumerate(ctrl):
                destino = fin if i == len(ctrl) - 1 else ((c[0] + ctrl[i + 1][0]) / 2, (c[1] + ctrl[i + 1][1]) / 2)
                segs.append((c, destino))
            for c, dst in segs:
                for t in range(1, pasos + 1):
                    u = t / pasos
                    actual.append(((1 - u) ** 2 * p0[0] + 2 * (1 - u) * u * c[0] + u * u * dst[0],
                                   (1 - u) ** 2 * p0[1] + 2 * (1 - u) * u * c[1] + u * u * dst[1]))
                p0 = dst
        elif op == "curveTo":
            c1, c2, dst = pts
            for t in range(1, pasos + 1):
                u = t / pasos
                actual.append(tuple((1 - u) ** 3 * p0[k] + 3 * (1 - u) ** 2 * u * c1[k] + 3 * (1 - u) * u * u * c2[k] + u ** 3 * dst[k] for k in (0, 1)))
            p0 = dst
        elif op in ("closePath", "endPath"):
            if len(actual) > 2:
                polis.append(actual)
            actual = []
    return polis


png(32, RAIZ / "site" / "favicon-32.png")
png(180, RAIZ / "site" / "apple-touch-icon.png")
print("ok favicon.svg", len(svg), "bytes; favicon-32.png; apple-touch-icon.png")
