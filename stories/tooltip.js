// @flow

import React from "react";
import { storiesOf } from "@storybook/react";
import Tooltip from "../src/lib/components/tooltip/Tooltip.component";

storiesOf("Tooltip", module).add("Default", () => {
  return (
    <div>
      <h3>Right (Default) </h3>
      <div class="tooltipDiv">
        <Tooltip
          overlay={
            <span>
              Hello <i className="fas fa-smile" />
            </span>
          }
        >
          <span class="tooltipText">Hover me!</span>
        </Tooltip>
      </div>
      <h3>Top</h3>
      <div class="tooltipDiv">
        <Tooltip
          placement="top"
          overlay={
            <span>
              Hello <i className="fas fa-smile" />
            </span>
          }
        >
          <span class="tooltipText">Hover me!</span>
        </Tooltip>
      </div>
      <h3>Bottom</h3>
      <div class="tooltipDiv">
        <Tooltip
          placement="bottom"
          overlay={
            <span>
              Hello <i className="fas fa-smile" />
            </span>
          }
        >
          <span class="tooltipText">Hover me!</span>
        </Tooltip>
      </div>
      <h3>Left</h3>
      <div class="tooltipDiv">
        <Tooltip
          placement="left"
          overlay={
            <span>
              Hello <i className="fas fa-smile" />
            </span>
          }
        >
          <span class="tooltipText">Hover me!</span>
        </Tooltip>
      </div>
    </div>
  );
});
