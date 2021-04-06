// @flow
export const LOADER_SIZE = {
  smaller: "smaller",
  small: "small",
  base: "base",
  large: "large",
  larger: "larger",
  huge: "huge",
  massive: "massive",
};
export type Size =
  | "smaller"
  | "small"
  | "base"
  | "large"
  | "larger"
  | "huge"
  | "massive";

// Replace the "success" by "health", but keep the key in the color-palette for the moment.
export type Variant =
  | "base"
  | "secondary"
  | "healthy"
  | "warning"
  | "danger"
  | "success"
  | "secondaryDark1";
