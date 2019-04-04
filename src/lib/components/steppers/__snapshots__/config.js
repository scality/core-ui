import { configure } from "@storybook/react";

function loadStories() {
  require("../../../../../stories/steppers");
}

configure(loadStories, module);
