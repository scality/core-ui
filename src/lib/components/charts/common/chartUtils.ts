import { NAN_STRING } from '../../constants';
import { TooltipDateFormat } from './ChartTooltip';
import { UnitRange } from '../types';

/* -------------------------------------------------------------------------- */
/*                                  constants                                 */
/* -------------------------------------------------------------------------- */

export const maxWidthTooltip = { maxWidth: '20rem' };

/* -------------------------------------------------------------------------- */
/*                               utils functions                              */
/* -------------------------------------------------------------------------- */

/**
 * Round a value to a nice number for chart display
 * Used by Barchart and LineTimeSerieChart for Y-axis scaling
 */
export const getRoundReferenceValue = (value: number): number => {
  if (value <= 0) return 1; // Default for zero or negative values

  // Get the magnitude (10^n where n is the number of digits - 1)
  const magnitude = Math.pow(10, Math.floor(Math.log10(value)));

  // Buffer the value by 10% to avoid being too close to the edge of the chart
  const bufferedValue = value * 1.1;

  // Normalized value between 1 and 10
  const normalized = bufferedValue / magnitude;

  // Round to nice numbers based on normalized value
  // appearance for small values
  let result: number;

  if (normalized <= 1) result = magnitude;
  else if (normalized <= 2) result = 2 * magnitude;
  else if (value > 10 && normalized <= 4) result = 4 * magnitude;
  else if (normalized <= 5) result = 5 * magnitude;
  else if (value > 10 && normalized <= 7.5) result = 7.5 * magnitude;
  else result = 10 * magnitude;

  return result;
};

/**
 * Generate tick values for Y-axis
 * Used by Barchart and LineTimeSerieChart
 */
export const getTicks = (topValue: number, isSymmetrical: boolean) => {
  if (topValue < 10) {
    if (isSymmetrical) {
      return [-topValue, 0, topValue];
    } else {
      return [0, topValue];
    }
  }
  const possibleTickNumbers = [4, 3, 6];
  const numberOfTicks =
    possibleTickNumbers.find((number) => topValue % (number - 1) === 0) || 2; // Default to 2 ticks if no match

  const tickInterval = topValue / (numberOfTicks - 1);
  const ticks = Array.from(
    { length: numberOfTicks },
    (_, index) => index * tickInterval,
  );
  if (isSymmetrical) {
    // Create negative ticks in order without 0
    const negativeTicks = Array.from(
      { length: numberOfTicks - 1 },
      (_, index) => -(numberOfTicks - 1 - index) * tickInterval,
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
  unitLabel: string;
} {
  if (!unitRange || unitRange.length === 0) {
    return {
      valueBase: 1,
      unitLabel: '',
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
      valueBase: unitRange[index].threshold,
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
} => {
  // If no unit range provided, just calculate top value without unit conversion
  if (!unitRange || unitRange.length === 0) {
    const topValue = getRoundReferenceValue(maxValue);
    return { unitLabel: undefined, topValue, rechartsData: data };
  }

  // Get appropriate unit and value base for normalization
  const { valueBase, unitLabel } = getUnitLabel(unitRange, maxValue);
  const topValue = getRoundReferenceValue(maxValue / valueBase);

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

  return { unitLabel, topValue, rechartsData };
};

/**
 * This function manually adds the missing data points with `null` value caused by downtime of the VMs
 * Missing data points are only added when the gap between consecutive data points is bigger than 2 intervals
 * Used by LineTimeSerieChart and Sparkline
 *
 * @param orginalValues - The array of the data points are already sorted according to the time series
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

  // If there are no original values, return empty array
  if (originalValues.length === 0) {
    return [];
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
