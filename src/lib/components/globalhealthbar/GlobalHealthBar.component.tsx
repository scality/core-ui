// @ts-nocheck
import { useMemo } from 'react';
import VegaChart from '../vegachartv2/VegaChartV2.component';
import { useTheme } from 'styled-components';
import { formatValue } from './tooltip/index';
export const TOP = 'top';
export const BOTTOM = 'bottom';
type Position = typeof TOP | typeof BOTTOM;
export type GlobalHealthProps = {
  id: string;
  alerts: {
    description: string;
    startsAt: string;
    endsAt: string;
    severity: string;
  }[];
  start: string;
  end: string;
  height?: number;
  tooltipPosition?: Position;
};

function GlobalHealthBar({
  id,
  alerts,
  start,
  end,
  height = 8,
  tooltipPosition = TOP,
}: GlobalHealthProps) {
  const theme = useTheme();
  const trimAlerts = alerts.map((alert) => {
    if (new Date(alert.startsAt) < new Date(start)) {
      return { ...alert, startsAt: start };
    }

    return { ...alert };
  });
  trimAlerts.unshift({
    startsAt: start,
    endsAt: end,
    severity: 'healthy',
  });
  const spec = {
    width: 'container',
    height,
    data: {
      values: trimAlerts,
    },
    transform: [
      {
        calculate:
          "datum.description !== '' ? 'View details on alert page' : ''",
        as: 'title',
      },
    ],
    view: {
      cornerRadius: 6,
    },
    config: {
      style: {
        cell: {
          stroke: 'transparent',
          strokeWidth: 0,
        },
      },
    },
    layer: [
      // Paint the entire bar with green
      {
        mark: {
          type: 'rect',
          clip: true,
        },
        encoding: {
          color: {
            value: theme.statusHealthy,
          },
        },
      }, // Paint the timespan as x-axis
      {
        mark: {
          type: 'rect',
          cursor: 'pointer',
          clip: true,
        },
        encoding: {
          x: {
            field: 'startsAt',
            type: 'temporal',
            title: null,
            stack: null,
            axis: {
              format: '%d%b %H:%M:%S',
              ticks: true,
              tickCount: 5,
              //A desired number of ticks, for axes visualizing quantitative scales. The resulting number may be different so that values are “nice” (multiples of 2, 5, 10) and lie within the underlying scale’s range.
              labelFlush: 20,
              labelColor: theme.textSecondary,
            },
          },
          x2: {
            field: 'endsAt',
          },
          color: {
            value: theme.statusHealthy,
          },
        },
      },
      {
        mark: {
          type: 'rect',
          tooltip: true,
          cursor: 'pointer',
          clip: true,
        },
        params: [
          {
            name: 'highlight',
            // The supported DOM event types for mark items are https://vega.github.io/vega/docs/event-streams/
            select: {
              type: 'point',
              on: 'mouseover',
              clear: 'mouseout',
            },
          },
        ],
        encoding: {
          x: {
            timeUnit: 'yearmonthdatehoursminutes',
            field: 'startsAt',
            type: 'temporal',
            title: null,
          },
          x2: {
            field: 'endsAt',
          },
          color: {
            field: 'severity',
            type: 'nominal',
            title: 'null',
            scale: {
              domain: ['healthy', 'critical', 'unavailable', 'warning'],
              range: [
                theme.statusHealthy,
                theme.statusCritical,
                theme.textSecondary,
                theme.statusWarning,
              ],
            },
            legend: null,
          },
          tooltip: [
            {
              field: 'severity',
              title: 'Severity',
            },
            {
              field: 'startsAt',
              title: 'Start',
              type: 'temporal',
              timeUnit: 'yearmonthdatehoursminutes',
            },
            {
              field: 'endsAt',
              title: 'End',
              type: 'temporal',
              timeUnit: 'yearmonthdatehoursminutes',
            },
            {
              field: 'title',
              title: 'title',
            },
            {
              field: 'description',
              title: 'Description',
            },
          ],
          opacity: {
            condition: {
              param: 'highlight',
              value: 1,
            },
            value: 0.6,
          },
        },
      },
    ],
  };
  return (
    <VegaChart
      className="sc-globalhealthbar"
      spec={spec}
      theme={'custom'}
      tooltipPosition={tooltipPosition}
      formatTooltip={useMemo(() => formatValue(), [])}
    ></VegaChart>
  );
}

export default GlobalHealthBar;
