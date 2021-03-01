import React from "react";
import BarChart from "../../src/lib/components/barchart/BarChart.component";
import { verticalStackedData } from "../data/barchart";

// props for vertical stacked bar chart
const idVerticalStacked = "vis_vertical_stacked";
const xAxisVerticalStacked = {
  field: "xlabel",
  type: "ordinal",
  title: null,
  axis: { labelAngle: 0 },
  sort: {
    order: "ascending",
  },
};
const yAxisVerticalStacked = {
  aggregate: "count",
  field: "*",
  title: null,
  type: "quantitative",
  scale: {
    padding: 1,
  },
};
const colorVerticalStacked = {
  field: "status",
  type: "nominal",
  legend: {
    direction: "horizontal",
    orient: "top",
    title: null,
    symbolType: "circle",
    columnPadding: 50,
  },
  scale: {
    domain: ["2XX", "401", "404", "4XX", "503", "5XX"],
    range: ["#4BE4E2", "#E45834", "#FEFA52", "#968BFF", "#BE2543", "#DC90F1"],
  },
};
const width = 800;
// the size control the size of each small item of the bar
const barConfig = { cornerRadius: 8, size: 12 };

export const ChartExample = () => (
  <BarChart
    id={idVerticalStacked}
    data={verticalStackedData}
    xAxis={xAxisVerticalStacked}
    yAxis={yAxisVerticalStacked}
    color={colorVerticalStacked}
    width={width}
    barConfig={barConfig}
  />
);
