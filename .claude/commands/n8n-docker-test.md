---
description: Build Docker image and test the node in n8n
---

Build a Docker image with the custom node and run n8n for testing.

## Prerequisites

- Node has been built (`pnpm run build`)
- Docker is installed and running

## Steps

1. Build the Docker image:
   ```bash
   docker build -t n8n-custom -f docker/Dockerfile .
   ```

2. Stop and remove any existing container:
   ```bash
   docker stop n8n-custom 2>/dev/null || true
   docker rm n8n-custom 2>/dev/null || true
   ```

3. Run the container with debug logging:
   ```bash
   docker run -d --name n8n-custom -p 5678:5678 -e N8N_LOG_LEVEL=debug n8n-custom
   ```

4. Wait for startup and check logs:
   ```bash
   sleep 8
   docker logs n8n-custom 2>&1 | grep -i "loaded.*credentials.*nodes"
   ```

5. Verify the node is loaded by looking for the package name in logs.

6. Report the test URL: http://localhost:5678

## Expected Success Log

```
Loaded all credentials and nodes from n8n-nodes-<package> {"credentials":N,"nodes":M}
```

## Troubleshooting

If node doesn't appear:
1. Check the Dockerfile uses correct path: `/home/node/.n8n/nodes/node_modules/`
2. Verify package.json has correct n8n section
3. Check all dist files are copied to container
