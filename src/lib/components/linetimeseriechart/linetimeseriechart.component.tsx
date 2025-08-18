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
import { useMemo, useRef } from 'react';
import { useTheme } from 'styled-components';
import { useMetricsTimeSpan } from '../linetemporalchart/MetricTimespanProvider';
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
import {
  DAY_MONTH_ABBREVIATED_HOUR_MINUTE,
  FormattedDateTime,
} from '../date/FormattedDateTime';

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
`;

const TooltipLegend = styled.div<{ color: string }>`
  width: 12px;
  height: 3px;
  background-color: ${(props) => props.color};
  margin-right: 8px;
  flex-shrink: 0;
  margin-top: 8px;
`;

const TooltipContent = styled.div`
  display: flex;
  min-width: 0;
  flex: 1;
`;

const TooltipName = styled.div`
  margin-right: 4px;
  word-wrap: break-word;
  word-break: break-word;
  justify-content: flex-start;
`;

const TooltipInstanceValue = styled.div`
  justify-content: flex-end;
`;

export type Serie = {
  // the name of the resource
  resource: string;
  // the original data format from prometheus
  data: [number, string | null][];
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
  unitRange?: {
    threshold: number;
    label: string;
  }[];
  isLoading?: boolean;
  yAxisTitle?: string;
  helpText?: string;
};

const CustomTooltip = ({
  active,
  payload,
  label,
  unitLabel,
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
          format="day-month-abbreviated-hour-minute-second"
          value={new Date(label)}
        />
      </TooltipTime>
      {sortedPayload.map((entry, index) => (
        <TooltipValue key={index}>
          <TooltipLegend color={entry.color} />
          <TooltipContent>
            <TooltipName>{entry.name}</TooltipName>
            <TooltipInstanceValue>
              {isNaN(Number(entry.value))
                ? '-'
                : `${Number(entry.value).toFixed(2)}${unitLabel}`}
            </TooltipInstanceValue>
          </TooltipContent>
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
  unitRange,
  isLoading = false,
  yAxisType = 'default',
  yAxisTitle,
  helpText,
  ...rest
}: LineChartProps) {
  const theme = useTheme();
  const { frequency, duration } = useMetricsTimeSpan();
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
                frequency,
              ),
            })),
            // Convert positive values to negative values
            below: series.below.map((line) => ({
              ...line,
              data: addMissingDataPoint(
                line.data,
                startingTimeStamp,
                duration,
                frequency,
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
              frequency,
            ),
          }));

    // 2. Convert directly to Recharts format
    // Initialize an object to hold data points by timestamp
    const dataPointsByTime: Record<
      number,
      { timestamp: number } & Record<string, string | number | null>
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
        a: { timestamp: number } & Record<string, string | number | null>,
        b: { timestamp: number } & Record<string, string | number | null>,
      ) => (a.timestamp as number) - (b.timestamp as number),
    );
  }, [series, startingTimeStamp, duration, frequency, yAxisType]);

  // Calculate 5 perfectly evenly spaced ticks
  const xAxisTicks = useMemo(() => {
    if (!chartData || chartData.length === 0) return [];

    const timestamps: number[] = chartData.map((d) => d.timestamp);
    const minTimestamp = Math.min(...timestamps);
    const maxTimestamp = Math.max(...timestamps);

    // Calculate 5 perfectly evenly spaced ticks
    const timeRange = maxTimestamp - minTimestamp;
    const interval = timeRange / 4; // 4 intervals create 5 points

    const exactEvenTicks = [
      minTimestamp,
      minTimestamp + interval,
      minTimestamp + interval * 2,
      minTimestamp + interval * 3,
      maxTimestamp,
    ];

    // Return perfectly even ticks (guaranteed to be evenly divided)
    return exactEvenTicks;
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
  const formatTime = useMemo(
    () => (timestamp: number) => {
      const date = new Date(timestamp);
      return DAY_MONTH_ABBREVIATED_HOUR_MINUTE.format(date).replace(',', '');
    },
    [],
  );

  return (
    <LineTemporalChartWrapper>
      <ChartHeader>
        <ChartTitleText>
          {title} {unitLabel && `(${unitLabel})`}
        </ChartTitleText>
        {helpText && (
          <TooltipComponent
            placement={'right'}
            overlay={<SmallerText>{helpText}</SmallerText>}
          >
            <Icon name="Info" color={theme.buttonSecondary} />
          </TooltipComponent>
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
            tickFormatter={formatTime}
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
          />
          <Tooltip content={<CustomTooltip unitLabel={unitLabel} />} />
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
                />
              );
            }),
          )}
        </LineChart>
      </ResponsiveContainer>
    </LineTemporalChartWrapper>
  );
}
