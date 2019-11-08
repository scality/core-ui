import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/progressbar");
}

configure(loadStories, module);
