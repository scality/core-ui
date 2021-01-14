const createCompiler = require("@storybook/addon-docs/mdx-compiler-plugin");

module.exports = {
  stories: ["../stories/*.@(js|mdx)"],
  addons: [
    "@storybook/addon-essentials",
    "storybook-addon-styled-component-theme/dist/register",
  ],
};
