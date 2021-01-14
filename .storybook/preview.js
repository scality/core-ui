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
import { addParameters } from "@storybook/react";
import { DocsPage, DocsContainer } from "@storybook/addon-docs/blocks";

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});

const themes = [
  {
    name: "Light Theme",
    brand: {
      alert: "#946F00",
      base: "#607080",
      primary: "#FAF9FB",
      primaryDark1: "#F7F6F9",
      primaryDark2: "#EDEAF0",
      secondary: "#037AFF",
      secondaryDark1: "#1C3D59",
      secondaryDark2: "#1C2E3F",
      success: jade,
      healthy: "#33A919",
      healthySecondary: "#24871D",
      warning: "#A39300",
      danger: "#BE321F",
      critical: "#AA1D05",
      background: white,
      backgroundBluer: "#ECF4FF",
      textPrimary: "#313B44",
      textSecondary: "#8593A0",
      borderLight: "#A5A5A5",
      border: "#A5A5A5",
      info: "#8C8C8C",
    },
  },
  {
    name: "Dark Theme",
    brand: {
      alert: "#FFC10A",
      base: "#7B7B7B",
      primary: "#1D1D1D",
      primaryDark1: "#171717",
      primaryDark2: "#0A0A0A",
      secondary: "#055DFF",
      secondaryDark1: "#1C3D59",
      secondaryDark2: "#1C2E3F",
      success: "#006F62",
      healthy: "#69E44C",
      healthySecondary: "#30AC26",
      warning: "#FFE508",
      danger: "#BE321F",
      critical: "#AA1D05",
      background: "#121212",
      backgroundBluer: "#192A41",
      textPrimary: "#FFFFFF",
      textSecondary: "#B5B5B5",
      textTertiary: "#DFDFDF",
      borderLight: "#A5A5A5",
      border: "#313131",
      info: "#434343",
    },
  },
];
addDecorator(withThemesProvider(themes));
addDecorator(
  withInfo({
    header: false,
    inline: false,
    maxPropArrayLength: 10,
  }),
);

setAddon(withPropsCombinations);

function loadStories() {
  require("../stories");
}

const loadFn = () => {
  const req = require.context("../stories", true, /\.stories\.js$/);
  return req
    .keys()
    .map((fname) => req(fname))
    .filter((exp) => !!exp.default);
};

// configure(loadFn, module);

configure(loadFn, module);
