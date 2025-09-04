import { XAxis } from 'recharts';
import { useTheme } from 'styled-components';
import { fontSize } from '../../style/theme';
import { getTickFormatter, getTicks } from './utils';

interface HealthBarXAxisProps {
  startTimestamp: number;
  endTimestamp: number;
}
const CustomTick = ({
  tickProps,
  startTimestamp,
  endTimestamp,
}: {
  tickProps: any;
  startTimestamp: number;
  endTimestamp: number;
}) => {
  const theme = useTheme();
  const { y, payload, width, index, visibleTicksCount } = tickProps;
  const span = endTimestamp - startTimestamp;
  const chartWidth = width;
  const oneHour = 60 * 60 * 1000;
  const oneDay = 24 * oneHour;
  const oneWeek = 7 * oneDay;
  const totalTicks = visibleTicksCount;
  const hasEnoughSpace = chartWidth / totalTicks > 60;

  const showLast7DaysLabel = span === oneWeek && index % 2 === 0;
  const showLastHourLabel =
    (span === oneHour &&
      endTimestamp % (15 * 60 * 1000) === 0 &&
      index % 2 === 0) ||
    (span === oneHour && index % 2 === 0);

  const showLast24HoursLabel =
    (span === oneDay && index % 3 === 0) ||
    (span === oneDay &&
      endTimestamp % (60 * 60 * 1000) === 0 &&
      index % 2 === 0);
  // only show 1 out 2 labels when not enough space
  const shouldShowLabel =
    hasEnoughSpace ||
    showLast7DaysLabel ||
    showLastHourLabel ||
    showLast24HoursLabel;

  return (
    // use coordinate to center the text
    shouldShowLabel && (
      <g transform={`translate(${payload.coordinate},${y})`}>
        <text
          textAnchor="middle"
          dy={10}
          fontSize={fontSize.smaller}
          fill={theme.textSecondary}
        >
          {getTickFormatter(
            startTimestamp,
            endTimestamp,
            new Date(payload.value),
          )}
        </text>
      </g>
    )
  );
};

export const HealthBarXAxis = ({
  startTimestamp,
  endTimestamp,
}: HealthBarXAxisProps) => {
  const theme = useTheme();
  const ticks = getTicks(startTimestamp, endTimestamp);

  return (
    <XAxis
      allowDataOverflow={true}
      dataKey="start"
      type="number"
      domain={[startTimestamp, endTimestamp]}
      tickSize={5}
      minTickGap={10}
      interval={0}
      tick={(props: any) => {
        return (
          <CustomTick
            tickProps={props}
            startTimestamp={startTimestamp}
            endTimestamp={endTimestamp}
          />
        );
      }}
      ticks={ticks}
      tickLine={{ stroke: theme.textSecondary }}
      axisLine={false}
    />
  );
};
