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
