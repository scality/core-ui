import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/victorylinechart");
}

configure(loadStories, module);
