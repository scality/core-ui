//@flow
import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import type { Node } from 'react';
import * as defaultTheme from '../../style/theme';
import { getThemePropSelector } from '../../utils';

export type Item = {
  label: string,
  value: string | number,
};
type Items = Array<Item>;

type Props = {
  options: Items,
  formatOptionLabel?: (any) => Node,
};

const SelectContainer = styled.div`
  font-size: ${defaultTheme.fontSize.base};
  .sc-select__control {
    background-color: ${getThemePropSelector('backgroundLevel1')};
    border-radius: 4px;
    border: 1px solid ${getThemePropSelector('border')};
    height: auto;

    .sc-select__placeholder,
    .sc-select__single-value {
      color: ${getThemePropSelector('textSecondary')};
    }
    &.sc-select__control--is-focused {
      border-color: ${getThemePropSelector('selectedActive')};
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
        0 0 0 1px rgba(0, 126, 255, 0.1);
      outline: none;
    }
    .sc-select__indicator {
      color: ${getThemePropSelector('textSecondary')};
      &.sc-select__dropdown-indicator:hover {
        color: ${getThemePropSelector('selectedActive')};
      }
      &.sc-select__clear-indicator:hover {
        color: ${defaultTheme.gray};
      }
    }
    .sc-select__multi-value__remove {
      border-radius: 0;
      color: ${getThemePropSelector('textSecondary')};
      background-color: ${getThemePropSelector('backgroundLevel1')};
      &:hover {
        color: ${defaultTheme.gray};
      }
    }
    .sc-select__multi-value__label {
      border-radius: 0;
      color: ${getThemePropSelector('selectedActive')};
      background-color: ${getThemePropSelector('backgroundLevel1')};
      vertical-align: initial;
    }
  }
  .sc-select__menu {
    background-color: ${getThemePropSelector('backgroundLevel1')};
    color: ${getThemePropSelector('textSecondary')};
    border: 1px solid ${getThemePropSelector('selectedActive')};
    box-sizing: border-box;
    overflow: hidden;
    z-index: ${defaultTheme.zIndex.dropdown};
    .sc-select__option {
      &.sc-select__option--is-focused {
        background-color: ${getThemePropSelector('backgroundLevel1')};
      }
      &.sc-select__option--is-selected {
        background-color: ${getThemePropSelector('backgroundLevel1')};
        color: ${getThemePropSelector('selectedActive')};
        font-weight: ${defaultTheme.fontWeight.bold};
      }
    }
  }
`;

const defaultFormatOptionLabel = ({ label, ...rest }) => (
  <div className="sc-select-option-label" {...rest}>
    {label}
  </div>
);

function SelectBox({ options, formatOptionLabel, ...rest }: Props) {
  return (
    <SelectContainer className="sc-select-container">
      <Select
        className="sc-select"
        classNamePrefix="sc-select"
        options={options}
        formatOptionLabel={formatOptionLabel || defaultFormatOptionLabel}
        {...rest}
      />
    </SelectContainer>
  );
}

export default SelectBox;
