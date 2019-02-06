import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/navbar");
}

configure(loadStories, module);
