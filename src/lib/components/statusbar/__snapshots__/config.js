import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/statusbar");
}

configure(loadStories, module);
