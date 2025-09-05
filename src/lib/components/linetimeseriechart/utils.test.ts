import { formatXAxisLabel } from './utils';

const createChartData = (startDate: Date, endDate: Date) => [
  { timestamp: startDate.getTime() },
  { timestamp: endDate.getTime() },
];

describe('formatXAxisLabel', () => {
  const mockTimestamp = new Date('2025-09-15T14:30:00Z').getTime();

  describe('date-time format', () => {
    it('should format timestamp with day-month-abbreviated-hour-minute format', () => {
      const chartData = createChartData(
        new Date('2022-01-01'),
        new Date('2022-01-02'),
      );
      const result = formatXAxisLabel(mockTimestamp, 'date-time', chartData);
      expect(result).toBe('15 Sept 14:30');
    });
  });

  describe('date format', () => {
    it('should use YYYY-MM-DD format for time ranges greater than 1 year', () => {
      const startDate = new Date('2022-01-01');
      const endDate = new Date('2024-01-01'); // More than 1 year
      const chartData = createChartData(startDate, endDate);

      const result = formatXAxisLabel(mockTimestamp, 'date', chartData);
      expect(result).toBe('2025-09-15');
    });

    it('should use MM-DD format for time ranges less than 1 year', () => {
      const startDate = new Date('2023-09-01');
      const endDate = new Date('2023-12-01'); // Less than 1 year
      const chartData = createChartData(startDate, endDate);

      const result = formatXAxisLabel(mockTimestamp, 'date', chartData);
      expect(result).toBe('09-15');
    });

    it('should use YYYY-MM-DD format when chartData is empty', () => {
      const result = formatXAxisLabel(mockTimestamp, 'date', []);
      expect(result).toBe('2025-09-15');
    });

    it('should handle edge case of exactly 1 year time range', () => {
      const startDate = new Date('2022-09-15');
      const endDate = new Date('2023-09-15'); // Exactly 1 year
      const chartData = createChartData(startDate, endDate);

      const result = formatXAxisLabel(mockTimestamp, 'date', chartData);
      expect(result).toBe('09-15');
    });

    it('should handle leap year calculation correctly', () => {
      const startDate = new Date('2023-01-01');
      const endDate = new Date('2024-01-02'); // Just over 1 year including leap year
      const chartData = createChartData(startDate, endDate);

      const result = formatXAxisLabel(mockTimestamp, 'date', chartData);

      expect(result).toBe('2025-09-15');
    });
  });

  describe('chartData with various scenarios', () => {
    it('should handle chartData with single data point', () => {
      const chartData = [{ timestamp: mockTimestamp }];

      const result = formatXAxisLabel(mockTimestamp, 'date', chartData);

      expect(result).toBe('09-15');
    });

    it('should handle chartData with mixed timestamp values', () => {
      const chartData = [
        { timestamp: new Date('2023-01-01').getTime() },
        { timestamp: new Date('2023-06-01').getTime() },
        { timestamp: new Date('2023-12-01').getTime() },
      ];

      const result = formatXAxisLabel(mockTimestamp, 'date', chartData);

      expect(result).toBe('09-15');
    });
  });
});
