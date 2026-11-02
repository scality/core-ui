# core-ui

This is **Scality's shared React component library** (`@scality/core-ui`). It contains:

- Reusable UI components (buttons, modals, tables, charts, forms, navigation) in `src/lib/components/`
- A design-system theme (`src/lib/style/theme.ts`) built on styled-components and styled-system
- Storybook documentation for every component (`stories/`)
- A `next.ts` entry point for newer/experimental components (`src/lib/next.ts`)

## Tech stack

- **Language:** TypeScript (strict mode, `noImplicitAny` off)
- **UI:** React 18/19, styled-components v6, styled-system, Floating UI
- **Charts:** Recharts
- **Forms:** react-hook-form
- **Tables:** react-table v7
- **Routing:** react-router v7
- **Testing:** Jest + Testing Library
- **Storybook:** v10 with Webpack 5
- **Build:** TypeScript compiler (`tsc`) — no bundler
- **Linting:** ESLint
- **Package:** Published to npm as `@scality/core-ui`

## Commands

- `npm test` — run Jest tests
- `npm run build` — compile TypeScript to `dist/`
- `npm run lint` — run ESLint
- `npm run storybook` — start Storybook dev server on port 3001

Contributor process — branch naming, creating a component, release, build — is in
[CONTRIBUTING.md](CONTRIBUTING.md).

## Exports

`src/lib/index.ts` is the stable surface. `src/lib/next.ts` holds newer versions of
existing components, so a redesign ships without breaking the one in use — a new
version of an existing component goes there, not into `index.ts`.

Every exported component carries a JSDoc first sentence saying **what it is for**:
when a reader should reach for it rather than its neighbour. It is what IDE hover
and the Storybook props table show, and for most callers it is the only description
they will read.

Constraints belong in types, not lint rules — there is no custom lint plugin. Make
an invalid prop combination unrepresentable with a discriminated union, narrow a
prop that accepts more than the component supports, and mark a superseded prop
`@deprecated` with a migration note. Keep it opt-in: deprecate before removing, and
narrow behind a major or in `next.ts`.

## Documentation

Stories and guidelines live in `stories/<PascalCase>/`, with lowercase filenames
inside — `stories/Modal/modal.stories.tsx`, `stories/Modal/modal.guideline.mdx`.
Import from a story with `../../src/lib/components/<lowercase>/<Name>.component`,
no file extension.

Documentation that is not about a single component goes in `stories/guideline/`,
titled `Guidelines/<Name>` — `Guidelines/Responsive` covers the container behaviour
shared by several components. Use one when the subject is a choice between sibling
components, or a behaviour crossing components that are not alternatives.

Story files import their `Meta` and `StoryObj` types from `@storybook/react-webpack5`,
never `@storybook/react` — only the former is a dependency of this package. MDX pages
import from `@storybook/addon-docs/blocks`, never `@storybook/blocks`.

## Tests

**One test file per source module — never one per feature.** Before writing a
test, find the file that already covers the module: `<Source>.test.ts(x)` beside
`<Source>.ts(x)` (32 of the 42 test files mirror their source's filename
exactly; the rest are folder-level files such as `Form.test.tsx` covering
`Form.component.tsx`). Add a nested `describe` there.

Create a new file only when the module genuinely has none, and name it after the
**module**, not after the behaviour being added — `Toast.component.test.tsx` for
`Toast.component.tsx`, not `toastAnchoring.test.ts`.

Two names for one component (`Modal.test.tsx` *and* `Modal.component.test.tsx`)
is the failure this prevents: both files pass CI, so nothing flags the split and
the next person ends up testing the same component in two places.

Tests assert user-facing behaviour, never CSS properties. A test that only reads
a style declaration back out is worth deleting rather than keeping.
