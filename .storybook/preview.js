import React from "react";
import { ThemeProvider } from "styled-components";

import { defaultTheme } from "../src/lib/style/theme";

const themes = {
  darkRebrand: defaultTheme.darkRebrand,
  light: defaultTheme.light,
};

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: "darkRebrand",
    toolbar: {
      icon: "circlehollow",
      // array of plain string values or MenuItem shape (see below)
      items: ["light", "darkRebrand"],
    },
  },
};

const withThemeProvider = (Story, context) => {
  const theme = themes[context.globals.theme];
  return (
    <ThemeProvider theme={theme}>
      <Story {...context} />
    </ThemeProvider>
  );
};

export const decorators = [withThemeProvider];

export const parameters = {
  options: {
    storySort: {
      order: [
        "Style",
        ["Color", "Icons"],
        "Components",
        [
          "Navigation",
          "Button",
          "Chips",
          "Checkbox",
          "Toggle",
          "Dropdown",
          "Input",
          "Selector",
          "Chart",
          "Progress & loading",
          "Table",
          "Notification",
        ],
        "Guideline",
      ],
    },
  },
};
