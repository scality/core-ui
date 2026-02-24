import { getContrastText } from './utils';

describe('getContrastText', () => {
  it('returns white text for dark backgrounds', () => {
    expect(getContrastText('#000000')).toBe('#FFFFFF');
    expect(getContrastText('#1A1A1A')).toBe('#FFFFFF');
    expect(getContrastText('#121219')).toBe('#FFFFFF'); // darkRebrand navbarBackground
    expect(getContrastText('#2F4185')).toBe('#FFFFFF'); // darkRebrand buttonPrimary
  });

  it('returns black text for light backgrounds', () => {
    expect(getContrastText('#FFFFFF')).toBe('#000000');
    expect(getContrastText('#F5F5F5')).toBe('#000000'); // light brandSecondary
    expect(getContrastText('#FCFCFC')).toBe('#000000'); // artescaLight navbarBackground
    expect(getContrastText('#ABB4F5')).toBe('#000000'); // artescaLight buttonPrimary
  });

  it('returns white text for SG red (#E9041E)', () => {
    expect(getContrastText('#E9041E')).toBe('#FFFFFF');
  });

  it('handles 3-character hex shorthand', () => {
    expect(getContrastText('#FFF')).toBe('#000000');
    expect(getContrastText('#000')).toBe('#FFFFFF');
  });

  it('handles hex without # prefix', () => {
    expect(getContrastText('000000')).toBe('#FFFFFF');
    expect(getContrastText('FFFFFF')).toBe('#000000');
  });

  it('returns null for CSS gradients', () => {
    expect(
      getContrastText('linear-gradient(130deg, #9355E7 0%, #2E4AA3 60%)'),
    ).toBeNull();
  });

  it('returns null for invalid color strings', () => {
    expect(getContrastText('not-a-color')).toBeNull();
    expect(getContrastText('rgb(255, 0, 0)')).toBeNull();
  });
});
