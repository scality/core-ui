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
