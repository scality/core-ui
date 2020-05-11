import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/reacttable");
}

configure(loadStories, module);
