// Remove once native Temporal can be required, which needs Node 26 in every
// test run, Chrome 144 and a stable Safari release: `Temporal.Duration#total`
// then replaces this module.
const MS_PER_UNIT = {
  days: 86_400_000,
  hours: 3_600_000,
  minutes: 60_000,
} as const;

/**
 * UTC midnight of a calendar date. `setUTCFullYear` rather than `Date.UTC`,
 * which maps the years 0 to 99 onto 1900 to 1999.
 */
function utcMidnight(year: number, month: number, day: number): number {
  return new Date(0).setUTCFullYear(year, month, day);
}

/**
 * `anchor` moved by `months` calendar months. The day is clamped to the length
 * of the month reached, so 31 Jan + 1 month is the last day of February.
 */
function addMonthsUTC(anchor: Date, months: number): number {
  const year = anchor.getUTCFullYear();
  const month = anchor.getUTCMonth() + months;
  const lastDayOfMonth = new Date(utcMidnight(year, month + 1, 0)).getUTCDate();
  return utcMidnight(
    year,
    month,
    Math.min(anchor.getUTCDate(), lastDayOfMonth),
  );
}

/**
 * Months from the start date's UTC midnight to that midnight plus `deltaMs`,
 * with the month in progress as a fraction of its own length.
 */
function totalMonths(startDate: Date, deltaMs: number): number {
  const anchor = new Date(
    utcMidnight(
      startDate.getUTCFullYear(),
      startDate.getUTCMonth(),
      startDate.getUTCDate(),
    ),
  );
  const target = new Date(anchor.getTime() + deltaMs);
  const sign = deltaMs < 0 ? -1 : 1;
  const hasReached = (months: number) =>
    sign * (addMonthsUTC(anchor, sign * months) - target.getTime()) <= 0;

  // One month short of the gap between the two calendar months is always
  // reached, so the loop below runs at most twice.
  const calendarMonthGap =
    (target.getUTCFullYear() - anchor.getUTCFullYear()) * 12 +
    target.getUTCMonth() -
    anchor.getUTCMonth();
  let wholeMonths = Math.max(0, sign * calendarMonthGap - 1);
  while (hasReached(wholeMonths + 1)) {
    wholeMonths++;
  }

  const monthStart = addMonthsUTC(anchor, sign * wholeMonths);
  const monthEnd = addMonthsUTC(anchor, sign * (wholeMonths + 1));
  return (
    sign *
    (wholeMonths + (target.getTime() - monthStart) / (monthEnd - monthStart))
  );
}

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
  const deltaMs = endDate.getTime() - startDate.getTime();
  if (Number.isNaN(deltaMs)) {
    throw new RangeError('Invalid Date');
  }
  const diff =
    unit === 'months'
      ? totalMonths(startDate, deltaMs)
      : deltaMs / MS_PER_UNIT[unit];
  return diff > 0 ? Math.floor(diff) : Math.round(diff);
}
