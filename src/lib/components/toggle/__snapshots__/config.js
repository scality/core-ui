import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/toggle");
}

configure(loadStories, module);
