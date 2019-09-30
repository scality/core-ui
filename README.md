# Welcome to Scality UI

This project is a library containing all commun React components, layouts, icons and themes for all Scality UI projects.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`

Install all project dependencies.

### `npm test`

Launches the test runner in the interactive watch mode. 
It will generate test snapshots by using Storybook Storyshot add-on.
You have to run all the tests and update all snapshots before each commit.

### `npm run build`

Builds the app for production to the `dist` folder.
In this folder, you will find all components, icons and themes.

### `npm run storybook`

Launch Storybook to test all the components on the `http://localhost:3000`.


### `npm run storybook:deploy`

This will build the Storybook and deploy the Storybook to the [ui-core GitHub Pages](https://scality.github.io/core-ui/).

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

- Run `npm run plop` to generates component template files
- Update these template files to add features
- Add storybook stories to cover all features 
- Run `npm run test` to generates snapshot tests which are based on storybook stories
- Update `src/lib/index.js` to export the new component
- Once all is done, create Pull Request for review
