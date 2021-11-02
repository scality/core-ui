//@flow
import React from 'react';
import VegaChart from '../vegachartv2/VegaChartV2.component.js';
type Props = {
  id: string,
  data: Array<Object>,
  xAxis: Object,
  yAxis: Object,
  color?: Object,
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
  barConfig,
}: Props) {
  const spec = {
    mark: { type: 'bar', ...barConfig },
    width: 'container',
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
