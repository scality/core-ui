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
import type { Meta, StoryObj } from '@storybook/react-webpack5';
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

<Meta of={ExampleStories} name="Guideline" />

# Example Component

An Example component is used for example.

<Canvas of={ExampleStories.Default} />
```

`name="Guideline"` is what puts the page above the generated props table in the
sidebar. Without it the page is named after `docs.defaultName` instead, takes the
props table's place, and the component loses the page it was meant to gain.

Documentation that is not about a single component goes in `stories/guideline/` and is titled `Guidelines/<Name>`, the way `Guidelines/Responsive` covers the container behaviour shared by several components. Use one of these when the subject is a choice between sibling components, or a behaviour that crosses components that are not alternatives to each other.

## Lint

To make sure your code is correctly linted, run:

```sh
npm run lint
```

It runs [Biome](https://biomejs.dev), which checks formatting and lints in one pass, on the version `package.json` pins exactly. `npm run format` reformats in place, `npm run format:check` checks the formatting alone, and `npm run typecheck` runs the compiler without emitting. CI runs the lint and typecheck gates.

Biome's recommended rules are on, and the gate fails on any diagnostic Biome raises as an error. The rules listed under `linter.rules` in `biome.json` would be errors too, but the repository still violates them, so they are set to `warn` and only report. That list is the backlog, and it is the only thing holding an error-level rule back: every rule off the list still fails the build, so new code cannot add to the debt those rules cover. Clearing a rule's occurrences means deleting its line.

A further set reports as warnings by Biome's own defaults and so can never fail the gate — `useImportType`, `noUnusedImports` and `noExplicitAny` account for most of the output, and `noBannedTypes` and `noTsIgnore` are in it too. Read what the run prints rather than only its exit code: a `@ts-ignore` added to new code passes lint and defeats the typecheck gate below.

`npm run typecheck` runs against the single `tsconfig.json`, which excludes test files and the `stories/` tree, and never sees `.storybook/` because TypeScript's default include skips dot-directories. It covers `src/` minus its tests, and nothing else type-checks the rest: Jest transforms through `babel-jest` and Storybook through SWC, both of which strip types without checking them. So a `@ts-expect-error` in a test is still inert.

To keep a violation on purpose, put a `// biome-ignore lint/<group>/<rule>: <reason>` comment on the single line directly above the line Biome points at — for a hook rule that is the hook call, not its dependency array. The comment has to be one line: a second line of prose below it breaks the suppression.

The `pre-commit` hook runs `npm run lint` over the whole tree, not over the staged files, so an unrelated unformatted file blocks the commit until `npm run format` has run.

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
