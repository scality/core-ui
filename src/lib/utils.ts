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

/**
 * Returns the relative luminance of an sRGB color (WCAG 2.0 formula).
 */
const relativeLuminance = (r: number, g: number, b: number): number => {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

/**
 * Returns the WCAG contrast ratio between two relative luminances.
 */
const contrastRatio = (l1: number, l2: number): number => {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Returns '#FFFFFF' or '#000000' depending on which has better contrast
 * against the given background color. Returns null if the value is not
 * a valid hex color (e.g. CSS gradients).
 */
export const getContrastText = (bgColor: string): string | null => {
  try {
    const [r, g, b] = hex2RGB(bgColor);
    const bgLuminance = relativeLuminance(r, g, b);
    const whiteContrast = contrastRatio(1, bgLuminance);
    const blackContrast = contrastRatio(bgLuminance, 0);
    return whiteContrast >= blackContrast ? '#FFFFFF' : '#000000';
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
