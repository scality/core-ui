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
  const data = useMemo(
    () => [
      {
        start: startTimestamp,
        end: endTimestamp,
        range: [startTimestamp, endTimestamp],
        ...alerts.reduce((acc, alert, index) => {
          // Use alert index with severity to create unique keys for bars dataKey
          // Bars format is: dataKey: [startTimestamp, endTimestamp]
          const uniqueKey = `${alert.severity}_${index}`;

          acc[uniqueKey] = [
            new Date(alert.startsAt).getTime(),
            new Date(alert.endsAt).getTime(),
          ];
          // Add the alert to the data for the tooltip
          acc[`alert_${uniqueKey}`] = {
            ...alert,
          };

          return acc;
        }, {}),
        id,
      },
    ],
    [alerts, startTimestamp, endTimestamp, id],
  );

  // Separate keys for warning, critical, and unavailable to map to the different bars
  const alertKeys = useMemo(() => {
    const dataKeys = Object.keys(data[0]);
    return {
      warningKeys: dataKeys.filter((key) => key.startsWith('warning')),
      criticalKeys: dataKeys.filter((key) => key.startsWith('critical')),
      unavailableKeys: dataKeys.filter((key) => key.startsWith('unavailable')),
    };
  }, [data]);

  return { data, alertKeys };
};
