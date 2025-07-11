#!/bin/bash

echo "🚀 Iniciando WebChat Application..."

# Parar containers existentes
echo "🛑 Parando containers existentes..."
sudo docker compose down

# Construir e iniciar containers
echo "🏗️  Construindo e iniciando containers..."
sudo docker compose up -d --build

# Aguardar serviços ficarem prontos
echo "⏳ Aguardando serviços ficarem prontos..."
sleep 30

# Verificar status dos serviços
echo "🔍 Verificando status dos serviços..."
sudo docker compose ps

# Verificar logs
echo "📋 Logs dos serviços:"
sudo docker compose logs --tail=50

echo "✅ WebChat Application iniciado com sucesso!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:8080/api"
echo "🗄️  PostgreSQL: localhost:5432"
echo "🚀 Redis: localhost:6379"
echo "🐰 RabbitMQ Management: http://localhost:15672"
echo ""
echo "Para parar os serviços, execute: docker-compose down"
