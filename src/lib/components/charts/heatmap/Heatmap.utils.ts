/** Opacity of a cell whose series has been filtered out through the legend. */
export const DIMMED_CELL_OPACITY = 0.15;

/**
 * The end of every column's slot, read off the axis: a column lasts until the
 * next one starts. That is what lets the tooltip name the slot — "03:30 to
 * 04:00" — rather than the instant it opens, which on its own says nothing
 * about whether a cell covers five minutes or a day.
 *
 * The last column has no next one, so it reuses the gap before it. A single
 * column has no gap at all, and gets an end equal to its start rather than an
 * invented duration — the tooltip reads that back as "no slot to show".
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
 * Whether two instants land on the same calendar day, in the reader's own time
 * zone — the one the axis and the tooltip are already printed in.
 *
 * Not an elapsed-time question, which is why `getDateDaysDiff` cannot answer
 * it: 23:00 and 00:00 are an hour apart and two different days, and it is the
 * day the tooltip has to name.
 */
export const isSameCalendarDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

/** One day, the threshold at which an axis stops being about the time of day. */
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

/**
 * Whether a slot covers a day or more, which is what decides how the x-axis
 * spells a column out: below a day the time of day is what tells two columns
 * apart, from a day up it is the date, and a daily axis labelled by time reads
 * as "00:00" repeated all the way across.
 */
export const isDailyOrLongerSlot = (start: Date, end: Date): boolean =>
  end.getTime() - start.getTime() >= ONE_DAY_IN_MS;
