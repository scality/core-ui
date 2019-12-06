import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/notificationlist");
}

configure(loadStories, module);
