import React from 'react';
import {
  DATE_FORMATER,
  TIME_FORMATER,
  TIME_SECOND_FORMATER,
} from '../date/FormattedDateTime';

export const RADIUS_SIZE = 5;
export const EDGE_THRESHOLD = 10;
export const CHART_HEIGHT = 50;
export const BAR_SIZE = 8;
export const TICK_SIZE = 5;
export const TOOLTIP_OFFSET = 20;
export const FONT_SIZE = 11;
export const TEXT_DY_OFFSET = 12;
export const TICK_INTERVAL = 0;

const oneHour = 60 * 60 * 1000;
const oneDay = 24 * oneHour;

// Case are last Hour, last 24 hours, last 7 days
export const getTicks = (
  startTimestamp: number,
  endTimestamp: number,
): number[] => {
  const span = endTimestamp - startTimestamp;
  if (span > oneDay) {
    return Array.from({ length: 5 }, (_, i) => endTimestamp - (i + 1) * oneDay);
  }
  return Array.from(
    { length: 4 },
    (_, i) => endTimestamp - ((i + 1) / 5) * span,
  );
};

export const getTickFormatter = (
  startTimestamp: number,
  endTimestamp: number,
  payloadValue: Date,
): React.ReactNode => {
  const span = endTimestamp - startTimestamp;
  if (span > oneDay) {
    return (
      <>
        <tspan x={0} dy="12">
          {DATE_FORMATER.format(payloadValue)}
        </tspan>

        <tspan x={0} dy="12">
          {TIME_FORMATER.format(payloadValue)}
        </tspan>
      </>
    );
  }
  if (span === oneDay) {
    return (
      DATE_FORMATER.format(payloadValue) +
      ' ' +
      TIME_FORMATER.format(payloadValue)
    );
  } else return TIME_SECOND_FORMATER.format(payloadValue);
};
