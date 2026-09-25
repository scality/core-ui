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
  // Read the transient $variant (v6 convention used internally) but fall back
  // to an unprefixed variant so external consumers of this utility keep working.
  const variant = props.$variant ?? props.variant;
  const key = variantMapping[variant] ?? variant;
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

    const lighterContrast = wcagContrastRatio(
      primaryLum >= reverseLum ? primaryLum : reverseLum,
      bgLum,
    );

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
 * Below this, `formatISONumber` switches to scientific notation — and with it `decimals`
 * changes meaning, from fraction digits to mantissa digits. Exported because a caller
 * computing `decimals` has to know which of the two it is computing.
 */
export const SCIENTIFIC_NOTATION_THRESHOLD = 0.001;

/**
 * Formats a number to ISO 80000-1 format:
 * - Space as thousands separator
 * - Dot as decimal separator
 * - Optional compact notation (10K, 1M, etc.)
 * - Fractional values: enough decimals to keep two significant digits
 * - Very small values (< 0.001): scientific notation, `decimals` mantissa digits
 */
export const formatISONumber = (
  value: number,
  options: FormatISONumberOptions = {},
): string => {
  const { decimals = 2, compact = false, fixedDecimals = false } = options;

  if (value === 0) return '0';

  const absValue = Math.abs(value);

  if (absValue < SCIENTIFIC_NOTATION_THRESHOLD) {
    // Bounded: float noise lands here often, and an unbounded mantissa prints
    // all seventeen digits of `0.1 + 0.2 - 0.3`.
    return value.toExponential(decimals);
  }

  // Below 1, `decimals` alone swallows the value: 0.002 renders as "0.00",
  // a zero the caller never measured. Raised to keep two significant digits,
  // never lowered, so values from 0.01 up are formatted as before.
  const maximumFractionDigits =
    absValue < 1
      ? Math.max(decimals, Math.ceil(-Math.log10(absValue)) + 1)
      : decimals;

  // Rounded here, not by Intl, whose rounding mode has not always been
  // consistent across engines — and it clears float noise on the way
  // (`1.005 - 1` displays as 0.005). Below 1 only: toFixed goes exponential
  // on large values.
  const rounded =
    absValue < 1 ? Number(value.toFixed(maximumFractionDigits)) : value;

  // ISO format: space as thousands separator, dot as decimal separator
  // With optional compact notation (10K, 1M, etc.)
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: fixedDecimals ? decimals : undefined,
    maximumFractionDigits,
    notation: compact ? 'compact' : 'standard',
  })
    .format(rounded)
    .replace(',', '.');
};
