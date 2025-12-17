#!/bin/bash

# n8n Nifty PM - Script de parada
# Uso: ./scripts/stop.sh [opções]
#   --tunnel    Para o Cloudflare tunnel também
#   --all       Para tudo (container + tunnel)

set -e

CONTAINER_NAME="n8n-nifty-test"

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

STOP_TUNNEL=false

# Parse argumentos
for arg in "$@"; do
    case $arg in
        --tunnel|--all)
            STOP_TUNNEL=true
            shift
            ;;
    esac
done

# Para container
if docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo -e "${YELLOW}>>> Parando container n8n...${NC}"
    docker stop "$CONTAINER_NAME"
    echo -e "${GREEN}>>> Container parado${NC}"
else
    echo -e "${YELLOW}>>> Container não está rodando${NC}"
fi

# Para tunnel se solicitado
if [ "$STOP_TUNNEL" = true ]; then
    echo -e "${YELLOW}>>> Parando Cloudflare Tunnel...${NC}"
    pkill -f "cloudflared.*n8n-local" 2>/dev/null || true
    echo -e "${GREEN}>>> Tunnel parado${NC}"
fi

echo -e "${GREEN}Pronto!${NC}"
