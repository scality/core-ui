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
  lineConfig?: Object,
  width?: number,
  height?: number,
  displayTrendLine?: boolean,
  strokeDashEncodingConfig?: Object,
  opacityEncodingConfig?: Object,
  tooltipConfig?: Object,
  tooltipTheme?: string,
};

function LineChart({
  id,
  data,
  xAxis,
  yAxis,
  color,
  tooltip = false,
  lineConfig,
  height = 300,
  width = 1000,
  displayTrendLine = false,
  strokeDashEncodingConfig,
  opacityEncodingConfig,
  tooltipConfig,
  tooltipTheme,
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
        nearest: true,
      },
    },
    encoding: {
      color: {
        condition: {
          selection: { not: "index" },
          value: "transparent",
        },
      },
    },
  };

  /*
   ** strokeDash encoding allows to define a field in data items that defines the line stroke dash property
   ** this would allow to get same color lines but having some dashed and some plains
   ** https://vega.github.io/vega-lite/docs/line.html#multi-series-line-chart-with-varying-dashes
   */

  /*
   ** opacity Encoding allows to define rules for each line's opacity
   */
  const lines = yAxis.map((y) => ({
    mark: {
      type: "line",
      ...lineConfig,
    },
    encoding: {
      y,
      strokeDash: strokeDashEncodingConfig,
      opacity: opacityEncodingConfig,
    },
  }));

  const currentTimeTrendline = {
    mark: {
      type: "rule",
      style: "ruleCurrentTime",
      color: "white",
      opacity: 0.2,
    },
    encoding: {
      x: { value: width / 2 },
      y: { value: height },
      y2: { value: 0 },
    },
  };

  const topTrendline = {
    mark: {
      type: "rule",
      style: "ruleTop",
      color: "orange",
      opacity: 0.2,
    },
    encoding: {
      y: { aggregate: "max", field: "capacity", type: "quantitative" },
      x: { value: 0 },
      x2: { value: width },
    },
  };

  const spec = {
    data: { values: data },
    encoding: {
      x: xAxis,
      color,
      // To disable tooltips for a particular single view specification, you can set the "tooltip" property of a mark definition block to null.
      tooltip: tooltip ? [xAxis, ...yAxis] : null,
    },
    height,
    width,
    layer: [...lines],
    ...rest,
  };
  if (tooltip) {
    spec.layer.push(tooltipConfig || trendline);
  }
  if (displayTrendLine) {
    spec.layer.push(currentTimeTrendline);
    spec.layer.push(topTrendline);
  }

  return (
    <VegaChart id={id} spec={spec} theme={tooltipTheme || "light"}></VegaChart>
  );
}

export default LineChart;
