export const STATUS_CRITICAL = 'critical';
export const STATUS_WARNING = 'warning';
export const STATUS_NONE = 'none';
export const STATUS_HEALTH = 'healthy';
export const STATUS_UNKNOWN = 'unknown';

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

export const TABLE_STATUSES = ['idle', 'loading', 'error', 'success'] as const;

export type TableStatus = (typeof TABLE_STATUSES)[number];

export const isTableStatus = (value: unknown): value is TableStatus =>
  (TABLE_STATUSES as readonly unknown[]).includes(value);

/**
 * The fields of a react-query v3 or TanStack Query v5 result that
 * `getTableStatus` reads, so a whole query result can be passed to it.
 */
export type TableQueryState = {
  status: TableStatus | 'pending';
  fetchStatus?: 'fetching' | 'paused' | 'idle';
};

/**
 * Turns a react-query v3 or TanStack Query v5 result into the Table's `status`,
 * for a table fed by a query; a table fed by a redux store maps its flags by
 * hand, as the Table guideline shows.
 *
 * v3 statuses already match and pass through. v5 reports `'pending'` until the
 * first response: it becomes `'loading'` while a request is in flight or paused
 * offline, and `'idle'` when nothing is fetching, i.e. a disabled query. Both
 * versions keep `'success'` during a background refetch, so the rows stay.
 *
 * @example
 * const usersQuery = useQuery({ queryKey: ['users'], queryFn: fetchUsers });
 * <Table status={getTableStatus(usersQuery)} data={usersQuery.data ?? []} ... />
 */
export const getTableStatus = ({
  status,
  fetchStatus,
}: TableQueryState): TableStatus => {
  if (status === 'pending') {
    return fetchStatus === 'idle' ? 'idle' : 'loading';
  }
  return status;
};

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

type TableMessagesType = 'error' | 'loading' | 'idle' | 'noResult';

export const translatedMessages = (
  type: TableMessagesType,
  entityName?: {
    en: { singular: string; plural: string };
    fr?: { singular: string; plural: string };
  },
  locale?: TableLocalType,
) => {
  if (type === 'error') {
    if (locale === 'fr') {
      return `Erreur lors du chargement des ${
        entityName?.fr?.plural || 'données'
      }, veuillez rafraîchir la page.`;
    }
    return `An error occurred while loading ${
      entityName ? `the ${entityName.en.plural}` : 'data'
    }, please refresh the
    page.`;
  }
  if (type === 'loading' || type === 'idle') {
    if (locale === 'fr') {
      return `Chargement des ${entityName?.fr?.plural || 'données'}...`;
    }
    return `Loading ${entityName?.en.plural || 'data'}...`;
  }
  if (type === 'noResult') {
    if (locale === 'fr') {
      return `Aucun ${entityName?.fr?.singular || 'résultat'} trouvé`;
    }
    return `No ${entityName?.en.plural || 'results'} found`;
  }

  return '';
};
