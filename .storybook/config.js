import "@babel/polyfill";

import { configure, setAddon } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import withPropsCombinations from "react-storybook-addon-props-combinations";

setAddon(withPropsCombinations);
setAddon(withInfo);

function loadStories() {
  require("../stories");
}

configure(loadStories, module);
