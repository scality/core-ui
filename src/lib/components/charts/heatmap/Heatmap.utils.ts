/** Opacity of a cell whose series has been filtered out through the legend. */
export const DIMMED_CELL_OPACITY = 0.15;

/**
 * Opacity given to the value 0 on a continuous scale, so the low end of the
 * ramp stays visible instead of dissolving into the background.
 */
export const DEFAULT_MIN_OPACITY = 0.1;

/**
 * Largest value in the grid, ignoring the empty cells — 0 when there is none.
 * A continuous heatmap uses it as the top of its ramp unless the caller pins
 * `max` itself, which is what a fixed domain (a percentage, a quota) wants.
 */
export const getHeatmapMaxValue = (
  rows: { cells: (number | null)[] }[],
): number =>
  rows.reduce<number>(
    (max, row) =>
      row.cells.reduce<number>(
        (rowMax, cell) => (cell === null ? rowMax : Math.max(rowMax, cell)),
        max,
      ),
    0,
  );

/**
 * Where `value` sits on the ramp, as an opacity between `minOpacity` and 1.
 * Values outside [0, max] are clamped, so an outlier — or a value the caller
 * pinned a smaller `max` than — cannot push a cell past full opacity.
 *
 * Rounded to two decimals, which is past the eye's resolution and bounds the
 * number of distinct values: a dense grid then generates a hundred styled
 * classes at worst, not one per cell.
 */
export const getRampOpacity = (
  value: number,
  max: number,
  minOpacity: number,
): number => {
  // Every value is 0, or the domain is degenerate: the ramp has nothing to say.
  if (max <= 0) {
    return minOpacity;
  }

  const ratio = Math.min(Math.max(value / max, 0), 1);
  return Math.round((minOpacity + (1 - minOpacity) * ratio) * 100) / 100;
};

/**
 * The end of every column's slot, read off the axis: a column lasts until the
 * next one starts. That is what lets the tooltip name the slot — "03:30 to
 * 04:00" — rather than the instant it opens, which on its own says nothing
 * about whether a cell covers five minutes or a day.
 *
 * The last column has no next one, so it reuses the gap before it. A single
 * column has no gap at all, and gets an end equal to its start rather than an
 * invented duration — the tooltip reads that back as "no slot to show".
 */
export const getColumnEnds = (columns: Date[]): Date[] =>
  columns.map((column, index) => {
    const next = columns[index + 1];
    if (next) {
      return next;
    }

    const previous = columns[index - 1];
    return new Date(
      column.getTime() + (previous ? column.getTime() - previous.getTime() : 0),
    );
  });

/**
 * Whether two instants land on the same calendar day, in the reader's own time
 * zone — the one the axis and the tooltip are already printed in.
 *
 * Not an elapsed-time question, which is why `getDateDaysDiff` cannot answer
 * it: 23:00 and 00:00 are an hour apart and two different days, and it is the
 * day the tooltip has to name.
 */
export const isSameCalendarDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();
