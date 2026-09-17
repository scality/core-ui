import { formatISONumber, getContrastText } from './utils';

const LIGHT_TEXT = '#EAEAEA';
const DARK_TEXT = '#000000';

describe('getContrastText', () => {
  it('returns light text on dark backgrounds', () => {
    expect(getContrastText('#000000', LIGHT_TEXT, DARK_TEXT)).toBe(LIGHT_TEXT);
    expect(getContrastText('#1A1A1A', LIGHT_TEXT, DARK_TEXT)).toBe(LIGHT_TEXT);
    expect(getContrastText('#121219', LIGHT_TEXT, DARK_TEXT)).toBe(LIGHT_TEXT);
    expect(getContrastText('#2F4185', LIGHT_TEXT, DARK_TEXT)).toBe(LIGHT_TEXT);
  });

  it('returns dark text on light backgrounds', () => {
    expect(getContrastText('#FFFFFF', LIGHT_TEXT, DARK_TEXT)).toBe(DARK_TEXT);
    expect(getContrastText('#F5F5F5', LIGHT_TEXT, DARK_TEXT)).toBe(DARK_TEXT);
    expect(getContrastText('#FCFCFC', LIGHT_TEXT, DARK_TEXT)).toBe(DARK_TEXT);
  });

  it('returns light text on saturated colors where WCAG luminance is ambiguous', () => {
    expect(getContrastText('#E60028', LIGHT_TEXT, DARK_TEXT)).toBe(LIGHT_TEXT);
    expect(getContrastText('#E9041E', LIGHT_TEXT, DARK_TEXT)).toBe(LIGHT_TEXT);
    expect(getContrastText('#E60028', '#0D0D0D', '#EAEAEA')).toBe('#EAEAEA');
  });

  it('works regardless of which token is lighter', () => {
    expect(getContrastText('#000000', DARK_TEXT, LIGHT_TEXT)).toBe(LIGHT_TEXT);
    expect(getContrastText('#FFFFFF', DARK_TEXT, LIGHT_TEXT)).toBe(DARK_TEXT);
  });

  it('handles 3-character hex shorthand', () => {
    expect(getContrastText('#FFF', LIGHT_TEXT, DARK_TEXT)).toBe(DARK_TEXT);
    expect(getContrastText('#000', LIGHT_TEXT, DARK_TEXT)).toBe(LIGHT_TEXT);
  });

  it('handles rgb color format', () => {
    expect(getContrastText('rgb(0, 0, 0)', LIGHT_TEXT, DARK_TEXT)).toBe(
      LIGHT_TEXT,
    );
    expect(getContrastText('rgb(255, 255, 255)', LIGHT_TEXT, DARK_TEXT)).toBe(
      DARK_TEXT,
    );
  });

  it('returns null for unparseable values', () => {
    expect(
      getContrastText(
        'linear-gradient(130deg, #9355E7 0%, #2E4AA3 60%)',
        LIGHT_TEXT,
        DARK_TEXT,
      ),
    ).toBeNull();
    expect(getContrastText('not-a-color', LIGHT_TEXT, DARK_TEXT)).toBeNull();
  });
});

describe('formatISONumber', () => {
  /** How the chart tooltips call it. */
  const tooltip = (value: number) =>
    formatISONumber(value, { fixedDecimals: true, compact: true });

  it('should never render a non-zero value as zero', () => {
    expect(tooltip(0.002)).toBe('0.002');
    expect(tooltip(0.013)).toBe('0.013');
    expect(tooltip(-0.002)).toBe('-0.002');
  });

  it('should keep two significant digits below one', () => {
    expect(tooltip(0.0025)).toBe('0.0025');
    expect(tooltip(0.00123)).toBe('0.0012');
  });

  it('should leave values from 0.01 up exactly as they were', () => {
    expect(tooltip(0.09)).toBe('0.09');
    expect(tooltip(0.5)).toBe('0.50');
    expect(tooltip(42.5)).toBe('42.50');
    // the compact separator is a narrow no-break space, hence the regex
    expect(tooltip(40000)).toMatch(/^40\.00\sk$/);
  });

  it('should still reserve 0 for the value zero', () => {
    expect(tooltip(0)).toBe('0');
  });

  it('should still fall back to exponential below the 0.001 floor', () => {
    expect(tooltip(0.0009)).toBe('9.00e-4');
  });

  it('should round in JS rather than leaning on Intl', () => {
    // Intl's rounding mode has not always been consistent across engines, so
    // the number it receives is already rounded and it only has to print.
    // Half-way cases go away from zero, both signs alike.
    expect(formatISONumber(0.125)).toBe('0.13');
    expect(formatISONumber(-0.125)).toBe('-0.13');
    expect(formatISONumber(0.00125)).toBe('0.0013');
    expect(formatISONumber(-0.00125)).toBe('-0.0013');
  });

  it('should clear float noise before it reaches the display', () => {
    expect(formatISONumber(1.005 - 1)).toBe('0.005');
    expect(formatISONumber(0.07 * 3)).toBe('0.21');
  });

  it('should bound the mantissa of float noise', () => {
    // Not all seventeen digits of 5.551115123125783e-17.
    expect(tooltip(0.1 + 0.2 - 0.3)).toBe('5.55e-17');
    expect(tooltip(Number.EPSILON)).toBe('2.22e-16');
  });

  it('should let the caller widen the mantissa', () => {
    expect(formatISONumber(0.1 + 0.2 - 0.3, { decimals: 4 })).toBe(
      '5.5511e-17',
    );
  });
});
