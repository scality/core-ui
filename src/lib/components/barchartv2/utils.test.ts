import {
  computeUnitLabelAndRoundReferenceValue,
  formatPrometheusDataToChartData,
  getMaxBarValue,
  getRoundReferenceValue,
  renderTooltipContent,
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
        { category: 'category1', Success: 10, Failed: 5 },
        { category: 'category2', Success: 20, Failed: 15 },
      ]);
      expect(result.rechartsBars).toEqual([
        { dataKey: 'Success', fill: 'green' },
        { dataKey: 'Failed', fill: 'red' },
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
        { category: 'Fri05Jul', Success: 10 },
        { category: 'Sat06Jul', Success: 20 },
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
        { category: 'Fri05Jul', Success: 10 },
        { category: 'Sat06Jul', Success: 0 }, // Missing data filled with 0
        { category: 'Sun07Jul', Success: 30 },
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
        { category: '10:00', Success: 10 },
        { category: '11:00', Success: 20 },
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
        { category: 'Fri05Jul', Success: 25 }, // Last value for July 5th
        { category: 'Sat06Jul', Success: 15 }, // July 6th value
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
        { category: 'Fri05Jul', Success: 10 },
        { category: 'Sat06Jul', Success: 20 },
        { category: 'Sun07Jul', Success: 30 },
      ]);
    });
  });
  describe('Stacked Bar Sorting', () => {
    const bars = [
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
    ] as const;
    const type = 'category';
    it('should sort bars by average values in descending order when stacked is true', () => {
      const result = formatPrometheusDataToChartData(bars, type, true);

      // Bars should be sorted by average in descending order (largest first)
      expect(result.rechartsBars[0].dataKey).toBe('Large Bar'); // Average: 60
      expect(result.rechartsBars[1].dataKey).toBe('Medium Bar'); // Average: 25
      expect(result.rechartsBars[2].dataKey).toBe('Small Bar'); // Average: 10
    });

    it('should not sort bars when stacked is false or undefined', () => {
      const result = formatPrometheusDataToChartData(bars, type, false);

      // Bars should maintain original order
      expect(result.rechartsBars[0].dataKey).toBe('Small Bar');
      expect(result.rechartsBars[1].dataKey).toBe('Large Bar');
      expect(result.rechartsBars[2].dataKey).toBe('Medium Bar');
    });
  });

  it('should call defaultSort when provided', () => {
    const bars = [
      {
        label: 'Success',
        data: [
          ['category1', 50],
          ['category2', 20],
          ['category3', 30],
          ['category4', 40],
        ],
        color: 'green',
      },
    ] as const;
    const type = 'category';
    const result = formatPrometheusDataToChartData(
      bars,
      type,
      false,
      (pointA, pointB) => {
        return pointA.Success - pointB.Success > 0 ? 1 : -1;
      },
    );
    const data = result.data;

    expect(data[0].category).toBe('category2');
    expect(data[1].category).toBe('category3');
    expect(data[2].category).toBe('category4');
    expect(data[3].category).toBe('category1');
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
