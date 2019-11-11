import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/textarea");
}

configure(loadStories, module);
