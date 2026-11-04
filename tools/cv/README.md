# CV en PDF

Fuente del PDF que enlaza la web (`/cv/manuel-gregorio-medina-cv.pdf`). Esta carpeta no se publica.

- `cv.html` — el CV (A4, una página). Mismos textos que `site/index.html` (PLAN, punto 3), sin capturas.
  CSS en línea: aquí sí se puede, porque este HTML no lo sirve la web.
  Fuente JetBrains Mono cargada desde `../../site/fonts/` (las mismas woff2 de la web; se incrustan en el PDF).
- `foto.jpg` — retrato a color 5:6. `build.sh` lo sustituye por `site/img/foto.jpg` si existe, para que la web y el
  PDF usen la misma foto.
- `build.sh` — genera el PDF con Chrome headless y le pone los metadatos con pypdf.

## Regenerar

```bash
cd /Users/mgm/dev/agencia
bash tools/cv/build.sh
# → site/cv/manuel-gregorio-medina-cv.pdf: 1 página(s), … bytes
```

Lo que hace:

1. Copia `site/img/foto.jpg` a `tools/cv/foto.jpg` (si existe).
2. `Google Chrome --headless=new --no-pdf-header-footer --print-to-pdf=… file://…/tools/cv/cv.html`
   (tamaño A4 y márgenes salen de `@page` en el CSS; perfil temporal que se borra al acabar).
3. Con pypdf (entorno en `/tmp/pdfvenv`, se crea solo la primera vez; cámbialo con `PDFVENV=…`) pone
   Title «Manuel Gregorio Medina · CV» y Author «Manuel Gregorio Medina» y escribe el PDF en `site/cv/`.

Variables opcionales: `CHROME` (ruta del binario de Chrome) y `PDFVENV`.

## Comprobar

```bash
pdfinfo  site/cv/manuel-gregorio-medina-cv.pdf   # Pages: 1, Title, Author, Page size A4
pdffonts site/cv/manuel-gregorio-medina-cv.pdf   # JetBrainsMono-Regular y -Bold con emb = yes
pdftoppm -png -r 110 site/cv/manuel-gregorio-medina-cv.pdf /tmp/cv   # verlo como imagen
```

`pdfinfo`, `pdffonts` y `pdftoppm` vienen con poppler (`brew install poppler`).

## Si cambias textos

- Cambia también `site/index.html`: la web y el PDF deben decir lo mismo. Solo datos de FACTS (nada inventado).
- Si pasa a dos páginas, ajusta primero los espacios (`.item` padding, `section` margin, `line-height`);
  el cuerpo no debe bajar de 8,5 pt.
