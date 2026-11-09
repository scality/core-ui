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
 * What fills the table body: a stand-in for the rows (`idle`, `loader`,
 * `error`) or an answer (`empty`, `rows`).
 */
export type TableView = 'idle' | 'loader' | 'error' | 'empty' | 'rows';

/**
 * Decides what the table body shows from the facts its caller has: the data,
 * whether a request is in flight and whether the last one failed. Rows stay
 * on screen while a request runs; a failed request shows the error.
 */
export const resolveTableView = ({
  data,
  visibleRowCount,
  loading,
  error,
  hasSettled,
}: {
  /** `undefined` until a first result arrives. */
  data: readonly unknown[] | undefined;
  /** Rows left once search and filters apply. */
  visibleRowCount: number;
  loading?: boolean;
  error?: unknown;
  /** Whether a request has completed in this table: `loading` went from `true` to not. */
  hasSettled: boolean;
}): TableView => {
  if (data === undefined) {
    // No `loading` at all most likely means a query whose caller only passed
    // `data`: assume it is loading rather than claim anything, unless it
    // reports an error.
    if (loading ?? !error) {
      return 'loader';
    }
    return error ? 'error' : 'idle';
  }
  // `data ?? []` and `initialData: []` hand over an empty array before the
  // first answer; until a request has settled it cannot mean "empty".
  if (data.length === 0 && loading && !hasSettled) {
    return 'loader';
  }
  if (error) {
    return 'error';
  }
  return visibleRowCount === 0 ? 'empty' : 'rows';
};

/**
 * What the deprecated `status` prop shows, unchanged from 0.235.0 apart from
 * `'idle'`: every status but `'success'` replaces the rows, and an unknown
 * value with no data shows the error.
 */
export const resolveLegacyTableView = ({
  status,
  isDataEmpty,
  visibleRowCount,
}: {
  status: TableStatus;
  isDataEmpty: boolean;
  visibleRowCount: number;
}): TableView => {
  if (status === 'idle') {
    return 'idle';
  }
  if (status === 'loading') {
    return 'loader';
  }
  if (status === 'error' || (!isTableStatus(status) && isDataEmpty)) {
    return 'error';
  }
  return visibleRowCount === 0 ? 'empty' : 'rows';
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
