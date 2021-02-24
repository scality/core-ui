import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-styled-component-theme";
import {
  gray,
  blueLighter,
  jade,
  turquoise,
  yellowOrange,
  warmRed,
  white,
  defaultTheme,
} from "../src/lib/style/theme";

const themes = [
  {
    name: "Dark Theme",
    brand: defaultTheme.dark,
  },
  {
    name: "Light Theme",
    brand: defaultTheme.light,
  },
];
addDecorator(withThemesProvider(themes));
