import { NAN_STRING } from '../../constants';
import { TooltipDateFormat } from './ChartTooltip';
import { UnitRange } from '../types';
import { formatISONumber } from '../../../utils';

/* -------------------------------------------------------------------------- */
/*                                  constants                                 */
/* -------------------------------------------------------------------------- */

export const maxWidthTooltip = { maxWidth: '20rem' };

/**
 * Splits a tick label into its display lines. A category label may embed a
 * second line (e.g. a date on a midnight crossover) using "\n" as the
 * separator. Single source of truth for that convention.
 */
export const splitTickLines = (value: string | number): string[] =>
  String(value).split('\n');

/* -------------------------------------------------------------------------- */
/*                               utils functions                              */
/* -------------------------------------------------------------------------- */

/**
 * Get the appropriate rounding increment based on value magnitude.
 * - For values < 5 * magnitude: use half magnitude (finer granularity)
 * - For values >= 5 * magnitude: use full magnitude
 *
 * Examples:
 * - 150 → increment 50 (150 < 500, so use 100/2)
 * - 550 → increment 100 (550 >= 500, so use 100)
 * - 1500 → increment 500 (1500 < 5000, so use 1000/2)
 * - 5500 → increment 1000 (5500 >= 5000, so use 1000)
 */
const getIncrement = (value: number): number => {
  if (value < 10) return 1;

  const magnitude = Math.pow(10, Math.floor(Math.log10(value)));

  // If value is in lower half of magnitude range, use half magnitude
  if (value < 5 * magnitude) {
    return magnitude / 2;
  }

  // Otherwise use full magnitude
  return magnitude;
};

/**
 * Round a value to a nice number for chart display
 * Used by Barchart and LineTimeSerieChart for Y-axis scaling
 */
export const getRoundReferenceValue = (value: number): number => {
  if (value <= 0) return 1; // Default for zero or negative values

  // Buffer the value by 10% to avoid being too close to the edge of the chart
  const bufferedValue = value * 1.1;

  if (value >= 10) {
    const increment = getIncrement(value);
    const remainder = value % increment;
    const roundedDown = value - remainder;
    const roundedUp = roundedDown + increment;

    // If remainder is less than half the increment, round down
    if (remainder < increment / 2) {
      return roundedDown;
    }

    // If rounding up would exceed the buffered max, round down
    if (roundedUp > bufferedValue) {
      return roundedDown;
    }

    // Otherwise, round up
    return roundedUp;
  }

  // For values < 10, use the magnitude-based approach
  const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
  const remainder = bufferedValue % magnitude;

  return remainder === 0 ? bufferedValue : bufferedValue - remainder;
};

/**
 * Generate tick values for Y-axis
 * Used by Barchart and LineTimeSerieChart
 */
export const getTicks = (
  topValue: number,
  isSymmetrical: boolean,
): number[] => {
  const possibleTickNumbers = [4, 3];
  const numberOfTicks =
    possibleTickNumbers.find((number) => topValue % (number - 1) === 0) || 3; // Default to 3 ticks if no match

  const tickInterval = topValue / (numberOfTicks - 1);
  const ticks = Array.from(
    { length: numberOfTicks },
    (_, index) => index * tickInterval,
  );
  if (isSymmetrical) {
    // Create negative ticks in order without 0
    const negativeTicks = Array.from(
      { length: numberOfTicks - 1 },
      (_, index) => (index - numberOfTicks + 1) * tickInterval,
    );
    ticks.unshift(...negativeTicks);
  }
  return ticks;
};

/* -------------------------------------------------------------------------- */
/*                             logarithmic Y axis                             */
/* -------------------------------------------------------------------------- */

/**
 * Smallest strictly positive value in a chart dataset, or `null` when there is
 * none.
 *
 * A log axis is bounded from below by the data, not by zero, so it needs this
 * where a linear axis only ever needs the maximum.
 *
 * @param data - Recharts rows @param excludeKey - Row key that is not a value
 * (e.g. 'category', 'timestamp')
 */
export const getMinPositiveValue = (
  // Read-only and shape-agnostic: it is called on both charts' row types, which
  // differ in whether a value may be null.
  data: readonly Readonly<Record<string, unknown>>[],
  excludeKey: string,
): number | null => {
  let min: number | null = null;
  data.forEach((row) => {
    Object.entries(row).forEach(([key, value]) => {
      if (key === excludeKey) return;
      const numberValue = typeof value === 'string' ? Number(value) : value;
      if (typeof numberValue !== 'number' || !Number.isFinite(numberValue)) {
        return;
      }
      if (numberValue > 0 && (min === null || numberValue < min)) {
        min = numberValue;
      }
    });
  });
  return min;
};

/**
 * A logarithmic Y axis: its domain, its ticks, and where a measured zero goes.
 *
 * Three things make a log axis unlike the linear one built by
 * `getRoundReferenceValue` + `getTicks`:
 *
 * - **It cannot start at zero.** Zero has no logarithm, so the scale is
 *   bounded by the decades that enclose the data — values from 3 to 400 give
 *   a 1..1000 scale — and `allowDataOverflow` clips anything below rather than
 *   letting the axis chase it.
 * - **Its ticks are the decades.** Evenly spaced linear ticks on a log axis
 *   crowd into the top of the plot and read as a broken chart. When the data
 *   spans more decades than `maxTicks`, whole decades are skipped at a
 *   regular stride — never subdivided.
 * - **A measured zero needs somewhere to go.** With `withZeroBand`, the axis
 *   reserves one slot below its first decade and returns it as `zeroValue`.
 *   Zeros are drawn there and the tick is labelled `0`, so "the metric read
 *   zero" stops being indistinguishable from "no data" — which is what
 *   dropping them made it. The slot is a reserved position, not a decade:
 *   nothing is ever plotted between it and the first decade.
 *
 * @param minPositive - Smallest positive value, from `getMinPositiveValue`
 * @param max - Largest value in the dataset
 * @param options.maxTicks - Upper bound on the number of decade ticks
 * @param options.withZeroBand - Reserve a slot for measured zeros. Pass it only
 *   when the data actually holds one, or the axis spends height on nothing.
 */
export const getLogAxis = (
  minPositive: number | null,
  max: number,
  options: { maxTicks?: number; withZeroBand?: boolean } = {},
): {
  domain: [number, number];
  ticks: number[];
  /** Axis position standing in for a measured zero, or `null` when unused. */
  zeroValue: number | null;
} => {
  const { maxTicks = 6, withZeroBand = false } = options;

  const withBand = (decades: number[]) => {
    const firstDecade = decades[0];
    const top = decades[decades.length - 1];
    const stride = Math.ceil(decades.length / maxTicks);
    const decadeTicks =
      stride <= 1
        ? decades
        : // Keep both ends: the axis must state its own bounds even when
          // decades are skipped.
          [
            ...decades.filter((_, index) => index % stride === 0),
            top,
          ].filter((value, index, all) => all.indexOf(value) === index);

    if (!withZeroBand) {
      return {
        domain: [firstDecade, top] as [number, number],
        ticks: decadeTicks,
        zeroValue: null,
      };
    }

    // One decade's worth of height, below the scale, standing in for zero.
    const zeroValue = firstDecade / 10;
    return {
      domain: [zeroValue, top] as [number, number],
      ticks: [zeroValue, ...decadeTicks],
      zeroValue,
    };
  };

  // Nothing positive to plot: a single empty decade, so the axis still draws.
  if (
    minPositive === null ||
    minPositive <= 0 ||
    !Number.isFinite(max) ||
    max <= 0
  ) {
    return withBand([1, 10]);
  }

  const lowExponent = Math.floor(Math.log10(minPositive));
  // A max sitting exactly on a decade is already its own bound; anything else
  // rounds up to the next.
  const highExponent = Math.ceil(Math.log10(max));
  // Guarantee at least one decade of height even when every value shares a
  // magnitude.
  const topExponent =
    highExponent > lowExponent ? highExponent : lowExponent + 1;

  return withBand(
    Array.from(
      { length: topExponent - lowExponent + 1 },
      (_, index) => 10 ** (lowExponent + index),
    ),
  );
};

/**
 * Formats one tick of a logarithmic axis.
 *
 * Unlike `formatTickValue`, the number of decimals comes from the tick's own
 * magnitude rather than from the axis maximum: a 0.01..1000 axis has to render
 * `0.01` and `1k` on the same axis, and a single decimal count cannot serve
 * both.
 *
 * @param zeroValue - The reserved zero band from `getLogAxis`. It is labelled
 *   `0`, not by the position it happens to occupy.
 */
export const formatLogTickValue = (
  value: number,
  zeroValue: number | null = null,
): string => {
  if (zeroValue !== null && value === zeroValue) return '0';
  if (!Number.isFinite(value) || value <= 0) return '';
  const exponent = Math.log10(value);
  return formatISONumber(value, {
    decimals: exponent < 0 ? Math.ceil(-exponent) : 0,
    fixedDecimals: exponent < 0,
    compact: value >= 10000,
  });
};

/**
 * Whether any value in the data is a measured zero.
 *
 * `getLogAxis` only reserves a zero band when asked, and asking costs a
 * decade's worth of plot height — so ask only when there is a zero to show.
 *
 * @param data - Recharts rows
 * @param excludeKey - Row key that is not a value (e.g. 'category', 'timestamp')
 */
export const hasZeroValue = (
  data: readonly Readonly<Record<string, unknown>>[],
  excludeKey: string,
): boolean =>
  data.some((row) =>
    Object.entries(row).some(([key, value]) => {
      if (key === excludeKey) return false;
      const numberValue = typeof value === 'string' ? Number(value) : value;
      return numberValue === 0;
    }),
  );

/**
 * Moves the values a log axis cannot plot to where the axis can show them.
 *
 * `log(0)` is minus infinity, so a zero left in the data draws a bar or a line
 * segment reaching off the bottom of the plot. Given a `zeroValue` from
 * `getLogAxis`, a zero is moved to that reserved band instead, where the axis
 * labels it `0` — so a measured zero stays visible, and stays distinguishable
 * from a missing sample. Dropping it could not do either.
 *
 * Negatives have no band and no logarithm, so they are dropped. A series that
 * goes negative does not belong on a log axis at all.
 *
 * With no `zeroValue`, zeros are dropped too — the fallback for a caller that
 * did not reserve a band.
 *
 * @param data - Recharts rows
 * @param excludeKey - Row key that is not a value (e.g. 'category', 'timestamp')
 * @param zeroValue - The reserved zero band, or `null` to drop zeros
 */
export const placeNonPositiveValues = <T extends Record<string, unknown>>(
  data: readonly T[],
  excludeKey: string,
  zeroValue: number | null,
): T[] =>
  data.map((row) => {
    const placed: Record<string, unknown> = { ...row };
    Object.entries(row).forEach(([key, value]) => {
      if (key === excludeKey) return;
      const numberValue = typeof value === 'string' ? Number(value) : value;
      if (typeof numberValue !== 'number') return;
      if (numberValue === 0) {
        placed[key] = zeroValue;
      } else if (!(numberValue > 0)) {
        placed[key] = null;
      }
    });
    return placed as T;
  });

/**
 * Turns a plotted value back into the value the caller gave, for display.
 *
 * A zero sits at its reserved band in the Recharts data so the axis can draw
 * it; a tooltip must still say `0`. No real value can collide with the band —
 * `getLogAxis` puts it below the smallest positive value in the data.
 */
export const readLogPlottedValue = (
  value: number,
  zeroValue: number | null,
): number => (zeroValue !== null && value === zeroValue ? 0 : value);

/**
 * Return the unit label based on the current dataset, and the valueBase which is used to convert the data
 * Used by LineTimeSerieChart
 * @param unitRange - Array of threshold and label pairs
 * @param maxValue - The maximum value among the data set
 * @returns Object with valueBase and unitLabel
 */
export function getUnitLabel(
  unitRange: {
    threshold: number;
    label: string;
  }[],
  maxValue: number,
): {
  valueBase: number;
  unitLabel: string | undefined;
} {
  if (!unitRange || unitRange.length === 0) {
    return {
      valueBase: 1,
      unitLabel: undefined,
    };
  }
  // first sort the unitRange
  unitRange.sort(
    (
      unitA: {
        threshold: number;
        label: string;
      },
      unitB: {
        threshold: number;
        label: string;
      },
    ) => {
      return unitA.threshold - unitB.threshold;
    },
  );
  let index = unitRange.findIndex((range) => range.threshold > maxValue);

  // last unit
  if (index === -1) {
    index = unitRange.length;
  }

  if (index === 0) {
    return {
      valueBase: unitRange[index].threshold || 1,
      unitLabel: unitRange[index].label,
    };
  }

  return {
    // if the threshold is 0, we use 1 as the value base to avoid division by 0
    valueBase: unitRange[index - 1].threshold || 1,
    unitLabel: unitRange[index - 1].label,
  };
}

/**
 * Computes unit label and normalizes chart data based on unit range.
 * This is shared logic used by both Barchart and LineTimeSerieChart.
 *
 * @param data - Chart data to normalize
 * @param maxValue - Maximum value in the dataset
 * @param unitRange - Optional unit range configuration for automatic scaling
 * @param excludeKey - Key to exclude from normalization (e.g., 'category' for Barchart, 'timestamp' for LineTimeSerieChart)
 * @returns Object containing unit label, top value for Y-axis, and normalized data
 */
export const normalizeChartDataWithUnits = <T extends Record<string, any>>(
  data: T[],
  maxValue: number,
  unitRange: UnitRange | undefined,
  excludeKey: string,
): {
  unitLabel: string | undefined;
  topValue: number;
  rechartsData: T[];
  topDomain: number;
  valueBase: number;
} => {
  // If no unit range provided, just calculate top value without unit conversion
  if (!unitRange || unitRange.length === 0) {
    const topValue = getRoundReferenceValue(maxValue);
    return {
      unitLabel: undefined,
      topValue,
      rechartsData: data,
      topDomain: maxValue * 1.1,
      valueBase: 1,
    };
  }

  // Get appropriate unit and value base for normalization
  const { valueBase, unitLabel } = getUnitLabel(unitRange, maxValue);
  const basedValue = maxValue / valueBase;
  const topValue = getRoundReferenceValue(basedValue);
  const topDomain = basedValue * 1.1;
  // Normalize all numeric values by dividing by valueBase
  const rechartsData = data.map((dataPoint) => {
    const normalizedDataPoint: Record<string, number | string> = {
      ...dataPoint,
    };
    Object.entries(dataPoint).forEach(([key, value]) => {
      if (key !== excludeKey && typeof value === 'number') {
        normalizedDataPoint[key] = value / valueBase;
      }
    });
    return normalizedDataPoint as T;
  });

  return { unitLabel, topValue, rechartsData, topDomain, valueBase };
};

/**
 * Formats a single value for tooltip display, re-deriving the unit from the
 * value's own magnitude when a unitRange is provided.
 *
 * Chart data is normalized once against the dataset maximum so the Y-axis can
 * use a single unit. A value that is small relative to that maximum would
 * otherwise render with many decimals under the axis unit (e.g. "0.005 kop/s").
 * Re-applying the unitRange per value keeps the tooltip readable (e.g. "5 op/s")
 * independently of the axis unit.
 *
 * @param value - The normalized value as stored in the Recharts dataset
 * @param valueBase - The factor the dataset was divided by during normalization
 * @param unitRange - Unit range used for the chart; when empty the value is shown as-is
 * @param fallbackUnitLabel - Unit label used when no unitRange is provided (e.g. "%")
 * @param fixedDecimals - When true (default) always show 2 decimals; set false to keep whole values bare (e.g. counts)
 */
export const formatTooltipValueWithUnit = (
  value: number,
  valueBase: number,
  unitRange: UnitRange | undefined,
  fallbackUnitLabel?: string,
  fixedDecimals = true,
): string => {
  if (!Number.isFinite(value)) return '-';

  if (!unitRange || unitRange.length === 0) {
    const formatted = formatISONumber(value, {
      fixedDecimals,
      compact: true,
    });
    return `${formatted}${fallbackUnitLabel ? ` ${fallbackUnitLabel}` : ''}`;
  }

  const originalValue = value * valueBase;
  const { valueBase: tooltipValueBase, unitLabel } = getUnitLabel(
    unitRange,
    Math.abs(originalValue),
  );
  const formatted = formatISONumber(originalValue / tooltipValueBase, {
    fixedDecimals,
    compact: true,
  });
  return `${formatted}${unitLabel ? ` ${unitLabel}` : ''}`;
};

/**
 * This function manually adds the missing data points with `null` value caused by downtime of the VMs
 * Missing data points are only added when the gap between consecutive data points is bigger than 2 intervals
 * Used by LineTimeSerieChart and Sparkline
 *
 * @param originalValues - The array of the data points are already sorted according to the time series
 * @param startingTimeStamp - The starting timestamp in seconds
 * @param sampleDuration - The time span value in seconds
 * @param sampleInterval - The time difference between two data points in seconds
 */
export function addMissingDataPoint(
  originalValues: [number, number | string | null][],
  startingTimeStamp?: number,
  sampleDuration?: number,
  sampleInterval?: number,
): [number, number | string | null][] {
  if (
    !originalValues ||
    startingTimeStamp === undefined ||
    !sampleDuration ||
    !sampleInterval ||
    startingTimeStamp < 0 ||
    sampleDuration <= 0 ||
    sampleInterval <= 0
  ) {
    return [];
  }

  // If there are no original values, generate placeholder timestamps for the entire duration
  if (originalValues.length === 0) {
    const newValues: [number, number | string | null][] = [];
    for (
      let i = startingTimeStamp;
      i < startingTimeStamp + sampleDuration;
      i += sampleInterval
    ) {
      newValues.push([i, NAN_STRING]);
    }
    return newValues;
  }

  const newValues: [number, number | string | null][] = [];

  // add missing data points for the starting time
  for (
    let i = startingTimeStamp;
    i < originalValues[0][0];
    i += sampleInterval
  ) {
    newValues.push([i, NAN_STRING]);
  }

  // Process all but the last element
  for (let i = 0; i < originalValues.length - 1; i++) {
    if (
      originalValues[i][0] < startingTimeStamp ||
      originalValues[i][0] > startingTimeStamp + sampleDuration
    ) {
      continue;
    }

    // Always add the current data point
    newValues.push(originalValues[i]);

    const currentTimestamp = originalValues[i][0];
    const nextTimestamp = originalValues[i + 1][0];
    const gap = nextTimestamp - currentTimestamp;

    // Calculate how many missing points to add
    const missingIntervals = Math.floor(gap / sampleInterval) - 1;

    // Add missing data points with NAN_STRING (only executes if missingIntervals > 0)
    for (let j = 1; j <= missingIntervals; j++) {
      const missingTimestamp = currentTimestamp + j * sampleInterval;
      newValues.push([missingTimestamp, NAN_STRING]);
    }
  }

  // Add the last element
  newValues.push(originalValues[originalValues.length - 1]);

  // add missing data points for the ending time
  for (
    let i = originalValues[originalValues.length - 1][0] + sampleInterval;
    i < startingTimeStamp + sampleDuration;
    i += sampleInterval
  ) {
    newValues.push([i, NAN_STRING]);
  }

  return newValues;
}
/**
 * Date Format Reference Table
 * ============================
 *
 * This table documents the date formatting logic used across charts:
 * - X-Axis Format: Used for chart axis labels (formatXAxisDate + LineTimeSerieChart's formatXAxisLabel)
 * - Tooltip Format: Used for tooltip headers (getTooltipDateFormat)
 *
 * ┌─────────────────┬──────────────┬────────────────────────┬──────────────────┬──────────────────────────────────────────┬───────────────────────────┐
 * │ Interval        │ Duration (s) │ X-axis format          │ Example (X-axis) │ Tooltip format                           │ Example (Tooltip)         │
 * ├─────────────────┼──────────────┼────────────────────────┼──────────────────┼──────────────────────────────────────────┼───────────────────────────┤
 * │ Last hour       │ ≤ 3,600      │ HH:MM                  │ 14:05            │ DD MMM HH:MM:SS                          │ 01 Oct 00:15:00           │
 * │ Last 24 hours   │ ≤ 86,400     │ HH:MM                  │ 23:00            │ DD MMM HH:MM                             │ 01 Oct 00:15              │
 * │ Last 7 days     │ ≤ 604,800    │ DD MMM HH:MM           │ 27 Sep 10:12     │ DD MMM HH:MM                             │ 01 Oct 00:15              │
 * │ Long term       │ > 604,800    │ DDMMMYY                │ 15Sep25          │ DD MMM YYYY HH:MM                        │ 01 Oct 2025 00:15         │
 * └─────────────────┴──────────────┴────────────────────────┴──────────────────┴──────────────────────────────────────────┴───────────────────────────┘
 *
 * Note: Duration is in seconds. Some intervals share the same format, which is why both functions only have 3 cases.
 */

/**
 * Get the format of the date based on the duration
 * Used by Barchart CustomTick component
 * @param duration - Duration in seconds
 * @returns Formatted string type
 */
export const formatXAxisDate = (
  duration: number,
): 'time' | 'day-month-abbreviated' | 'chart-long-term-date' => {
  if (duration <= 24 * 60 * 60) {
    return 'time';
  } else if (duration <= 7 * 24 * 60 * 60) {
    return 'day-month-abbreviated';
  } else {
    return 'chart-long-term-date';
  }
};

/**
 * Get the format of the date based on the duration
 * Used by TooltipHeader component
 * @param duration - Duration in seconds
 * @returns Formatted string type
 */
export const getTooltipDateFormat: (duration: number) => TooltipDateFormat = (
  duration: number,
) => {
  if (duration <= 60 * 60) {
    return 'day-month-abbreviated-hour-minute-second';
  } else if (duration <= 7 * 24 * 60 * 60) {
    return 'day-month-abbreviated-hour-minute';
  } else {
    return 'day-month-abbreviated-year-hour-minute';
  }
};

/**
 * Formats a tick value for chart Y-axis display.
 * - Fixed decimals for alignment when topValue < 1 (e.g., 0.1 → 0.10)
 * - Compact notation for large values (>= 10k)
 */
export const formatTickValue = (value: number, topValue: number): string => {
  const decimals = topValue < 1 ? Math.ceil(-Math.log10(topValue)) + 1 : 2;
  return formatISONumber(value, {
    decimals,
    fixedDecimals: topValue < 1,
    compact: topValue >= 10000,
  });
};
