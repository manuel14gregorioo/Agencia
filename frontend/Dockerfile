# ============================================
# FRONTEND DOCKERFILE
# ============================================

FROM node:20-alpine

WORKDIR /app

# Copiar package.json primero para cache de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY . .

# Exponer puerto de desarrollo
EXPOSE 5173

# Comando para desarrollo
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
