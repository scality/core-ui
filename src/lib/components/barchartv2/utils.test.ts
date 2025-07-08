import {
  formatPrometheusDataToChartData,
  getMaxValue,
  getRoundReferenceValue,
} from './utils';
import { BarchartProps } from './Barchart.component';

describe('Barchart Utils', () => {
  describe('getMaxValue', () => {
    it('should compute the max value correctly', () => {
      const data = [
        {
          category: 'category1',
          success: 23,
          failed: 2,
        },
        {
          category: 'category2',
          success: 19,
          failed: 3,
        },
      ];
      const result = getMaxValue(data);
      expect(result).toBe(23);
    });
  });

  describe('getRoundReferenceValue', () => {
    it('should compute the reference line correctly', () => {
      const maxValue1 = 23;
      const roundReferenceValue1 = getRoundReferenceValue(maxValue1);
      expect(roundReferenceValue1).toBe(25);

      const maxValue2 = 2300;
      const roundReferenceValue2 = getRoundReferenceValue(maxValue2);
      expect(roundReferenceValue2).toBe(2500);

      const maxValue3 = 900;
      const roundReferenceValue3 = getRoundReferenceValue(maxValue3);
      expect(roundReferenceValue3).toBe(1000);

      const maxValue4 = 67;
      const roundReferenceValue4 = getRoundReferenceValue(maxValue4);
      expect(roundReferenceValue4).toBe(100);
    });
  });

  describe('formatPrometheusDataToChartData', () => {
    describe('Category Data Transformation', () => {
      it('should transform category data correctly', () => {
        const bars: BarchartProps['bars'] = [
          {
            label: 'Success',
            data: [
              ['category1', 10],
              ['category2', 20],
              ['category3', 30],
            ],
            color: 'green',
          },
        ];
        const type: BarchartProps['type'] = 'category';
        const result = formatPrometheusDataToChartData(bars, type);
        expect(result.data).toHaveLength(3);
        expect(result.data[0].category).toBe('category1');
        expect(result.data[0].success).toBe(10);
        expect(result.data[1].category).toBe('category2');
        expect(result.data[1].success).toBe(20);
        expect(result.data[2].category).toBe('category3');
        expect(result.data[2].success).toBe(30);
      });

      it('should handle empty category data', () => {
        const bars: BarchartProps['bars'] = [
          {
            label: 'Success',
            data: [],
            color: 'green',
          },
        ];
        const type: BarchartProps['type'] = 'category';
        const result = formatPrometheusDataToChartData(bars, type);
        expect(result.data).toHaveLength(0);
      });
    });

    describe('Time Data Transformation', () => {
      it('should correctly transform time data', () => {
        const bars = [
          {
            label: 'Success',
            data: [[new Date('2024-07-05').getTime(), 10]] as [
              number,
              number,
            ][],
            color: 'green',
          },
        ];

        const type = {
          type: 'time' as const,
          timeRange: {
            startTimestamp: new Date('2024-07-05').getTime(),
            endTimestamp: new Date('2024-07-05').getTime(),
          },
        };

        const result = formatPrometheusDataToChartData(bars, type);

        expect(result.data).toHaveLength(1);
        expect(result.data[0].category).toBe('Fri05Jul');
        expect(result.data[0].success).toBe(10);
      });

      it('should fill missing days with zeros', () => {
        const bars = [
          {
            label: 'Success',
            data: [] as [number, number][],
            color: 'green',
          },
        ];

        const type = {
          type: 'time' as const,
          timeRange: {
            startTimestamp: new Date('2024-07-05').getTime(),
            endTimestamp: new Date('2024-07-07').getTime(),
          },
        };

        const result = formatPrometheusDataToChartData(bars, type);

        // Should have 3 days with all zeros
        expect(result.data).toHaveLength(3);
        result.data.forEach((item) => {
          expect(item.success).toBe(0);
        });
      });
    });
  });
});
