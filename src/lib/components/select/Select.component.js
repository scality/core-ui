//@flow
import React from "react";
import styled from "styled-components";
import Select from "react-select";
import type { Node } from "react";
import { lighten } from "polished";
import * as defaultTheme from "../../style/theme";
import { mergeTheme } from "../../utils";

export type Item = {
  label: string,
  value: string | number
};
type Items = Array<Item>;

type Props = {
  options: Items,
  optionRenderer?: any => Node
};

const SelectContainer = styled.div`
  .sc-select__control {
    border-radius: 4px;
    border: 1px solid ${defaultTheme.gray};
    height: auto;

    &.sc-select__control--is-focused {
      border-color: ${props => mergeTheme(props.theme, defaultTheme).primary};
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
        0 0 0 1px rgba(0, 126, 255, 0.1);
      outline: none;
    }
    .sc-select__indicator {
      color: ${defaultTheme.grayLight};
      &.sc-select__dropdown-indicator:hover {
        color: ${props => mergeTheme(props.theme, defaultTheme).primary};
      }
      &.sc-select__clear-indicator:hover {
        color: ${props => mergeTheme(props.theme, defaultTheme).danger};
      }
    }
    .sc-select__multi-value__remove {
      color: ${defaultTheme.grayLight};
      background-color: ${defaultTheme.grayLightest};
      &:hover {
        color: ${props => mergeTheme(props.theme, defaultTheme).danger};
        background-color: ${defaultTheme.grayLightest};
      }
    }
    .sc-select__multi-value__label {
      color: ${props => mergeTheme(props.theme, defaultTheme).primary};
      background-color: ${defaultTheme.grayLightest};
      vertical-align: initial;
    }
  }
  .sc-select__menu {
    border: 1px solid ${defaultTheme.gray};
    box-sizing: border-box;
    overflow: hidden;

    .sc-select__option {
      background-color: ${defaultTheme.white};
      &.sc-select__option--is-focused {
        background-color: ${props =>
          lighten(0.3, mergeTheme(props.theme, defaultTheme).primary)};
      }
      &.sc-select__option--is-selected {
        color: ${props => mergeTheme(props.theme, defaultTheme).primary};
        font-weight: ${defaultTheme.fontWeight.bold};
      }
    }
  }
`;

const defaultOptionRenderer = ({
  focusedOption,
  focusOption,
  key,
  labelKey,
  option,
  selectValue,
  style,
  valueArray
}) => {
  const { disabled, className, title, ...rest } = option;
  const events = disabled
    ? {}
    : {
        onClick: () => selectValue(option),
        onMouseEnter: () => focusOption(option)
      };

  return (
    <div
      className="sc-select-option"
      key={key}
      style={style}
      title={title}
      {...events}
      {...rest}
    >
      {option[labelKey]}
    </div>
  );
};

function SelectBox({ options, optionRenderer, ...rest }: Props) {
  return (
    <SelectContainer>
      <Select
        className="sc-select"
        classNamePrefix="sc-select"
        options={options}
        optionRenderer={optionRenderer || defaultOptionRenderer}
        {...rest}
      />
    </SelectContainer>
  );
}

export default SelectBox;
