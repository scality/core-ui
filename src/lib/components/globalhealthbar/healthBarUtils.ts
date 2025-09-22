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
  MIN_SPACE_PER_TICK: 80,
  MODULO_CONFIG: {
    [TIME_CONSTANTS.ONE_WEEK]: 2,
    [TIME_CONSTANTS.ONE_DAY]: 3,
    [TIME_CONSTANTS.ONE_HOUR]: 3,
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
    const isRoundHour = endTimestamp % (60 * 60 * 1000) === 0;
    const roundHourInterval = index % 2 === 0;
    const defaultInterval = index % 3 === 0;
    const result = isRoundHour ? roundHourInterval : defaultInterval;

    return result;
  }

  if (span === TIME_CONSTANTS.ONE_HOUR) {
    const isRound15Minute = endTimestamp % (15 * 60 * 1000) === 0;
    const round15MinuteInterval = index % 2 === 0;
    const defaultInterval = index % 3 === 0;
    const result = isRound15Minute ? round15MinuteInterval : defaultInterval;

    return result;
  }

  return false;
};

// =============================================================================
// RECTANGLE PROPERTIES
// =============================================================================

/**
 * Core calculation for alert positioning within a time range
 */
export const calculateAlertPosition = (
  alertStartTimestamp: number,
  alertEndTimestamp: number,
  chartStartTimestamp: number,
  chartEndTimestamp: number,
  availableWidth: number,
  baseX: number = 0,
) => {
  const start = Math.max(alertStartTimestamp, chartStartTimestamp);
  const end = Math.min(alertEndTimestamp, chartEndTimestamp);
  const totalTimeSpan = chartEndTimestamp - chartStartTimestamp;
  const relativeSize = (end - start) / totalTimeSpan;

  // Calculate start position relative to baseX
  let startX = baseX;
  if (alertStartTimestamp > chartStartTimestamp) {
    const alertStartRelative =
      (alertStartTimestamp - chartStartTimestamp) / totalTimeSpan;
    startX = baseX + alertStartRelative * availableWidth;
  }

  const width = relativeSize * availableWidth;

  return { startX, width, relativeSize };
};

// =============================================================================
// KEYBOARD NAVIGATION UTILS
// =============================================================================

export type NavigationAction =
  | 'previous'
  | 'next'
  | 'first'
  | 'last'
  | 'escape';

export interface NavigationState {
  newIndex: number;
  selectedAlert: any | null;
  shouldActivateKeyboard: boolean;
}

/**
 * Maps keyboard events to navigation actions
 */
export const getNavigationAction = (key: string): NavigationAction | null => {
  switch (key) {
    case 'ArrowLeft':
    case 'ArrowUp':
      return 'previous';
    case 'ArrowRight':
    case 'ArrowDown':
      return 'next';
    case 'Home':
      return 'first';
    case 'End':
      return 'last';
    case 'Escape':
      return 'escape';
    default:
      return null;
  }
};

/**
 * Calculates new index based on navigation action
 */
export const calculateNavigationIndex = (
  action: NavigationAction,
  currentIndex: number,
  arrayLength: number,
): number => {
  if (arrayLength === 0) return -1;

  switch (action) {
    case 'previous':
      return currentIndex <= 0 ? arrayLength - 1 : currentIndex - 1;
    case 'next':
      return currentIndex >= arrayLength - 1 ? 0 : currentIndex + 1;
    case 'first':
      return 0;
    case 'last':
      return arrayLength - 1;
    case 'escape':
      return -1;
    default:
      return currentIndex;
  }
};

/**
 * Gets complete navigation state update for a given action
 */
export const getNavigationStateUpdate = <T>(
  action: NavigationAction,
  currentIndex: number,
  alerts: T[],
): NavigationState => {
  const newIndex = calculateNavigationIndex(
    action,
    currentIndex,
    alerts.length,
  );

  return {
    newIndex,
    selectedAlert: newIndex >= 0 ? alerts[newIndex] : null,
    shouldActivateKeyboard: action !== 'escape',
  };
};

// =============================================================================
// TOOLTIP UTILS
// =============================================================================

/**
 * Calculates tooltip position for an alert based on its time range
 */
export const getTooltipPosition = (
  alert: { startsAt: string; endsAt: string },
  startTimestamp: number,
  endTimestamp: number,
  chartUsableWidth: number,
) => {
  const alertStart = new Date(alert.startsAt).getTime();
  const alertEnd = new Date(alert.endsAt).getTime();

  const { startX, width } = calculateAlertPosition(
    alertStart,
    alertEnd,
    startTimestamp,
    endTimestamp,
    chartUsableWidth,
    CHART_CONFIG.MARGINS.left, // Include left margin as baseX
  );

  // Return center position of the alert
  return startX + width / 2;
};
