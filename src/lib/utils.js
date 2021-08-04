import * as defaultTheme from './style/theme';

const RGB_HEX = /^#?(?:([\da-f]{3})[\da-f]?|([\da-f]{6})(?:[\da-f]{2})?)$/i;

export function mergeTheme(theme, defaultTheme) {
  return theme
    ? {
        ...defaultTheme.brand,
        ...theme,
      }
    : defaultTheme.brand;
}

export const getTheme = (props) => {
  return mergeTheme(props.theme, defaultTheme);
};

export const getThemePropSelector = (key) => (props) => {
  return getTheme(props)[key];
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

// Converts old theme variants (danger, critical, healthy, ...) to new ones
export const getThemeNewStatusVariant = (variant) => {
  switch (variant) {
    case 'success':
    case 'healthy':
    case 'healthyLight':
      return 'statusHealthy';
    case 'warning':
      return 'statusWarning';
    case 'danger':
    case 'critical':
      return 'statusCritical';
    default:
      return variant;
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
