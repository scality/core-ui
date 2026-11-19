import { Temporal } from '@js-temporal/polyfill';

/**
 * Whole `unit`s from `startDate` to `endDate`, counted against `startDate`'s
 * calendar, so a month is not a fixed number of days. Rounds down when positive
 * and to nearest when negative.
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
