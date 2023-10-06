import React from 'react';
import { BarChart } from '../src/lib/components/barchart/BarChart.component';
import { Wrapper, Title } from './common';
import {
  verticalStackedData,
  horizontalStackedData,
  barchartData,
} from './data/barchart';
import { SyncedCursorCharts } from '../src/lib/components/vegachartv2/SyncedCursorCharts';

import { Component } from '@storybook/blocks';
import { minHeight } from 'styled-system';

const width = 800;
// the size control the size of each small item of the bar

const barConfig = {
  cornerRadius: 8,
  size: 12,
};

// props for vertical stacked bar chart
const idVerticalStacked = 'vis_vertical_stacked';
const xAxisVerticalStacked = {
  field: 'xlabel',
  type: 'ordinal',
  title: null,
  axis: {
    labelAngle: 0,
  },
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


// props for horizontal stacked bar chart
const idHorizontalStacked = 'vis_horizontal_stacked';
const xAxisHorizontalStacked = {
  aggregate: 'sum',
  field: 'yield',
  type: 'quantitative',
};
const yAxisHorizontalStacked = {
  field: 'variety',
  type: 'nominal',
};
const colorHorizontalStacked = {
  field: 'site',
  type: 'nominal',
};

// Recreating vertical bar chart props
const verticalBarChartArgs = {
  id: 'vis_vertical',
  xAxis:{
    field: 'a',
    type: 'ordinal',
  },
  yAxis:{
    field: 'b',
    type: 'quantitative',
  },
  data:barchartData

}

// props for vertical bar chart
const idVertical = 'vis_vertical';
const xAxisVertical = {
  field: 'a',
  type: 'ordinal',
};
const yAxisVertical = {
  field: 'b',
  type: 'quantitative',
};

//Recreating horizontal bar chart

const horizontalBarChartArgs = {
  id: 'vis_hotrizontal',
  xAxis:{
    field: 'b',
    type: 'quantitative',
  },
  yAxis:{
    field: 'a',
    type: 'ordinal',
  },
  data:barchartData
}

// props for horizontal bar chart
const idHorizontal = 'vis_horizontal';
const xAxisHorizontal = {
  field: 'b',
  type: 'quantitative',
};
const yAxisHorizontal = {
  field: 'a',
  type: 'ordinal',
};

export default {
  title: 'Components/Chart/BarChart',
  component: BarChart,
  decorators:[(story:Component) => (
    <Wrapper style={{minHeight:'30vh', padding:'3rem'}}>
      <SyncedCursorCharts>
        {story()}
      </SyncedCursorCharts>
    </Wrapper>) ],
  argTypes:{
    id :{control:false},
    data:{control:false},
    yAxis:{control:false},
    xAxis:{control:false},
    barConfig:{control:false},
    color:{control:false},
    height:{control:false},
  }
};

export const verticalStackedChart = {
  args:{
    id:'vis_vertical_stacked',
    xAxis:{
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
    yAxis:{
      aggregate: 'count',
      field: '*',
      title: null,
      type: 'quantitative',
      scale: {
        padding: 1,
      },
    },
    data:verticalStackedData,
    barConfig:barConfig,
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
    },}
}

export const horizontalStackedchart = {
  args:{
    id:'vis_horizontal_stacked',
    xAxis:{
    aggregate: 'sum',
    field: 'yield',
    type: 'quantitative',
    },
    yAxis: {
    field: 'variety',
    type: 'nominal',
    },
    color:{
    field: 'site',
    type: 'nominal',
    },
    data:horizontalStackedData,}
}

export const verticalBarChart = {
  args:{...verticalBarChartArgs}
}

export const horizontalBarChart = {
  args: {...horizontalBarChartArgs}
}
/*
export default {
  title: 'Components/Chart/BarChart',
  component: BarChart,
};

export const Default = {
  render: ({}) => {
    return (
      <Wrapper>
        <SyncedCursorCharts>
          <Title>Vertical Stacked Bar Chart Demo </Title>
          <BarChart
            id={idVerticalStacked}
            data={verticalStackedData}
            xAxis={xAxisVerticalStacked}
            yAxis={yAxisVerticalStacked}
            color={colorVerticalStacked}
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
        </SyncedCursorCharts>
      </Wrapper>
    );
  },
}; */
