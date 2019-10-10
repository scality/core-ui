//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Linechartnivo from "../src/lib/components/linechartnivo/Linechartnivo.component";
import { Pie } from "@nivo/pie";

const data = [{ name: "used", value: 2400 }, { name: "availble", value: 4567 }];
const commonProperties = {
  width: 600,
  height: 400,
  margin: { top: 80, right: 120, bottom: 80, left: 120 },
  data: data.map(d => ({
    id: d.name,
    ...d
  })),
  animate: true
};

storiesOf("Nivo", module).add("Default", () => {
  return (
    <div>
      <h3>nivo linechart demo</h3>
      <Linechartnivo />
      <h3>nivo piechart demo</h3>
      <Pie
        {...commonProperties}
        tooltip={({ id, value, color }) => (
          <strong style={{ color }}>
            {id}: {value}
          </strong>
        )}
        theme={{
          tooltip: {
            container: {
              background: "#333"
            }
          }
        }}
      />
    </div>
  );
});
