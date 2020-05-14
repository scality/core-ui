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
  white,
} from "../src/lib/style/theme";

const themes = [
  {
    name: "Light Theme",
    brand: {
      base: "#607080",
      primary: "#FAF9FB",
      primaryDark1: "#F7F6F9",
      primaryDark2: "#EDEAF0",
      secondary: "#037AFF",
      secondaryDark1: "#1C3D59",
      secondaryDark2: "#1C2E3F",
      success: jade,
      healthy: "#25AC56",
      healthyLight: "#75FE63",
      warning: "#FEFA51",
      danger: warmRed,
      critical: "#BE2543",
      background: white,
      backgroundBluer: "#ECF4FF",
      textPrimary: "#313B44",
      textSecondary: "#8593A0",
      borderLight: "#A5A5A5",
      border: "#A5A5A5",
    },
  },
  {
    name: "Dark Theme",
    brand: {
      base: "#6A7B92",
      primary: "#1D1D1F",
      primaryDark1: "#171718",
      primaryDark2: "#0A0A0A",
      secondary: "#037AFF",
      secondaryDark1: "#1C3D59",
      secondaryDark2: "#1C2E3F",
      success: jade,
      healthy: "#25AC56",
      healthyLight: "#75FE63",
      warning: "#FEFA51",
      danger: warmRed,
      critical: "#BE2543",
      background: "#121214",
      backgroundBluer: "#182A41",
      textPrimary: "#FFFFFF",
      textSecondary: "#A8B5C1",
      borderLight: "#2C3137",
      border: "#A5A5A5",
    },
  },
];
addDecorator(withThemesProvider(themes));
addDecorator(
  withInfo({
    header: false,
    inline: false,
    maxPropArrayLength: 10,
  })
);

setAddon(withPropsCombinations);

function loadStories() {
  require("../stories");
}

configure(loadStories, module);
