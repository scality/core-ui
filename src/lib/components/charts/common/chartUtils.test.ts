import {
  formatLogTickValue,
  getLogAxis,
  getMinPositiveValue,
  hasZeroValue,
  placeNonPositiveValues,
  readLogPlottedValue,
  getRoundReferenceValue,
  getTicks,
  getUnitLabel,
  addMissingDataPoint,
  formatXAxisDate,
  normalizeChartDataWithUnits,
  getTooltipDateFormat,
  formatTooltipValueWithUnit,
  createSymlogScale,
  getSymlogAxis,
  formatSymlogTickValue,
  formatTickValue,
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
    expect(getRoundReferenceValue(15)).toBe(15); // 15 → increment 5, remainder 0, return 15
    expect(getRoundReferenceValue(35)).toBe(35); // 35 → increment 5, remainder 0, return 35
    expect(getRoundReferenceValue(75)).toBe(80); // 75 → 82.5, remainder 5, incremented 80 <= 82.5, so round up to 80
    expect(getRoundReferenceValue(150)).toBe(150); // increment 50, remainder 0
    expect(getRoundReferenceValue(350)).toBe(350); // increment 50, remainder 0
    expect(getRoundReferenceValue(750)).toBe(800); // increment 100, remainder 50, rounds up
    expect(getRoundReferenceValue(1500)).toBe(1500); // increment 500, remainder 0
    expect(getRoundReferenceValue(3500)).toBe(3500); // increment 500, remainder 0
    expect(getRoundReferenceValue(7500)).toBe(8000); // increment 1000, remainder 500, rounds up
    expect(getRoundReferenceValue(15000)).toBe(15000); // increment 5000, remainder 0
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
      // 680 / 1 = 680 → getRoundReferenceValue(680) = 700 (rounds up since 80 >= 50)
      expect(result.topValue).toBe(700);
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

  describe('valueBase', () => {
    it('should expose the value base used for normalization', () => {
      const data = [{ category: 'A', value: 2000 }];
      const unitRange: UnitRange = [
        { threshold: 1, label: 'op/s' },
        { threshold: 1000, label: 'kop/s' },
      ];

      const result = normalizeChartDataWithUnits(
        data,
        2000,
        unitRange,
        'category',
      );

      expect(result.unitLabel).toBe('kop/s');
      expect(result.valueBase).toBe(1000);
    });

    it('should default valueBase to 1 when no unit range is provided', () => {
      const result = normalizeChartDataWithUnits(
        [{ category: 'A', value: 100 }],
        100,
        undefined,
        'category',
      );

      expect(result.valueBase).toBe(1);
    });
  });
});

describe('formatTooltipValueWithUnit', () => {
  const unitRange: UnitRange = [
    { threshold: 1, label: 'op/s' },
    { threshold: 1000, label: 'kop/s' },
    { threshold: 1000000, label: 'Mop/s' },
  ];

  it('re-derives a smaller unit for values that are small relative to the axis unit', () => {
    // Axis is in kop/s (valueBase 1000). A point of 5 op/s is stored as 0.005.
    // Without re-scaling it would read "0.01 kop/s"; instead it should read "5 op/s".
    expect(formatTooltipValueWithUnit(0.005, 1000, unitRange, 'kop/s')).toBe(
      '5.00 op/s',
    );
  });

  it('keeps the axis unit for values that match its magnitude', () => {
    // 2 (stored) * 1000 = 2000 op/s → 2 kop/s
    expect(formatTooltipValueWithUnit(2, 1000, unitRange, 'kop/s')).toBe(
      '2.00 kop/s',
    );
  });

  it('re-derives a larger unit for values that exceed the axis unit', () => {
    // 5000 (stored) * 1000 = 5,000,000 op/s → 5 Mop/s
    expect(formatTooltipValueWithUnit(5000, 1000, unitRange, 'kop/s')).toBe(
      '5.00 Mop/s',
    );
  });

  it('handles negative values (symmetrical charts) using the magnitude', () => {
    expect(formatTooltipValueWithUnit(-0.005, 1000, unitRange, 'kop/s')).toBe(
      '-5.00 op/s',
    );
  });

  it('falls back to the provided unit label when no unit range is given', () => {
    expect(formatTooltipValueWithUnit(42.5, 1, undefined, '%')).toBe('42.50 %');
  });

  it('returns "-" for non-finite values', () => {
    expect(formatTooltipValueWithUnit(NaN, 1000, unitRange, 'kop/s')).toBe('-');
  });

  describe('with fixedDecimals = false (bare whole numbers)', () => {
    it('drops the trailing ".00" for whole values on the re-derived unit', () => {
      // Same input as the default case, which yields "5.00 op/s".
      expect(
        formatTooltipValueWithUnit(0.005, 1000, unitRange, 'kop/s', false),
      ).toBe('5 op/s');
    });

    it('still keeps up to two decimals for fractional values', () => {
      // 1.84 (stored) * 1000 = 1840 op/s → 1.84 kop/s
      expect(
        formatTooltipValueWithUnit(1.84, 1000, unitRange, 'kop/s', false),
      ).toBe('1.84 kop/s');
    });

    it('drops the trailing ".00" in the no-unit-range fallback', () => {
      expect(formatTooltipValueWithUnit(20, 1, undefined, 'kB', false)).toBe(
        '20 kB',
      );
    });
  });
});

describe('getMinPositiveValue', () => {
  it('ignores the excluded key, zeros, negatives and non-numbers', () => {
    const data = [
      { category: 'a', up: 0, down: 40 },
      { category: 'b', up: 3, down: -10 },
      { category: 'c', up: null, down: 'NAN' },
    ];

    // 'category' would sort as NaN, 0 and -10 have no logarithm, 'NAN' is a gap
    // marker.
    expect(getMinPositiveValue(data, 'category')).toBe(3);
  });

  it('returns null when nothing is positive', () => {
    expect(
      getMinPositiveValue([{ category: 'a', up: 0, down: -1 }], 'category'),
    ).toBeNull();
    expect(getMinPositiveValue([], 'category')).toBeNull();
  });

  it('reads a numeric string, because that is how prometheus data arrives', () => {
    expect(
      getMinPositiveValue([{ timestamp: 1, load: '0.25' }], 'timestamp'),
    ).toBe(0.25);
  });
});

describe('getLogAxis', () => {
  it('bounds the axis with the decades enclosing the data', () => {
    // 3..400 is not 0..400: a log axis cannot start at zero.
    expect(getLogAxis(3, 400)).toMatchObject({
      domain: [1, 1000],
      ticks: [1, 10, 100, 1000],
    });
  });

  it('keeps a max that already sits on a decade as its own bound', () => {
    expect(getLogAxis(1, 1000).domain).toEqual([1, 1000]);
  });

  it('handles values below one', () => {
    expect(getLogAxis(0.004, 0.5)).toMatchObject({
      domain: [0.001, 1],
      ticks: [0.001, 0.01, 0.1, 1],
    });
  });

  it('still gives a decade of height when every value shares a magnitude', () => {
    // Without this the domain would be [10, 10] and the plot would have no
    // height.
    expect(getLogAxis(20, 30)).toMatchObject({
      domain: [10, 100],
      ticks: [10, 100],
    });
  });

  it('skips whole decades rather than crowding the axis, keeping both bounds', () => {
    const { domain, ticks } = getLogAxis(1, 1e9, { maxTicks: 4 });

    expect(domain).toEqual([1, 1e9]);
    expect(ticks.length).toBeLessThanOrEqual(5);
    expect(ticks[0]).toBe(1);
    expect(ticks[ticks.length - 1]).toBe(1e9);
    // Every tick is a decade — a log axis is never subdivided linearly.
    ticks.forEach((tick) =>
      expect(Number.isInteger(Math.log10(tick))).toBe(true),
    );
  });

  it('falls back to one empty decade when there is nothing positive to plot', () => {
    expect(getLogAxis(null, 0)).toMatchObject({
      domain: [1, 10],
      ticks: [1, 10],
    });
    expect(getLogAxis(0, 100)).toMatchObject({
      domain: [1, 10],
      ticks: [1, 10],
    });
  });

  it('reserves a slot below the first decade for a measured zero', () => {
    const axis = getLogAxis(3, 400, { withZeroBand: true });

    // The scale still runs 1..1000; the slot sits one position below it.
    expect(axis.zeroValue).toBe(0.1);
    expect(axis.domain).toEqual([0.1, 1000]);
    expect(axis.ticks).toEqual([0.1, 1, 10, 100, 1000]);
  });

  it('reserves nothing when not asked, so no height is spent on an empty band', () => {
    const axis = getLogAxis(3, 400);

    expect(axis.zeroValue).toBeNull();
    expect(axis.domain).toEqual([1, 1000]);
  });

  it('puts the band below the first decade whatever the magnitude', () => {
    expect(getLogAxis(0.004, 0.5, { withZeroBand: true })).toMatchObject({
      zeroValue: 0.0001,
      domain: [0.0001, 1],
    });
  });
});

describe('formatLogTickValue', () => {
  it('takes its decimals from the tick, not from the axis maximum', () => {
    // The same axis has to render both of these legibly.
    expect(formatLogTickValue(0.001)).toBe('0.001');
    expect(formatLogTickValue(1)).toBe('1');
    expect(formatLogTickValue(100)).toBe('100');
  });

  it('goes compact past ten thousand, in the same ISO style as the linear axis', () => {
    // formatISONumber separates the suffix with a non-breaking space, so match
    // the shape rather than pinning the exact whitespace character.
    expect(formatLogTickValue(1000000)).toMatch(/^1\sM$/);
  });

  it('renders nothing for a value a log axis has no place for', () => {
    expect(formatLogTickValue(0)).toBe('');
    expect(formatLogTickValue(-5)).toBe('');
  });

  it('labels the reserved band 0, not by the position it occupies', () => {
    expect(formatLogTickValue(0.1, 0.1)).toBe('0');
    // Without the band, the same position is just a tick like any other.
    expect(formatLogTickValue(0.1)).toBe('0.1');
  });

  it('spells a decade under the scientific threshold as a bare power', () => {
    // formatISONumber reads `decimals` as mantissa digits down here, and a decade's
    // mantissa is 1 — so anything past `1e-4` would pad it a zero per decade.
    expect(formatLogTickValue(1e-4)).toBe('1e-4');
    expect(formatLogTickValue(1e-5)).toBe('1e-5');
    expect(formatLogTickValue(1e-9)).toBe('1e-9');
    // The decade above the threshold still reads in full, so the axis changes
    // notation exactly where formatISONumber does.
    expect(formatLogTickValue(1e-3)).toBe('0.001');
  });
});

describe('formatTickValue', () => {
  it('keeps the mantissa the same width whatever the decade', () => {
    // The decimal count is derived from the axis magnitude, which is the right number of
    // fraction digits and the wrong number of mantissa digits. Widths must not track the
    // exponent: scientific notation already carries the magnitude in the exponent.
    const widths = [5e-4, 5e-5, 5e-6, 5e-9].map(
      (top) => formatTickValue(top / 5, top).split('e')[0].length,
    );

    expect(new Set(widths).size).toBe(1);
  });

  it('spells a tick under the scientific threshold with two mantissa digits', () => {
    expect(formatTickValue(1e-5, 5e-5)).toBe('1.00e-5');
    // Two digits are what keeps a tick that is not a round decade readable.
    expect(formatTickValue(2.5e-6, 1e-5)).toBe('2.50e-6');
  });

  it('is unchanged above the threshold, where the count is fraction digits', () => {
    expect(formatTickValue(0.002, 0.01)).toBe('0.002');
    expect(formatTickValue(42, 100)).toBe('42');
  });
});

describe('formatSymlogTickValue', () => {
  it('labels zero and negatives, which a log axis blanks', () => {
    expect(formatSymlogTickValue(0)).toBe('0');
    expect(formatSymlogTickValue(-1)).toBe('-1');
    expect(formatSymlogTickValue(-0.01)).toBe('-0.01');
  });

  it('spells a decade under the scientific threshold as a bare power, either sign', () => {
    expect(formatSymlogTickValue(1e-5)).toBe('1e-5');
    expect(formatSymlogTickValue(-1e-5)).toBe('-1e-5');
  });

  it('renders nothing for a value that is not a number', () => {
    expect(formatSymlogTickValue(NaN)).toBe('');
    expect(formatSymlogTickValue(Infinity)).toBe('');
  });
});

describe('hasZeroValue', () => {
  it('is true only for a measured zero, not for a gap or a negative', () => {
    expect(hasZeroValue([{ category: 'a', up: 0 }], 'category')).toBe(true);
    expect(hasZeroValue([{ category: 'a', up: '0' }], 'category')).toBe(true);
    expect(hasZeroValue([{ category: 'a', up: null }], 'category')).toBe(false);
    expect(hasZeroValue([{ category: 'a', up: -1 }], 'category')).toBe(false);
    expect(hasZeroValue([{ category: 'a', up: 3 }], 'category')).toBe(false);
  });

  it('never counts the excluded key, whose zero is not a value', () => {
    expect(hasZeroValue([{ timestamp: 0, load: 2 }], 'timestamp')).toBe(false);
  });
});

describe('placeNonPositiveValues', () => {
  it('moves a zero to the reserved band, where the axis can draw it', () => {
    const data = [
      { category: 'a', up: 0, down: 40 },
      { category: 'b', up: 0.5, down: 0 },
    ];

    expect(placeNonPositiveValues(data, 'category', 0.1)).toEqual([
      { category: 'a', up: 0.1, down: 40 },
      { category: 'b', up: 0.5, down: 0.1 },
    ]);
  });

  it('drops a negative, which has no band and no logarithm', () => {
    expect(
      placeNonPositiveValues([{ category: 'a', up: -3 }], 'category', 0.1),
    ).toEqual([{ category: 'a', up: null }]);
  });

  it('drops zeros when no band was reserved', () => {
    expect(
      placeNonPositiveValues([{ category: 'a', up: 0 }], 'category', null),
    ).toEqual([{ category: 'a', up: null }]);
  });

  it('never touches the excluded key, even when it is zero', () => {
    // A timestamp of 0 is a valid instant, not a value to move.
    expect(
      placeNonPositiveValues([{ timestamp: 0, load: 2 }], 'timestamp', 0.1),
    ).toEqual([{ timestamp: 0, load: 2 }]);
  });

  it('leaves a gap marker as it found it', () => {
    expect(
      placeNonPositiveValues([{ timestamp: 1, load: null }], 'timestamp', 0.1),
    ).toEqual([{ timestamp: 1, load: null }]);
  });
});

describe('readLogPlottedValue', () => {
  it('reports a value sitting at the band as the zero it is', () => {
    expect(readLogPlottedValue(0.1, 0.1)).toBe(0);
  });

  it('leaves every other value alone', () => {
    expect(readLogPlottedValue(0.5, 0.1)).toBe(0.5);
    expect(readLogPlottedValue(0.1, null)).toBe(0.1);
  });
});

describe('getSymlogAxis', () => {
  it('bounds the axis with the decades enclosing the data on each side', () => {
    expect(getSymlogAxis(-700, 4000, 4).domain).toEqual([-1000, 10000]);
  });

  it('keeps the lower bound at zero when nothing goes negative', () => {
    expect(getSymlogAxis(0, 700, 4).domain).toEqual([0, 1000]);
  });

  it('sizes the linear middle to the data rather than leaving it at 1', () => {
    // With constant 1 these all fall in the flat middle and read as linear.
    expect(getSymlogAxis(0, 50, 0.002).constant).toBe(0.001);
    expect(getSymlogAxis(0, 50, 4).constant).toBe(1);
    expect(getSymlogAxis(0, 5000, 250).constant).toBe(100);
  });

  it('falls back to a linear middle of 1 when the data is all zeros', () => {
    expect(getSymlogAxis(0, 0, null).constant).toBe(1);
    expect(getSymlogAxis(0, 0, null).domain).toEqual([0, 10]);
  });

  it('follows each side on its own rather than mirroring', () => {
    // Mirroring to [-1000, 1000] would spend the quiet direction's whole half
    // on empty decades, which is the readability symlog was chosen for.
    expect(getSymlogAxis(-0.03, 200, 0.03).domain).toEqual([-0.1, 1000]);
  });

  it('ticks zero and the decades each side actually reaches', () => {
    expect(getSymlogAxis(-100, 100, 1).ticks).toEqual([
      -100, -10, -1, 0, 1, 10, 100,
    ]);
  });

  it('ticks only the side that has data', () => {
    expect(getSymlogAxis(0, 100, 1).ticks).toEqual([0, 1, 10, 100]);
  });

  it('skips whole decades rather than crowding the axis', () => {
    // Ten decades: thinned rather than subdivided, both ends kept.
    expect(getSymlogAxis(0, 1e6, 0.001).ticks).toEqual([
      0, 0.1, 10, 1000, 100000, 1000000,
    ]);
  });

  it('drops the decades it cannot keep apart from zero', () => {
    // Symlog is linear near zero, so `constant` lands a few pixels from the
    // zero tick and the two labels print on top of each other.
    expect(getSymlogAxis(-1000, 1000, 0.03).ticks).toEqual([
      -1000, -100, -1, 0, 1, 100, 1000,
    ]);
  });

  it('halves the allowance per side when both sides carry decades', () => {
    // Both halves share the height, so each side is thinned harder.
    const { ticks } = getSymlogAxis(-1e6, 1e6, 0.001);
    expect(ticks).toContain(0);
    expect(ticks[0]).toBe(-1000000);
    expect(ticks[ticks.length - 1]).toBe(1000000);
    expect(ticks.filter((tick) => tick > 0).length).toBeLessThan(
      getSymlogAxis(0, 1e6, 0.001).ticks.filter((tick) => tick > 0).length,
    );
  });
});

describe('createSymlogScale', () => {
  const scale = createSymlogScale(1, [-1000, 1000], [200, 0]);

  it('gives zero a position of its own, at the middle of the axis', () => {
    expect(scale(0)).toBe(100);
  });

  it('places a value and its negation symmetrically', () => {
    expect(scale(10)).toBeCloseTo(200 - (scale(-10) as number), 6);
  });

  it('orders values monotonically across zero', () => {
    const positions = [-1000, -10, -1, 0, 1, 10, 1000].map(
      (value) => scale(value) as number,
    );
    const descending = [...positions].sort((a, b) => b - a);
    expect(positions).toEqual(descending);
  });

  it('reaches both ends of the range at the bounds of the domain', () => {
    expect(scale(-1000)).toBeCloseTo(200, 6);
    expect(scale(1000)).toBeCloseTo(0, 6);
  });

  it('gives the small values a real share of the axis', () => {
    // With the d3 default of 1, this span collapses to a couple of pixels.
    const tuned = createSymlogScale(0.001, [0, 50], [200, 0]);
    const span = (tuned(0.001) as number) - (tuned(0.1) as number);
    expect(span).toBeGreaterThan(50);
  });

  it('copies without sharing state with the original', () => {
    const copy = scale.copy().domain([0, 1]).range([0, 10]);
    expect(copy(1)).toBeCloseTo(10, 6);
    // The original is untouched.
    expect(scale(1000)).toBeCloseTo(0, 6);
  });

  it('reads back the domain and range it was given', () => {
    expect(scale.domain()).toEqual([-1000, 1000]);
    expect(scale.range()).toEqual([200, 0]);
  });
});
