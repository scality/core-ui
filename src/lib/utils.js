export function mergeTheme(theme, defaultTheme) {
  return theme && theme.brand
    ? {
        ...defaultTheme.brand,
        ...theme.brand
      }
    : defaultTheme.brand;
}
