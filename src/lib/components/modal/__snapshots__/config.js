import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/modal");
}

configure(loadStories, module);
