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
 * What fills the table body. `idle`, `loader` and `error` stand in for the
 * rows; `empty`, `noMatch` and `rows` are an answer.
 */
export type TableBodyKind =
  'idle' | 'loader' | 'error' | 'empty' | 'noMatch' | 'rows';

/**
 * What the table shows: the body, plus the two marks an answer can carry while
 * a request is in flight (`refreshing`) or after one failed with rows on screen
 * (`stale`).
 */
export type TableView = {
  body: TableBodyKind;
  refreshing: boolean;
  stale: boolean;
};

const standIn = (body: TableBodyKind): TableView => ({
  body,
  refreshing: false,
  stale: false,
});

/**
 * Decides what the table shows from the facts its caller has: the data, whether
 * a request is in flight and whether the last one failed. Rows already loaded
 * always stay; a refresh or a failed refresh only marks them.
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
    // `data`: assume it is loading rather than claim anything.
    if (loading ?? true) {
      return standIn('loader');
    }
    return standIn(error ? 'error' : 'idle');
  }
  if (data.length === 0) {
    // `data ?? []` and `initialData: []` hand over an empty array before the
    // first answer; until a request has settled it cannot mean "empty".
    if (loading && !hasSettled) {
      return standIn('loader');
    }
    if (error) {
      return standIn('error');
    }
    return { body: 'empty', refreshing: Boolean(loading), stale: false };
  }
  return {
    body: visibleRowCount === 0 ? 'noMatch' : 'rows',
    refreshing: Boolean(loading),
    stale: Boolean(error),
  };
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
    return standIn('idle');
  }
  if (status === 'loading') {
    return standIn('loader');
  }
  if (status === 'error' || (!isTableStatus(status) && isDataEmpty)) {
    return standIn('error');
  }
  return standIn(visibleRowCount === 0 ? 'empty' : 'rows');
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

type TableMessagesType =
  | 'error'
  | 'loading'
  | 'idle'
  | 'noResult'
  | 'noMatch'
  | 'errorWithRetry'
  | 'refreshError'
  | 'refreshing'
  | 'retry';

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
  if (type === 'noMatch') {
    if (locale === 'fr') {
      return `Aucun ${entityName?.fr?.singular || 'résultat'} correspondant`;
    }
    return `No matching ${entityName?.en.plural || 'results'}`;
  }
  if (type === 'errorWithRetry') {
    if (locale === 'fr') {
      return `Erreur lors du chargement des ${entityName?.fr?.plural || 'données'}.`;
    }
    return `An error occurred while loading ${
      entityName ? `the ${entityName.en.plural}` : 'data'
    }.`;
  }
  if (type === 'refreshError') {
    if (locale === 'fr') {
      return `Impossible d'actualiser les ${
        entityName?.fr?.plural || 'données'
      }. Affichage des dernières données chargées.`;
    }
    return `Could not refresh ${
      entityName ? `the ${entityName.en.plural}` : 'data'
    }. Showing the last loaded data.`;
  }
  if (type === 'refreshing') {
    if (locale === 'fr') {
      return `Actualisation des ${entityName?.fr?.plural || 'données'}`;
    }
    return `Refreshing ${entityName?.en.plural || 'data'}`;
  }
  if (type === 'retry') {
    return locale === 'fr' ? 'Réessayer' : 'Retry';
  }

  return '';
};
