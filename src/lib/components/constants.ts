/** Named values for `Loader`'s `size` prop; `LOADER_SIZE.large` is its default. */
export const LOADER_SIZE: { [Key in Size]: Key } = {
  smaller: 'smaller',
  small: 'small',
  base: 'base',
  large: 'large',
  larger: 'larger',
  huge: 'huge',
  massive: 'massive',
};
export type Size =
  | 'smaller'
  | 'small'
  | 'base'
  | 'large'
  | 'larger'
  | 'huge'
  | 'massive';
// Replace the "success" by "health", but keep the key in the color-palette for the moment.
export type Variant = 'base' | 'selected' | 'healthy' | 'warning' | 'danger';
// metric chart
// url query
export const QUERY_LAST_SEVEN_DAYS = 'now-7d';
export const QUERY_LAST_TWENTY_FOUR_HOURS = 'now-24h';
export const QUERY_LAST_ONE_HOUR = 'now-1h';
// label in timespan selector
export const LAST_SEVEN_DAYS = 'Last 7 days';
export const LAST_TWENTY_FOUR_HOURS = 'Last 24 hours';
export const LAST_ONE_HOUR = 'Last 1 hour';
// sample duration
export const SAMPLE_DURATION_LAST_SEVEN_DAYS = 7 * 24 * 60 * 60;
export const SAMPLE_DURATION_LAST_TWENTY_FOUR_HOURS = 24 * 60 * 60;
export const SAMPLE_DURATION_LAST_ONE_HOUR = 60 * 60;
// sample frequency
export const SAMPLE_FREQUENCY_LAST_SEVEN_DAYS = 60 * 60;
export const SAMPLE_FREQUENCY_LAST_TWENTY_FOUR_HOURS = 720;
export const SAMPLE_FREQUENCY_LAST_ONE_HOUR = 30;
export type QueryTimeSpan = {
  query: string;
  // the text in the query parameter
  label: string;
  // the label display in the timespan selector
  duration: number;
  // time difference between two samples in second
  interval: number;
  // time span in second
  /** @deprecated Use `interval` instead */
  frequency: number;
};

export const queryTimeSpansCodes: QueryTimeSpan[] = [
  {
    query: QUERY_LAST_SEVEN_DAYS,
    label: LAST_SEVEN_DAYS,
    duration: SAMPLE_DURATION_LAST_SEVEN_DAYS,
    interval: SAMPLE_FREQUENCY_LAST_SEVEN_DAYS,
    /** @deprecated Use `interval` instead */
    frequency: SAMPLE_FREQUENCY_LAST_SEVEN_DAYS,
  },
  {
    query: QUERY_LAST_TWENTY_FOUR_HOURS,
    label: LAST_TWENTY_FOUR_HOURS,
    duration: SAMPLE_DURATION_LAST_TWENTY_FOUR_HOURS,
    interval: SAMPLE_FREQUENCY_LAST_TWENTY_FOUR_HOURS,
    /** @deprecated Use `interval` instead */
    frequency: SAMPLE_FREQUENCY_LAST_TWENTY_FOUR_HOURS,
  },
  {
    query: QUERY_LAST_ONE_HOUR,
    label: LAST_ONE_HOUR,
    duration: SAMPLE_DURATION_LAST_ONE_HOUR,
    interval: SAMPLE_FREQUENCY_LAST_ONE_HOUR,
    /** @deprecated Use `interval` instead */
    frequency: SAMPLE_FREQUENCY_LAST_ONE_HOUR,
  },
];

export const NAN_STRING = 'NAN';

/**
 * Health values. `Table`'s `health` sort orders them critical, warning, none,
 * healthy; it does not understand `success`, `info` or `unknown`, which log a
 * console error and then compare equal to everything, so one such row can
 * disorder the whole column. `StatusWrapper` badges only `warning`, `critical`
 * and `unknown`. `success` is a legacy alias of `healthy` that
 * `getThemePropSelector` translates, not a health of its own.
 */
export const STATUS_CRITICAL = 'critical';
export const STATUS_WARNING = 'warning';
export const STATUS_SUCCESS = 'success';
export const STATUS_HEALTHY = 'healthy';
export const STATUS_INFO = 'info';
export const STATUS_UNKNOWN = 'unknown';
export const STATUS_NONE = 'none';

export type Status =
  | 'none'
  | 'unknown'
  | 'info'
  | 'healthy'
  | 'success'
  | 'warning'
  | 'critical';
