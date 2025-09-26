import { memo } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer } from "recharts";
import { chartColors } from "../../style/theme";

type SparklineProps = {
  serie: {
    data: [number, number][],
    color?: string,
  }
};

/**
 * Sparkline is a simple dynamically sized area chart.
 * Used to show trends in data over time.
 */
function SparklineCmp({ serie }: SparklineProps) {
  const data = serie.data.map(([x, y]) => ({ x, y }));
  const strokeColor = serie.color ?? chartColors.lineColor1;
  const fillColor = `lighten(${strokeColor}, 0.5)`;

  return (
    <ResponsiveContainer>
      <AreaChart data={data}>
      <CartesianGrid strokeDasharray="1" horizontal={false} />
      <Area
        type="monotone"
        dataKey="y"
        stroke={strokeColor}
        fill={fillColor}
        dot={false}
        activeDot={false}
      />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export const Sparkline = memo(SparklineCmp);