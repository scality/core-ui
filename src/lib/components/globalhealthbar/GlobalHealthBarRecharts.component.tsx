import { useCallback, useMemo, useRef, useState } from 'react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  TooltipContentProps,
  YAxis,
} from 'recharts';
import styled, { useTheme } from 'styled-components';
import { GlobalHealthBarTooltip } from './components/GlobalHealthBarTooltip';
import { HealthBarXAxis } from './components/HealthBarXAxis';
import {
  CHART_CONFIG,
  getNavigationAction,
  getNavigationStateUpdate,
} from './healthBarUtils';
import { Alert, useHealthBarData } from './useHealthBarData';

export interface GlobalHealthProps {
  id: string;
  alerts: Alert[];
  start: Date;
  end: Date;
}

const ChartInteractiveContainer = styled.div`
  position: relative;
  outline: none;
  .recharts-surface {
    outline: none;
  }
`;

export function GlobalHealthBar({ id, alerts, start, end }: GlobalHealthProps) {
  const [tooltipData, setTooltipData] = useState<Alert | null>(null);
  const [focusedAlertIndex, setFocusedAlertIndex] = useState<number>(-1);
  const [keyboardActive, setKeyboardActive] = useState<boolean>(false);
  const [activeBarKey, setActiveBarKey] = useState<string | null>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const startTimestamp = new Date(start).getTime();
  const endTimestamp = new Date(end).getTime();

  const { chartData, alertsMap, alertKeys } = useHealthBarData(
    alerts,
    startTimestamp,
    endTimestamp,
    id,
  );

  const handlePointerEnter = useCallback(
    (key: string) => {
      setTooltipData(alertsMap[key]);
      setActiveBarKey(key);
    },
    [alertsMap],
  );

  const handlePointerLeave = useCallback(() => {
    if (!keyboardActive) {
      setTooltipData(null);
      setActiveBarKey(null);
    }
  }, [keyboardActive]);

  const { warningKeys, criticalKeys, unavailableKeys } = alertKeys;

  // Get all alert keys in order for keyboard navigation
  const allAlertKeys = useMemo(() => {
    return Object.values(alertsMap).sort((a, b) => {
      return new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime();
    });
  }, [alertsMap]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const action = getNavigationAction(event.key);
      if (!action || allAlertKeys.length === 0) return;

      event.preventDefault();

      const update = getNavigationStateUpdate(
        action,
        focusedAlertIndex,
        allAlertKeys,
      );

      setFocusedAlertIndex(update.newIndex);
      setTooltipData(update.selectedAlert);
      setKeyboardActive(update.shouldActivateKeyboard);

      // Set active bar key for keyboard navigation
      if (update.selectedAlert) {
        setActiveBarKey(update.selectedAlert.key);
      }
    },
    [allAlertKeys, focusedAlertIndex],
  );

  // Handle focus events
  const handleFocus = useCallback(() => {
    if (allAlertKeys.length > 0 && focusedAlertIndex === -1) {
      setFocusedAlertIndex(0);
      setTooltipData(allAlertKeys[0]);
      setKeyboardActive(true);

      // Set active bar key for initial focus
      setActiveBarKey(allAlertKeys[0].key);
    }
  }, [allAlertKeys, focusedAlertIndex]);

  const handleBlur = useCallback(() => {
    setKeyboardActive(false);
    setFocusedAlertIndex(-1);
    setTooltipData(null);
    setActiveBarKey(null);
  }, []);

  // Handle mouse enter to disable keyboard mode
  const handleMouseEnter = useCallback(() => {
    setKeyboardActive(false);
  }, []);

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
    <ChartInteractiveContainer
      ref={chartContainerRef}
      tabIndex={0}
      role="application"
      aria-label={`Health bar chart with ${allAlertKeys.length} alerts. Use arrow keys to navigate, Escape to close tooltip.`}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
    >
      <ResponsiveContainer width={'100%'} height={CHART_CONFIG.CHART_HEIGHT}>
        <BarChart
          data={chartData}
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
                  isKeyboardActive={keyboardActive}
                  startTimestamp={startTimestamp}
                  endTimestamp={endTimestamp}
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

          {/* Alert bars - render non-active bars first */}
          {allAlertBars.map(({ key, fill }) => {
            const isActive = key === activeBarKey;
            // Skip active bar here - it will be rendered last
            if (isActive) return null;

            return (
              <Bar
                key={key}
                dataKey={key}
                yAxisId={key}
                fill={fill}
                onPointerEnter={() => handlePointerEnter(key)}
                onPointerLeave={() => handlePointerLeave()}
                isAnimationActive={false}
              />
            );
          })}

          {/* Render active bar last to ensure it's on top */}
          {activeBarKey &&
            (() => {
              const activeBar = allAlertBars.find(
                (bar) => bar.key === activeBarKey,
              );
              if (!activeBar) return null;

              return (
                <Bar
                  key={`${activeBar.key}-active`}
                  dataKey={activeBar.key}
                  yAxisId={activeBar.key}
                  fill={activeBar.fill}
                  stroke={theme.selectedActive}
                  onPointerEnter={() => handlePointerEnter(activeBar.key)}
                  onPointerLeave={() => handlePointerLeave()}
                  isAnimationActive={false}
                />
              );
            })()}
        </BarChart>
      </ResponsiveContainer>
    </ChartInteractiveContainer>
  );
}

// Re-export Alert type for external use
export type { Alert };
