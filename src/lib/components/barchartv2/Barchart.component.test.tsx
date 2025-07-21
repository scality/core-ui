import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { getWrapper } from '../../testUtils';
import { Barchart } from './Barchart.component';

const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
const ONE_HOUR_IN_MILLISECONDS = 60 * 60 * 1000;

// Mock ResponsiveContainer to test the Barchart component
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

const testBars = [
  {
    label: 'Success',
    data: [
      ['category1', 10],
      ['category2', 20],
      ['category3', 30],
    ],
    color: 'green',
  },
] as const;

const testTimeBars = [
  {
    label: 'Success',
    data: [
      [new Date('2024-07-05').getTime(), 10],
      [new Date('2024-07-06').getTime(), 20],
      [new Date('2024-07-07').getTime(), 30],
    ],
    color: 'green',
  },
] as const;

describe('Barchart', () => {
  describe('Basic rendering', () => {
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
                interval: ONE_DAY_IN_MILLISECONDS,
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
  });

  describe('Time data', () => {
    it('should render the chart with correct starting days even if the data is missing', async () => {
      const { Wrapper } = getWrapper();
      render(
        <Wrapper>
          <Barchart
            type={{
              type: 'time',
              timeRange: {
                startTimestamp: new Date('2024-07-03').getTime(),
                endTimestamp: new Date('2024-07-07').getTime(),
                interval: ONE_DAY_IN_MILLISECONDS,
              },
            }}
            // data starts on 2024-07-05
            bars={testTimeBars}
          />
        </Wrapper>,
      );
      expect(screen.getByText('Wed03Jul')).toBeInTheDocument();
      expect(screen.getByText('Thu04Jul')).toBeInTheDocument();
      expect(screen.getByText('Fri05Jul')).toBeInTheDocument();
      expect(screen.getByText('Sat06Jul')).toBeInTheDocument();
      expect(screen.getByText('Sun07Jul')).toBeInTheDocument();
    });
    it('should render when there are missing data in the time range', async () => {
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

      const type = {
        type: 'time' as const,
        timeRange: {
          startTimestamp: new Date('2024-07-05').getTime(),
          endTimestamp: new Date('2024-07-08').getTime(),
          interval: ONE_DAY_IN_MILLISECONDS,
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
    it('should render for a specific time range', async () => {
      // 7 days data from 2024-07-05 to 2024-07-11
      const testTimeBars = [
        {
          label: 'Success',
          data: [
            [new Date('2024-07-05').getTime(), 10],
            [new Date('2024-07-06').getTime(), 10],
            [new Date('2024-07-07').getTime(), 10],
            [new Date('2024-07-08').getTime(), 10],
            [new Date('2024-07-09').getTime(), 10],
            [new Date('2024-07-10').getTime(), 10],
            [new Date('2024-07-11').getTime(), 10],
          ],
          color: 'green',
        },
      ] as const;

      const type = {
        type: 'time' as const,
        timeRange: {
          startTimestamp: new Date('2024-07-05').getTime(),
          endTimestamp: new Date('2024-07-11').getTime(),
          interval: ONE_DAY_IN_MILLISECONDS,
        },
      };
      const { Wrapper } = getWrapper();
      render(
        <Wrapper>
          <Barchart type={type} bars={testTimeBars} />
        </Wrapper>,
      );
      await waitFor(() => {
        expect(screen.getByText('Fri05Jul')).toBeInTheDocument();
        expect(screen.getByText('Sat06Jul')).toBeInTheDocument();
        expect(screen.getByText('Sun07Jul')).toBeInTheDocument();
        expect(screen.getByText('Mon08Jul')).toBeInTheDocument();
        expect(screen.getByText('Tue09Jul')).toBeInTheDocument();
        expect(screen.getByText('Wed10Jul')).toBeInTheDocument();
        expect(screen.getByText('Thu11Jul')).toBeInTheDocument();
      });
    });
    it('should render the Barchart component with hourly intervals', async () => {
      const testHourlyBars = [
        {
          label: 'Success',
          data: [
            [new Date('2024-07-05T10:00:00').getTime(), 10],
            [new Date('2024-07-05T12:00:00').getTime(), 20],
          ],
          color: 'green',
        },
      ] as const;

      const { Wrapper } = getWrapper();
      render(
        <Wrapper>
          <Barchart
            type={{
              type: 'time',
              timeRange: {
                startTimestamp: new Date('2024-07-05T10:00:00').getTime(),
                endTimestamp: new Date('2024-07-05T12:00:00').getTime(),
                interval: ONE_HOUR_IN_MILLISECONDS,
              },
            }}
            bars={testHourlyBars}
          />
        </Wrapper>,
      );

      expect(screen.getByText('10:00')).toBeInTheDocument();
      expect(screen.getByText('11:00')).toBeInTheDocument();
      expect(screen.getByText('12:00')).toBeInTheDocument();
    });
  });

  it('should render stacked bars', () => {
    const testStackedBars = [
      {
        label: 'Success',
        data: [
          ['category1', 10],
          ['category2', 20],
          ['category3', 30],
        ],
        color: 'green',
      },
      {
        label: 'Failed',
        data: [
          ['category1', 5],
          ['category2', 8],
          ['category3', 12],
        ],
        color: 'red',
      },
    ] as const;

    const { Wrapper } = getWrapper();
    render(
      <Wrapper>
        <Barchart type="category" bars={testStackedBars} stacked={true} />
      </Wrapper>,
    );

    expect(screen.getByText('category1')).toBeInTheDocument();
    expect(screen.getByText('category2')).toBeInTheDocument();
    expect(screen.getByText('category3')).toBeInTheDocument();
  });

  it('should sort categories using defaultSort function', () => {
    const testBars = [
      {
        label: 'Success',
        data: [
          ['category1', 10],
          ['category2', 20],
          ['category3', 30],
        ],
        color: 'green',
      },
    ] as const;

    const { Wrapper } = getWrapper();
    render(
      <Wrapper>
        <Barchart
          type="category"
          bars={testBars}
          defaultSort={(pointA, pointB) => {
            const valueA = pointA.Success;
            const valueB = pointB.Success;
            return valueB - valueA > 0 ? 1 : valueB - valueA < 0 ? -1 : 0;
          }}
        />
      </Wrapper>,
    );

    // Categories should be rendered in descending order by value
    const categories = screen.getAllByText(/category[123]/);
    expect(categories[0]).toHaveTextContent('category3'); // 30 (highest)
    expect(categories[1]).toHaveTextContent('category2'); // 20 (middle)
    expect(categories[2]).toHaveTextContent('category1'); // 10 (lowest)
  });

  it('should render the Barchart component with loading state', () => {
    const { Wrapper } = getWrapper();
    render(
      <Wrapper>
        <Barchart type="category" bars={[]} isLoading />
      </Wrapper>,
    );
    expect(screen.getByText('Loading Chart Data...')).toBeInTheDocument();
  });
  it('should render header with title, secondary title, right title and help tooltip', async () => {
    const { Wrapper } = getWrapper();
    render(
      <Wrapper>
        <Barchart
          type="category"
          bars={[]}
          title="Test Title"
          secondaryTitle="Test Secondary Title"
          rightTitle="Test Right Title"
          helpTooltip="Test Help Tooltip"
        />
      </Wrapper>,
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Secondary Title')).toBeInTheDocument();
    expect(screen.getByText('Test Right Title')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByLabelText('Test Help Tooltip')).toBeInTheDocument();
    });
  });
});
