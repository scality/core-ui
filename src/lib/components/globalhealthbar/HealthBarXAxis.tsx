import { XAxis } from 'recharts';
import { useTheme } from 'styled-components';
import {
  FONT_SIZE,
  getTickFormatter,
  getTicks,
  TEXT_DY_OFFSET,
  TICK_INTERVAL,
  TICK_SIZE,
} from './utils';

interface HealthBarXAxisProps {
  startTimestamp: number;
  endTimestamp: number;
}

export const HealthBarXAxis = ({
  startTimestamp,
  endTimestamp,
}: HealthBarXAxisProps) => {
  const theme = useTheme();

  return (
    <XAxis
      allowDataOverflow={true}
      dataKey="start"
      type="number"
      domain={[startTimestamp, endTimestamp]}
      tickSize={TICK_SIZE}
      minTickGap={0}
      interval={TICK_INTERVAL}
      ticks={getTicks(startTimestamp, endTimestamp)}
      tick={(props) => {
        const { x, y, payload } = props;
        return (
          <g transform={`translate(${x},${y})`} overflow={'visible'}>
            <text
              x={0}
              y={0}
              dy={TEXT_DY_OFFSET}
              textAnchor={'middle'}
              fill={theme.textSecondary}
              fontSize={FONT_SIZE}
            >
              {getTickFormatter(
                startTimestamp,
                endTimestamp,
                new Date(payload.value),
              )}
            </text>
          </g>
        );
      }}
      tickLine={{ stroke: theme.textSecondary }}
      axisLine={false}
    />
  );
};
