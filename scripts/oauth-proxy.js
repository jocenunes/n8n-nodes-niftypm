#!/usr/bin/env node
/**
 * OAuth Proxy Server for n8n with WebSocket Support
 *
 * This proxy:
 * 1. Fixes the base64 URL encoding issue where '+' characters
 *    in the OAuth state parameter are converted to spaces
 * 2. Handles WebSocket connections for n8n's /rest/push endpoint
 * 3. Rewrites Origin headers for proper CORS handling behind tunnel
 */

const http = require('http');
const net = require('net');
const url = require('url');

const PROXY_PORT = 5679;
const N8N_HOST = 'localhost';
const N8N_PORT = 5678;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  console.log(`[HTTP] ${req.method} ${parsedUrl.pathname}`);

  // Check if this is an OAuth callback
  if (parsedUrl.pathname.includes('/rest/oauth2-credential/callback')) {
    console.log('>>> OAuth callback detected!');

    // Get the state parameter
    let state = parsedUrl.query.state;

    if (state) {
      // Count spaces (which were originally '+' characters)
      const spaceCount = (state.match(/ /g) || []).length;

      if (spaceCount > 0) {
        console.log(`>>> Fixing state: ${spaceCount} spaces -> '+'`);
        
        // Fix: replace spaces back to '+'
        const fixedState = state.replace(/ /g, '+');
        parsedUrl.query.state = fixedState;

        // Rebuild the URL
        const queryParams = new URLSearchParams();
        for (const [key, value] of Object.entries(parsedUrl.query)) {
          queryParams.append(key, value);
        }

        const newPath = parsedUrl.pathname + '?' + queryParams.toString();
        forwardRequest(req, res, newPath);
        return;
      }
    }
  }

  // Forward all other requests unchanged
  forwardRequest(req, res, req.url);
});

function forwardRequest(originalReq, originalRes, path) {
  // Rewrite headers to fix Origin mismatch
  const headers = { ...originalReq.headers };
  headers.host = `${N8N_HOST}:${N8N_PORT}`;
  
  // Rewrite Origin header to match what n8n expects
  if (headers.origin) {
    headers.origin = `http://${N8N_HOST}:${N8N_PORT}`;
  }
  
  const options = {
    hostname: N8N_HOST,
    port: N8N_PORT,
    path: path,
    method: originalReq.method,
    headers: headers
  };

  const proxyReq = http.request(options, (proxyRes) => {
    console.log(`[HTTP] ${originalReq.method} ${path} -> ${proxyRes.statusCode}`);

    // Copy response headers
    for (const [key, value] of Object.entries(proxyRes.headers)) {
      if (key.toLowerCase() !== 'transfer-encoding') {
        originalRes.setHeader(key, value);
      }
    }

    originalRes.statusCode = proxyRes.statusCode;
    proxyRes.pipe(originalRes);
  });

  proxyReq.on('error', (err) => {
    console.error('[HTTP] Proxy error:', err.message);
    originalRes.statusCode = 502;
    originalRes.end('Proxy error: ' + err.message);
  });

  originalReq.pipe(proxyReq);
}

/**
 * Handle WebSocket upgrade requests
 * This is crucial for n8n's /rest/push endpoint which uses WebSocket
 */
server.on('upgrade', (req, socket, head) => {
  console.log(`[WS] Upgrade request: ${req.url}`);

  // Create connection to n8n
  const n8nSocket = net.connect(N8N_PORT, N8N_HOST, () => {
    // Build the upgrade request with corrected headers
    const headers = [];
    headers.push(`${req.method} ${req.url} HTTP/1.1`);
    headers.push(`Host: ${N8N_HOST}:${N8N_PORT}`);
    
    // Copy headers, fixing Origin
    for (const [key, value] of Object.entries(req.headers)) {
      const lowerKey = key.toLowerCase();
      if (lowerKey === 'host') {
        continue; // Already added
      } else if (lowerKey === 'origin') {
        headers.push(`Origin: http://${N8N_HOST}:${N8N_PORT}`);
      } else {
        headers.push(`${key}: ${value}`);
      }
    }
    
    headers.push('');
    headers.push('');
    
    const upgradeRequest = headers.join('\r\n');
    n8nSocket.write(upgradeRequest);
    
    // Write any data that came with the upgrade request
    if (head && head.length) {
      n8nSocket.write(head);
    }

    console.log(`[WS] Connected to n8n, proxying WebSocket`);

    // Pipe data bidirectionally
    socket.pipe(n8nSocket);
    n8nSocket.pipe(socket);
  });

  n8nSocket.on('error', (err) => {
    console.error('[WS] n8n connection error:', err.message);
    socket.end();
  });

  socket.on('error', (err) => {
    console.error('[WS] Client socket error:', err.message);
    n8nSocket.end();
  });

  n8nSocket.on('close', () => {
    socket.end();
  });

  socket.on('close', () => {
    n8nSocket.end();
  });
});

server.listen(PROXY_PORT, () => {
  console.log(`\n${'='.repeat(60)}`);
  console.log('n8n OAuth + WebSocket Proxy');
  console.log(`${'='.repeat(60)}`);
  console.log(`\nProxy: http://localhost:${PROXY_PORT}`);
  console.log(`Target: http://${N8N_HOST}:${N8N_PORT}`);
  console.log(`\nFeatures:`);
  console.log(`  - OAuth state parameter fix (+ to space)`);
  console.log(`  - WebSocket proxy for /rest/push`);
  console.log(`  - Origin header rewriting`);
  console.log(`\nConfigure Cloudflare tunnel to port ${PROXY_PORT}\n`);
});
