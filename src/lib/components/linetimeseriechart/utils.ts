import {
  TIME_FORMATER,
  DAY_MONTH_ABBREVIATED,
  DAY_MONTH_ABBREVIATED_YEAR,
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
  duration: number,
): string => {
  const date = new Date(timestamp);
  if (duration <= 24 * 60 * 60) {
    return TIME_FORMATER.format(date);
  } else if (duration <= 7 * 24 * 60 * 60) {
    return DAY_MONTH_ABBREVIATED.format(date)
      .replace(',', '')
      .replace(/Sept/g, 'Sep');
  } else {
    return DAY_MONTH_ABBREVIATED_YEAR.format(date)
      .replace(/[ ,]/g, '')
      .replace(/Sept/g, 'Sep');
  }
};
