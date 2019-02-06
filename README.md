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

### `npm run start`

Launch Storybook to test all the components on the `http://localhost:3000`.


### `npm run storybook:build`

This will build the storybook configured in the Storybook directory into a static web app and place it inside the `.build-storybook` directory. Then you can deploy the content in the `.build-storybook` directory wherever you want.

For example:

Run the following commands with Python HTTP Server:
```
cd .build-storybook
python -m SimpleHTTPServer
```

or Node HTTP Server:
```
npm install http-server -g
cd .build-storybook
http-server
```

### `npm run plop`

You can use plop when you want to create a new react component. Plop generates component template files.
```
✔  ++ /src/lib/components/menuitem/MenuItem.component.js
✔  ++ /src/lib/components/menuitem/MenuItem.component.test.js
✔  ++ /src/lib/components/menuitem/__snapshots__/config.js
✔  ++ /stories/menuitem.js
```