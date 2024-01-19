# Welcome to Scality Core-UI

Core-UI is a component library containing all components, layouts, icons and themes used for all Scality UI projects.

## Getting started

### Installation

#### Manual installation

- Add ```@scality/core-ui``` in the ```package.json```'s dependencies of your project.

  ```json
    "@scality/core-ui": "github:scality/core-ui#0.113.0",
  ```

- ```@scality/core-ui``` requires some peerDependencies below. Make sure that you have them in the ```package.json```'s dependencies.

```json
    "@fortawesome/fontawesome-free": "^5.10.2",
    "@fortawesome/fontawesome-svg-core": "^1.2.35",
    "@fortawesome/free-regular-svg-icons": "^5.15.3",
    "@fortawesome/free-solid-svg-icons": "^5.15.3",
    "@fortawesome/react-fontawesome": "^0.1.14",
    "@js-temporal/polyfill": "^0.4.4",
    "polished": "3.4.1",
    "pretty-bytes": "^5.6.0",
    "react": "^17.0.2",
    "react-debounce-input": "3.2.2",
    "react-dom": "^17.0.2",
    "react-dropzone": "^14.2.3",
    "react-query": "^3.34.0",
    "react-router": "^5.2.0",
    "react-router-dom": "^5.2.0",
    "react-select": "4.3.1",
    "react-table": "^7.7.0",
    "react-virtualized": "9.22.3",
    "react-virtualized-auto-sizer": "^1.0.5",
    "react-window": "^1.8.6",
    "styled-components": "^4.1.2",
    "styled-system": "^5.1.5",
    "vega": "^5.17.3",
    "vega-embed": "^6.0.0",
    "vega-lite": "^5.0.0",
    "vega-tooltip": "^0.27.0"
```

- Install the dependencies :

```sh
npm install
```

### Usage

- Import a component from ```@scality/core-ui/dist/next'``` or ```@scality/core-ui```

- Use props to change its appearance and behaviour

```jsx
import { Button } from '@scality/core-ui/dist/next';
import { Icon } from '@scality/core-ui';

<Button variant="primary" onClick={handleClick} label="Save" icon={<Icon name="Save" />} />

```

To learn more about the available components, you can read the [documentation](https://scality.github.io/core-ui/)

### Theming

Components are themable by using the [styled-components theming concept](https://www.styled-components.com/docs/advanced). \
Wrap your app in a `ThemeProvider` and provide it a theme :

```jsx

import { ThemeProvider } from 'styled-components';
import { Layout } from '@scality/core-ui';
import { coreUIAvailableThemes as themes } from '@scality/core-ui/dist/style/theme';

<ThemeProvider theme={themes.darkRebrand}>
    <Layout sidebar={sidebar} navbar={navbar}>
        ...
    </Layout>
</ThemeProvider>

```

There is 2 default theme available in Core-UI : you can find them [here](https://github.com/scality/core-ui/pull/684#:~:text=https%3A//github.com/scality/core%2Dui/blob/development/1.0/src/lib/style/theme.ts)

<br/>

You can also modify or create a new theme. In this case make sure to respect this type :

```tsx

export type CoreUITheme = {
  statusHealthy: string;
  statusHealthyRGB: string;
  statusWarning: string;
  statusWarningRGB: string;
  statusCritical: string;
  statusCriticalRGB: string;
  selectedActive: string;
  highlight: string;
  border: string;
  buttonPrimary: string;
  buttonSecondary: string;
  buttonDelete: string;
  infoPrimary: string;
  infoSecondary: string;
  backgroundLevel1: string;
  backgroundLevel2: string;
  backgroundLevel3: string;
  backgroundLevel4: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textReverse: string;
  textLink: string;
};

```

<br />

## Development

This project is built with [React](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/), and styled with [styled-components](https://styled-components.com/).

Project structure :

```text
- src/
  - lib/
    - components/
      - MyComponent/
        - MyComponent.component.tsx
        - MyComponent.test.tsx
- stories/
  - MyComponent/
    - mycomponent.stories.tsx
    - mycomponent.guideline.mdx
```

### Creating a new component

When creating a new component, you can use storybook to help with the development.
Write a [story](https://storybook.js.org/docs/get-started/whats-a-story) with your component and launch storybook :

```sh
npm run storybook
```

Storybook will be launched on `http://localhost:3000`.

After creating or updating a component, make sure to lint, test and document your code :

#### Lint

To make sure your code is correctly lint, run :

```sh
npm run lint
```

It will run ESLint by using `eslint-config-react-app` which is a shareable ESLint configuration used by [Create React App](https://github.com/facebook/create-react-app).

#### Test

Build tests with [jest](https://jestjs.io/) and run them with :

```sh
npm run test
```

#### Documentation

Core-UI uses [storybook](https://storybook.js.org/) for its documentation. \
Illustrate use cases and state variations with [stories](https://storybook.js.org/docs/writing-stories).

### Release process

In the Core-UI repo, follow these steps :

1. Click on `Releases` then `Draft a new release`
2. In the select menu `Choose a tag` : Create a new tag (the current tag increment by 1).
3. You can now `Generate release notes` : it will add all the PR infos since the last release. \
You can add details if necessary.
4. `Publish release`

### Build

```sh
npm run build
```

Build the app for production to the `dist` folder.
In this folder, you will find all components, icons and themes.
