import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/vegalinechart");
}

configure(loadStories, module);
