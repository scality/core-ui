import { XAxis } from 'recharts';
import { useTheme } from 'styled-components';
import { fontSize } from '../../../style/theme';
import {
  getTicks,
  calculateLabelVisibility,
  TIME_CONSTANTS,
  getEdgeMargin,
} from './GlobalHealthBar.utils';
import { FormattedDateTime } from '../../date/FormattedDateTime';

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
  const is7DaySpan = span === 7 * TIME_CONSTANTS.ONE_DAY;
  const isDaySpan = span === TIME_CONSTANTS.ONE_DAY;

  const shouldShowLabel = calculateLabelVisibility(
    width,
    visibleTicksCount,
    span,
    index,
    endTimestamp,
  );
  const edgeMargin = getEdgeMargin(index, visibleTicksCount, isDaySpan);
  return (
    // use coordinate to center the text
    shouldShowLabel && (
      <g transform={`translate(${payload.coordinate},${y})`}>
        <text
          textAnchor="middle"
          dy={8}
          dx={edgeMargin}
          fontSize={fontSize.smaller}
          fill={theme.textSecondary}
        >
          {is7DaySpan ? (
            <FormattedDateTime
              format="day-month-abbreviated-hour-minute"
              value={new Date(payload.value)}
            />
          ) : (
            <FormattedDateTime format="time" value={new Date(payload.value)} />
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
      height={15}
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
