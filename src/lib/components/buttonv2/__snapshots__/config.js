import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/buttonv2");
}

configure(loadStories, module);
