import { NAN_STRING } from '../../constants';

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
  // skip 1.5, 3, 4, 7.5 as top value for better chart
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
  const numberOfTicks = topValue % 3 === 0 ? 4 : 3;
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
  orginalValues: [number, number | string | null][],
  startingTimeStamp?: number,
  sampleDuration?: number,
  sampleInterval?: number,
): [number, number | string | null][] {
  if (
    !orginalValues ||
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
  if (orginalValues.length === 0) {
    return [];
  }

  const newValues: [number, number | string | null][] = [];

  // add missing data points for the starting time
  for (
    let i = startingTimeStamp;
    i < orginalValues[0][0];
    i += sampleInterval
  ) {
    newValues.push([i, NAN_STRING]);
  }

  // Process all but the last element
  for (let i = 0; i < orginalValues.length - 1; i++) {
    if (
      orginalValues[i][0] < startingTimeStamp ||
      orginalValues[i][0] > startingTimeStamp + sampleDuration
    ) {
      continue;
    }

    // Always add the current data point
    newValues.push(orginalValues[i]);

    const currentTimestamp = orginalValues[i][0];
    const nextTimestamp = orginalValues[i + 1][0];
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
  newValues.push(orginalValues[orginalValues.length - 1]);

  // add missing data points for the ending time
  for (
    let i = orginalValues[orginalValues.length - 1][0] + sampleInterval;
    i < startingTimeStamp + sampleDuration;
    i += sampleInterval
  ) {
    newValues.push([i, NAN_STRING]);
  }

  return newValues;
}

/**
 * Get the format of the date based on the duration
 * Used by Barchart CustomTick component
 * @param duration - Duration in milliseconds
 * @returns Formatted string type
 */
export const formatDate = (
  duration: number,
): 'time' | 'day-month-abbreviated' | 'chart-long-term-date' => {
  if (duration <= 24 * 60 * 60 * 1000) {
    return 'time';
  } else if (duration <= 7 * 24 * 60 * 60 * 1000) {
    return 'day-month-abbreviated';
  } else {
    return 'chart-long-term-date';
  }
};
