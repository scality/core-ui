import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { ConstrainedText } from '../constrainedtext/Constrainedtext.component';
import { spacing } from '../../spacing';
import { useTheme } from 'styled-components';

type TimeType = {
  type: 'time';
  timeRange: {
    startTimestamp: number;
    endTimestamp: number;
  };
};
type Point = {
  key: string | number;
  values: { label: string; value: number }[];
};

type UnitRange = {
  threshold: number;
  label: string;
}[];

export type BarchartProps = {
  type: 'category' | TimeType;
  bars: {
    label: string;
    data: [number | string, number | string][];
    color: string;
  }[];
  tooltip?: (currentPoint: {
    key: string | number;
    values: { label: string; value: number; isHovered: boolean }[];
  }) => React.ReactNode;
  defaultSort?: (pointA: Point, pointB: Point) => 1 | -1 | 0;

  unitRange?: UnitRange;
  helpTooltip?: string;
  stacked?: boolean;
  title?: string;
  secondaryTitle?: string;
  rightTitle?: React.ReactNode;
  height?: number;
  loading?: boolean;
};

/**
 * Converts prometheus data to recharts data format
 * @param bars - The bars to convert
 * @returns Recharts data format
 * @example
 * const bars = [
 *   { label: 'Success', data: [['category1', 2], ['category2', 4], ['category3', 6]], color: 'green' },
 *   { label: 'Failed', data: [['category1', 8], ['category2', 10], ['category3', 12]], color: 'red' },
 * ];
 * const result= prometheusDataToChartData(bars);
 * result.data = [
 *   { category: 'category1', success: 2, failed: 8 },
 *   { category: 'category2', success: 4, failed: 10 },
 *   { category: 'category3', success: 6, failed: 12 },
 * ];
 * result.rechartsBars = [{
 *   dataKey: 'success',
 *   color: 'green',
 * }, {
 *   dataKey: 'failed',
 *   color: 'red',
 * }]
 *
 *
 */
export const formatPrometheusDataToChartData = (
  bars: BarchartProps['bars'],
): {
  data: {
    [key: string]: string | number;
  }[];
  rechartsBars: {
    dataKey: string;
    fill: string;
  }[];
} => {
  const rechartsBars = bars.map((bar) => ({
    dataKey: bar.label.toLowerCase().replace(/\s+/g, ''),
    fill: bar.color,
  }));

  // Create a map to collect all unique categories/keys
  const categoryMap = new Map<
    string | number,
    { [key: string]: string | number }
  >();

  bars.forEach((bar) => {
    const dataKey = bar.label.toLowerCase().replace(/\s+/g, '');

    bar.data.forEach(([category, value]) => {
      if (!categoryMap.has(category)) {
        categoryMap.set(category, { category });
      }

      const existingData = categoryMap.get(category)!;
      existingData[dataKey] = value;
    });
  });

  // Convert map to array
  const data = Array.from(categoryMap.values());

  return {
    rechartsBars,
    data,
  };
};
/**
 * Converts prometheus data to recharts data format
 * @param bars - The bars to convert
 * @returns Recharts data format
 * @example
 * const bars = [
 *   { label: 'Success', data: [[timestamp, 2], [timestamp, 1], [timestamp, 0], [timestamp, 1], [timestamp, 2], ...], color: 'green' },
 *   { label: 'Failed', data: [[timestamp, 3], [timestamp, 0], [timestamp, 1], [timestamp, 2], [timestamp, 3], ...], color: 'red' },
 * ];
 * const result= formatTimeDataToChartData(bars, {
 *   startTimestamp: 1715145600000,
 *   endTimestamp: 1715750400000,
 * });
 * result.data = [
 *   { category: 'Mon01Sep', success: 2, failed: 8 },
 *   { category: 'Tue02Sep', success: 4, failed: 10 },
 *   { category: 'Wed03Sep', success: 6, failed: 12 },
 *   { category: 'Thu04Sep', success: 8, failed: 14 },
 *   { category: 'Fri05Sep', success: 10, failed: 16 },
 *   { category: 'Sat06Sep', success: 12, failed: 18 },
 *   { category: 'Sun07Sep', success: 14, failed: 20 },
 * ];
 * result.rechartsBars = [{
 *   dataKey: 'success',
 *   color: 'green',
 * }, {
 *   dataKey: 'failed',
 *   color: 'red',
 * }]
 *
 *
 */
export const formatTimeDataToChartData = (
  bars: BarchartProps['bars'],
  timeRange: {
    startTimestamp: number;
    endTimestamp: number;
  },
): {
  data: {
    category: string;
    [key: string]: string | number;
  }[];
  rechartsBars: {
    dataKey: string;
    fill: string;
  }[];
} => {
  const rechartsBars = bars.map((bar) => ({
    dataKey: bar.label.toLowerCase().replace(/\s+/g, ''),
    fill: bar.color,
  }));

  // Create a map to collect data by day
  const dayMap = new Map<
    string,
    { category: string; [key: string]: string | number }
  >();

  // Helper function to format timestamp to day key and category label
  const formatTimestampToDay = (timestamp: number) => {
    const date = new Date(timestamp);
    const dayKey = date.toISOString().split('T')[0]; // YYYY-MM-DD format for grouping
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const dayName = dayNames[date.getDay()];
    const dayNumber = date.getDate().toString().padStart(2, '0');
    const monthName = monthNames[date.getMonth()];

    return {
      dayKey,
      category: `${dayName}${dayNumber}${monthName}`,
    };
  };

  // Process each bar's data
  bars.forEach((bar) => {
    const dataKey = bar.label.toLowerCase().replace(/\s+/g, '');

    bar.data.forEach(([timestamp, value]) => {
      const { dayKey, category } = formatTimestampToDay(timestamp as number);

      if (!dayMap.has(dayKey)) {
        dayMap.set(dayKey, { category });
      }

      const existingData = dayMap.get(dayKey)!;
      // Set value for the day (no summing needed since there's only one per day)
      existingData[dataKey] = value;
    });
  });

  // Convert map to array and sort by date
  const data = Array.from(dayMap.entries())
    .sort(([a], [b]) => a.localeCompare(b)) // Sort by dayKey (YYYY-MM-DD)
    .map(([, dayData]) => dayData);

  return {
    data,
    rechartsBars,
  };
};

const CHART_CONSTANTS = {
  TICK_WIDTH_OFFSET: 5,
} as const;
interface CustomTickProps {
  x: number;
  y: number;
  payload: {
    value: string | number;
  };
  visibleTicksCount: number;
  width: number;
}

const CustomTick = ({
  x,
  y,
  payload,
  visibleTicksCount,
  width,
}: CustomTickProps) => {
  const theme = useTheme();

  const tickWidth =
    width / visibleTicksCount - CHART_CONSTANTS.TICK_WIDTH_OFFSET;
  const centerX = x - tickWidth / 2;

  return (
    <foreignObject
      x={centerX}
      y={y}
      width={tickWidth}
      color={theme.textSecondary}
      overflow="visible"
    >
      <ConstrainedText
        text={String(payload.value)}
        centered
        tooltipStyle={{
          backgroundColor: theme.backgroundLevel1,
          padding: spacing.r10,
          borderRadius: spacing.r8,
          border: `1px solid ${theme.border}`,
          position: 'absolute',
        }}
      />
    </foreignObject>
  );
};
const Barchart = (props: BarchartProps) => {
  const { height = 300, bars, type = 'category' } = props;
  const theme = useTheme();
  const { data, rechartsBars } =
    type === 'category'
      ? formatPrometheusDataToChartData(bars)
      : type.type === 'time'
        ? formatTimeDataToChartData(bars, type.timeRange)
        : { data: [], rechartsBars: [] };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        {rechartsBars.map((bar) => (
          <Bar key={bar.dataKey} dataKey={bar.dataKey} fill={bar.fill} />
        ))}

        <YAxis
          tickCount={1}
          tickFormatter={(value) => value.toFixed(0)}
          axisLine={false}
          tick={{
            fill: theme.textSecondary,
          }}
          tickLine={false}
          label={{
            fill: theme.textSecondary,
          }}
          orientation="right"
        />

        <XAxis
          dataKey="category"
          tick={(props) => <CustomTick {...props} />}
          type="category"
          interval={0}
          tickLine={{
            stroke: theme.textSecondary,
          }}
          axisLine={{
            stroke: theme.textSecondary,
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Barchart;
