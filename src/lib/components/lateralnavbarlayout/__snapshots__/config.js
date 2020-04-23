import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/lateralnavbarlayout");
}

configure(loadStories, module);
