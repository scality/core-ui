import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/breadcrumb");
}

configure(loadStories, module);
