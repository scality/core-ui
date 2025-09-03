import { useCallback, useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  BarProps,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useTheme } from 'styled-components';
import { AlertBar, createAlertBarRenderer } from './AlertBar';
import { CustomTooltip } from './CustomTooltip';
import { Alert, useHealthBarData } from './useHealthBarData';
import { getTickFormatter, getTicks } from './utils';

const RADIUS_SIZE = 5;
const CHART_HEIGHT = 50;
const BAR_SIZE = 8;
const TICK_SIZE = 5;
const TOOLTIP_OFFSET = 20;
const FONT_SIZE = 11;
const TEXT_DY_OFFSET = 12;
const TICK_INTERVAL = 0;

export interface GlobalHealthProps {
  id: string;
  alerts: Alert[];
  start: Date;
  end: Date;
  width: number;
}

export function GlobalHealthBar({ id, alerts, start, end }: GlobalHealthProps) {
  const [tooltipData, setTooltipData] = useState<Alert | null>(null);
  const theme = useTheme();
  const startTimestamp = new Date(start).getTime();
  const endTimestamp = new Date(end).getTime();

  const { data, alertKeys } = useHealthBarData(
    alerts,
    startTimestamp,
    endTimestamp,
    id,
  );

  const alertBarRenderer = useMemo(
    () => createAlertBarRenderer(startTimestamp, endTimestamp),
    [startTimestamp, endTimestamp],
  );

  const handlePointerEnter = useCallback(
    (key: string) => {
      setTooltipData(data[0][`alert_${key}`]);
    },
    [data],
  );

  const handlePointerLeave = useCallback(() => {
    setTooltipData(null);
  }, []);

  const { warningKeys, criticalKeys, unavailableKeys } = alertKeys;

  const allAlertBars = useMemo(() => {
    const configs = [
      { keys: unavailableKeys, fill: theme.textSecondary },
      { keys: warningKeys, fill: theme.statusWarning },
      { keys: criticalKeys, fill: theme.statusCritical },
    ];

    return configs.flatMap(({ keys, fill }) =>
      keys.map((key) => ({ key, fill })),
    );
  }, [unavailableKeys, warningKeys, criticalKeys, theme]);

  return (
    <ResponsiveContainer width={'100%'} height={CHART_HEIGHT}>
      <BarChart
        data={data}
        layout="vertical"
        barSize={BAR_SIZE}
        accessibilityLayer
      >
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

        <Tooltip
          allowEscapeViewBox={{ x: true, y: true }}
          offset={TOOLTIP_OFFSET}
          isAnimationActive={false}
          cursor={false}
          content={<CustomTooltip tooltipData={tooltipData} />}
        />

        {/* YAxis for the Background healthy bar */}
        <YAxis yAxisId={'background'} type="category" hide />

        {/* Generate YAxis for all alert keys */}
        {allAlertBars.map(({ key, fill }) => (
          <YAxis key={`yAxis${key}`} yAxisId={key} type="category" hide />
        ))}

        {/* Background healthy bar */}
        <Bar
          dataKey="range"
          fill={theme.statusHealthy}
          radius={RADIUS_SIZE}
          yAxisId="background"
          isAnimationActive={false}
        />

        {/* Alert bars */}
        {allAlertBars.map(({ key, fill }) => (
          <AlertBar
            key={key}
            dataKey={key}
            yAxisId={key}
            fill={fill}
            shape={(props: BarProps) => alertBarRenderer(props, key)}
            onPointerEnter={() => handlePointerEnter(key)}
            onPointerLeave={() => handlePointerLeave()}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

// Re-export Alert type for external use
export type { Alert };
