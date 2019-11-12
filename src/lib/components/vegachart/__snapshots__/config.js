import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/vegachart");
}

configure(loadStories, module);
