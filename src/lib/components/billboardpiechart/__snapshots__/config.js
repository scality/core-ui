import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/billboardpiechart");
}

configure(loadStories, module);
