import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/linechart");
}

configure(loadStories, module);
