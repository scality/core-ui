import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/chips");
}

configure(loadStories, module);
