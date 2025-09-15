import { getDateDaysDiff } from './dateDiffer';
import { Tooltip } from '../tooltip/Tooltip.component';

/**
 * @description Long date formatter, with weekday, year, month and day. Used for describing long term date.
 * @example Wednesday 6 October 2025
 */
export const LONG_DATE_FORMATER = Intl.DateTimeFormat('en-GB', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: '2-digit',
});

/**
 * @description Long date formatter, without weekday.
 * @example 01 September 2025
 */
export const LONG_DATE_FORMATER_WITHOUT_WEEKDAY = Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
});

/**
 * @description Date formatter, with year, month and day. Used for describing long term date.
 * @example 2025-01-01
 */
export const DATE_FORMATER = Intl.DateTimeFormat('fr-CA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour12: false,
});

/**
 * @description Day month formatter, with weekday, day and month. Used for describing long term date.
 * @example Wed 6 Oct
 */
export const DAY_MONTH_FORMATER = Intl.DateTimeFormat('en-GB', {
  weekday: 'short',
  day: '2-digit',
  month: 'short',
});

/**
 * @description Time formatter, with hour, minute and second. Used for describing long term date.
 * @example 18:33:00
 */
export const TIME_SECOND_FORMATER = Intl.DateTimeFormat('en-GB', {
  hour12: false,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

/**
 * @description Time formatter, with hour and minute. Used for describing long term date.
 * @example 18:33
 */
export const TIME_FORMATER = Intl.DateTimeFormat('en-GB', {
  hour12: false,
  hour: '2-digit',
  minute: '2-digit',
});

/**
 * @description Day month abbreviated hour minute second formatter. Used for describing long term date.
 * @example 6 Oct 18:33:00
 */
export const DAY_MONTH_ABBREVIATED_HOUR_MINUTE_SECOND = Intl.DateTimeFormat(
  'en-GB',
  {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  },
);

/**
 * @description Day month abbreviated hour minute formatter. Used for describing long term date.
 * @example 6 Oct 18:33
 */
export const DAY_MONTH_ABBREVIATED_HOUR_MINUTE = Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

/**
 * @description Year month day formatter, without time. Used for describing long term date.
 * @example 2025-01-01
 */
export const YEAR_MONTH_DAY_FORMATTER = Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/**
 * @description Month day formatter, without year. Used for short term date ranges.
 * @example 01-15
 */
export const MONTH_DAY_FORMATTER = Intl.DateTimeFormat('en-CA', {
  month: '2-digit',
  day: '2-digit',
});

type FormattedDateTimeProps = {
  format:
    | 'date'
    | 'date-time'
    | 'date-time-second'
    | 'time'
    | 'time-second'
    | 'relative'
    | 'day-month-abbreviated-hour-minute'
    | 'day-month-abbreviated-hour-minute-second'
    | 'long-date'
    | 'long-date-without-weekday'
    | 'chart-date'
    | 'year-month-day'
    | 'month-day';

  value: Date;
};

const isItFutureOrIsItPast = (
  timeDiff: number,
  stringToBeFormatted: string,
) => {
  if (timeDiff > 0) {
    return `${stringToBeFormatted} ago`;
  } else {
    return `in ${stringToBeFormatted}`;
  }
};

/**
 * @description Formats the date and time according to the format specified.
 * @example
 * date: '2025-01-01'
 * 'date-time': '2025-01-01 00:00'
 * 'date-time-second': '2025-01-01 00:00:00'
 * time: '00:00'
 * 'time-second': '00:00:00'
 * relative: '1 month ago'
 * 'day-month-abbreviated-hour-minute': '6 Oct 18:33'
 * 'day-month-abbreviated-hour-minute-second': '6 Oct 18:33:00'
 * 'long-date': 'Wednesday 6 October 2025'
 * 'chart-date': '6 Oct'
 * 'year-month-day': '2025-10-06'
 */
export const FormattedDateTime = ({
  format,
  value,
}: FormattedDateTimeProps) => {
  switch (format) {
    case 'date':
      return <>{DATE_FORMATER.format(value)}</>;
    case 'date-time':
      return (
        <>{DATE_FORMATER.format(value) + ' ' + TIME_FORMATER.format(value)}</>
      );
    case 'date-time-second':
      return (
        <>
          {DATE_FORMATER.format(value) +
            ' ' +
            TIME_SECOND_FORMATER.format(value)}
        </>
      );
    case 'time':
      return <>{TIME_FORMATER.format(value)}</>;
    case 'time-second':
      return <>{TIME_SECOND_FORMATER.format(value)}</>;
    case 'relative':
      const now = new Date();
      const monthDiff = getDateDaysDiff(value, now, 'months');
      const dayDiff = getDateDaysDiff(value, now, 'days');

      if (monthDiff !== 0 && Math.abs(dayDiff) > 90) {
        return (
          <Tooltip
            overlay={
              <FormattedDateTime format="date-time-second" value={value} />
            }
          >
            {isItFutureOrIsItPast(
              monthDiff,
              `${Math.abs(monthDiff)} month${
                Math.abs(monthDiff) > 1 ? 's' : ''
              }`,
            )}
          </Tooltip>
        );
      }

      if (dayDiff !== 0) {
        return (
          <Tooltip
            overlay={
              <FormattedDateTime format="date-time-second" value={value} />
            }
          >
            {isItFutureOrIsItPast(
              dayDiff,
              `${Math.abs(dayDiff)} day${Math.abs(dayDiff) > 1 ? 's' : ''}`,
            )}
          </Tooltip>
        );
      }
      const hourDiff = getDateDaysDiff(value, now, 'hours');
      if (hourDiff !== 0) {
        return (
          <Tooltip
            overlay={
              <FormattedDateTime format="date-time-second" value={value} />
            }
          >
            {isItFutureOrIsItPast(
              hourDiff,
              `${Math.abs(hourDiff)} hour${Math.abs(hourDiff) > 1 ? 's' : ''}`,
            )}
          </Tooltip>
        );
      }
      const minuteDiff = getDateDaysDiff(value, now, 'minutes');
      if (minuteDiff !== 0) {
        return (
          <Tooltip
            overlay={
              <FormattedDateTime format="date-time-second" value={value} />
            }
          >
            {isItFutureOrIsItPast(
              minuteDiff,
              `${Math.abs(minuteDiff)} minute${
                Math.abs(minuteDiff) > 1 ? 's' : ''
              }`,
            )}
          </Tooltip>
        );
      }
      return (
        <Tooltip
          overlay={
            <FormattedDateTime format="date-time-second" value={value} />
          }
        >
          few seconds ago
        </Tooltip>
      );
    case 'day-month-abbreviated-hour-minute':
      return (
        <>
          {DAY_MONTH_ABBREVIATED_HOUR_MINUTE.format(value)
            .replace(',', '')
            .replace(/Sept/g, 'Sep')}
        </>
      );
    case 'day-month-abbreviated-hour-minute-second':
      return (
        <>
          {DAY_MONTH_ABBREVIATED_HOUR_MINUTE_SECOND.format(value)
            .replace(',', '')
            // replace Sept with Sep to keep 3 letter month
            .replace(/Sept/g, 'Sep')}
        </>
      );
    case 'long-date':
      return <>{LONG_DATE_FORMATER.format(value)}</>;
    case 'long-date-without-weekday':
      return <>{LONG_DATE_FORMATER_WITHOUT_WEEKDAY.format(value)}</>;
    case 'chart-date':
      return (
        <>
          {DAY_MONTH_FORMATER.format(value)
            .replace(/[ ,]/g, '')
            // replace Sept with Sep to keep 3 letter month
            .replace(/Sept/g, 'Sep')}
        </>
      );
    case 'year-month-day':
      return <>{YEAR_MONTH_DAY_FORMATTER.format(value)}</>;
    case 'month-day':
      return <>{MONTH_DAY_FORMATTER.format(value)}</>;
    default:
      return <></>;
  }
};
