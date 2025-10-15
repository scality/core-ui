import {
  getRoundReferenceValue,
  getTicks,
  getUnitLabel,
  addMissingDataPoint,
  formatDate,
} from './chartUtils';
import { NAN_STRING } from '../../constants';

describe('getRoundReferenceValue', () => {
  it('should return 1 for values <= 0', () => {
    expect(getRoundReferenceValue(0)).toBe(1);
    expect(getRoundReferenceValue(-5)).toBe(1);
  });

  it('should round to nice numbers', () => {
    expect(getRoundReferenceValue(1)).toBe(2);
    expect(getRoundReferenceValue(5)).toBe(5);
    expect(getRoundReferenceValue(10)).toBe(20);
    expect(getRoundReferenceValue(50)).toBe(50);
    expect(getRoundReferenceValue(100)).toBe(200);
  });

  it('should handle edge cases', () => {
    expect(getRoundReferenceValue(0.5)).toBe(1);
    expect(getRoundReferenceValue(9)).toBe(10);
    expect(getRoundReferenceValue(99)).toBe(100);
  });
});

describe('getTicks', () => {
  it('should return simple ticks for values < 10', () => {
    expect(getTicks(5, false)).toEqual([0, 5]);
    expect(getTicks(5, true)).toEqual([-5, 0, 5]);
  });

  it('should generate evenly spaced ticks for larger values', () => {
    const ticks = getTicks(100, false);
    expect(ticks).toHaveLength(3);
    expect(ticks[0]).toBe(0);
    expect(ticks[ticks.length - 1]).toBe(100);
  });

  it('should generate symmetrical ticks when isSymmetrical is true', () => {
    const ticks = getTicks(100, true);
    expect(ticks[0]).toBe(-100);
    expect(ticks[ticks.length - 1]).toBe(100);
    // Should have 0 in the middle
    const middleIndex = Math.floor(ticks.length / 2);
    expect(ticks[middleIndex]).toBe(0);
  });

  it('should handle values divisible by 3', () => {
    const ticks = getTicks(90, false);
    expect(ticks).toHaveLength(4); // numberOfTicks = 4 when topValue % 3 === 0
  });
});

describe('getUnitLabel', () => {
  const unitRange = [
    { threshold: 1000, label: 'KB' },
    { threshold: 1000000, label: 'MB' },
    { threshold: 1000000000, label: 'GB' },
  ];

  it('should return empty label when unitRange is empty', () => {
    const result = getUnitLabel([], 1000);
    expect(result).toEqual({ valueBase: 1, unitLabel: '' });
  });

  it('should return correct unit for small values', () => {
    const result = getUnitLabel(unitRange, 500);
    expect(result).toEqual({ valueBase: 1000, unitLabel: 'KB' });
  });

  it('should return correct unit for medium values', () => {
    const result = getUnitLabel(unitRange, 50000);
    expect(result).toEqual({ valueBase: 1000, unitLabel: 'KB' });
  });

  it('should return correct unit for large values', () => {
    const result = getUnitLabel(unitRange, 5000000);
    expect(result).toEqual({ valueBase: 1000000, unitLabel: 'MB' });
  });

  it('should return last unit for very large values', () => {
    const result = getUnitLabel(unitRange, 5000000000);
    expect(result).toEqual({ valueBase: 1000000000, unitLabel: 'GB' });
  });

  it('should sort unitRange if not sorted', () => {
    const unsortedRange = [
      { threshold: 1000000, label: 'MB' },
      { threshold: 1000, label: 'KB' },
      { threshold: 1000000000, label: 'GB' },
    ];
    const result = getUnitLabel(unsortedRange, 50000);
    expect(result).toEqual({ valueBase: 1000, unitLabel: 'KB' });
  });
});

describe('addMissingDataPoint', () => {
  it('should return empty array for invalid inputs', () => {
    expect(addMissingDataPoint([], 0, 100, 10)).toEqual([]);
    expect(addMissingDataPoint([[10, 5]], undefined, 100, 10)).toEqual([]);
    expect(addMissingDataPoint([[10, 5]], 0, 0, 10)).toEqual([]);
    expect(addMissingDataPoint([[10, 5]], -1, 100, 10)).toEqual([]);
  });

  it('should add missing data points at the beginning', () => {
    const original: [number, number][] = [
      [20, 5],
      [30, 10],
    ];
    const result = addMissingDataPoint(original, 0, 100, 10);

    expect(result[0]).toEqual([0, NAN_STRING]);
    expect(result[1]).toEqual([10, NAN_STRING]);
    expect(result[2]).toEqual([20, 5]);
  });

  it('should add missing data points in the middle', () => {
    const original: [number, number][] = [
      [0, 5],
      [30, 10],
    ];
    const result = addMissingDataPoint(original, 0, 100, 10);

    expect(result[0]).toEqual([0, 5]);
    expect(result[1]).toEqual([10, NAN_STRING]);
    expect(result[2]).toEqual([20, NAN_STRING]);
    expect(result[3]).toEqual([30, 10]);
  });

  it('should add missing data points at the end', () => {
    const original: [number, number][] = [
      [0, 5],
      [10, 10],
    ];
    const result = addMissingDataPoint(original, 0, 40, 10);

    expect(result[result.length - 3]).toEqual([10, 10]);
    expect(result[result.length - 2]).toEqual([20, NAN_STRING]);
    expect(result[result.length - 1]).toEqual([30, NAN_STRING]);
  });

  it('should handle data points with null values', () => {
    const original: [number, number | null][] = [
      [0, 5],
      [10, null],
      [20, 10],
    ];
    const result = addMissingDataPoint(original, 0, 30, 10);

    expect(result).toEqual([
      [0, 5],
      [10, null],
      [20, 10],
    ]);
  });

  it('should handle string values', () => {
    const original: [number, string][] = [
      [0, '5'],
      [10, '10'],
    ];
    const result = addMissingDataPoint(original, 0, 30, 10);

    expect(result[0]).toEqual([0, '5']);
    expect(result[1]).toEqual([10, '10']);
    expect(result[2]).toEqual([20, NAN_STRING]);
  });
});

describe('formatDate', () => {
  const ONE_DAY = 24 * 60 * 60 * 1000;
  const ONE_WEEK = 7 * ONE_DAY;

  it('should return "time" for durations <= 1 day', () => {
    expect(formatDate(ONE_DAY)).toBe('time');
    expect(formatDate(ONE_DAY / 2)).toBe('time');
    expect(formatDate(1000)).toBe('time');
  });

  it('should return "day-month-abbreviated" for durations <= 1 week', () => {
    expect(formatDate(ONE_DAY * 2)).toBe('day-month-abbreviated');
    expect(formatDate(ONE_WEEK)).toBe('day-month-abbreviated');
    expect(formatDate(ONE_WEEK - 1000)).toBe('day-month-abbreviated');
  });

  it('should return "chart-long-term-date" for durations > 1 week', () => {
    expect(formatDate(ONE_WEEK + 1000)).toBe('chart-long-term-date');
    expect(formatDate(ONE_DAY * 30)).toBe('chart-long-term-date');
    expect(formatDate(ONE_DAY * 365)).toBe('chart-long-term-date');
  });
});
