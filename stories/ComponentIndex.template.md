import { Meta } from '@storybook/addon-docs/blocks';

<Meta title="Component index" />

<style>{`
  .sbdocs-content h2 { margin-top: 4rem; }
  .sbdocs-content table { width: 100%; }
  .sbdocs-content td:first-child { white-space: nowrap; }
`}</style>

# Component index

Everything the library exports, what each one is for, and the path to import it from.

There are two entry points. `@scality/core-ui` is the stable surface;
`@scality/core-ui/dist/next` holds the newer version of a component whose predecessor is
still in use, so a redesign ships without breaking what is already installed. Where a name
is listed under both, the two entry points export the same component.

```jsx
import { Icon, Stack } from '@scality/core-ui';
import { Button, Box } from '@scality/core-ui/dist/next';
```

The groups follow the Storybook sidebar, and the exports the sidebar leaves uncategorised
are filed under the group they belong to. **Docs** goes to a component's guideline where
there is one and to its stories otherwise. An em dash means the fact is missing, not that
the export is obsolete.

## Buttons

{/* table: Buttons */}

## Inputs

Which of these to reach for is settled in [Guidelines/Selection Controls](?path=/docs/guidelines-selection-controls--stories).

{/* table: Inputs */}

## Forms

A `Form` holds `FormSection`s, and a section holds `FormGroup`s. Each level throws if used outside the one above it.

{/* table: Forms */}

## Navigation

{/* table: Navigation */}

## Feedback

Banner stays until the condition it reports clears; Toast reports something that already finished and dismisses itself.

{/* table: Feedback */}

## Data display

{/* table: Data display */}

## Charts

The shared conventions — colours, axes, tooltips, time spans — are in [Guidelines/Chart](?path=/docs/guidelines-chart--stories).

{/* table: Charts */}

## Progress and loading

{/* table: Progress and loading */}

## Layout

The four frames place a whole page. `Box` places one thing inside it, and `Stack` and `Wrap` are built on `Box`.

{/* table: Layout */}

## Text and icons

The presets below `Text` are `Text` with its props already set. Reach for a preset first, and for `Text` itself when the combination is not one of them.

{/* table: Text and icons */}

## Theme, values and helpers

{/* table: Theme, values and helpers */}

## Documented but not exported

`StatusIcon` and `AttachmentTable` each have a story in this Storybook and are exported
from neither entry point, so nothing outside the repository can import them.
