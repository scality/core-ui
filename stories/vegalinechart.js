//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import VegaLinechart from "../src/lib/components/vegalinechart/VegaLinechart.component";

storiesOf("VegaLinechart", module).add("Default", () => {
  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v4.json",
    description: "Google's stock price over time.",
    data: {
      values: [
        { a: "A", b: 28 },
        { a: "B", b: 55 },
        { a: "C", b: 43 },
        { a: "D", b: 91 },
        { a: "E", b: 81 },
        { a: "F", b: 53 },
        { a: "G", b: 19 },
        { a: "H", b: 87 },
        { a: "I", b: 52 }
      ]
    },
    // transform: [{ filter: "datum.symbol==='GOOG'" }],
    mark: "line",
    encoding: {
      x: { field: "a", type: "nominal" },
      y: { field: "b", type: "quantitative" }
    }
  };

  return <VegaLinechart spec={spec} />;
});
