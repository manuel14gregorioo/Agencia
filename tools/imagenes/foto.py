#!/usr/bin/env python3
"""Retrato: recorte 5:6 cercano + retoque natural desde el original del iPhone.

Uso:
  sips -s format jpeg ~/Desktop/Proyectos/IMG_8092.heic --out /tmp/foto-original.jpg
  python3 foto.py /tmp/foto-original.jpg            # escribe /tmp/foto-fuente.png (480×576)
  python3 exportar.py /tmp/foto-fuente.png foto 480x576

Retoque: balance de blancos neutro tomando la pared como referencia gris, contraste suave
(curva lineal 1,06 alrededor del gris medio) y un enfoque muy ligero tras reducir. Nada más.
"""
import sys

import numpy as np
from PIL import Image, ImageFilter

src = Image.open(sys.argv[1] if len(sys.argv) > 1 else "/tmp/foto-original.jpg").convert("RGB")
# Recorte en píxeles del original (3024×4032). Cabeza (pelo→barbilla) ≈ 1589→2506: ~42 % del alto.
X0, Y0, W, H = 568, 1327, 1820, 2184
crop = src.crop((X0, Y0, X0 + W, Y0 + H))
a = np.asarray(crop).astype(np.float32)

# Pared de referencia: dos parches arriba a izquierda y derecha, lejos del pelo.
pared = np.concatenate([a[40:200, 40:300].reshape(-1, 3), a[40:200, W - 300:W - 40].reshape(-1, 3)])
media = pared.mean(axis=0)
gris = media.mean()
a *= gris / media  # canal a canal: la pared queda neutra

# Contraste suave alrededor de 128 y sin recortar luces.
a = (a - 128.0) * 1.06 + 128.0
a = np.clip(a, 0, 255).astype(np.uint8)
img = Image.fromarray(a).resize((480, 576), Image.LANCZOS)
img = img.filter(ImageFilter.UnsharpMask(radius=0.8, percent=35, threshold=2))
img.save("/tmp/foto-fuente.png")
print("pared antes", media.round(1), "-> neutra", round(float(gris), 1))
