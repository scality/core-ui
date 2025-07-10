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
      // 7 days ago - aligned to the exact timestamp that generateTimestamps will create
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
            startTimestamp:
              new Date(Date.now()).setHours(0, 0, 0, 0) -
              7 * 24 * 60 * 60 * 1000,
            endTimestamp:
              new Date(Date.now()).setHours(0, 0, 0, 0) -
              1 * 24 * 60 * 60 * 1000,
            interval: 24 * 60 * 60 * 1000,
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
              startTimestamp:
                new Date(Date.now()).setHours(0, 0, 0, 0) -
                7 * 24 * 60 * 60 * 1000,
              endTimestamp:
                new Date(Date.now()).setHours(0, 0, 0, 0) -
                1 * 24 * 60 * 60 * 1000,
              interval: 24 * 60 * 60 * 1000,
            },
          }}
          bars={timeData7Days}
        />
      </div>
    );
  },
};
const timeData7DaysWithMissingData: BarchartProps['bars'] = [
  {
    label: 'Success',
    data: [
      // 7 days ago
      [Date.now() - 7 * 24 * 60 * 60 * 1000 + 12, 15],
      // 6 days ago
      // 5 days ago
      [Date.now() - 5 * 24 * 60 * 60 * 1000, 30],
      // 4 days ago
      [Date.now() - 4 * 24 * 60 * 60 * 1000, 20],
      // 3 days ago
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
      // 5 days ago
      [Date.now() - 5 * 24 * 60 * 60 * 1000, 1],
      // 4 days ago
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

export const Time7DaysWithMissingData: Story = {
  render: () => {
    return (
      <Barchart
        type={{
          type: 'time',
          timeRange: {
            startTimestamp:
              new Date(Date.now()).setHours(0, 0, 0, 0) -
              7 * 24 * 60 * 60 * 1000,
            endTimestamp:
              new Date(Date.now()).setHours(0, 0, 0, 0) -
              1 * 24 * 60 * 60 * 1000,
            interval: 24 * 60 * 60 * 1000,
          },
        }}
        bars={timeData7DaysWithMissingData}
      />
    );
  },
};

const timeDataLast24Hours: BarchartProps['bars'] = [
  {
    label: 'Success',
    data: [
      [Date.now() - 24 * 60 * 60 * 1000, 15],
      [Date.now() - 23 * 60 * 60 * 1000, 12],
      [Date.now() - 22 * 60 * 60 * 1000, 30],
      [Date.now() - 21 * 60 * 60 * 1000, 20],
      [Date.now() - 20 * 60 * 60 * 1000, 25],
      [Date.now() - 19 * 60 * 60 * 1000, 18],
      [Date.now() - 18 * 60 * 60 * 1000, 32],
      [Date.now() - 17 * 60 * 60 * 1000, 19],
      [Date.now() - 16 * 60 * 60 * 1000, 10],
      [Date.now() - 15 * 60 * 60 * 1000, 11],
      [Date.now() - 14 * 60 * 60 * 1000, 12],
      [Date.now() - 13 * 60 * 60 * 1000, 13],
      [Date.now() - 12 * 60 * 60 * 1000, 11],
      [Date.now() - 11 * 60 * 60 * 1000, 17],
      [Date.now() - 10 * 60 * 60 * 1000, 16],
      [Date.now() - 9 * 60 * 60 * 1000, 13],
      [Date.now() - 8 * 60 * 60 * 1000, 15],
      [Date.now() - 7 * 60 * 60 * 1000, 16],
      [Date.now() - 6 * 60 * 60 * 1000, 17],
      [Date.now() - 5 * 60 * 60 * 1000, 18],
      [Date.now() - 4 * 60 * 60 * 1000, 19],
      [Date.now() - 3 * 60 * 60 * 1000, 20],
      [Date.now() - 2 * 60 * 60 * 1000, 21],
      [Date.now() - 1 * 60 * 60 * 1000, 22],
    ],
    color: 'green',
  },
  {
    label: 'Failed',
    data: [
      [Date.now() - 24 * 60 * 60 * 1000, 5],
      [Date.now() - 23 * 60 * 60 * 1000, 8],
      [Date.now() - 22 * 60 * 60 * 1000, 2],
      [Date.now() - 21 * 60 * 60 * 1000, 12],
      [Date.now() - 20 * 60 * 60 * 1000, 6],
      [Date.now() - 19 * 60 * 60 * 1000, 9],
      [Date.now() - 18 * 60 * 60 * 1000, 7],
      [Date.now() - 17 * 60 * 60 * 1000, 1],
      [Date.now() - 16 * 60 * 60 * 1000, 1],
      [Date.now() - 15 * 60 * 60 * 1000, 2],
      [Date.now() - 14 * 60 * 60 * 1000, 4],
      [Date.now() - 13 * 60 * 60 * 1000, 2],
      [Date.now() - 12 * 60 * 60 * 1000, 3],
      [Date.now() - 11 * 60 * 60 * 1000, 1],
      [Date.now() - 10 * 60 * 60 * 1000, 1],
      [Date.now() - 9 * 60 * 60 * 1000, 1],
      [Date.now() - 8 * 60 * 60 * 1000, 1],
      [Date.now() - 7 * 60 * 60 * 1000, 1],
      [Date.now() - 6 * 60 * 60 * 1000, 1],
      [Date.now() - 5 * 60 * 60 * 1000, 1],
      [Date.now() - 4 * 60 * 60 * 1000, 5],
      [Date.now() - 3 * 60 * 60 * 1000, 3],
      [Date.now() - 2 * 60 * 60 * 1000, 2],
      [Date.now() - 1 * 60 * 60 * 1000, 1],
    ],
    color: 'red',
  },
];

export const TimeLast24Hours: Story = {
  render: () => {
    return (
      <Barchart
        type={{
          type: 'time',
          timeRange: {
            startTimestamp:
              new Date(Date.now()).setMinutes(0, 0, 0) - 24 * 60 * 60 * 1000,
            endTimestamp: new Date(Date.now()).setMinutes(0, 0, 0),
            interval: 60 * 60 * 1000,
          },
        }}
        bars={timeDataLast24Hours}
      />
    );
  },
};

const capacityData: BarchartProps['bars'] = [
  {
    label: 'Free',
    data: [
      ['category1', 2000000],
      ['category2', 4000000],
      ['category3', 6000000],
    ],
    color: 'blue',
  },
  {
    label: 'Used',
    data: [
      ['category1', 8000000],
      ['category2', 10000000],
      ['category3', 12000000],
    ],
    color: 'lightblue',
  },
];

const categoryDataWithMissingData: BarchartProps['bars'] = [
  {
    label: 'Free',
    data: [
      ['category1', 20],
      ['category2', 40],
      ['category4', 80],
    ],
    color: 'blue',
  },
  {
    label: 'Used',
    data: [
      ['category1', 80],
      ['category2', 100],
      ['category3', 120],
      ['category4', 120],
    ],
    color: 'lightblue',
  },
];

export const CategoryWithMissingData: Story = {
  render: () => {
    return <Barchart type="category" bars={categoryDataWithMissingData} />;
  },
};
const capacityDataWithUnitRange: BarchartProps['bars'] = [
  {
    label: 'Free',
    data: [
      ['category1', 2000000],
      ['category2', 4000000],
      ['category3', 6000000],
    ],
    color: 'blue',
  },
  {
    label: 'Used',
    data: [
      ['category1', 8000000],
      ['category2', 10000000],
      ['category3', 12000000],
    ],
    color: 'lightblue',
  },
];

export const CapacityWithUnitRange: Story = {
  render: () => {
    return (
      <Barchart
        type="category"
        bars={capacityDataWithUnitRange}
        unitRange={[
          {
            threshold: 0,
            label: 'B',
          },
          {
            threshold: 1024,
            label: 'KiB',
          },
          {
            threshold: 1024 * 1024,
            label: 'MiB',
          },
          {
            threshold: 1024 * 1024 * 1024,
            label: 'GiB',
          },
        ]}
      />
    );
  },
};

const testUnitRange: BarchartProps['unitRange'] = [
  {
    threshold: 1000,
    label: 'kB',
  },
  {
    threshold: 0,
    label: 'B',
  },
];
const testBars: BarchartProps['bars'] = [
  {
    label: 'Success',
    data: [
      ['category1', 500],
      ['category2', 560],
      ['category3', 640],
    ],
    color: 'green',
  },
];

export const CategoryWithUnitRange: Story = {
  render: () => {
    return (
      <Barchart type="category" bars={testBars} unitRange={testUnitRange} />
    );
  },
};

const stackedData: BarchartProps['bars'] = [
  {
    label: 'Success',
    data: [
      ['category1', 20],
      ['category2', 24],
      ['category3', 26],
    ],
    color: 'blue',
  },
  {
    label: 'Failed',
    data: [
      ['category1', 8],
      ['category2', 10],
      ['category3', 25],
    ],
    color: 'lightblue',
  },
];

export const Stacked: Story = {
  render: () => {
    return <Barchart type="category" bars={stackedData} stacked />;
  },
};
