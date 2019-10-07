//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Victorylinechart from "../src/lib/components/victorylinechart/Victorylinechart.component";

storiesOf("Victory", module).add("Default", () => {
  return (
    <div>
      <h3>Victory linechart demo</h3>
      <Victorylinechart />
    </div>
  );
});
