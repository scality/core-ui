//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import BillboardPiechart from "../src/lib/components/billboardpiechart/BillboardPiechart.component";

storiesOf("billboard-piechart", module).add("Default", () => {
  return (
    <div>
      <h3>billboard piechart demo</h3>
      <BillboardPiechart />
    </div>
  );
});
