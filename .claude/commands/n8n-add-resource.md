---
description: Add a new resource to the n8n node
args:
  - name: resourceName
    description: The name of the resource to add (e.g., "order", "product")
    required: true
---

Add a new resource to the n8n custom node with standard CRUD operations.

## Resource: $ARGUMENTS.resourceName

### Steps

1. Create the resource directory:
   ```
   nodes/<Node>/resources/$ARGUMENTS.resourceName/
   ```

2. Create the properties file with operations:
   - Get
   - Get Many
   - Create
   - Update
   - Delete

3. Update the main node file to:
   - Import the new resource operations and fields
   - Add the resource to the resource selector options
   - Include operations and fields in properties array

4. Build and test:
   ```bash
   pnpm run build
   ```

### Template for Resource Properties

```typescript
import { INodeProperties } from 'n8n-workflow';

export const $ARGUMENTS.resourceNameOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['$ARGUMENTS.resourceName'] },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new $ARGUMENTS.resourceName',
        action: 'Create a $ARGUMENTS.resourceName',
        routing: {
          request: {
            method: 'POST',
            url: '/$ARGUMENTS.resourceNames', // plural
          },
        },
      },
      // Add more operations...
    ],
    default: 'get',
  },
];

export const $ARGUMENTS.resourceNameFields: INodeProperties[] = [
  // Add fields for each operation
];
```

### Checklist

- [ ] Resource directory created
- [ ] Properties file created with operations
- [ ] Main node file updated with imports
- [ ] Resource added to selector
- [ ] Operations and fields spread into properties
- [ ] Build succeeds
- [ ] Resource appears in n8n UI
