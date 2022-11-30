const STATUS_CRITICAL = 'critical';
const STATUS_WARNING = 'warning';
const STATUS_NONE = 'none';
const STATUS_HEALTH = 'healthy';

type StatusType =
  | typeof STATUS_CRITICAL
  | typeof STATUS_WARNING
  | typeof STATUS_NONE
  | typeof STATUS_HEALTH;

// some common customized sortTypes
export function compareHealth(
  status1: StatusType,
  status2: StatusType,
): number | undefined {
  if (
    ![STATUS_WARNING, STATUS_CRITICAL, STATUS_NONE, STATUS_HEALTH].includes(
      status1,
    ) ||
    ![STATUS_WARNING, STATUS_CRITICAL, STATUS_NONE, STATUS_HEALTH].includes(
      status2,
    )
  ) {
    console.error('Invalid health status');
    return;
  }

  const weights = {};
  weights[STATUS_CRITICAL] = 3;
  weights[STATUS_WARNING] = 2;
  weights[STATUS_NONE] = 1;
  weights[STATUS_HEALTH] = 0;
  return weights[status1] === weights[status2]
    ? 0
    : weights[status1] > weights[status2]
    ? 1
    : -1;
}

export function convertRemToPixels(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
export type TableLocalType = 'en' | 'fr';

export type TableHeightKeyType = 'h32' | 'h40' | 'h48' | 'h64';

export type TableVariantType =
  | 'backgroundLevel1'
  | 'backgroundLevel2'
  | 'backgroundLevel3'
  | 'backgroundLevel4';

// in rem unit
export const tableRowHeight = {
  h32: '2.286', //1 line
  h40: '2.858', //2 line
  h48: '3.428', //2 line
  h64: '4.572', //3 line
};
