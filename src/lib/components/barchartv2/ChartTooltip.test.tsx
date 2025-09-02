import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChartTooltip } from './ChartTooltip';

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

describe('ChartTooltip', () => {
  const selectors = {
    tooltip: () => screen.queryByText(/Test Tooltip/),
    category: () => screen.queryByText(/Test/),
    success: () => screen.queryByText(/Success/),
    successValue: () => screen.queryByText(SUCCESS_VALUE),
    failed: () => screen.queryByText(/Failed/),
    failedValue: () => screen.queryByText(FAILED_VALUE),
    date: () => screen.queryByText(/Monday, 1 July 2024/),
    time: () => screen.queryByText(/00:00/),
  };
  it('should render the ChartTooltip component', () => {
    render(
      <ChartTooltip
        type={{ type: 'category' }}
        tooltipProps={testTooltipProps}
        hoveredValue="Success"
        tooltip={undefined}
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
      <ChartTooltip
        type={{ type: 'category' }}
        tooltipProps={testTooltipProps}
        hoveredValue="Success"
        tooltip={testTooltip}
      />,
    );
    expect(selectors.tooltip()).toBeInTheDocument();
  });
  it('should not render tooltip when tooltipProps is not active', () => {
    render(
      <ChartTooltip
        type={{ type: 'category' }}
        tooltipProps={{ ...testTooltipProps, active: false }}
        hoveredValue="Success"
        tooltip={testTooltip}
      />,
    );
    expect(selectors.tooltip()).not.toBeInTheDocument();
  });
  it('should render time tooltip when type is time', () => {
    // timestamp for Mon Jul 01 2024 00:00:00 GMT+0000 (Coordinated Universal Time)
    const label = date;
    render(
      <ChartTooltip
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
      />,
    );

    expect(selectors.success()).toBeInTheDocument();
    expect(selectors.successValue()).toBeInTheDocument();
    expect(selectors.failed()).toBeInTheDocument();
    expect(selectors.failedValue()).toBeInTheDocument();

    expect(selectors.date()).toBeInTheDocument();
    expect(selectors.time()).not.toBeInTheDocument();
  });
  it('should render time tooltip when type is time and interval is one hour', () => {
    const label = date;
    render(
      <ChartTooltip
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
      />,
    );
    expect(selectors.success()).toBeInTheDocument();
    expect(selectors.successValue()).toBeInTheDocument();
    expect(selectors.failed()).toBeInTheDocument();
    expect(selectors.failedValue()).toBeInTheDocument();
    expect(selectors.date()).toBeInTheDocument();
    expect(selectors.time()).toBeInTheDocument();
  });
});
