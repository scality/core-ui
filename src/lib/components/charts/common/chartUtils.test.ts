import {
  getRoundReferenceValue,
  getTicks,
  getUnitLabel,
  addMissingDataPoint,
  formatXAxisDate,
  normalizeChartDataWithUnits,
  getTooltipDateFormat,
} from './chartUtils';
import { NAN_STRING } from '../../constants';
import { UnitRange } from '../types';

describe('getRoundReferenceValue', () => {
  it('should return 1 for values <= 0', () => {
    expect(getRoundReferenceValue(0)).toBe(1);
    expect(getRoundReferenceValue(-5)).toBe(1);
  });

  it('should round to nice numbers', () => {
    expect(getRoundReferenceValue(1)).toBe(2);
    expect(getRoundReferenceValue(5)).toBe(10);
    expect(getRoundReferenceValue(10)).toBe(20);
    expect(getRoundReferenceValue(50)).toBe(75);
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

describe('formatXAxisDate', () => {
  const ONE_DAY = 24 * 60 * 60;
  const ONE_WEEK = 7 * ONE_DAY;

  it('should return "time" for durations <= 1 day', () => {
    expect(formatXAxisDate(ONE_DAY)).toBe('time');
    expect(formatXAxisDate(ONE_DAY / 2)).toBe('time');
    expect(formatXAxisDate(1000)).toBe('time');
  });

  it('should return "day-month-abbreviated" for durations <= 1 week', () => {
    expect(formatXAxisDate(ONE_DAY * 2)).toBe('day-month-abbreviated');
    expect(formatXAxisDate(ONE_WEEK - 1000)).toBe('day-month-abbreviated');
  });

  it('should return "chart-long-term-date" for durations > 1 week', () => {
    expect(formatXAxisDate(ONE_WEEK + 1000)).toBe('chart-long-term-date');
    expect(formatXAxisDate(ONE_DAY * 30)).toBe('chart-long-term-date');
    expect(formatXAxisDate(ONE_DAY * 365)).toBe('chart-long-term-date');
  });
});

describe('getTooltipDateFormat', () => {
  it('should return "day-month-abbreviated-hour-minute-second" for durations <= 1 hour', () => {
    expect(getTooltipDateFormat(60)).toBe(
      'day-month-abbreviated-hour-minute-second',
    );
    expect(getTooltipDateFormat(60 * 40)).toBe(
      'day-month-abbreviated-hour-minute-second',
    );
    expect(getTooltipDateFormat(60 * 60)).toBe(
      'day-month-abbreviated-hour-minute-second',
    );
  });
  it('should return "day-month-abbreviated-hour-minute" for durations <= 7 days', () => {
    expect(getTooltipDateFormat(60 * 60 * 2)).toBe(
      'day-month-abbreviated-hour-minute',
    );
    expect(getTooltipDateFormat(60 * 60 * 24)).toBe(
      'day-month-abbreviated-hour-minute',
    );
    expect(getTooltipDateFormat(60 * 60 * 24 * 7)).toBe(
      'day-month-abbreviated-hour-minute',
    );
  });
  it('should return "day-month-abbreviated-year-hour-minute" for durations > 7 days', () => {
    expect(getTooltipDateFormat(60 * 60 * 24 * 7.1)).toBe(
      'day-month-abbreviated-year-hour-minute',
    );
    expect(getTooltipDateFormat(60 * 60 * 24 * 30)).toBe(
      'day-month-abbreviated-year-hour-minute',
    );
  });
});

describe('normalizeChartDataWithUnits', () => {
  describe('with Barchart (category as excludeKey)', () => {
    it('should compute unit label and normalize data when unit range is provided', () => {
      const data = [
        { category: 'category1', success: 1680 },
        { category: 'category2', success: 2000 },
      ];
      const maxValue = 2000;
      const unitRange: UnitRange = [{ threshold: 1000, label: 'kB' }];

      const result = normalizeChartDataWithUnits(
        data,
        maxValue,
        unitRange,
        'category',
      );

      expect(result.unitLabel).toBe('kB');
      // 2000 / 1000 = 2, with buffer: 2.2 → rounds to 5
      expect(result.topValue).toBe(5);
      expect(result.rechartsData).toEqual([
        { category: 'category1', success: 1.68 },
        { category: 'category2', success: 2 },
      ]);
    });

    it('should handle threshold of 0 (bytes)', () => {
      const data = [{ category: 'category1', success: 680 }];
      const maxValue = 680;
      const unitRange: UnitRange = [
        { threshold: 0, label: 'B' },
        { threshold: 1000, label: 'kB' },
      ];

      const result = normalizeChartDataWithUnits(
        data,
        maxValue,
        unitRange,
        'category',
      );

      expect(result.unitLabel).toBe('B');
      // 680 with buffer: 748 → rounds to 750
      expect(result.topValue).toBe(750);
      expect(result.rechartsData).toEqual([
        { category: 'category1', success: 680 },
      ]);
    });

    it('should not normalize when no unit range provided', () => {
      const data = [
        { category: 'A', value: 100 },
        { category: 'B', value: 200 },
      ];
      const maxValue = 200;

      const result = normalizeChartDataWithUnits(
        data,
        maxValue,
        undefined,
        'category',
      );

      expect(result.unitLabel).toBeUndefined();
      // 200 with 10% buffer: 220 → rounds to 400
      expect(result.topValue).toBe(400);
      expect(result.rechartsData).toEqual(data);
    });

    it('should exclude category key from normalization', () => {
      const data = [{ category: 1000, value: 1000 }];
      const maxValue = 1000;
      const unitRange: UnitRange = [{ threshold: 1000, label: 'k' }];

      const result = normalizeChartDataWithUnits(
        data,
        maxValue,
        unitRange,
        'category',
      );

      // category should remain unchanged (1000, not normalized to 1)
      expect(result.rechartsData[0].category).toBe(1000);
      // value should be normalized
      expect(result.rechartsData[0].value).toBe(1);
    });
  });

  describe('with LineTimeSerieChart (timestamp as excludeKey)', () => {
    it('should normalize data and exclude timestamp', () => {
      const data = [
        { timestamp: 1634567890000, metric1: 5000, metric2: 3000 },
        { timestamp: 1634567900000, metric1: 6000, metric2: 4000 },
      ];
      const maxValue = 6000;
      const unitRange: UnitRange = [{ threshold: 1000, label: 'k' }];

      const result = normalizeChartDataWithUnits(
        data,
        maxValue,
        unitRange,
        'timestamp',
      );

      expect(result.unitLabel).toBe('k');
      expect(result.topValue).toBe(10);
      expect(result.rechartsData).toEqual([
        { timestamp: 1634567890000, metric1: 5, metric2: 3 },
        { timestamp: 1634567900000, metric1: 6, metric2: 4 },
      ]);
    });

    it('should handle multiple metrics with timestamp', () => {
      const data = [{ timestamp: 100, cpu: 2500, memory: 1500 }];
      const maxValue = 2500;
      const unitRange: UnitRange = [{ threshold: 1000, label: 'k' }];

      const result = normalizeChartDataWithUnits(
        data,
        maxValue,
        unitRange,
        'timestamp',
      );

      expect(result.rechartsData[0].timestamp).toBe(100); // unchanged
      expect(result.rechartsData[0].cpu).toBe(2.5); // normalized
      expect(result.rechartsData[0].memory).toBe(1.5); // normalized
    });
  });

  describe('edge cases', () => {
    it('should handle empty data array', () => {
      const result = normalizeChartDataWithUnits([], 0, undefined, 'category');

      expect(result.unitLabel).toBeUndefined();
      expect(result.topValue).toBe(1); // Default for 0
      expect(result.rechartsData).toEqual([]);
    });

    it('should handle data with only exclude key', () => {
      const data = [{ category: 'A' }, { category: 'B' }];
      const result = normalizeChartDataWithUnits(
        data,
        10,
        undefined,
        'category',
      );

      expect(result.rechartsData).toEqual(data);
    });

    it('should handle mixed string and number values', () => {
      const data = [{ category: 'test', value1: 1000, value2: 'text' }];
      const unitRange: UnitRange = [{ threshold: 1000, label: 'k' }];

      const result = normalizeChartDataWithUnits(
        data,
        1000,
        unitRange,
        'category',
      );

      expect(result.rechartsData[0].value1).toBe(1); // normalized
      expect(result.rechartsData[0].value2).toBe('text'); // unchanged
    });

    it('should handle empty unit range array', () => {
      const data = [{ category: 'A', value: 100 }];
      const result = normalizeChartDataWithUnits(data, 100, [], 'category');

      expect(result.unitLabel).toBeUndefined();
      // 100 with 10% buffer: 110 → rounds to 200
      expect(result.topValue).toBe(200);
      expect(result.rechartsData).toEqual(data);
    });
  });
});
