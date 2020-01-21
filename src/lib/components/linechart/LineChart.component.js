//@flow
import React from "react";
import VegaChart from "../vegachart/VegaChart.component.js";
type Props = {
  id: string,
  data: Array<Object>,
  xAxis: Object,
  yAxis: Array<Object>,
  color?: Object,
  tooltip?: boolean,
  lineConfig?: Object
};

function LineChart({
  id,
  data,
  xAxis,
  yAxis,
  color,
  tooltip = false,
  lineConfig,
  ...rest
}: Props) {
  // hardcode the trendline configuration for tooltip
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
    mark: { type: "line", ...lineConfig },
    encoding: { y }
  }));

  const spec = {
    data: { values: data },
    encoding: {
      x: xAxis,
      color,
      tooltip: tooltip && [xAxis, ...yAxis]
    },
    layer: [...lines],
    ...rest
  };
  if (tooltip) {
    spec.layer.push(trendline);
  }
  return <VegaChart id={id} spec={spec}></VegaChart>;
}

export default LineChart;
