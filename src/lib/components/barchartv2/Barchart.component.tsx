import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  TooltipContentProps,
  XAxis,
  YAxis,
} from 'recharts';
import styled, { useTheme } from 'styled-components';
import { spacing, Stack, Wrap } from '../../spacing';
import { chartColors, ChartColors, fontSize } from '../../style/theme';
import { Box } from '../box/Box';
import { ConstrainedText } from '../constrainedtext/Constrainedtext.component';
import { IconHelp } from '../iconhelper/IconHelper';
import { Loader } from '../loader/Loader.component';
import { Text } from '../text/Text.component';
import {
  formatDate,
  renderTooltipContent,
  UnitRange,
  useChartData,
} from './utils';
import { useChartLegend } from '../chartlegend/ChartLegendWrapper';

const CHART_CONSTANTS = {
  TICK_WIDTH_OFFSET: 5,
  BAR_SIZE: 12,
  MIN_POINT_SIZE: 3,
  DEFAULT_HEIGHT: 200,
  CHART_MARGIN: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
} as const;

/* ---------------------------------- TYPE ---------------------------------- */

export type TimeType = {
  type: 'time';
  timeRange: {
    startDate: Date;
    endDate: Date;
    interval: number;
  };
};
export type Point = {
  key: string | number;
  values: { label: string; value: number }[];
};

export type BarchartBars = readonly {
  readonly label: string;
  /**
   * When using a time type, the data should be an array of [Date, value]
   * so use Date instead of timestamp for transformation data in format fn
   */
  readonly data: readonly (readonly [string | Date, number | string])[];
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
  bars?: T;
  tooltip?: BarchartTooltipFn<T>;
  defaultSort?: BarchartSortFn<T>;
  unitRange?: UnitRange;
  helpTooltip?: React.ReactNode;
  stacked?: boolean;
  /**
   * Sort the bars by default or by legend order
   * legend will sort the bars by the order of the colorSet property of the ChartLegendWrapper component
   * default will sort the bars by average values in descending order (biggest values will be at bottom)
   * @default 'default'
   */
  stackedBarSort?: 'default' | 'legend';
  title?: string;
  secondaryTitle?: string;
  rightTitle?: React.ReactNode;
  height?: number;
  isLoading?: boolean;
  isError?: boolean;
};

interface CustomTickProps {
  x: number;
  y: number;
  payload: {
    value: string | number;
  };
  visibleTicksCount: number;
  width: number;
  type: TimeType;
}

/* ---------------------------------- COMPONENTS ---------------------------------- */

const CustomTick = ({
  x,
  y,
  payload,
  visibleTicksCount,
  width,
  type,
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
        text={
          <Text variant="Smaller" color="textSecondary">
            {type.type === 'time'
              ? formatDate(new Date(payload.value), type.timeRange.interval)
              : String(payload.value)}
          </Text>
        }
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
  helpTooltip?: React.ReactNode;
  rightTitle?: React.ReactNode;
}) => {
  return (
    <Wrap>
      <Stack gap="r4">
        <Text variant="ChartTitle">{title}</Text>
        {helpTooltip && <IconHelp tooltipMessage={helpTooltip} />}

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

const Error = ({ height }: { height: number }) => {
  return (
    <Box
      height={height}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      <Text>Chart data is not available</Text>
    </Box>
  );
};

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
  const { getColor } = useChartLegend();
  const [hoveredValue, setHoveredValue] = useState<string | undefined>();

  const {
    height = CHART_CONSTANTS.DEFAULT_HEIGHT,
    bars,
    type = 'category',
    unitRange,
    stacked,
    stackedBarSort = 'default',
    defaultSort,
    tooltip,
    title,
    secondaryTitle,
    helpTooltip,
    rightTitle,
    isLoading,
    isError,
  } = props;

  // Create colorSet from ChartLegendWrapper
  const colorSet = bars?.reduce(
    (acc, bar) => {
      const color = getColor(bar.label);
      if (color) {
        acc[bar.label] = color;
      }
      return acc;
    },
    {} as Record<string, ChartColors | string>,
  );

  const { rechartsBars, unitLabel, roundReferenceValue, rechartsData } =
    useChartData(
      bars || [],
      type,
      colorSet || {},
      stacked,
      defaultSort,
      unitRange,
      stackedBarSort,
    );

  return (
    <Stack direction="vertical" gap="r8">
      <ChartHeader
        title={title}
        secondaryTitle={secondaryTitle}
        helpTooltip={helpTooltip}
        rightTitle={rightTitle}
      />
      {isError || (!bars && !isLoading) ? (
        <Error height={height} />
      ) : isLoading ? (
        <Loading height={height} />
      ) : (
        <StyledResponsiveContainer width="100%" height={height}>
          <BarChart
            data={rechartsData}
            accessibilityLayer
            barSize={CHART_CONSTANTS.BAR_SIZE}
            height={height}
            margin={CHART_CONSTANTS.CHART_MARGIN}
          >
            <CartesianGrid
              vertical={false}
              horizontal={false}
              fill={theme.backgroundLevel1}
            />
            {rechartsBars.map((bar) => {
              const { fill, dataKey, stackId } = bar;
              return (
                <Bar
                  key={dataKey}
                  dataKey={dataKey}
                  fill={chartColors[fill] || fill}
                  minPointSize={stacked ? 0 : CHART_CONSTANTS.MIN_POINT_SIZE}
                  stackId={stackId}
                  onMouseOver={() => setHoveredValue(dataKey)}
                  onMouseLeave={() => setHoveredValue(undefined)}
                />
              );
            })}

            <YAxis
              tickCount={1}
              unit={` ${unitLabel}`}
              domain={[0, roundReferenceValue]}
              tickFormatter={
                (value) =>
                  new Intl.NumberFormat('fr-FR').format(value.toFixed(0)) // Add a space as thousand separator
              }
              axisLine={false}
              tick={{
                fill: theme.textSecondary,
                fontSize: fontSize.smaller,
              }}
              tickLine={false}
              label={{
                fill: theme.textSecondary,
              }}
              orientation="right"
            />

            <ReferenceLine
              y={roundReferenceValue}
              fill={theme.border}
              strokeWidth={0.5} // Reduce stroke width to make it less visible
            />
            <XAxis
              dataKey="category"
              tick={(props) => <CustomTick {...props} type={type} />}
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
    </Stack>
  );
};
