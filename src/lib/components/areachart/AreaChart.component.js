//@flow
import React from "react";
import VegaChart from "../vegachart/VegaChart.component.js";

type Props = {
  id: string,
  data: Array<Object>,
  xAxis: Object,
  yAxis: Array<Object>,
  color?: Object,
  areas: Array<Object>,
  width?: number,
  height?: number
};

function AreaChart({
  id,
  data,
  xAxis,
  yAxis,
  color,
  height = 300,
  width = 1000,
  areas = [],
  ...rest
}: Props) {
  const lines = yAxis.map(y => ({
    mark: {
      type: "line"
    },
    encoding: { y }
  }));

  const spec = {
    data: { values: data },
    encoding: {
      x: xAxis,
      color
    },
    layer: [...lines, ...areas],
    height,
    width,
    ...rest
  };

  return <VegaChart className="sc-areachart" id={id} spec={spec}></VegaChart>;
}

export default AreaChart;
