import { render } from '@testing-library/react';
import React from 'react';
import {
  LineChartProps,
  LineTimeSerieChart,
} from './linetimeseriechart.component';
import { ChartLegendWrapper } from '../chartlegend/ChartLegendWrapper';
import { ThemeProvider } from 'styled-components';
import { coreUIAvailableThemes } from '../../style/theme';

const TestSeries = [
  {
    resource: 'Series 1',
    getTooltipLabel: () => `Series 1`,
    data: [
      [1622505600000, 10],
      [1622509200000, 20],
      [1622512800000, 30],
    ] as [number, number][],
  },
  {
    resource: 'Series 2',
    getTooltipLabel: () => `Series 2`,
    data: [
      [1622505600000, 15],
      [1622509200000, 25],
      [1622512800000, 35],
    ] as [number, number][],
  },
];

const ColorSet = {
  'Series 1': '#FF0000',
  'Series 2': '#00FF00',
};

const renderLineTimeSerieChart = (props: Partial<LineChartProps> = {}) => {
  return render(
    <ThemeProvider theme={coreUIAvailableThemes.artescaLight}>
      <ChartLegendWrapper colorSet={ColorSet}>
        <LineTimeSerieChart
          {...({
            title: 'Test Chart',
            yAxisType: 'default',
            series: TestSeries,
            height: 400,
            startingTimeStamp: TestSeries[0].data[0][0],
            interval: TestSeries[0].data[1][0] - TestSeries[0].data[0][0],
            duration:
              TestSeries[0].data[TestSeries[0].data.length - 1][0] -
              TestSeries[0].data[0][0],
            unitRange: [{ label: 'units', value: 1 }],
            ...props,
          } as LineChartProps)}
        />
      </ChartLegendWrapper>
    </ThemeProvider>,
  );
};

describe('LineTimeSerieChart', () => {
  it('should render when with basic parameters', async () => {
    const { container } = renderLineTimeSerieChart();
    expect(container).toBeInTheDocument();
  });

  it('should render when no unitRange is provided', async () => {
    const { container } = renderLineTimeSerieChart({ unitRange: undefined });
    expect(container).toBeInTheDocument();
  });
});
