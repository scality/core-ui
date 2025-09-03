import { Bar, BarProps, Rectangle } from 'recharts';
import { RectRadius } from 'recharts/types/shape/Rectangle';
const RADIUS_SIZE = 5;
const EDGE_THRESHOLD = 10;
interface AlertBarProps {
  dataKey: string;
  yAxisId: string;
  fill: string;
  shape: (props: BarProps) => JSX.Element;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}

export const AlertBar = ({
  dataKey,
  yAxisId,
  fill,
  shape,
  onPointerEnter,
  onPointerLeave,
}: AlertBarProps) => (
  <Bar
    dataKey={dataKey}
    yAxisId={yAxisId}
    key={dataKey}
    fill={fill}
    shape={shape}
    onPointerEnter={onPointerEnter}
    onPointerLeave={onPointerLeave}
  />
);

export const createAlertBarRenderer = (
  startTimestamp: number,
  endTimestamp: number,
) => {
  return (props: any, key: string) => {
    const { x, background } = props;
    let startX = background.x;
    const width = background.width;

    const alertStartTimestamp = props[key][0];
    const alertEndTimestamp = props[key][1];

    const start = Math.max(alertStartTimestamp, startTimestamp);
    const end = Math.min(alertEndTimestamp, endTimestamp);
    const relativeSize = (end - start) / (endTimestamp - startTimestamp);

    if (alertStartTimestamp > startTimestamp) {
      startX = x;
    }

    const rectWidth = relativeSize * width;
    const leftRadius = x < EDGE_THRESHOLD ? RADIUS_SIZE : 0;
    const rightRadius =
      x + rectWidth >= width - EDGE_THRESHOLD ? RADIUS_SIZE : 0;
    const radius = [leftRadius, rightRadius, rightRadius, leftRadius];

    return (
      <Rectangle
        {...props}
        x={startX}
        width={rectWidth}
        radius={radius as RectRadius}
      />
    );
  };
};
