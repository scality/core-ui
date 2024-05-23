import { Bar, BarChart, XAxis, YAxis, Tooltip, Rectangle } from 'recharts';
import { useTheme } from 'styled-components';
import { useEffect, useState } from 'react';
import { useHistoryAlert } from './HistoryProvider';
import { getDataListOptions, getRadius, getTickFormatter } from './utils';
import { HistoryAlertSlider } from './HistorySlider';
import { CustomTooltip } from './CustomTooltip';

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
};
const barWidth = 600; // width of the bar chart

export function GlobalHealthBar({ id, alerts, start, end }: GlobalHealthProps) {
  const history = useHistoryAlert();
  const [tooltipData, setTooltipData] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    if (history.selectedDate === 0) {
      history.setSelectedDate(endDate);
    }
  }, []);

  const startDate = new Date(start).getTime();
  const endDate = new Date(end).getTime();

  const data = [
    {
      start: startDate,
      end: endDate,
      range: [startDate, endDate],
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

  const rectangleRenderer = (props, key) => {
    const { x, y, height, fill } = props;

    const start = props[key][0] < startDate ? startDate : props[key][0];
    const end = props[key][1] > endDate ? endDate : props[key][1];
    const relativeSize = (end - start) / (endDate - startDate);
    return (
      <Rectangle
        x={x < 0 ? 0 : x}
        y={y}
        width={relativeSize * barWidth}
        height={height}
        fill={fill}
        radius={getRadius(start, end, startDate, endDate)}
      ></Rectangle>
    );
  };

  return (
    <div
      style={{
        padding: 60,
        position: 'relative',
        width: barWidth,
      }}
    >
      <HistoryAlertSlider
        start={start}
        end={end}
        startDate={startDate}
        endDate={endDate}
      />

      <BarChart
        width={barWidth}
        height={60}
        data={data}
        layout="vertical"
        margin={{ left: 0, right: 0, bottom: 10 }}
        maxBarSize={barWidth}
      >
        <XAxis
          allowDataOverflow={true}
          dataKey="start"
          type="number"
          domain={[new Date(start).getTime(), new Date(end).getTime()]}
          tickSize={8}
          minTickGap={0}
          interval={0}
          ticks={getDataListOptions(startDate, endDate)}
          tick={(props) => {
            const { x, y, payload } = props;
            return (
              <g transform={`translate(${x},${y})`} overflow={'visible'}>
                <text
                  x={0}
                  y={0}
                  dy={12}
                  textAnchor={'middle'}
                  fill={theme.textSecondary}
                  fontSize={11}
                >
                  {getTickFormatter(
                    startDate,
                    endDate,
                    new Date(payload.value),
                  )}
                </text>
              </g>
            );
          }}
          tickLine={{ stroke: theme.textSecondary }}
          axisLine={false}
        />
        {!history.selectedDate && (
          <Tooltip
            allowEscapeViewBox={{ x: true, y: true }}
            offset={20}
            isAnimationActive={false}
            cursor={false}
            content={<CustomTooltip tooltipData={tooltipData}></CustomTooltip>}
          />
        )}

        <YAxis yAxisId={'background'} type="category" hide />
        <YAxis yAxisId="clip" type="category" hide></YAxis>
        {[...criticalKeys, ...warningKeys].map((key) => (
          <YAxis key={`yAxis${key}`} yAxisId={key} type="category" hide />
        ))}

        <Bar
          dataKey="range"
          fill={theme.statusHealthy}
          radius={15}
          yAxisId="background"
          isAnimationActive={false}
        />

        {warningKeys.map((key) => (
          <Bar
            dataKey={key}
            yAxisId={key}
            key={key}
            onPointerEnter={(e) => {
              setTooltipData(e.tooltipPayload);
            }}
            onPointerLeave={() => setTooltipData(null)}
            fill={theme.statusWarning}
            shape={(props) => rectangleRenderer(props, key)}
          ></Bar>
        ))}

        {criticalKeys.map((key) => (
          <Bar
            dataKey={key}
            yAxisId={key}
            key={key}
            fill={theme.statusCritical}
            radius={15}
            onPointerEnter={(e) => {
              setTooltipData(e.tooltipPayload);
            }}
            onPointerLeave={() => setTooltipData(null)}
            shape={(props) => rectangleRenderer(props, key)}
          />
        ))}
      </BarChart>
    </div>
  );
}
