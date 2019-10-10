//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import BillboardLinechart from "../src/lib/components/billboardlinechart/BillboardLinechart.component";

storiesOf("billboard-linechart", module).add("Default", () => {
  return (
    <div>
      <h3>billboard linechart demo</h3>
      <BillboardLinechart />
    </div>
  );
});
