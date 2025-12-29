#!/bin/bash

# n8n Nifty PM - Script de inicialização
# Uso: ./scripts/start.sh [opções]
#   --rebuild    Rebuilda o node antes de iniciar
#   --tunnel     Inicia o Cloudflare tunnel também

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
CONTAINER_NAME="n8n-nifty-test"
IMAGE_NAME="n8n-nifty"

# Chave de criptografia fixa para OAuth (NUNCA mude isso após criar credenciais)
N8N_ENCRYPTION_KEY="FTcijvB3188tPchucCDm40pZ/bGJC2iD"

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

REBUILD=false
TUNNEL=false

# Parse argumentos
for arg in "$@"; do
    case $arg in
        --rebuild)
            REBUILD=true
            shift
            ;;
        --tunnel)
            TUNNEL=true
            shift
            ;;
    esac
done

cd "$PROJECT_DIR"

# Rebuild se solicitado
if [ "$REBUILD" = true ]; then
    echo -e "${YELLOW}>>> Buildando node...${NC}"
    pnpm run build

    echo -e "${YELLOW}>>> Buildando imagem Docker...${NC}"
    docker build -t "$IMAGE_NAME" -f docker/Dockerfile .

    # Para e remove container existente para usar nova imagem
    echo -e "${YELLOW}>>> Removendo container antigo...${NC}"
    docker stop "$CONTAINER_NAME" 2>/dev/null || true
    docker rm "$CONTAINER_NAME" 2>/dev/null || true
fi

# Verifica se container existe
if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    # Container existe - verifica se tem porta mapeada
    if docker port "$CONTAINER_NAME" 2>/dev/null | grep -q "5678"; then
        if docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
            echo -e "${GREEN}>>> Container já está rodando${NC}"
        else
            echo -e "${YELLOW}>>> Iniciando container existente...${NC}"
            docker start "$CONTAINER_NAME"
        fi
    else
        # Container existe mas sem porta - recria
        echo -e "${YELLOW}>>> Container sem porta mapeada, recriando...${NC}"
        docker rm -f "$CONTAINER_NAME" 2>/dev/null || true
        docker run -d --name "$CONTAINER_NAME" \
            -p 5678:5678 \
            -v n8n-nifty-data:/home/node/.n8n \
            -e N8N_HOST=n8nlocal.ecombase.shop \
            -e N8N_PROTOCOL=https \
            -e WEBHOOK_URL=https://n8nlocal.ecombase.shop/ \
            -e N8N_EDITOR_BASE_URL=https://n8nlocal.ecombase.shop/ \
            -e N8N_ENCRYPTION_KEY="$N8N_ENCRYPTION_KEY" \
            -e N8N_PROXY_HOPS=1 \
            -e N8N_SECURE_COOKIE=false \
            "$IMAGE_NAME"
    fi
else
    # Container não existe, cria novo
    echo -e "${YELLOW}>>> Criando novo container...${NC}"
    docker run -d --name "$CONTAINER_NAME" \
        -p 5678:5678 \
        -v n8n-nifty-data:/home/node/.n8n \
        -e N8N_HOST=n8nlocal.ecombase.shop \
        -e N8N_PROTOCOL=https \
        -e WEBHOOK_URL=https://n8nlocal.ecombase.shop/ \
        -e N8N_EDITOR_BASE_URL=https://n8nlocal.ecombase.shop/ \
        -e N8N_ENCRYPTION_KEY="$N8N_ENCRYPTION_KEY" \
        -e N8N_PROXY_HOPS=1 \
        -e N8N_SECURE_COOKIE=false \
        "$IMAGE_NAME"
fi

echo -e "${GREEN}>>> n8n rodando em http://localhost:5678${NC}"

# Inicia tunnel se solicitado
if [ "$TUNNEL" = true ]; then
    echo -e "${YELLOW}>>> Iniciando OAuth Proxy (porta 5679)...${NC}"

    # Mata proxy anterior se existir
    pkill -f "oauth-proxy.js" 2>/dev/null || true
    sleep 1

    # Inicia o proxy OAuth que corrige o problema de + -> espaço no state
    nohup node "$SCRIPT_DIR/oauth-proxy.js" > /tmp/oauth-proxy.log 2>&1 &

    echo -e "${GREEN}>>> OAuth Proxy iniciado na porta 5679${NC}"
    echo -e "${YELLOW}    Logs em: /tmp/oauth-proxy.log${NC}"

    echo -e "${YELLOW}>>> Iniciando Cloudflare Tunnel...${NC}"

    # Mata tunnel anterior se existir
    pkill -f "cloudflared.*n8n-local" 2>/dev/null || true
    sleep 1

    nohup cloudflared tunnel --config ~/.cloudflared/config-n8n.yml run n8n-local > /tmp/cloudflared-n8n.log 2>&1 &

    echo -e "${GREEN}>>> Tunnel iniciado! Acesse: https://n8nlocal.ecombase.shop${NC}"
    echo -e "${YELLOW}    Logs em: /tmp/cloudflared-n8n.log${NC}"
fi

echo ""
echo -e "${GREEN}Pronto!${NC}"
