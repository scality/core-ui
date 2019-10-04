import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/multiselect");
}

configure(loadStories, module);
