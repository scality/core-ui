import { getLuminance } from 'polished';

const RGB_HEX = /^#?(?:([\da-f]{3})[\da-f]?|([\da-f]{6})(?:[\da-f]{2})?)$/i;

/** Ensure the consistency of colors between old and new colors */
const variantMapping = {
  healthy: 'statusHealthy',
  success: 'statusHealthy',
  warning: 'statusWarning',
  danger: 'statusCritical',
  selected: 'selectedActive',
  base: 'infoPrimary',
};

/** Translates the old colors into new colors while keeping the same name.
 * New names are also supported. */
export const getThemePropSelector = (key) => (props) => {
  const key_ = variantMapping[key] ?? key;
  return props.theme[key_];
};

/** Translates the old colors into new colors while keeping same name.
 * New names are also supported. */
export const getThemeVariantSelector = () => (props) => {
  const theme = props.theme;
  const key = variantMapping[props.variant] ?? props.variant;
  return theme[key];
};

/** Returns the theme color key for a given variant (e.g. for use with Icon color prop). */
export const getVariantThemeKey = (variant: string): string =>
  variantMapping[variant] ?? variant;

export const hex2RGB = (str: string): [number, number, number] => {
  const [, short, long] = String(str).match(RGB_HEX) || [];

  if (long) {
    const value = Number.parseInt(long, 16);
    return [value >> 16, (value >> 8) & 0xff, value & 0xff];
  } else if (short) {
    const [r, g, b] = Array.from(short, (s) => Number.parseInt(s, 16)).map(
      (n) => (n << 4) | n,
    );
    return [r, g, b];
  }

  throw new Error('Invalid hex string provided');
};

const wcagContrastRatio = (l1: number, l2: number): number =>
  (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

// Minimum WCAG contrast ratio to consider a text color readable on a background.
// 3.0 corresponds to WCAG AA for large text — same threshold used by MUI.
const CONTRAST_THRESHOLD = 3;

export const getContrastText = (
  bgColor: string,
  textPrimary: string,
  textReverse: string,
): string | null => {
  try {
    const bgLum = getLuminance(bgColor);
    const primaryLum = getLuminance(textPrimary);
    const reverseLum = getLuminance(textReverse);

    const lighterText = primaryLum >= reverseLum ? textPrimary : textReverse;
    const darkerText = primaryLum >= reverseLum ? textReverse : textPrimary;

    const lighterContrast = wcagContrastRatio(primaryLum >= reverseLum ? primaryLum : reverseLum, bgLum);

    return lighterContrast >= CONTRAST_THRESHOLD ? lighterText : darkerText;
  } catch {
    return null;
  }
};

export const convertRemToPixels = (rem: number): number => {
  if (
    document.documentElement &&
    rem &&
    Number.isFinite(rem) &&
    !Number.isNaN(rem)
  ) {
    return (
      rem * parseFloat(getComputedStyle(document.documentElement).fontSize) || 0
    );
  }

  return 0;
};

type FormatISONumberOptions = {
  decimals?: number;
  compact?: boolean;
  fixedDecimals?: boolean;
};

/**
 * Formats a number to ISO 80000-1 format:
 * - Space as thousands separator
 * - Dot as decimal separator
 * - Optional compact notation (10K, 1M, etc.)
 * - Very small values (< 0.001): scientific notation
 */
export const formatISONumber = (
  value: number,
  options: FormatISONumberOptions = {},
): string => {
  const { decimals = 2, compact = false, fixedDecimals = false } = options;

  if (value === 0) return '0';

  const absValue = Math.abs(value);

  if (absValue < 0.001) {
    return value.toExponential();
  }

  // ISO format: space as thousands separator, dot as decimal separator
  // With optional compact notation (10K, 1M, etc.)
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: fixedDecimals ? decimals : undefined,
    maximumFractionDigits: decimals,
    notation: compact ? 'compact' : 'standard',
  })
    .format(value)
    .replace(',', '.');
};
