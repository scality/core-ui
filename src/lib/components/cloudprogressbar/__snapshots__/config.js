import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/cloudprogressbar");
}

configure(loadStories, module);
