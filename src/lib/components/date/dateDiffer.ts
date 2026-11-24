import { Temporal } from '@js-temporal/polyfill';

/**
 * Whole `unit`s from `startDate` to `endDate`. Only `months` is calendar-aware,
 * and it anchors on UTC midnight of the start date; `days`, `hours` and
 * `minutes` are a fixed division of the millisecond delta. Rounds down when
 * positive and to nearest when negative.
 */
export function getDateDaysDiff(
  startDate: Date,
  endDate: Date,
  unit: 'months' | 'days' | 'hours' | 'minutes',
) {
  const diff = Temporal.Duration.from({
    milliseconds: endDate.getTime() - startDate.getTime(),
  }).total({ unit: unit, relativeTo: startDate.toISOString().split('T')[0] });
  return diff > 0 ? Math.floor(diff) : Math.round(diff);
}
