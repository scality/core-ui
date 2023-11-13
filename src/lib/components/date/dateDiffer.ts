import { Temporal } from '@js-temporal/polyfill';

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
