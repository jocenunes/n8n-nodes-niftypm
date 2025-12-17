---
description: Build the n8n node and verify output
---

Build the n8n custom node package and verify the output is correct.

## Steps

1. Run the build command:
   ```bash
   pnpm run build
   ```

2. Verify the dist folder structure:
   - Check that `dist/nodes/<Node>/<Node>.node.js` exists
   - Check that `dist/nodes/<Node>/<Node>.node.json` exists (codex)
   - Check that `dist/nodes/<Node>/<node>.svg` exists (icon)
   - Check that `dist/credentials/<Credential>.credentials.js` exists

3. If any files are missing from dist:
   - For `.node.json` or `.svg`: Check `gulpfile.js` includes them in the copy task
   - For `.js` files: Check `tsconfig.json` includes the source files

4. Report the build status and any issues found.

## Common Build Issues

- **Missing codex file**: Update gulpfile.js to include `nodes/**/*.node.json`
- **Missing icon**: Update gulpfile.js to include `nodes/**/*.svg`
- **TypeScript errors**: Check imports and type definitions
