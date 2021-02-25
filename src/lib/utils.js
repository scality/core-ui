import * as defaultTheme from "./style/theme";

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

export const getThemeVariantSelector = () => (props) =>
  getTheme(props)[props.variant];
