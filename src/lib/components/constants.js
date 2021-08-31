// @flow
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
// timespan
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

export const queryTimeSpansCodes = [
  {
    label: QUERY_LAST_SEVEN_DAYS,
    value: LAST_SEVEN_DAYS,
    duration: SAMPLE_DURATION_LAST_SEVEN_DAYS,
    frequency: SAMPLE_FREQUENCY_LAST_SEVEN_DAYS,
  },
  {
    label: QUERY_LAST_TWENTY_FOUR_HOURS,
    value: LAST_TWENTY_FOUR_HOURS,
    duration: SAMPLE_DURATION_LAST_TWENTY_FOUR_HOURS,
    frequency: SAMPLE_FREQUENCY_LAST_TWENTY_FOUR_HOURS,
  },
  {
    label: QUERY_LAST_ONE_HOUR,
    value: LAST_ONE_HOUR,
    duration: SAMPLE_DURATION_LAST_ONE_HOUR,
    frequency: SAMPLE_FREQUENCY_LAST_ONE_HOUR,
  },
];

export const NAN_STRING = 'NAN';
