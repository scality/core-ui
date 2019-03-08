import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/searchinput");
}

configure(loadStories, module);
