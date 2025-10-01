import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  TooltipContentProps,
  XAxis,
  YAxis,
} from 'recharts';
import { useCallback, useMemo, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { spacing } from '../../spacing';
import { fontSize } from '../../style/theme';
import { Box } from '../box/Box';
import { useChartLegend } from '../chartlegend/ChartLegendWrapper';
import { FormattedDateTime } from '../date/FormattedDateTime';
import { Icon } from '../icon/Icon.component';
import {
  addMissingDataPoint,
  getUnitLabel,
} from '../linetemporalchart/ChartUtil';
import { Loader } from '../loader/Loader.component';
import { ChartTitleText, SmallerText } from '../text/Text.component';
import { Tooltip as TooltipComponent } from '../tooltip/Tooltip.component';
import { formatXAxisLabel } from './utils';
import {
  ChartTooltipContainer,
  ChartTooltipItem,
  ChartTooltipHeader,
  ChartTooltipItemsContainer,
} from '../charttooltip/ChartTooltip';
import { LegendShape } from '../chartlegend/ChartLegend';
import { StyledResponsiveContainer } from '../barchartv2/Barchart.component';

const LineTemporalChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
  gap: ${spacing.r8};
`;

const ChartHeader = styled.div`
  display: flex;
  align-items: center;
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
    timeFormat?: 'date-time' | 'date',
  ) => React.ReactNode;
};

const LineTimeSerieChartTooltip = ({
  unitLabel,
  timeFormat,
  isChartActive,
  tooltipProps,
  renderTooltip,
  hoveredValue,
}: {
  tooltipProps: TooltipContentProps<number, string>;
  unitLabel?: string;
  timeFormat?: 'date-time' | 'date';
  isChartActive?: boolean;
  renderTooltip?: (
    tooltipProps: TooltipContentProps<number, string>,
    unitLabel?: string,
    timeFormat?: 'date-time' | 'date',
  ) => React.ReactNode;
  hoveredValue?: string;
}) => {
  const { active, payload, label } = tooltipProps;

  if (!active || !payload || !payload.length || !label || !isChartActive)
    return null;

  if (renderTooltip) {
    return renderTooltip(tooltipProps, unitLabel, timeFormat);
  }
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

  return (
    <ChartTooltipContainer>
      <ChartTooltipHeader>
        <FormattedDateTime
          format={
            timeFormat === 'date-time'
              ? 'day-month-abbreviated-hour-minute-second'
              : 'long-date-without-weekday'
          }
          value={new Date(label)}
        />
      </ChartTooltipHeader>
      <ChartTooltipItemsContainer>
        {sortedPayload.map((entry, index) => {
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
            : `${entry.value.toFixed(2)} ${unitLabel}`;

          return (
            <ChartTooltipItem
              key={index}
              label={entry.name}
              value={formattedValue}
              legendIcon={legendIcon}
              isHovered={isHovered}
            />
          );
        })}
      </ChartTooltipItemsContainer>
    </ChartTooltipContainer>
  );
};

const isSymmetricalSeries = (
  series: Serie[] | { above: Serie[] | undefined; below: Serie[] | undefined },
): series is { above: Serie[]; below: Serie[] } => {
  return 'above' in series && 'below' in series;
};

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
  const { topValue, unitLabel, rechartsData } = useMemo(() => {
    if (yAxisType === 'percentage')
      return {
        topValue: 100,
        unitLabel: '%',
        rechartsData: chartData,
      };

    const values = chartData.flatMap((dataPoint) =>
      Object.entries(dataPoint)
        .filter(([key]) => key !== 'timestamp')
        .map(([_, value]) => {
          const num =
            typeof value === 'string' ? Number(value) : (value ?? Infinity);
          return !isNaN(num) && num !== null ? num : null;
        })
        .filter((value): value is number => value !== null),
    );

    // Guard against empty values array
    if (values.length === 0) {
      return {
        topValue: 100, // Default value for empty charts
        unitLabel: '',
        rechartsData: [],
      };
    }

    const top = Math.abs(Math.max(...values));
    const bottom = Math.abs(Math.min(...values));
    const maxValue = Math.max(top, bottom);

    const { valueBase, unitLabel } = getUnitLabel(unitRange ?? [], maxValue);

    const topValue = Math.ceil(maxValue / valueBase / 10) * 10;

    const rechartsData = chartData.map((dataPoint) => {
      const normalizedDataPoint = { ...dataPoint };
      Object.entries(dataPoint).forEach(([key, value]) => {
        if (key !== 'timestamp' && typeof value === 'number') {
          normalizedDataPoint[key] = value / valueBase;
        }
      });
      return normalizedDataPoint;
    });

    return { topValue, unitLabel, rechartsData };
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
    (timestamp: number) => formatXAxisLabel(timestamp, timeFormat, chartData),
    [timeFormat, chartData],
  );

  return (
    <LineTemporalChartWrapper>
      <ChartHeader>
        <ChartTitleText>
          {title} {unitLabel && `(${unitLabel})`}
        </ChartTitleText>
        {helpText && (
          <Box ml={spacing.r4}>
            <TooltipComponent
              placement={'right'}
              overlay={<SmallerText>{helpText}</SmallerText>}
            >
              <Icon name="Info" color={theme.buttonSecondary} />
            </TooltipComponent>
          </Box>
        )}
        {isLoading && <Loader />}
      </ChartHeader>
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
                position: 'insideRight',
                style: {
                  textAnchor: 'middle',
                  fill: theme.textSecondary,
                  fontSize: fontSize.smaller,
                },
              }}
              domain={
                yAxisType === 'percentage'
                  ? [0, 100]
                  : yAxisType === 'symmetrical'
                    ? [-topValue, topValue]
                    : [0, topValue]
              }
              axisLine={{ stroke: theme.border }}
              tick={{
                fill: theme.textSecondary,
                fontSize: fontSize.smaller,
              }}
              tickFormatter={(value) =>
                new Intl.NumberFormat('fr-FR').format(value.toFixed(0))
              }
              tickCount={5}
              interval={0}
            />
            <Tooltip
              content={(props: TooltipContentProps<number, string>) => (
                <LineTimeSerieChartTooltip
                  unitLabel={unitLabel}
                  timeFormat={timeFormat}
                  renderTooltip={renderTooltip}
                  tooltipProps={props}
                  isChartActive={isChartActive}
                  hoveredValue={hoveredValue}
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
