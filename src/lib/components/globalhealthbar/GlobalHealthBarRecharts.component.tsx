import { useMemo, useState, useCallback } from 'react';
import {
  Bar,
  BarChart,
  BarProps,
  ResponsiveContainer,
  Tooltip,
  TooltipContentProps,
  YAxis,
} from 'recharts';
import { useTheme } from 'styled-components';
import { AlertBar, createAlertBarRenderer } from './AlertBar';
import { CustomTooltip } from './CustomTooltip';
import { Alert, useHealthBarData } from './useHealthBarData';
import { HealthBarXAxis } from './HealthBarXAxis';
import { RADIUS_SIZE, CHART_HEIGHT, BAR_SIZE, TOOLTIP_OFFSET } from './utils';

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
        <HealthBarXAxis
          startTimestamp={startTimestamp}
          endTimestamp={endTimestamp}
        />

        <Tooltip
          allowEscapeViewBox={{ x: true, y: true }}
          isAnimationActive={false}
          content={(props: TooltipContentProps<number, string>) => {
            return (
              <CustomTooltip tooltipData={tooltipData} tooltipProps={props} />
            );
          }}
          shared={false}
          wrapperStyle={{
            zIndex: 9999,
            pointerEvents: 'none',
          }}
          contentStyle={{
            zIndex: 9999,
            position: 'fixed', // This might help in some cases
          }}
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
