import React, { ReactNode, useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Box } from '../../box/Box';
import { spacing, Stack } from '../../../spacing';
import { Text } from '../../text/Text.component';
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
  getColumnEnds,
  isDailyOrLongerSlot,
  isSameCalendarDay,
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
   * last column. Equal to `column` on a single-column axis, which has no step
   * to read a duration from.
   */
  columnEnd: Date;
  columnIndex: number;
  value: T;
};

/**
 * Discrete values — a status, a state, any small set of names. The legend is
 * the single source of truth: it colors the cells, and clicking an item filters
 * the grid.
 */
export type HeatmapDiscreteScale = {
  type?: 'discrete';
  /**
   * The color of each value. Omit it to read a `ChartLegendWrapper` the caller
   * put above instead — which is how several charts come to share one legend.
   */
  colorSet?: ChartLegendWrapperProps['colorSet'];
  sortOrder?: ChartLegendWrapperProps['sortOrder'];
  /** Display labels for the legend items, when a value is not its own label. */
  labelMap?: ChartLegendWrapperProps['labelMap'];
};

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
  cellHeight?: string;
  cellGap?: string;
  /** The row label gutter. Labels truncate rather than widen it. */
  labelWidth?: string;
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
    outline: ${spacing.f2} solid ${({ theme }) => theme.selectedActive};
    outline-offset: ${spacing.f1};
  }
`;

/**
 * The row label gutter. `labelWidth` fixes the track, so the label has to clip
 * rather than widen it — `min-width` because a grid item defaults to the width
 * of its content and would otherwise refuse to shrink into the track.
 */
const RowLabel = styled(Box)`
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const defaultTooltip = <T extends string>(
  { row, column, columnEnd, value }: HeatmapCell<T>,
  formatValue: (value: T) => string,
) => (
  <Stack direction="vertical" gap="r2">
    <Text variant="Smaller" isEmphazed>
      {row.label}
    </Text>
    {/* the whole slot, not the instant it opens: a cell read on its own says
        nothing about whether it covers five minutes, an hour or a day */}
    <Text variant="Smaller" color="textSecondary">
      <FormattedDateTime
        format="day-month-abbreviated-hour-minute"
        value={column}
      />
      {columnEnd.getTime() > column.getTime() && (
        <>
          {' to '}
          {/* the end repeats the date whenever the slot changes day, or a
              nightly slot reads as "31 Aug 23:00 to 00:00" and a daily one as
              "31 Aug 00:00 to 00:00" — the same instant twice, apparently */}
          {isSameCalendarDay(column, columnEnd) ? (
            <FormattedDateTime format="time" value={columnEnd} />
          ) : (
            <FormattedDateTime
              format="day-month-abbreviated-hour-minute"
              value={columnEnd}
            />
          )}
        </>
      )}
    </Text>
    <Text variant="Smaller">{formatValue(value)}</Text>
  </Stack>
);

/** Title above, grid and legend side by side — the frame both scales share. */
const HeatmapFrame = ({
  title,
  legend,
  children,
}: {
  title?: ReactNode;
  legend?: ReactNode;
  children: ReactNode;
}) => (
  <Stack direction="vertical" gap="r16">
    {title !== undefined && (
      <Text variant="Large" isEmphazed>
        {title}
      </Text>
    )}
    <Box display="flex" gap={spacing.f24} alignItems="flex-start">
      {children}
      {legend}
    </Box>
  </Stack>
);

const LegendColumn = ({ title }: { title?: ReactNode }) => (
  <Stack direction="vertical" gap="r8">
    {title !== undefined && (
      <Text variant="Smaller" isEmphazed>
        {title}
      </Text>
    )}
    <ChartLegend
      shape="rectangle"
      direction="vertical"
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
  cellHeight = spacing.f20,
  cellGap = spacing.f4,
  labelWidth = '7rem',
  formatColumnTick,
  formatValue = (value) => String(value),
  renderTooltip,
}: HeatmapGridProps<T>) => {
  // read off the axis once, not once per cell
  const columnEnds = getColumnEnds(columns);

  return (
    <Box
      display="grid"
      /* `repeat(0, …)` is invalid CSS, which would drop the whole template */
      gridTemplateColumns={`${labelWidth} repeat(${Math.max(
        columns.length,
        1,
      )}, minmax(0, 1fr))`}
      gap={cellGap}
      alignItems="center"
      flex="1"
    >
      {rows.map((row, rowIndex) => (
        <React.Fragment key={`${row.label}-${rowIndex}`}>
          <RowLabel textAlign="right" pr={spacing.f8} title={row.label}>
            <Text variant="Smaller" color="textSecondary">
              {row.label}
            </Text>
          </RowLabel>

          {/* driven by the columns, not by the cells: that is what keeps a short
            row from pulling the next row's label out of the gutter */}
          {columns.map((column, columnIndex) => {
            const value = row.cells[columnIndex] ?? null;
            const key = `${row.label}-${rowIndex}-${columnIndex}`;

            if (value === null) {
              return <Box key={key} />;
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
                  role="img"
                  aria-label={`${row.label} ${formatValue(value)}`}
                />
              </Tooltip>
            );
          })}
        </React.Fragment>
      ))}

      {/* x-axis: an empty gutter cell, then one slot per column */}
      <Box />
      {columns.map((column, columnIndex) => (
        <Box key={`tick-${columnIndex}`} textAlign="center" pt={spacing.f4}>
          {columnIndex % labelEvery === 0 && (
            <Text variant="Smaller" color="textSecondary">
              {formatColumnTick ? (
                formatColumnTick(column)
              ) : (
                /* the axis says what it is about: a daily grid labelled by the
                   time of day prints "00:00" over every one of its columns */
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
        </Box>
      ))}
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
   * Keyed on the *content* of the series, not on the identity of `rows`: a
   * caller rebuilding its rows on every render — every story here does — must
   * not re-register, since registering re-renders the wrapper above us.
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
   * same four questions hundreds of times, and `getColor` warns each time it
   * has no answer — which it does on the first render of a `colorSet` function,
   * before our registration above has reached it.
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
      legend={showLegend ? <LegendColumn title={legendTitle} /> : undefined}
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
 * The values are names — a status, a state, any small set — and the legend is
 * where they get their color and their meaning. Clicking a legend item filters
 * the grid.
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
