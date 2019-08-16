import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/select");
}

configure(loadStories, module);
