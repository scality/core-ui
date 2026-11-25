import { getDateDaysDiff } from './dateDiffer';

const diff = (
  start: string,
  end: string,
  unit: Parameters<typeof getDateDaysDiff>[2],
) => getDateDaysDiff(new Date(start), new Date(end), unit);

describe('Date Differ', () => {
  it('should computes the difference of days between 2 dates', () => {
    expect(
      getDateDaysDiff(
        new Date('2022-10-10T20:10:39Z'),
        new Date('2022-11-29T15:14:39Z'),
        'days',
      ),
    ).toBe(49);
  });

  describe('months', () => {
    it('counts a short month as a whole month from the end of a longer one', () => {
      expect(
        diff('2023-01-31T00:00:00Z', '2023-02-28T00:00:00Z', 'months'),
      ).toBe(1);
      expect(
        diff('2024-01-31T00:00:00Z', '2024-02-29T00:00:00Z', 'months'),
      ).toBe(1);
      expect(
        diff('2023-01-31T10:00:00Z', '2023-03-01T10:00:00Z', 'months'),
      ).toBe(1);
    });

    it('does not count a month that is not complete yet', () => {
      expect(
        diff('2020-06-30T06:49:07Z', '2021-05-28T16:25:11Z', 'months'),
      ).toBe(10);
    });

    it('rounds a negative difference to the nearest month', () => {
      expect(
        diff('2024-03-31T00:00:00Z', '2024-02-29T00:00:00Z', 'months'),
      ).toBe(-1);
      expect(
        diff('2024-03-31T00:00:00Z', '2024-02-14T00:00:00Z', 'months'),
      ).toBe(-2);
      expect(
        diff('2024-01-31T00:00:00Z', '2023-12-01T00:00:00Z', 'months'),
      ).toBe(-2);
    });
  });

  it('rounds a positive difference in hours down', () => {
    expect(diff('2024-05-10T07:00:00Z', '2024-05-10T09:59:00Z', 'hours')).toBe(
      2,
    );
  });

  it('rejects an invalid date', () => {
    expect(() => diff('not a date', '2024-05-10T09:59:00Z', 'months')).toThrow(
      RangeError,
    );
  });

  it('rounds a negative difference in hours and minutes to the nearest unit', () => {
    expect(diff('2024-05-10T10:00:00Z', '2024-05-10T07:29:00Z', 'hours')).toBe(
      -3,
    );
    expect(
      diff('2024-05-10T10:00:00Z', '2024-05-10T09:58:31Z', 'minutes'),
    ).toBe(-1);
  });
});
