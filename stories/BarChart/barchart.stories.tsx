import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Barchart, {
  BarchartProps,
} from '../../src/lib/components/barchartv2/Barchart.component';

import { Wrapper } from '../common';

type Story = StoryObj<typeof Barchart>;

const meta: Meta<typeof Barchart> = {
  title: 'Components/Data Display/Charts/Barchartv2',
  component: Barchart,
  decorators: [
    (story) => (
      <Wrapper style={{ height: '100vh', width: '100vw' }}>{story()}</Wrapper>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

const exampleData: BarchartProps['bars'] = [
  {
    label: 'Success',
    data: [
      ['category1', 2],
      ['category2', 4],
      ['category3', 6],
    ],
    color: 'green',
  },
  {
    label: 'Failed',
    data: [
      ['category1', 8],
      ['category2', 10],
      ['category3', 12],
    ],
    color: 'red',
  },
];

export const Playground: Story = {
  render: () => {
    return <Barchart type="category" bars={exampleData} />;
  },
};

const timeData7Days: BarchartProps['bars'] = [
  {
    label: 'Success',
    data: [
      // 7 days ago
      [Date.now() - 7 * 24 * 60 * 60 * 1000, 15],
      // 6 days ago
      [Date.now() - 6 * 24 * 60 * 60 * 1000, 12],
      // 5 days ago
      [Date.now() - 5 * 24 * 60 * 60 * 1000, 30],
      // 4 days ago
      [Date.now() - 4 * 24 * 60 * 60 * 1000, 20],
      // 3 days ago
      [Date.now() - 3 * 24 * 60 * 60 * 1000, 25],
      // 2 days ago
      [Date.now() - 2 * 24 * 60 * 60 * 1000, 18],
      // 1 day ago
      [Date.now() - 1 * 24 * 60 * 60 * 1000, 32],
    ],
    color: 'green',
  },
  {
    label: 'Failed',
    data: [
      // 7 days ago
      [Date.now() - 7 * 24 * 60 * 60 * 1000, 5],
      // 6 days ago
      [Date.now() - 6 * 24 * 60 * 60 * 1000, 8],
      // 5 days ago
      [Date.now() - 5 * 24 * 60 * 60 * 1000, 2],
      // 4 days ago
      [Date.now() - 4 * 24 * 60 * 60 * 1000, 12],
      // 3 days ago
      [Date.now() - 3 * 24 * 60 * 60 * 1000, 6],
      // 2 days ago
      [Date.now() - 2 * 24 * 60 * 60 * 1000, 9],
      // 1 day ago
      [Date.now() - 1 * 24 * 60 * 60 * 1000, 7],
    ],
    color: 'red',
  },
];

export const Time7Days: Story = {
  render: () => {
    return (
      <Barchart
        type={{
          type: 'time',
          timeRange: {
            startTimestamp: Date.now() - 7 * 24 * 60 * 60 * 1000,
            endTimestamp: Date.now() - 1 * 24 * 60 * 60 * 1000,
          },
        }}
        bars={timeData7Days}
      />
    );
  },
};

export const Time7DaysSmallWidth: Story = {
  render: () => {
    return (
      <div style={{ width: '300px' }}>
        <Barchart
          type={{
            type: 'time',
            timeRange: {
              startTimestamp: Date.now() - 7 * 24 * 60 * 60 * 1000,
              endTimestamp: Date.now() - 1 * 24 * 60 * 60 * 1000,
            },
          }}
          bars={timeData7Days}
        />
      </div>
    );
  },
};
