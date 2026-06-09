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
