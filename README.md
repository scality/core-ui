# Welcome to Scality core-ui

This project is a library containing all common React components, layouts, icons and themes for all Scality UI projects.

## Available Scripts

In the project directory, you can run:

### `npm install`

Install all project dependencies.

### `npm test`

Launch the test runner in the interactive watch mode. 
It will generate test snapshots by using Storybook Storyshot add-on.
You have to run all the tests and update all snapshots before each commit.

### `npm run build`

Build the app for production to the `dist` folder.
In this folder, you will find all components, icons and themes.

### `npm run storybook`

Launch Storybook to test all the components on the `http://localhost:3000`.


### `npm run storybook:deploy`

Build the Storybook and deploy the Storybook to the [ui-core GitHub Pages](https://scality.github.io/core-ui/).

### `npm run plop`

You can use plop when you want to create a new react component. Plop generates component template files.
```
✔  ++ /src/lib/components/menuitem/MenuItem.component.js
✔  ++ /src/lib/components/menuitem/MenuItem.component.test.js
✔  ++ /src/lib/components/menuitem/__snapshots__/config.js
✔  ++ /stories/menuitem.js
```

## How to contribute

### Create a new component

- Run `npm run plop` to generate component template files
- Update these template files to add features
- Add storybook stories to cover all features 
- Run `npm run test` to generate snapshot tests which are based on storybook stories
- Update `src/lib/index.js` to export the new component
- Once all is done, create Pull Request for review
