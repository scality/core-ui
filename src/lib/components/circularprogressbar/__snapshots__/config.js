import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/circularprogressbar");
}

configure(loadStories, module);
