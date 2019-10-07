import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/reactlinechart");
}

configure(loadStories, module);
