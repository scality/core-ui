import React from 'react';
import { FormattedDateTime } from '../src/lib/components/date/FormattedDateTime';

export default {
  title: 'Components/FormattedDateTime',
  component: FormattedDateTime,
};

export const FormattedDate = ({}) => {
  const now = new Date();
  return (
    <>
      <table>
        <thead>
          <td>Format</td>
          <td>Visual</td>
        </thead>
        <tbody>
          {[
            'date' as const,
            'date-time' as const,
            'date-time-second' as const,
            'time' as const,
            'time-second' as const,
            'relative' as const,
          ].map((format) => (
            <tr key={format}>
              <td>{format}</td>
              <td>
                <FormattedDateTime format={format} value={now} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
