import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/notifications");
}

configure(loadStories, module);
