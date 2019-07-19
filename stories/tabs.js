import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { action } from "@storybook/addon-actions";

import Tabs from "../src/lib/components/tabs/Tabs.component";
import { jade } from "../src/lib/style/theme";

const tabs = [
  {
    selected: true,
    title: "Detail",
    onClick: action("Detail clicked")
  },
  {
    selected: false,
    title: "Pods",
    onClick: action("Pods clicked")
  },
  {
    selected: false,
    title: "Volumes",
    onClick: action("Volumes clicked")
  }
];

storiesOf("Tabs", module).add("Default", () => {
  return (
    <div>
      <h3>Default Tabs </h3>
      <Tabs items={tabs}>Content</Tabs>
      <h3>Tabs with customized color</h3>
      <Tabs items={tabs} activeColor="#e99121">
        Content
      </Tabs>
    </div>
  );
});
