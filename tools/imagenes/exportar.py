#!/usr/bin/env python3
"""Exporta una imagen fuente a los ficheros finales de site/img/ (WebP + respaldo).

Uso:
  python3 exportar.py <fuente> <nombre-sin-extension> <ancho>x<alto> [--png [--paleta]] [--fondo #rrggbb]

- Escala la fuente al tamaño exacto (recorta por abajo si la proporción no coincide:
  las capturas se anclan arriba).
- Escribe <nombre>.webp (calidad 82) y <nombre>.jpg (calidad 84, progresivo) o, con --png,
  <nombre>.png optimizado (para contenido plano tipo interfaz).
"""
import sys
from pathlib import Path

from PIL import Image

SITE_IMG = Path(__file__).resolve().parents[2] / "site" / "img"


def ajustar(img: Image.Image, w: int, h: int) -> Image.Image:
    """Escala a ancho w y recorta/rellena el alto a h (anclado arriba)."""
    sw, sh = img.size
    if abs(sw / sh - w / h) < 0.002:
        return img.resize((w, h), Image.LANCZOS)
    escala = w / sw
    nh = round(sh * escala)
    img = img.resize((w, nh), Image.LANCZOS)
    if nh >= h:
        return img.crop((0, 0, w, h))
    lienzo = Image.new("RGB", (w, h), img.getpixel((w // 2, nh - 1)))
    lienzo.paste(img, (0, 0))
    return lienzo


def main() -> None:
    args = sys.argv[1:]
    png = "--png" in args
    paleta = "--paleta" in args  # PNG de 256 colores (sin tramado): mucho menos peso en interfaces planas
    fondo = "#ffffff"
    if "--fondo" in args:
        fondo = args[args.index("--fondo") + 1]
        args.remove("--fondo")
        args.remove(fondo)
    args = [a for a in args if a not in ("--png", "--paleta")]
    fuente, nombre, tam = args
    w, h = (int(x) for x in tam.split("x"))
    img = Image.open(fuente)
    if img.mode in ("RGBA", "LA", "P"):
        img = img.convert("RGBA")
        base = Image.new("RGBA", img.size, fondo)
        base.alpha_composite(img)
        img = base
    img = img.convert("RGB")
    img = ajustar(img, w, h)
    SITE_IMG.mkdir(parents=True, exist_ok=True)
    salida_webp = SITE_IMG / f"{nombre}.webp"
    img.save(salida_webp, "WEBP", quality=82, method=6)
    if png:
        salida = SITE_IMG / f"{nombre}.png"
        if paleta:
            img.quantize(colors=256, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE).save(
                salida, "PNG", optimize=True
            )
        else:
            img.save(salida, "PNG", optimize=True)
    else:
        salida = SITE_IMG / f"{nombre}.jpg"
        img.save(salida, "JPEG", quality=84, optimize=True, progressive=True)
    for f in (salida_webp, salida):
        print(f"{f.name}\t{w}x{h}\t{f.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
