import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/collapsiblepanel");
}

configure(loadStories, module);
