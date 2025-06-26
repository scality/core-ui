export type KeysByType = Record<string, string[]>;

/**
 * Safely get numeric value from data item
 */
const getNumericValue = (
  item: Record<string, number | string>,
  key: string,
): number => {
  const value = item[key];
  return typeof value === 'number' && !isNaN(value) ? value : 0;
};

/**
 * Calculate the sum of data values for a specific item
 */
export const sumDataValues = (
  item: Record<string, number | string>,
  keysByType: KeysByType,
  typeToDisplay?: string,
  selectedLegend?: string,
): number => {
  if (!item || typeof item !== 'object') return 0;

  let totalSum = 0;

  Object.keys(keysByType).forEach((type) => {
    // Only consider types that match typeToDisplay, or all types if typeToDisplay is empty
    if (!typeToDisplay || type === typeToDisplay || type === 'default') {
      const sum = keysByType[type].reduce((acc, key) => {
        // If a legend is selected, only include that specific key
        if (selectedLegend !== undefined && key !== selectedLegend) {
          return acc;
        }
        return acc + getNumericValue(item, key);
      }, 0);
      totalSum += sum;
    }
  });

  return totalSum;
};

/**
 * Get the maximum value across all data points for a given type
 */
export const getMaxValueByType = (
  data: Array<Record<string, number | string>>,
  keysByType: KeysByType,
  typeToDisplay?: string,
  selectedLegend?: string,
): number => {
  if (!Array.isArray(data) || data.length === 0) return 0;

  let maxSum = 0;

  data.forEach((dataPoint) => {
    if (!dataPoint || typeof dataPoint !== 'object') return;

    Object.keys(keysByType).forEach((type) => {
      // Only consider types that match typeToDisplay, or all types if typeToDisplay is empty
      if (!typeToDisplay || type === typeToDisplay || type === 'default') {
        const sum = keysByType[type].reduce((acc, key) => {
          // If a legend is selected, only include that specific key
          if (selectedLegend !== undefined && key !== selectedLegend) {
            return acc;
          }
          return acc + getNumericValue(dataPoint, key);
        }, 0);
        maxSum = Math.max(maxSum, sum);
      }
    });
  });

  return maxSum;
};

/**
 * Get the maximum value from pre-calculated sums
 */
export const getMaxValueFromPreCalculatedSums = (
  dataWithSums: Array<Record<string, number | string> & { _sum: number }>,
): number => {
  if (!Array.isArray(dataWithSums) || dataWithSums.length === 0) return 0;

  return Math.max(...dataWithSums.map((item) => item._sum));
};

/**
 * Calculate a nice round number for the reference line
 */
export const getRoundReferenceValue = (value: number): number => {
  if (value <= 0) return 10; // Default for zero or negative values

  // Get the magnitude (10^n where n is the number of digits - 1)
  const magnitude = Math.pow(10, Math.floor(Math.log10(value)));

  // Normalized value between 1 and 10
  const normalized = value / magnitude;

  // Round to nice numbers based on normalized value
  if (normalized <= 1) return magnitude;
  if (normalized <= 2.5) return 2.5 * magnitude;
  if (normalized <= 5) return 5 * magnitude;
  return 10 * magnitude;
};
