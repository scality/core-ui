import { formatXAxisLabel } from './LineTimeSerieChart.utils';

describe('formatXAxisLabel', () => {
  const mockTimestamp = new Date('2025-09-15T14:30:00Z').getTime();

  describe('short duration (≤ 24 hours)', () => {
    it('should format timestamp with time format', () => {
      const duration = 12 * 60 * 60; // 12 hours
      const result = formatXAxisLabel(mockTimestamp, duration);
      expect(result).toBe('14:30');
    });
  });

  describe('medium duration (≤ 7 days)', () => {
    it('should format timestamp with day-month-abbreviated-hour-minute format', () => {
      const duration = 3 * 24 * 60 * 60; // 3 days
      const result = formatXAxisLabel(mockTimestamp, duration);
      expect(result).toBe('15 Sep 14:30');
    });
  });

  describe('long duration (> 7 days)', () => {
    it('should format timestamp with day-month-abbreviated-year format', () => {
      const duration = 30 * 24 * 60 * 60; // 30 days
      const result = formatXAxisLabel(mockTimestamp, duration);
      expect(result).toBe('15Sep25');
    });
  });

  describe('edge cases', () => {
    it('should handle exactly 24 hours duration', () => {
      const duration = 24 * 60 * 60; // exactly 24 hours
      const result = formatXAxisLabel(mockTimestamp, duration);
      expect(result).toBe('14:30');
    });

    it('should handle exactly 7 days duration', () => {
      const duration = 7 * 24 * 60 * 60; // exactly 7 days
      const result = formatXAxisLabel(mockTimestamp, duration);
      expect(result).toBe('15 Sep 14:30');
    });

    it('should handle just over 7 days duration', () => {
      const duration = 8 * 24 * 60 * 60; // 8 days
      const result = formatXAxisLabel(mockTimestamp, duration);
      expect(result).toBe('15Sep25');
    });
  });
});
