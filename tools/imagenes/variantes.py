#!/usr/bin/env python3
"""Variantes pequeñas de las capturas para srcset (no sustituyen a las grandes).

Uso (después de exportar.py):  python3 variantes.py

Lee site/img/<nombre>.webp a tamaño completo y escribe site/img/<nombre>-<ancho>.webp (calidad 82):
  - capturas de escritorio y Pulso (1600 px) -> -800.webp
  - capturas de móvil (780 px)              -> -440.webp
"""
from pathlib import Path

from PIL import Image

SITE_IMG = Path(__file__).resolve().parents[2] / "site" / "img"

VARIANTES = {
    "norven-escritorio": 800,
    "vocap-escritorio": 800,
    "pulso-historial": 800,
    "norven-movil": 440,
    "vocap-movil": 440,
    "holgura-movil": 440,
}


def main() -> None:
    for nombre, ancho in VARIANTES.items():
        img = Image.open(SITE_IMG / f"{nombre}.webp").convert("RGB")
        alto = round(img.height * ancho / img.width)
        salida = SITE_IMG / f"{nombre}-{ancho}.webp"
        img.resize((ancho, alto), Image.LANCZOS).save(salida, "WEBP", quality=82, method=6)
        print(f"{salida.name}\t{ancho}x{alto}\t{salida.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
