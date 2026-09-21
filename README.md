# Welcome to Scality Core-UI

Core-UI is a component library containing all components, layouts, icons and themes used for all Scality UI projects.

**[Browse the documentation](https://scality.github.io/core-ui/)** — every component with its stories and usage guidelines, plus the cross-cutting pages: *Introduction* for the design principles, and *Guidelines* for behaviour that spans components, such as responsive layout, colour, spacing, typography and formatting.

## Installation

Add `@scality/core-ui` to your project's dependencies:

```json
    "@scality/core-ui": "^0.230.0",
```

It requires the peerDependencies below, so make sure they are in your `package.json` too:

```json
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0",
```

Then install:

```sh
npm install
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
