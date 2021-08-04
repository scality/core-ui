// @flow
export const LOADER_SIZE = {
  smaller: 'smaller',
  small: 'small',
  base: 'base',
  large: 'large',
  larger: 'larger',
  huge: 'huge',
  massive: 'massive',
};
export type Size =
  | 'smaller'
  | 'small'
  | 'base'
  | 'large'
  | 'larger'
  | 'huge'
  | 'massive';

export type Variant =
  | 'base'
  | 'secondary'
  | 'healthy'
  | 'warning'
  | 'danger'
  | 'success'
  | 'statusHealthy'
  | 'statusWarning'
  | 'statusCritical'
  | 'infoPrimary'
  | 'infoSecondary'
  | 'secondaryDark1';
