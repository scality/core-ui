import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import {
  Barchart,
  BarchartProps,
  BarchartSortFn,
  BarchartTooltipFn,
} from '../../src/lib/components/barchartv2/Barchart.component';
import { Button } from '../../src/lib/components/buttonv2/Buttonv2.component';
import { Text } from '../../src/lib/components/text/Text.component';
import { spacing, Stack, Wrap } from '../../src/lib/spacing';
import {
  CoreUITheme,
  lineColor1,
  lineColor2,
  lineColor3,
} from '../../src/lib/style/theme';
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

export const Playground: Story = {
  render: () => {
    const theme = useTheme() as CoreUITheme;
    const exampleData = [
      {
        label: 'Success',
        data: [
          ['category1', 2],
          ['category2', 4],
          ['category3', 6],
        ],
      },
      {
        label: 'Failed',
        data: [
          ['category1', 8],
          ['category2', 10],
          ['category3', 12],
        ],
      },
    ] as const;
    return (
      <Barchart
        type="category"
        bars={exampleData}
        colorSet={{
          Success: theme.statusHealthy,
          Failed: theme.statusCritical,
        }}
      />
    );
  },
};

const timeData7Days = [
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
  },
] as const;

export const Time7Days: Story = {
  render: () => {
    const theme = useTheme() as CoreUITheme;
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
        colorSet={{
          Success: theme.statusHealthy,
          Failed: theme.statusCritical,
        }}
      />
    );
  },
};

const timeData7DaysWithMissingData = [
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
  },
] as const;

export const Time7DaysWithMissingData: Story = {
  render: () => {
    const theme = useTheme() as CoreUITheme;
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
        colorSet={{
          Success: theme.statusHealthy,
          Failed: theme.statusCritical,
        }}
      />
    );
  },
};

const timeDataLast24Hours = [
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
  },
] as const;

export const TimeLast24Hours: Story = {
  render: () => {
    const theme = useTheme() as CoreUITheme;
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
        colorSet={{
          Success: theme.statusHealthy,
          Failed: theme.statusCritical,
        }}
      />
    );
  },
};

const capacityDataWithUnitRange = [
  {
    label: 'Free',
    data: [
      ['category1', 2000000],
      ['category2', 4000000],
      ['category3', 6000000],
    ],
  },
  {
    label: 'Used',
    data: [
      ['category1', 8000000],
      ['category2', 10000000],
      ['category3', 12000000],
    ],
  },
] as const;

export const CapacityWithUnitRange: Story = {
  render: () => {
    const theme = useTheme() as CoreUITheme;
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
        colorSet={{
          Free: theme.selectedActive,
          Used: theme.infoSecondary,
        }}
      />
    );
  },
};

const stackedData: BarchartProps<
  {
    label: 'Success' | 'Failed';
    data: [string, number][];
  }[]
>['bars'] = [
  {
    label: 'Success',
    data: [
      ['category1', 25],
      ['category2', 72],
      ['category3', 52],
    ],
  },
  {
    label: 'Failed',
    data: [
      ['category1', 8],
      ['category2', 10],
      ['category3', 25],
    ],
  },
];

export const Stacked: Story = {
  render: () => {
    const theme = useTheme() as CoreUITheme;
    return (
      <Barchart
        type="category"
        bars={stackedData}
        stacked
        colorSet={{
          Success: theme.statusHealthy,
          Failed: theme.statusCritical,
        }}
      />
    );
  },
};

export const DefaultSort: Story = {
  render: () => {
    const theme = useTheme() as CoreUITheme;
    const defaultSortData = [
      {
        label: 'Success',
        data: [
          ['AZ', 15],
          ['BB', 10],
          ['CC', 25],
          ['DD', 18],
          ['AA', 22],
          ['EE', 15],
        ],
      },
      {
        label: 'Failed',
        data: [
          ['AZ', 8],
          ['BB', 1],
          ['CC', 3],
          ['DD', 1],
          ['AA', 5],
          ['EE', 5],
        ],
      },
    ] as const;
    const customSort: BarchartSortFn<typeof defaultSortData> = (
      pointA,
      pointB,
    ) => {
      const totalA = pointA.Success + pointA.Failed;
      const totalB = pointB.Success + pointB.Failed;
      return totalA - totalB > 0 ? -1 : totalA - totalB < 0 ? 1 : 0; // Descending order
    };
    return (
      <Barchart
        type="category"
        stacked
        bars={defaultSortData}
        defaultSort={customSort}
        colorSet={{
          Success: theme.statusHealthy,
          Failed: theme.statusCritical,
        }}
      />
    );
  },
};

export const WithCustomTooltip: Story = {
  render: () => {
    const theme = useTheme() as CoreUITheme;
    const exampleData = [
      {
        label: 'Success',
        data: [
          ['category1', 2],
          ['category2', 4],
          ['category3', 6],
        ],
      },
      {
        label: 'Failed',
        data: [
          ['category1', 8],
          ['category2', 10],
          ['category3', 12],
        ],
      },
    ] as const;
    const customTooltip: BarchartTooltipFn<typeof exampleData> = (pointA) => {
      return (
        <Stack
          direction="vertical"
          gap="r4"
          style={{
            width: '150px',
            backgroundColor: 'black',
            padding: '10px',
            borderRadius: '10px',
            color: 'white',
          }}
        >
          <Text style={{ textAlign: 'center', color: 'white' }}>
            {pointA.category}
          </Text>
          {pointA.values.map((point) => (
            <Text
              key={point.label}
              isEmphazed={point.isHovered}
              style={{
                color: point.isHovered ? 'yellow' : 'white',
              }}
            >
              <Wrap>
                <span>{point.label}:</span>
                <span>{point.value}</span>
              </Wrap>
            </Text>
          ))}
        </Stack>
      );
    };
    return (
      <Stack direction="vertical" gap="r16">
        <Text variant="Large">External Tooltip & Sort Functions</Text>
        <Text variant="Basic" color="textSecondary">
          Tooltip and sort functions defined outside with full type safety
        </Text>
        <Barchart
          type="category"
          bars={exampleData}
          tooltip={customTooltip}
          height={300}
          colorSet={{
            Success: theme.statusHealthy,
            Failed: theme.statusCritical,
          }}
        />
      </Stack>
    );
  },
};

const exampleData = [
  {
    label: 'Success',
    data: [
      ['category1', 1000000],
      ['category2', 2000000],
      ['category3', 3000000],
    ],
  },
  {
    label: 'Failed',
    data: [
      ['category1', 1000000],
      ['category2', 2000000],
      ['category3', 3000000],
    ],
  },
] as const;

export const StatusColors: Story = {
  render: () => {
    const theme = useTheme() as CoreUITheme;
    const statusData = [
      {
        label: 'Success Rate',
        data: [
          ['API', 95],
          ['Database', 87],
          ['Queue', 92],
        ],
      },
      {
        label: 'Failed Requests',
        data: [
          ['API', 5],
          ['Database', 13],
          ['Queue', 8],
        ],
      },
      {
        label: 'Warning Events',
        data: [
          ['API', 2],
          ['Database', 4],
          ['Queue', 1],
        ],
      },
    ] as const;
    return (
      <Barchart
        type="category"
        bars={statusData}
        stacked
        colorSet={{
          'Success Rate': theme.statusHealthy,
          'Failed Requests': theme.statusCritical,
          'Warning Events': theme.statusWarning,
        }}
        title="System Health Metrics"
      />
    );
  },
};

export const CompleteExample: Story = {
  render: () => {
    const theme = useTheme() as CoreUITheme;
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<
      BarchartProps<typeof data>['bars'] | undefined
    >(undefined);
    const customTooltip: BarchartTooltipFn<typeof data> = (pointA) => {
      return (
        <Stack
          direction="vertical"
          gap="r4"
          style={{
            width: '150px',
            backgroundColor: 'black',
            padding: '10px',
            borderRadius: '10px',
            color: 'white',
          }}
        >
          <Text style={{ textAlign: 'center', color: 'white' }}>
            {pointA.category}
          </Text>
          {pointA.values.map((point) => (
            <Text
              key={point.label}
              isEmphazed={point.isHovered}
              style={{
                fontWeight: point.isHovered ? 'bold' : 'normal',
              }}
            >
              <Wrap>
                <span>{point.label}:</span>
                <span>{point.value}</span>
              </Wrap>
            </Text>
          ))}
        </Stack>
      );
    };
    return (
      <div
        style={{
          width: '50%',
          padding: spacing.r16,
          borderRadius: spacing.r8,
          backgroundColor: theme.backgroundLevel2,
        }}
      >
        <Barchart
          type="category"
          title="Loading BarChart"
          helpTooltip="Click on the button to load or unload data"
          secondaryTitle={isLoading ? 'Loading...' : 'Loaded data'}
          rightTitle={
            <Button
              label={isLoading ? 'Load data' : 'Fake loading data'}
              onClick={() => {
                setIsLoading(!isLoading);
                if (isLoading) {
                  setData(exampleData);
                } else {
                  setData(undefined);
                }
              }}
            />
          }
          bars={data || []}
          tooltip={customTooltip}
          isLoading={isLoading}
          height={200}
          colorSet={{
            Success: 'lineColor1',
            Failed: 'lineColor2',
          }}
        />
      </div>
    );
  },
};
