import React from "react";
import { storiesOf } from "@storybook/react";
import Tooltip from "../src/lib/components/tooltip/Tooltip.component";
import Button from "../src/lib/components/button/Button.component";

storiesOf("Tooltip", module).add("Default", () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <h3>Default Tooltip</h3>
        <Tooltip overlay="Hellooooo">
          <span>Hover here!</span>
        </Tooltip>
      </div>

      <div>
        <h3>Tooltip right</h3>
        <Tooltip placement="right" overlay="Helloooooo">
          <span>Hover here!</span>
        </Tooltip>
      </div>
      <div style={{ marginLeft: "100px" }}>
        <h3>Tooltip left</h3>
        <Tooltip placement="left" overlay="Helloooooo">
          <span>Hover here!</span>
        </Tooltip>
      </div>
      <div>
        <h3>Tooltip bottom</h3>
        <Tooltip placement="bottom" overlay="Helloooooo">
          <span>Hover here!</span>
        </Tooltip>
      </div>
      <div>
        <h3>Customize your tooltip style</h3>
        <Tooltip
          placement="right"
          overlaystyle={{ backgroundColor: "green", fontSize: "20px" }}
          overlay="Helloooooo"
        >
          <span>Hover here!</span>
        </Tooltip>
      </div>
      <div>
        <h3>Tooltip with button</h3>
        <Tooltip placement="bottom" overlay="Helloooooo">
          <Button size="small" text="Hover here" />
        </Tooltip>
      </div>
      <div>
        <h3>add icon in the overlay of tooltip</h3>
        <Tooltip
          placement="bottom"
          overlay={
            <div>
              <i className="fal fa-smile"></i>Helloooooooo
            </div>
          }
        >
          <span>tooltip with icon</span>
        </Tooltip>
      </div>
      <div>
        <h3>Tooltip doesn't trigger</h3>
        <Tooltip placement="bottom">
          <span>Hover here!</span>
        </Tooltip>
      </div>
    </div>
  );
});
