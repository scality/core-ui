module.exports = {
  stories: ["../stories/*.@(js|mdx)"],
  addons: [
    "@storybook/addon-essentials",
    "storybook-addon-styled-component-theme/dist/register",
  ],
};

// import { configure, setAddon, addDecorator } from "@storybook/react";
// // import { withInfo } from "@storybook/addon-info";
// // import withPropsCombinations from "react-storybook-addon-props-combinations";
// import { withThemesProvider } from "storybook-addon-styled-component-theme";
// import {
//   gray,
//   blueLighter,
//   jade,
//   turquoise,
//   yellowOrange,
//   warmRed,
//   white,
//   defaultTheme,
// } from "../src/lib/style/theme";

// const themes = [
//   {
//     name: "Dark Theme",
//     brand: defaultTheme.dark,
//   },
//   {
//     name: "Light Theme",
//     brand: defaultTheme.light,
//   },
// ];
// addDecorator(withThemesProvider(themes));
// addDecorator(
//   withInfo({
//     header: false,
//     inline: false,
//     maxPropArrayLength: 10,
//   }),
// );

// // // setAddon(withPropsCombinations);

// function loadStories() {
//   require("../stories");
// }

// configure(loadStories, module);
