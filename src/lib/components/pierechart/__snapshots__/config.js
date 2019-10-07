import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/pierechart");
}

configure(loadStories, module);
