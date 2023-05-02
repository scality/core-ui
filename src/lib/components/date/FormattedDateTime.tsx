import { getDateDaysDiff } from './dateDiffer';
import { Tooltip } from '../tooltip/Tooltip.component';

export const DATE_FORMATER = Intl.DateTimeFormat('fr-CA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour12: false,
});

export const TIME_SECOND_FORMATER = Intl.DateTimeFormat('en-GB', {
  hour12: false,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

export const TIME_FORMATER = Intl.DateTimeFormat('en-GB', {
  hour12: false,
  hour: '2-digit',
  minute: '2-digit',
});

type FormattedDateTimeProps = {
  format:
    | 'date'
    | 'date-time'
    | 'date-time-second'
    | 'time'
    | 'time-second'
    | 'relative';
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

      if (monthDiff !== 0) {
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

      const dayDiff = getDateDaysDiff(value, now, 'days');
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
    //TO FINISH
    default:
      return <></>;
  }
};
