import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/tooltip");
}

configure(loadStories, module);
