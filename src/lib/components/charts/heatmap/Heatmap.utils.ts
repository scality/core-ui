import {
  DAY_MONTH_ABBREVIATED_HOUR_MINUTE,
  TIME_FORMATER,
} from '../../date/FormattedDateTime';

/** Opacity of a cell whose series has been filtered out through the legend. */
export const DIMMED_CELL_OPACITY = 0.15;

/**
 * The end of every column's slot, read off the axis: a column lasts until the
 * next one starts. The last reuses the gap before it; a single column has no
 * gap to read one from, so its end is its start.
 */
export const getColumnEnds = (columns: Date[]): Date[] =>
  columns.map((column, index) => {
    const next = columns[index + 1];
    if (next) {
      return next;
    }

    const previous = columns[index - 1];
    return new Date(
      column.getTime() + (previous ? column.getTime() - previous.getTime() : 0),
    );
  });

/**
 * Whether two instants land on the same calendar day, in the reader's time
 * zone. Not an elapsed-time question, which is why `getDateDaysDiff` cannot
 * answer it: 23:00 and 00:00 are an hour apart and two different days.
 */
export const isSameCalendarDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

/** One day, the threshold at which an axis stops being about the time of day. */
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

/**
 * Whether a slot covers a day or more, which decides how the x-axis spells a
 * column out: a daily axis labelled by time of day reads "00:00" all the way
 * across.
 */
export const isDailyOrLongerSlot = (start: Date, end: Date): boolean =>
  end.getTime() - start.getTime() >= ONE_DAY_IN_MS;

/** The locale comma is not wanted between the date and the time it precedes. */
const dayMonthHourMinute = (value: Date): string =>
  DAY_MONTH_ABBREVIATED_HOUR_MINUTE.format(value)
    .replace(',', '')
    .replace(/Sept/g, 'Sep');

/**
 * A slot as one sentence — "25 Aug 10:05 to 10:10". The end repeats the date
 * when the slot changes day, or a nightly one would read "23:00 to 00:00": the
 * same instant twice, as far as the reader can tell. A slot with no duration is
 * its start alone.
 *
 * The tooltip and the cell's `aria-label` both come from here, so they cannot
 * drift apart.
 */
export const formatSlot = (start: Date, end: Date): string => {
  const from = dayMonthHourMinute(start);

  if (end.getTime() <= start.getTime()) {
    return from;
  }

  return `${from} to ${
    isSameCalendarDay(start, end)
      ? TIME_FORMATER.format(end)
      : dayMonthHourMinute(end)
  }`;
};
