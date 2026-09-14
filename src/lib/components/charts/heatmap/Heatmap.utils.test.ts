import {
  getColumnEnds,
  getHeatmapMaxValue,
  getRampOpacity,
  DEFAULT_MIN_OPACITY,
} from './Heatmap.utils';

describe('getHeatmapMaxValue', () => {
  it('should return the largest cell of the whole grid', () => {
    expect(
      getHeatmapMaxValue([{ cells: [1, 9, 3] }, { cells: [4, 12, 0] }]),
    ).toBe(12);
  });

  it('should ignore the empty cells', () => {
    expect(getHeatmapMaxValue([{ cells: [null, 5, null] }])).toBe(5);
  });

  it('should return 0 when there is no data at all', () => {
    expect(getHeatmapMaxValue([])).toBe(0);
    expect(getHeatmapMaxValue([{ cells: [] }, { cells: [null] }])).toBe(0);
  });
});

describe('getRampOpacity', () => {
  it('should give the floor to the value 0 and full opacity to the max', () => {
    expect(getRampOpacity(0, 100, 0.1)).toBe(0.1);
    expect(getRampOpacity(100, 100, 0.1)).toBe(1);
  });

  it('should interpolate between the floor and full opacity', () => {
    expect(getRampOpacity(50, 100, 0.2)).toBe(0.6);
  });

  it('should round, so a dense grid does not mint a class per cell', () => {
    expect(getRampOpacity(1, 3, 0)).toBe(0.33);
  });

  it('should clamp values outside the domain instead of overshooting', () => {
    expect(getRampOpacity(150, 100, 0.1)).toBe(1);
    expect(getRampOpacity(-20, 100, 0.1)).toBe(0.1);
  });

  it('should fall back to the floor on a degenerate domain', () => {
    expect(getRampOpacity(0, 0, DEFAULT_MIN_OPACITY)).toBe(DEFAULT_MIN_OPACITY);
  });
});

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
