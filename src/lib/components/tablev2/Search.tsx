import React from 'react';
import styled from 'styled-components';
import { useTableContext } from './Tablev2.component';
import { SearchInput } from '../searchinput/SearchInput.component';
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
} & Omit<Props, 'disableToggle' | 'onChange'>;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
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
  min-width: 4.3rem;
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
  React.useEffect(() => {
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
        disableToggle
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
