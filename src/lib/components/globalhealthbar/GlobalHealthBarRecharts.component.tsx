import { useCallback, useMemo, useRef, useState } from 'react';
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
import { AlertBar, createAlertBarRenderer } from './components/AlertBar';
import { GlobalHealthBarTooltip } from './components/GlobalHealthBarTooltip';
import { HealthBarXAxis } from './components/HealthBarXAxis';
import { CHART_CONFIG } from './healthBarUtils';
import { Alert, useHealthBarData } from './useHealthBarData';

export interface GlobalHealthProps {
  id: string;
  alerts: Alert[];
  start: Date;
  end: Date;
}

export function GlobalHealthBar({ id, alerts, start, end }: GlobalHealthProps) {
  const [tooltipData, setTooltipData] = useState<Alert | null>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);
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
    <ResponsiveContainer
      width={'100%'}
      height={CHART_CONFIG.CHART_HEIGHT}
      ref={chartContainerRef}
      style={{ contain: 'layout', position: 'relative' }}
    >
      <BarChart
        data={data}
        layout="vertical"
        barSize={CHART_CONFIG.BAR_SIZE}
        accessibilityLayer
        margin={CHART_CONFIG.MARGINS}
      >
        <HealthBarXAxis
          startTimestamp={startTimestamp}
          endTimestamp={endTimestamp}
        />

        <Tooltip
          allowEscapeViewBox={{ x: true, y: true }}
          isAnimationActive={false}
          shared={false}
          wrapperStyle={{
            width: '20rem',
            position: 'fixed',
          }}
          content={(props: TooltipContentProps<number, string>) => {
            return (
              <GlobalHealthBarTooltip
                tooltipData={tooltipData}
                tooltipProps={props}
                chartContainerRef={chartContainerRef}
              />
            );
          }}
        />

        {/* YAxis for the Background healthy bar */}
        <YAxis yAxisId={'background'} type="category" hide />

        {/* Generate YAxis for all alert keys */}
        {allAlertBars.map(({ key }) => (
          <YAxis key={`yAxis${key}`} yAxisId={key} type="category" hide />
        ))}

        {/* Background healthy bar */}
        <Bar
          dataKey="range"
          fill={theme.statusHealthy}
          radius={CHART_CONFIG.RADIUS_SIZE}
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
