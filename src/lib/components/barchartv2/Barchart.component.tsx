import { BarChart } from 'recharts';

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

const Barchart = (props: BarchartProps) => {
  return <BarChart></BarChart>;
};

export default Barchart;
