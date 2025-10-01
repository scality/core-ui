import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer } from "recharts";
import { useTheme } from "styled-components";
import { chartColors } from "../../style/theme";
import { addMissingDataPoint } from "../linetemporalchart/ChartUtil";

type SparklineProps = {
  serie: {
    data: [number, number|null][],
    color?: string, // exa color code like '#ff0000'
  },
  startingTimeStamp: number,
  sampleDuration: number,
  sampleInterval: number
};

/**
 * Sparkline is a simple dynamically sized area chart.
 * Used to show trends in data over time.
 */
export function Sparkline({ serie, startingTimeStamp, sampleDuration, sampleInterval }: SparklineProps) {
  const data = useMemo(
    () => {
      const dataMdp = addMissingDataPoint(serie.data, startingTimeStamp, sampleDuration, sampleInterval);
      return dataMdp.map(([x, y]) => ({ x, y }));
    },
    [serie.data]
  );
  console.log('Sparkline data:', data);
  const color = serie.color ?? chartColors.lineColor1;
  const strokeGridColor = useTheme().border;

  return (
    <ResponsiveContainer>
      <AreaChart data={data}>
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.7} />
            <stop offset="100%" stopColor={color} stopOpacity={0.1} />
          </linearGradient>
        </defs>
      <CartesianGrid horizontal={false} stroke={strokeGridColor} strokeOpacity={0.5} />
      <Area
        type="linear"
        dataKey="y"
        stroke={color}
        fill={`url(#gradient-${color})`}
        dot={false}
        activeDot={false}
        isAnimationActive={false}
      />
      </AreaChart>
    </ResponsiveContainer>
  );
}
