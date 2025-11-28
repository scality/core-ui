import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Sparkline } from '../src/lib/components/charts';
import { lineColor5, lineColor6 } from '../src/lib/style/theme';

const meta: Meta<typeof Sparkline> = {
  title: 'Components/Data Display/Charts/Sparkline',
  component: Sparkline,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    serie: {
      control: 'object',
      description: 'Data series containing array of [timestamp, value] pairs',
    },
    startingTimeStamp: {
      control: 'number',
      description: 'Starting timestamp in seconds for the data series',
    },
    sampleDuration: {
      control: 'number',
      description: 'Total duration in seconds to cover in the sparkline',
    },
    sampleInterval: {
      control: 'number',
      description: 'Interval in seconds between data points',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 200, height: 100 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Sparkline>;

// Sample data for different scenarios
const volatileData: [number, number][] = [
  [1740405600, 25.32],
  [1740406320, 78.45],
  [1740407040, 45.67],
  [1740407760, 15.67],
  [1740408480, 92.33],
  [1740409200, 8.91],
  [1740409920, 88.76],
  [1740410640, 34.22],
  [1740411360, 67.89],
  [1740412080, 12.45],
  [1740412800, 95.67],
];

const trendingUpData: [number, number][] = [
  [1740405600, 10.5],
  [1740406320, 15.2],
  [1740407040, 20.3],
  [1740407760, 18.9],
  [1740408480, 22.1],
  [1740409200, 28.7],
  [1740409920, 35.4],
  [1740410640, 42.8],
  [1740411360, 48.3],
  [1740412080, 55.9],
  [1740412800, 62.1],
];

const trendingDownData: [number, number][] = [
  [1740405600, 70.5],
  [1740406320, 65.2],
  [1740407040, 58.9],
  [1740407760, 58.9],
  [1740408480, 52.1],
  [1740409200, 48.7],
  [1740409920, 35.4],
  [1740410640, 32.8],
  [1740411360, 28.3],
  [1740412080, 25.9],
  [1740412800, 22.1],
];

const flatData: [number, number | null][] = [
  [1740405600, 50.0],
  [1740406320, 50.0],
  [1740407760, 50.0],
  [1740409200, 50.0],
  [1740409920, 50.0],
  [1740410640, 50.0],
  [1740412080, 50.0],
  [1740412800, 50.0],
];

export const Default: Story = {
  args: {
    serie: {
      data: volatileData,
    },
    startingTimeStamp: 1740405600,
    sampleDuration: 7200,
    sampleInterval: 720,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Sparkline displaying highly volatile data with frequent peaks and valleys.',
      },
    },
  },
};

export const TrendingUp: Story = {
  args: {
    serie: {
      data: trendingUpData,
      color: lineColor5, // Optional custom color (green)
    },
    startingTimeStamp: 1740405600,
    sampleDuration: 7200,
    sampleInterval: 720,
  },
  parameters: {
    docs: {
      description: {
        story: 'Sparkline showing a clear upward trend over time.',
      },
    },
  },
};

export const TrendingDown: Story = {
  args: {
    serie: {
      data: trendingDownData,
      color: lineColor6,
    },
    startingTimeStamp: 1740405600,
    sampleDuration: 7200,
    sampleInterval: 720,
  },
  parameters: {
    docs: {
      description: {
        story: 'Sparkline illustrating a downward trend over time.',
      },
    },
  },
};

export const FlatWithMissingData: Story = {
  args: {
    serie: {
      data: flatData,
    },
    startingTimeStamp: 1740405600,
    sampleDuration: 7200,
    sampleInterval: 720,
  },
  parameters: {
    docs: {
      description: {
        story: 'Sparkline representing stable data with some missing values.',
      },
    },
  },
};

export const PercentageYAxis: Story = {
  args: {
    serie: {
      data: trendingUpData,
    },
    startingTimeStamp: 1740405600,
    sampleDuration: 7200,
    sampleInterval: 720,
    yAxisType: 'percentage',
  },
  parameters: {
    docs: {
      description: {
        story: 'Sparkline with Y-axis range is set as [0-100].',
      },
    },
  },
};
