import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/sidebar");
}

configure(loadStories, module);
