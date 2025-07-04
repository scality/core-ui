import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

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
const formatPrometheusDataToChartData = (
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

const Barchart = (props: BarchartProps) => {
  const { height = 300, bars } = props;

  const { data, rechartsBars } = formatPrometheusDataToChartData(bars);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        {rechartsBars.map((bar) => (
          <Bar key={bar.dataKey} dataKey={bar.dataKey} fill={bar.fill} />
        ))}
        <XAxis dataKey="category" />
        <YAxis />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Barchart;
