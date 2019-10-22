import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/testchart");
}

configure(loadStories, module);
