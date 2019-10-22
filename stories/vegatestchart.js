//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import VegaTestChart from "../src/lib/components/vegatestchart/VegaTestChart.component";

storiesOf("VegaTestChart", module)
  .add("Default", () => {
    return (
      <div>
          <VegaTestChart />
      </div>
    );
  });
