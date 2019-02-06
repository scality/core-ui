import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/dropdown");
}

configure(loadStories, module);
