import React from 'react';
import { fontSize } from '../../style/theme';
import { FormattedDateTime } from '../date/FormattedDateTime';

export const RADIUS_SIZE = 4;
export const EDGE_THRESHOLD = 8;
export const CHART_HEIGHT = 50;
export const BAR_SIZE = 8;
export const TICK_SIZE = 4;
export const TOOLTIP_OFFSET = 24;
export const FONT_SIZE = fontSize.smaller;
export const TEXT_DY_OFFSET = 12;
export const TICK_INTERVAL = 0;

const oneHour = 60 * 60 * 1000;
const oneDay = 24 * oneHour;

// Case are last Hour, last 24 hours, last 7 days
export const getTicks = (
  startTimestamp: number,
  endTimestamp: number,
): any[] => {
  const span = endTimestamp - startTimestamp;

  if (span === 7 * oneDay) {
    const endTimeStampWithMargin = endTimestamp - 6 * oneHour;
    const endDateWithMargin = new Date(endTimeStampWithMargin);
    const endHourWithMargin = endDateWithMargin.getHours();
    let roundedEndTime: number;
    if (endHourWithMargin <= 12) {
      roundedEndTime = new Date(endTimeStampWithMargin).setHours(0, 0, 0, 0);
    } else {
      roundedEndTime = new Date(endTimeStampWithMargin).setHours(12, 0, 0, 0);
    }

    return Array.from({ length: 7 }, (_, i) => roundedEndTime - i * oneDay);
  } else if (span === 24 * oneHour) {
    const is6HourTick = endTimestamp % (6 * oneHour) === 0;
    const closest6Hours =
      Math.floor(endTimestamp / (6 * oneHour)) * (6 * oneHour);

    return Array.from(
      { length: is6HourTick ? 5 : 4 },
      (_, i) => closest6Hours - i * 6 * oneHour,
    );
  } else if (span === oneHour) {
    //  Find closest to 15 minutes in past
    const is15MinuteTick = endTimestamp % (15 * 60 * 1000) === 0;
    const closest15Minutes =
      Math.floor(endTimestamp / (15 * 60 * 1000)) * (15 * 60 * 1000);

    return Array.from(
      { length: is15MinuteTick ? 5 : 4 },
      (_, i) => closest15Minutes - i * 15 * 60 * 1000,
    );
  }
  return [];
};

export const getTickFormatter = (
  startTimestamp: number,
  endTimestamp: number,
  payloadValue: Date,
): React.ReactNode => {
  const span = endTimestamp - startTimestamp;

  if (span === 7 * oneDay) {
    return (
      <FormattedDateTime
        format="day-month-abbreviated-hour-minute"
        value={payloadValue}
      />
    );
  } else if (span === oneDay) {
    return <FormattedDateTime format="time" value={payloadValue} />;
  } else return <FormattedDateTime format="time" value={payloadValue} />;
};

export const getRectangleProps = (
  props: any,
  key: string,
  startTimestamp: number,
  endTimestamp: number,
) => {
  const { x, background } = props;
  let startX = background.x;
  const width = background.width;

  const alertStartTimestamp = props[key][0];
  const alertEndTimestamp = props[key][1];

  const start = Math.max(alertStartTimestamp, startTimestamp);
  const end = Math.min(alertEndTimestamp, endTimestamp);
  const relativeSize = (end - start) / (endTimestamp - startTimestamp);

  if (alertStartTimestamp > startTimestamp) {
    startX = x;
  }

  const rectWidth = relativeSize * width;

  return { rectWidth, startX };
};
