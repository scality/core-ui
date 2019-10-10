import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/buildboardgaugechart");
}

configure(loadStories, module);
