import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/vegatestchart");
}

configure(loadStories, module);
