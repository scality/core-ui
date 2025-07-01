import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { StackedBarChart } from './StackedBarChart.component';
import { debug } from 'jest-preview';
import { getWrapper } from '../../testUtils';

// Mock the ResponsiveContainer to fix the issue with the chart not being rendered and making the tests fail
jest.mock('recharts', () => {
  const OriginalResponsiveContainerModule = jest.requireActual('recharts');

  return {
    ...OriginalResponsiveContainerModule,
    ResponsiveContainer: ({ height, children }) => (
      <OriginalResponsiveContainerModule.ResponsiveContainer
        width={800}
        height={300}
      >
        {children}
      </OriginalResponsiveContainerModule.ResponsiveContainer>
    ),
  };
});
const simpleData = [
  {
    x: '2020',
    y: 100,
  },
];

const multiSeriesData = [
  {
    x: '2020',
    success: 80,
    failure: 20,
    pending: 10,
  },
  {
    x: '2021',
    success: 90,
    failure: 15,
    pending: 5,
  },
];

const typedData = [
  {
    x: '2020',
    read: 50,
    write: 30,
    delete: 20,
    test: 10,
  },
  {
    x: '2021',
    read: 60,
    write: 25,
    delete: 15,
    test: 10,
  },
];

const mockDataSchema = {
  xValueKey: 'date',
  yValues: [
    { key: 'value1', color: '#0AADA6', label: 'Success' },
    { key: 'value2', color: '#E84855', label: 'Failure' },
  ],
};

const mockData = [
  { date: 'Mon', value1: 30, value2: 20 },
  { date: 'Tue', value1: 45, value2: 25 },
];

describe('StackedBarChart', () => {
  const chartStyle = {
    width: '400px',
    height: '300px',
  };
  const { Wrapper } = getWrapper();
  describe('Basic Rendering', () => {
    beforeEach(() => {
      // Clear any potential state
      jest.clearAllMocks();
    });

    it('should render with simple data', async () => {
      render(
        <Wrapper>
          <StackedBarChart
            data={simpleData}
            title="Test Title"
            dataSchema={{
              xValueKey: 'x',
              yValues: [{ key: 'y', color: 'blue' }],
            }}
            yUnit="TB"
            style={chartStyle}
          />
        </Wrapper>,
      );

      expect(
        screen.getByRole('figure', { name: 'Test Title' }),
      ).toBeInTheDocument();
      debug();
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('2020')).toBeInTheDocument();
      expect(screen.getByText(/TB/)).toBeInTheDocument();
    });

    it('should render with multiple data series', async () => {
      const { Wrapper } = getWrapper();

      render(
        <Wrapper>
          <StackedBarChart
            data={multiSeriesData}
            title="Multi Series Chart"
            yUnit=" items"
            dataSchema={{
              xValueKey: 'x',
              yValues: [
                { key: 'success', color: 'green', label: 'Success' },
                { key: 'failure', color: 'red', label: 'Failure' },
                { key: 'pending', color: 'yellow', label: 'Pending' },
              ],
            }}
            style={chartStyle}
          />
        </Wrapper>,
      );

      await waitFor(() => {
        expect(screen.getByText('2020')).toBeInTheDocument();
        expect(screen.getByText('2021')).toBeInTheDocument();
        expect(screen.getByText('Success')).toBeInTheDocument();
        expect(screen.getByText('Failure')).toBeInTheDocument();
        expect(screen.getByText('Pending')).toBeInTheDocument();
        expect(screen.getByText('items')).toBeInTheDocument();
      });
    });
    it('should render with right content', async () => {
      const { Wrapper } = getWrapper();

      render(
        <Wrapper>
          <StackedBarChart
            data={simpleData}
            title="Right Content Test"
            dataSchema={{
              xValueKey: 'x',
              yValues: [{ key: 'y', color: 'blue' }],
            }}
            rightContent={<div>Additional Info</div>}
            style={chartStyle}
          />
        </Wrapper>,
      );

      expect(screen.getByText('Right Content Test')).toBeInTheDocument();
      expect(screen.getByText('Additional Info')).toBeInTheDocument();
    });
  });

  it('should toggle series visibility when legend items are clicked', async () => {
    const { Wrapper } = getWrapper();

    render(
      <Wrapper>
        <StackedBarChart
          data={multiSeriesData}
          title="Legend Toggle Test"
          dataSchema={{
            xValueKey: 'x',
            yValues: [
              { key: 'success', color: 'green', label: 'Success' },
              { key: 'failure', color: 'red', label: 'Failure' },
            ],
          }}
          style={chartStyle}
        />
      </Wrapper>,
    );

    await waitFor(() => {
      expect(screen.getByText('Success')).toBeInTheDocument();
      expect(screen.getByText('Failure')).toBeInTheDocument();
    });

    // Click on the Success legend item to toggle it
    const successLegend = screen.getByText('Success');
    userEvent.click(successLegend);

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /Success - selected/i }),
      ).toBeInTheDocument();
    });
    const selectedButton = screen.getByRole('button', {
      name: /Success - selected/i,
    });
    expect(selectedButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('should filter data by type', async () => {
    const { Wrapper } = getWrapper();

    render(
      <Wrapper>
        <StackedBarChart
          data={typedData}
          title="Type Filter Test"
          dataSchema={{
            xValueKey: 'x',
            yValues: [
              {
                key: 'read',
                color: 'blue',
                label: 'Read',
                type: 'operation',
              },
              {
                key: 'write',
                color: 'green',
                label: 'Write',
                type: 'operation',
              },
              {
                key: 'delete',
                color: 'red',
                label: 'Delete',
                type: 'operation',
              },
              {
                key: 'test',
                color: 'purple',
                label: 'Test',
                type: 'test',
              },
            ],
          }}
          typeToDisplay="operation"
          style={chartStyle}
        />
      </Wrapper>,
    );

    expect(screen.getByText('Type Filter Test')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Read')).toBeInTheDocument();
      expect(screen.getByText('Write')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
      expect(screen.queryByText('Test')).not.toBeInTheDocument();
    });
  });
  it('should render error when data is invalid', () => {
    render(
      <Wrapper>
        <StackedBarChart
          // @ts-expect-error - This is a test case for invalid data
          data={{ data: 'invalid' }}
          dataSchema={mockDataSchema}
          title="Test Chart"
        />
      </Wrapper>,
    );

    expect(screen.getByText('Test Chart')).toBeInTheDocument();
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });
  it('should render error when data is undefined', () => {
    const { Wrapper } = getWrapper();

    render(
      <Wrapper>
        <StackedBarChart
          data={undefined as any}
          dataSchema={mockDataSchema}
          title="Test Chart"
        />
      </Wrapper>,
    );

    expect(screen.getByText('Test Chart')).toBeInTheDocument();
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('should render error when data is empty array', () => {
    const { Wrapper } = getWrapper();

    render(
      <Wrapper>
        <StackedBarChart
          data={[]}
          dataSchema={mockDataSchema}
          title="Test Chart"
        />
      </Wrapper>,
    );

    expect(screen.getByText('Test Chart')).toBeInTheDocument();
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('should render error when dataSchema is invalid', () => {
    const { Wrapper } = getWrapper();

    render(
      <Wrapper>
        <StackedBarChart
          data={mockData}
          dataSchema={{} as any}
          title="Test Chart"
        />
      </Wrapper>,
    );

    expect(screen.getByText('Test Chart')).toBeInTheDocument();
    expect(
      screen.getByText('An error occurred while rendering the chart'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('An error occurred while rendering the chart'),
    ).toBeInTheDocument();
  });

  it('should render error when dataSchema has empty yValues', () => {
    const { Wrapper } = getWrapper();

    render(
      <Wrapper>
        <StackedBarChart
          data={mockData}
          dataSchema={{ ...mockDataSchema, yValues: [] }}
          title="Test Chart"
        />
      </Wrapper>,
    );

    expect(screen.getByText('Test Chart')).toBeInTheDocument();
    expect(
      screen.getByText('An error occurred while rendering the chart'),
    ).toBeInTheDocument();
  });
});
