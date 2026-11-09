import { compareHealth, getTableStatus } from './TableUtils';
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

describe('getTableStatus', () => {
  // Each input is the status/fetchStatus pair that react-query 3.39.3 or
  // @tanstack/query-core 5.59.0 reports for the named query state.
  it.each([
    ['disabled', { status: 'idle' }, 'idle'],
    ['first load in flight', { status: 'loading' }, 'loading'],
    ['loaded or refetching', { status: 'success' }, 'success'],
    ['failed', { status: 'error' }, 'error'],
  ] as const)(
    'passes a react-query v3 %s query through',
    (_, query, expected) => {
      expect(getTableStatus(query)).toBe(expected);
    },
  );

  it.each([
    ['disabled', { status: 'pending', fetchStatus: 'idle' }, 'idle'],
    [
      'first load in flight',
      { status: 'pending', fetchStatus: 'fetching' },
      'loading',
    ],
    [
      'first load paused offline',
      { status: 'pending', fetchStatus: 'paused' },
      'loading',
    ],
    [
      'background refetch in flight',
      { status: 'success', fetchStatus: 'fetching' },
      'success',
    ],
    ['failed refetch', { status: 'error', fetchStatus: 'idle' }, 'error'],
  ] as const)('maps a TanStack v5 %s query', (_, query, expected) => {
    expect(getTableStatus(query)).toBe(expected);
  });

  it('treats a pending query without fetchStatus as loading', () => {
    expect(getTableStatus({ status: 'pending' })).toBe('loading');
  });

  it('accepts a whole query result, not only its status fields', () => {
    const query = {
      status: 'pending' as const,
      fetchStatus: 'idle' as const,
      data: undefined,
      isFetching: false,
    };
    expect(getTableStatus(query)).toBe('idle');
  });

  it('rejects a status no query library reports at the type level', () => {
    // @ts-expect-error 'refreshing' is neither a react-query nor a TanStack status
    const mapUnknown = () => getTableStatus({ status: 'refreshing' });
    expect(mapUnknown).toBeDefined();
  });
});
