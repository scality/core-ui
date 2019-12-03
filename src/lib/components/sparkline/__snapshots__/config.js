import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/sparkline");
}

configure(loadStories, module);
