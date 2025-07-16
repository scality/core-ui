import { BarchartProps } from './Barchart.component';

import {
  computeUnitLabelAndRoundReferenceValue,
  formatPrometheusDataToChartData,
  getMaxBarValue,
  getRoundReferenceValue,
  sortStackedBars,
  UnitRange,
} from './utils';

describe('getRoundReferenceValue', () => {
  it('should return appropriate rounded values', () => {
    expect(getRoundReferenceValue(1)).toBe(1);
    expect(getRoundReferenceValue(2)).toBe(2.5);
    expect(getRoundReferenceValue(3)).toBe(5);
    expect(getRoundReferenceValue(7)).toBe(10);
    expect(getRoundReferenceValue(15)).toBe(25);
    expect(getRoundReferenceValue(35)).toBe(50);
    expect(getRoundReferenceValue(75)).toBe(100);
    expect(getRoundReferenceValue(150)).toBe(250);
    expect(getRoundReferenceValue(350)).toBe(500);
    expect(getRoundReferenceValue(750)).toBe(1000);
    expect(getRoundReferenceValue(1500)).toBe(2500);
    expect(getRoundReferenceValue(3500)).toBe(5000);
    expect(getRoundReferenceValue(7500)).toBe(10000);
    expect(getRoundReferenceValue(15000)).toBe(25000);
  });
});

describe('getMaxBarValue', () => {
  it('should return the maximum value from chart data', () => {
    const data = [
      { category: 'A', value1: 10, value2: 5 },
      { category: 'B', value1: 20, value2: 15 },
      { category: 'C', value1: 8, value2: 25 },
    ];
    expect(getMaxBarValue(data)).toBe(25);
  });

  it('should handle single value data', () => {
    const data = [{ category: 'A', value: 42 }];
    expect(getMaxBarValue(data)).toBe(42);
  });

  it('should return the maximum value from stacked data', () => {
    const data = [
      { category: 'A', value1: 10, value2: 5 },
      { category: 'B', value1: 20, value2: 15 },
      { category: 'C', value1: 8, value2: 25 },
    ];
    expect(getMaxBarValue(data, true)).toBe(35);
  });
});

describe('formatPrometheusDataToChartData', () => {
  describe('category data', () => {
    it('should format category data correctly', () => {
      const bars = [
        {
          label: 'Success',
          data: [
            ['category1', 10],
            ['category2', 20],
          ] as [string, number][],
          color: 'green',
        },
        {
          label: 'Failed',
          data: [
            ['category1', 5],
            ['category2', 15],
          ] as [string, number][],
          color: 'red',
        },
      ];

      const result = formatPrometheusDataToChartData(bars, 'category');

      expect(result.data).toEqual([
        { category: 'category1', success: 10, failed: 5 },
        { category: 'category2', success: 20, failed: 15 },
      ]);
      expect(result.rechartsBars).toEqual([
        { dataKey: 'success', fill: 'green' },
        { dataKey: 'failed', fill: 'red' },
      ]);
    });
  });

  describe('time data', () => {
    it('should format time data correctly with daily intervals', () => {
      const bars = [
        {
          label: 'Success',
          data: [
            [new Date('2024-07-05T00:00:00').getTime(), 10],
            [new Date('2024-07-06T00:00:00').getTime(), 20],
          ] as [number, number][],
          color: 'green',
        },
      ];

      const result = formatPrometheusDataToChartData(bars, {
        type: 'time',
        timeRange: {
          startTimestamp: new Date('2024-07-05T00:00:00').getTime(),
          endTimestamp: new Date('2024-07-06T00:00:00').getTime(),
          interval: 24 * 60 * 60 * 1000, // 1 day
        },
      });

      expect(result.data).toEqual([
        { category: 'Fri05Jul', success: 10 },
        { category: 'Sat06Jul', success: 20 },
      ]);
    });

    it('should handle missing data points by filling with zeros', () => {
      const bars = [
        {
          label: 'Success',
          data: [
            [new Date('2024-07-05T00:00:00').getTime(), 10],
            // Missing July 6th
            [new Date('2024-07-07T00:00:00').getTime(), 30],
          ] as [number, number][],
          color: 'green',
        },
      ];

      const result = formatPrometheusDataToChartData(bars, {
        type: 'time',
        timeRange: {
          startTimestamp: new Date('2024-07-05T00:00:00').getTime(),
          endTimestamp: new Date('2024-07-07T00:00:00').getTime(),
          interval: 24 * 60 * 60 * 1000, // 1 day
        },
      });

      expect(result.data).toEqual([
        { category: 'Fri05Jul', success: 10 },
        { category: 'Sat06Jul', success: 0 }, // Missing data filled with 0
        { category: 'Sun07Jul', success: 30 },
      ]);
    });

    it('should handle hourly intervals correctly', () => {
      const bars = [
        {
          label: 'Success',
          data: [
            [new Date('2024-07-05T10:00:00').getTime(), 10],
            [new Date('2024-07-05T11:00:00').getTime(), 20],
          ] as [number, number][],
          color: 'green',
        },
      ];

      const result = formatPrometheusDataToChartData(bars, {
        type: 'time',
        timeRange: {
          startTimestamp: new Date('2024-07-05T10:00:00').getTime(),
          endTimestamp: new Date('2024-07-05T11:00:00').getTime(),
          interval: 60 * 60 * 1000, // 1 hour
        },
      });

      expect(result.data).toEqual([
        { category: '10:00', success: 10 },
        { category: '11:00', success: 20 },
      ]);
    });

    it('should handle data points that fall within the same time range', () => {
      const bars = [
        {
          label: 'Success',
          data: [
            [new Date('2024-07-05T08:30:00').getTime(), 10], // 8:30 AM
            [new Date('2024-07-05T14:45:00').getTime(), 25], // 2:45 PM (should overwrite 8:30 AM)
            [new Date('2024-07-06T09:15:00').getTime(), 15], // Next day
          ] as [number, number][],
          color: 'green',
        },
      ];

      const result = formatPrometheusDataToChartData(bars, {
        type: 'time',
        timeRange: {
          startTimestamp: new Date('2024-07-05T00:00:00').getTime(),
          endTimestamp: new Date('2024-07-06T00:00:00').getTime(),
          interval: 24 * 60 * 60 * 1000, // 1 day
        },
      });

      expect(result.data).toEqual([
        { category: 'Fri05Jul', success: 25 }, // Last value for July 5th
        { category: 'Sat06Jul', success: 15 }, // July 6th value
      ]);
    });

    it('should preserve chronological order of time ranges', () => {
      const bars = [
        {
          label: 'Success',
          data: [
            // Data points added out of chronological order
            [new Date('2024-07-07T10:00:00').getTime(), 30], // July 7th (latest)
            [new Date('2024-07-05T08:00:00').getTime(), 10], // July 5th (earliest)
            [new Date('2024-07-06T14:00:00').getTime(), 20], // July 6th (middle)
          ] as [number, number][],
          color: 'green',
        },
      ];

      const result = formatPrometheusDataToChartData(bars, {
        type: 'time',
        timeRange: {
          startTimestamp: new Date('2024-07-05T00:00:00').getTime(),
          endTimestamp: new Date('2024-07-07T00:00:00').getTime(),
          interval: 24 * 60 * 60 * 1000, // 1 day
        },
      });

      // Should be in chronological order regardless of input order
      expect(result.data).toEqual([
        { category: 'Fri05Jul', success: 10 },
        { category: 'Sat06Jul', success: 20 },
        { category: 'Sun07Jul', success: 30 },
      ]);
    });

    describe('Stacked Bar Sorting', () => {
      it('should sort bars by average values in descending order when stacked is true', () => {
        const bars: BarchartProps['bars'] = [
          {
            label: 'Small Bar',
            data: [
              ['category1', 5],
              ['category2', 10],
              ['category3', 15],
            ],
            color: 'blue',
          },
          {
            label: 'Large Bar',
            data: [
              ['category1', 50],
              ['category2', 60],
              ['category3', 70],
            ],
            color: 'red',
          },
          {
            label: 'Medium Bar',
            data: [
              ['category1', 20],
              ['category2', 25],
              ['category3', 30],
            ],
            color: 'green',
          },
        ];
        const type: BarchartProps['type'] = 'category';
        const result = formatPrometheusDataToChartData(bars, type, true);

        // Bars should be sorted by average in descending order (largest first)
        expect(result.rechartsBars[0].dataKey).toBe('largebar'); // Average: 60
        expect(result.rechartsBars[1].dataKey).toBe('mediumbar'); // Average: 25
        expect(result.rechartsBars[2].dataKey).toBe('smallbar'); // Average: 10
      });

      it('should not sort bars when stacked is false or undefined', () => {
        const bars: BarchartProps['bars'] = [
          {
            label: 'Small Bar',
            data: [
              ['category1', 5],
              ['category2', 10],
            ],
            color: 'blue',
          },
          {
            label: 'Large Bar',
            data: [
              ['category1', 50],
              ['category2', 60],
            ],
            color: 'red',
          },
        ];
        const type: BarchartProps['type'] = 'category';
        const result = formatPrometheusDataToChartData(bars, type, false);

        // Bars should maintain original order
        expect(result.rechartsBars[0].dataKey).toBe('smallbar');
        expect(result.rechartsBars[1].dataKey).toBe('largebar');
      });
    });
  });
  describe('computeUnitLabelAndRoundReferenceValue', () => {
    it('should compute the unit label and round reference value correctly when reaching threshold', () => {
      const data = [
        {
          category: 'category1',
          success: 1680,
        },
      ];
      const maxValue = 1680;
      const unitRange: UnitRange = [
        {
          threshold: 1000,
          label: 'kB',
        },
      ];
      const result = computeUnitLabelAndRoundReferenceValue(
        data,
        maxValue,
        unitRange,
      );

      expect(result.unitLabel).toBe('kB');
      expect(result.roundReferenceValue).toBe(10);
      expect(result.rechartsData).toEqual([
        {
          category: 'category1',
          success: 1.68,
        },
      ]);
    });
    it('should compute the unit label and round reference value correctly when threshold is 0', () => {
      const data = [
        {
          category: 'category1',
          success: 680,
        },
      ];
      const maxValue = 680;
      const unitRange: UnitRange = [
        {
          threshold: 0,
          label: 'B',
        },
        {
          threshold: 1000,
          label: 'kB',
        },
      ];
      const result = computeUnitLabelAndRoundReferenceValue(
        data,
        maxValue,
        unitRange,
      );

      expect(result.unitLabel).toBe('B');
      expect(result.roundReferenceValue).toBe(1000);
      expect(result.rechartsData).toEqual([
        { category: 'category1', success: 680 },
      ]);
    });
  });
  describe('sortStackedBars', () => {
    const bars = [
      { dataKey: 'bar1', fill: 'blue' },
      { dataKey: 'bar2', fill: 'red' },
      { dataKey: 'bar3', fill: 'green' },
    ];
    const data = [
      { bar1: 10, bar2: 20, bar3: 30 },
      { bar1: 40, bar2: 50, bar3: 60 },
      { bar1: 70, bar2: 80, bar3: 90 },
    ];
    it('should sort bars by average values in descending order when stacked is true', () => {
      const result = sortStackedBars(bars, data, true);
      expect(result).toEqual([
        { dataKey: 'bar3', fill: 'green' },
        { dataKey: 'bar2', fill: 'red' },
        { dataKey: 'bar1', fill: 'blue' },
      ]);
    });
    it('should not sort bars when stacked is false', () => {
      const result = sortStackedBars(bars, data, false);
      expect(result).toEqual([
        { dataKey: 'bar1', fill: 'blue' },
        { dataKey: 'bar2', fill: 'red' },
        { dataKey: 'bar3', fill: 'green' },
      ]);
    });
    it('should not sort bars when stacked is undefined', () => {
      const result = sortStackedBars(bars, data, undefined);
      expect(result).toEqual([
        { dataKey: 'bar1', fill: 'blue' },
        { dataKey: 'bar2', fill: 'red' },
        { dataKey: 'bar3', fill: 'green' },
      ]);
    });
  });
});
