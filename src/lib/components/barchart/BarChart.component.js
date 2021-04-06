//@flow
import React from 'react';
import VegaChart from '../vegachart/VegaChart.component.js';

type Props = {
  id: string,
  data: Array<Object>,
  xAxis: Object,
  yAxis: Object,
  color?: Object,
  width?: number,
  height?: number,
  barConfig?: Object,
};

function BarChart({
  id,
  data,
  xAxis,
  yAxis,
  color,
  height = 200,
  width = 800,
  barConfig,
}: Props) {
  const spec = {
    mark: { type: 'bar', ...barConfig },
    width,
    height,
    data: {
      values: data,
    },
    encoding: {
      x: xAxis,
      y: yAxis,
      color,
    },
  };

  return <VegaChart id={id} spec={spec}></VegaChart>;
}

export default BarChart;
