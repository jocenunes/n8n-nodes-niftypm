FROM n8nio/n8n:2.1.4

USER root

# Copy compiled node files to a staging location
RUN mkdir -p /custom-node
COPY dist/ /custom-node/

# Create entrypoint script that copies files to ~/.n8n/custom/ at runtime
# This is necessary because ~/.n8n is typically a mounted volume
RUN echo '#!/bin/sh' > /docker-entrypoint.sh && \
    echo 'mkdir -p /home/node/.n8n/custom' >> /docker-entrypoint.sh && \
    echo 'cp -r /custom-node/* /home/node/.n8n/custom/' >> /docker-entrypoint.sh && \
    echo 'chown -R node:node /home/node/.n8n/custom' >> /docker-entrypoint.sh && \
    echo 'exec n8n "$@"' >> /docker-entrypoint.sh && \
    chmod +x /docker-entrypoint.sh && \
    chown -R node:node /custom-node

USER node

ENTRYPOINT ["/docker-entrypoint.sh"]
