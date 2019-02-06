import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/checkbox");
}

configure(loadStories, module);
