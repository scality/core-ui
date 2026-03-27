# RING UI → CoreUI Design System: Lessons Learned

This document is specifically about reconstructing the **RING** (Scality product) UI using the `@scality/core-ui` design system. It documents lessons learned while creating the `Templates/RING Volumes List` and `Templates/RING Connectors` stories.

---

## 1. Figma → CoreUI Workflow

### Using the Figma MCP
- Extract `fileKey` and `nodeId` from the Figma URL:
  `figma.com/design/:fileKey/...?node-id=3761-30667` → convert `-` to `:` in the nodeId.
- Call `get_design_context` with these parameters. The response contains React+Tailwind as a **reference** — not production-ready code. Everything must be adapted to styled-components + DS tokens.
- **Code Connect is not available** without an Enterprise Figma plan. Mapping must be done manually.
- The `figma-mapping.json` file at the project root contains a Figma→core-ui table with known divergences (e.g. `switch`→`Toggle`, `Type=delete`→`danger`).

### Exporting SVG assets from Figma
- Retrieve the SVG via `get_design_context` or by inspecting the Figma node directly.
- Place it in `.storybook/public/` (served via `staticDirs: ['./public']` in the Storybook config).
- Reference it with an absolute path: `/filename.svg`.

---

## 2. Figma RING Component Mapping → CoreUI

| Figma (RING)                   | CoreUI / core-ui                                       |
|-------------------------------|--------------------------------------------------------|
| Navbar                        | `Navbar` (`src/lib/components/navbar`)                 |
| Table                         | `Table` from `tablev2` — flex-based columns, not px    |
| Button                        | `Button` from `next.ts`                                |
| SearchInput + status filter   | `Table.SearchWithQueryParams` + `HealthSelector`       |
| Secondary navigation tabs     | Custom `SecondaryNavTab` (`styled.button`)              |
| Stat cards (126 GB / META)    | Custom `RingStatCard` (`styled.a`)                     |
| Donuts / rings                | Custom SVG `ScalityRings`                              |
| Service cards                 | Custom `ServiceCard` (`styled.a`)                      |
| Hardware / server units       | Custom with SVG asset exported from Figma              |
| Multi-level sub-navigation    | Custom `SubNav1Tab` / `SubNav2Tab` (`styled.button`)   |

### When there is no DS equivalent
Create a custom styled-components component following DS conventions:
- `getThemePropSelector('token')` for theme colors
- `spacing` from `src/lib/spacing.tsx` for spacing (`spacing.r8`, `spacing.r16`, etc.)
- `Stack` for common flexbox layouts
- `Text` for typography
- Reproduce DS interaction patterns: `background: highlight` on hover, `outline-color: selectedActive` on focus

### Figma typography → `Text` variant mapping
| Figma           | `Text` variant  |
|-----------------|-----------------|
| Large heading   | `Larger`        |
| Section title   | `Large`         |
| Body text       | `Basic`         |
| Small label     | `Smaller`       |

---

## 3. Forcing the ring9dark Theme in a Story

`globals: { theme: 'ring9dark' }` on the Storybook meta sets the toolbar default but does not protect against browser default colors. The robust method is to **explicitly wrap in the render function**:

```tsx
import { CoreUiThemeProvider } from '../../src/lib/next';
import { coreUIAvailableThemes } from '../../src/lib/style/theme';

export const Default: Story = {
  render: () => (
    <CoreUiThemeProvider theme={coreUIAvailableThemes.ring9dark}>
      <RingVolumesList />
    </CoreUiThemeProvider>
  ),
};
```

> Note: use `globals` directly on the meta object, **not** inside `parameters.globals` (which does not work).

---

## 4. The `styled.a` Color Trap

Any `styled.a` without an explicit `color` inherits the browser's default link color (blue for unvisited, **violet/purple for visited**). Child `Text` components without a `color` prop also inherit this color.

**Always add on a `styled.a`:**
```css
color: ${getThemePropSelector('textPrimary')};
text-decoration: none;
```

For navigation elements that trigger a JS action (not actual links), prefer `styled.button` to avoid this trap entirely.

---

## 5. Tokens to Watch by Theme

| Token           | darkRebrand         | ring9dark     | Pitfall                                      |
|-----------------|---------------------|---------------|----------------------------------------------|
| `infoSecondary` | `#333366` (purple!) | dark gray     | Do not use for neutral colors                |
| `backgroundLevel4` | purple-tinted   | neutral dark  | Avoid for card backgrounds                   |

For inactive / zero-value icons: use the `border` token instead of `infoSecondary`.

---

## 6. SVG Arcs for RING Donuts

`strokeDasharray` on an `<ellipse>` produces visual artifacts: the browser uses the **actual arc length** of the ellipse (not the Ramanujan approximation), which breaks the dash calculation.

**Solution: use the SVG path `A` (arc to) command** with angle-based coordinates:

```tsx
const pt = (cy: number, deg: number) => ({
  x: cx + rx * Math.cos((deg * Math.PI) / 180),
  y: cy + ry * Math.sin((deg * Math.PI) / 180),
});

const arcPath = (cy: number, pct: number): string => {
  const sweep = Math.min(pct * 360, 359.9); // avoid degenerate full-circle
  const start = pt(cy, -90);
  const end = pt(cy, -90 + sweep);
  const largeArc = sweep > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${rx} ${ry} 0 ${largeArc} 1 ${end.x} ${end.y}`;
};
```

---

## 7. Controlling Select / HealthSelector Width

A wrapper `div` with `width` has no effect: react-select manages its own width internally.

Use the **`size` prop** of the `Select` component (passed through via `HealthSelector`):

| `size`   | Width    |
|----------|----------|
| `'1/3'`  | 6rem     |
| `'1/2'`  | 10rem    |
| `'2/3'`  | 14rem    |
| (default) | 20.5rem |

```tsx
<HealthSelector id="..." value={...} onChange={...} size="2/3" />
```

---

## 8. Table with Result Count

Use `Table.SearchWithQueryParams` **inside the `Table`'s children** (not outside). It automatically displays the number of results / total. Requires a router wrapper because it uses `useLocation` / `useNavigate`.

```tsx
<BrowserRouter>
  <Table columns={...} data={...} entityName={...}>
    <Table.SearchWithQueryParams />
    <Table.SingleSelectableContent ... />
  </Table>
</BrowserRouter>
```

---

## 9. `Text` Component Without a `color` Prop

`<Text variant="Larger">126</Text>` without a `color` prop applies **no color** — it inherits from the parent. If the parent is an `<a>`, the browser's link color can bleed through. Always ensure the parent `<a>` has an explicit text color (see section 4).

---

## 10. Button Height Inside a Table

The `Button` component exposes a `size` prop:

| `size`     | Height  | Recommended usage          |
|------------|---------|----------------------------|
| (default)  | `32px`  | Outside a table            |
| `'inline'` | `24px`  | Inside a table cell        |

```tsx
<Button variant="secondary" size="inline" label="Remove" onClick={() => {}} />
```

---

## 11. Links Inside a Table Cell

A link inside a table cell should visually blend with other cell text:
- Color: `textLink` (DS blue) — **not** `textPrimary`
- No underline by default: only appears on `:hover`
- `font-size: 1rem` to match other cells

```tsx
const NameLink = styled.a`
  color: ${getThemePropSelector('textLink')};
  text-decoration: none;
  font-size: 1rem;
  font-family: inherit;

  &:hover {
    text-decoration: underline;
  }
`;
```

---

## 12. Pre-filling `Table.SearchWithQueryParams`

`Table.SearchWithQueryParams` reads its initial value from the URL (`?search=...`). To pre-fill the search bar on story load, use `MemoryRouter` with `initialEntries` instead of `BrowserRouter`:

```tsx
import { MemoryRouter } from 'react-router-dom';

<MemoryRouter initialEntries={['/?search=type:connectors']}>
  <Table ...>
    <Table.SearchWithQueryParams />
    <Table.SingleSelectableContent ... />
  </Table>
</MemoryRouter>
```

---

## 13. Hidden Column for Global Filtering

To filter on a field without displaying it in the table (e.g. `resourceType: 'type:connectors'`), add a column with that accessor and hide it via `setHiddenColumns` from the `useTableContext` hook.

**Critical pitfall**: calling `setHiddenColumns(['myColumn'])` **replaces** the entire hidden columns list, which can expose internal columns (e.g. the selection column used by `SingleSelectableContent`). Always use the functional form:

```tsx
const HideColumns: React.FC<{ ids: string[] }> = ({ ids }) => {
  const { setHiddenColumns } = useTableContext<MyType>();
  useEffect(() => {
    setHiddenColumns((prev) => [
      ...prev,
      ...ids.filter((id) => !prev.includes(id)),
    ]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};
```

Place `<HideColumns ids={['resourceType']} />` as a child of `Table`, before `Table.SearchWithQueryParams`.

---

## 14. Multi-level Sub-navigation in RING

The RING UI has two levels of sub-navigation below the main `Navbar`. There is no DS equivalent — create them as `styled.button` using theme tokens:

- **Level 1** (Dashboard / Operations / Administration): `backgroundLevel3` background, active tab on `backgroundLevel4`, `border-radius: 4px 4px 0 0`
- **Level 2** (Nodes / Connectors / Actions): `backgroundLevel4` background, active tab on `backgroundLevel1`, `border-radius: 8px` (pill)

Do not use `styled.a` for navigation tabs that trigger a JS action — prefer `styled.button` to avoid the link color trap (see section 4).

---

## 15. Temporary vs Versioned Figma Assets

Asset URLs returned by `get_design_context` (e.g. third-party logos like Weka) **expire after 7 days**. Recommended workflow:

1. Use the temporary URL for the first iteration
2. Export the asset to `.storybook/public/filename.svg`
3. Replace the URL with the absolute path `/filename.svg`

See `ring-server-unit.svg` as an example of a versioned asset in the repo.
