const STATUS_WARNING = 'warning';
const STATUS_CRITICAL = 'critical';
const STATUS_NONE = 'none';
const STATUS_HEALTH = 'healthy';

export const compareHealth = (status1, status2) => {
  const weights = {};
  weights[STATUS_CRITICAL] = 3;
  weights[STATUS_WARNING] = 2;
  weights[STATUS_NONE] = 1;
  weights[STATUS_HEALTH] = 0;

  return weights[status1] - weights[status2];
};
