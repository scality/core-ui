# Welcome to Scality Core-UI

Core-UI is a component library containing all components, layouts, icons and themes used for all Scality UI projects. \
This project is built with [React](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/), and styled with [styled-components](https://styled-components.com/).

## Getting started

### Installation

- Add ```@scality/core-ui``` in the ```package.json```'s dependencies of your project.

```json
 "@scality/core-ui": "github:scality/core-ui.git",
```

- ```@scality/core-ui```requires some peerDependencies below. Make sure that you have them in the ```package.json```'s dependencies.

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
Wrap your app in a ```ThemeProvider``` and provide it a theme.
The theme needs to be defined as below :

```jsx

import { ThemeProvider } from 'styled-components';
import { Layout } from '@scality/core-ui';

const theme = {
    statusHealthy: '#0AADA6',
    statusHealthyRGB: '10,173,166',
    statusWarning: '#F8F32B',
    statusWarningRGB: '248,243,43',
    statusCritical: '#E84855',
    statusCriticalRGB: '232,72,85',
    selectedActive: '#037AFF',
    highlight: '#1A3C75',
    border: '#4A4A4A',
    buttonPrimary: '#2F4185',
    buttonSecondary: '#595A78',
    buttonDelete: '#3D0808',
    infoPrimary: '#8E8EAC',
    infoSecondary: '#333366',
    backgroundLevel1: '#121219',
    backgroundLevel2: '#323245',
    backgroundLevel3: '#232331',
    backgroundLevel4: '#1B1B27',
    textPrimary: '#EAEAEA',
    textSecondary: '#B5B5B5',
    textTertiary: '#DFDFDF',
    textReverse: '#000000',
    textLink: '#71AEFF',
  },

<ThemeProvider theme={theme}>
    <Layout sidebar={sidebar} navbar={navbar}>
        ...
    </Layout>
</ThemeProvider>

```

## Available Scripts

In the project directory, you can run:

```sh
npm install
```

Install all project dependencies.

<br />

```sh
npm prepare
```

Run `npm run build` script when installing `@scality/core-ui` in the consuming projects.

<br />

```sh
npm run flow
```

Run a full Flow check and prints the results.

<br />

```sh
npm run lint
```

Run ESLint by using `eslint-config-react-app` which is a shareable ESLint configuration used by [Create React App](https://github.com/facebook/create-react-app).

<br />

```sh
npm run build
```

Build the app for production to the `dist` folder.
In this folder, you will find all components, icons and themes.

<br />

```sh
npm run storybook
```

Launch Storybook to test all the components on the `http://localhost:3000`.

<br />

```sh
npm run storybook:deploy
```

Build and deploy the Storybook to the [ui-core GitHub Pages](https://scality.github.io/core-ui/).
