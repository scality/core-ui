import {
  DAY_MONTH_ABBREVIATED_HOUR_MINUTE,
  YEAR_MONTH_DAY_FORMATTER,
  MONTH_DAY_FORMATTER,
} from '../date/FormattedDateTime';

export const ONE_YEAR_MILLISECONDS = 366 * 24 * 60 * 60 * 1000;

export const BIT_PER_SECOND_UNIT_RANGE = [
  { threshold: 1, label: 'B/s' },
  { threshold: 1024, label: 'KiB/s' },
  { threshold: 1024 * 1024, label: 'MiB/s' },
  { threshold: 1024 * 1024 * 1024, label: 'GiB/s' },
  { threshold: 1024 * 1024 * 1024 * 1024, label: 'TiB/s' },
];

export const SECOND_UNIT_RANGE = [
  { threshold: 1, label: 'ms' },
  { threshold: 1000, label: 's' },
];

export const DEFAULT_UNIT_RANGE = [
  { threshold: 1, label: '' },
  { threshold: 1000, label: 'K' },
  { threshold: 1000 * 1000, label: 'M' },
  { threshold: 1000 * 1000 * 1000, label: 'G' },
  { threshold: 1000 * 1000 * 1000 * 1000, label: 'T' },
];

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
