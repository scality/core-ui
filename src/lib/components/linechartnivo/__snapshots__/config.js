import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/linechartnivo");
}

configure(loadStories, module);
