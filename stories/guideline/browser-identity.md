# Browser Identity

Guidelines for favicon and browser tab title across all products.

## Favicon

Every product must have a distinct favicon. Without one, tabs are indistinguishable in multi-tab workflows.

- Format: SVG (supports dark mode via `prefers-color-scheme`) with a PNG 32×32 fallback
- One favicon per product, not per company

## Tab title format

```
Page · PRODUCT
```

- **Page**: the label of the active top-level navigation item
- **PRODUCT**: the product name, in uppercase

The page name comes first so that tabs remain scannable when multiple instances of the same app are open. The favicon handles product identification.

### Edge cases

- **Modal or side panel open**: title stays that of the underlying page
- **Wizard**: use the wizard name, not the current step (for example, `Create User · PRODUCT`)
- **Dynamic route with a resource name**: use the resource name if available (for example, `Bucket "my-bucket" · PRODUCT`), or fall back to the resource type while loading

### Examples

```
Buckets · PRODUCT
Cluster Overview · PRODUCT
Create User · PRODUCT
```

## Future consideration

Including the deployment name (for example, `Buckets · PRODUCT (paris-dc)`) could help users who manage multiple deployments in separate tabs. Not adopted yet pending a clear strategy for how apps surface deployment identity.
