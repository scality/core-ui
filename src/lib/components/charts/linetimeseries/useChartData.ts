import { useMemo } from 'react';
import { useChartLegend } from '../legend/ChartLegendWrapper';
import {
  addMissingDataPoint,
  getMinPositiveValue,
  normalizeChartDataWithUnits,
} from '../common/chartUtils';
import { Serie, isSymmetricalSeries } from './LineTimeSerieChart.types';

type ChartDataInput = {
  series: Serie[] | { above: Serie[] | undefined; below: Serie[] | undefined } | undefined;
  startingTimeStamp: number;
  duration: number;
  interval: number;
  yAxisType: 'default' | 'percentage' | 'symmetrical';
  unitRange?: { threshold: number; label: string }[];
};

export type LineToRender = {
  key: string;
  dataKey: string;
  stroke: string;
  strokeDasharray?: string;
  withGradient?: boolean;
};

type ChartDataOutput = {
  /** Processed data ready for Recharts */
  rechartsData: Record<string, number | null>[];
  /** Maximum value for Y-axis domain */
  topDomain: number;
  /** Value used for tick calculation */
  topValue: number;
  /**
   * Smallest positive value in the normalized data, or `null` when there is
   * none. A log axis is bounded from below by the data; a linear one never
   * needs this.
   */
  minPositiveValue: number | null;
  /** Unit label (e.g., "KiB/s", "%") */
  unitLabel: string | undefined;
  /** Factor the dataset was divided by during normalization (for tooltip re-scaling) */
  valueBase: number;
  /** X-axis tick positions */
  xAxisTicks: number[];
  /** Line configurations ready for rendering */
  linesToRender: LineToRender[];
  /** Set of labels belonging to "below" series (for symmetrical charts) */
  belowSeriesLabels: Set<string> | undefined;
};

/**
 * Hook that processes chart data for LineTimeSerieChart.
 * Handles data normalization, unit scaling, empty data handling, and series grouping.
 */
export function useChartData({
  series,
  startingTimeStamp,
  duration,
  interval,
  yAxisType,
  unitRange,
}: ChartDataInput): ChartDataOutput {
  const { getColor, selectedResources } = useChartLegend();

  /**
   * Determines if the series data is empty.
   * Used for conditional rendering and empty state handling.
   */
  const isSeriesEmpty = useMemo(() => {
    return (
      !series ||
      (Array.isArray(series) && series.length === 0) ||
      (isSymmetricalSeries(series) &&
        (!series.above || series.above.length === 0) &&
        (!series.below || series.below.length === 0))
    );
  }, [series]);

  /**
   * Processes raw series data into Recharts-compatible format.
   * - Fills missing data points based on time interval
   * - Converts timestamps to milliseconds
   * - For symmetrical charts, negates "below" series values
   * - For empty data, generates placeholder data with NaN values
   */
  const chartData = useMemo(() => {
    if (isSeriesEmpty) {
      // Generate timestamps for the time range with NaN values for each series from legend
      const emptyDataPoints = addMissingDataPoint(
        [],
        startingTimeStamp,
        duration,
        interval,
      );
      return emptyDataPoints.map(([timestamp]) => {
        const dataPoint: Record<string, number> = {
          timestamp: timestamp * 1000,
        };
        selectedResources.forEach((resource) => {
          dataPoint[resource] = NaN;
        });
        return dataPoint;
      });
    }

    // Add missing data points to each series
    const normalizedSeries =
      yAxisType === 'symmetrical' && isSymmetricalSeries(series!)
        ? {
            above: series!.above
              ? series!.above.map((line) => ({
                  ...line,
                  data: addMissingDataPoint(
                    line.data,
                    startingTimeStamp,
                    duration,
                    interval,
                  ),
                }))
              : [],
            below: series!.below
              ? series!.below.map((line) => ({
                  ...line,
                  data: addMissingDataPoint(
                    line.data,
                    startingTimeStamp,
                    duration,
                    interval,
                  ).map(
                    ([timestamp, value]) =>
                      [
                        timestamp,
                        value === null ? null : `-${Number(value)}`,
                      ] as [number, string | null],
                  ),
                }))
              : [],
          }
        : (series as Serie[]).map((line) => ({
            ...line,
            data: addMissingDataPoint(
              line.data,
              startingTimeStamp,
              duration,
              interval,
            ),
          }));

    // Convert to Recharts format (array of objects with timestamp and values)
    const dataPointsByTime: Record<
      number,
      { timestamp: number } & Record<string, number | null>
    > = {};

    const seriesToProcess =
      yAxisType === 'symmetrical' && isSymmetricalSeries(normalizedSeries)
        ? [...normalizedSeries.above, ...normalizedSeries.below]
        : (normalizedSeries as Serie[]);

    seriesToProcess.forEach((serie) => {
      const label = serie.getTooltipLabel(serie.metricPrefix, serie.resource);

      serie.data.forEach((point) => {
        const timestamp =
          typeof point[0] === 'number' ? point[0] * 1000 : Number(point[0]);
        const value = point[1];

        if (!dataPointsByTime[timestamp]) {
          dataPointsByTime[timestamp] = { timestamp };
        }
        dataPointsByTime[timestamp][label] =
          typeof value === 'string' ? Number(value) : value;
      });
    });

    return Object.values(dataPointsByTime).sort(
      (a, b) => (a.timestamp as number) - (b.timestamp as number),
    );
  }, [series, startingTimeStamp, duration, interval, yAxisType, selectedResources, isSeriesEmpty]);

  /**
   * Calculates evenly spaced X-axis tick positions.
   * Adds padding to avoid labels at the very edges (10% on each side).
   */
  const xAxisTicks = useMemo(() => {
    if (!chartData || chartData.length === 0) return [];

    const timestamps: number[] = chartData
      .map((d) => d.timestamp)
      .filter((t): t is number => t !== null && t !== undefined);

    if (timestamps.length === 0) return [];

    const minTimestamp = Math.min(...timestamps);
    const maxTimestamp = Math.max(...timestamps);
    const timeRange = maxTimestamp - minTimestamp;

    const padding = timeRange * 0.1;
    const paddedStart = minTimestamp + padding;
    const paddedEnd = maxTimestamp - padding;
    const paddedRange = paddedEnd - paddedStart;

    const numTicks = 5;
    const tickInterval = paddedRange / (numTicks - 1);

    return Array.from(
      { length: numTicks },
      (_, index) => paddedStart + index * tickInterval,
    );
  }, [chartData]);

  /**
   * Normalizes data values and determines unit scaling.
   * - Extracts valid numeric values from chart data
   * - Applies unit range thresholds (e.g., B/s → KiB/s → MiB/s)
   * - Calculates Y-axis domain
   */
  const { topValue, unitLabel, rechartsData, topDomain, valueBase } = useMemo(() => {
    const values = chartData.flatMap((dataPoint) =>
      Object.entries(dataPoint)
        .filter(([key]) => key !== 'timestamp')
        .map(([_, value]) => {
          if (value === null || value === undefined) return null;
          const num =
            typeof value === 'string'
              ? Number(value)
              : typeof value === 'number'
                ? value
                : null;
          return num !== null && !isNaN(num) ? num : null;
        })
        .filter((value): value is number => value !== null),
    );

    // Default values for empty charts
    if (values.length === 0 || values.every((value) => value === 0)) {
      return {
        topValue: 1,
        unitLabel: yAxisType === 'percentage' ? '%' : undefined,
        rechartsData: chartData,
        topDomain: 1,
        valueBase: 1,
      };
    }

    const top = Math.abs(Math.max(...values));
    const bottom = Math.abs(Math.min(...values));
    const maxValue = Math.max(top, bottom);

    const result = normalizeChartDataWithUnits(
      chartData as Record<string, number>[],
      maxValue,
      unitRange,
      'timestamp',
    );

    const finalTopDomain =
      yAxisType === 'percentage'
        ? Math.max(result.topDomain, 100)
        : result.topDomain;

    return {
      topValue:
        yAxisType === 'percentage'
          ? Math.max(result.topValue, 100)
          : result.topValue,
      unitLabel: result.unitLabel ?? (yAxisType === 'percentage' ? '%' : undefined),
      rechartsData: result.rechartsData,
      topDomain: finalTopDomain,
      valueBase: result.valueBase,
    };
  }, [chartData, yAxisType, unitRange]);

  /**
   * Computes the line configurations for rendering.
   * Handles both empty series (using legend resources) and populated series.
   */
  const linesToRender = useMemo((): LineToRender[] => {
    if (isSeriesEmpty) {
      // For empty series, create lines for each resource from legend
      return selectedResources.map((resource) => ({
        key: `empty-${resource}`,
        dataKey: resource,
        stroke: getColor(resource) || '',
      }));
    }

    // For populated series, create lines from actual series data
    const allSeries = isSymmetricalSeries(series!)
      ? [...(series!.above || []), ...(series!.below || [])]
      : (series as Serie[]);

    return allSeries
      .filter((serie) => selectedResources.includes(serie.resource))
      .map((serie, index) => {
        const label = serie.getTooltipLabel(serie.metricPrefix, serie.resource);
        return {
          key: `${serie.resource}-${index}`,
          dataKey: label,
          stroke: getColor(serie.resource) || '',
          strokeDasharray: serie.isLineDashed ? '4 4' : undefined,
          withGradient: serie.withGradient,
        };
      });
  }, [series, getColor, selectedResources, isSeriesEmpty]);

  /**
   * Computes the set of "below" series labels for symmetrical charts.
   * Used to reliably determine separator placement in the tooltip.
   */
  const belowSeriesLabels = useMemo(() => {
    if (yAxisType !== 'symmetrical' || !series || !isSymmetricalSeries(series)) {
      return undefined;
    }

    const labels = new Set<string>();
    (series.below || []).forEach((serie) => {
      const label = serie.getTooltipLabel(serie.metricPrefix, serie.resource);
      labels.add(label);
    });

    return labels;
  }, [series, yAxisType]);

  const minPositiveValue = useMemo(
    () => getMinPositiveValue(rechartsData, 'timestamp'),
    [rechartsData],
  );

  return {
    rechartsData,
    topDomain,
    topValue,
    minPositiveValue,
    unitLabel,
    valueBase,
    xAxisTicks,
    linesToRender,
    belowSeriesLabels,
  };
}
