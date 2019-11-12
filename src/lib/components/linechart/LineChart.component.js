//@flow
import React from "react";
import VegaChart from "../vegachart/VegaChart.component.js";
type Props = {
  id: string,
  data: Array<Object>,
  xAxis: Object,
  yAxis: Array<Object>
};

function LineChart({ id, data, xAxis, yAxis, ...rest }: Props) {
  // hardcode the trendline configuration
  const trendline = {
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
  };

  const lines = yAxis.map(y => ({
    mark: { type: "line", color: y.color },
    encoding: { y }
  }));

  const spec = {
    data: { values: data },
    encoding: { x: xAxis, tooltip: [xAxis, ...yAxis] },
    layer: [...lines, trendline],
    ...rest
  };

  return <VegaChart id={id} spec={spec}></VegaChart>;
}

export default LineChart;
