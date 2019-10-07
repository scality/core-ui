//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Pierechart from "../src/lib/components/pierechart/Pierechart.component";

storiesOf("Pierechart", module).add("Default", () => {
  return (
    <div>
      <Pierechart />
    </div>
  );
});
