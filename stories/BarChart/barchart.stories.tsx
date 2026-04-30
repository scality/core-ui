import { Meta, StoryObj } from '@storybook/react-webpack5';
import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import {
  Barchart,
  BarchartProps,
  BarchartSortFn,
  BarchartTooltipFn,
  ChartLegendWrapper,
  ChartLegend,
} from '../../src/lib/components/charts';
import { Button } from '../../src/lib/components/buttonv2/Buttonv2.component';
import { Text } from '../../src/lib/components/text/Text.component';
import { spacing, Stack, Wrap } from '../../src/lib/spacing';
import { CoreUITheme } from '../../src/lib/style/theme';
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
          ['category1', 0.001],
          ['category2', 0.005],
          ['category3', 0.002],
        ],
      },
      {
        label: 'Failed',
        data: [
          ['category1', 0.01],
          ['category2', 0.05],
          ['category3', 0.02],
        ],
      },
    ] as const;
    return (
      <ChartLegendWrapper
        colorSet={{
          Success: theme.statusHealthy,
          Failed: theme.statusCritical,
        }}
        sortOrder="status"
      >
        <Stack direction="vertical" gap="r16">
          <Barchart
            type={{ type: 'category' }}
            bars={exampleData}
            title="Playground"
          />
          <ChartLegend shape="rectangle" direction="horizontal" />
        </Stack>
      </ChartLegendWrapper>
    );
  },
};

const timeData7Days = [
  {
    label: 'Success',
    data: [
      // 7 days ago - aligned to the exact timestamp that generateTimestamps will create
      [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), 15],
      // 6 days ago
      [new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), 12],
      // 5 days ago
      [new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), 30],
      // 4 days ago
      [new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), 20],
      // 3 days ago
      [new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), 25],
      // 2 days ago
      [new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), 18],
      // 1 day ago
      [new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), 32],
    ],
  },
  {
    label: 'Failed',
    data: [
      // 7 days ago
      [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), 5],
      // 6 days ago
      [new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), 8],
      // 5 days ago
      [new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), 2],
      // 4 days ago
      [new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), 12],
      // 3 days ago
      [new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), 6],
      // 2 days ago
      [new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), 9],
      // 1 day ago
      [new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), 7],
    ],
  },
] as const;

export const Time7Days: Story = {
  render: () => {
    const theme = useTheme() as CoreUITheme;
    return (
      <ChartLegendWrapper
        colorSet={{
          Success: theme.statusHealthy,
          Failed: theme.statusCritical,
        }}
        sortOrder="status"
      >
        <Stack direction="vertical" gap="r16">
          <Barchart
            title="Time 7 Days"
            type={{
              type: 'time',
              timeRange: {
                startDate: new Date(
                  new Date(Date.now()).setHours(0, 0, 0, 0) -
                    7 * 24 * 60 * 60 * 1000,
                ),
                endDate: new Date(
                  new Date(Date.now()).setHours(0, 0, 0, 0) -
                    1 * 24 * 60 * 60 * 1000,
                ),
                interval: 24 * 60 * 60 * 1000,
              },
            }}
            bars={timeData7Days}
          />
          <ChartLegend shape="line" />
        </Stack>
      </ChartLegendWrapper>
    );
  },
};

const timeData7DaysWithMissingData = [
  {
    label: 'Success',
    data: [
      // 7 days ago
      [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 12), 15],
      // 5 days ago
      [new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), 30],
      // 4 days ago
      [new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), 20],
      // 3 days ago
      // 2 days ago
      [new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), 18],
      // 1 day ago
      [new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), 32],
    ],
  },
  {
    label: 'Failed',
    data: [
      // 7 days ago
      [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), 5],
      // 6 days ago
      // 5 days ago
      [new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), 1],
      // 4 days ago
      // 3 days ago
      [new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), 6],
      // 2 days ago
      [new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), 9],
      // 1 day ago
      [new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), 7],
    ],
  },
] as const;

export const Time7DaysWithMissingData: Story = {
  render: () => {
    const theme = useTheme() as CoreUITheme;
    return (
      <ChartLegendWrapper
        colorSet={{
          Success: theme.statusHealthy,
          Failed: theme.statusCritical,
        }}
        sortOrder="status"
      >
        <Barchart
          title="Time 7 Days With Missing Data"
          type={{
            type: 'time',
            timeRange: {
              startDate: new Date(
                new Date(Date.now()).setHours(0, 0, 0, 0) -
                  7 * 24 * 60 * 60 * 1000,
              ),
              endDate: new Date(
                new Date(Date.now()).setHours(0, 0, 0, 0) -
                  1 * 24 * 60 * 60 * 1000,
              ),
              interval: 24 * 60 * 60 * 1000,
            },
          }}
          bars={timeData7DaysWithMissingData}
        />
      </ChartLegendWrapper>
    );
  },
};

const timeDataLast24Hours = [
  {
    label: 'Success',
    data: [
      [new Date(Date.now() - 24 * 60 * 60 * 1000), 15],
      [new Date(Date.now() - 23 * 60 * 60 * 1000), 12],
      [new Date(Date.now() - 22 * 60 * 60 * 1000), 30],
      [new Date(Date.now() - 21 * 60 * 60 * 1000), 20],
      [new Date(Date.now() - 20 * 60 * 60 * 1000), 25],
      [new Date(Date.now() - 19 * 60 * 60 * 1000), 18],
      [new Date(Date.now() - 18 * 60 * 60 * 1000), 32],
      [new Date(Date.now() - 17 * 60 * 60 * 1000), 19],
      [new Date(Date.now() - 16 * 60 * 60 * 1000), 10],
      [new Date(Date.now() - 15 * 60 * 60 * 1000), 11],
      [new Date(Date.now() - 14 * 60 * 60 * 1000), 12],
      [new Date(Date.now() - 13 * 60 * 60 * 1000), 13],
      [new Date(Date.now() - 12 * 60 * 60 * 1000), 11],
      [new Date(Date.now() - 11 * 60 * 60 * 1000), 17],
      [new Date(Date.now() - 10 * 60 * 60 * 1000), 16],
      [new Date(Date.now() - 9 * 60 * 60 * 1000), 13],
      [new Date(Date.now() - 8 * 60 * 60 * 1000), 15],
      [new Date(Date.now() - 7 * 60 * 60 * 1000), 16],
      [new Date(Date.now() - 6 * 60 * 60 * 1000), 17],
      [new Date(Date.now() - 5 * 60 * 60 * 1000), 18],
      [new Date(Date.now() - 4 * 60 * 60 * 1000), 19],
      [new Date(Date.now() - 3 * 60 * 60 * 1000), 20],
      [new Date(Date.now() - 2 * 60 * 60 * 1000), 21],
      [new Date(Date.now() - 1 * 60 * 60 * 1000), 22],
    ],
  },
  {
    label: 'Failed',
    data: [
      [new Date(Date.now() - 24 * 60 * 60 * 1000), 5],
      [new Date(Date.now() - 23 * 60 * 60 * 1000), 8],
      [new Date(Date.now() - 22 * 60 * 60 * 1000), 2],
      [new Date(Date.now() - 21 * 60 * 60 * 1000), 12],
      [new Date(Date.now() - 20 * 60 * 60 * 1000), 6],
      [new Date(Date.now() - 19 * 60 * 60 * 1000), 9],
      [new Date(Date.now() - 18 * 60 * 60 * 1000), 7],
      [new Date(Date.now() - 17 * 60 * 60 * 1000), 1],
      [new Date(Date.now() - 16 * 60 * 60 * 1000), 1],
      [new Date(Date.now() - 15 * 60 * 60 * 1000), 2],
      [new Date(Date.now() - 14 * 60 * 60 * 1000), 4],
      [new Date(Date.now() - 13 * 60 * 60 * 1000), 2],
      [new Date(Date.now() - 12 * 60 * 60 * 1000), 3],
      [new Date(Date.now() - 11 * 60 * 60 * 1000), 1],
      [new Date(Date.now() - 10 * 60 * 60 * 1000), 1],
      [new Date(Date.now() - 9 * 60 * 60 * 1000), 1],
      [new Date(Date.now() - 8 * 60 * 60 * 1000), 1],
      [new Date(Date.now() - 7 * 60 * 60 * 1000), 1],
      [new Date(Date.now() - 6 * 60 * 60 * 1000), 1],
      [new Date(Date.now() - 5 * 60 * 60 * 1000), 1],
      [new Date(Date.now() - 4 * 60 * 60 * 1000), 5],
      [new Date(Date.now() - 3 * 60 * 60 * 1000), 3],
      [new Date(Date.now() - 2 * 60 * 60 * 1000), 2],
      [new Date(Date.now() - 1 * 60 * 60 * 1000), 1],
    ],
  },
] as const;

export const TimeLast24Hours: Story = {
  render: () => {
    const theme = useTheme() as CoreUITheme;
    return (
      <ChartLegendWrapper
        colorSet={{
          Success: theme.statusHealthy,
          Failed: theme.statusCritical,
        }}
      >
        <Barchart
          title="Time Last 24 Hours"
          type={{
            type: 'time',
            timeRange: {
              startDate: new Date(
                new Date(Date.now()).setMinutes(0, 0, 0) - 24 * 60 * 60 * 1000,
              ),
              endDate: new Date(new Date(Date.now()).setMinutes(0, 0, 0)),
              interval: 60 * 60 * 1000,
            },
          }}
          bars={timeDataLast24Hours}
        />
      </ChartLegendWrapper>
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
      <ChartLegendWrapper
        colorSet={{
          Free: theme.selectedActive,
          Used: theme.infoSecondary,
        }}
      >
        <Barchart
          title="Capacity With Unit Range"
          type={{ type: 'category' }}
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
      </ChartLegendWrapper>
    );
  },
};

const stackedData: BarchartProps<
  {
    label: 'Success' | 'Failed' | 'Warning';
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
      ['category1', 0],
      ['category2', 0],
      ['category3', 0],
    ],
  },
  {
    label: 'Warning',
    data: [
      ['category1', 0],
      ['category2', 0],
      ['category3', 0],
    ],
  },
];

export const Stacked: Story = {
  render: () => {
    const theme = useTheme() as CoreUITheme;
    return (
      <ChartLegendWrapper
        colorSet={{
          Success: theme.statusHealthy,
          Failed: theme.statusCritical,
          Warning: theme.statusWarning,
        }}
        sortOrder="status"
      >
        <Stack direction="vertical" gap="r16">
          <Barchart
            type={{ type: 'category' }}
            bars={stackedData}
            stacked
            title="Stacked"
          />
          <ChartLegend shape="rectangle" />
        </Stack>
      </ChartLegendWrapper>
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
      <ChartLegendWrapper
        colorSet={{
          Success: theme.statusHealthy,
          Failed: theme.statusCritical,
        }}
        sortOrder="status"
      >
        <Barchart
          type={{ type: 'category' }}
          stacked
          bars={defaultSortData}
          defaultSort={customSort}
          title="Default Sort"
        />
      </ChartLegendWrapper>
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
        <ChartLegendWrapper
          colorSet={{
            Success: theme.statusHealthy,
            Failed: theme.statusCritical,
          }}
          sortOrder="status"
        >
          <Stack direction="vertical" gap="r16">
            <Barchart
              title="Custom Tooltip"
              type={{ type: 'category' }}
              bars={exampleData}
              tooltip={customTooltip}
              height={300}
            />
            <ChartLegend shape="line" />
          </Stack>
        </ChartLegendWrapper>
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
      <ChartLegendWrapper
        colorSet={{
          'Success Rate': theme.statusHealthy,
          'Failed Requests': theme.statusCritical,
          'Warning Events': theme.statusWarning,
        }}
        sortOrder={(a, b) => {
          const statusOrder: Record<string, number> = {
            'Success Rate': 0,
            'Warning Events': 1,
            'Failed Requests': 2,
          };
          return statusOrder[a] - statusOrder[b];
        }}
      >
        <Stack direction="vertical" gap="r16">
          <Barchart
            type={{ type: 'category' }}
            bars={statusData}
            stacked
            title="System Health Metrics"
          />
          <ChartLegend shape="rectangle" />
        </Stack>
      </ChartLegendWrapper>
    );
  },
};

export const LegendShapes: Story = {
  render: () => {
    const theme = useTheme() as CoreUITheme;
    const exampleData = [
      {
        label: 'Success',
        data: [
          ['category1', 25],
          ['category2', 40],
          ['category3', 35],
        ],
      },
      {
        label: 'Failed',
        data: [
          ['category1', 15],
          ['category2', 20],
          ['category3', 18],
        ],
      },
      {
        label: 'Warning',
        data: [
          ['category1', 8],
          ['category2', 12],
          ['category3', 10],
        ],
      },
    ] as const;
    return (
      <Stack direction="vertical" gap="r24">
        <Text variant="Large">Legend Shapes</Text>

        <ChartLegendWrapper
          colorSet={{
            Success: theme.statusHealthy,
            Failed: theme.statusCritical,
            Warning: theme.statusWarning,
          }}
          sortOrder="status"
        >
          <Stack direction="vertical" gap="r16">
            <Barchart
              type={{ type: 'category' }}
              bars={exampleData}
              height={200}
              title="Horizontal Rectangle Legend"
            />
            <ChartLegend shape="rectangle" />
          </Stack>
        </ChartLegendWrapper>
        <ChartLegendWrapper
          colorSet={{
            Success: theme.statusHealthy,
            Failed: theme.statusCritical,
            Warning: theme.statusWarning,
          }}
          sortOrder="status"
        >
          <Stack direction="vertical" gap="r16">
            <Barchart
              type={{ type: 'category' }}
              bars={exampleData}
              height={200}
              title="Vertical Line Legend"
            />
            <ChartLegend shape="line" direction="vertical" />
          </Stack>
        </ChartLegendWrapper>
      </Stack>
    );
  },
};

export const BarchartsWithSingleLegend: Story = {
  render: () => {
    const theme = useTheme() as CoreUITheme;
    const exampleData = [
      {
        label: 'Success',
        data: [
          ['category1', 25],
          ['category2', 40],
          ['category3', 35],
        ],
      },
      {
        label: 'Failed',
        data: [
          ['category1', 15],
          ['category2', 20],
          ['category3', 18],
        ],
      },
      {
        label: 'Warning',
        data: [
          ['category1', 8],
          ['category2', 12],
          ['category3', 10],
        ],
      },
    ] as const;
    return (
      <Stack direction="vertical" gap="r24">
        <Text variant="Large">Barcharts with Single Shared Legend</Text>

        <ChartLegendWrapper
          colorSet={{
            Success: theme.statusHealthy,
            Failed: theme.statusCritical,
            Warning: theme.statusWarning,
          }}
          sortOrder="status"
        >
          <Barchart
            type={{ type: 'category' }}
            bars={exampleData}
            height={200}
            title="Barchart 1"
          />

          <Barchart
            type={{ type: 'category' }}
            bars={exampleData}
            height={200}
            title="Barchart 2"
          />
          <ChartLegend shape="rectangle" />
        </ChartLegendWrapper>
      </Stack>
    );
  },
};

export const ErrorState: Story = {
  render: () => {
    const theme = useTheme() as CoreUITheme;
    return (
      <ChartLegendWrapper
        colorSet={{
          Success: theme.statusHealthy,
          Failed: theme.statusCritical,
        }}
        sortOrder="status"
      >
        <Barchart
          type={{ type: 'category' }}
          bars={[]}
          isError
          title="Error State"
          helpTooltip="This chart data could not be loaded"
        />
        <ChartLegend shape="rectangle" />
      </ChartLegendWrapper>
    );
  },
};

export const StackedBarSort: Story = {
  render: () => {
    const theme = useTheme() as CoreUITheme;
    const [sort, setSort] = useState<'default' | 'legend'>('default');
    const statusesData = [
      {
        label: 'Success',
        data: [
          ['category1', 100],
          ['category2', 80],
          ['category3', 50],
        ],
      },
      {
        label: 'Warning',
        data: [
          ['category1', 10],
          ['category2', 20],
          ['category3', 30],
        ],
      },
      {
        label: 'Failed',
        data: [
          ['category1', 30],
          ['category2', 40],
          ['category3', 50],
        ],
      },
    ] as const;
    return (
      <ChartLegendWrapper
        colorSet={{
          Success: theme.statusHealthy,
          Warning: theme.statusWarning,
          Failed: theme.statusCritical,
        }}
        sortOrder="status"
      >
        <Barchart
          type={{ type: 'category' }}
          bars={statusesData}
          stacked
          stackedBarSort={sort}
          title="Stacked Bar Chart"
          helpTooltip="This chart data could not be loaded"
          rightTitle={
            <Button
              label={sort === 'default' ? 'Sort by Legend' : 'Sort by Default'}
              onClick={() => setSort(sort === 'default' ? 'legend' : 'default')}
            />
          }
        />
        <ChartLegend shape="rectangle" />
      </ChartLegendWrapper>
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
        <ChartLegendWrapper
          colorSet={{
            Success: 'lineColor1',
            Failed: 'lineColor2',
          }}
          sortOrder="status"
        >
          <Barchart
            type={{ type: 'category' }}
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
            bars={data}
            tooltip={customTooltip}
            isLoading={isLoading}
            height={200}
          />
          <ChartLegend shape="rectangle" direction="horizontal" />
        </ChartLegendWrapper>
      </div>
    );
  },
};

export const Histogram: Story = {
  render: () => {
    const histogramData = [
      {
        label: 'Success',
        data: [
          ['0-10', 1],
          ['10-20', 5],
          ['20-30', 15],
          ['30-40', 40],
          ['40-50', 45],
          ['50-60', 50],
          ['60-70', 40],
          ['70-80', 15],
          ['80-90', 5],
          ['90-100', 1],
        ],
      },
    ] as const;
    const theme = useTheme() as CoreUITheme;
    return (
      <div style={{ width: '50%', padding: spacing.r16 }}>
        <ChartLegendWrapper
          colorSet={{
            Success: theme.statusHealthy,
          }}
        >
          <Barchart
            type={{ type: 'category', gap: 0 }}
            bars={histogramData}
            title="Histogram"
          />
          <ChartLegend shape="rectangle" />
        </ChartLegendWrapper>
      </div>
    );
  },
};

export const ModernPreset: Story = {
  render: () => {
    const theme = useTheme() as CoreUITheme;
    const data = [
      {
        label: 'Success',
        data: [
          ['category1', 25],
          ['category2', 40],
          ['category3', 35],
          ['category4', 28],
          ['category5', 47],
        ],
      },
      {
        label: 'Failed',
        data: [
          ['category1', 8],
          ['category2', 12],
          ['category3', 6],
          ['category4', 15],
          ['category5', 9],
        ],
      },
    ] as const;
    return (
      <Stack direction="vertical" gap="r24" style={{ width: '600px' }}>
        <div
          style={{
            padding: spacing.r16,
            borderRadius: spacing.r8,
            backgroundColor: theme.backgroundLevel2,
          }}
        >
          <Text variant="Large">Default preset</Text>
          <ChartLegendWrapper
            colorSet={{
              Success: theme.statusHealthy,
              Failed: theme.statusCritical,
            }}
            sortOrder="status"
          >
            <Stack direction="vertical" gap="r16">
              <Barchart
                type={{ type: 'category' }}
                bars={data}
                title="Operations"
                displayPreset="default"
              />
              <ChartLegend shape="rectangle" direction="horizontal" />
            </Stack>
          </ChartLegendWrapper>
        </div>

        <div
          style={{
            padding: spacing.r16,
            borderRadius: spacing.r8,
            backgroundColor: theme.backgroundLevel2,
          }}
        >
          <Text variant="Large">Modern preset</Text>
          <ChartLegendWrapper
            colorSet={{
              Success: theme.statusHealthy,
              Failed: theme.statusCritical,
            }}
            sortOrder="status"
          >
            <Stack direction="vertical" gap="r16">
              <Barchart
                type={{ type: 'category' }}
                bars={data}
                title="Operations"
                displayPreset="modern"
              />
              <ChartLegend shape="rectangle" direction="horizontal" />
            </Stack>
          </ChartLegendWrapper>
        </div>
      </Stack>
    );
  },
};

export const StackedHistogram: Story = {
  render: () => {
    const histogramData = [
      {
        label: 'Test 1',
        data: [
          ['0-10', 1],
          ['10-20', 5],
          ['20-30', 15],
          ['30-40', 40],
          ['40-50', 45],
          ['50-60', 50],
          ['60-70', 40],
          ['70-80', 15],
          ['80-90', 5],
          ['90-100', 1],
        ],
      },
      {
        label: 'Test 2',
        data: [
          ['0-10', 1],
          ['10-20', 2],
          ['20-30', 4],
          ['30-40', 4],
          ['40-50', 5],
          ['50-60', 6],
          ['60-70', 6],
          ['70-80', 3],
          ['80-90', 2],
          ['90-100', 1],
        ],
      },
    ] as const;
    const theme = useTheme() as CoreUITheme;
    return (
      <div
        style={{
          width: '50%',
          padding: spacing.r16,
          backgroundColor: theme.backgroundLevel2,
        }}
      >
        <ChartLegendWrapper
          colorSet={{
            'Test 1': theme.statusHealthy,
            'Test 2': theme.statusWarning,
          }}
        >
          <Barchart
            type={{ type: 'category', gap: 0 }}
            bars={histogramData}
            title="Stacked Histogram"
            stacked
          />
          <ChartLegend shape="rectangle" />
        </ChartLegendWrapper>
      </div>
    );
  },
};
