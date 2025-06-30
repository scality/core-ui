import {
  getMaxValueByType,
  getMaxValueFromPreCalculatedSums,
  getRoundReferenceValue,
  sumDataValues,
  KeysByType,
} from './utils';

describe('StackedBarChart Utils', () => {
  describe('sumDataValues', () => {
    const keysByType: KeysByType = {
      read: ['value1', 'value2'],
      write: ['value3', 'value4'],
    };

    it('calculates sum for all values when no filters applied', () => {
      const item = { date: 'Mon', value1: 30, value2: 20 };
      const result = sumDataValues(item, keysByType);
      expect(result).toBe(50);
    });

    it('calculates sum for specific type when typeToDisplay is provided', () => {
      const item = {
        date: 'Mon',
        value1: 30,
        value2: 20,
        value3: 10,
        value4: 15,
      };
      const result = sumDataValues(item, keysByType, 'write');
      expect(result).toBe(25); // value3 + value4
    });

    it('calculates sum for specific legend when selectedLegend is provided', () => {
      const item = { date: 'Mon', value1: 30, value2: 20 };
      const result = sumDataValues(item, keysByType, undefined, 'value1');
      expect(result).toBe(30);
    });

    it('returns 0 for invalid item', () => {
      const result = sumDataValues(null as any, keysByType);
      expect(result).toBe(0);
    });

    it('handles missing values gracefully', () => {
      const item = { date: 'Mon', value1: 30 };
      const result = sumDataValues(item, keysByType);
      expect(result).toBe(30); // value2 is missing, so only value1 is counted
    });

    it('handles string values by converting to numbers', () => {
      const item = { date: 'Mon', value1: '30', value2: '20' };
      const result = sumDataValues(item, keysByType);
      expect(result).toBe(50);
    });

    it('ignores non-numeric string values', () => {
      const item = { date: 'Mon', value1: '30', value2: 'invalid' };
      const result = sumDataValues(item, keysByType);
      expect(result).toBe(30);
    });
  });

  describe('getMaxValueByType', () => {
    const keysByType: KeysByType = {
      read: ['value1', 'value2'],
      write: ['value3', 'value4'],
    };

    const data = [
      { date: 'Mon', value1: 30, value2: 20 },
      { date: 'Tue', value1: 45, value2: 25 },
      { date: 'Wed', value1: 35, value2: 30 },
    ];

    it('finds maximum sum across all data points', () => {
      const result = getMaxValueByType(data, keysByType);
      expect(result).toBe(70); // Tue: 45 + 25 = 70
    });

    it('finds maximum sum for specific type', () => {
      const dataWithTypes = [
        { date: 'Mon', value1: 30, value2: 20, value3: 10, value4: 15 },
        { date: 'Tue', value1: 45, value2: 25, value3: 20, value4: 30 },
      ];
      const result = getMaxValueByType(dataWithTypes, keysByType, 'write');
      expect(result).toBe(50); // Tue: 20 + 30 = 50
    });

    it('finds maximum sum for specific legend', () => {
      const result = getMaxValueByType(data, keysByType, undefined, 'value1');
      expect(result).toBe(45); // Tue: 45
    });

    it('returns 0 for empty data array', () => {
      const result = getMaxValueByType([], keysByType);
      expect(result).toBe(0);
    });

    it('handles invalid data gracefully', () => {
      const invalidData = [null, undefined, { invalid: 'data' }] as any;
      const result = getMaxValueByType(invalidData, keysByType);
      expect(result).toBe(0);
    });
  });

  describe('getMaxValueFromPreCalculatedSums', () => {
    it('finds maximum from pre-calculated sums', () => {
      const dataWithSums = [
        { date: 'Mon', value1: 30, value2: 20, _sum: 50 },
        { date: 'Tue', value1: 45, value2: 25, _sum: 70 },
        { date: 'Wed', value1: 35, value2: 30, _sum: 65 },
      ];
      const result = getMaxValueFromPreCalculatedSums(dataWithSums);
      expect(result).toBe(70);
    });

    it('returns 0 for empty array', () => {
      const result = getMaxValueFromPreCalculatedSums([]);
      expect(result).toBe(0);
    });

    it('handles single item', () => {
      const dataWithSums = [{ date: 'Mon', value1: 30, _sum: 30 }];
      const result = getMaxValueFromPreCalculatedSums(dataWithSums);
      expect(result).toBe(30);
    });
  });

  describe('getRoundReferenceValue', () => {
    it('returns 10 for zero or negative values', () => {
      expect(getRoundReferenceValue(0)).toBe(10);
      expect(getRoundReferenceValue(-5)).toBe(10);
    });

    it('rounds small values appropriately', () => {
      expect(getRoundReferenceValue(1)).toBe(1);
      expect(getRoundReferenceValue(2)).toBe(2.5);
      expect(getRoundReferenceValue(4)).toBe(5);
      expect(getRoundReferenceValue(7)).toBe(10);
    });

    it('rounds medium values appropriately', () => {
      expect(getRoundReferenceValue(10)).toBe(10);
      expect(getRoundReferenceValue(25)).toBe(25);
      expect(getRoundReferenceValue(40)).toBe(50);
      expect(getRoundReferenceValue(70)).toBe(100);
    });

    it('rounds large values appropriately', () => {
      expect(getRoundReferenceValue(100)).toBe(100);
      expect(getRoundReferenceValue(250)).toBe(250);
      expect(getRoundReferenceValue(400)).toBe(500);
      expect(getRoundReferenceValue(700)).toBe(1000);
    });

    it('handles very large numbers', () => {
      expect(getRoundReferenceValue(1000000)).toBe(1000000);
      expect(getRoundReferenceValue(2500000)).toBe(2500000);
      expect(getRoundReferenceValue(4000000)).toBe(5000000);
    });

    it('handles decimal values', () => {
      expect(getRoundReferenceValue(1.5)).toBe(2.5);
      expect(getRoundReferenceValue(3.7)).toBe(5);
      expect(getRoundReferenceValue(6.2)).toBe(10);
    });
  });
});
