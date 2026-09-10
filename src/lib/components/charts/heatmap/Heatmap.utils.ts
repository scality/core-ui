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
