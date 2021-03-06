//@flow
import React from 'react';
import BarChart from '../src/lib/components/barchart/BarChart.component';
import { Wrapper, Title } from './common';
import {
  verticalStackedData,
  horizontalStackedData,
  barchartData,
} from './data/barchart';

// props for vertical stacked bar chart
const idVerticalStacked = 'vis_vertical_stacked';
const xAxisVerticalStacked = {
  field: 'xlabel',
  type: 'ordinal',
  title: null,
  axis: { labelAngle: 0 },
  sort: {
    order: 'ascending',
  },
};
const yAxisVerticalStacked = {
  aggregate: 'count',
  field: '*',
  title: null,
  type: 'quantitative',
  scale: {
    padding: 1,
  },
};
const colorVerticalStacked = {
  field: 'status',
  type: 'nominal',
  legend: {
    direction: 'horizontal',
    orient: 'top',
    title: null,
    symbolType: 'circle',
    columnPadding: 50,
  },
  scale: {
    domain: ['2XX', '401', '404', '4XX', '503', '5XX'],
    range: ['#4BE4E2', '#E45834', '#FEFA52', '#968BFF', '#BE2543', '#DC90F1'],
  },
};
const width = 800;
// the size control the size of each small item of the bar
const barConfig = { cornerRadius: 8, size: 12 };

// props for horizontal stacked bar chart
const idHorizontalStacked = 'vis_horizontal_stacked';
const xAxisHorizontalStacked = {
  aggregate: 'sum',
  field: 'yield',
  type: 'quantitative',
};
const yAxisHorizontalStacked = { field: 'variety', type: 'nominal' };
const colorHorizontalStacked = { field: 'site', type: 'nominal' };

// props for vertical bar chart
const idVertical = 'vis_vertical';
const xAxisVertical = { field: 'a', type: 'ordinal' };
const yAxisVertical = { field: 'b', type: 'quantitative' };

// props for horizontal bar chart
const idHorizontal = 'vis_horizontal';
const xAxisHorizontal = { field: 'b', type: 'quantitative' };
const yAxisHorizontal = { field: 'a', type: 'ordinal' };

export default {
  title: 'Components/Chart/BarChart',
  component: BarChart,
};

export const Default = () => {
  return (
    <Wrapper>
      <Title>Vertical Stacked Bar Chart Demo </Title>
      <BarChart
        id={idVerticalStacked}
        data={verticalStackedData}
        xAxis={xAxisVerticalStacked}
        yAxis={yAxisVerticalStacked}
        color={colorVerticalStacked}
        width={width}
        barConfig={barConfig}
      />
      <Title>Horizontal Stacked Bar Chart Demo </Title>
      <BarChart
        id={idHorizontalStacked}
        data={horizontalStackedData}
        xAxis={xAxisHorizontalStacked}
        yAxis={yAxisHorizontalStacked}
        color={colorHorizontalStacked}
      />
      <Title>Vertical Bar Chart Demo </Title>
      <BarChart
        id={idVertical}
        data={barchartData}
        xAxis={xAxisVertical}
        yAxis={yAxisVertical}
      />
      <Title>Horizontal Bar Chart Demo </Title>
      <BarChart
        id={idHorizontal}
        data={barchartData}
        xAxis={xAxisHorizontal}
        yAxis={yAxisHorizontal}
      />
    </Wrapper>
  );
};
