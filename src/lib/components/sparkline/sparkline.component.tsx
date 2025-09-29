import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer } from "recharts";
import { chartColors } from "../../style/theme";

type SparklineProps = {
  serie: {
    data: [number, number][],
    color?: string, // exa color code like '#ff0000'
  }
};

/**
 * Sparkline is a simple dynamically sized area chart.
 * Used to show trends in data over time.
 */
export function Sparkline({ serie }: SparklineProps) {
  const data = serie.data.map(([x, y]) => ({ x, y }));
  const color = serie.color ?? chartColors.lineColor1;

  const [chartWidth, setChartWidth] = useState(0);
  const verticalPoints = useMemo(
    () => Array.from({ length: 7 }, (_, i) => 5 + (i * (chartWidth - 10)) / 5),
    [chartWidth]
  );

  return (
    <ResponsiveContainer onResize={setChartWidth}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.7} />
            <stop offset="100%" stopColor={color} stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid horizontal={false} strokeOpacity={0.4} verticalPoints={verticalPoints} />
        <Area
          type="linear"
          dataKey="y"
          stroke={color}
          fill={`url(#gradient-${color})`}
          dot={false}
          activeDot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
