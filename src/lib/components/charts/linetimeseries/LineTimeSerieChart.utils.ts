import {
  TIME_FORMATER,
  DAY_MONTH_ABBREVIATED_YEAR,
  DAY_MONTH_ABBREVIATED_HOUR_MINUTE,
} from '../../date/FormattedDateTime';

export const ONE_YEAR_MILLISECONDS = 366 * 24 * 60 * 60 * 1000;

export type ChartDataPoint = {
  timestamp: number;
} & Record<string, number | null>;

/**
 * Formats timestamp for X-axis labels based on duration
 *
 *
 * @param timestamp - The timestamp to format in milliseconds
 * @param duration - The duration in seconds
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
    return DAY_MONTH_ABBREVIATED_HOUR_MINUTE.format(date)
      .replace(',', '')
      .replace(/Sept/g, 'Sep');
  } else {
    return DAY_MONTH_ABBREVIATED_YEAR.format(date)
      .replace(/[ ,]/g, '')
      .replace(/Sept/g, 'Sep');
  }
};
