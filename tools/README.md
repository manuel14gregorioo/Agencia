# tools/ — cómo regenerar lo que no se escribe a mano

Nada de esta carpeta se publica (la web es solo `site/`). Dos partes, cada una con su README y comandos exactos:

| Qué | Dónde | Comando principal |
|---|---|---|
| CV en PDF (`site/cv/manuel-gregorio-medina-cv.pdf`) | [`cv/README.md`](cv/README.md) | `bash tools/cv/build.sh` |
| Foto, capturas, variantes para `srcset`, imagen og e iconos (`site/img/`, `site/favicon*`) | [`imagenes/README.md`](imagenes/README.md) | ver pasos 0-8 |

## Resumen

```bash
cd /Users/mgm/dev/agencia

# CV en PDF (Chrome headless + pypdf). Si cambias textos, cambia también site/index.html.
bash tools/cv/build.sh

# Imágenes: capturas y exportación (detalle en tools/imagenes/README.md)
cd tools/imagenes
python3 exportar.py <fuente> <nombre> <ancho>x<alto> [--png [--paleta]]   # WebP + respaldo a tamaño final
python3 variantes.py                                                     # -800.webp y -440.webp para srcset
/tmp/fontvenv/bin/python favicon.py                                      # iconos
python3 contactos.py /tmp/contactos.png                                  # hoja de contactos para revisar
```

Requisitos: Google Chrome, Python 3 con Pillow (con WebP), Node 22+ y, para comprobar el PDF, poppler
(`pdfinfo`, `pdffonts`, `pdftoppm`). Un solo Chrome headless a la vez y ciérralo al acabar.
