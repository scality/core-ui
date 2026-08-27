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
