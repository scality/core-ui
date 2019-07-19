import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/tabs");
}

configure(loadStories, module);
