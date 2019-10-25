//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import VegaChart from "../src/lib/components/vegachart/VegaChart.component";
import { data } from "./data/linechart";

const spec = {
  data: { values: data },
  encoding: {
    x: {
      field: "time",
      type: "temporal",
      timeUnit: "yearmonthdatehoursminutes",
      title: "time"
    },
    tooltip: [
      {
        field: "time",
        type: "temporal",
        timeUnit: "yearmonthdatehoursminutes"
      },
      {
        field: "total_space",
        type: "quantitative",
        title: "TOTAL SPACE"
      },
      {
        field: "used_space",
        type: "quantitative",
        title: "USED SPACE"
      }
    ]
  },
  layer: [
    {
      mark: { type: "line", color: "green" },
      encoding: {
        y: {
          field: "total_space",
          type: "quantitative",
          title: "TOTAL SPACE (GB)"
        }
      }
    },
    {
      mark: { type: "line", color: "orange" },
      encoding: {
        y: {
          field: "used_space",
          type: "quantitative",
          title: "USED SPACE (GB)"
        }
      }
    },
    {
      mark: "rule",
      selection: {
        index: {
          type: "single",
          on: "mousemove",
          encodings: ["x"],
          nearest: true
        }
      },
      encoding: {
        color: {
          condition: {
            selection: { not: "index" },
            value: "transparent"
          }
        }
      }
    }
  ]
};

const id = "vis";

storiesOf("VegaChart", module).add("Default", () => {
  return (
    <div>
      <h3>Vega-Lite wrapper - need to specify the entire spec</h3>
      <VegaChart id={id} spec={spec} />
    </div>
  );
});
