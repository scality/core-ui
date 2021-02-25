import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/emptystate");
}

configure(loadStories, module);
