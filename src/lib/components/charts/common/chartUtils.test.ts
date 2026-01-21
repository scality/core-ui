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
  it('should return appropriate rounded values with 10% buffer', () => {
    // Small values (< 10)
    expect(getRoundReferenceValue(0.1)).toBe(0.1); // 0.1 → 0.11 → 0.1 (magnitude 0.1, remainder 0.01)
    expect(getRoundReferenceValue(1)).toBe(1); // 1 → 1.1 → 1 (magnitude 1, remainder 0.1)
    expect(getRoundReferenceValue(2)).toBe(2); // 2 → 2.2 → 2 (magnitude 1, remainder 0.2)
    expect(getRoundReferenceValue(3)).toBe(3); // 3 → 3.3 → 3 (magnitude 1, remainder 0.3)

    // Values 5-10 range
    expect(getRoundReferenceValue(6)).toBe(6); // 6 → 6.6 → 6 (magnitude 1, remainder 0.6)
    expect(getRoundReferenceValue(9)).toBe(9); // 9 → 9.9 → 9 (magnitude 1, remainder 0.9)

    // Larger values get 10% buffer applied
    expect(getRoundReferenceValue(15)).toBe(10); // 15 → 16.5, remainder 5, incremented 20 > 16.5, so round down to 10
    expect(getRoundReferenceValue(35)).toBe(30); // 35 → 38.5, remainder 5, incremented 40 > 38.5, so round down to 30
    expect(getRoundReferenceValue(75)).toBe(80); // 75 → 82.5, remainder 5, incremented 80 <= 82.5, so round up to 80
    expect(getRoundReferenceValue(150)).toBe(150); // 150 → 165, remainder 0, so return 150
    expect(getRoundReferenceValue(350)).toBe(350); // 350 → 385, remainder 0, so return 350
    expect(getRoundReferenceValue(750)).toBe(750); // 750 → 825, remainder 0, so return 750
    expect(getRoundReferenceValue(1500)).toBe(1500); // 1500 → 1650, remainder 0, so return 1500
    expect(getRoundReferenceValue(3500)).toBe(3500); // 3500 → 3850, remainder 0, so return 3500
    expect(getRoundReferenceValue(7500)).toBe(7500); // 7500 → 8250, remainder 0, so return 7500
    expect(getRoundReferenceValue(15000)).toBe(15000); // 15000 → 16500, remainder 0, so return 15000
  });
});

describe('getTicks', () => {
  it('should return ticks for small values < 10', () => {
    // Non-symmetrical ticks
    expect(getTicks(1, false)).toEqual([0, 0.5, 1]); // 1 % 2 != 0, defaults to 3 ticks
    expect(getTicks(2, false)).toEqual([0, 1, 2]); // 2 % (3-1) == 0, uses 3 ticks
    expect(getTicks(5, false)).toEqual([0, 2.5, 5]); // 5 % 2 != 0 and 5 % 3 != 0, defaults to 3 ticks
    expect(getTicks(10, false)).toEqual([0, 5, 10]); // 10 % 2 == 0, uses 3 ticks
    expect(getTicks(15, false)).toEqual([0, 5, 10, 15]); // 15 % 3= 0, uses 4 ticks
    expect(getTicks(20, false)).toEqual([0, 10, 20]); // 20 % 2 == 0, uses 3 ticks
    expect(getTicks(250, false)).toEqual([0, 125, 250]); // 250 % 3 = 0, uses 3 ticks
    // Symmetrical ticks
    expect(getTicks(1, true)).toEqual([-1, -0.5, 0, 0.5, 1]); // 1 % 2 != 0, defaults to 3 ticks, symmetrical adds negatives
    expect(getTicks(2, true)).toEqual([-2, -1, 0, 1, 2]); // 2 % (3-1) == 0, uses 3 ticks, symmetrical adds negatives
    expect(getTicks(5, true)).toEqual([-5, -2.5, 0, 2.5, 5]); // 5 % 2 != 0 and 5 % 3 != 0, defaults to 3 ticks, symmetrical adds negatives
    expect(getTicks(10, true)).toEqual([-10, -5, 0, 5, 10]); // 10 % 2 == 0, uses 3 ticks, symmetrical adds negatives
    expect(getTicks(15, true)).toEqual([-15, -10, -5, 0, 5, 10, 15]); // 15 % 3 = 0, uses 4 ticks, symmetrical adds negatives
    expect(getTicks(20, true)).toEqual([-20, -10, 0, 10, 20]); // 20 % 2 == 0, uses 3 ticks, symmetrical adds negatives
    expect(getTicks(250, true)).toEqual([-250, -125, 0, 125, 250]); // 250 % 3 = 0, uses 3 ticks, symmetrical adds negatives
  });

  it('should generate evenly spaced ticks for larger values', () => {
    const ticks = getTicks(100, false);
    expect(ticks).toHaveLength(3);
    expect(ticks[0]).toBe(0);
    expect(ticks[ticks.length - 1]).toBe(100);
  });
});

describe('getUnitLabel', () => {
  const unitRange: UnitRange = [
    { threshold: 1, label: 'B' },
    { threshold: 1000, label: 'KB' },
    { threshold: 1000000, label: 'MB' },
    { threshold: 1000000000, label: 'GB' },
  ];
  it('should return correct unit label and threshold', () => {
    const result = getUnitLabel(unitRange, 500);
    expect(result).toEqual({ valueBase: 1, unitLabel: 'B' });
    const result2 = getUnitLabel(unitRange, 500000);
    expect(result2).toEqual({ valueBase: 1000, unitLabel: 'KB' });
    const result3 = getUnitLabel(unitRange, 500000000);
    expect(result3).toEqual({ valueBase: 1000000, unitLabel: 'MB' });
    const result4 = getUnitLabel(unitRange, 500000000000);
    expect(result4).toEqual({ valueBase: 1000000000, unitLabel: 'GB' });
  });

  it('should return correct unit for medium values even if range is disordered', () => {
    const unsortedRange = [
      { threshold: 1000000, label: 'MB' },
      { threshold: 1000, label: 'KB' },
      { threshold: 1000000000, label: 'GB' },
      { threshold: 1, label: 'B' },
    ];
    const result = getUnitLabel(unsortedRange, 50000);
    expect(result).toEqual({ valueBase: 1000, unitLabel: 'KB' });
  });
});

describe('addMissingDataPoint', () => {
  it('should generate placeholder timestamps when original data is empty', () => {
    const result = addMissingDataPoint([], 0, 100, 10);
    expect(result).toEqual([
      [0, NAN_STRING],
      [10, NAN_STRING],
      [20, NAN_STRING],
      [30, NAN_STRING],
      [40, NAN_STRING],
      [50, NAN_STRING],
      [60, NAN_STRING],
      [70, NAN_STRING],
      [80, NAN_STRING],
      [90, NAN_STRING],
    ]);
  });

  it('should return empty array for invalid inputs', () => {
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
      // 2000 / 1000 = 2 → getRoundReferenceValue(2) = 2
      expect(result.topValue).toBe(2);
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
      // 680 / 1 = 680 → getRoundReferenceValue(680) = 680
      expect(result.topValue).toBe(680);
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
      // 200 → getRoundReferenceValue(200) = 200
      expect(result.topValue).toBe(200);
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
      // 6000 / 1000 = 6 → getRoundReferenceValue(6) = 6
      expect(result.topValue).toBe(6);
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
      // 100 → getRoundReferenceValue(100) = 100
      expect(result.topValue).toBe(100);
      expect(result.rechartsData).toEqual(data);
    });
  });
});
