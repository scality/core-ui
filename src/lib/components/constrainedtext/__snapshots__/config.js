import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/constrainedtext");
}

configure(loadStories, module);
