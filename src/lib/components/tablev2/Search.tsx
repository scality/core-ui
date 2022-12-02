import React from 'react';
import styled from 'styled-components';
import { useTableContext } from './Tablev2.component';
import { SearchInput } from '../searchinput/SearchInput.component';
import { Props } from '../searchinput/SearchInput.component';
import { BasicText } from '../text/Text.component';
import { TableLocalType } from './TableUtils';
import { TableItemCount } from './Tablestyle';

export type DisplayedName = {
  plural: string;
  singular: string;
};

export type SearchProps = {
  onChange: (arg0: string) => void;
  value?: string;
  displayTotalOf?: boolean;
  displayedName?: DisplayedName;
  locale?: TableLocalType;
} & Omit<Props, 'disableToggle'>;

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

export function TableSearch(props: SearchProps) {
  const {
    onChange,
    value = '',
    displayTotalOf = true,
    displayedName,
    locale = 'en',
    ...rest
  } = props;
  const { setGlobalFilter, rows, preGlobalFilteredRows } = useTableContext();
  const totalDispayedRows = rows.length;
  React.useEffect(() => {
    setGlobalFilter(value);
  }, [value, setGlobalFilter, preGlobalFilteredRows]);
  return (
    <SearchContainer>
      {displayTotalOf && (
        <TableItemCount>
          <span>{translations[locale].total}</span>
          <ResultContainer>
            {totalDispayedRows}{' '}
            {displayedName
              ? totalDispayedRows > 1
                ? displayedName.plural
                : totalDispayedRows === 1 && displayedName.singular
              : ''}
          </ResultContainer>
        </TableItemCount>
      )}
      <SearchInput
        value={value}
        placeholder={translations[locale].search}
        disableToggle
        onChange={(evt) => {
          if (typeof onChange === 'function') {
            // @ts-ignore
            onChange(evt.target.value);
          }
        }}
        {...rest}
      />
    </SearchContainer>
  );
}
