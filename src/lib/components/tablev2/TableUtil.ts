const STATUS_CRITICAL = 'critical';
const STATUS_WARNING = 'warning';
const STATUS_NONE = 'none';
const STATUS_HEALTH = 'healthy';
// some common customized sortTypes
export function compareHealth(
  status1: STATUS_WARNING | STATUS_CRITICAL | STATUS_NONE | STATUS_HEALTH,
  status2: STATUS_WARNING | STATUS_CRITICAL | STATUS_NONE | STATUS_HEALTH,
): number {
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