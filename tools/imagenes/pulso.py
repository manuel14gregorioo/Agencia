#!/usr/bin/env python3
"""Pulso: ventana real del historial sobre fondo #f0f0ea con margen (1600×1100).

Uso: python3 pulso.py [/ruta/a/ventana-historial.png] > escribe /tmp/pulso-historial-fuente.png
"""
import sys

from PIL import Image

FUENTE = sys.argv[1] if len(sys.argv) > 1 else "/Users/mgm/dev/pulso-web/site/img/ventana-historial.png"
W, H, ESCALA = 1600, 1100, 0.92  # misma proporción que la ventana (1920×1320)

ventana = Image.open(FUENTE).convert("RGBA")
w = round(W * ESCALA)
h = round(ventana.height * w / ventana.width)
ventana = ventana.resize((w, h), Image.LANCZOS)
lienzo = Image.new("RGBA", (W, H), "#f0f0ea")
lienzo.alpha_composite(ventana, ((W - w) // 2, (H - h) // 2))
lienzo.convert("RGB").save("/tmp/pulso-historial-fuente.png")
print("ok /tmp/pulso-historial-fuente.png", w, h)
