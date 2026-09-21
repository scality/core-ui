# Contributing to Core-UI

This project is built with [React](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/), and styled with [styled-components](https://styled-components.com/).

To start contributing to core-ui, clone the repository:

```sh
git clone git@github.com:scality/core-ui.git
```

then install the dependencies:

```sh
npm install
```

## Create a new branch

Give your branch an explicit name with the reference to the Jira ticket or issue if it exists, and prefix it with:

- `feature/` for a new component or major component update: `feature/TICKET-123-some-feature`
- `improvement/` for code improvement or a component update: `improvement/TICKET-456-some-improvement`
- `bugfix/` for a bug related issue: `bugfix/TICKET-789-some-bug`

```sh
git checkout -b <branch-name>
```

## Creating a new component

Create a new folder in `src/lib/components` for the component file and test file. Depending on your component, it can be useful to create more files for the style, hooks, or utility functions that it needs. It will make the code more readable and easier to maintain.

Create a matching folder in `stories` for the documentation files. The component folder is lowercase, the stories folder is PascalCase, and the files inside it are lowercase:

```text
- src/
  - lib/
    - components/
      - example/
        - Example.component.tsx
        - Example.test.tsx
- stories/
  - Example/
    - example.stories.tsx
    - example.guideline.mdx
```

Expose your component in `src/lib/index.ts`. When creating a new version of an existing component, expose it in `src/lib/next.ts` instead, so the redesign can ship without breaking the version already in use.

Give every exported component a JSDoc first sentence saying what it is for — not what it renders, but when a reader should reach for it rather than its neighbour:

```tsx
/** Confirms or cancels an action that cannot be undone. */
export const DeleteConfirmationModal = (...)
```

That one line is what appears on IDE hover and in the Storybook props table, and it is the only description most callers will ever read.

## Use Storybook

Storybook helps to test and visualize a component in isolation. If it doesn't exist, write a [story](https://storybook.js.org/docs/get-started/whats-a-story) for the component:

```jsx
// in stories/Example/example.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Example } from '../../src/lib/components/example/Example.component';

const meta: Meta<typeof Example> = {
  component: Example,
};

export default meta;
type Story = StoryObj<typeof Example>;

export const Default: Story = {
  render: () => <Example />,
};
```

Then launch storybook:

```sh
npm run storybook
```

Storybook will be launched on `http://localhost:3001`.

## Documentation

Core-UI uses [storybook](https://storybook.js.org/) for its documentation. Illustrate use cases and state variations with [stories](https://storybook.js.org/docs/writing-stories).

Create or update the component guideline. This is an MDX file describing how the component should be used, illustrated with the stories from its `.stories.tsx` file:

```txt
// in stories/Example/example.guideline.mdx
import { Canvas, Meta } from '@storybook/addon-docs/blocks';

import * as ExampleStories from './example.stories';

<Meta of={ExampleStories} />

# Example Component

An Example component is used for example.

<Canvas of={ExampleStories.Default} />
```

Documentation that is not about a single component goes in `stories/guideline/` and is titled `Guidelines/<Name>`, the way `Guidelines/Responsive` covers the container behaviour shared by several components. Use one of these when the subject is a choice between sibling components, or a behaviour that crosses components that are not alternatives to each other.

## Lint

To make sure your code is correctly linted, run:

```sh
npm run lint
```

It runs ESLint with `eslint-config-react-app` — a shareable configuration used by [Create React App](https://github.com/facebook/create-react-app) — together with `plugin:storybook/recommended`.

Core-UI has no custom lint rules. Where a constraint can be expressed in a type, express it there instead: make the invalid combination unrepresentable with a discriminated union, narrow a prop that accepts more than the component supports, and mark a superseded prop `@deprecated` with a migration note. A type is checked in every consumer repo across the package boundary, with no adoption step and nothing to install.

Keep changes strictly opt-in and non-breaking: deprecate before removing, and narrow a type behind a major version or in `next.ts`.

## Test

Build tests with [jest](https://jestjs.io/). Make sure to write tests that cover all cases, then run them:

```sh
npm run test
```

Or run a specific test:

```sh
npm run test Example.test.tsx
```

Write one test file per source module, named after the module rather than the behaviour, and assert user-visible behaviour rather than CSS properties.

## Contributing your change

- Push your code on a branch following the [branch naming convention](#create-a-new-branch)
- Create a pull request
- Obtain the approval of at least one reviewer
- Then comment with `/approve` to merge the PR

## Release

After merging one or more PRs in Core-UI, it is possible to publish a new release. In the Core-UI repo, follow these steps:

1. Go to `Releases`, then `Draft a new release`
2. In the `Choose a tag` select menu, create a new tag (the current tag incremented by 1)
3. `Generate release notes`: it will add all the PR infos since the last release. You can add details if necessary
4. `Publish release`
5. It will create a PR that needs to be approved

## Build

```sh
npm run build
```

Builds the app for production to the `dist` folder. In this folder, you will find all components, icons and themes.
