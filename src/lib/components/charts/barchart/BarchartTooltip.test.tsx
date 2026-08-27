import React from 'react';
import { render, screen } from '@testing-library/react';
import { BarchartTooltip } from './BarchartTooltip';

const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
const ONE_HOUR_IN_MILLISECONDS = 60 * 60 * 1000;
const SUCCESS_VALUE = 39;
const FAILED_VALUE = 13;
const testTooltipProps = {
  payload: [
    { name: 'Success', value: SUCCESS_VALUE },
    { name: 'Failed', value: FAILED_VALUE },
  ],
  label: 'Test',
  coordinate: { x: 10, y: 10 },
  active: true,
  accessibilityLayer: false,
};
const testTooltip = () => <div>Test Tooltip</div>;
const date = new Date('2024-07-01T00:00:00').getTime();

// Create a mock DOM element for the chart container
const mockChartContainer = document.createElement('div');
mockChartContainer.getBoundingClientRect = jest.fn(() => ({
  width: 800,
  height: 400,
  top: 0,
  left: 0,
  right: 800,
  bottom: 400,
  x: 0,
  y: 0,
  toJSON: () => ({
    width: 800,
    height: 400,
    top: 0,
    left: 0,
    right: 800,
    bottom: 400,
    x: 0,
    y: 0,
  }),
}));
const mockChartContainerRef = { current: mockChartContainer };

describe('ChartTooltip', () => {
  const selectors = {
    tooltip: () => screen.queryByText(/Test Tooltip/),
    category: () => screen.queryByText(/Test/),
    success: () => screen.queryByText(/Success/),
    successValue: () => screen.queryByText(SUCCESS_VALUE),
    failed: () => screen.queryByText(/Failed/),
    failedValue: () => screen.queryByText(FAILED_VALUE),
    longDate: () => screen.queryByText(/01 July 2024/),
    date: () => screen.queryByText(/\b01 Jul\b/),
    time: () => screen.queryByText(/00:00:00/),
    dateTime: () => screen.queryByText(/01 Jul 00:00:00/),
  };
  it('should render the BarchartTooltip component', () => {
    render(
      <BarchartTooltip
        type={{ type: 'category' }}
        tooltipProps={testTooltipProps}
        hoveredValue="Success"
        tooltip={undefined}
        chartContainerRef={mockChartContainerRef}
      />,
    );
    expect(selectors.category()).toBeInTheDocument();
    expect(selectors.success()).toBeInTheDocument();
    expect(selectors.successValue()).toBeInTheDocument();
    expect(selectors.failed()).toBeInTheDocument();
    expect(selectors.failedValue()).toBeInTheDocument();
  });
  it('should render tooltip when tooltip is provided', () => {
    render(
      <BarchartTooltip
        type={{ type: 'category' }}
        tooltipProps={testTooltipProps}
        hoveredValue="Success"
        tooltip={testTooltip}
        chartContainerRef={mockChartContainerRef}
      />,
    );
    expect(selectors.tooltip()).toBeInTheDocument();
  });
  it('should not render tooltip when tooltipProps is not active', () => {
    render(
      <BarchartTooltip
        type={{ type: 'category' }}
        tooltipProps={{ ...testTooltipProps, active: false }}
        hoveredValue="Success"
        tooltip={testTooltip}
        chartContainerRef={mockChartContainerRef}
      />,
    );
    expect(selectors.tooltip()).not.toBeInTheDocument();
  });
  it('should render time tooltip when type is time', () => {
    // timestamp for Mon Jul 01 2024 00:00:00 GMT+0000 (Coordinated Universal Time)
    const label = date;
    render(
      <BarchartTooltip
        type={{
          type: 'time',
          timeRange: {
            startDate: new Date(),
            endDate: new Date(),
            interval: ONE_DAY_IN_MILLISECONDS,
          },
        }}
        tooltipProps={{ ...testTooltipProps, label }}
        hoveredValue="Success"
        chartContainerRef={mockChartContainerRef}
      />,
    );
    expect(selectors.success()).toBeInTheDocument();
    expect(selectors.successValue()).toBeInTheDocument();
    expect(selectors.failed()).toBeInTheDocument();
    expect(selectors.failedValue()).toBeInTheDocument();

    expect(selectors.dateTime()).toBeInTheDocument();
  });
  it('should render time tooltip when type is time and interval is one hour', () => {
    const label = date;
    render(
      <BarchartTooltip
        type={{
          type: 'time',
          timeRange: {
            startDate: new Date(),
            endDate: new Date(),
            interval: ONE_HOUR_IN_MILLISECONDS,
          },
        }}
        tooltipProps={{ ...testTooltipProps, label }}
        hoveredValue="Success"
        chartContainerRef={mockChartContainerRef}
      />,
    );
    expect(selectors.success()).toBeInTheDocument();
    expect(selectors.successValue()).toBeInTheDocument();
    expect(selectors.failed()).toBeInTheDocument();
    expect(selectors.failedValue()).toBeInTheDocument();
    expect(selectors.date()).toBeInTheDocument();
    expect(selectors.longDate()).not.toBeInTheDocument();
    expect(selectors.time()).toBeInTheDocument();
  });
  it('should render with correctly formatted values when unitLabel is provided', () => {
    const FREE_VALUE = 123.456789;
    const USED_VALUE = 20;
    const tooltipProps = {
      ...testTooltipProps,
      payload: [
        { name: 'Free', value: FREE_VALUE },
        { name: 'Used', value: USED_VALUE },
      ],
    };
    render(
      <BarchartTooltip
        type={{ type: 'category' }}
        tooltipProps={tooltipProps}
        hoveredValue="Success"
        unitLabel="kB"
        chartContainerRef={mockChartContainerRef}
      />,
    );

    expect(screen.getByText('123.46 kB')).toBeInTheDocument();
    expect(screen.getByText('20 kB')).toBeInTheDocument();
  });
});

describe('BarchartTooltip on a logarithmic axis', () => {
  it('reports a bar drawn at the reserved zero band as the 0 it is', () => {
    // 0.1 is where getLogAxis put the band; the bar is drawn there, and the
    // tooltip must not report the position as if it were the measurement.
    render(
      <BarchartTooltip
        type={{ type: 'category' }}
        tooltipProps={{
          ...testTooltipProps,
          payload: [
            { name: 'Success', value: 0.1 },
            { name: 'Failed', value: 42 },
          ],
        }}
        hoveredValue={undefined}
        logZeroValue={0.1}
        chartContainerRef={mockChartContainerRef}
      />,
    );

    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.queryByText('0.1')).not.toBeInTheDocument();
    // Every other value is untouched.
    expect(screen.getByText(/42/)).toBeInTheDocument();
  });

  it('leaves the value alone with no band in play', () => {
    render(
      <BarchartTooltip
        type={{ type: 'category' }}
        tooltipProps={{
          ...testTooltipProps,
          payload: [{ name: 'Success', value: 0.1 }],
        }}
        hoveredValue={undefined}
        chartContainerRef={mockChartContainerRef}
      />,
    );

    expect(screen.getByText('0.1')).toBeInTheDocument();
  });
});
