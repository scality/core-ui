# Welcome to Scality Core-UI

Core-UI is a component library containing all components, layouts, icons and themes used for all Scality UI projects.

**[Browse the documentation](https://scality.github.io/core-ui/)** — every component with its stories and usage guidelines, plus the cross-cutting pages: *Introduction* for the design principles, and *Guidelines* for behaviour that spans components, such as responsive layout, colour, spacing, typography and formatting.

## Installation

```sh
npm install @scality/core-ui
```

`react` and `react-dom` are peer dependencies — any version in `^18.0.0 || ^19.0.0`. Install them
too if your project does not already have them:

```sh
npm install react react-dom
```

### Module Federation

An application that composes federated remotes must share `react`, `react-dom` and
`styled-components` as singletons in its federation config, loaded eagerly if the host
renders before its remotes. Two copies of React break hooks; two copies of
styled-components leave the second one with no theme, so those components render
unstyled. `styled-components` is the one that catches people out: it is a dependency of
this package rather than a peer, so a plain install needs no action and a federated
build does.

## Usage

Import a component from `@scality/core-ui/dist/next` or `@scality/core-ui`, and use props to change its appearance and behaviour:

```jsx
import { Button } from '@scality/core-ui/dist/next';
import { Icon } from '@scality/core-ui';

<Button
  variant="primary"
  onClick={handleClick}
  label="Save"
  icon={<Icon name="Save" />}
/>;
```

`@scality/core-ui` holds the stable components; `@scality/core-ui/dist/next` holds newer versions of existing components, so a redesign can ship without breaking the one in use.

## Guidelines

The package ships the design system guidelines in `stories/`:

- `stories/<Component>/<component>.guideline.mdx`: when and how to use a component. A few older ones sit directly under `stories/`, such as `form.guideline.mdx`.
- The other `.mdx` files directly under `stories/` and under `stories/guideline/`: rules for every screen, such as typography, formats and the design principles in `Introduction.mdx`.

Read the guideline of a component before using it, and the cross-cutting pages before building a screen. The same pages are on the [documentation site](https://scality.github.io/core-ui/).

AI agents do not read this README on their own. They read the instruction file of the project they work in, such as `CLAUDE.md` or `AGENTS.md`. To make an agent follow the guidelines, add this line to that file:

```
Before using a @scality/core-ui component, read its guideline in node_modules/@scality/core-ui/stories/, and the .mdx pages directly under stories/ and stories/guideline/.
```

## Theming

Components are themed through the [styled-components theming concept](https://www.styled-components.com/docs/advanced). Wrap your app in a `ThemeProvider` and give it a theme:

```jsx
import { ThemeProvider } from 'styled-components';
import { Layout } from '@scality/core-ui';
import { coreUIAvailableThemes as themes } from '@scality/core-ui/dist/style/theme';

<ThemeProvider theme={themes.darkRebrand}>
  <Layout sidebar={sidebar} navbar={navbar}>
    ...
  </Layout>
</ThemeProvider>;
```

Two themes ship with the library, `darkRebrand` and `artescaLight`, both defined in [`src/lib/style/theme.ts`](src/lib/style/theme.ts). You can modify one or create your own, as long as it extends the `CoreUITheme` type:

```tsx
import { CoreUITheme } from '@scality/core-ui/dist/next';
```

## Contributing

Everything about working *on* core-ui — cloning, branch naming, creating a component, writing stories and guidelines, linting, testing, releasing — is in [CONTRIBUTING.md](CONTRIBUTING.md).
