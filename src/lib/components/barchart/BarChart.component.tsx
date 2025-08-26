import { VegaChart } from '../vegachartv2/VegaChartV2.component';
type Props = {
  id: string;
  data: Array<Record<string, any>>;
  xAxis: Record<string, any>;
  yAxis: Record<string, any>;
  color?: Record<string, any>;
  height?: number;
  barConfig?: Record<string, any>;
};

/**
 * @deprecated Use Barchart v2 instead
 * @example import { Barchart } from '@scality/core-ui/dist/next';

 */
function BarChart({
  id,
  data,
  xAxis,
  yAxis,
  color,
  height = 200,
  barConfig,
}: Props) {
  const spec = {
    mark: {
      type: 'bar',
      ...barConfig,
    },
    width: 'container',
    height,
    data: {
      values: data,
    },
    encoding: {
      x: xAxis,
      y: yAxis,
      color,
    },
  };
  return (
    <VegaChart
      key={`barchart-${id}-${data.length}`}
      id={id}
      spec={spec}
    ></VegaChart>
  );
}

export { BarChart };
