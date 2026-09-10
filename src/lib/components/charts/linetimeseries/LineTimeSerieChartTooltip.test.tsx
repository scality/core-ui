import React from 'react';
import { render, screen } from '@testing-library/react';
import { LineTimeSerieChartTooltip } from './LineTimeSerieChartTooltip';

const CHART_ID = 'test-chart';

// The tooltip only renders for the chart the pointer is actually over, which is
// tracked module-side rather than in props.
jest.mock('./useChartHover', () => ({
  getCurrentlyHoveredChartId: () => 'test-chart',
}));

const mockChartContainer = document.createElement('div');
const mockChartContainerRef = { current: mockChartContainer };

const testTooltipProps = {
  payload: [
    { name: 'storage-node-1', value: 42, color: '#fff' },
    { name: 'storage-node-2', value: 7, color: '#000' },
  ],
  label: new Date('2024-07-01T00:00:00').getTime(),
  coordinate: { x: 10, y: 10 },
  active: true,
  accessibilityLayer: false,
};

const renderTooltip = (
  props: Partial<
    React.ComponentProps<typeof LineTimeSerieChartTooltip>
  > = {},
) =>
  render(
    <LineTimeSerieChartTooltip
      tooltipProps={testTooltipProps}
      duration={0}
      chartContainerRef={mockChartContainerRef}
      chartId={CHART_ID}
      {...props}
    />,
  );

describe('LineTimeSerieChartTooltip', () => {
  it('should render a series and its value', () => {
    renderTooltip();

    expect(screen.getByText('storage-node-1')).toBeInTheDocument();
    expect(screen.getByText('42.00')).toBeInTheDocument();
  });

  it('should hand the payload to a custom renderer', () => {
    renderTooltip({
      renderTooltip: (props) => (
        <div>{props.payload?.map((entry) => entry.value).join(' / ')}</div>
      ),
    });

    expect(screen.getByText('42 / 7')).toBeInTheDocument();
  });
});

describe('LineTimeSerieChartTooltip on a logarithmic axis', () => {
  // 0.001 is where getLogAxis put the reserved band: a measured zero is drawn
  // there because zero has no place on a log scale.
  const AT_THE_BAND = {
    ...testTooltipProps,
    payload: [
      { name: 'storage-node-1', value: 0.001, color: '#fff' },
      { name: 'storage-node-2', value: 7, color: '#000' },
    ],
  };

  it('should report a sample drawn at the reserved band as the 0 it is', () => {
    renderTooltip({ tooltipProps: AT_THE_BAND, logZeroValue: 0.001 });

    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.queryByText('0.001')).not.toBeInTheDocument();
    // Every other value is untouched.
    expect(screen.getByText('7.00')).toBeInTheDocument();
  });

  it('should report that same 0 to a custom renderer', () => {
    renderTooltip({
      tooltipProps: AT_THE_BAND,
      logZeroValue: 0.001,
      renderTooltip: (props) => (
        <div>{props.payload?.map((entry) => entry.value).join(' / ')}</div>
      ),
    });

    // Not '0.001 / 7' — a caller reading the band position would report the
    // axis's placement as if the metric had measured it.
    expect(screen.getByText('0 / 7')).toBeInTheDocument();
  });

  it('should leave the payload alone with no band in play', () => {
    renderTooltip({
      tooltipProps: AT_THE_BAND,
      renderTooltip: (props) => (
        <div>{props.payload?.map((entry) => entry.value).join(' / ')}</div>
      ),
    });

    expect(screen.getByText('0.001 / 7')).toBeInTheDocument();
  });
});
