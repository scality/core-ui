import { render, screen } from '@testing-library/react';
import React, { useEffect } from 'react';
import {
  ChartLegendWrapper,
  useChartId,
  useChartLegend,
} from './ChartLegendWrapper';
import { ChartLegend } from './ChartLegend';
import userEvent from '@testing-library/user-event';

describe('ChartLegendWrapper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const TestChart = ({ seriesNames }: { seriesNames: string[] }) => {
    const chartId = useChartId();
    const { register } = useChartLegend();

    useEffect(() => {
      register(chartId, seriesNames);
    }, [chartId, register, seriesNames]);

    return <div data-testid={`chart-${chartId}`}>Test Chart</div>;
  };

  const generateColors = (seriesNames: string[]) => {
    const colors: Record<string, string> = {};
    const colorPalette = ['red', 'blue', 'green', 'yellow', 'purple'];
    seriesNames.forEach((name, index) => {
      colors[name] = colorPalette[index % colorPalette.length];
    });
    return colors;
  };

  describe('Dynamic Color Generation', () => {
    it('should generate colors dynamically based on registered series', () => {
      render(
        <ChartLegendWrapper colorSet={generateColors}>
          <TestChart seriesNames={['CPU', 'Memory']} />
          <ChartLegend shape="line" />
        </ChartLegendWrapper>,
      );

      expect(screen.getByText('CPU')).toBeInTheDocument();
      expect(screen.getByText('Memory')).toBeInTheDocument();
      expect(screen.getByLabelText('CPU selected')).toBeInTheDocument();
      expect(screen.getByLabelText('Memory selected')).toBeInTheDocument();
    });

    it('should handle multiple charts with overlapping series', () => {
      const TestChart1 = () => {
        const chartId = useChartId();
        const { register } = useChartLegend();

        useEffect(() => {
          register(chartId, ['CPU', 'Memory']);
        }, [chartId, register]);

        return <div data-testid={`chart1-${chartId}`}>Test Chart 1</div>;
      };

      const TestChart2 = () => {
        const chartId = useChartId();
        const { register } = useChartLegend();

        useEffect(() => {
          register(chartId, ['CPU', 'Disk']);
        }, [chartId, register]);

        return <div data-testid={`chart2-${chartId}`}>Test Chart 2</div>;
      };

      render(
        <ChartLegendWrapper colorSet={generateColors}>
          <TestChart1 />
          <TestChart2 />
          <ChartLegend shape="line" />
        </ChartLegendWrapper>,
      );

      // Should show unique series from both charts
      expect(screen.getByText('CPU')).toBeInTheDocument();
      expect(screen.getByText('Memory')).toBeInTheDocument();
      expect(screen.getByText('Disk')).toBeInTheDocument();

      // All should be selected by default
      expect(screen.getByLabelText('CPU selected')).toBeInTheDocument();
      expect(screen.getByLabelText('Memory selected')).toBeInTheDocument();
      expect(screen.getByLabelText('Disk selected')).toBeInTheDocument();
    });

    it('should handle empty series registration', () => {
      render(
        <ChartLegendWrapper colorSet={generateColors}>
          <TestChart seriesNames={[]} />
          <ChartLegend shape="line" />
        </ChartLegendWrapper>,
      );

      // Should not crash and should render empty legend
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should maintain selection state when new series are added', () => {
      const { rerender } = render(
        <ChartLegendWrapper colorSet={generateColors}>
          <TestChart seriesNames={['CPU']} />
          <ChartLegend shape="line" />
        </ChartLegendWrapper>,
      );

      // Initially only CPU
      expect(screen.getByText('CPU')).toBeInTheDocument();
      expect(screen.getByLabelText('CPU selected')).toBeInTheDocument();

      // Select only CPU
      userEvent.click(screen.getByText('CPU'));
      expect(screen.getByLabelText('CPU selected')).toBeInTheDocument();

      // Add more series
      rerender(
        <ChartLegendWrapper colorSet={generateColors}>
          <TestChart seriesNames={['CPU', 'Memory']} />
          <ChartLegend shape="line" />
        </ChartLegendWrapper>,
      );

      // New series should be added and all should be selected (reset behavior)
      expect(screen.getByText('CPU')).toBeInTheDocument();
      expect(screen.getByText('Memory')).toBeInTheDocument();
      expect(screen.getByLabelText('CPU selected')).toBeInTheDocument();
      expect(screen.getByLabelText('Memory selected')).toBeInTheDocument();
    });

    it('should work with different chart configurations', () => {
      render(
        <ChartLegendWrapper colorSet={generateColors}>
          <TestChart seriesNames={['Series1', 'Series2', 'Series3']} />
          <ChartLegend shape="rectangle" direction="vertical" />
        </ChartLegendWrapper>,
      );

      expect(screen.getByText('Series1')).toBeInTheDocument();
      expect(screen.getByText('Series2')).toBeInTheDocument();
      expect(screen.getByText('Series3')).toBeInTheDocument();
    });
  });

  describe('Static Color Set', () => {
    const staticColorSet = {
      CPU: 'red',
      Memory: 'blue',
      Disk: 'green',
    };

    it('should work with static color sets', () => {
      render(
        <ChartLegendWrapper colorSet={staticColorSet}>
          <ChartLegend shape="line" />
        </ChartLegendWrapper>,
      );

      expect(screen.getByText('CPU')).toBeInTheDocument();
      expect(screen.getByText('Memory')).toBeInTheDocument();
      expect(screen.getByText('Disk')).toBeInTheDocument();
    });

    it('should ignore registration when using static color sets', () => {
      render(
        <ChartLegendWrapper colorSet={staticColorSet}>
          <TestChart seriesNames={['DifferentSeries']} />
          <ChartLegend shape="line" />
        </ChartLegendWrapper>,
      );

      // Should only show static color set items, not registered series
      expect(screen.getByText('CPU')).toBeInTheDocument();
      expect(screen.getByText('Memory')).toBeInTheDocument();
      expect(screen.getByText('Disk')).toBeInTheDocument();
      expect(screen.queryByText('DifferentSeries')).not.toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should throw error when useChartLegend is used outside wrapper', () => {
      const TestComponent = () => {
        useChartLegend();
        return <div>Test</div>;
      };

      expect(() => render(<TestComponent />)).toThrow(
        'useChartLegend must be used within a ChartLegendWrapper',
      );
    });
  });
});
