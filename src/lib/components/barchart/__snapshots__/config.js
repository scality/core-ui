import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/barchart");
}

configure(loadStories, module);
