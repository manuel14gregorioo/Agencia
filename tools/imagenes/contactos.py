#!/usr/bin/env python3
"""Hoja de contactos de todas las imágenes finales de site/ (para revisarlas de un vistazo).

Uso: python3 contactos.py <salida.png> [render-del-favicon-svg.png]
"""
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

SITE = Path(__file__).resolve().parents[2] / "site"
FUENTE = ImageFont.truetype("/System/Library/Fonts/Menlo.ttc", 15)
FICHAS = [
    ("img/foto.webp", 240), ("img/norven-escritorio.webp", 560), ("img/norven-movil.webp", 162),
    ("img/vocap-escritorio.webp", 560), ("img/vocap-movil.webp", 162), ("img/pulso-historial.webp", 560),
    ("img/holgura-movil.webp", 162), ("img/og.png", 560), ("apple-touch-icon.png", 180), ("favicon-32.png", 32),
]
if len(sys.argv) > 2:
    FICHAS.append((sys.argv[2], 128))

M, ALTO_FILA, ANCHO = 24, 420, 1880
lienzo = Image.new("RGB", (ANCHO, 2000), "#e9e9e3")
d = ImageDraw.Draw(lienzo)
x = y = M
alto_max = 0
for ruta, ancho in FICHAS:
    p = Path(ruta) if Path(ruta).is_absolute() else SITE / ruta
    im = Image.open(p).convert("RGB")
    h = round(im.height * ancho / im.width)
    if x + ancho > ANCHO - M:
        x, y = M, y + alto_max + 48
        alto_max = 0
    lienzo.paste(im.resize((ancho, h), Image.LANCZOS), (x, y))
    kb = p.stat().st_size / 1024
    d.text((x, y + h + 6), f"{p.name} {im.width}×{im.height} {kb:.0f} KB", fill="#151515", font=FUENTE)
    x += max(ancho, 300 if ancho < 300 else ancho) + M
    alto_max = max(alto_max, h + 24)
lienzo = lienzo.crop((0, 0, ANCHO, y + alto_max + M))
lienzo.save(sys.argv[1])
print("ok", sys.argv[1], lienzo.size)
