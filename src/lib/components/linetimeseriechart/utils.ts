import {
  DAY_MONTH_ABBREVIATED_HOUR_MINUTE,
  YEAR_MONTH_DAY_FORMATTER,
  MONTH_DAY_FORMATTER,
} from '../date/FormattedDateTime';

export type ChartDataPoint = {
  timestamp: number;
} & Record<string, number | null>;

/**
 * Formats timestamp for X-axis labels based on time format and data range
 * @param timestamp - The timestamp to format in milliseconds
 * @param timeFormat - The format type ('date-time' or 'date')
 * @param chartData - The chart data to determine time range for optimal formatting
 * @returns Formatted string for display on X-axis
 */
export const formatXAxisLabel = (
  timestamp: number,
  timeFormat: 'date-time' | 'date' = 'date-time',
  chartData: ChartDataPoint[] = [],
): string => {
  const date = new Date(timestamp);

  if (timeFormat === 'date-time') {
    return DAY_MONTH_ABBREVIATED_HOUR_MINUTE.format(date).replace(',', '');
  } else if (timeFormat === 'date') {
    // Calculate the time range to determine format
    if (chartData.length > 0) {
      const timestamps = chartData.map((d) => d.timestamp);
      const minTimestamp = Math.min(...timestamps);
      const maxTimestamp = Math.max(...timestamps);
      const timeRangeMilliseconds = maxTimestamp - minTimestamp;
      const oneYearMilliseconds = 366 * 24 * 60 * 60 * 1000;

      // If time range is greater than 1 year, use YYYY-MM-DD format
      // Otherwise, use MM-DD format
      return timeRangeMilliseconds >= oneYearMilliseconds
        ? YEAR_MONTH_DAY_FORMATTER.format(date)
        : MONTH_DAY_FORMATTER.format(date);
    }

    // Fallback to YYYY-MM-DD format if chartData is empty
    return YEAR_MONTH_DAY_FORMATTER.format(date);
  }

  return DAY_MONTH_ABBREVIATED_HOUR_MINUTE.format(date).replace(',', '');
};
