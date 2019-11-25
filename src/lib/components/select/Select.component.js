//@flow
import React from "react";
import styled from "styled-components";
import Select from "react-select";
import type { Node } from "react";
import * as defaultTheme from "../../style/theme";
import { getThemeProp } from "../../utils";

export type Item = {
  label: string,
  value: string | number
};
type Items = Array<Item>;

type Props = {
  options: Items,
  formatOptionLabel?: any => Node
};

const SelectContainer = styled.div`
  .sc-select__control {
    background-color: ${props =>
      getThemeProp('backgroundContrast1')};
    border-radius: 4px;
    border: 1px solid ${getThemeProp('text')};
    height: auto;

    .sc-select__placeholder,
    .sc-select__single-value {
      color: ${getThemeProp('text')};
    }
    &.sc-select__control--is-focused {
      border-color: ${getThemeProp('primary')};
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
        0 0 0 1px rgba(0, 126, 255, 0.1);
      outline: none;
    }
    .sc-select__indicator {
      color: ${getThemeProp('text')};
      &.sc-select__dropdown-indicator:hover {
        color: ${getThemeProp('primary')};
      }
      &.sc-select__clear-indicator:hover {
        color: ${getThemeProp('danger')};
      }
    }
    .sc-select__multi-value__remove {
      border-radius: 0;
      color: ${getThemeProp('text')};
      background-color: ${props =>
        getThemeProp('backgroundContrast2')};
      &:hover {
        color: ${getThemeProp('danger')};
      }
    }
    .sc-select__multi-value__label {
      border-radius: 0;
      color: ${getThemeProp('primary')};
      background-color: ${props =>
        getThemeProp('backgroundContrast2')};
      vertical-align: initial;
    }
  }
  .sc-select__menu {
    background-color: ${props =>
      getThemeProp('backgroundContrast1')};
    color: ${getThemeProp('text')};
    border: 1px solid ${getThemeProp('primary')};
    box-sizing: border-box;
    overflow: hidden;
    z-index: ${defaultTheme.zIndex.dropdown};
    .sc-select__option {
      &.sc-select__option--is-focused {
        background-color: ${props =>
          getThemeProp('backgroundContrast2')};
      }
      &.sc-select__option--is-selected {
        background-color: ${props =>
          getThemeProp('backgroundContrast1')};
        color: ${getThemeProp('primary')};
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
