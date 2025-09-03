import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Rectangle,
  ResponsiveContainer,
  BarProps,
} from 'recharts';
import { useTheme } from 'styled-components';
import { useState, useMemo, useCallback } from 'react';
import { getTickFormatter, getTicks } from './utils';
import { CustomTooltip } from './CustomTooltip';
import { RectRadius } from 'recharts/types/shape/Rectangle';

const RADIUS_SIZE = 5;
const EDGE_THRESHOLD = 10;
const CHART_HEIGHT = 50;
const BAR_SIZE = 8;
const TICK_SIZE = 5;
const TOOLTIP_OFFSET = 20;
const FONT_SIZE = 11;
const TEXT_DY_OFFSET = 12;
const TICK_INTERVAL = 0;

export interface Alert {
  description: string;
  startsAt: string;
  endsAt: string;
  severity: 'warning' | 'critical';
}

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

  const data = useMemo(
    () => [
      {
        start: startTimestamp,
        end: endTimestamp,
        range: [startTimestamp, endTimestamp],
        ...alerts.reduce((acc, alert, index) => {
          // Use alert index with severity to create unique keys for bars dataKey
          // Bars format is: dataKey: [startTimestamp, endTimestamp]
          const uniqueKey = `${alert.severity}_${index}`;

          acc[uniqueKey] = [
            new Date(alert.startsAt).getTime(),
            new Date(alert.endsAt).getTime(),
          ];
          // Add the alert to the data for the tooltip
          acc[`alert_${uniqueKey}`] = {
            ...alert,
          };

          return acc;
        }, {}),

        id,
      },
    ],
    [alerts, startTimestamp, endTimestamp, id],
  );

  // Separate keys for warning, critical, and unavailable to map to the different bars
  const { warningKeys, criticalKeys, unavailableKeys } = useMemo(() => {
    const dataKeys = Object.keys(data[0]);
    return {
      warningKeys: dataKeys.filter((key) => key.startsWith('warning')),
      criticalKeys: dataKeys.filter((key) => key.startsWith('critical')),
      unavailableKeys: dataKeys.filter((key) => key.startsWith('unavailable')),
    };
  }, [data]);

  // Render the bars
  const rectangleRenderer = useCallback(
    (props: any, key: string) => {
      const { x, background } = props;
      // background is the bar representing healthy status
      // background starts at 5, takes all the width of the chart
      let startX = background.x;
      const width = background.width;

      // get the start and end of the alert
      const alertStartTimestamp = props[key][0];
      const alertEndTimestamp = props[key][1];

      // Calculate the relative size of the alert bar
      // Cut the alert bar at the start and end of the chart
      const start = Math.max(alertStartTimestamp, startTimestamp);
      const end = Math.min(alertEndTimestamp, endTimestamp);
      const relativeSize = (end - start) / (endTimestamp - startTimestamp);
      if (alertStartTimestamp > startTimestamp) {
        startX = x;
      }
      // width of the bar is the relative size of the alert
      const rectWidth = relativeSize * width;

      // Add radius when the bar is at the start or end of the chart
      // So we don't have a sharp edge when bar edge are rounded
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
        ></Rectangle>
      );
    },
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
          content={<CustomTooltip tooltipData={tooltipData}></CustomTooltip>}
        />

        <YAxis yAxisId={'background'} type="category" hide />

        <YAxis yAxisId="clip" type="category" hide></YAxis>
        {[...criticalKeys, ...warningKeys, ...unavailableKeys].map((key) => (
          <YAxis key={`yAxis${key}`} yAxisId={key} type="category" hide />
        ))}

        <Bar
          dataKey="range"
          fill={theme.statusHealthy}
          radius={RADIUS_SIZE}
          yAxisId="background"
          isAnimationActive={false}
        />

        {unavailableKeys.map((key) => (
          <Bar
            dataKey={key}
            yAxisId={key}
            key={key}
            fill={theme.textSecondary}
            shape={(props: BarProps) => rectangleRenderer(props, key)}
            onPointerEnter={() => {
              handlePointerEnter(key);
            }}
            onPointerLeave={() => handlePointerLeave()}
          />
        ))}

        {warningKeys.map((key) => (
          <Bar
            dataKey={key}
            yAxisId={key}
            key={key}
            onPointerEnter={() => {
              handlePointerEnter(key);
            }}
            onPointerLeave={() => handlePointerLeave()}
            fill={theme.statusWarning}
            shape={(props: BarProps) => rectangleRenderer(props, key)}
          ></Bar>
        ))}

        {criticalKeys.map((key) => (
          <Bar
            dataKey={key}
            yAxisId={key}
            key={key}
            fill={theme.statusCritical}
            onPointerEnter={() => {
              handlePointerEnter(key);
            }}
            onPointerLeave={() => handlePointerLeave()}
            shape={(props: BarProps) => rectangleRenderer(props, key)}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
