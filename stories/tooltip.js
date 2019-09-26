import React from "react";
import { storiesOf } from "@storybook/react";
import Tooltip from "../src/lib/components/tooltip/Tooltip.component";

storiesOf("Tooltip", module).add("Default", () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <h3>Default Tooltip</h3>
        <Tooltip>
          <span>Hover here!</span>
        </Tooltip>
      </div>

      <div>
        <h3>Tooltip right</h3>
        <Tooltip placement="right">
          <span>Hover here!</span>
        </Tooltip>
      </div>
      <div style={{ marginLeft: "100px" }}>
        <h3>Tooltip left</h3>
        <Tooltip placement="left">
          <span>Hover here!</span>
        </Tooltip>
      </div>
      <div>
        <h3>Tooltip buttom</h3>
        <Tooltip placement="buttom">
          <span>Hover here!</span>
        </Tooltip>
      </div>
    </div>
  );
});
