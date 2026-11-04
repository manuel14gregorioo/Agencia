#!/usr/bin/env bash
# Genera site/cv/manuel-gregorio-medina-cv.pdf a partir de tools/cv/cv.html.
# Uso: bash tools/cv/build.sh   (desde cualquier carpeta)
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
OUT="$ROOT/site/cv/manuel-gregorio-medina-cv.pdf"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
PDFVENV="${PDFVENV:-/tmp/pdfvenv}"
TMP="$(mktemp -d "${TMPDIR:-/tmp}/cvpdf.XXXXXX")"
trap 'rm -rf "$TMP"' EXIT

# 1. Foto: si la web ya tiene su retrato (site/img/foto.jpg, 5:6), se usa el mismo.
if [[ -f "$ROOT/site/img/foto.jpg" ]]; then
  cp "$ROOT/site/img/foto.jpg" "$HERE/foto.jpg"
fi

# 2. HTML -> PDF con Chrome headless (A4 y márgenes salen del @page del CSS).
"$CHROME" --headless=new --disable-gpu --no-first-run --no-default-browser-check \
  --user-data-dir="$TMP/profile" --allow-file-access-from-files \
  --no-pdf-header-footer --virtual-time-budget=5000 \
  --print-to-pdf="$TMP/cv.pdf" "file://$HERE/cv.html" 2>/dev/null

# 3. Metadatos (Title y Author) con pypdf; crea el entorno la primera vez.
if [[ ! -x "$PDFVENV/bin/python" ]]; then
  python3 -m venv "$PDFVENV"
  "$PDFVENV/bin/pip" install -q pypdf
fi
mkdir -p "$(dirname "$OUT")"
"$PDFVENV/bin/python" - "$TMP/cv.pdf" "$OUT" <<'PY'
import os, sys
from pypdf import PdfReader, PdfWriter
src, out = sys.argv[1], sys.argv[2]
w = PdfWriter(clone_from=PdfReader(src))
w.add_metadata({
    "/Title": "Manuel Gregorio Medina · CV",
    "/Author": "Manuel Gregorio Medina",
    "/Subject": "Currículum",
})
with open(out, "wb") as f:
    w.write(f)
r = PdfReader(out)
print(f"{out}: {len(r.pages)} página(s), {os.path.getsize(out)} bytes")
PY
