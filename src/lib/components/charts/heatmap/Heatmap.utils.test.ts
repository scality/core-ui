import {
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
