//@flow
import React from 'react';
import styled from 'styled-components';
import { useTableContext } from './Tablev2.component';
import SearchInput from '../searchinput/SearchInput.component';
import { BasicText } from '../text/Text.component';
import { spacing } from '../../style/theme.js';

export type DisplayedName = {
  plural: string,
  singular: string,
};

export type SearchProps = {
  onChange: (string) => void,
  value?: string,
  displayTotalOf?: boolean,
  displayedName?: DisplayedName,
  locale?: 'en' | 'fr',
};

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TextContainer = styled(BasicText)`
  display: flex;
  flex-direction: column;
  margin-right: ${spacing.sp8};
`;

const ResultContainer = styled(BasicText)`
  font-weight: bold;
`;

const translations = {
  en: {
    search: 'Search',
    total: 'Total',
  },
  fr: {
    search: `Rechercher`,
    total: `Total`,
  },
};

export default function TableSearch(props: SearchProps) {
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
      {displayedName && displayTotalOf && (
        <TextContainer>
          <span>{translations[locale].total} :</span>{' '}
          <ResultContainer>
            {totalDispayedRows}{' '}
            {totalDispayedRows > 1
              ? displayedName.plural
              : totalDispayedRows === 1 && displayedName.singular}
          </ResultContainer>
        </TextContainer>
      )}
      <SearchInput
        value={value}
        placeholder={translations[locale].search}
        disableToggle
        onChange={(evt) => {
          if (typeof onChange === 'function') {
            //$FlowFixMe
            onChange(evt.target.value);
          }
        }}
        {...rest}
      />
    </SearchContainer>
  );
}
