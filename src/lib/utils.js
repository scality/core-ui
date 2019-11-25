import * as defaultTheme from "./style/theme";

function mergeTheme(theme, defaultTheme) {
  return theme && theme.brand
    ? {
        ...defaultTheme.brand,
        ...theme.brand
      }
    : defaultTheme.brand;
}

const getKey = (key, props) => typeof key === 'function' ? key(props) : key;

export const getThemeProp = (key, defaultKey = null) => props => {
  if (defaultKey && defaultKey(props)) return defaultKey(props)

  const themeObj = mergeTheme(props.theme, defaultTheme);
  return themeObj[getKey(key, props)];
}
