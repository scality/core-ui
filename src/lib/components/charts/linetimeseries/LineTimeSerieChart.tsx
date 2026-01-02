import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  Tooltip,
  TooltipContentProps,
  XAxis,
  YAxis,
} from 'recharts';
import styled, { useTheme } from 'styled-components';
import { Stack } from '../../../spacing';
import { fontSize } from '../../../style/theme';
import { IconHelp } from '../../iconhelper/IconHelper';
import { Loader } from '../../loader/Loader.component';
import { ChartTitleText } from '../../text/Text.component';
import { LegendShape } from '../legend/ChartLegend';
import { useChartLegend } from '../legend/ChartLegendWrapper';
import { StyledResponsiveContainer } from '../common/SharedComponents';
import {
  ChartTooltipHeader,
  ChartTooltipItem,
  ChartTooltipItemsContainer,
  ChartTooltipPortal,
  ChartTooltipSeparator,
  TooltipHeader,
} from '../common/ChartTooltip';
import {
  addMissingDataPoint,
  formatToISONumber,
  getTicks,
  maxWidthTooltip,
  normalizeChartDataWithUnits,
} from '../common/chartUtils';
import { formatXAxisLabel } from './LineTimeSerieChart.utils';

const LineTemporalChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export type Serie = {
  // the name of the resource
  resource: string;
  // the original data format from prometheus, extend the value to include number type.
  data: [number, number | string | null][];
  // it's mandatory to display tooltip label in the tooltip
  getTooltipLabel: (metricPrefix?: string, resource?: string) => string;
  // the name of the metric prefix with read, write, in, out
  metricPrefix?: string;
  // to specify if the line is dash
  isLineDashed?: boolean;
};

type NonSymmetricalChartSerie = {
  yAxisType?: 'default' | 'percentage';
  series: Serie[] | undefined;
};

// The symmetrical chart props are used to display two series on the same chart, such as in/out, write/read
type SymmetricalChartSerie = {
  yAxisType: 'symmetrical';
  series:
    | {
        above: Serie[] | undefined;
        below: Serie[] | undefined;
      }
    | undefined;
};

export type LineChartProps = (
  | NonSymmetricalChartSerie
  | SymmetricalChartSerie
) & {
  title: string;
  height: number;
  startingTimeStamp: number;
  interval: number;
  duration: number;
  unitRange?: {
    threshold: number;
    label: string;
  }[];
  syncId?: string;
  isLoading?: boolean;
  /**
   * The format of the x axis, default is 'date-time' which is like 01 Sep 16:00
   * If you want to display the date only, you can set it to 'date' which is like 2025-09-01
   * This will affect the format of the tooltip as well
   */
  timeFormat?: 'date-time' | 'date';
  yAxisTitle?: string;
  helpText?: string;
  renderTooltip?: (
    tooltipProps: TooltipContentProps<number, string>,
    unitLabel?: string,
    duration?: number,
  ) => React.ReactNode;
};

const LineTimeSerieChartTooltip = ({
  unitLabel,
  duration,
  isChartActive,
  tooltipProps,
  renderTooltip,
  hoveredValue,
  isSymmetrical,
  chartContainerRef,
}: {
  tooltipProps: TooltipContentProps<number, string>;
  unitLabel?: string;
  duration: number;
  isChartActive?: boolean;
  renderTooltip?: (
    tooltipProps: TooltipContentProps<number, string>,
    unitLabel?: string,
    duration?: number,
  ) => React.ReactNode;
  hoveredValue?: string;
  isSymmetrical?: boolean;
  chartContainerRef: React.RefObject<HTMLDivElement>;
}) => {
  const { active, payload, label, coordinate } = tooltipProps;

  if (!active || !payload || !payload.length || !label || !isChartActive)
    return null;

  const tooltipContent = renderTooltip ? (
    renderTooltip(tooltipProps, unitLabel, duration)
  ) : (
    <>
      <ChartTooltipHeader>
        <TooltipHeader duration={duration} value={label} />
      </ChartTooltipHeader>
      <ChartTooltipItemsContainer>
        {(() => {
          // We can't use the default itemSorter method because it's a custom tooltip.
          // Sort the payload here instead
          const sortedPayload = [...payload].sort((a, b) => {
            const aValue = a.value;
            const bValue = b.value;

            if (aValue >= 0 && bValue >= 0) {
              return bValue - aValue; // Higher positive values first
            }
            if (aValue < 0 && bValue < 0) {
              return bValue - aValue; // Lower negative values first
            }
            return bValue - aValue; // Positives before negatives
          });

          // Find the transition point between positive and negative values
          const separatorIndex = sortedPayload.findIndex(
            (entry) => entry.value < 0,
          );
          const hasBothPositiveAndNegative =
            separatorIndex > 0 && separatorIndex < sortedPayload.length;

          return sortedPayload.map((entry, index) => {
            const legendIcon = (
              <LegendShape
                color={entry.color}
                shape="line"
                chartColors={{ [entry.color]: entry.color }}
              />
            );

            const isHovered = entry.name === hoveredValue;

            const formattedValue = !Number.isFinite(entry.value)
              ? '-'
              : `${entry.value.toFixed(2)}${unitLabel ? ` ${unitLabel}` : ''}`;

            return (
              <React.Fragment key={index}>
                {/* Add separator between positive and negative values for symmetrical charts */}
                {isSymmetrical &&
                  hasBothPositiveAndNegative &&
                  index === separatorIndex && <ChartTooltipSeparator />}
                <ChartTooltipItem
                  label={entry.name}
                  value={formattedValue}
                  legendIcon={legendIcon}
                  isHovered={isHovered}
                />
              </React.Fragment>
            );
          });
        })()}
      </ChartTooltipItemsContainer>
    </>
  );

  return (
    <ChartTooltipPortal
      coordinate={coordinate}
      chartContainerRef={chartContainerRef}
      isVisible={active && isChartActive}
    >
      {tooltipContent}
    </ChartTooltipPortal>
  );
};

const isSymmetricalSeries = (
  series: Serie[] | { above: Serie[] | undefined; below: Serie[] | undefined },
): series is { above: Serie[]; below: Serie[] } => {
  return 'above' in series && 'below' in series;
};

/**
 * Props for LineTimeSerieChart component
 * @param series - The data series to display
 * @param title - The title of the chart
 * @param height - The height of the chart in pixels
 * @param startingTimeStamp - Starting timestamp in seconds
 * @param interval - Interval between data points in seconds
 * @param duration - Total duration of the chart in seconds
 *
 */
export function LineTimeSerieChart({
  series,
  title,
  height,
  startingTimeStamp,
  interval,
  duration,
  unitRange,
  isLoading = false,
  timeFormat = 'date-time',
  yAxisType = 'default',
  yAxisTitle,
  helpText,
  syncId,
  renderTooltip,
  ...rest
}: LineChartProps) {
  const theme = useTheme();
  const { getColor, selectedResources } = useChartLegend();
  const chartRef = useRef(null);

  const [isChartActive, setIsChartActive] = useState(false);
  const [hoveredValue, setHoveredValue] = useState<string | undefined>(
    undefined,
  );
  const chartData = useMemo(() => {
    // Guard against empty/undefined series data
    if (!series || (Array.isArray(series) && series.length === 0)) {
      return [];
    }

    // Handle symmetrical series with empty above/below arrays
    if (isSymmetricalSeries(series)) {
      if (
        (!series.above || series.above.length === 0) &&
        (!series.below || series.below.length === 0)
      ) {
        return [];
      }
    }

    // 1. Add missing data points
    const normalizedSeries =
      yAxisType === 'symmetrical' && isSymmetricalSeries(series)
        ? {
            above: series.above
              ? series.above.map((line) => ({
                  ...line,
                  data: addMissingDataPoint(
                    line.data,
                    startingTimeStamp,
                    duration,
                    interval,
                  ),
                }))
              : [],
            // Convert positive values to negative values
            below: series.below
              ? series.below.map((line) => ({
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

    // 2. Convert directly to Recharts format
    // Initialize an object to hold data points by timestamp
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
        // Initialize this timestamp if it doesn't exist
        if (!dataPointsByTime[timestamp]) {
          dataPointsByTime[timestamp] = { timestamp };
        }
        // Add this metric's value to the data point, and convert the value to a number if it's a string
        dataPointsByTime[timestamp][label] =
          typeof value === 'string' ? Number(value) : value;
      });
    });
    // Convert object to array for Recharts
    return Object.values(dataPointsByTime).sort(
      (
        a: { timestamp: number } & Record<string, number | null>,
        b: { timestamp: number } & Record<string, number | null>,
      ) => (a.timestamp as number) - (b.timestamp as number),
    );
  }, [series, startingTimeStamp, duration, interval, yAxisType]);

  // Calculate evenly spaced ticks that avoid the very beginning and end
  const xAxisTicks = useMemo(() => {
    if (!chartData || chartData.length === 0) return [];

    const timestamps: number[] = chartData.map((d) => d.timestamp);
    const minTimestamp = Math.min(...timestamps);
    const maxTimestamp = Math.max(...timestamps);

    const timeRange = maxTimestamp - minTimestamp;
    // Add padding to avoid labels at the very edges (10% padding on each side)
    const padding = timeRange * 0.1;
    const paddedStart = minTimestamp + padding;
    const paddedEnd = maxTimestamp - padding;
    const paddedRange = paddedEnd - paddedStart;

    // Create 5 evenly spaced ticks within the padded range
    const numTicks = 5;
    const tickInterval = paddedRange / (numTicks - 1);

    const evenlySpacedTicks = Array.from(
      { length: numTicks },
      (_, index) => paddedStart + index * tickInterval,
    );

    return evenlySpacedTicks;
  }, [chartData]);

  // 3. Transform the data base on the valuebase
  const { topValue, unitLabel, rechartsData, topDomain } = useMemo(() => {
    const values = chartData.flatMap((dataPoint) =>
      Object.entries(dataPoint)
        .filter(([key]) => key !== 'timestamp')
        .map(([_, value]) => {
          if (value === null || value === undefined) return null;
          const num = typeof value === 'string' ? Number(value) : value;
          return !isNaN(num) ? num : null;
        })
        .filter((value): value is number => value !== null),
    );

    // Guard against empty values array
    if (values.length === 0) {
      return {
        topValue: 100, // Default value for empty charts
        unitLabel: yAxisType === 'percentage' ? '%' : undefined,
        rechartsData: [],
        topDomain: 100,
      };
    }

    const top = Math.abs(Math.max(...values));
    const bottom = Math.abs(Math.min(...values));
    const maxValue = Math.max(top, bottom);

    // Use shared normalization function
    const result = normalizeChartDataWithUnits(
      chartData,
      maxValue,
      unitRange,
      'timestamp', // LineTimeSerieChart uses 'timestamp' as the key to exclude
    );

    return {
      topValue: result.topValue,
      unitLabel: result.unitLabel ?? (yAxisType === 'percentage' ? '%' : undefined),
      rechartsData: result.rechartsData,
      topDomain: result.topDomain,
    };
  }, [chartData, yAxisType, unitRange]);

  // Group series by resource and create color mapping
  const { colorMapping, groupedSeries } = useMemo(() => {
    const mapping: Record<string, string> = {};

    // Guard against empty/undefined series
    if (!series) {
      return { colorMapping: mapping, groupedSeries: {} };
    }

    const allSeries = isSymmetricalSeries(series)
      ? [...(series.above || []), ...(series.below || [])]
      : (series as Serie[]);

    // Group series by resource
    const groups = allSeries
      .filter((serie) => selectedResources.includes(serie.resource))
      .reduce(
        (acc, serie) => {
          const key = serie.resource;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(serie);
          return acc;
        },
        {} as Record<string, Serie[]>,
      );

    // Get colors from the ChartLegend context
    Object.keys(groups).forEach((resource) => {
      const color = getColor(resource);
      if (color) {
        mapping[resource] = color;
      } else {
        console.warn(`Color not defined for resource: ${resource}`);
      }
    });

    return {
      colorMapping: mapping,
      groupedSeries: groups,
    };
  }, [series, getColor, selectedResources]);

  // Format time for display the tick in the x axis
  const formatXAxisLabelCallback = useCallback(
    (timestamp: number) => formatXAxisLabel(timestamp, duration),
    [duration],
  );

  return (
    <LineTemporalChartWrapper>
      <Stack gap="r4">
        <ChartTitleText>
          {title} {unitLabel && `(${unitLabel})`}
        </ChartTitleText>
        {helpText && (
          <IconHelp tooltipMessage={helpText} overlayStyle={maxWidthTooltip} />
        )}
        {isLoading && <Loader />}
      </Stack>
      <div
        onFocus={() => setIsChartActive(true)}
        onBlur={() => setIsChartActive(false)}
        onFocusCapture={() => setIsChartActive(true)}
        onBlurCapture={() => setIsChartActive(false)}
      >
        <StyledResponsiveContainer width="100%" height={height}>
          <LineChart
            data={rechartsData}
            ref={chartRef}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            aria-label={`Time series chart for ${title}`}
            syncId={syncId}
            onMouseEnter={() => setIsChartActive(true)}
            onMouseLeave={() => setIsChartActive(false)}
            accessibilityLayer
          >
            <CartesianGrid
              vertical={true}
              horizontal={true}
              verticalPoints={[0]}
              horizontalPoints={[0]}
              stroke={theme.border}
              fill={theme.backgroundLevel4}
              strokeWidth={1}
            />
            <XAxis
              dataKey="timestamp"
              type="number"
              domain={['dataMin', 'dataMax']}
              ticks={xAxisTicks}
              tickFormatter={formatXAxisLabelCallback}
              tickCount={5}
              tick={{
                fill: theme.textSecondary,
                fontSize: fontSize.smaller,
              }}
              axisLine={{ stroke: theme.border }}
            />
            <YAxis
              orientation="right"
              label={{
                value: yAxisTitle,
                angle: 90,
                dx: 20,
                style: {
                  fill: theme.textSecondary,
                  fontSize: fontSize.smaller,
                },
              }}
              domain={
                yAxisType === 'symmetrical'
                  ? [-topDomain, topDomain]
                  : [0, topDomain]
              }
              axisLine={{ stroke: theme.border }}
              tick={{
                fill: theme.textSecondary,
                fontSize: fontSize.smaller,
              }}
              tickFormatter={(value) => formatToISONumber(value)}
              ticks={getTicks(topValue, yAxisType === 'symmetrical')}
              interval={0}
            />
            <Tooltip
              content={(props: TooltipContentProps<number, string>) => (
                <LineTimeSerieChartTooltip
                  unitLabel={unitLabel}
                  duration={duration}
                  renderTooltip={renderTooltip}
                  isSymmetrical={yAxisType === 'symmetrical'}
                  tooltipProps={props}
                  isChartActive={isChartActive}
                  hoveredValue={hoveredValue}
                  chartContainerRef={chartRef}
                />
              )}
            />
            {/* Add horizontal line at y=0 for symmetrical charts */}
            {yAxisType === 'symmetrical' && (
              <ReferenceLine y={0} stroke={theme.border} />
            )}

            {/* Chart lines */}
            {Object.entries(groupedSeries).map(([resource, resourceSeries]) =>
              resourceSeries.map((serie, serieIndex) => {
                const label = serie.getTooltipLabel(
                  serie.metricPrefix,
                  serie.resource,
                );
                return (
                  <Line
                    key={`${title}-${resource}-${serieIndex}`}
                    type="monotone"
                    dataKey={label}
                    stroke={colorMapping[resource]}
                    dot={false}
                    isAnimationActive={false}
                    strokeDasharray={serie.isLineDashed ? '4 4' : undefined}
                    onMouseEnter={() => setHoveredValue(label)}
                    onMouseLeave={() => setHoveredValue(undefined)}
                  />
                );
              }),
            )}
          </LineChart>
        </StyledResponsiveContainer>
      </div>
    </LineTemporalChartWrapper>
  );
}
