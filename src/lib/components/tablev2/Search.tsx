import styled from 'styled-components';
import { useEffect } from 'react';
import { useTableContext } from './Tablev2.component';
import { SearchInput } from '../searchinput/SearchInput.component';
import { convertSizeToRem } from '../inputv2/inputv2';
import { Props } from '../searchinput/SearchInput.component';
import { BasicText } from '../text/Text.component';
import { TableLocalType } from './TableUtils';
import { spacing } from '../../spacing';

export type DisplayedName = {
  plural: string;
  singular: string;
};

export type SearchProps = {
  onChange: (arg0: string) => void;
  value?: string;
  locale?: TableLocalType;
  totalCount?: number;
} & Omit<Props, 'onChange'>;

// Wide enough for "Total:" over a count and its entity name without reflowing as the
// count changes width.
const COUNT_MIN_WIDTH = '4.3rem';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  /* The count plus its gap plus the search box's own floor. Without a floor here this
     wrapper's automatic minimum is its min-content, which includes the box's full
     max-content -- so it never shrinks and the box can never use its max-width: 100%.
     With 0 instead it shrinks past its content and the box slides under whatever sits
     to its right; stopping at the content floor makes the row overflow instead, which
     is the visible signal that the toolbar has to adapt. */
  min-width: calc(
    ${COUNT_MIN_WIDTH} + ${spacing.r8} + ${convertSizeToRem('1/2')}
  );
`;

const ResultContainer = styled(BasicText)`
  font-weight: bold;
`;
const translations = {
  en: {
    search: 'Search',
    total: 'Total: ',
  },
  fr: {
    search: `Rechercher`,
    total: `Total : `,
  },
};
const TableItemCountContainer = styled(BasicText)`
  display: flex;
  flex-direction: column;
  margin-right: ${spacing.r8};
  min-width: ${COUNT_MIN_WIDTH};
`;
export const TableItemCount = ({
  entity,
  count,
  locale,
}: {
  entity: { singular: string; plural: string };
  count: number;
  locale: 'en' | 'fr';
}) => {
  return (
    <TableItemCountContainer>
      <span>{translations[locale].total}</span>
      <ResultContainer>
        {count}{' '}
        {count > 1
          ? entity.plural
          : (count === 1 || count === 0) && entity.singular}
      </ResultContainer>
    </TableItemCountContainer>
  );
};

export function TableSearch(props: SearchProps) {
  const { onChange, value = '', locale = 'en', totalCount, ...rest } = props;
  const {
    setGlobalFilter,
    rows,
    preGlobalFilteredRows,
    entityName = { en: { singular: 'result', plural: 'results' } },
  } = useTableContext();
  const totalDispayedRows = totalCount ? totalCount : rows.length;
  useEffect(() => {
    setGlobalFilter(value);
  }, [value, setGlobalFilter, preGlobalFilteredRows]);
  return (
    <SearchContainer>
      <TableItemCount
        entity={entityName[locale] || entityName.en}
        count={totalDispayedRows}
        locale={locale}
      ></TableItemCount>

      <SearchInput
        value={value}
        placeholder={translations[locale].search}
        size="1"
        onChange={(evt) => {
          if (typeof onChange === 'function') {
            onChange(evt.target.value);
          }
        }}
        {...rest}
      />
    </SearchContainer>
  );
}
