---
name: n8n-node-dev
description: Expert guidance for developing custom n8n nodes. Use when creating, building, testing, or publishing n8n community nodes. Covers declarative and programmatic styles, credentials, UI patterns, Docker deployment, and npm publishing.
---

<system>
You are an expert n8n custom node developer. You have deep knowledge of:
- n8n node architecture (declarative and programmatic styles)
- TypeScript patterns for n8n nodes
- OAuth2 and API key authentication
- Docker deployment for testing
- npm publishing workflow

When helping with n8n node development, always follow best practices and the official n8n documentation patterns.
</system>

# n8n Custom Node Development Guide

## Project Structure

A complete n8n community node package should have this structure:

```
n8n-nodes-<service>/
├── .claude/                    # Claude Code configuration
│   ├── skills/
│   ├── commands/
│   └── agents/
├── credentials/                # OAuth2/API credentials
│   └── <Service>Api.credentials.ts
├── nodes/                      # Node implementations
│   └── <Service>/
│       ├── <Service>.node.ts   # Main node class
│       ├── <Service>.node.json # Codex metadata (REQUIRED for icons)
│       ├── <service>.svg       # Node icon (60x60)
│       └── resources/          # Resource-specific properties
│           └── <resource>/
│               └── <resource>.properties.ts
├── docker/
│   └── Dockerfile              # For local testing
├── dist/                       # Compiled output (git-ignored)
├── package.json                # With n8n section
├── tsconfig.json
├── gulpfile.js                 # MUST copy .svg AND .node.json files
├── eslint.config.mjs
├── .gitignore
└── README.md
```

## Critical Files

### package.json - n8n Section

```json
{
  "name": "n8n-nodes-<service>",
  "version": "0.1.0",
  "description": "n8n node for <Service>",
  "keywords": [
    "n8n-community-node-package"
  ],
  "n8n": {
    "n8nNodesApiVersion": 1,
    "credentials": [
      "dist/credentials/<Service>Api.credentials.js"
    ],
    "nodes": [
      "dist/nodes/<Service>/<Service>.node.js"
    ]
  }
}
```

### gulpfile.js - CRITICAL: Must Copy Both SVG and JSON

```javascript
const { src, dest } = require('gulp');

function buildIcons() {
  // IMPORTANT: Copy both .svg icons AND .node.json codex files
  return src(['nodes/**/*.svg', 'nodes/**/*.node.json']).pipe(dest('dist/nodes'));
}

exports['build:icons'] = buildIcons;
```

> **WARNING**: If you only copy .svg files, the node will load but show "No codex available" warning and may have display issues.

### tsconfig.json

```json
{
  "compilerOptions": {
    "strict": true,
    "module": "commonjs",
    "target": "es2019",
    "lib": ["es2019"],
    "declaration": true,
    "skipLibCheck": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "."
  },
  "include": ["nodes/**/*.ts", "credentials/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

## Node Implementation Patterns

### Declarative Style (Recommended for REST APIs)

```typescript
import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class MyService implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'My Service',
    name: 'myService',
    icon: 'file:myservice.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with My Service API',
    defaults: { name: 'My Service' },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [{ name: 'myServiceApi', required: true }],
    requestDefaults: {
      baseURL: 'https://api.myservice.com/v1',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
    properties: [
      // Resource selector
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          { name: 'Project', value: 'project' },
          { name: 'Task', value: 'task' },
        ],
        default: 'project',
      },
      // Operations and fields imported from resource files
      ...projectOperations,
      ...projectFields,
      ...taskOperations,
      ...taskFields,
    ],
  };
}
```

### Resource Properties Pattern

```typescript
// resources/project/project.properties.ts
import { INodeProperties } from 'n8n-workflow';

export const projectOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['project'] },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new project',
        action: 'Create a project',
        routing: {
          request: {
            method: 'POST',
            url: '/projects',
          },
        },
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get a project by ID',
        action: 'Get a project',
        routing: {
          request: {
            method: 'GET',
            url: '=/projects/{{$parameter.projectId}}',
          },
        },
      },
    ],
    default: 'get',
  },
];

export const projectFields: INodeProperties[] = [
  {
    displayName: 'Project ID',
    name: 'projectId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['project'],
        operation: ['get', 'update', 'delete'],
      },
    },
    default: '',
    description: 'The ID of the project',
  },
];
```

## OAuth2 Credentials

```typescript
import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class MyServiceOAuth2Api implements ICredentialType {
  name = 'myServiceOAuth2Api';
  displayName = 'My Service OAuth2 API';
  documentationUrl = 'https://docs.myservice.com/oauth';
  extends = ['oAuth2Api'];

  properties: INodeProperties[] = [
    {
      displayName: 'Grant Type',
      name: 'grantType',
      type: 'hidden',
      default: 'authorizationCode',
    },
    {
      displayName: 'Authorization URL',
      name: 'authUrl',
      type: 'hidden',
      default: 'https://myservice.com/oauth/authorize',
    },
    {
      displayName: 'Access Token URL',
      name: 'accessTokenUrl',
      type: 'hidden',
      default: 'https://api.myservice.com/oauth/token',
    },
    {
      displayName: 'Scope',
      name: 'scope',
      type: 'hidden',
      default: 'read write',
    },
    {
      displayName: 'Authentication',
      name: 'authentication',
      type: 'hidden',
      default: 'header', // or 'body' depending on API
    },
  ];
}
```

## Codex File (REQUIRED)

The `.node.json` file provides metadata for n8n's UI:

```json
{
  "node": "n8n-nodes-base.myService",
  "nodeVersion": "1.0",
  "codexVersion": "1.0",
  "categories": ["Productivity"],
  "resources": {
    "primaryDocumentation": [
      { "url": "https://docs.myservice.com/" }
    ]
  }
}
```

## Docker Deployment for Testing

### Dockerfile (CORRECT PATH: ~/.n8n/nodes)

```dockerfile
FROM n8nio/n8n:latest

USER root

# Create the community nodes directory (CORRECT path per n8n docs)
RUN mkdir -p /home/node/.n8n/nodes/node_modules/n8n-nodes-<service>/dist

# Initialize package.json in nodes directory
RUN echo '{"name":"n8n-custom-nodes","version":"1.0.0","dependencies":{}}' > /home/node/.n8n/nodes/package.json

# Copy package.json of the node
COPY package.json /home/node/.n8n/nodes/node_modules/n8n-nodes-<service>/

# Copy dist folder
COPY dist/ /home/node/.n8n/nodes/node_modules/n8n-nodes-<service>/dist/

# Set ownership
RUN chown -R node:node /home/node/.n8n

USER node
```

> **CRITICAL**: Use `~/.n8n/nodes` NOT `~/.n8n/custom`. The `N8N_CUSTOM_EXTENSIONS` env var is NOT needed when using the correct path.

### Build and Run Commands

```bash
# Build the node
pnpm run build

# Build Docker image
docker build -t n8n-<service> -f docker/Dockerfile .

# Run container
docker run -d --name n8n-<service> -p 5678:5678 n8n-<service>

# Check logs for node loading
docker logs n8n-<service> 2>&1 | grep -i "<service>"
```

## Common Issues and Troubleshooting

### Node Not Appearing in n8n UI

1. **Check Docker logs for loading message**:
   ```bash
   docker logs <container> 2>&1 | grep "Loaded all credentials and nodes"
   ```

2. **Verify correct path**: Must be `/home/node/.n8n/nodes/node_modules/<package>/`

3. **Check package.json n8n section**: Paths must match compiled files

4. **Verify codex file copied**:
   ```bash
   docker exec <container> ls -la /home/node/.n8n/nodes/node_modules/<package>/dist/nodes/<Node>/
   # Should show both .node.js AND .node.json
   ```

### "No codex available" Warning

Update `gulpfile.js` to copy `.node.json` files:
```javascript
return src(['nodes/**/*.svg', 'nodes/**/*.node.json']).pipe(dest('dist/nodes'));
```

### Icon Not Displaying

1. Verify SVG is 60x60 pixels
2. Check icon path in node: `icon: 'file:<name>.svg'`
3. Ensure gulpfile copies SVG files

### OAuth2 Not Working

1. Verify redirect URL matches n8n callback: `https://<n8n-url>/rest/oauth2-credential/callback`
2. Check `authentication` property: 'header' vs 'body'
3. Verify scopes match API requirements

## Development Workflow

1. **Analyze API** - Read OpenAPI spec or API docs
2. **Create credentials** - OAuth2 or API key
3. **Create node structure** - Main node + resource files
4. **Build** - `pnpm run build`
5. **Test in Docker** - Build image and verify loading
6. **Test in UI** - Create workflow and test operations
7. **Fix and iterate** - Check logs for errors
8. **Publish** - `npm publish` when ready

## Publishing to npm

```bash
# Ensure build is clean
pnpm run build

# Login to npm
npm login

# Publish
npm publish --access public
```

After publishing, users can install via:
- n8n UI: Settings > Community Nodes > Install
- CLI: `npm install n8n-nodes-<service>` in `~/.n8n/nodes`
