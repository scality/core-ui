# Welcome to Scality core-ui

This project is a React stateless components library containing all common React components, [Styled-components](https://www.styled-components.com/)' components, layouts, icons and themes for all Scality UI projects. 

Components are also themable by using the [styled-components' theming concept](https://www.styled-components.com/docs/advanced).

## What are stateless Components?

Stateless Components just receive an input as props and return an output as JSX: ```(props) => JSX```. The input, only if available in form of props, shapes the rendered output. These kind of components don't manage state and don't have any side-effects (e.g. accessing the browser's local storage).

Examples:

- Stateless/Presentational/Dumb component:
```javascript
const BooksList = ({books}) => {
 return (
   <ul>
     {books.map(book => {
       return <li>{book}</li>
     })}
   </ul>
 )
}
```

- Stateful/Container/Smart component:
```javascript
import React, { useState, useEffect } from 'react';

const BooksList = (props) => {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        setBooks(['Harry Potter', 'Star Wars']);
    }, []);

    return (
    <ul>
        {books.map(book => {
        return <li>{book}</li>
        })}
    </ul>
    )
}

```

## How to use it

- Add ```@scality/core-ui``` in the ```package.json```'s dependencies of your project.
```json
 "@scality/core-ui": "github:scality/core-ui.git",
```

- ```@scality/core-ui```requires some peerDependencies below. Make sure that you have them in the ```package.json```'s dependencies.
```json
    "@fortawesome/fontawesome-free": "5.7.2",
    "polished": "3.4.1",
    "react": "^16.8.0",
    "react-dom": "^16.8.0",
    "react-debounce-input": "3.2.0",
    "react-virtualized": "9.21.0",
    "react-select": "3.0.3",
    "styled-components": "^4.1.2",
    "vega": "^5.7.3",
    "vega-embed": "^6.0.0",
    "vega-lite": "^4.0.0-beta.10"
```

- Run ```npm install``` to install dependencies

- Import a component (e.g. Layout). You can wrap your component in a styled-components'```ThemeProvider``` to override its [default theme](https://github.com/scality/core-ui/blob/6f5a7946e7086e08883a8fe48182598ce8a476e5/src/lib/style/theme.js#L34) by defining your own theme like below.
```javascript

import { ThemeProvider } from 'styled-components';
import { Layout } from '@scality/core-ui';
import '@fortawesome/fontawesome-free/css/all.css';

const themes = [
  {
    name: "Light Theme",
    brand: {
      alert: "#A39300",
      base: "#607080",
      primary: "#FAF9FB",
      primaryDark1: "#F7F6F9",
      primaryDark2: "#EDEAF0",
      secondary: "#037AFF",
      secondaryDark1: "#1C3D59",
      secondaryDark2: "#1C2E3F",
      success: "#006F62",
      healthy: "#24871D",
      healthyLight: "#33A919",
      warning: "#946F00",
      danger: "#AA1D05",
      critical: "#BE321F",
      background: "#ffffff",
      backgroundBluer: "#ECF4FF",
      textPrimary: "#313B44",
      textSecondary: "#8593A0",
      textTertiary: "#A7B6C3",
      borderLight: "#EBEBEB",
      border: "#A5A5A5",
      info: "#8C8C8C"
    }
  },
  {
    name: "Dark Theme",
    brand: {
      alert: "#FFE508",
      base: "#7B7B7B",
      primary: "#1D1D1D",
      primaryDark1: "#171717",
      primaryDark2: "#0A0A0A",
      secondary: "#055DFF",
      secondaryDark1: "#1C3D59",
      secondaryDark2: "#1C2E3F",
      success: "#006F62",
      healthy: "#30AC26",
      healthyLight: "#69E44C",
      warning: "#FFC10A",
      danger: "#AA1D05",
      critical: "#BE321F",
      background: "#121212",
      backgroundBluer: "#192A41",
      textPrimary: "#FFFFFF",
      textSecondary: "#B5B5B5",
      textTertiary: "#DFDFDF",
      borderLight: "#A5A5A5",
      border: "#313131",
      info: "#434343"
    }
  }
];

<ThemeProvider theme={theme}>
    <Layout sidebar={sidebar} navbar={navbar}>
        ...
    </Layout>
</ThemeProvider>
```

## Available Scripts

In the project directory, you can run:

### `npm install`

Install all project dependencies.

### `npm prepare`

Run `npm run build` script when installing `@scality/core-ui` in the consuming projects.

### `npm run flow`

Run a full Flow check and prints the results.

### `npm run lint`

Run ESLint by using `eslint-config-react-app` which is a shareable ESLint configuration used by [Create React App](https://github.com/facebook/create-react-app).

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
- Make sure that the component is themable (i.e support Dark/Light Mode)
- Add storybook stories to cover all features 
- Update `src/lib/index.js` to export the new component
- Run `npm run test` to generate snapshot tests which are based on storybook stories
- Run `npm run flow` and `npm run lint` to make sure no error occurs
- Once all is done, create Pull Request for review
- When your Pull Request is approved, we take care of the merge of the PR because we have an internal merge process.
