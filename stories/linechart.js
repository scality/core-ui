//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Linechart from "../src/lib/components/linechart/Linechart.component";
import Pierechart from "../src/lib/components/pierechart/Pierechart.component";

storiesOf("Recharts", module).add("Default", () => {
  return (
    <div>
      <h3>Recharts linechart demo</h3>
      <Linechart />
      <h3>Recharts piechart demo</h3>
      <Pierechart />
    </div>
  );
});
