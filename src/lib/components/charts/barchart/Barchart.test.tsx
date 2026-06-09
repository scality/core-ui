import { render, screen, waitFor } from '@testing-library/react';
import { getWrapper } from '../../../testUtils';
import { Barchart } from './Barchart';
import { ChartLegendWrapper } from '../legend/ChartLegendWrapper';
import React from 'react';
import { CustomTick } from '../common/SharedComponents';

const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
const ONE_HOUR_IN_MILLISECONDS = 60 * 60 * 1000;

// Mock ResponsiveContainer to test the Barchart component
jest.mock('recharts', () => {
  const OriginalResponsiveContainerModule = jest.requireActual('recharts');

  return {
    ...OriginalResponsiveContainerModule,
    ResponsiveContainer: ({ height, children }) => (
      <OriginalResponsiveContainerModule.ResponsiveContainer
        aspect={3}
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
      [new Date('2024-07-05'), 10],
      [new Date('2024-07-06'), 20],
      [new Date('2024-07-07'), 30],
    ],
    color: 'green',
  },
] as const;

const testColorSet = {
  Success: 'lineColor1',
};

describe('Barchart', () => {
  describe('Basic rendering', () => {
    it('should render the Barchart component with category data', async () => {
      const { Wrapper } = getWrapper();
      render(
        <Wrapper>
          <ChartLegendWrapper colorSet={testColorSet}>
            <Barchart
              title="Test Title"
              type={{ type: 'category' }}
              bars={testBars}
            />
          </ChartLegendWrapper>
        </Wrapper>,
      );
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('category1')).toBeInTheDocument();
      expect(screen.getByText('category2')).toBeInTheDocument();
      expect(screen.getByText('category3')).toBeInTheDocument();
    });

    it('should render the Barchart component with time data', async () => {
      const { Wrapper } = getWrapper();
      render(
        <Wrapper>
          <ChartLegendWrapper colorSet={testColorSet}>
            <Barchart
              title="Test Title"
              type={{
                type: 'time',
                timeRange: {
                  startDate: new Date('2024-07-05'),
                  endDate: new Date('2024-07-07'),
                  interval: ONE_DAY_IN_MILLISECONDS,
                },
              }}
              bars={testTimeBars}
            />
          </ChartLegendWrapper>
        </Wrapper>,
      );

      expect(screen.getByText('05 Jul')).toBeInTheDocument();
      expect(screen.getByText('06 Jul')).toBeInTheDocument();
      expect(screen.getByText('07 Jul')).toBeInTheDocument();
    });
    it('should render the Barchart component with error state', async () => {
      const { Wrapper } = getWrapper();
      render(
        <Wrapper>
          <ChartLegendWrapper colorSet={testColorSet}>
            <Barchart
              title="Test Title"
              type={{ type: 'category' }}
              bars={[]}
              isError
            />
          </ChartLegendWrapper>
        </Wrapper>,
      );
      expect(
        screen.getByText('Chart data is not available'),
      ).toBeInTheDocument();
    });
    it('should render the Barchart component with loading state', async () => {
      const { Wrapper } = getWrapper();
      render(
        <Wrapper>
          <ChartLegendWrapper colorSet={testColorSet}>
            <Barchart
              title="Test Title"
              type={{ type: 'category' }}
              bars={[]}
              isLoading
            />
          </ChartLegendWrapper>
        </Wrapper>,
      );
      expect(screen.getByText('Loading Chart Data...')).toBeInTheDocument();
    });
    it('should render the Barchart component with undefined bars', async () => {
      const { Wrapper } = getWrapper();
      render(
        <Wrapper>
          <ChartLegendWrapper colorSet={testColorSet}>
            <Barchart
              title="Test Title"
              type={{ type: 'category' }}
              bars={undefined}
            />
          </ChartLegendWrapper>
        </Wrapper>,
      );
      expect(
        screen.getByText('Chart data is not available'),
      ).toBeInTheDocument();
    });
  });

  describe('Time data', () => {
    it('should render the chart with correct starting days even if the data is missing', async () => {
      const { Wrapper } = getWrapper();
      render(
        <Wrapper>
          <ChartLegendWrapper colorSet={testColorSet}>
            <Barchart
              title="Test Title"
              type={{
                type: 'time',
                timeRange: {
                  startDate: new Date('2024-07-03'),
                  endDate: new Date('2024-07-07'),
                  interval: ONE_DAY_IN_MILLISECONDS,
                },
              }}
              // data starts on 2024-07-05
              bars={testTimeBars}
            />
          </ChartLegendWrapper>
        </Wrapper>,
      );
      expect(screen.getByText('03 Jul')).toBeInTheDocument();
      expect(screen.getByText('04 Jul')).toBeInTheDocument();
      expect(screen.getByText('05 Jul')).toBeInTheDocument();
      expect(screen.getByText('06 Jul')).toBeInTheDocument();
      expect(screen.getByText('07 Jul')).toBeInTheDocument();
    });
    it('should render when there are missing data in the time range', async () => {
      const bars = [
        {
          label: 'Success',
          data: [
            [new Date('2024-07-05'), 10], // Friday
            [new Date('2024-07-08'), 15], // Monday
          ] as [Date, number][],
          color: 'green',
        },
        {
          label: 'Failed',
          data: [
            [new Date('2024-07-05'), 2], // Friday
            [new Date('2024-07-08'), 3], // Monday
          ] as [Date, number][],
          color: 'red',
        },
      ] as const;

      const type = {
        type: 'time' as const,
        timeRange: {
          startDate: new Date('2024-07-05'),
          endDate: new Date('2024-07-08'),
          interval: ONE_DAY_IN_MILLISECONDS,
        },
      };
      const { Wrapper } = getWrapper();
      render(
        <Wrapper>
          <ChartLegendWrapper
            colorSet={{
              Success: 'lineColor1',
              Failed: 'lineColor2',
            }}
          >
            <Barchart title="Test Title" type={type} bars={bars} />
          </ChartLegendWrapper>
        </Wrapper>,
      );

      // Check that all days are present
      await waitFor(() => {
        expect(screen.getByText('05 Jul')).toBeInTheDocument();
        expect(screen.getByText('06 Jul')).toBeInTheDocument();
        expect(screen.getByText('07 Jul')).toBeInTheDocument();
        expect(screen.getByText('08 Jul')).toBeInTheDocument();
      });
    });
    it('should render for a specific time range', async () => {
      // 7 days data from 2024-07-05 to 2024-07-11
      const testTimeBars = [
        {
          label: 'Success',
          data: [
            [new Date('2024-07-05'), 10],
            [new Date('2024-07-06'), 10],
            [new Date('2024-07-07'), 10],
            [new Date('2024-07-08'), 10],
            [new Date('2024-07-09'), 10],
            [new Date('2024-07-10'), 10],
            [new Date('2024-07-11'), 10],
          ],
          color: 'green',
        },
      ] as const;

      const type = {
        type: 'time' as const,
        timeRange: {
          startDate: new Date('2024-07-05'),
          endDate: new Date('2024-07-11'),
          interval: ONE_DAY_IN_MILLISECONDS,
        },
      };
      const { Wrapper } = getWrapper();
      render(
        <Wrapper>
          <ChartLegendWrapper colorSet={testColorSet}>
            <Barchart title="Test Title" type={type} bars={testTimeBars} />
          </ChartLegendWrapper>
        </Wrapper>,
      );
      await waitFor(() => {
        expect(screen.getByText('05 Jul')).toBeInTheDocument();
        expect(screen.getByText('06 Jul')).toBeInTheDocument();
        expect(screen.getByText('07 Jul')).toBeInTheDocument();
        expect(screen.getByText('08 Jul')).toBeInTheDocument();
        expect(screen.getByText('09 Jul')).toBeInTheDocument();
        expect(screen.getByText('10 Jul')).toBeInTheDocument();
        expect(screen.getByText('11 Jul')).toBeInTheDocument();
      });
    });
    it('should render the Barchart component with hourly intervals', async () => {
      const testHourlyBars = [
        {
          label: 'Success',
          data: [
            [new Date('2024-07-05T10:00:00'), 10],
            [new Date('2024-07-05T12:00:00'), 20],
          ],
          color: 'green',
        },
      ] as const;

      const { Wrapper } = getWrapper();
      render(
        <Wrapper>
          <ChartLegendWrapper colorSet={testColorSet}>
            <Barchart
              title="Test Title"
              type={{
                type: 'time',
                timeRange: {
                  startDate: new Date('2024-07-05T10:00:00'),
                  endDate: new Date('2024-07-05T12:00:00'),
                  interval: ONE_HOUR_IN_MILLISECONDS,
                },
              }}
              bars={testHourlyBars}
            />
          </ChartLegendWrapper>
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
        <ChartLegendWrapper colorSet={{ ...testColorSet, Failed: 'red' }}>
          <Barchart
            title="Test Title"
            type={{ type: 'category' }}
            bars={testStackedBars}
            stacked
          />
        </ChartLegendWrapper>
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
        <ChartLegendWrapper colorSet={testColorSet}>
          <Barchart
            title="Test Title"
            type={{ type: 'category' }}
            bars={testBars}
            defaultSort={(pointA, pointB) => {
              const valueA = pointA.Success;
              const valueB = pointB.Success;
              return valueB - valueA > 0 ? 1 : valueB - valueA < 0 ? -1 : 0;
            }}
          />
        </ChartLegendWrapper>
      </Wrapper>,
    );

    // Categories should be rendered in descending order by value
    const categories = screen.getAllByText(/category[123]/);
    expect(categories[0]).toHaveTextContent('category3'); // 30 (highest)
    expect(categories[1]).toHaveTextContent('category2'); // 20 (middle)
    expect(categories[2]).toHaveTextContent('category1'); // 10 (lowest)
  });

  it('should render header with title, secondary title, right title and helpIcon', async () => {
    const { Wrapper } = getWrapper();
    render(
      <Wrapper>
        <ChartLegendWrapper colorSet={testColorSet}>
          <Barchart
            type={{ type: 'category' }}
            bars={[]}
            title="Test Title"
            secondaryTitle="Test Secondary Title"
            rightTitle="Test Right Title"
            helpTooltip="Test Help Tooltip"
          />
        </ChartLegendWrapper>
      </Wrapper>,
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Secondary Title')).toBeInTheDocument();
    expect(screen.getByText('Test Right Title')).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /More information/i }),
      ).toBeInTheDocument();
    });
  });
  describe('formatDate', () => {
    it('should render the CustomTick component with over a day interval', () => {
      const { Wrapper } = getWrapper();
      render(
        <Wrapper>
          <CustomTick
            type={{
              type: 'time',
              timeRange: {
                startDate: new Date('2024-07-05'),
                endDate: new Date('2024-07-07'),
                interval: 2 * ONE_DAY_IN_MILLISECONDS,
              },
            }}
            x={100}
            y={100}
            payload={{ value: new Date('2024-07-05T10:00:00').getTime() }}
            visibleTicksCount={10}
            width={100}
          />
        </Wrapper>,
      );
      expect(screen.getByText('05 Jul')).toBeInTheDocument();
    });

    it('should render the CustomTick component with day format', () => {
      const { Wrapper } = getWrapper();
      render(
        <Wrapper>
          <CustomTick
            type={{
              type: 'time',
              timeRange: {
                startDate: new Date('2024-07-05'),
                endDate: new Date('2024-07-07'),
                interval: ONE_DAY_IN_MILLISECONDS,
              },
            }}
            x={100}
            y={100}
            payload={{ value: new Date('2024-07-05T10:00:00').getTime() }}
            visibleTicksCount={10}
            width={100}
          />
        </Wrapper>,
      );
      expect(screen.getByText('05 Jul')).toBeInTheDocument();
    });
    it('should render the CustomTick component with hour format', () => {
      const { Wrapper } = getWrapper();
      render(
        <Wrapper>
          <CustomTick
            type={{
              type: 'time',
              timeRange: {
                startDate: new Date('2024-07-05'),
                endDate: new Date('2024-07-07'),
                interval: ONE_HOUR_IN_MILLISECONDS,
              },
            }}
            x={100}
            y={100}
            payload={{ value: new Date('2024-07-05T10:00:00').getTime() }}
            visibleTicksCount={10}
            width={100}
          />
        </Wrapper>,
      );
      expect(screen.getByText('05 Jul')).toBeInTheDocument();
    });
    it('should render the CustomTick component with minute format', () => {
      const { Wrapper } = getWrapper();
      render(
        <Wrapper>
          <CustomTick
            type={{
              type: 'time',
              timeRange: {
                startDate: new Date('2024-07-05'),
                endDate: new Date('2024-07-07'),
                interval: 1000 * 30,
              },
            }}
            x={100}
            y={100}
            payload={{ value: new Date('2024-07-05T10:00:00').getTime() }}
            visibleTicksCount={10}
            width={100}
          />
        </Wrapper>,
      );
      expect(screen.getByText('05 Jul')).toBeInTheDocument();
    });
    it('should render both lines of a multi-line category tick label', () => {
      const { Wrapper } = getWrapper();
      render(
        <Wrapper>
          <CustomTick
            type={{ type: 'category' }}
            x={100}
            y={100}
            payload={{ value: '00:00–03:00\n05 Jul' }}
            visibleTicksCount={10}
            width={100}
          />
        </Wrapper>,
      );
      expect(screen.getByText('00:00–03:00')).toBeInTheDocument();
      expect(screen.getByText('05 Jul')).toBeInTheDocument();
    });
  });
});
