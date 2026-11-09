import {
  compareHealth,
  resolveLegacyTableView,
  resolveTableView,
} from './TableUtils';
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
it('should return undefined for the unknown status', () => {
  const consoleErrorMockHandle = jest.spyOn(console, 'error').mockImplementation(() => {});
  const result = compareHealth('invalidStatus' as any, 'healthy');
  const result2 = compareHealth('none', 'invalidStatus' as any);
  expect(consoleErrorMockHandle).toHaveBeenCalled();
  consoleErrorMockHandle.mockRestore();
  expect(result).toEqual(undefined);
  expect(result2).toEqual(undefined);
});

describe('resolveTableView', () => {
  const rows = [{ name: 'vol-1' }, { name: 'vol-2' }];
  const failure = new Error('Request failed');
  const base = { visibleRowCount: 0, hasSettled: true };

  it.each([
    ['no result yet, loading not given', { data: undefined }, 'loader'],
    [
      'no result yet, request in flight',
      { data: undefined, loading: true },
      'loader',
    ],
    [
      'no result yet, nothing requested',
      { data: undefined, loading: false },
      'idle',
    ],
    [
      'no result yet, request failed',
      { data: undefined, loading: false, error: failure },
      'error',
    ],
    [
      'empty array during the first request',
      { data: [], loading: true, hasSettled: false },
      'loader',
    ],
    [
      'empty array refreshing after a settled request',
      { data: [], loading: true },
      'empty',
    ],
    ['empty result', { data: [] }, 'empty'],
    [
      'empty result whose last request failed',
      { data: [], error: failure },
      'error',
    ],
    ['rows', { data: rows, visibleRowCount: 2 }, 'rows'],
    [
      'rows refreshing',
      { data: rows, visibleRowCount: 2, loading: true, hasSettled: false },
      'rows',
    ],
    [
      'rows whose refresh failed',
      { data: rows, visibleRowCount: 2, error: failure },
      'error',
    ],
    ['rows hidden by the filters', { data: rows, visibleRowCount: 0 }, 'empty'],
  ] as const)('%s: %s', (_, input, expected) => {
    expect(resolveTableView({ ...base, ...input })).toBe(expected);
  });
});

describe('resolveLegacyTableView', () => {
  it.each([
    ['idle', true, 0, 'idle'],
    ['loading', false, 2, 'loader'],
    ['error', false, 2, 'error'],
    ['success', true, 0, 'empty'],
    ['success', false, 0, 'empty'],
    ['success', false, 2, 'rows'],
    ['pending', true, 0, 'error'],
    ['pending', false, 2, 'rows'],
  ])(
    'status %s, data empty %s, %s visible rows: %s',
    (status, isDataEmpty, visibleRowCount, view) => {
      expect(
        resolveLegacyTableView({
          status: status as any,
          isDataEmpty,
          visibleRowCount,
        }),
      ).toBe(view);
    },
  );
});
