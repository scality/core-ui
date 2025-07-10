import {
  Bar,
  BarChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ConstrainedText } from '../constrainedtext/Constrainedtext.component';
import { spacing } from '../../spacing';
import styled, { useTheme } from 'styled-components';
import {
  computeUnitLabelAndRoundReferenceValue,
  formatPrometheusDataToChartData,
  getMaxValue,
  UnitRange,
} from './utils';

export type TimeType = {
  type: 'time';
  timeRange: {
    startTimestamp: number;
    endTimestamp: number;
    interval: number;
  };
};
type Point = {
  key: string | number;
  values: { label: string; value: number }[];
};

export type BarchartProps = {
  type: 'category' | TimeType;
  bars: {
    label: string;
    data: [number | string, number | string][];
    color: string;
  }[];
  tooltip?: (currentPoint: {
    key: string | number;
    values: { label: string; value: number; isHovered: boolean }[];
  }) => React.ReactNode;
  defaultSort?: (pointA: Point, pointB: Point) => 1 | -1 | 0;

  unitRange?: UnitRange;
  helpTooltip?: string;
  stacked?: boolean;
  title?: string;
  secondaryTitle?: string;
  rightTitle?: React.ReactNode;
  height?: number;
  loading?: boolean;
};

const CHART_CONSTANTS = {
  TICK_WIDTH_OFFSET: 5,
} as const;
interface CustomTickProps {
  x: number;
  y: number;
  payload: {
    value: string | number;
  };
  visibleTicksCount: number;
  width: number;
}

const CustomTick = ({
  x,
  y,
  payload,
  visibleTicksCount,
  width,
}: CustomTickProps) => {
  const theme = useTheme();
  const tickWidth =
    width / visibleTicksCount - CHART_CONSTANTS.TICK_WIDTH_OFFSET;
  const centerX = x - tickWidth / 2;

  return (
    <foreignObject
      x={centerX}
      y={y}
      width={tickWidth}
      color={theme.textSecondary}
      overflow="visible"
    >
      <ConstrainedText
        text={String(payload.value)}
        centered
        tooltipStyle={{
          backgroundColor: theme.backgroundLevel1,
          padding: spacing.r10,
          borderRadius: spacing.r8,
          border: `1px solid ${theme.border}`,
          position: 'absolute',
        }}
      />
    </foreignObject>
  );
};

const StyledResponsiveContainer = styled(ResponsiveContainer)`
  // Avoid tooltip over constrained text to be cut off
  & .recharts-surface {
    overflow: visible;
  }
`;

const Barchart = (props: BarchartProps) => {
  const theme = useTheme();

  const { height = 200, bars, type = 'category', unitRange } = props;

  const { data, rechartsBars } = formatPrometheusDataToChartData(bars, type);
  const maxValue = getMaxValue(data);

  const { unitLabel, roundReferenceValue, rechartsData } =
    computeUnitLabelAndRoundReferenceValue(data, maxValue, unitRange);

  return (
    <StyledResponsiveContainer width="100%" height={height}>
      <BarChart data={rechartsData} accessibilityLayer>
        {rechartsBars.map((bar) => (
          <Bar
            key={bar.dataKey}
            dataKey={bar.dataKey}
            fill={bar.fill}
            minPointSize={3}
          />
        ))}

        <YAxis
          tickCount={1}
          // Add a non-breaking space between the unit and the value
          unit={`\u00A0${unitLabel}`}
          domain={[0, roundReferenceValue]}
          tickFormatter={(value) => value.toFixed(0)}
          axisLine={false}
          tick={{
            fill: theme.textSecondary,
          }}
          tickLine={false}
          label={{
            fill: theme.textSecondary,
          }}
          orientation="right"
        />
        <ReferenceLine y={roundReferenceValue} fill={theme.textSecondary} />
        <XAxis
          dataKey="category"
          tick={(props) => <CustomTick {...props} />}
          type="category"
          interval={0}
          allowDataOverflow={true}
          tickLine={{
            stroke: theme.textSecondary,
          }}
          axisLine={{
            stroke: theme.textSecondary,
          }}
        />
        <Tooltip />
      </BarChart>
    </StyledResponsiveContainer>
  );
};

export default Barchart;
