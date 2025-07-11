FROM node:18-alpine

WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar código fonte
COPY . .

# Compilar aplicação
RUN npm run build

# Usar nginx para servir arquivos estáticos
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Configurar nginx
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
