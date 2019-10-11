//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import BillboardGaugechart from "../src/lib/components/billboardgaugechart/BillboardGaugechart.component";

storiesOf("billboard-gaugechart", module).add("Default", () => {
  return (
    <div>
      <h3>billboard gaugechart demo</h3>
      <BillboardGaugechart />
    </div>
  );
});
