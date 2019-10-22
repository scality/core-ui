//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Sparkline from "../src/lib/components/sparkline/Sparkline.component";

storiesOf("Sparkline", module).add("Default", () => {
  return (
    <div>
      <h3>Vega-Lite Sparkline demo - Healthy Monitoring</h3>
      <Sparkline />
    </div>
  );
});
