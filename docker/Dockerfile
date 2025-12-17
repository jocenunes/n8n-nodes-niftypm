FROM n8nio/n8n:2.1.0

USER root

# Create directory for custom nodes (outside .n8n so volume doesn't overwrite)
RUN mkdir -p /custom-nodes/node_modules/n8n-nodes-niftypm/dist

# Initialize package.json in nodes directory
RUN echo '{"name":"n8n-custom-nodes","version":"1.0.0","dependencies":{}}' > /custom-nodes/package.json

# Copy package.json of the node
COPY package.json /custom-nodes/node_modules/n8n-nodes-niftypm/

# Copy dist folder
COPY dist/ /custom-nodes/node_modules/n8n-nodes-niftypm/dist/

# Set ownership
RUN chown -R node:node /custom-nodes

# Set environment variable to tell n8n where custom nodes are
ENV N8N_CUSTOM_EXTENSIONS=/custom-nodes

USER node
