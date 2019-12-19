//@flow
import React from "react";
import VegaChart from "../vegachart/VegaChart.component.js";

type Props = {
  id: string,
  data: Array<Object>,
  xAxis: Object,
  yAxis: Object,
  mark: Object,
  color?: Object,
  width?: number
};

function StackedBarChart({
  id,
  data,
  xAxis,
  yAxis,
  mark,
  color,
  width = 1000
}: Props) {
  const spec = {
    mark,
    width,
    data: {
      values: data
    },
    encoding: {
      x: xAxis,
      y: yAxis,
      color
    }
  };

  return <VegaChart id={id} spec={spec}></VegaChart>;
}

export default StackedBarChart;
