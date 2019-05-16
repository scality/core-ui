export function mergeTheme(theme, defaultTheme) {
  return theme && theme.brand
    ? {
        ...defaultTheme.brand,
        ...theme.brand
      }
    : defaultTheme.brand;
}

export function Timer(callback, delay) {
  let timerId;
  let start;
  let remaining = delay;

  this.pause = () => {
    clearTimeout(timerId);
    remaining -= new Date() - start;
  };

  this.resume = () => {
    start = new Date();
    clearTimeout(timerId);
    timerId = setTimeout(callback, remaining);
  };

  this.clear = () => {
    clearTimeout(timerId);
  };

  this.resume();
}
