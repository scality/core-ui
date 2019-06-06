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
  },
  {
    name: "Scality",
    brand: {
      primary: "#403e40",
      secondary: "#e99121"
    }
  }
];
addDecorator(withThemesProvider(themes));
addDecorator(
  withInfo({
    header: false,
    inline: false,
    maxPropArrayLength: 10
  })
);

setAddon(withPropsCombinations);

function loadStories() {
  require("../stories");
}

configure(loadStories, module);
