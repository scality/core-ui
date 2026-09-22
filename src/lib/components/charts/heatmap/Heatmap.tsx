import {
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { Box } from '../../box/Box';
import { spacing, Stack } from '../../../spacing';
import { Text } from '../../text/Text.component';
import { ConstrainedText } from '../../constrainedtext/Constrainedtext.component';
import { Tooltip } from '../../tooltip/Tooltip.component';
import { FormattedDateTime } from '../../date/FormattedDateTime';
import { ChartLegend } from '../legend/ChartLegend';
import {
  ChartLegendWrapper,
  ChartLegendWrapperProps,
  useChartId,
  useChartLegend,
} from '../legend/ChartLegendWrapper';
import {
  DIMMED_CELL_OPACITY,
  formatSlot,
  getColumnEnds,
  isDailyOrLongerSlot,
} from './Heatmap.utils';

/** One line of the grid: a label in the gutter, then one cell per column. */
export type HeatmapRow<T extends string> = {
  label: string;
  /**
   * Read positionally against `columns`: cell `i` sits under column `i`. `null`
   * — and a row shorter than `columns` — leaves that slot empty instead of
   * shifting the rest of the grid.
   */
  cells: (T | null)[];
};

/** What the tooltip and the value formatter are handed for one cell. */
export type HeatmapCell<T extends string> = {
  row: HeatmapRow<T>;
  /** When the slot opens — the column it sits under. */
  column: Date;
  /**
   * When the slot closes: the next column's start, or one axis step past the
   * last. Equal to `column` on a single-column axis, which has no step to read.
   */
  columnEnd: Date;
  columnIndex: number;
  value: T;
};

/** Discrete values — a status, a state, any small set of names. */
export type HeatmapDiscreteScale = {
  type?: 'discrete';
  /**
   * The color of each value. Omit it to read a `ChartLegendWrapper` the caller
   * put above instead — which is how several charts come to share one legend.
   */
  colorSet?: ChartLegendWrapperProps['colorSet'];
  /**
   * Order of the legend items. Read only alongside `colorSet`: without one the
   * `ChartLegendWrapper` the caller put above owns the ordering, and this is
   * ignored.
   */
  sortOrder?: ChartLegendWrapperProps['sortOrder'];
  /**
   * Display labels for the legend items, when a value is not its own label.
   * Read only alongside `colorSet`, for the same reason as `sortOrder`.
   */
  labelMap?: ChartLegendWrapperProps['labelMap'];
};

/**
 * A CSS length, rather than any string: these are interpolated into a grid
 * template, where a value CSS cannot parse drops the whole declaration.
 */
export type HeatmapLength = `${number}${'px' | 'rem' | 'em' | '%'}`;

type HeatmapBaseProps<T extends string> = {
  rows: HeatmapRow<T>[];
  /** The x-axis. It defines the columns: a row is padded or truncated to fit. */
  columns: Date[];
  /** Heading above the grid. */
  title?: ReactNode;
  /** Heading above the legend — what the colors mean. */
  legendTitle?: ReactNode;
  /**
   * Hide the legend, for a heatmap whose scale is stated elsewhere: several
   * grids standing under one shared legend.
   */
  showLegend?: boolean;
  /** Show one x-axis tick every N columns, to keep a dense axis legible. */
  labelEvery?: number;
  /** Height of one cell. Defaults to `20px`. */
  cellHeight?: HeatmapLength;
  /**
   * Space between cells, both ways. Defaults to `4px`; at `0px` the grid reads
   * as a continuous timeline rather than as a row of squares.
   */
  cellGap?: HeatmapLength;
  /**
   * Cap on the row label gutter. Defaults to `7rem`. The gutter sizes to the
   * longest label it holds and only a label past this truncates, so a cap too
   * low costs the end of a label and never the alignment of the grid.
   */
  labelWidth?: HeatmapLength;
  /**
   * Smallest a cell may become. Defaults to `12px`. Columns share the width
   * available, so without a floor a long axis on a narrow screen divides into
   * slivers. At the floor the grid scrolls horizontally instead; `0px` removes
   * it and the grid always fits its container.
   */
  cellMinWidth?: HeatmapLength;
  /**
   * How a column is spelled out on the x-axis. The default reads the slot
   * duration off the axis: the time of day below a day, the abbreviated date
   * from a day up.
   */
  formatColumnTick?: (column: Date) => ReactNode;
  /** How a value is spelled out, in the default tooltip and in `aria-label`. */
  formatValue?: (value: T) => string;
  /** Replaces the default tooltip — row label, column date-time, value. */
  renderTooltip?: (cell: HeatmapCell<T>) => ReactNode;
};

export type DiscreteHeatmapProps = HeatmapBaseProps<string> & {
  scale?: HeatmapDiscreteScale;
};

export type HeatmapProps = DiscreteHeatmapProps;

/**
 * Narrowest the label gutter goes before the cells give up width instead. An
 * ellipsized label keeps its tooltip; a narrowed cell only gets harder to hit.
 */
const LABEL_MIN_WIDTH = '5rem';

/**
 * The cell width the labels give way to protect. Deliberately above
 * `cellMinWidth`, the floor a cell scrolls at, so the gutter yields first.
 */
const PREFERRED_CELL_WIDTH = '20px';

const FOCUS_RING_OFFSET = spacing.f1;
const FOCUS_RING_WIDTH = spacing.f2;

const Cell = styled.div<{
  $color: string;
  $opacity: number;
  $height: string;
}>`
  height: ${({ $height }) => $height};
  border-radius: ${spacing.f2};
  background-color: ${({ $color }) => $color};
  opacity: ${({ $opacity }) => $opacity};
  transition: opacity 0.15s ease;

  /* outline, not border: it paints outside the box so nothing is re-laid out */
  &:hover,
  &:focus-visible {
    outline: ${FOCUS_RING_WIDTH} solid ${({ theme }) => theme.selectedActive};
    outline-offset: ${FOCUS_RING_OFFSET};
  }
`;

/**
 * A row's label, outside the scroller so it holds still while the tiles move.
 *
 * `min-width` because a grid item otherwise refuses to shrink into its track,
 * and `overflow: hidden` to make it a scroll container: its min-content is then
 * zero, where the label's own `nowrap` would have been the gutter's floor.
 */
const GutterCell = styled(Box)`
  box-sizing: border-box;
  min-width: 0;
  overflow: hidden;
`;

/**
 * One x-axis tick. It overflows its single-column cell either side rather than
 * wrapping, and `min-width: 0` keeps it from widening the track it is centred in.
 */
const AxisTick = styled(Box)`
  min-width: 0;
  white-space: nowrap;
`;

/**
 * A row of the grid, for assistive technology and for layout at once: `subgrid`
 * makes it a real box spanning every column while its tracks stay the scroller's.
 */
const GridRow = styled.div`
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1;
  align-items: center;
`;

const defaultTooltip = <T extends string>(
  { row, column, columnEnd, value }: HeatmapCell<T>,
  formatValue: (value: T) => string,
) => (
  <Stack direction="vertical" gap="r2">
    <Text variant="Smaller" isEmphazed>
      {row.label}
    </Text>
    {/* the slot, not its opening instant: a cell alone says nothing of its span */}
    <Text variant="Smaller" color="textSecondary">
      {formatSlot(column, columnEnd)}
    </Text>
    <Text variant="Smaller">{formatValue(value)}</Text>
  </Stack>
);

/**
 * Title above, grid and legend side by side.
 *
 * The row wraps, so the legend drops under the grid rather than squeezing it;
 * the grid's flex basis is what decides the break. The legend is handed the
 * direction it ended up in, since the break depends on how many columns the axis
 * has and there is no breakpoint to write. Measuring cannot oscillate: going
 * under only makes the legend wider, which can only keep it under.
 */
const HeatmapFrame = ({
  title,
  legend,
  children,
}: {
  title?: ReactNode;
  legend?: (direction: 'horizontal' | 'vertical') => ReactNode;
  children: ReactNode;
}) => {
  const row = useRef<HTMLDivElement>(null);
  const [isLegendBelow, setIsLegendBelow] = useState(false);

  const measure = useCallback(() => {
    const element = row.current;
    if (!element) return;
    const [grid, slot] = Array.from(element.children) as HTMLElement[];
    if (slot) setIsLegendBelow(slot.offsetTop > grid.offsetTop);
  }, []);

  // A longer axis re-decides the break without the row ever changing size.
  useLayoutEffect(measure);

  // And on resize, which no render reports.
  useEffect(() => {
    const element = row.current;
    if (!element) return;
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [measure]);

  // Beside the grid the gap parts two columns; under it, it only leads a line.
  const legendGap = isLegendBelow ? spacing.f4 : spacing.f16;

  return (
    <Stack direction="vertical" gap="r16">
      {/* the variant `ChartHeader` gives every other chart, so none shouts */}
      {title !== undefined && <Text variant="ChartTitle">{title}</Text>}
      <Box
        ref={row}
        display="flex"
        flexWrap="wrap"
        gap={legendGap}
        alignItems="flex-start"
      >
        {children}
        {legend?.(isLegendBelow ? 'horizontal' : 'vertical')}
      </Box>
    </Stack>
  );
};

const LegendColumn = ({
  title,
  direction,
}: {
  title?: ReactNode;
  direction: 'horizontal' | 'vertical';
}) => (
  // Only the items turn: the heading stays above, so two lines under, not five.
  <Stack direction="vertical" gap="r8">
    {title !== undefined && (
      <Text variant="Smaller" isEmphazed>
        {title}
      </Text>
    )}
    <ChartLegend
      shape="rectangle"
      direction={direction}
      legendSize="Smaller"
      legendColor="textSecondary"
    />
  </Stack>
);

type HeatmapGridProps<T extends string> = HeatmapBaseProps<T> & {
  /** How one value is painted. The only thing the two scales disagree on. */
  appearanceOf: (value: T) => { color: string; opacity: number };
};

const HeatmapGrid = <T extends string>({
  rows,
  columns,
  appearanceOf,
  labelEvery = 1,
  /* `spacing` is not `as const`, so its members need telling they are lengths */
  cellHeight = spacing.f20 as HeatmapLength,
  cellGap = spacing.f4 as HeatmapLength,
  labelWidth = '7rem',
  cellMinWidth = spacing.f12 as HeatmapLength,
  formatColumnTick,
  formatValue = (value) => String(value),
  renderTooltip,
}: HeatmapGridProps<T>) => {
  // read off the axis once, not once per cell
  const columnEnds = getColumnEnds(columns);
  const columnCount = Math.max(columns.length, 1);
  // The width the grid is worth defending: every column readable, plus the gaps.
  const roomyGrid = `${columnCount} * ${PREFERRED_CELL_WIDTH} + ${
    columnCount - 1
  } * ${cellGap}`;
  // Below this the cells give up room, after the gutter has reached its floor.
  const roomyWidth = `calc(${LABEL_MIN_WIDTH} + ${roomyGrid})`;

  return (
    /* Labels outside the scroller, so the scrollbar covers the tiles alone. */
    <Box
      display="grid"
      /* Capped by what a roomy grid leaves: the gutter yields before the cells. */
      gridTemplateColumns={`fit-content(min(${labelWidth}, max(${LABEL_MIN_WIDTH}, calc(100% - (${roomyGrid}))))) 1fr`}
      gridTemplateRows={`repeat(${rows.length + 1}, auto) ${spacing.f8}`}
      gap={cellGap}
      alignItems="center"
      /* A basis, not a floor: it breaks the legend away before the cells shrink. */
      flex={`1 1 ${roomyWidth}`}
      minWidth={0}
    >
      {rows.map((row, rowIndex) => (
        <GutterCell
          // the grid below names its rows, so this column is for the eye only
          aria-hidden="true"
          key={`${row.label}-${rowIndex}`}
          gridColumn={1}
          gridRow={rowIndex + 1}
          maxWidth={labelWidth}
          textAlign="right"
          pr={spacing.f8}
        >
          {/* tooltip only when the ellipsis actually took something away */}
          <ConstrainedText
            color="textSecondary"
            text={<Text variant="Smaller">{row.label}</Text>}
          />
        </GutterCell>
      ))}

      {/* `subgrid` keeps the columns level; y scrolls on the x bar's height alone */}
      <Box
        role="grid"
        gridColumn={2}
        gridRow="1 / -1"
        overflowX="auto"
        overflowY="hidden"
        display="grid"
        gridTemplateRows="subgrid"
        /* `repeat(0, …)` is invalid CSS, which would drop the whole template */
        gridTemplateColumns={`repeat(${columnCount}, minmax(${cellMinWidth}, 1fr))`}
        gridColumnGap={cellGap}
      >
        {rows.map((row, rowIndex) => (
          <GridRow
            role="row"
            aria-label={row.label}
            key={`${row.label}-${rowIndex}`}
          >
            {/* driven by the columns: a short row must not pull the next one out */}
            {columns.map((column, columnIndex) => {
              const value = row.cells[columnIndex] ?? null;
              const key = `${row.label}-${rowIndex}-${columnIndex}`;

              // still a cell of the row, so the columns keep lining up
              if (value === null) {
                return <Box role="gridcell" key={key} />;
              }

              const cell = {
                row,
                column,
                columnEnd: columnEnds[columnIndex],
                columnIndex,
                value,
              };
              const { color, opacity } = appearanceOf(value);

              return (
                <Tooltip
                  key={key}
                  placement="top"
                  overlay={
                    renderTooltip
                      ? renderTooltip(cell)
                      : defaultTooltip(cell, formatValue)
                  }
                >
                  <Cell
                    $color={color}
                    $opacity={opacity}
                    $height={cellHeight}
                    tabIndex={0}
                    role="gridcell"
                    /* without the slot, a screen reader counts columns to place it */
                    aria-label={`${row.label}, ${formatSlot(
                      column,
                      columnEnds[columnIndex],
                    )}, ${formatValue(value)}`}
                  />
                </Tooltip>
              );
            })}
          </GridRow>
        ))}

        <GridRow role="row">
          {columns.map((column, columnIndex) => (
            <AxisTick
              role="columnheader"
              key={`tick-${columnIndex}`}
              textAlign="center"
              pt={spacing.f4}
            >
              {columnIndex % labelEvery === 0 && (
                <Text variant="Smaller" color="textSecondary">
                  {formatColumnTick ? (
                    formatColumnTick(column)
                  ) : (
                    /* a daily axis by time of day prints "00:00" over every column */
                    <FormattedDateTime
                      format={
                        isDailyOrLongerSlot(column, columnEnds[columnIndex])
                          ? 'day-month-abbreviated'
                          : 'time'
                      }
                      value={column}
                    />
                  )}
                </Text>
              )}
            </AxisTick>
          ))}
        </GridRow>
      </Box>
    </Box>
  );
};

const DiscreteHeatmap = ({
  scale: _scale,
  title,
  legendTitle,
  showLegend = true,
  ...gridProps
}: DiscreteHeatmapProps) => {
  const { rows } = gridProps;
  const chartId = useChartId();
  const { getColor, isSelected, register } = useChartLegend();

  /**
   * Keyed on the *content* of the series, not the identity of `rows`: a caller
   * rebuilding its rows every render must not re-register, since registering
   * re-renders the wrapper above us.
   */
  const seriesKey = useMemo(
    () =>
      JSON.stringify(
        Array.from(
          new Set(
            rows.flatMap((row) =>
              row.cells.filter((cell): cell is string => cell !== null),
            ),
          ),
        ).sort(),
      ),
    [rows],
  );
  const seriesNames = useMemo(
    () => JSON.parse(seriesKey) as string[],
    [seriesKey],
  );

  useEffect(() => {
    register(chartId, seriesNames);
  }, [chartId, register, seriesNames]);

  /**
   * Resolved once per distinct value, not once per cell: a dense grid asks the
   * same four questions hundreds of times, and `getColor` warns on each miss.
   */
  const colorOfValue = useMemo(
    () => new Map(seriesNames.map((name) => [name, getColor(name)])),
    [seriesNames, getColor],
  );

  const appearanceOf = useCallback(
    (value: string) => ({
      color: colorOfValue.get(value) ?? 'transparent',
      opacity: isSelected(value) ? 1 : DIMMED_CELL_OPACITY,
    }),
    [colorOfValue, isSelected],
  );

  return (
    <HeatmapFrame
      title={title}
      legend={
        showLegend
          ? (direction) => (
              <LegendColumn title={legendTitle} direction={direction} />
            )
          : undefined
      }
    >
      <HeatmapGrid {...gridProps} appearanceOf={appearanceOf} />
    </HeatmapFrame>
  );
};

/**
 * A grid of one metric read across two dimensions: one row per entity, one
 * column per slot, each cell colored by its value and describing itself on
 * hover or focus. Title, grid, x-axis and legend all belong to the component.
 *
 * Values are names, and the legend is where they get their color; clicking one
 * filters the grid.
 *
 * ```tsx
 * <Heatmap
 *   title="Monitoring services status"
 *   legendTitle="Service status"
 *   rows={rows}
 *   columns={timeSlots}
 *   scale={{ colorSet: { Ok: theme.statusHealthy, … } }}
 * />
 * ```
 */
export const Heatmap = ({ scale, ...gridProps }: HeatmapProps) => {
  // no colorSet: a ChartLegendWrapper the caller owns is holding the colors
  if (!scale?.colorSet) {
    return <DiscreteHeatmap scale={scale} {...gridProps} />;
  }

  return (
    <ChartLegendWrapper
      colorSet={scale.colorSet}
      sortOrder={scale.sortOrder}
      labelMap={scale.labelMap}
    >
      <DiscreteHeatmap {...gridProps} />
    </ChartLegendWrapper>
  );
};
