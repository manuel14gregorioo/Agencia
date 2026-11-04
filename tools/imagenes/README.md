# Imágenes de la web-CV: cómo regenerarlas

Todo sale a `site/img/` (y los iconos a `site/`). Scripts en esta carpeta; nada de aquí se publica.

| Fichero final | Tamaño | De dónde sale |
|---|---|---|
| `img/foto.webp` + `.jpg` | 480×576 | original del iPhone `~/Desktop/Proyectos/IMG_8092.heic` → `foto.py` |
| `img/norven-escritorio.webp` + `.jpg` | 1600×1000 | norven.io a 1280×800 CSS px, 2× → `shot.mjs` |
| `img/norven-movil.webp` + `.jpg` | 780×1688 | captura REAL de la app NorvenAgro en su ficha del App Store (`3-parcela.png`) |
| `img/vocap-escritorio.webp` + `.jpg` | 1600×1000 | vocap.io a 1280×800, 2× |
| `img/vocap-movil.webp` + `.jpg` | 780×1688 | vocap.io a 390×844, 2× |
| `img/pulso-historial.webp` + `.png` | 1600×1100 | ventana real `/Users/mgm/dev/pulso-web/site/img/ventana-historial.png` → `pulso.py` |
| `img/holgura-movil.webp` + `.jpg` | 780×1688 | app Holgura (`dist`) con `/?demo` a 390×844, 2×, tema claro |
| `img/og.png` | 1200×630 | `og.html` capturado con Chrome |
| `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` | 32 / 180 | `favicon.py` («MG» de JetBrains Mono 700 pasado a trazos) |

`exportar.py <fuente> <nombre> <ancho>x<alto> [--png [--paleta]]` escala al tamaño exacto (recorta por abajo si
la proporción no cuadra) y escribe WebP calidad 82 + JPEG calidad 84 progresivo (o PNG; `--paleta` = 256 colores).

## 0. Chrome headless (uno solo; ciérralo al acabar)

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars \
  --remote-debugging-port=9351 --remote-allow-origins='*' --user-data-dir=/tmp/cdp-imagenes \
  --host-resolver-rules="MAP norven.io 69.46.46.43, MAP vocap.io 69.46.46.95" about:blank &
echo $! > /tmp/cdp-imagenes.pid; sleep 4   # tarda en abrir el puerto
export CDP_PORT=9351
cd /Users/mgm/dev/agencia/tools/imagenes
```

(`--host-resolver-rules` porque el DNS de Hostinger falla a ratos; si las IP cambian, `railway domain` o el panel.)
`shot.mjs` espera a `load`, a `document.fonts.ready` y a todas las `<img>`, y 1,5 s más. Variables: `TEMA=light|dark`
fuerza `prefers-color-scheme`; `DSF=1` cambia la densidad (por defecto 2).

## 1. Capturas de norven.io y vocap.io

```bash
B=/tmp/capturas && mkdir -p $B
node shot.mjs https://norven.io/ $B/norven-escritorio.png escritorio
node shot.mjs https://vocap.io/  $B/vocap-escritorio.png  escritorio
node shot.mjs https://vocap.io/  $B/vocap-movil.png       movil
python3 exportar.py $B/norven-escritorio.png norven-escritorio 1600x1000
python3 exportar.py $B/vocap-escritorio.png  vocap-escritorio  1600x1000
python3 exportar.py $B/vocap-movil.png       vocap-movil       780x1688
```

## 2. Norven en móvil: la app de verdad, de la ficha del App Store

```bash
D=/tmp/appstore && mkdir -p $D
curl -sL -A "Mozilla/5.0 (Macintosh) Safari/605.1.15" https://apps.apple.com/es/app/norvenagro/id6791729900 -o $D/page.html
# Lista las capturas de iPhone (0-carga, 2-mapa-sigpac, 3-parcela, 4-parcelas, 5-cuaderno, 6-tareas, 7-tratamiento):
grep -oE 'https://is[0-9]-ssl\.mzstatic\.com/image/thumb/PurpleSource[^" ,]+/[0-9]+-[a-z-]+\.png' $D/page.html | sort -u
# mzstatic sirve cualquier tamaño añadiendo /<ancho>x<alto>bb.png a la URL:
curl -s "<URL de 3-parcela.png>/780x1688bb.png" -o $D/3-parcela.png
python3 exportar.py $D/3-parcela.png norven-movil 780x1688
```

Si algún día no se pudiera, la alternativa es la web: `node shot.mjs https://norven.io/ $B/norven-movil.png movil`
(y cambiar el alt a «Página de inicio de norven.io en un móvil»).

## 3. Holgura (`/?demo`, tema claro)

```bash
(cd /Users/mgm/dev/plan-vida/apps/app/dist && python3 -m http.server 8768 --bind 127.0.0.1 & echo $! > /tmp/holgura.pid)
sleep 1; TEMA=light node shot.mjs "http://127.0.0.1:8768/?demo" $B/holgura-movil.png movil
kill $(cat /tmp/holgura.pid)
python3 exportar.py $B/holgura-movil.png holgura-movil 780x1688
```

(Sin `TEMA=light` sale el tema oscuro si el Mac está en modo oscuro.)

## 4. Pulso (ventana real sobre #f0f0ea, sin nada de la landing)

```bash
python3 pulso.py    # -> /tmp/pulso-historial-fuente.png (ventana al 92 % del ancho, centrada)
python3 exportar.py /tmp/pulso-historial-fuente.png pulso-historial 1600x1100 --png --paleta
```

## 5. Foto (a color, recorte 5:6, retoque natural)

```bash
sips -s format jpeg ~/Desktop/Proyectos/IMG_8092.heic --out /tmp/foto-original.jpg
python3 foto.py /tmp/foto-original.jpg      # -> /tmp/foto-fuente.png 480×576
python3 exportar.py /tmp/foto-fuente.png foto 480x576
```

`foto.py`: recorte fijo en píxeles del original (cabeza ≈ 42 % del alto, sin cortar el pelo), balance de blancos
tomando la pared como gris neutro, contraste ×1,06 y un enfoque muy ligero tras reducir. Sin filtros.

## 6. Imagen og (LinkedIn y demás)

Usa la foto ya exportada, así que va después del paso 5.

```bash
(cd /Users/mgm/dev/agencia && python3 -m http.server 8770 --bind 127.0.0.1 & echo $! > /tmp/og.pid); sleep 1
DSF=1 node shot.mjs http://127.0.0.1:8770/tools/imagenes/og.html ../../site/img/og.png escritorio 1200 630
kill $(cat /tmp/og.pid)
python3 -c "from PIL import Image; p='../../site/img/og.png'; Image.open(p).convert('RGB').save(p, optimize=True)"
```

Se sirve desde la raíz del repo porque `og.html` carga `/site/fonts/*.woff2` y `/site/img/foto.jpg`
(desde `file://` Chrome no carga las fuentes).

## 7. Iconos

```bash
python3 -m venv /tmp/fontvenv && /tmp/fontvenv/bin/pip install fonttools brotli pillow
/tmp/fontvenv/bin/python favicon.py
```

## 7 bis. Variantes pequeñas para `srcset`

```bash
python3 variantes.py   # -> img/*-escritorio-800.webp, pulso-historial-800.webp, *-movil-440.webp
```

Rehazlas siempre que cambie una captura: la web las usa en `srcset` (móvil y pantallas de 1×).

## 8. Cerrar y revisar

```bash
kill $(cat /tmp/cdp-imagenes.pid); rm -rf /tmp/cdp-imagenes
python3 contactos.py /tmp/contactos.png    # hoja de contactos con tamaños y pesos
```

Requisitos: Python 3 con Pillow (con WebP), Node 22+ (WebSocket y fetch nativos), Google Chrome.
