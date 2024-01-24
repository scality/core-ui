# Welcome to Scality Core-UI

Core-UI is a component library containing all components, layouts, icons and themes used for all Scality UI projects.

## Getting started

### Installation

#### Manual installation

- Add ```@scality/core-ui``` in the ```package.json```'s dependencies of your project.

```json
    "@scality/core-ui": "github:scality/core-ui#0.114.0",
```

- ```@scality/core-ui``` requires the peerDependencies below. Make sure that you have them in the ```package.json```'s dependencies.

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

To start contributing to core-ui, clone the repository :

```sh
git clone git@github.com:scality/core-ui.git
```

then install the dependancies :

```sh
npm install
```

### Create a new branch

Give your branch an explicit name with the reference to the Jira ticket or issue if it exists, and prefix it with :

- feature/ for new component or major component update : `feature/TICKET-123-some-feature`
- improvement/ for code improvement, component update : `improvement/TICKET-456-some-improvement`
- bugfix/ for bug related issue : `bugfix/TICKET-789-some-bug`

Use :

```sh
git checkout -b <branch-name>
```

### Creating a new component

Create a new folder in `src/lib/components` for the component file and test file.
Depending on your component, it can be useful to create more files for the style, hooks, or utility functions that are necessary for your component. It will make the code more readable and easier to maintain.

Create a new folder in `stories` for the documentation files.

You should end with something like below :

```text
- src/
  - lib/
    - components/
      - example/
        - Example.component.tsx
        - Example.test.tsx
- stories/
  - example/
    - example.stories.tsx
    - example.guideline.mdx
```

Expose your component in `src/lib/index.ts`.
When creating a new version of an existing component, expose it in `src/lib/next.ts` instead to avoid conflict.

### Use Storybook

You can use storybook to help with the development.
Storybook helps to test and vizualize component in isolation.
If it doesn't exist, write a [story](https://storybook.js.org/docs/get-started/whats-a-story) for the component :

```jsx
// in stories/example/example.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Example } from '../src/lib/components/example/Example.component.tsx';

const meta: Meta<typeof Example> = {
  component: Example,
};

export default meta;
type Story = StoryObj<typeof Example>;

export const Default: Story = {
  render: () => <Example />,
};

```

then launch storybook :

```sh
npm run storybook
```

Storybook will be launched on `http://localhost:3000`.

### Lint

To make sure your code is correctly lint, run :

```sh
npm run lint
```

It will run ESLint by using `eslint-config-react-app` which is a shareable ESLint configuration used by [Create React App](https://github.com/facebook/create-react-app).

### Test

Build tests with [jest](https://jestjs.io/)

Make sure to write tests that cover all cases, then you can run all tests with :

```sh
npm run test
```

or run a specific test with :

```sh
npm run test Example.test.tsx
```

### Documentation

Core-UI uses [storybook](https://storybook.js.org/) for its documentation. \
Illustrate use cases and state variations with [stories](https://storybook.js.org/docs/writing-stories).
All stories should be type.

If possible create or update the component guideline.
This guideline is an MDX file containing details about the component usage and is illustrated with the stories write in stories.tsx file.

```txt
// in example.guideline.mdx
import { Canvas, Meta } from '@storybook/blocks';

import * as ExampleStories from './Example.stories';

<Meta of={ExampleStories} />

# Example Component

An Example component is used for example.

<Canvas of={ExampleStories.Default} />

```

### Pull request

Push your code on the repository

```sh
git push origin <branch-name>
```

then create a `Pull Request`.
Pull request needs to be approved by at least one reviewer.
After your PR is approved you can comment `/approve`  

### Release

After merging one or more PR in Core-UI, it is possible to plublish a new release.
In the Core-UI repo, follow these steps :

1. Go on `Releases` then `Draft a new release`
2. In the select menu `Choose a tag` : Create a new tag (the current tag increment by 1).
3. You can now `Generate release notes` : it will add all the PR infos since the last release. \
You can add details if necessary.
4. `Publish release`
5. It will create a PR that need to be approved.

### Build

```sh
npm run build
```

Build the app for production to the `dist` folder.
In this folder, you will find all components, icons and themes.
