import { useState } from 'react';
import {
  Bar,
  BarChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  TooltipContentProps,
  XAxis,
  YAxis,
} from 'recharts';
import styled, { useTheme } from 'styled-components';
import { spacing, Stack, Wrap } from '../../spacing';
import { ConstrainedText } from '../constrainedtext/Constrainedtext.component';
import { renderTooltipContent, useChartData, UnitRange } from './utils';
import { Text } from '../text/Text.component';
import { IconHelp } from '../iconhelper/IconHelper';
import { Loader } from '../loader/Loader.component';
import { Box } from '../box/Box';
import { chartColors, ChartColors, CoreUITheme } from '../../style/theme';

const CHART_CONSTANTS = {
  TICK_WIDTH_OFFSET: 5,
  MAX_BAR_SIZE: 12,
  MIN_POINT_SIZE: 3,
  DEFAULT_HEIGHT: 200,
} as const;

/* ---------------------------------- TYPE ---------------------------------- */

export type TimeType = {
  type: 'time';
  timeRange: {
    startTimestamp: number;
    endTimestamp: number;
    interval: number;
  };
};
export type Point = {
  key: string | number;
  values: { label: string; value: number }[];
};

export type BarchartBars = readonly {
  readonly label: string;
  readonly data: readonly (readonly [number | string, number | string])[];
}[];

export type BarchartTooltipFn<T extends BarchartBars> = (currentPoint: {
  category: string | number;
  values: { label: T[number]['label']; value: number; isHovered: boolean }[];
}) => React.ReactNode;

export type BarchartSortFn<T extends BarchartBars> = (
  pointA: Record<T[number]['label'], number> & { category: string | number },
  pointB: Record<T[number]['label'], number> & { category: string | number },
) => 1 | -1 | 0;

export type BarchartProps<T extends BarchartBars> = {
  type: 'category' | TimeType;
  bars: T;
  colorSet: Record<T[number]['label'], ChartColors | (string & {})>;
  tooltip?: BarchartTooltipFn<T>;
  defaultSort?: BarchartSortFn<T>;
  unitRange?: UnitRange;
  helpTooltip?: string;
  stacked?: boolean;
  title?: string;
  secondaryTitle?: string;
  rightTitle?: React.ReactNode;
  height?: number;
  isLoading?: boolean;
};

interface CustomTickProps {
  x: number;
  y: number;
  payload: {
    value: string | number;
  };
  visibleTicksCount: number;
  width: number;
}

/* ---------------------------------- COMPONENTS ---------------------------------- */

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

const ChartHeader = ({
  title,
  secondaryTitle,
  helpTooltip,
  rightTitle,
}: {
  title?: string;
  secondaryTitle?: string;
  helpTooltip?: string;
  rightTitle?: React.ReactNode;
}) => {
  return (
    <Wrap>
      <Stack gap="r4">
        <Text variant="Large" isEmphazed>
          {title}
        </Text>
        {helpTooltip && (
          <IconHelp tooltipMessage={helpTooltip} title={helpTooltip} />
        )}

        {secondaryTitle && (
          <Text
            color="textSecondary"
            style={{
              marginLeft: spacing.r8,
            }}
          >
            {secondaryTitle}
          </Text>
        )}
      </Stack>

      {rightTitle && <Text>{rightTitle}</Text>}
    </Wrap>
  );
};

const ChartContainer = styled(Stack)`
  background-color: ${({ theme }) => theme.backgroundLevel4};
  padding: ${spacing.r16};
  border-radius: ${spacing.r8};
`;

const Loading = ({ height }: { height: number }) => {
  return (
    <Box
      height={height}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      <Loader size="larger" children={<Text>Loading Chart Data...</Text>} />
    </Box>
  );
};

/* ---------------------------------- MAIN COMPONENT ---------------------------------- */

export const Barchart = <T extends BarchartBars>(props: BarchartProps<T>) => {
  const theme = useTheme();
  const [hoveredValue, setHoveredValue] = useState<string | undefined>();

  const {
    height = CHART_CONSTANTS.DEFAULT_HEIGHT,
    bars,
    type = 'category',
    colorSet,
    unitRange,
    stacked,
    defaultSort,
    tooltip,
    title,
    secondaryTitle,
    helpTooltip,
    rightTitle,
    isLoading,
  } = props;

  const { rechartsBars, unitLabel, roundReferenceValue, rechartsData } =
    useChartData(bars, type, colorSet, stacked, defaultSort, unitRange);

  return (
    <ChartContainer direction="vertical" gap="r16">
      <ChartHeader
        title={title}
        secondaryTitle={secondaryTitle}
        helpTooltip={helpTooltip}
        rightTitle={rightTitle}
      />
      {isLoading ? (
        <Loading height={height} />
      ) : (
        <StyledResponsiveContainer width="100%" height={height}>
          <BarChart
            data={rechartsData}
            accessibilityLayer
            maxBarSize={CHART_CONSTANTS.MAX_BAR_SIZE}
          >
            {rechartsBars.map((bar) => {
              const { fill, dataKey } = bar;
              return (
                <Bar
                  key={dataKey}
                  dataKey={dataKey}
                  fill={chartColors[fill] || fill}
                  minPointSize={CHART_CONSTANTS.MIN_POINT_SIZE}
                  stackId={stacked ? 'stacked' : undefined}
                  onMouseOver={() => setHoveredValue(dataKey)}
                  onMouseLeave={() => setHoveredValue(undefined)}
                />
              );
            })}

            <YAxis
              tickCount={1}
              unit={` ${unitLabel}`}
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

            <Tooltip
              content={(props: TooltipContentProps<number, string>) =>
                renderTooltipContent(props, tooltip, hoveredValue)
              }
              cursor={false}
            />
          </BarChart>
        </StyledResponsiveContainer>
      )}
    </ChartContainer>
  );
};
