#!/bin/bash

# ============================================
# SCRIPT DE INSTALACIÓN
# ============================================

echo "📦 Instalando AgenciaDev..."
echo ""

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

# Backend
echo "🐍 Configurando Backend (Python/Flask)..."
cd "$ROOT_DIR/backend"
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
echo "   ✅ Backend configurado"
echo ""

# Frontend
echo "⚛️  Configurando Frontend (React/Vite)..."
cd "$ROOT_DIR/frontend"
npm install
echo "   ✅ Frontend configurado"
echo ""

echo "🎉 Instalación completada!"
echo ""
echo "Para iniciar:"
echo "  docker-compose up --build"
echo ""
echo "O manualmente:"
echo "  Terminal 1: cd backend && source venv/bin/activate && python run.py"
echo "  Terminal 2: cd frontend && npm run dev"
