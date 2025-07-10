import { BarchartProps, TimeType } from './Barchart.component';
import { DAY_MONTH_FORMATER, TIME_FORMATER } from '../date/FormattedDateTime';

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

export const getMaxValue = (data: { [key: string]: string | number }[]) => {
  const values = data.map((item) => {
    //filter out the category key
    const numberValues = Object.keys(item)
      .filter((key) => key !== 'category')
      .map((key) => Number(item[key]));
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
  } else if (interval >= 60 * 60 * 1000) {
    // Hourly intervals - use hour format
    const hours = TIME_FORMATER.format(date);
    const day = DAY_MONTH_FORMATER.format(date).replace(/[ ,]/g, '');
    return `${day} ${hours}`;
  } else if (interval >= 60 * 1000) {
    // Minute intervals - use minute format
    const hours = TIME_FORMATER.format(date);
    const day = DAY_MONTH_FORMATER.format(date).replace(/[ ,]/g, '');
    return `${day} ${hours}`;
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
export const formatPrometheusDataToChartData = (
  bars: BarchartProps['bars'],
  type: BarchartProps['type'],
): {
  data: {
    [key: string]: string | number;
  }[];
  rechartsBars: {
    dataKey: string;
    fill: string;
  }[];
} => {
  const rechartsBars = bars.map((bar) => ({
    dataKey: bar.label.toLowerCase().replace(/\s+/g, ''),
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
      const dataKey = bar.label.toLowerCase().replace(/\s+/g, '');

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
      const dataKey = bar.label.toLowerCase().replace(/\s+/g, '');

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
  const data = Array.from(categoryMap.values());

  return {
    rechartsBars,
    data,
  };
};
