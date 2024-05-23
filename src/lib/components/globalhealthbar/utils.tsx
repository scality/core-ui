import React from 'react';
import { RectRadius } from 'recharts/types/shape/Rectangle';
import {
  DATE_FORMATER,
  TIME_FORMATER,
  TIME_SECOND_FORMATER,
} from '../date/FormattedDateTime';

const oneHour = 60 * 60 * 1000;
const oneDay = 24 * oneHour;

export const setHistoryTooltipPosition = (
  startDate: number,
  endDate: number,
  selectedDate: number | undefined,
): string | null => {
  if (selectedDate) {
    const width = ((selectedDate - startDate) / (endDate - startDate)) * 600;
    const leftPosition = width - 132 / 2;
    return `auto auto -4px ${leftPosition}px`;
  }
  return 'auto';
};

export const getRadius = (
  start: number,
  end: number,
  startDate: number,
  endDate: number,
): RectRadius => {
  const span = endDate - startDate;
  const marge = span >= oneDay ? 0.011 * span : 0;
  let radius = [0, 0];
  let rightRadius = [0, 0];

  if (start === startDate) {
    radius = [15, 15];
  } else if (start <= startDate + marge) {
    radius = [6, 6];
  }
  if (end === endDate) {
    rightRadius = [15, 15];
  } else if (end >= endDate - marge) {
    rightRadius = [6, 6];
  }
  radius.splice(1, 0, ...rightRadius);

  return radius as RectRadius;
};

export const getStep = (startDate: number, endDate: number): number => {
  const span = endDate - startDate;
  if (span === 7 * oneDay) {
    return oneHour;
  } else if (span === oneDay) {
    return oneHour / 4;
  } else return 60 * 1000;
};

export const getDataListOptions = (
  startDate: number,
  endDate: number,
): number[] => {
  const span = endDate - startDate;
  if (span === 7 * oneDay) {
    return Array.from({ length: 6 }, (_, i) => endDate - (i + 1) * oneDay);
  }
  return Array.from({ length: 4 }, (_, i) => endDate - ((i + 1) / 5) * span);
};

export const getTickFormatter = (
  startDate: number,
  endDate: number,
  payloadValue: Date,
): React.ReactNode => {
  const span = endDate - startDate;
  if (span === 7 * oneDay) {
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
