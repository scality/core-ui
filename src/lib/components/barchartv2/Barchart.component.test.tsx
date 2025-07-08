import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Barchart, { BarchartProps } from './Barchart.component';

import { getWrapper } from '../../testUtils';

// Only mock ResponsiveContainer since it requires actual DOM measurements
jest.mock('recharts', () => {
  const OriginalResponsiveContainerModule = jest.requireActual('recharts');

  return {
    ...OriginalResponsiveContainerModule,
    ResponsiveContainer: ({ height, children }) => (
      <OriginalResponsiveContainerModule.ResponsiveContainer
        width={800}
        height={300}
        data-testid="responsive-container"
      >
        {children}
      </OriginalResponsiveContainerModule.ResponsiveContainer>
    ),
  };
});

const testBars: BarchartProps['bars'] = [
  {
    label: 'Success',
    data: [
      ['category1', 10],
      ['category2', 20],
      ['category3', 30],
    ],
    color: 'green',
  },
];

const testTimeBars: BarchartProps['bars'] = [
  {
    label: 'Success',
    data: [
      [new Date('2024-07-05').getTime(), 10],
      [new Date('2024-07-06').getTime(), 20],
      [new Date('2024-07-07').getTime(), 30],
    ],
    color: 'green',
  },
];

describe('Barchart', () => {
  it('should render the Barchart component with category data', async () => {
    const { Wrapper } = getWrapper();
    render(
      <Wrapper>
        <Barchart type="category" bars={testBars} />
      </Wrapper>,
    );

    expect(screen.getByText('category1')).toBeInTheDocument();
    expect(screen.getByText('category2')).toBeInTheDocument();
    expect(screen.getByText('category3')).toBeInTheDocument();
  });
  it('should render the Barchart component with time data', async () => {
    const { Wrapper } = getWrapper();
    render(
      <Wrapper>
        <Barchart
          type={{
            type: 'time',
            timeRange: {
              startTimestamp: new Date('2024-07-05').getTime(),
              endTimestamp: new Date('2024-07-07').getTime(),
            },
          }}
          bars={testTimeBars}
        />
      </Wrapper>,
    );

    expect(screen.getByText('Fri05Jul')).toBeInTheDocument();
    expect(screen.getByText('Sat06Jul')).toBeInTheDocument();
    expect(screen.getByText('Sun07Jul')).toBeInTheDocument();
  });
  it.skip('should render when there are missing data in the time range', async () => {
    const bars = [
      {
        label: 'Success',
        data: [
          [new Date('2024-07-05').getTime(), 10], // Friday
          [new Date('2024-07-08').getTime(), 15], // Monday
        ] as [number, number][],
        color: 'green',
      },
      {
        label: 'Failed',
        data: [
          [new Date('2024-07-05').getTime(), 2], // Friday
          [new Date('2024-07-08').getTime(), 3], // Monday
        ] as [number, number][],
        color: 'red',
      },
    ];

    const type: BarchartProps['type'] = {
      type: 'time',
      timeRange: {
        startTimestamp: new Date('2024-07-05').getTime(),
        endTimestamp: new Date('2024-07-08').getTime(),
      },
    };
    const { Wrapper } = getWrapper();
    render(
      <Wrapper>
        <Barchart type={type} bars={bars} />
      </Wrapper>,
    );

    // Check that all days are present
    await waitFor(() => {
      expect(screen.getByText('Fri05Jul')).toBeInTheDocument();
      expect(screen.getByText('Sat06Jul')).toBeInTheDocument();
      expect(screen.getByText('Sun07Jul')).toBeInTheDocument();
      expect(screen.getByText('Mon08Jul')).toBeInTheDocument();
    });
  });
  it('should render with reference line', () => {
    const { Wrapper } = getWrapper();
    render(
      <Wrapper>
        <Barchart type="category" bars={testBars} />
      </Wrapper>,
    );
    expect(screen.getByText('50')).toBeInTheDocument();
  });
  it.skip('should render with reference line and unit range', () => {
    const testUnitRange: BarchartProps['unitRange'] = [
      {
        threshold: 1000,
        label: 'kB',
      },
    ];
    const testBars: BarchartProps['bars'] = [
      {
        label: 'Success',
        data: [
          ['category1', 200],
          ['category2', 560],
          ['category3', 640],
        ],
        color: 'green',
      },
    ];
    const { Wrapper } = getWrapper();
    render(
      <Wrapper>
        <Barchart type="category" bars={testBars} unitRange={testUnitRange} />
      </Wrapper>,
    );
    expect(screen.getByText('1000')).toBeInTheDocument();
    expect(screen.getByText('kB')).toBeInTheDocument();
  });

  it.skip('should render with the unit range', () => {
    const testBars: BarchartProps['bars'] = [
      {
        label: 'Success',
        data: [
          ['category1', 2220],
          ['category2', 2500],
          ['category3', 3000],
        ],
        color: 'green',
      },
    ];

    const testUnitRange: BarchartProps['unitRange'] = [
      {
        threshold: 1000,
        label: 'kB',
      },
      {
        threshold: 1000000,
        label: 'MB',
      },
    ];
    const { Wrapper } = getWrapper();
    render(
      <Wrapper>
        <Barchart type="category" bars={testBars} unitRange={testUnitRange} />
      </Wrapper>,
    );
    expect(screen.getByText('kB')).toBeInTheDocument();
  });
});
