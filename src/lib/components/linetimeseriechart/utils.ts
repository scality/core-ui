import {
  DAY_MONTH_ABBREVIATED_HOUR_MINUTE,
  YEAR_MONTH_DAY_FORMATTER,
  MONTH_DAY_FORMATTER,
} from '../date/FormattedDateTime';

export const ONE_YEAR_MILLISECONDS = 366 * 24 * 60 * 60 * 1000;

export type ChartDataPoint = {
  timestamp: number;
} & Record<string, number | null>;

/**
 * Formats timestamp for X-axis labels based on time format and data range:
 * For 'date-time' format, return day-month-abbreviated-hour-minute format
 * For 'date' format, return YYYY-MM-DD format if time range is greater than 1 year, otherwise return MM-DD format
 *
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
  if (!chartData.length) {
    return YEAR_MONTH_DAY_FORMATTER.format(date);
  }
  if (timeFormat === 'date-time') {
    return DAY_MONTH_ABBREVIATED_HOUR_MINUTE.format(date).replace(',', '');
  }
  const timestamps = chartData.map((d) => d.timestamp);
  const minTimestamp = Math.min(...timestamps);
  const maxTimestamp = Math.max(...timestamps);
  const timeRangeMilliseconds = maxTimestamp - minTimestamp;

  return timeRangeMilliseconds >= ONE_YEAR_MILLISECONDS
    ? YEAR_MONTH_DAY_FORMATTER.format(date)
    : MONTH_DAY_FORMATTER.format(date);
};
