import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/billboardlinechart");
}

configure(loadStories, module);
