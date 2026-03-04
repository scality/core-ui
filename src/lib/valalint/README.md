# eslint-plugin-valalint

A custom ESLint plugin shipped as part of `@scality/core-ui`.  
It enforces Scality UI coding conventions (e.g. capitalisation rules for user-facing text).

## Using the plugin in a project

Install (or depend on) `@scality/core-ui`, then import the plugin from its sub-path:

### Example config (`eslint.config.mjs`)

```js
import valalint from '@scality/core-ui/eslint-plugin';

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['src/gen/**'],
    ...valalint.configs['flat/recommended'],
  },
];
```

## Adding a new rule

### 1. Create the rule file

Add a new file under `src/lib/valalint/rules/`. Use the existing
[`technical-sentence-case.js`](./rules/technical-sentence-case.js) as a reference.

Refer to the [ESLint rule authoring docs](https://eslint.org/docs/latest/extend/custom-rules) for the full API.

### 2. Register the rule in the plugin

Open [`src/lib/valalint/index.js`](./index.js) and add two lines to import your rule and add it to the rules map.

### 3. Set a default severity in the recommended config

Still in `index.js`, add the rule to `recommendedRules` with its desired default severity
(`'off'`, `'warn'`, or `'error'`):

```js
const recommendedRules = {
  'valalint/technical-sentence-case': 'warn',
  'valalint/my-new-rule': 'warn',         // ← add this
};
```

That's it. The rule is now available to all consumers via both the `recommended` and
`flat/recommended` configs, and individually as `'valalint/my-new-rule'`.
