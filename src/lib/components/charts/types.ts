/**
 * Shared types used across chart components
 */

/**
 * Unit range configuration for automatic unit scaling
 * Used by LineTimeSerieChart and Barchart
 */
export type UnitRange = {
  threshold: number;
  label: string;
}[];

/**
 * Time-based chart configuration
 * Used by Barchart
 * @param startDate - Start date
 * @param endDate - End date
 * @param interval - Interval in milliseconds
 */
export type TimeType = {
  type: 'time';
  timeRange: {
    startDate: Date;
    endDate: Date;
    interval: number;
  };
};

/**
 * Category-based chart configuration
 * Used by Barchart
 */
export type CategoryType = {
  type: 'category';
  gap?: number;
};
