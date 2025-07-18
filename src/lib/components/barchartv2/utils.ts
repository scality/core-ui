import {
  BarchartProps,
  BarchartBars,
  BarchartTooltipFn,
} from './Barchart.component';

import { DAY_MONTH_FORMATER, TIME_FORMATER } from '../date/FormattedDateTime';
import { TooltipContentProps } from 'recharts';

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

export const getMinValue = (data: { [key: string]: string | number }[]) => {
  const values = data.map((item) => {
    const numberValues = Object.keys(item)
      .filter((key) => key !== 'category')
      .map((key) => Number(item[key]));
    return Math.min(...numberValues);
  });
  return Math.min(...values);
};

export const getMaxBarValue = (
  data: { [key: string]: string | number }[],
  stacked?: boolean,
) => {
  const values = data.map((item) => {
    // If stacked, we need to filter out category and sum the values in the same object
    if (stacked) {
      // Get objects keys except category
      const filterOutCategory = Object.keys(item).filter(
        (key) => key !== 'category',
      );
      // Sum the values in the same object (corresponding to one bar) based on the keys
      const sumValues = filterOutCategory.reduce((acc, curr) => {
        return acc + Number(item[curr]);
      }, 0);
      return sumValues;
    }
    //filter out the category key
    const numberValues = Object.keys(item)
      .filter((key) => key !== 'category')
      .map((key) => Number(item[key]));
    // Get the max value among the values in the object (corresponding to one bar)
    return Math.max(...numberValues);
  });
  return Math.max(...values);
};

/**
 * Generates time ranges between start and end timestamps based on the given interval
 * @param startTimestamp - Start timestamp in milliseconds
 * @param endTimestamp - End timestamp in milliseconds
 * @param interval - Interval in milliseconds
 * @returns Array of time ranges with start and end properties
 */
const generateTimeRanges = (
  startTimestamp: number,
  endTimestamp: number,
  interval: number,
): { start: number; end: number }[] => {
  const ranges: { start: number; end: number }[] = [];
  if (!startTimestamp || !endTimestamp || !interval) {
    return ranges;
  }

  let currentTimestamp = startTimestamp;
  while (currentTimestamp <= endTimestamp) {
    const rangeEnd = currentTimestamp + interval;

    ranges.push({
      start: currentTimestamp,
      end: rangeEnd,
    });

    currentTimestamp += interval;
  }

  return ranges;
};

/**
 * Formats a timestamp based on the interval
 * @param timestamp - Timestamp in milliseconds
 * @param interval - Interval in milliseconds
 * @returns Formatted string
 */
const formatTimestamp = (timestamp: number, interval: number): string => {
  const date = new Date(timestamp);

  if (interval > 24 * 60 * 60 * 1000) {
    return (
      DAY_MONTH_FORMATER.format(date).replace(/[ ,]/g, '') +
      ' ' +
      TIME_FORMATER.format(date)
    );
  } else if (interval === 24 * 60 * 60 * 1000) {
    // Daily or longer intervals - use day format
    return DAY_MONTH_FORMATER.format(date).replace(/[ ,]/g, '');
  } else if (interval >= 60 * 1000) {
    //Handle hourly and minute intervals - use minute format
    return TIME_FORMATER.format(date);
  } else {
    // Second intervals or less - use full timestamp
    return date.toISOString();
  }
};

/**
 * Finds the time range that contains the given timestamp
 * @param timestamp - Data point timestamp
 * @param ranges - Array of time ranges
 * @returns The range that contains the timestamp, or null if not found
 */
const findRangeForTimestamp = (
  timestamp: number,
  ranges: { start: number; end: number }[],
): { start: number; end: number } | null => {
  return (
    ranges.find((range) => timestamp >= range.start && timestamp < range.end) ||
    null
  );
};

/**
 * Converts prometheus data to recharts data format
 * @param bars - The bars to convert
 * @param type - The chart type (category or time)
 * @returns Recharts data format
 */
export const formatPrometheusDataToChartData = <T extends BarchartBars>(
  bars: T,
  type: BarchartProps<T>['type'],
  stacked?: boolean,
  defaultSort?: BarchartProps<T>['defaultSort'],
): {
  data: { [key: string]: string | number }[];
  rechartsBars: { dataKey: string; fill: string }[];
} => {
  let rechartsBars = bars.map((bar) => ({
    dataKey: bar.label,
    fill: bar.color,
  }));

  // Create a map to collect all unique categories/ranges
  const categoryMap = new Map<
    string | number,
    { [key: string]: string | number }
  >();

  // For time data, generate all time ranges
  if (type !== 'category' && type.type === 'time') {
    const timeRanges = generateTimeRanges(
      type.timeRange.startTimestamp,
      type.timeRange.endTimestamp,
      type.timeRange.interval,
    );

    // Initialize all ranges with zeros for all bars
    timeRanges.forEach((range) => {
      const categoryDisplay = formatTimestamp(
        range.start,
        type.timeRange.interval,
      );
      const initialData: { [key: string]: string | number } = {
        category: categoryDisplay,
      };
      rechartsBars.forEach((bar) => {
        initialData[bar.dataKey] = 0;
      });

      categoryMap.set(range.start, initialData);
    });

    // Process actual data from bars
    bars.forEach((bar) => {
      const dataKey = bar.label;

      bar.data.forEach(([timestamp, value]) => {
        // Find which range this timestamp belongs to
        const range = findRangeForTimestamp(timestamp as number, timeRanges);

        // If the range is found, update the value for the data key
        // If multiple data points fall in same range, last value is used
        if (range) {
          const existingData = categoryMap.get(range.start)!;
          existingData[dataKey] = value;
        }
      });
    });
  } else {
    // Handle category data
    bars.forEach((bar) => {
      const dataKey = bar.label;

      bar.data.forEach(([key, value]) => {
        const categoryKey = String(key);

        // Check if category exists, if not create it
        if (!categoryMap.has(categoryKey)) {
          const newData: { [key: string]: string | number } = {
            category: categoryKey,
          };
          // Initialize all bar data keys with 0
          rechartsBars.forEach((bar) => {
            newData[bar.dataKey] = 0;
          });
          categoryMap.set(categoryKey, newData);
        }

        const existingData = categoryMap.get(categoryKey)!;
        existingData[dataKey] = value;
      });
    });
  }

  // Convert map to array (order is preserved for time ranges)
  let data = Array.from(categoryMap.values());

  // Apply custom sorting for category data only
  if (type === 'category' && defaultSort) {
    // Convert data to the new record format for sorting
    const points = data.map((item) => {
      const point: Record<T[number]['label'], number> & {
        category: string | number;
      } = {
        category: item.category,
      } as any;

      rechartsBars.forEach((bar) => {
        (point as any)[bar.dataKey] = Number(item[bar.dataKey]) || 0;
      });

      return point;
    });

    // Sort using the provided function
    points.sort((pointA, pointB) => {
      return defaultSort(pointA, pointB);
    });

    // Convert back to data format
    data = points.map((point) => {
      const dataItem: { [key: string]: string | number } = {
        category: point.category,
      };
      rechartsBars.forEach((bar) => {
        dataItem[bar.dataKey] = (point as any)[bar.dataKey];
      });
      return dataItem;
    });
  }

  // Sort stacked bars
  rechartsBars = sortStackedBars(rechartsBars, data, stacked);

  return {
    rechartsBars,
    data,
  };
};
export type UnitRange = {
  threshold: number;
  label: string;
}[];

export const computeUnitLabelAndRoundReferenceValue = (
  data: any,
  maxValue: number,
  unitRange: UnitRange | undefined,
) => {
  if (!unitRange) {
    const roundReferenceValue = getRoundReferenceValue(maxValue);
    return { unitLabel: '', roundReferenceValue, rechartsData: data };
  }

  const { valueBase, unitLabel } = getUnitLabel(unitRange ?? [], maxValue);
  const topValue = Math.ceil(maxValue / valueBase / 10) * 10;
  const roundReferenceValue = getRoundReferenceValue(topValue);
  const rechartsData = data.map((dataPoint) => {
    const normalizedDataPoint = { ...dataPoint };
    Object.entries(dataPoint).forEach(([key, value]) => {
      if (key !== 'category' && typeof value === 'number') {
        normalizedDataPoint[key] = value / valueBase;
      }
    });
    return normalizedDataPoint;
  });
  return { unitLabel, roundReferenceValue, rechartsData };
};

/**
 * Return the unit label base on the current dataset, and the valueBase which is used to convert the data
 * @param {any} unitRange
 * @param {any} maxValue the maximum value among the data set
 * @returns {any}
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

// Sort stacked bars by their average values in descending order
// This ensures the largest bars appear at the bottom of the stack
export const sortStackedBars = (
  rechartsBars: {
    dataKey: string;
    fill: string;
  }[],
  data: {
    [key: string]: string | number;
  }[],
  stacked?: boolean,
) => {
  if (!stacked) {
    return rechartsBars;
  }
  const barAverages = rechartsBars.map((bar) => {
    const values = data
      .map((item) => Number(item[bar.dataKey]) || 0)
      .filter((value) => !isNaN(value));
    const average =
      values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
    return { ...bar, average };
  });

  // Sort by average in descending order (largest first, which will be at bottom in stack)
  barAverages.sort((a, b) => b.average - a.average);
  // Remove the average property and keep only the bar data
  return barAverages.map(({ average, ...bar }) => bar);
};

export const renderTooltipContent = <T extends BarchartBars>(
  props: TooltipContentProps<number, string>,
  tooltip: BarchartTooltipFn<T> | undefined,
  hoveredValue: string | undefined,
) => {
  const { active, payload, label } = props;

  if (!active || !payload || !payload.length || !tooltip) {
    return null;
  }

  const tooltipValues: {
    label: T[number]['label'];
    value: number;
    isHovered: boolean;
  }[] = payload.map((item) => ({
    label: item.name,
    value: item.value,
    isHovered: item.name === hoveredValue,
  }));

  const currentPoint = {
    category: label as string | number,
    values: tooltipValues,
  };

  return tooltip(currentPoint);
};
