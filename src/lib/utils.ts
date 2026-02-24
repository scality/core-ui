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

// WCAG 2.0 relative luminance
const relativeLuminance = (r: number, g: number, b: number): number => {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

const wcagContrastRatio = (l1: number, l2: number): number =>
  (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

const luminanceOf = (hex: string): number => {
  const [r, g, b] = hex2RGB(hex);
  return relativeLuminance(r, g, b);
};

export const getContrastText = (
  bgColor: string,
  textPrimary: string,
  textReverse: string,
): string | null => {
  try {
    const bgLum = luminanceOf(bgColor);
    const primaryContrast = wcagContrastRatio(luminanceOf(textPrimary), bgLum);
    const reverseContrast = wcagContrastRatio(luminanceOf(textReverse), bgLum);
    return reverseContrast > primaryContrast ? textReverse : textPrimary;
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
