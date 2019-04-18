import "@babel/polyfill";

import { configure, setAddon, addDecorator } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import withPropsCombinations from "react-storybook-addon-props-combinations";
import { withThemesProvider } from "storybook-addon-styled-component-theme";
import {
  turquoise,
  yellowOrange,
  grayLight,
  blueLight,
  jade,
  mediumOrange
} from "../src/lib/style/theme";

const themes = [
  { name: "Default" },
  {
    name: "Custom",
    brand: {
      primary: turquoise,
      secondary: grayLight,
      success: jade,
      info: blueLight,
      warning: yellowOrange,
      danger: mediumOrange,
      base: grayLight
    }
  }
];
addDecorator(withThemesProvider(themes));

setAddon(withPropsCombinations);
setAddon(withInfo);

function loadStories() {
  require("../stories");
}

configure(loadStories, module);
