import { getContrastText } from './utils';

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
    expect(getContrastText('rgb(0, 0, 0)', LIGHT_TEXT, DARK_TEXT)).toBe(LIGHT_TEXT);
    expect(getContrastText('rgb(255, 255, 255)', LIGHT_TEXT, DARK_TEXT)).toBe(DARK_TEXT);
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
