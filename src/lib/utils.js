import * as defaultTheme from "./style/theme";

export function mergeTheme(theme, defaultTheme) {
  return theme && theme.brand
    ? {
        ...defaultTheme.brand,
        ...theme.brand,
      }
    : defaultTheme.brand;
}

export const getTheme = (props) => mergeTheme(props.theme, defaultTheme);

export const getThemePropSelector = (key) => (props) => getTheme(props)[key];

export const getThemeVariantSelector = () => (props) =>
  getTheme(props)[props.variant];

export const getFontFace = (props) =>
  props.fontFace ? props.fontFace : defaultTheme.fontFace;
