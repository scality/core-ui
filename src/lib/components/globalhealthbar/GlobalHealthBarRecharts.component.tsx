import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts';
import { useTheme } from 'styled-components';

export const TOP = 'top';
export const BOTTOM = 'bottom';
type Position = typeof TOP | typeof BOTTOM;
export type GlobalHealthProps = {
  id: string;
  alerts: {
    description: string;
    startsAt: string;
    endsAt: string;
    severity: string;
  }[];
  start: string;
  end: string;
  height?: number;
  tooltipPosition?: Position;
};

export function GlobalHealthBar({
  id,
  alerts,
  start,
  end,
  height = 8,
  tooltipPosition = TOP,
}: GlobalHealthProps) {
  const theme = useTheme();
  const data = [
    {
      start: new Date(start).getTime(),
      end: new Date(end).getTime(),
      range: [new Date(start).getTime(), new Date(end).getTime()],
      ...alerts.reduce((acc, alert, index) => {
        const key = `${alert.severity}${index}`;
        acc['range' + key] = [
          new Date(alert.startsAt).getTime(),
          new Date(alert.endsAt).getTime(),
        ];
        acc[`${key}Severity`] = alert.severity;
        acc[`${key}Description`] = alert.description;
        return acc;
      }, {}),

      id,
    },
  ];
  const warningKeys = Object.keys(data[0]).filter((key) =>
    key.startsWith('rangewarning'),
  );
  const criticalKeys = Object.keys(data[0]).filter((key) =>
    key.startsWith('rangecritical'),
  );
  return (
    <BarChart width={500} height={60} data={data} layout="vertical">
      <XAxis
        dataKey="start"
        type="number"
        domain={[new Date(start).getTime(), new Date(end).getTime()]}
        tickFormatter={(unixTime) => new Date(unixTime).toLocaleDateString()}
        tickCount={5}
        interval="preserveStartEnd"
        tick={{ stroke: theme.textSecondary }}
        tickLine={true}
        axisLine={false}
        tickSize={15}
      />
      <YAxis yAxisId={'background'} type="category" hide />
      {[...criticalKeys, ...warningKeys].map((key) => (
        <YAxis key={`yAxis${key}`} yAxisId={key} type="category" hide />
      ))}

      <Tooltip cursor={false} />

      <Bar
        dataKey="range"
        fill="transparent"
        yAxisId="background"
        isAnimationActive={false}
        shape={(props) => {
          const { x, y, width, height } = props;
          return (
            <rect
              x={x}
              y={y}
              width={width}
              height={height}
              fill={theme.statusHealthy}
              ry="15%"
            />
          );
        }}
      />
      {warningKeys.map((key) => (
        <Bar
          dataKey={key}
          yAxisId={key}
          key={key}
          isAnimationActive={false}
          fill={theme.statusWarning}
        />
      ))}
      {criticalKeys.map((key) => (
        <Bar
          dataKey={key}
          yAxisId={key}
          key={key}
          isAnimationActive={false}
          fill={theme.statusCritical}
        />
      ))}
    </BarChart>
  );
}
