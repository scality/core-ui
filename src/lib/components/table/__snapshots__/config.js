import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/table");
}

configure(loadStories, module);
