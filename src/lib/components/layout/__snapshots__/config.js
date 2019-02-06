import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/layout");
}

configure(loadStories, module);
