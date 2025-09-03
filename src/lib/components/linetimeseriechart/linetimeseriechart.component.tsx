import {
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { useCallback, useMemo, useRef } from 'react';
import { useTheme } from 'styled-components';
import { addMissingDataPoint } from '../linetemporalchart/ChartUtil';
import styled from 'styled-components';
import { fontSize, fontWeight } from '../../style/theme';
import { useChartLegend } from '../chartlegend/ChartLegendWrapper';
import { ChartTitleText, SmallerText } from '../text/Text.component';
import { Loader } from '../loader/Loader.component';
import { spacing } from '../../spacing';
import { getUnitLabel } from '../linetemporalchart/ChartUtil';
import { Icon } from '../icon/Icon.component';
import { Tooltip as TooltipComponent } from '../tooltip/Tooltip.component';
import { FormattedDateTime } from '../date/FormattedDateTime';
import { Box } from '../box/Box';
import { formatXAxisLabel } from './utils';

const LineTemporalChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
`;

const ChartHeader = styled.div`
  display: flex;
  align-items: center;
`;

const TooltipContainer = styled.div`
  background-color: ${(props) => props.theme.backgroundLevel1};
  padding: ${spacing.r8};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 250px;
`;

const TooltipTime = styled.div`
  margin-bottom: ${spacing.r8};
  color: ${(props) => props.theme.textPrimary};
  font-size: ${fontSize.smaller};
  font-weight: ${fontWeight.bold};
  text-align: center;
`;

const TooltipValue = styled.div`
  font-size: ${fontSize.smaller};
  margin-top: 4px;
  color: ${(props) => props.theme.textSecondary};
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
`;

const TooltipLegend = styled.div<{ color: string }>`
  width: 12px;
  height: 3px;
  background-color: ${(props) => props.color};
  margin-right: 8px;
  flex-shrink: 0;
  margin-top: 8px;
`;

const TooltipLeftGroup = styled.div`
  display: flex;
  align-items: flex-start;
  min-width: 0;
  flex: 1;
`;

const TooltipName = styled.div`
  word-wrap: break-word;
  word-break: break-word;
  flex: 1;
`;

const TooltipInstanceValue = styled.div`
  margin-left: 16px;
  flex-shrink: 0;
  text-align: right;
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
  series: Serie[];
};

// The symmetrical chart props are used to display two series on the same chart, such as in/out, write/read
type SymmetricalChartSerie = {
  yAxisType: 'symmetrical';
  series: {
    above: Serie[];
    below: Serie[];
  };
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
  isLoading?: boolean;
  /**
   * The format of the x axis, default is 'date-time' which is like 01 Sep 16:00
   * If you want to display the date only, you can set it to 'date' which is like 2025-09-01
   * This will affect the format of the tooltip as well
   */
  timeFormat?: 'date-time' | 'date';
  yAxisTitle?: string;
  helpText?: string;
};

const CustomTooltip = ({
  active,
  payload,
  label,
  unitLabel,
  timeFormat,
}: {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
    dataKey: string;
  }>;
  label?: string;
  unitLabel?: string;
  timeFormat?: 'date-time' | 'date';
}) => {
  if (!active || !payload || !payload.length || !label) return null;
  // We can't use the default itemSorter method because it's a custom tooltip.
  // Sort the payload here instead
  const sortedPayload = [...payload].sort((a, b) => {
    const aValue = Number(a.value);
    const bValue = Number(b.value);

    if (aValue >= 0 && bValue >= 0) {
      return bValue - aValue; // Higher positive values first
    }
    if (aValue < 0 && bValue < 0) {
      return bValue - aValue; // Lower negative values first
    }
    return bValue - aValue; // Positives before negatives
  });

  return (
    <TooltipContainer>
      <TooltipTime>
        <FormattedDateTime
          format={
            timeFormat === 'date-time'
              ? 'day-month-abbreviated-hour-minute-second'
              : 'long-date'
          }
          value={new Date(label)}
        />
      </TooltipTime>
      {sortedPayload.map((entry, index) => (
        <TooltipValue key={index}>
          <TooltipLeftGroup>
            <TooltipLegend color={entry.color} />
            <TooltipName>{entry.name}</TooltipName>
          </TooltipLeftGroup>
          <TooltipInstanceValue>
            {isNaN(Number(entry.value))
              ? '-'
              : `${Number(entry.value).toFixed(2)} ${unitLabel}`}
          </TooltipInstanceValue>
        </TooltipValue>
      ))}
    </TooltipContainer>
  );
};

const isSymmetricalSeries = (
  series: Serie[] | { above: Serie[]; below: Serie[] },
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
  ...rest
}: LineChartProps) {
  const theme = useTheme();
  const { getColor } = useChartLegend();
  const chartRef = useRef(null);

  const chartData = useMemo(() => {
    // 1. Add missing data points
    const normalizedSeries =
      yAxisType === 'symmetrical' && isSymmetricalSeries(series)
        ? {
            above: series.above.map((line) => ({
              ...line,
              data: addMissingDataPoint(
                line.data,
                startingTimeStamp,
                duration,
                interval,
              ),
            })),
            // Convert positive values to negative values
            below: series.below.map((line) => ({
              ...line,
              data: addMissingDataPoint(
                line.data,
                startingTimeStamp,
                duration,
                interval,
              ).map(
                ([timestamp, value]) =>
                  [timestamp, value === null ? null : `-${Number(value)}`] as [
                    number,
                    string | null,
                  ],
              ),
            })),
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
    const allSeries = isSymmetricalSeries(series)
      ? [...series.above, ...series.below]
      : (series as Serie[]);

    // Group series by resource
    const groups = allSeries.reduce(
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
  }, [series, getColor]);

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
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={rechartsData}
          ref={chartRef}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          aria-label={`Time series chart for ${title}`}
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
            allowDataOverflow={false}
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
            tickFormatter={(value) => Math.round(value).toString()}
            tickCount={5}
            interval={'preserveStartEnd'}
          />
          <Tooltip
            content={
              <CustomTooltip unitLabel={unitLabel} timeFormat={timeFormat} />
            }
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
                />
              );
            }),
          )}
        </LineChart>
      </ResponsiveContainer>
    </LineTemporalChartWrapper>
  );
}
