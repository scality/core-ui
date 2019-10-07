//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Linechartnivo from "../src/lib/components/linechartnivo/Linechartnivo.component";
import { Pie } from "@nivo/pie";

storiesOf("Nivo", module).add("Default", () => {
  return (
    <div>
      <h3>nivo linechart demo</h3>
      <Linechartnivo />
      <h3>nivo piechart demo</h3>
      <div></div>
    </div>
  );
});
