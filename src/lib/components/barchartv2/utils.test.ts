import { coreUIAvailableThemes } from '../../style/theme';
import {
  applySortingToData,
  computeUnitLabelAndRoundReferenceValue,
  filterChartDataAndBarsByLegendSelection,
  formatPrometheusDataToRechartsDataAndBars,
  getMaxBarValue,
  getRoundReferenceValue,
  renderTooltipContent,
  sortStackedBars,
  transformCategoryData,
  transformTimeData,
  UnitRange,
} from './utils';

// Test date constants to avoid repetition
const TEST_DATES = {
  JULY_5_2024: new Date('2024-07-05T00:00:00'),
  JULY_6_2024: new Date('2024-07-06T00:00:00'),
  JULY_7_2024: new Date('2024-07-07T00:00:00'),
  JULY_5_10AM: new Date('2024-07-05T10:00:00'),
  JULY_5_11AM: new Date('2024-07-05T11:00:00'),
  JULY_5_8_30AM: new Date('2024-07-05T08:30:00'),
  JULY_5_2_45PM: new Date('2024-07-05T14:45:00'),
  JULY_6_9_15AM: new Date('2024-07-06T09:15:00'),
  JULY_5_8AM: new Date('2024-07-05T08:00:00'),
  JULY_6_2PM: new Date('2024-07-06T14:00:00'),
  JULY_7_10AM: new Date('2024-07-07T10:00:00'),
} as const;

// Mock theme object for tests
const mockTheme = {
  statusHealthy: '#00D100',
  statusHealthyRGB: '0, 209, 0',
  statusCritical: '#D10000',
  statusCriticalRGB: '209, 0, 0',
  statusWarning: '#FFA500',
  statusWarningRGB: '255, 165, 0',
  selectedActive: '#337FBD',
  highlight: '#337FBD',
  border: '#C2C8CC',
  buttonPrimary: '#337FBD',
  buttonSecondary: '#68737D',
  buttonDelete: '#EF3340',
  infoPrimary: '#337FBD',
  infoSecondary: '#68737D',
  backgroundLevel1: '#ffffff',
  backgroundLevel2: '#F9FAFB',
  backgroundLevel3: '#E9EBED',
  backgroundLevel4: '#D8DCDE',
  textPrimary: '#2F3941',
  textSecondary: '#68737D',
  textTertiary: '#87929D',
  textReverse: '#ffffff',
  textLink: '#337FBD',
} as const;

describe('transformTimeData', () => {
  it('should transform time data with daily intervals', () => {
    const bars = [
      {
        label: 'Success',
        data: [
          [TEST_DATES.JULY_5_2024, 10],
          [TEST_DATES.JULY_6_2024, 20],
        ] as [Date, number][],
      },
    ];

    const type = {
      type: 'time' as const,
      timeRange: {
        startDate: TEST_DATES.JULY_5_2024,
        endDate: TEST_DATES.JULY_6_2024,
        interval: 24 * 60 * 60 * 1000, // 1 day
      },
    };

    const barDataKeys = ['Success'];

    const result = transformTimeData(bars, type, barDataKeys);

    expect(result).toEqual([
      { category: TEST_DATES.JULY_5_2024.valueOf(), Success: 10 },
      { category: TEST_DATES.JULY_6_2024.valueOf(), Success: 20 },
    ]);
  });

  it('should create empty time slots when data is missing', () => {
    const bars = [
      {
        label: 'Success',
        data: [
          [TEST_DATES.JULY_5_2024, 10],
          // Missing July 6th
          [TEST_DATES.JULY_7_2024, 30],
        ] as [Date, number][],
      },
    ];

    const type = {
      type: 'time' as const,
      timeRange: {
        startDate: TEST_DATES.JULY_5_2024,
        endDate: TEST_DATES.JULY_7_2024,
        interval: 24 * 60 * 60 * 1000, // 1 day
      },
    };

    const barDataKeys = ['Success'];

    const result = transformTimeData(bars, type, barDataKeys);

    expect(result).toEqual([
      { category: TEST_DATES.JULY_5_2024.valueOf(), Success: 10 },
      { category: TEST_DATES.JULY_6_2024.valueOf(), Success: 0 }, // Missing data filled with 0
      { category: TEST_DATES.JULY_7_2024.valueOf(), Success: 30 },
    ]);
  });

  it('should handle hourly intervals correctly', () => {
    const bars = [
      {
        label: 'Success',
        data: [
          [TEST_DATES.JULY_5_10AM, 10],
          [TEST_DATES.JULY_5_11AM, 20],
        ] as [Date, number][],
      },
    ];

    const type = {
      type: 'time' as const,
      timeRange: {
        startDate: TEST_DATES.JULY_5_10AM,
        endDate: TEST_DATES.JULY_5_11AM,
        interval: 60 * 60 * 1000, // 1 hour
      },
    };

    const barDataKeys = ['Success'];

    const result = transformTimeData(bars, type, barDataKeys);

    expect(result).toEqual([
      { category: TEST_DATES.JULY_5_10AM.valueOf(), Success: 10 },
      { category: TEST_DATES.JULY_5_11AM.valueOf(), Success: 20 },
    ]);
  });

  it('should use latest value when multiple events occur in same time period', () => {
    const bars = [
      {
        label: 'Success',
        data: [
          [TEST_DATES.JULY_5_8_30AM, 10], // 8:30 AM
          [TEST_DATES.JULY_5_2_45PM, 25], // 2:45 PM (should overwrite 8:30 AM)
          [TEST_DATES.JULY_6_9_15AM, 15], // Next day
        ] as [Date, number][],
      },
    ];

    const type = {
      type: 'time' as const,
      timeRange: {
        startDate: TEST_DATES.JULY_5_2024,
        endDate: TEST_DATES.JULY_6_2024,
        interval: 24 * 60 * 60 * 1000, // 1 day
      },
    };

    const barDataKeys = ['Success'];

    const result = transformTimeData(bars, type, barDataKeys);

    expect(result).toEqual([
      { category: TEST_DATES.JULY_5_2024.valueOf(), Success: 25 }, // Last value for July 5th
      { category: TEST_DATES.JULY_6_2024.valueOf(), Success: 15 }, // July 6th value
    ]);
  });

  it('should preserve chronological order regardless of input order', () => {
    const bars = [
      {
        label: 'Success',
        data: [
          [TEST_DATES.JULY_7_10AM, 30], // July 7th (latest)
          [TEST_DATES.JULY_5_8AM, 10], // July 5th (earliest)
          [TEST_DATES.JULY_6_2PM, 20], // July 6th (middle)
        ] as [Date, number][],
      },
    ];

    const type = {
      type: 'time' as const,
      timeRange: {
        startDate: TEST_DATES.JULY_5_2024,
        endDate: TEST_DATES.JULY_7_2024,
        interval: 24 * 60 * 60 * 1000, // 1 day
      },
    };

    const barDataKeys = ['Success'];

    const result = transformTimeData(bars, type, barDataKeys);

    // Should be in chronological order regardless of input order
    expect(result).toEqual([
      { category: TEST_DATES.JULY_5_2024.valueOf(), Success: 10 },
      { category: TEST_DATES.JULY_6_2024.valueOf(), Success: 20 },
      { category: TEST_DATES.JULY_7_2024.valueOf(), Success: 30 },
    ]);
  });

  it('should display multiple metrics with different time coverage', () => {
    const bars = [
      {
        label: 'Success',
        data: [[TEST_DATES.JULY_5_2024, 10]] as [Date, number][],
      },
      {
        label: 'Failed',
        data: [[TEST_DATES.JULY_6_2024, 5]] as [Date, number][],
      },
    ];

    const type = {
      type: 'time' as const,
      timeRange: {
        startDate: TEST_DATES.JULY_5_2024,
        endDate: TEST_DATES.JULY_6_2024,
        interval: 24 * 60 * 60 * 1000, // 1 day
      },
    };

    const barDataKeys = ['Success', 'Failed'];

    const result = transformTimeData(bars, type, barDataKeys);

    expect(result).toEqual([
      {
        category: TEST_DATES.JULY_5_2024.valueOf(),
        Success: 10,
        Failed: 0,
      },
      {
        category: TEST_DATES.JULY_6_2024.valueOf(),
        Success: 0,
        Failed: 5,
      },
    ]);
  });
});

describe('transformCategoryData', () => {
  it('should transform basic category data correctly', () => {
    const bars = [
      {
        label: 'Success',
        data: [
          ['category1', 10],
          ['category2', 20],
        ] as [string, number][],
      },
      {
        label: 'Failed',
        data: [
          ['category1', 5],
          ['category2', 15],
        ] as [string, number][],
      },
    ];

    const barDataKeys = ['Success', 'Failed'];

    const result = transformCategoryData(bars, barDataKeys);

    expect(result).toEqual([
      { category: 'category1', Success: 10, Failed: 5 },
      { category: 'category2', Success: 20, Failed: 15 },
    ]);
  });

  it('should show zero for categories missing in specific metrics', () => {
    const bars = [
      {
        label: 'Success',
        data: [
          ['category1', 10],
          ['category3', 30],
        ] as [string, number][],
      },
      {
        label: 'Failed',
        data: [
          ['category2', 20],
          ['category3', 40],
        ] as [string, number][],
      },
    ];

    const barDataKeys = ['Success', 'Failed'];

    const result = transformCategoryData(bars, barDataKeys);

    expect(result).toEqual([
      { category: 'category1', Success: 10, Failed: 0 }, // Failed missing, filled with 0
      { category: 'category3', Success: 30, Failed: 40 }, // Appears in both bars
      { category: 'category2', Success: 0, Failed: 20 }, // Success missing, filled with 0
    ]);
  });

  it('should handle single bar data', () => {
    const bars = [
      {
        label: 'Metric',
        data: [
          ['A', 100],
          ['B', 200],
          ['C', 300],
        ] as [string, number][],
      },
    ];

    const barDataKeys = ['Metric'];

    const result = transformCategoryData(bars, barDataKeys);

    expect(result).toEqual([
      { category: 'A', Metric: 100 },
      { category: 'B', Metric: 200 },
      { category: 'C', Metric: 300 },
    ]);
  });

  it('should convert category keys to strings', () => {
    const bars = [
      {
        label: 'Count',
        data: [
          [123, 10], // Number key
          ['text', 20], // String key
          [null, 30], // Null key
        ] as [any, number][],
      },
    ];

    const barDataKeys = ['Count'];

    const result = transformCategoryData(bars, barDataKeys);

    expect(result).toEqual([
      { category: '123', Count: 10 },
      { category: 'text', Count: 20 },
      { category: 'null', Count: 30 },
    ]);
  });

  it('should handle empty data gracefully', () => {
    const bars = [
      {
        label: 'Empty',
        data: [] as [string, number][],
      },
    ];

    const barDataKeys = ['Empty'];

    const result = transformCategoryData(bars, barDataKeys);

    expect(result).toEqual([]);
  });
});

describe('applySortingToData', () => {
  it('should apply custom sorting function to data', () => {
    const data = [
      { category: 'category1', Success: 50 },
      { category: 'category2', Success: 20 },
      { category: 'category3', Success: 30 },
      { category: 'category4', Success: 40 },
    ];

    const barDataKeys = ['Success'];

    // Sort by Success value ascending
    const defaultSort = (pointA: any, pointB: any) => {
      return pointA.Success - pointB.Success > 0 ? 1 : -1;
    };

    const result = applySortingToData(data, barDataKeys, defaultSort);

    expect(result).toEqual([
      { category: 'category2', Success: 20 },
      { category: 'category3', Success: 30 },
      { category: 'category4', Success: 40 },
      { category: 'category1', Success: 50 },
    ]);
  });

  it('should sort categories based on combined metric values', () => {
    const data = [
      { category: 'A', Bar1: 10, Bar2: 50 },
      { category: 'B', Bar1: 30, Bar2: 20 },
      { category: 'C', Bar1: 20, Bar2: 40 },
    ];

    const barDataKeys = ['Bar1', 'Bar2'];

    // Sort by sum of Bar1 and Bar2
    const defaultSort = (pointA: any, pointB: any) => {
      const sumA = pointA.Bar1 + pointA.Bar2;
      const sumB = pointB.Bar1 + pointB.Bar2;
      return sumA < sumB ? -1 : sumA > sumB ? 1 : 0;
    };

    const result = applySortingToData(data, barDataKeys, defaultSort);

    expect(result).toEqual([
      { category: 'B', Bar1: 30, Bar2: 20 }, // Sum: 50
      { category: 'A', Bar1: 10, Bar2: 50 }, // Sum: 60
      { category: 'C', Bar1: 20, Bar2: 40 }, // Sum: 60
    ]);
  });

  it('should sort text numbers as numeric values', () => {
    const data = [
      { category: 'A', Value: '100' },
      { category: 'B', Value: '50' },
      { category: 'C', Value: '75' },
    ];

    const barDataKeys = ['Value'];

    // Sort by numeric value descending
    const defaultSort = (pointA: any, pointB: any) => {
      return pointB.Value > pointA.Value
        ? 1
        : pointB.Value < pointA.Value
          ? -1
          : 0;
    };

    const result = applySortingToData(data, barDataKeys, defaultSort);

    expect(result).toEqual([
      { category: 'A', Value: 100 }, // Converted to number and sorted
      { category: 'C', Value: 75 },
      { category: 'B', Value: 50 },
    ]);
  });

  it('should treat invalid data as zero when sorting', () => {
    const data = [
      { category: 'A', Value: 30 },
      { category: 'B', Value: 0 }, // Test with 0 value
      { category: 'C', Value: 'NaN' }, // String that will become NaN
      { category: 'D', Value: 10 },
    ];

    const barDataKeys = ['Value'];

    // Sort by value ascending
    const defaultSort = (pointA: any, pointB: any) => {
      return pointA.Value < pointB.Value
        ? -1
        : pointA.Value > pointB.Value
          ? 1
          : 0;
    };

    const result = applySortingToData(data, barDataKeys, defaultSort);

    expect(result).toEqual([
      { category: 'B', Value: 0 }, // 0 value
      { category: 'C', Value: 0 }, // 'NaN' converted to 0 (NaN becomes 0)
      { category: 'D', Value: 10 },
      { category: 'A', Value: 30 },
    ]);
  });

  it('should preserve category data during sorting', () => {
    const data = [
      { category: 'Category Z', Metric: 1 },
      { category: 'Category A', Metric: 3 },
      { category: 'Category M', Metric: 2 },
    ];

    const barDataKeys = ['Metric'];

    // Sort by category name alphabetically
    const defaultSort = (pointA: any, pointB: any) => {
      return pointA.category.localeCompare(pointB.category);
    };

    const result = applySortingToData(data, barDataKeys, defaultSort);

    expect(result).toEqual([
      { category: 'Category A', Metric: 3 },
      { category: 'Category M', Metric: 2 },
      { category: 'Category Z', Metric: 1 },
    ]);
  });
});

describe('getRoundReferenceValue', () => {
  it('should return appropriate rounded values', () => {
    expect(getRoundReferenceValue(1)).toBe(5);
    expect(getRoundReferenceValue(2)).toBe(5);
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

describe('formatPrometheusDataToRechartsDataAndBars', () => {
  it('should format category data correctly', () => {
    const bars = [
      {
        label: 'Success',
        data: [
          ['A', 10],
          ['B', 20],
        ] as [string, number][],
        color: 'green',
      },
      {
        label: 'Failed',
        data: [
          ['A', 5],
          ['B', 15],
        ] as [string, number][],
        color: 'red',
      },
    ];

    const result = formatPrometheusDataToRechartsDataAndBars(
      bars,
      { type: 'category' },
      {
        Success: coreUIAvailableThemes.darkRebrand.statusHealthy,
        Failed: coreUIAvailableThemes.darkRebrand.statusCritical,
      },
      true, // stacked
    );

    // Should integrate: data transformation + color formatting + stacked sorting
    expect(result.data).toEqual([
      { category: 'A', Success: 10, Failed: 5 },
      { category: 'B', Success: 20, Failed: 15 },
    ]);
    expect(result.rechartsBars).toEqual([
      { dataKey: 'Success', fill: '#0AADA6', stackId: 'stacked' }, // statusHealthy = '#0AADA6'
      { dataKey: 'Failed', fill: '#E84855', stackId: 'stacked' }, // statusCritical = '#E84855'
    ]);
  });

  it('should format time data correctly', () => {
    const bars = [
      {
        label: 'Success Count',
        data: [[TEST_DATES.JULY_5_2024, 10]] as [Date, number][],
      },
      {
        label: 'Failed Count',
        data: [[TEST_DATES.JULY_5_2024, 5]] as [Date, number][],
      },
    ];

    const result = formatPrometheusDataToRechartsDataAndBars(
      bars,
      {
        type: 'time',
        timeRange: {
          startDate: TEST_DATES.JULY_5_2024,
          endDate: TEST_DATES.JULY_5_2024,
          interval: 24 * 60 * 60 * 1000,
        },
      },
      {
        'Success Count': 'lineColor3',
        'Failed Count': 'blue',
      },
      false,
      undefined,
    );

    // Should integrate: time transformation + status color assignment
    expect(result.data).toEqual([
      {
        category: TEST_DATES.JULY_5_2024.valueOf(),
        'Success Count': 10,
        'Failed Count': 5,
      },
    ]);
    expect(result.rechartsBars).toEqual([
      { dataKey: 'Success Count', fill: '#4BE4E2' }, // lineColor3
      { dataKey: 'Failed Count', fill: 'blue' }, // blue
    ]);
  });

  it('should integrate custom sorting with category data', () => {
    const bars = [
      {
        label: 'Value',
        data: [
          ['C', 30],
          ['A', 10],
          ['B', 20],
        ] as [string, number][],
      },
    ];

    const result = formatPrometheusDataToRechartsDataAndBars(
      bars,
      { type: 'category' },
      mockTheme,
      false,
      (pointA, pointB) => {
        // Sort alphabetically by category
        return String(pointA.category).localeCompare(
          String(pointB.category),
        ) as -1 | 0 | 1;
      },
    );

    // Should integrate: category transformation + custom sorting
    expect(result.data.map((item) => item.category)).toEqual(['A', 'B', 'C']);
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
  it('should sort bars by legend order when stacked is true and legendOrder is provided', () => {
    const result = sortStackedBars(bars, data, true, ['bar3', 'bar2', 'bar1']);
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

describe('renderTooltipContent', () => {
  it('should return null when active is false', () => {
    const props = {
      active: false,
      payload: [],
      label: 'test',
      coordinate: { x: 0, y: 0 },
      accessibilityLayer: false,
    };
    const result = renderTooltipContent(props, undefined, undefined);
    expect(result).toBeNull();
  });

  it('should return null when tooltip is undefined', () => {
    const props = {
      active: true,
      payload: [{ name: 'test', value: 10 }],
      label: 'test',
      coordinate: { x: 0, y: 0 },
      accessibilityLayer: false,
    };
    const result = renderTooltipContent(props, undefined, 'test');
    expect(result).toBeNull();
  });
  it('should call tooltip with the correct props', () => {
    const tooltip = jest.fn();
    const props = {
      active: true,
      payload: [
        { name: 'Success', value: 10 },
        { name: 'Failed', value: 20 },
      ],
      label: 'Test',
      coordinate: { x: 0, y: 0 },
      accessibilityLayer: false,
    };
    renderTooltipContent(props, tooltip, 'Success');
    expect(tooltip).toHaveBeenCalledWith({
      category: 'Test',
      values: [
        { label: 'Success', value: 10, isHovered: true },
        { label: 'Failed', value: 20, isHovered: false },
      ],
    });
  });
});

describe('filterChartDataAndBarsByLegendSelection', () => {
  const mockChartData = [
    { category: 'Jan', Success: 10, Failed: 5, Warning: 3, Pending: 2 },
    { category: 'Feb', Success: 20, Failed: 8, Warning: 6, Pending: 4 },
    { category: 'Mar', Success: 15, Failed: 12, Warning: 9, Pending: 7 },
  ];

  const mockRechartsBars = [
    { dataKey: 'Success', fill: '#00D100', stackId: undefined },
    { dataKey: 'Failed', fill: '#D10000', stackId: undefined },
    { dataKey: 'Warning', fill: '#FFA500', stackId: 'stacked' },
    { dataKey: 'Pending', fill: '#337FBD', stackId: 'stacked' },
  ];

  it('should return all data and bars when no resources are selected (empty array)', () => {
    const result = filterChartDataAndBarsByLegendSelection(
      mockChartData,
      mockRechartsBars,
      [],
    );

    expect(result.filteredData).toEqual(mockChartData);
    expect(result.filteredRechartsBars).toEqual(mockRechartsBars);
    expect(result.filteredData).toHaveLength(3);
    expect(result.filteredRechartsBars).toHaveLength(4);
    // Verify all properties are preserved
    expect(Object.keys(result.filteredData[0])).toEqual([
      'category',
      'Success',
      'Failed',
      'Warning',
      'Pending',
    ]);
  });

  it('should return only selected resources in both data and bars when resources are selected', () => {
    const selectedResources = ['Success', 'Warning'];
    const result = filterChartDataAndBarsByLegendSelection(
      mockChartData,
      mockRechartsBars,
      selectedResources,
    );

    expect(result.filteredData).toHaveLength(3);
    expect(result.filteredData).toEqual([
      { category: 'Jan', Success: 10, Warning: 3 },
      { category: 'Feb', Success: 20, Warning: 6 },
      { category: 'Mar', Success: 15, Warning: 9 },
    ]);

    expect(result.filteredRechartsBars).toHaveLength(2);
    expect(result.filteredRechartsBars).toEqual([
      { dataKey: 'Success', fill: '#00D100', stackId: undefined },
      { dataKey: 'Warning', fill: '#FFA500', stackId: 'stacked' },
    ]);
  });

  it('should return single resource when only one resource is selected', () => {
    const selectedResources = ['Failed'];
    const result = filterChartDataAndBarsByLegendSelection(
      mockChartData,
      mockRechartsBars,
      selectedResources,
    );

    expect(result.filteredData).toHaveLength(3);
    expect(result.filteredData).toEqual([
      { category: 'Jan', Failed: 5 },
      { category: 'Feb', Failed: 8 },
      { category: 'Mar', Failed: 12 },
    ]);

    expect(result.filteredRechartsBars).toHaveLength(1);
    expect(result.filteredRechartsBars).toEqual([
      { dataKey: 'Failed', fill: '#D10000', stackId: undefined },
    ]);
  });

  it('should handle empty data array', () => {
    const result = filterChartDataAndBarsByLegendSelection(
      [],
      mockRechartsBars,
      ['Success'],
    );

    expect(result.filteredData).toEqual([]);
    expect(result.filteredRechartsBars).toHaveLength(1);
    expect(result.filteredRechartsBars).toEqual([
      { dataKey: 'Success', fill: '#00D100', stackId: undefined },
    ]);
  });

  it('should preserve order of selected resources based on data object keys', () => {
    const selectedResources = ['Pending', 'Success', 'Failed']; // Different order
    const result = filterChartDataAndBarsByLegendSelection(
      mockChartData,
      mockRechartsBars,
      selectedResources,
    );

    // Should maintain the order they appear in selectedResources
    expect(Object.keys(result.filteredData[0])).toEqual([
      'category',
      'Pending',
      'Success',
      'Failed',
    ]);

    // Should maintain original bar order regardless of selection order
    expect(result.filteredRechartsBars).toHaveLength(3);
    expect(result.filteredRechartsBars[0].dataKey).toBe('Success');
    expect(result.filteredRechartsBars[1].dataKey).toBe('Failed');
    expect(result.filteredRechartsBars[2].dataKey).toBe('Pending');
  });
});
