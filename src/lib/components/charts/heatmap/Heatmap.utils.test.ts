import { getColumnEnds, isDailyOrLongerSlot } from './Heatmap.utils';

describe('getColumnEnds', () => {
  const at = (time: string) => new Date(`2026-08-25T${time}:00Z`);

  it('should end every column where the next one starts', () => {
    expect(getColumnEnds([at('10:00'), at('10:05'), at('10:10')])).toEqual([
      at('10:05'),
      at('10:10'),
      at('10:15'),
    ]);
  });

  it('should give the last column the gap that came before it', () => {
    const [, , last] = getColumnEnds([at('10:00'), at('11:00'), at('12:00')]);

    expect(last).toEqual(at('13:00'));
  });

  it('should follow an irregular axis rather than assume a fixed step', () => {
    expect(getColumnEnds([at('10:00'), at('10:05'), at('11:05')])).toEqual([
      at('10:05'),
      at('11:05'),
      at('12:05'),
    ]);
  });

  it('should leave a single column without a duration to invent one from', () => {
    expect(getColumnEnds([at('10:00')])).toEqual([at('10:00')]);
  });

  it('should hold on an empty axis', () => {
    expect(getColumnEnds([])).toEqual([]);
  });
});

describe('isDailyOrLongerSlot', () => {
  const at = (iso: string) => new Date(iso);

  it('should call a slot shorter than a day a time-of-day slot', () => {
    expect(
      isDailyOrLongerSlot(
        at('2026-08-25T10:00:00Z'),
        at('2026-08-25T10:05:00Z'),
      ),
    ).toBe(false);
    expect(
      isDailyOrLongerSlot(
        at('2026-08-25T00:00:00Z'),
        at('2026-08-25T23:00:00Z'),
      ),
    ).toBe(false);
  });

  it('should call a slot of exactly a day a dated one', () => {
    expect(
      isDailyOrLongerSlot(
        at('2026-08-25T00:00:00Z'),
        at('2026-08-26T00:00:00Z'),
      ),
    ).toBe(true);
  });

  it('should call anything longer a dated one', () => {
    expect(
      isDailyOrLongerSlot(
        at('2026-08-25T00:00:00Z'),
        at('2026-09-01T00:00:00Z'),
      ),
    ).toBe(true);
  });

  it('should not call a slot with no duration a dated one', () => {
    expect(
      isDailyOrLongerSlot(
        at('2026-08-25T10:00:00Z'),
        at('2026-08-25T10:00:00Z'),
      ),
    ).toBe(false);
  });
});
