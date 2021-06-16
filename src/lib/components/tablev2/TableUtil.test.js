import { compareHealth } from './TableUtil.js';

it('should return 0 for the equal status', () => {
  const result = compareHealth('healthy', 'healthy');
  expect(result).toEqual(0);
});

it('should return -1 or 1 to sort the status', () => {
  const result = compareHealth('critical', 'healthy');
  const result2 = compareHealth('warning', 'critical');
  expect(result).toEqual(1);
  expect(result2).toEqual(-1);
});

it('should return undefine for the unknown status', () => {
  const result = compareHealth('invalidStatus', 'healthy');
  const result2 = compareHealth('none', 'invalidStatus');
  expect(result).toEqual(undefined);
  expect(result2).toEqual(undefined);
});
