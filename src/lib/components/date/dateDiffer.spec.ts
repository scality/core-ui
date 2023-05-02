import { getDateDaysDiff } from './dateDiffer';

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
});
