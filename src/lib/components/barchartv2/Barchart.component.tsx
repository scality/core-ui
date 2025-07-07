import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { ConstrainedText } from '../constrainedtext/Constrainedtext.component';
import { spacing } from '../../spacing';
import { useTheme } from 'styled-components';
import { DAY_MONTH_FORMATER } from '../date/FormattedDateTime';

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
 * @param type - The chart type (category or time)
 * @returns Recharts data format
 * @example
 * // Category data
 * const bars = [
 *   { label: 'Success', data: [['category1', 2], ['category2', 4], ['category3', 6]], color: 'green' },
 *   { label: 'Failed', data: [['category1', 8], ['category2', 10], ['category3', 12]], color: 'red' },
 * ];
 * const result = formatPrometheusDataToChartData(bars, 'category');
 * result.data = [
 *   { category: 'category1', success: 2, failed: 8 },
 *   { category: 'category2', success: 4, failed: 10 },
 *   { category: 'category3', success: 6, failed: 12 },
 * ];
 *
 * // Time data
 * const bars = [
 *   { label: 'Success', data: [[timestamp, 2], [timestamp, 1]], color: 'green' },
 *   { label: 'Failed', data: [[timestamp, 3], [timestamp, 0]], color: 'red' },
 * ];
 * const result = formatPrometheusDataToChartData(bars, { type: 'time', timeRange: {...} });
 * result.data = [
 *   { category: 'Mon Jan 01', success: 2, failed: 3 },
 *   { category: 'Tue Jan 02', success: 1, failed: 0 },
 * ];
 */
export const formatPrometheusDataToChartData = (
  bars: BarchartProps['bars'],
  type: BarchartProps['type'],
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

  const formatCategory = (key: string | number): string => {
    if (type === 'category') {
      return String(key);
    } else if (type.type === 'time') {
      return DAY_MONTH_FORMATER.format(new Date(key as number)).replace(
        /[ ,]/g,
        '',
      );
    }
    return String(key);
  };

  bars.forEach((bar) => {
    const dataKey = bar.label.toLowerCase().replace(/\s+/g, '');

    bar.data.forEach(([key, value]) => {
      const category = formatCategory(key);

      if (!categoryMap.has(category)) {
        categoryMap.set(category, { category });
      }

      const existingData = categoryMap.get(category)!;
      existingData[dataKey] = value;
    });
  });

  const data = Array.from(categoryMap.values());

  return {
    rechartsBars,
    data,
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
  const { data, rechartsBars } = formatPrometheusDataToChartData(bars, type);

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
