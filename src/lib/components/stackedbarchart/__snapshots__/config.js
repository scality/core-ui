import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/stackedbarchart");
}

configure(loadStories, module);
