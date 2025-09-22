import { useMemo } from 'react';

export interface Alert {
  description: string;
  startsAt: string;
  endsAt: string;
  severity: 'warning' | 'critical';
}

export const useHealthBarData = (
  alerts: Alert[],
  startTimestamp: number,
  endTimestamp: number,
  id: string,
) => {
  // Filter alerts to only include alerts that are within the start and end timestamp
  const filteredAlerts = useMemo(
    () =>
      alerts.filter(
        (alert) =>
          (new Date(alert.endsAt).getTime() >= startTimestamp &&
            new Date(alert.startsAt).getTime() <= endTimestamp) ||
          (new Date(alert.startsAt).getTime() <= endTimestamp &&
            new Date(alert.endsAt).getTime() >= startTimestamp),
      ),
    [alerts, startTimestamp, endTimestamp],
  );

  // Create chart data and alerts map separately
  const { chartData, alertsMap, alertKeys } = useMemo(() => {
    const alertBars: Record<string, [number, number]> = {};
    const alertsMapData: Record<string, Alert> = {};

    filteredAlerts.forEach((alert, index) => {
      // Use alert index with severity to create unique keys for bars dataKey
      // Bars format is: dataKey: [startTimestamp, endTimestamp]
      const uniqueKey = `${alert.severity}_${index}`;

      alertBars[uniqueKey] = [
        new Date(alert.startsAt).getTime(),
        new Date(alert.endsAt).getTime(),
      ];

      // Store alert data separately for tooltip access
      alertsMapData[uniqueKey] = {
        ...alert,
      };
    });

    // Chart data - ready for BarChart (as array)
    const chartDataArray = [
      {
        range: [startTimestamp, endTimestamp],
        ...alertBars,
      },
    ];

    // Alert keys for bar rendering
    const allKeys = Object.keys(alertBars);
    const alertKeysData = {
      warningKeys: allKeys.filter((key) => key.startsWith('warning')),
      criticalKeys: allKeys.filter((key) => key.startsWith('critical')),
      unavailableKeys: allKeys.filter((key) => key.startsWith('unavailable')),
    };

    return {
      chartData: chartDataArray,
      alertsMap: alertsMapData,
      alertKeys: alertKeysData,
    };
  }, [filteredAlerts, startTimestamp, endTimestamp]);

  return { chartData, alertsMap, alertKeys };
};
