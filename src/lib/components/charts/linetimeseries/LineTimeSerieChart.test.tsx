import { render } from '@testing-library/react';
import React from 'react';
import { LineChartProps, LineTimeSerieChart } from './LineTimeSerieChart';
import { ChartLegendWrapper } from '../legend/ChartLegendWrapper';
import { ThemeProvider } from 'styled-components';
import { coreUIAvailableThemes } from '../../../style/theme';

// ResponsiveContainer measures its parent, which has no size in jsdom, so the
// chart would render an empty SVG. Give it a fixed box — the same trick
// Barchart.test.tsx uses — so the axes exist and their ticks can be asserted.
jest.mock('recharts', () => {
  const actual = jest.requireActual('recharts');

  return {
    ...actual,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <actual.ResponsiveContainer aspect={3} height={300}>
        {children}
      </actual.ResponsiveContainer>
    ),
  };
});

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


describe('LineTimeSerieChart logarithmic Y axis', () => {
  /**
   * The Y-axis tick labels, whitespace stripped: formatISONumber groups
   * thousands with a non-breaking space, which is not what a test wants to pin
   * down.
   */
  const yAxisTicks = (container: HTMLElement) =>
    Array.from(
      container.querySelectorAll('.recharts-yAxis-tick-labels text'),
    ).map((tick) => (tick.textContent ?? '').replace(/\s/g, ''));

  // Two decades apart, with a zero sample a log axis has no place for.
  const SpanningSeries = [
    {
      resource: 'Series 1',
      getTooltipLabel: () => 'Series 1',
      data: [
        [1622505600, 4],
        [1622509200, 0],
        [1622512800, 700],
      ] as [number, number][],
    },
  ];

  const renderChart = (props: Record<string, unknown>) =>
    render(
      <ThemeProvider theme={coreUIAvailableThemes.artescaLight}>
        <ChartLegendWrapper colorSet={{ 'Series 1': '#FF0000' }}>
          <LineTimeSerieChart
            {...({
              title: 'Test Chart',
              series: SpanningSeries,
              height: 400,
              startingTimeStamp: 1622505600,
              interval: 3600,
              duration: 7200,
              ...props,
            } as LineChartProps)}
          />
        </ChartLegendWrapper>
      </ThemeProvider>,
    );

  it('labels the axis with the decades enclosing the data, plus a zero', () => {
    const { container } = renderChart({ yAxisScale: 'log' });

    // 4..700 gives a 1..1000 scale — a log axis cannot start at zero — and the
    // series holds a zero sample, so the axis reserves a slot below it for one.
    expect(yAxisTicks(container)).toEqual(['0', '1', '10', '100', '1000']);
  });

  it('reserves no zero slot when the series has none', () => {
    const { container } = renderChart({
      yAxisScale: 'log',
      series: [
        {
          resource: 'Series 1',
          getTooltipLabel: () => 'Series 1',
          data: [
            [1622505600, 4],
            [1622509200, 40],
            [1622512800, 700],
          ] as [number, number][],
        },
      ],
    });

    expect(yAxisTicks(container)).toEqual(['1', '10', '100', '1000']);
  });

  it('keeps the linear ticks when no scale is asked for', () => {
    const { container } = renderChart({});

    // A linear axis starts at zero and tops out at the data, not at a decade.
    expect(yAxisTicks(container)[0]).toBe('0');
    expect(yAxisTicks(container)).not.toContain('1000');
  });

  it('ignores the scale on a symmetrical chart, whose axis goes negative', () => {
    // The prop type forbids this pairing; the cast is a plain-JS caller
    // reaching past it.
    const { container } = renderChart({
      yAxisType: 'symmetrical',
      yAxisScale: 'log',
      series: { above: SpanningSeries, below: [] },
    });

    // A negative tick is proof the axis stayed linear.
    expect(yAxisTicks(container).some((tick) => tick.startsWith('-'))).toBe(true);
  });
});

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
