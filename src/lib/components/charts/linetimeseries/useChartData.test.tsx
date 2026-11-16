import { renderHook } from '@testing-library/react';
import React from 'react';
import { ChartLegendWrapper } from '../legend/ChartLegendWrapper';
import { Serie } from './LineTimeSerieChart.types';
import { useChartData } from './useChartData';

const data: [number, number][] = [
  [1622505600, 10],
  [1622509200, 20],
];

const renderChartData = (series: Serie[]) =>
  renderHook(
    () =>
      useChartData({
        series,
        startingTimeStamp: data[0][0],
        duration: data[1][0] - data[0][0],
        interval: data[1][0] - data[0][0],
        yAxisType: 'default',
      }),
    {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <ChartLegendWrapper colorSet={{ read: 'red', write: 'blue' }}>
          {children}
        </ChartLegendWrapper>
      ),
    },
  );

describe('useChartData dashed series', () => {
  it('lists the tooltip label of each dashed series, built with its metric prefix', () => {
    const { result } = renderChartData([
      {
        resource: 'read',
        metricPrefix: 'ops',
        data,
        getTooltipLabel: (prefix, resource) => `${resource} ${prefix}`,
      },
      {
        resource: 'write',
        metricPrefix: 'ops',
        data,
        getTooltipLabel: (prefix, resource) => `${resource} ${prefix}`,
        isLineDashed: true,
      },
    ]);

    expect([...result.current.dashedSeriesLabels]).toEqual(['write ops']);
  });

  it('marks a resource dashed only when all of its series are', () => {
    const { result } = renderChartData([
      { resource: 'read', data, getTooltipLabel: () => 'read measured' },
      {
        resource: 'read',
        data,
        getTooltipLabel: () => 'read forecast',
        isLineDashed: true,
      },
      {
        resource: 'write',
        data,
        getTooltipLabel: () => 'write forecast',
        isLineDashed: true,
      },
    ]);

    expect(result.current.isDashedByResource).toEqual({
      read: false,
      write: true,
    });
  });
});
