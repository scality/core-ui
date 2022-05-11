export const LOADER_SIZE = {
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
export type Variant =
  | 'base'
  | 'secondary'
  | 'healthy'
  | 'warning'
  | 'danger'
  | 'success'
  | 'secondaryDark1';
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
  // time span in second
  frequency: number;
};
export const queryTimeSpansCodes: QueryTimeSpan[] = [
  {
    query: QUERY_LAST_SEVEN_DAYS,
    label: LAST_SEVEN_DAYS,
    duration: SAMPLE_DURATION_LAST_SEVEN_DAYS,
    frequency: SAMPLE_FREQUENCY_LAST_SEVEN_DAYS,
  },
  {
    query: QUERY_LAST_TWENTY_FOUR_HOURS,
    label: LAST_TWENTY_FOUR_HOURS,
    duration: SAMPLE_DURATION_LAST_TWENTY_FOUR_HOURS,
    frequency: SAMPLE_FREQUENCY_LAST_TWENTY_FOUR_HOURS,
  },
  {
    query: QUERY_LAST_ONE_HOUR,
    label: LAST_ONE_HOUR,
    duration: SAMPLE_DURATION_LAST_ONE_HOUR,
    frequency: SAMPLE_FREQUENCY_LAST_ONE_HOUR,
  },
];
export const NAN_STRING = 'NAN';
export type Status = 'unknown' | 'healthy' | 'warning' | 'critical';