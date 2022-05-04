import React from 'react';
import AreaChart from '../src/lib/components/areachart/AreaChart.component';
import { area_charts } from './data/areachart';
import { Wrapper, Title } from './common';
const xAxis_area_chart = {
  field: 'time',
  type: 'temporal',
  timeUnit: 'yearmonthdatehoursminutes',
  title: 'time',
  axis: null,
};
const yAxis_area_chart = [
  {
    field: 'Bandwidth',
    type: 'quantitative',
    color: '#968BFF',
    axis: {
      title: null,
      ticks: false,
      labels: false,
    },
  },
  {
    field: 'Bandwidth',
    type: 'quantitative',
    color: '#F6B288',
    axis: {
      title: null,
      ticks: false,
      labels: false,
    },
  },
];
const color_area_chart = {
  field: 'Average',
  type: 'nominal',
  legend: {
    direction: 'horizontal',
    orient: 'bottom',
    title: null,
    labelFontSize: 15,
    columnPadding: 50,
    symbolStrokeWidth: 5,
  },
  domain: ['AvgIn', 'AvgOut'],
  scale: {
    range: ['#968BFF', '#F6B288'],
  },
};
const area = {
  transform: [
    {
      filter: "datum.Average==='AvgOut'",
    },
  ],
  mark: {
    opacity: 0.3,
    type: 'area',
  },
  encoding: {
    x: {
      field: 'time',
      type: 'temporal',
      timeUnit: 'yearmonthdatehoursminutes',
      title: 'time',
      axis: null,
    },
    y: {
      field: 'Bandwidth',
      type: 'quantitative',
    },
    y2: {
      value: 0,
    },
  },
};
const area2 = {
  transform: [
    {
      filter: "datum.Average==='AvgIn'",
    },
  ],
  mark: {
    opacity: 0.3,
    type: 'area',
  },
  encoding: {
    x: {
      field: 'time',
      type: 'temporal',
      timeUnit: 'yearmonthdatehoursminutes',
      title: 'time',
      axis: null,
    },
    y: {
      field: 'Bandwidth',
      type: 'quantitative',
    },
    y2: {
      value: 0,
    },
  },
};
const areas = [area, area2];
const id_area_chart = 'vis_area_chart';
export default {
  title: 'Components/Chart/AreaChart',
  component: AreaChart,
};
export const Default = () => {
  return (
    <Wrapper>
      <Title>Vege-Lite area chart</Title>
      <AreaChart
        id={id_area_chart}
        data={area_charts}
        xAxis={xAxis_area_chart}
        yAxis={yAxis_area_chart}
        color={color_area_chart}
        areas={areas}
      />
    </Wrapper>
  );
};