---
description: Verify the n8n node package is correctly configured
---

Perform a comprehensive verification of the n8n custom node package.

## Verification Checklist

### 1. Package Configuration

Check `package.json`:
- [ ] Has `n8n-community-node-package` in keywords
- [ ] Has `n8n` section with `n8nNodesApiVersion: 1`
- [ ] `credentials` array points to correct dist paths
- [ ] `nodes` array points to correct dist paths

### 2. Node Files

For each node in `nodes/`:
- [ ] `<Node>.node.ts` - Main node class exists
- [ ] `<Node>.node.json` - Codex metadata exists
- [ ] `<node>.svg` - Icon file exists (60x60)
- [ ] Icon referenced correctly: `icon: 'file:<name>.svg'`

### 3. Credentials

For each credential in `credentials/`:
- [ ] File exports a class implementing `ICredentialType`
- [ ] Class name matches file name
- [ ] `name` property is camelCase
- [ ] `displayName` is user-friendly
- [ ] For OAuth2: extends `oAuth2Api`

### 4. Build Configuration

Check `gulpfile.js`:
- [ ] Copies `*.svg` files to dist
- [ ] Copies `*.node.json` files to dist

Check `tsconfig.json`:
- [ ] Includes `nodes/**/*.ts`
- [ ] Includes `credentials/**/*.ts`
- [ ] Output directory is `./dist`

### 5. Docker Configuration

Check `docker/Dockerfile`:
- [ ] Uses correct base image (`n8nio/n8n:latest`)
- [ ] Creates correct directory structure: `/home/node/.n8n/nodes/node_modules/<package>/`
- [ ] Copies both `package.json` and `dist/` folder
- [ ] Sets correct ownership to `node:node`

### 6. Build Test

```bash
pnpm run build
```

Verify dist contains:
- [ ] `dist/nodes/<Node>/<Node>.node.js`
- [ ] `dist/nodes/<Node>/<Node>.node.json`
- [ ] `dist/nodes/<Node>/<node>.svg`
- [ ] `dist/credentials/<Credential>.credentials.js`

## Run Full Verification

Execute all checks and report any issues found.
