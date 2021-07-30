//@flow
import React from 'react';
import VegaChart from '../vegachart/VegaChart.component.js';
import { useTheme } from 'styled-components';

export const TOP = 'top';
export const BOTTOM = 'bottom';
type Position = typeof TOP | typeof BOTTOM;
export type GlobalHealthProps = {
  id: string,
  alerts: {
    description: string,
    startsAt: string,
    endsAt: string,
    severity: string,
  }[],
  start: string,
  end: string,
  height?: number,
  width?: number,
  tooltipPosition?: Position,
};

function convert2TimeObject(time) {
  // convert the date string to a date time definition object `{ date: number, month: number, year: number }`, which is required by vega-lite
  const date = new Date(time);

  return {
    date: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
}

function GlobalHealthBar({
  id,
  alerts,
  start,
  end,
  height = 8,
  width = 400,
  tooltipPosition = TOP,
}: GlobalHealthProps) {
  const theme = useTheme();
  // change the UTC time to current time zone
  const startTimeObject = convert2TimeObject(start);
  const endTimeObject = convert2TimeObject(end);

  const trimAlerts = alerts.map((alert) => {
    if (new Date(alert.startsAt) < new Date(start)) {
      return { ...alert, startsAt: start };
    }
    return { ...alert };
  });

  const spec = {
    width,
    height,
    data: {
      // trick: when there is no global alert, in order to display a green bar, we need to pass a non-empry array
      values: !alerts.length ? [0] : trimAlerts,
    },
    transform: [
      {
        calculate:
          "datum.description !== '' ? 'View details on alert page' : ''",
        as: 'title',
      },
    ],
    layer: [
      // Paint the entire bar with green
      {
        mark: { type: 'rect', cornerRadius: 10 },
        encoding: { color: { value: theme.statusHealthy } },
      },
      // Paint the timespan as x-axis
      {
        mark: { type: 'rect', cursor: 'pointer', cornerRadius: 10 },
        encoding: {
          x: {
            field: 'startsAt',
            type: 'temporal',
            title: null,
            stack: null,
            scale: {
              /* 
              We have warnings from console because of this known issue.
              https://github.com/vega/vega-lite/issues/5733
              Note that: A date time definition object
              https://vega.github.io/vega-lite/docs/datetime.html 
              */
              domain: [startTimeObject, endTimeObject],
            },
            axis: {
              format: '%d %b',
              ticks: true,
              grid: false,
              domainWidth: 0,
              tickCount: 7,
              labelExpr:
                "[timeFormat(datum.value, '%d'), timeFormat(datum.value, '%d') == '01' || datum.index == 0 ? timeFormat(datum.value, '%b') : '']",
              labelColor: theme.textSecondary,
            },
          },
          x2: { field: 'endsAt' },
          color: { value: theme.statusHealthy },
        },
      },
      {
        mark: {
          type: 'rect',
          tooltip: true,
          cornerRadius: 10,
          cursor: 'pointer',
          clip: true,
        },
        params: [
          {
            name: 'highlight',
            // The supported DOM event types for mark items are https://vega.github.io/vega/docs/event-streams/
            select: { type: 'point', on: 'mouseover', clear: 'mouseout' },
          },
        ],
        encoding: {
          x: {
            timeUnit: 'yearmonthdatehoursminutes',
            field: 'startsAt',
            type: 'temporal',
            title: null,
          },
          x2: { field: 'endsAt' },
          color: {
            field: 'severity',
            type: 'nominal',
            title: 'null',
            scale: { range: [theme.critical, theme.alert] },
            legend: null,
          },
          tooltip: [
            { field: 'severity', title: 'Severity' },
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
            { field: 'title', title: 'title' },
            { field: 'description', title: 'Description' },
          ],
          opacity: {
            condition: { param: 'highlight', value: 1 },
            value: 0.6,
          },
        },
      },
    ],
  };
  return (
    <VegaChart
      className="sc-globalhealthbar"
      id={id}
      spec={spec}
      theme={theme}
      tooltipPosition={tooltipPosition}
    ></VegaChart>
  );
}

export default GlobalHealthBar;
