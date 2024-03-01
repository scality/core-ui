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

type TableMessagesType = 'error' | 'loading' | 'noResult';

export const translatedMessages = (
  type: TableMessagesType,
  entityName:
    | {
        en: { singular: string; plural: string };
        fr: { singular: string; plural: string };
      }
    | undefined,
  locale?: TableLocalType,
) => {
  if (type === 'error') {
    if (locale === 'fr') {
      return `Erreur lors du chargement des ${
        entityName ? entityName.fr.plural : 'données'
      }, veuillez rafraîchir la page.`;
    }
    return `An error occured while loading ${
      entityName ? ` the ${entityName.en.plural}` : 'data'
    }, please refresh the
    page.`;
  }
  if (type === 'loading') {
    if (locale === 'fr') {
      return `Chargement des ${
        entityName ? entityName[locale].plural : 'données'
      }...`;
    }
    return `Loading ${entityName ? entityName.en.plural : 'data'}...`;
  }
  if (type === 'noResult') {
    if (locale === 'fr') {
      return `Aucun ${
        entityName ? entityName[locale].singular : 'résultat'
      } trouvé`;
    }
    return `No ${entityName ? entityName.en.plural : 'results'} found`;
  }

  return '';
};
