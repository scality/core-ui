import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/areachart");
}

configure(loadStories, module);
