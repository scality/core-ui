import { getContrastText } from './utils';

const LIGHT_TEXT = '#EAEAEA';
const DARK_TEXT = '#000000';

describe('getContrastText', () => {
  it('returns textPrimary on dark backgrounds when textPrimary is light', () => {
    expect(getContrastText('#000000', LIGHT_TEXT, DARK_TEXT)).toBe(LIGHT_TEXT);
    expect(getContrastText('#1A1A1A', LIGHT_TEXT, DARK_TEXT)).toBe(LIGHT_TEXT);
    expect(getContrastText('#121219', LIGHT_TEXT, DARK_TEXT)).toBe(LIGHT_TEXT);
    expect(getContrastText('#2F4185', LIGHT_TEXT, DARK_TEXT)).toBe(LIGHT_TEXT);
  });

  it('returns textReverse on light backgrounds when textPrimary is light', () => {
    expect(getContrastText('#FFFFFF', LIGHT_TEXT, DARK_TEXT)).toBe(DARK_TEXT);
    expect(getContrastText('#F5F5F5', LIGHT_TEXT, DARK_TEXT)).toBe(DARK_TEXT);
    expect(getContrastText('#FCFCFC', LIGHT_TEXT, DARK_TEXT)).toBe(DARK_TEXT);
  });

  it('picks the text color with better contrast against a vivid background', () => {
    expect(getContrastText('#E9041E', LIGHT_TEXT, DARK_TEXT)).toBe(DARK_TEXT);
    expect(getContrastText('#E9041E', '#FFFFFF', '#000000')).toBe('#FFFFFF');
  });

  it('handles 3-character hex shorthand', () => {
    expect(getContrastText('#FFF', LIGHT_TEXT, DARK_TEXT)).toBe(DARK_TEXT);
    expect(getContrastText('#000', LIGHT_TEXT, DARK_TEXT)).toBe(LIGHT_TEXT);
  });

  it('handles hex without # prefix', () => {
    expect(getContrastText('000000', LIGHT_TEXT, DARK_TEXT)).toBe(LIGHT_TEXT);
    expect(getContrastText('FFFFFF', LIGHT_TEXT, DARK_TEXT)).toBe(DARK_TEXT);
  });

  it('returns null for non-hex values', () => {
    expect(
      getContrastText(
        'linear-gradient(130deg, #9355E7 0%, #2E4AA3 60%)',
        LIGHT_TEXT,
        DARK_TEXT,
      ),
    ).toBeNull();
    expect(getContrastText('not-a-color', LIGHT_TEXT, DARK_TEXT)).toBeNull();
    expect(
      getContrastText('rgb(255, 0, 0)', LIGHT_TEXT, DARK_TEXT),
    ).toBeNull();
  });
});
