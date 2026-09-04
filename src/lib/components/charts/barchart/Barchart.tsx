import { useState, useRef, useMemo, useCallback } from 'react';
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Tooltip,
  TooltipContentProps,
  XAxis,
  YAxis,
} from 'recharts';
import { useTheme } from 'styled-components';
import { Stack } from '../../../spacing';
import { chartColors, ChartColors, fontSize } from '../../../style/theme';
import { useChartLegend } from '../legend/ChartLegendWrapper';
import { BarchartTooltip } from './BarchartTooltip';
import {
  formatLogTickValue,
  formatTickValue,
  getLogAxis,
  getTicks,
  hasZeroValue,
  placeNonPositiveValues,
  splitTickLines,
} from '../common/chartUtils';
import { useChartData } from './Barchart.utils';
import {
  ChartHeader,
  ChartError,
  ChartLoading,
  CustomTick,
  StyledResponsiveContainer,
  TICK_BASE_HEIGHT,
  TICK_LINE_HEIGHT,
} from '../common/SharedComponents';
import { TimeType, CategoryType, UnitRange } from '../types';

const CHART_CONSTANTS = {
  TICK_WIDTH_OFFSET: 4,
  BAR_SIZE: 12,
  MIN_POINT_SIZE: 3,
  DEFAULT_HEIGHT: 200,
  CHART_MARGIN: {
    left: 0,
    right: -10,
    top: 0,
    bottom: 0,
  },
};

/* ---------------------------------- TYPE ---------------------------------- */

type BarchartDisplayOptions = {
  noBackground?: boolean;
  showHorizontalGridLines?: boolean;
  noYAxisLine?: boolean;
  noTickLine?: boolean;
  noHeader?: boolean;
};

type ResolvedBarchartDisplayOptions = Required<BarchartDisplayOptions>;

const BARCHART_PRESETS: Record<'default' | 'modern', ResolvedBarchartDisplayOptions> = {
  default: { noBackground: false, showHorizontalGridLines: false, noYAxisLine: false, noTickLine: false, noHeader: false },
  modern:  { noBackground: true,  showHorizontalGridLines: true,  noYAxisLine: true,  noTickLine: true,  noHeader: true  },
};

/** A Recharts row. `null` is a value the axis cannot place — see `dropNonPositiveValues`. */
type BarchartRow = { [key: string]: string | number | null };

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
  type: CategoryType | TimeType;
  title: string;
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
  secondaryTitle?: string;
  rightTitle?: React.ReactNode;
  height?: number;
  isLoading?: boolean;
  isError?: boolean;
  /**
   * Named display preset that sets a group of visual defaults at once.
   *
   * - `'default'` — opaque background, no grid lines, Y-axis line visible, tick marks visible.
   * - `'modern'`  — transparent background, horizontal grid lines, no Y-axis line, no tick marks.
   *
   * Individual values can be overridden with `displayOptions`.
   * Defaults to `'default'` when omitted.
   */
  displayPreset?: 'default' | 'modern';
  /**
   * Fine-grained overrides applied on top of the active `displayPreset`.
   * Only the properties you specify are overridden; the rest come from the preset.
   */
  displayOptions?: BarchartDisplayOptions;
  /**
   * Y-axis scale.
   *
   * `'log'` is for a dataset whose values span orders of magnitude: on a linear
   * axis the small bars collapse onto the baseline and only the largest one is
   * readable, and a log axis gives each decade the same height instead. The
   * axis is bounded by the decades enclosing the data, and its ticks are the
   * decades themselves.
   *
   * It changes the display and nothing else: no value is rescaled, and the
   * tooltip, the legend and the unit scaling all keep the numbers the caller
   * passed in.
   *
   * Two things it cannot do:
   * - A bar whose value is zero or negative is dropped, because a log axis
   *   has nowhere to put it. It renders as a gap, which is the same thing an
   *   absent bar renders as — so on a log axis "measured zero" and "no data"
   *   become indistinguishable. They are not the same fact. Stay linear where
   *   that difference matters.
   * - `stacked` falls back to a linear axis. Stacking places each segment at
   *   a cumulative sum, so on a log axis a segment's height stops matching
   *   its value and the chart misreads.
   *
   * @default 'linear'
   */
  yAxisScale?: 'linear' | 'log';
};

/* ---------------------------------- MAIN COMPONENT ---------------------------------- */

export const Barchart = <T extends BarchartBars>(props: BarchartProps<T>) => {
  const theme = useTheme();
  const { getColor } = useChartLegend();
  const [hoveredValue, setHoveredValue] = useState<string | undefined>();
  const chartRef = useRef<HTMLDivElement>(null);

  const {
    height = CHART_CONSTANTS.DEFAULT_HEIGHT,
    bars,
    type = { type: 'category' },
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
    yAxisScale = 'linear',
    displayPreset = 'default',
    displayOptions,
  } = props;

  const presetOptions = BARCHART_PRESETS[displayPreset];
  const resolvedNoBackground = displayOptions?.noBackground ?? presetOptions.noBackground;
  const resolvedShowHorizontalGridLines = displayOptions?.showHorizontalGridLines ?? presetOptions.showHorizontalGridLines;
  const resolvedNoYAxisLine = displayOptions?.noYAxisLine ?? presetOptions.noYAxisLine;
  const resolvedNoTickLine = displayOptions?.noTickLine ?? presetOptions.noTickLine;
  const resolvedNoHeader = displayOptions?.noHeader ?? presetOptions.noHeader;

  // Create colorSet from ChartLegendWrapper
  const colorSet = useMemo(
    () =>
      bars?.reduce(
        (acc, bar) => {
          const color = getColor(bar.label);
          if (color) {
            acc[bar.label] = color;
          }
          return acc;
        },
        {} as Record<string, ChartColors | string>,
      ),
    [bars, getColor],
  );

  const {
    rechartsBars,
    unitLabel,
    roundReferenceValue,
    rechartsData,
    topDomain,
    valueBase,
    minPositiveValue,
    normalizedMaxValue,
  } = useChartData(
    bars || [],
    type,
    colorSet || {},
    stacked,
    defaultSort,
    unitRange,
    stackedBarSort,
  );
  const titleWithUnit = unitLabel ? `${title} (${unitLabel})` : title;

  // Stacking a log axis would put each segment at a cumulative sum, so its
  // height would no longer match its value. Linear is the honest fallback.
  const isLogScale = yAxisScale === 'log' && !stacked;

  const logAxis = useMemo(
    () =>
      isLogScale
        ? getLogAxis(minPositiveValue, normalizedMaxValue, {
            // Only spend a band when there is a zero to put in it.
            withZeroBand: hasZeroValue(rechartsData, 'category'),
          })
        : null,
    [isLogScale, minPositiveValue, normalizedMaxValue, rechartsData],
  );

  // A zero would draw towards minus infinity, so it moves to the axis's zero
  // band, where `minPointSize` gives it a visible stub at the `0` tick. An
  // absent bar draws nothing at all, so the two stay distinguishable — which
  // matters here, because `transformCategoryData` fills an absent bar with 0.
  const chartData = useMemo<BarchartRow[]>(
    () =>
      logAxis
        ? placeNonPositiveValues<BarchartRow>(
            rechartsData,
            'category',
            logAxis.zeroValue,
          )
        : rechartsData,
    [logAxis, rechartsData],
  );

  const tickFormatter = useCallback(
    (value: number) => formatTickValue(value, roundReferenceValue),
    [roundReferenceValue],
  );

  // A category label may wrap to a second line (e.g. a date on a midnight
  // crossover). Reserve matching x-axis height so the extra line is not clipped.
  const maxTickLines = useMemo(() => {
    if (type.type !== 'category') {
      return 1;
    }
    return chartData.reduce((max, point) => {
      const lineCount = splitTickLines(point.category ?? '').length;
      return Math.max(max, lineCount);
    }, 1);
  }, [type.type, chartData]);

  const xAxisHeight = TICK_BASE_HEIGHT + (maxTickLines - 1) * TICK_LINE_HEIGHT;

  const renderChartContent = () => {
    if (isError || (!bars && !isLoading)) {
      return <ChartError height={height} />;
    }
    if (isLoading) {
      return <ChartLoading height={height} />;
    }

    return (
      <StyledResponsiveContainer ref={chartRef} width="100%" height={height}>
        <RechartsBarChart
          data={chartData}
          accessibilityLayer
          barSize={
            type.type === 'category'
              ? type.gap === 0
                ? undefined
                : CHART_CONSTANTS.BAR_SIZE
              : CHART_CONSTANTS.BAR_SIZE
          }
          height={height}
          margin={CHART_CONSTANTS.CHART_MARGIN}
          barCategoryGap={type.type === 'category' ? type.gap : undefined}
        >
          <CartesianGrid
            vertical={resolvedShowHorizontalGridLines ? false : true}
            horizontal={true}
            {...(!resolvedShowHorizontalGridLines ? { verticalPoints: [0], horizontalPoints: [0] } : {})}
            stroke={theme.border}
            strokeOpacity={resolvedShowHorizontalGridLines ? 0.4 : 1}
            syncWithTicks={resolvedShowHorizontalGridLines}
            fill={resolvedNoBackground ? 'transparent' : theme.backgroundLevel4}
            strokeWidth={1}
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
                isAnimationActive={false}
                onMouseOver={() => setHoveredValue(dataKey)}
                onMouseLeave={() => setHoveredValue(undefined)}
              />
            );
          })}

          <YAxis
            interval={0}
            scale={logAxis ? 'log' : 'auto'}
            domain={logAxis ? logAxis.domain : [0, topDomain]}
            // A log axis is bounded by whole decades, so a value below the
            // floor is clipped rather than dragging the axis down to it.
            allowDataOverflow={logAxis !== null}
            ticks={logAxis ? logAxis.ticks : getTicks(roundReferenceValue, false)}
            tickFormatter={
              logAxis
                ? (value: number) =>
                    formatLogTickValue(value, logAxis.zeroValue)
                : tickFormatter
            }
            axisLine={resolvedNoYAxisLine ? false : { stroke: theme.border }}
            tickLine={resolvedNoTickLine ? false : { stroke: theme.border }}
            tick={{
              fill: theme.textSecondary,
              fontSize: fontSize.smaller,
            }}
            orientation="right"
          />

          <XAxis
            dataKey="category"
            height={xAxisHeight}
            tick={(props) => (
              <CustomTick
                {...props}
                type={type}
                tickWidthOffset={CHART_CONSTANTS.TICK_WIDTH_OFFSET}
              />
            )}
            type="category"
            interval={0}
            allowDataOverflow={true}
            tickLine={resolvedNoTickLine ? false : { stroke: theme.border }}
            axisLine={{ stroke: theme.border }}
          />

          <Tooltip
            content={(props: TooltipContentProps<number, string>) => (
              <BarchartTooltip
                type={type}
                colorSet={colorSet}
                tooltipProps={props}
                hoveredValue={hoveredValue}
                tooltip={tooltip}
                unitLabel={unitLabel}
                unitRange={unitRange}
                valueBase={valueBase}
                logZeroValue={logAxis?.zeroValue ?? null}
                chartContainerRef={chartRef}
              />
            )}
            cursor={false}
          />
        </RechartsBarChart>
      </StyledResponsiveContainer>
    );
  };

  return (
    <Stack direction="vertical" style={{ gap: '0' }}>
      {!resolvedNoHeader && (
        <ChartHeader
          title={titleWithUnit}
          secondaryTitle={secondaryTitle}
          helpTooltip={helpTooltip}
          rightTitle={rightTitle}
        />
      )}
      {renderChartContent()}
    </Stack>
  );
};
