import { fontSize } from '../../style/theme';

// =============================================================================
// CONSTANTS
// =============================================================================

export const CHART_CONFIG = {
  RADIUS_SIZE: 4,
  EDGE_THRESHOLD: 8,
  CHART_HEIGHT: 50,
  BAR_SIZE: 8,
  TICK_SIZE: 4,
  TOOLTIP_OFFSET: 24,
  FONT_SIZE: fontSize.smaller,
  TEXT_DY_OFFSET: 12,
  TICK_INTERVAL: 0,
  MARGINS: { left: 28, right: 28, bottom: 4, top: 4 },
} as const;

export const TIME_CONSTANTS = {
  ONE_HOUR: 60 * 60 * 1000,
  ONE_DAY: 24 * 60 * 60 * 1000,
  ONE_WEEK: 7 * 24 * 60 * 60 * 1000,
  MARGIN_HOURS: 6,
  FIFTEEN_MINUTES: 15 * 60 * 1000,
  SIX_HOURS: 6 * 60 * 60 * 1000,
} as const;

export const LABEL_CONFIG = {
  MIN_SPACE_PER_TICK: 60,
  MODULO_CONFIG: {
    [TIME_CONSTANTS.ONE_WEEK]: 2,
    [TIME_CONSTANTS.ONE_DAY]: 3,
    [TIME_CONSTANTS.ONE_HOUR]: 2,
  },
} as const;

// =============================================================================
// TICK CALCULATIONS
// =============================================================================

const { ONE_HOUR, ONE_DAY, MARGIN_HOURS, FIFTEEN_MINUTES, SIX_HOURS } =
  TIME_CONSTANTS;

const generateTickArray = (
  endTimestamp: number,
  count: number,
  interval: number,
): number[] => {
  return Array.from({ length: count }, (_, i) => endTimestamp - i * interval);
};

const roundToNearestHalfDay = (timestamp: number): number => {
  const date = new Date(timestamp);
  const hours = date.getHours();

  if (hours <= 12) {
    return new Date(timestamp).setHours(0, 0, 0, 0);
  } else {
    return new Date(timestamp).setHours(12, 0, 0, 0);
  }
};

export const calculateSevenDayTicks = (endTimestamp: number): number[] => {
  const marginedEnd = endTimestamp - MARGIN_HOURS * ONE_HOUR;
  const roundedEnd = roundToNearestHalfDay(marginedEnd);
  return generateTickArray(roundedEnd, 7, ONE_DAY);
};

export const calculateDayTicks = (endTimestamp: number): number[] => {
  const is6HourTick = endTimestamp % SIX_HOURS === 0;
  const closest6Hours = Math.floor(endTimestamp / SIX_HOURS) * SIX_HOURS;
  const tickCount = is6HourTick ? 5 : 4;

  return generateTickArray(closest6Hours, tickCount, SIX_HOURS);
};

export const calculateHourTicks = (endTimestamp: number): number[] => {
  const is15MinuteTick = endTimestamp % FIFTEEN_MINUTES === 0;
  const closest15Minutes =
    Math.floor(endTimestamp / FIFTEEN_MINUTES) * FIFTEEN_MINUTES;
  const tickCount = is15MinuteTick ? 5 : 4;

  return generateTickArray(closest15Minutes, tickCount, FIFTEEN_MINUTES);
};

export const getEdgeMargin = (
  index: number,
  totalTicks: number,
  isDaySpan: boolean,
): number => {
  if (isDaySpan && totalTicks === 5) {
    return index === 0 ? -8 : index === totalTicks - 1 ? 8 : 0;
  }
  return 0;
};

export const getTicks = (
  startTimestamp: number,
  endTimestamp: number,
): number[] => {
  const span = endTimestamp - startTimestamp;

  if (span === 7 * ONE_DAY) {
    return calculateSevenDayTicks(endTimestamp);
  } else if (span === 24 * ONE_HOUR) {
    return calculateDayTicks(endTimestamp);
  } else if (span === ONE_HOUR) {
    return calculateHourTicks(endTimestamp);
  }

  return [];
};

// =============================================================================
// LABEL VISIBILITY
// =============================================================================

export interface LabelVisibilityConfig {
  hasEnoughSpace: boolean;
  timeSpan: number;
  tickIndex: number;
  totalTicks: number;
}

export const shouldShowTickLabel = (config: LabelVisibilityConfig): boolean => {
  if (config.hasEnoughSpace) return true;

  const moduloValue = LABEL_CONFIG.MODULO_CONFIG[config.timeSpan];
  return moduloValue ? config.tickIndex % moduloValue === 0 : false;
};

export const calculateLabelVisibility = (
  chartWidth: number,
  totalTicks: number,
  span: number,
  index: number,
  endTimestamp: number,
): boolean => {
  const hasEnoughSpace =
    chartWidth / totalTicks > LABEL_CONFIG.MIN_SPACE_PER_TICK;

  // If enough space, show all labels
  if (hasEnoughSpace) return true;

  // Apply specific rules for each time range
  if (span === TIME_CONSTANTS.ONE_WEEK) {
    return index % 2 === 0;
  }

  if (span === TIME_CONSTANTS.ONE_DAY) {
    return (
      index % 3 === 0 ||
      (endTimestamp % (60 * 60 * 1000) === 0 && index % 2 === 0)
    );
  }

  if (span === TIME_CONSTANTS.ONE_HOUR) {
    return (
      (endTimestamp % (15 * 60 * 1000) === 0 && index % 2 === 0) ||
      index % 2 === 0
    );
  }

  return false;
};

// =============================================================================
// RECTANGLE PROPERTIES
// =============================================================================

/**
 * Calculates rectangle properties for alert bars
 */
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
