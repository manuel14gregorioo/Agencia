#!/bin/bash

# ============================================
# SCRIPT DE INICIO - DESARROLLO LOCAL
# ============================================

echo "🚀 Iniciando AgenciaDev en modo desarrollo..."
echo ""

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Directorio raíz
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

# Verificar si existe venv
if [ ! -d "$ROOT_DIR/backend/venv" ]; then
    echo -e "${BLUE}📦 Creando entorno virtual Python...${NC}"
    cd "$ROOT_DIR/backend"
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    echo ""
fi

# Verificar si existe node_modules
if [ ! -d "$ROOT_DIR/frontend/node_modules" ]; then
    echo -e "${BLUE}📦 Instalando dependencias Node...${NC}"
    cd "$ROOT_DIR/frontend"
    npm install
    echo ""
fi

# Crear .env si no existe
if [ ! -f "$ROOT_DIR/backend/.env" ]; then
    echo -e "${BLUE}📝 Creando archivo .env...${NC}"
    cp "$ROOT_DIR/backend/.env.example" "$ROOT_DIR/backend/.env"
    echo ""
fi

echo -e "${GREEN}✅ Dependencias listas${NC}"
echo ""
echo "Para iniciar los servidores:"
echo ""
echo "  Terminal 1 (Backend):"
echo "    cd backend && source venv/bin/activate && python run.py"
echo ""
echo "  Terminal 2 (Frontend):"
echo "    cd frontend && npm run dev"
echo ""
echo "URLs:"
echo "  - Frontend: http://localhost:5173"
echo "  - Backend:  http://localhost:5000"
echo "  - API:      http://localhost:5000/api"
echo ""
