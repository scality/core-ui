import React from 'react';
import { Sparkline as SparkLine } from '../src/lib/components/sparkline/SparkLine.component';
import { data, multiLineData } from './data/sparklinechart';
import { Wrapper, Title } from './common';
const xAxis = {
  field: 'date',
  type: 'temporal',
  axis: null,
};
const yAxis = {
  field: 'y',
  type: 'quantitative',
  axis: {
    title: null,
    ticks: false,
    labels: false,
  },
};
const row = {
  field: 'symbol',
  type: 'nominal',
  title: null,
  // the header of the subplot
  header: {
    labelAngle: 0,
    labelAlign: 'left',
  },
};
const id = 'vis';
const id_multi = 'multiVis';
const lineConfig = {
  interpolate: 'monotone',
};
export default {
  title: 'Components/Chart/SparkLine',
  component: SparkLine,
};
export const Default = () => {
  return (
    <Wrapper>
      <Title>Vege-Lite sparkline chart demo</Title>
      <SparkLine
        id={id}
        data={data}
        xAxis={xAxis}
        yAxis={yAxis}
        title={'OPERATIONS PER SECONDS'}
        row={row}
        lineConfig={lineConfig}
      />
      <Title>Vege-Lite sparkline multi chart demo</Title>
      <SparkLine
        id={id_multi}
        data={multiLineData}
        xAxis={xAxis}
        yAxis={yAxis}
        row={row}
      />
    </Wrapper>
  );
};
