//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import BuildboardGaugechart from "../src/lib/components/buildboardgaugechart/BuildboardGaugechart.component";

storiesOf("BuildboardGaugechart", module)
  .add("Default", () => {
    return (
      <div>
          <BuildboardGaugechart />
      </div>
    );
  });
