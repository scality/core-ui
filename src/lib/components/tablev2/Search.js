//@flow
import React from 'react';
import styled from 'styled-components';
import { useTableContext } from './Tablev2.component';
import SearchInput from '../searchinput/SearchInput.component';
import { BasicText } from '../text/Text.component';
import { spacing } from '../../style/theme.js';

export type SearchProps = {
  onChange: (string) => void,
  value: string,
  displayTotalOf?: boolean,
  displayedName?: string,
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
    value,
    displayTotalOf = true,
    displayedName = '',
    locale = 'en',
  } = props;
  const { setGlobalFilter, rows } = useTableContext();

  const totalDispayedRows = rows.length;

  React.useEffect(() => {
    setGlobalFilter(value);
  }, [value, setGlobalFilter]);

  return (
    <SearchContainer>
      {displayTotalOf && (
        <TextContainer>
          <span>{translations[locale].total} :</span> {totalDispayedRows}{' '}
          {displayedName}
        </TextContainer>
      )}
      <SearchInput
        value={value}
        placeholder={translations[locale].search}
        disableToggle
        onChange={(evt) => {
          //$FlowFixMe
          onChange(evt.target.value);
        }}
      />
    </SearchContainer>
  );
}
