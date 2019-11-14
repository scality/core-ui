import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/banner");
}

configure(loadStories, module);
