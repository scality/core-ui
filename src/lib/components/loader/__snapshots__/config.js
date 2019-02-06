import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/loader");
}

configure(loadStories, module);
