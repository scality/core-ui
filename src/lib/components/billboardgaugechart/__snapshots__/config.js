import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/billboardgaugechart");
}

configure(loadStories, module);
