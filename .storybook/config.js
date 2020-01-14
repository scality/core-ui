import { configure, setAddon, addDecorator } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import withPropsCombinations from "react-storybook-addon-props-combinations";
import { withThemesProvider } from "storybook-addon-styled-component-theme";
import {
  gray,
  blueLighter,
  jade,
  turquoise,
  yellowOrange,
  warmRed,
  white
} from "../src/lib/style/theme";

const themes = [
  {
    name: "Light Theme",
    brand: {
      base: blueLighter,
      baseContrast1: "#94B3CB",
      primary: "#403e40",
      secondary: "#e99121",
      success: jade,
      info: turquoise,
      warning: yellowOrange,
      danger: warmRed,
      background: white,
      backgroundContrast1: white,
      backgroundContrast2: "#E6E6E6",
      text: gray,
      border: gray
    }
  },
  {
    name: "Dark Theme",
    brand: {
      base: "#19161D",
      baseContrast1: "#26232A",
      primary: "#e99121",
      secondary: "#2979ff",
      success: jade,
      info: turquoise,
      warning: yellowOrange,
      danger: warmRed,
      background: "#26232A",
      backgroundContrast1: "#161617",
      backgroundContrast2: "#08080A",
      text: white,
      border: white
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
