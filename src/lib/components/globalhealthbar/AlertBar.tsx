import { Bar, BarProps, Rectangle } from 'recharts';
import { RectRadius } from 'recharts/types/shape/Rectangle';
import { getRectangleProps } from './utils';
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
    const { radius, rectWidth, startX } = getRectangleProps(
      props,
      key,
      startTimestamp,
      endTimestamp,
    );
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
