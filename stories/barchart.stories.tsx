import React from 'react';
import { BarChart } from '../src/lib/components/barchart/BarChart.component';
import { Wrapper } from './common';
import {
  verticalStackedData,
  horizontalStackedData,
  barchartData,
} from './data/barchart';
import { SyncedCursorCharts } from '../src/lib/components/vegachartv2/SyncedCursorCharts';

import { Component } from '@storybook/blocks';

const width = 800;
// the size control the size of each small item of the bar

const barConfig = {
  cornerRadius: 8,
  size: 12,
};
// props for vertical stacked bar chart
const idVerticalStacked = 'vis_vertical_stacked';

// props for vertical stacked bar chart

const verticalStackedBarChartArgs = {
  id: 'vis_vertical_stacked',
  xAxis: {
    field: 'xlabel',
    type: 'ordinal',
    title: null,
    axis: {
      labelAngle: 0,
    },
    sort: {
      order: 'ascending',
    },
  },
  yAxis: {
    aggregate: 'count',
    field: '*',
    title: null,
    type: 'quantitative',
    scale: {
      padding: 1,
    },
  },
  color: {
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
  },
  data: verticalStackedData,
  barConfig,
};

// props for horizontal stacked bar chart
const horizontalStackedChartArgs = {
  id: 'vis_horizontal_stacked',
  xAxis: {
    aggregate: 'sum',
    field: 'yield',
    type: 'quantitative',
  },
  yAxis: {
    field: 'variety',
    type: 'nominal',
  },
  color: {
    field: 'site',
    type: 'nominal',
  },
  data: horizontalStackedData,
};

// props for vertical bar chart props
const verticalBarChartArgs = {
  id: 'vis_vertical',
  xAxis: {
    field: 'a',
    type: 'ordinal',
  },
  yAxis: {
    field: 'b',
    type: 'quantitative',
  },
  data: barchartData,
};

//props for horizontal bar chart
const horizontalBarChartArgs = {
  id: 'vis_horizontal',
  xAxis: {
    field: 'b',
    type: 'quantitative',
  },
  yAxis: {
    field: 'a',
    type: 'ordinal',
  },
  data: barchartData,
};

export default {
  title: 'Components/Data Display/Charts/BarChart',
  component: BarChart,
  decorators: [
    (story: Component) => (
      <Wrapper
        style={{ minHeight: '30vh', padding: '3rem', backgroundColor: 'white' }}
      >
        <SyncedCursorCharts>{story()}</SyncedCursorCharts>
      </Wrapper>
    ),
  ],
  argTypes: {
    data: {
      table: {
        disable: true,
      },
    },
  },
};

export const verticalStackedChart = {
  args: { ...verticalStackedBarChartArgs },
};

export const horizontalStackedchart = {
  args: { ...horizontalStackedChartArgs },
};

export const verticalBarChart = {
  args: { ...verticalBarChartArgs },
};

export const horizontalBarChart = {
  args: { ...horizontalBarChartArgs },
};
