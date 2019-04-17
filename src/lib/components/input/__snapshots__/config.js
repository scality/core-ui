import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/input");
}

configure(loadStories, module);
