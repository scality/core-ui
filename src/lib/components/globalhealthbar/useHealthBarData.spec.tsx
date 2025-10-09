import { useHealthBarData, Alert } from './useHealthBarData';
import { renderHook } from '@testing-library/react';
describe('useHealthBarData', () => {
  const mockTimestamp = {
    start: new Date('2023-12-01T00:00:00Z').getTime(),
    end: new Date('2023-12-01T12:00:00Z').getTime(),
  };

  const createMockAlert = (
    severity: 'warning' | 'critical',
    startsAt: string,
    endsAt: string,
    description = 'Test alert',
  ): Alert => ({
    description,
    severity,
    startsAt,
    endsAt,
    key: `${severity}_${startsAt}`,
  });

  describe('Alert Filtering', () => {
    it('should include alerts that are completely within the time range', () => {
      const alerts: Alert[] = [
        createMockAlert(
          'critical',
          '2023-12-01T02:00:00Z',
          '2023-12-01T04:00:00Z',
        ),
        createMockAlert(
          'warning',
          '2023-12-01T06:00:00Z',
          '2023-12-01T08:00:00Z',
        ),
      ];

      const { result } = renderHook(() =>
        useHealthBarData(
          alerts,
          mockTimestamp.start,
          mockTimestamp.end,
          'test-id',
        ),
      );

      expect(result.current.chartData[0]).toHaveProperty('critical_0');
      expect(result.current.chartData[0]).toHaveProperty('warning_1');
      expect(result.current.alertKeys.criticalKeys).toContain('critical_0');
      expect(result.current.alertKeys.warningKeys).toContain('warning_1');
    });

    it('should include alerts that start before and end within the time range', () => {
      const alerts: Alert[] = [
        createMockAlert(
          'critical',
          '2023-11-30T22:00:00Z',
          '2023-12-01T04:00:00Z',
        ),
      ];

      const { result } = renderHook(() =>
        useHealthBarData(
          alerts,
          mockTimestamp.start,
          mockTimestamp.end,
          'test-id',
        ),
      );

      expect(result.current.chartData[0]).toHaveProperty('critical_0');
      expect(result.current.alertKeys.criticalKeys).toContain('critical_0');
    });

    it('should include alerts that start within and end after the time range', () => {
      const alerts: Alert[] = [
        createMockAlert(
          'warning',
          '2023-12-01T10:00:00Z',
          '2023-12-01T14:00:00Z',
        ),
      ];

      const { result } = renderHook(() =>
        useHealthBarData(
          alerts,
          mockTimestamp.start,
          mockTimestamp.end,
          'test-id',
        ),
      );

      expect(result.current.chartData[0]).toHaveProperty('warning_0');
      expect(result.current.alertKeys.warningKeys).toContain('warning_0');
    });

    it('should include alerts that span the entire time range', () => {
      const alerts: Alert[] = [
        createMockAlert(
          'critical',
          '2023-11-30T20:00:00Z',
          '2023-12-01T16:00:00Z',
        ),
      ];

      const { result } = renderHook(() =>
        useHealthBarData(
          alerts,
          mockTimestamp.start,
          mockTimestamp.end,
          'test-id',
        ),
      );

      expect(result.current.chartData[0]).toHaveProperty('critical_0');
      expect(result.current.alertKeys.criticalKeys).toContain('critical_0');
    });

    it('should exclude alerts that are completely before the time range', () => {
      const alerts: Alert[] = [
        createMockAlert(
          'warning',
          '2023-11-30T10:00:00Z',
          '2023-11-30T20:00:00Z',
        ),
      ];

      const { result } = renderHook(() =>
        useHealthBarData(
          alerts,
          mockTimestamp.start,
          mockTimestamp.end,
          'test-id',
        ),
      );

      expect(result.current.chartData[0]).not.toHaveProperty('warning_0');
      expect(result.current.alertKeys.warningKeys).toHaveLength(0);
    });

    it('should exclude alerts that are completely after the time range', () => {
      const alerts: Alert[] = [
        createMockAlert(
          'critical',
          '2023-12-01T14:00:00Z',
          '2023-12-01T18:00:00Z',
        ),
      ];

      const { result } = renderHook(() =>
        useHealthBarData(
          alerts,
          mockTimestamp.start,
          mockTimestamp.end,
          'test-id',
        ),
      );

      expect(result.current.chartData[0]).not.toHaveProperty('critical_0');
      expect(result.current.alertKeys.criticalKeys).toHaveLength(0);
    });
  });

  describe('Data Transformation', () => {
    it('should create correct data structure with basic properties', () => {
      const alerts: Alert[] = [
        createMockAlert(
          'warning',
          '2023-12-01T02:00:00Z',
          '2023-12-01T04:00:00Z',
        ),
      ];

      const { result } = renderHook(() =>
        useHealthBarData(
          alerts,
          mockTimestamp.start,
          mockTimestamp.end,
          'test-id',
        ),
      );

      const data = result.current.chartData[0];
      expect(data.range).toEqual([mockTimestamp.start, mockTimestamp.end]);
    });

    it('should create correct alert data keys with timestamps', () => {
      const alerts: Alert[] = [
        createMockAlert(
          'critical',
          '2023-12-01T02:00:00Z',
          '2023-12-01T04:00:00Z',
        ),
      ];

      const { result } = renderHook(() =>
        useHealthBarData(
          alerts,
          mockTimestamp.start,
          mockTimestamp.end,
          'test-id',
        ),
      );

      const data = result.current.chartData[0];
      const expectedStartTime = new Date('2023-12-01T02:00:00Z').getTime();
      const expectedEndTime = new Date('2023-12-01T04:00:00Z').getTime();

      expect(data['critical_0']).toEqual([expectedStartTime, expectedEndTime]);
    });

    it('should create alert metadata with correct structure', () => {
      const alerts: Alert[] = [
        createMockAlert(
          'warning',
          '2023-12-01T02:00:00Z',
          '2023-12-01T04:00:00Z',
          'Test warning',
        ),
      ];

      const { result } = renderHook(() =>
        useHealthBarData(
          alerts,
          mockTimestamp.start,
          mockTimestamp.end,
          'test-id',
        ),
      );

      expect(result.current.alertsMap['warning_0']).toEqual({
        description: 'Test warning',
        severity: 'warning',
        startsAt: '2023-12-01T02:00:00Z',
        endsAt: '2023-12-01T04:00:00Z',
        key: 'warning_0',
      });
    });

    it('should handle multiple alerts with correct indexing', () => {
      const alerts: Alert[] = [
        createMockAlert(
          'warning',
          '2023-12-01T01:00:00Z',
          '2023-12-01T02:00:00Z',
        ),
        createMockAlert(
          'critical',
          '2023-12-01T03:00:00Z',
          '2023-12-01T04:00:00Z',
        ),
        createMockAlert(
          'warning',
          '2023-12-01T05:00:00Z',
          '2023-12-01T06:00:00Z',
        ),
      ];

      const { result } = renderHook(() =>
        useHealthBarData(
          alerts,
          mockTimestamp.start,
          mockTimestamp.end,
          'test-id',
        ),
      );

      const data = result.current.chartData[0];
      expect(data).toHaveProperty('warning_0');
      expect(data).toHaveProperty('critical_1');
      expect(data).toHaveProperty('warning_2');
      expect(result.current.alertsMap).toHaveProperty('warning_0');
      expect(result.current.alertsMap).toHaveProperty('critical_1');
      expect(result.current.alertsMap).toHaveProperty('warning_2');
    });
  });

  describe('Alert Key Categorization', () => {
    it('should categorize alert keys by severity', () => {
      const alerts: Alert[] = [
        createMockAlert(
          'warning',
          '2023-12-01T01:00:00Z',
          '2023-12-01T02:00:00Z',
        ),
        createMockAlert(
          'critical',
          '2023-12-01T03:00:00Z',
          '2023-12-01T04:00:00Z',
        ),
        createMockAlert(
          'warning',
          '2023-12-01T05:00:00Z',
          '2023-12-01T06:00:00Z',
        ),
        createMockAlert(
          'critical',
          '2023-12-01T07:00:00Z',
          '2023-12-01T08:00:00Z',
        ),
      ];

      const { result } = renderHook(() =>
        useHealthBarData(
          alerts,
          mockTimestamp.start,
          mockTimestamp.end,
          'test-id',
        ),
      );

      expect(result.current.alertKeys.warningKeys).toEqual([
        'warning_0',
        'warning_2',
      ]);
      expect(result.current.alertKeys.criticalKeys).toEqual([
        'critical_1',
        'critical_3',
      ]);
      expect(result.current.alertKeys.unavailableKeys).toEqual([]);
    });

    it('should handle only warning alerts', () => {
      const alerts: Alert[] = [
        createMockAlert(
          'warning',
          '2023-12-01T01:00:00Z',
          '2023-12-01T02:00:00Z',
        ),
        createMockAlert(
          'warning',
          '2023-12-01T03:00:00Z',
          '2023-12-01T04:00:00Z',
        ),
      ];

      const { result } = renderHook(() =>
        useHealthBarData(
          alerts,
          mockTimestamp.start,
          mockTimestamp.end,
          'test-id',
        ),
      );

      expect(result.current.alertKeys.warningKeys).toEqual([
        'warning_0',
        'warning_1',
      ]);
      expect(result.current.alertKeys.criticalKeys).toEqual([]);
      expect(result.current.alertKeys.unavailableKeys).toEqual([]);
    });

    it('should handle only critical alerts', () => {
      const alerts: Alert[] = [
        createMockAlert(
          'critical',
          '2023-12-01T01:00:00Z',
          '2023-12-01T02:00:00Z',
        ),
        createMockAlert(
          'critical',
          '2023-12-01T03:00:00Z',
          '2023-12-01T04:00:00Z',
        ),
      ];

      const { result } = renderHook(() =>
        useHealthBarData(
          alerts,
          mockTimestamp.start,
          mockTimestamp.end,
          'test-id',
        ),
      );

      expect(result.current.alertKeys.warningKeys).toEqual([]);
      expect(result.current.alertKeys.criticalKeys).toEqual([
        'critical_0',
        'critical_1',
      ]);
      expect(result.current.alertKeys.unavailableKeys).toEqual([]);
    });

    it('should only include alert bar keys and exclude metadata and basic properties', () => {
      const alerts: Alert[] = [
        createMockAlert(
          'warning',
          '2023-12-01T01:00:00Z',
          '2023-12-01T02:00:00Z',
        ),
      ];

      const { result } = renderHook(() =>
        useHealthBarData(
          alerts,
          mockTimestamp.start,
          mockTimestamp.end,
          'test-id',
        ),
      );

      // Should only contain the actual alert bar keys for rendering
      expect(result.current.alertKeys.warningKeys).toEqual(['warning_0']);

      // Should not contain basic data properties
      expect(result.current.alertKeys.warningKeys).not.toContain('start');
      expect(result.current.alertKeys.warningKeys).not.toContain('end');
      expect(result.current.alertKeys.warningKeys).not.toContain('range');
      expect(result.current.alertKeys.warningKeys).not.toContain('id');

      // Should not contain alert metadata keys (used for tooltips, not bars)
      expect(result.current.alertKeys.warningKeys).not.toContain(
        'alert_warning_0',
      );
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty alerts array', () => {
      const { result } = renderHook(() =>
        useHealthBarData([], mockTimestamp.start, mockTimestamp.end, 'test-id'),
      );

      const data = result.current.chartData[0];
      expect(data.range).toEqual([mockTimestamp.start, mockTimestamp.end]);
      expect(result.current.alertKeys.warningKeys).toEqual([]);
      expect(result.current.alertKeys.criticalKeys).toEqual([]);
      expect(result.current.alertKeys.unavailableKeys).toEqual([]);
    });

    it('should handle overlapping alerts correctly', () => {
      const alerts: Alert[] = [
        createMockAlert(
          'warning',
          '2023-12-01T01:00:00Z',
          '2023-12-01T04:00:00Z',
        ),
        createMockAlert(
          'critical',
          '2023-12-01T02:00:00Z',
          '2023-12-01T05:00:00Z',
        ),
      ];

      const { result } = renderHook(() =>
        useHealthBarData(
          alerts,
          mockTimestamp.start,
          mockTimestamp.end,
          'test-id',
        ),
      );

      expect(result.current.chartData[0]).toHaveProperty('warning_0');
      expect(result.current.chartData[0]).toHaveProperty('critical_1');
      expect(result.current.alertKeys.warningKeys).toContain('warning_0');
      expect(result.current.alertKeys.criticalKeys).toContain('critical_1');
    });

    it('should handle alerts with same timestamps', () => {
      const alerts: Alert[] = [
        createMockAlert(
          'warning',
          '2023-12-01T02:00:00Z',
          '2023-12-01T04:00:00Z',
        ),
        createMockAlert(
          'critical',
          '2023-12-01T02:00:00Z',
          '2023-12-01T04:00:00Z',
        ),
      ];

      const { result } = renderHook(() =>
        useHealthBarData(
          alerts,
          mockTimestamp.start,
          mockTimestamp.end,
          'test-id',
        ),
      );

      expect(result.current.chartData[0]).toHaveProperty('warning_0');
      expect(result.current.chartData[0]).toHaveProperty('critical_1');
      expect(result.current.alertKeys.warningKeys).toContain('warning_0');
      expect(result.current.alertKeys.criticalKeys).toContain('critical_1');
    });
  });
});
