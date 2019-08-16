//@flow
import React from "react";
import styled from "styled-components";
import Select from "react-virtualized-select";
import * as defaultTheme from "../../style/theme";
import { mergeTheme } from "../../utils";
import { lighten } from "polished";

export type Item = {
  label: string,
  value: string | number
};
type Items = Array<Item>;

type Props = {
  options: Items
};

const SelectContainer = styled.div`
  .Select-control {
    border-radius: 4px;
    border: 1px solid ${defaultTheme.gray};
    height: auto;
  }

  .Select.is-focused > .Select-control {
    border-color: ${props => mergeTheme(props.theme, defaultTheme).primary};
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 0 1px rgba(0, 126, 255, 0.1);
    outline: none;
  }

  .VirtualizedSelectFocusedOption {
    background-color: ${props =>
      lighten(0.3, mergeTheme(props.theme, defaultTheme).primary)};
  }

  .Select-menu-outer {
    margin-top: -2px;
    border: 1px solid ${props => mergeTheme(props.theme, defaultTheme).primary};
    box-sizing: border-box;
  }

  .Select--multi .Select-value {
    color: ${props => mergeTheme(props.theme, defaultTheme).primary};
    background-color: ${defaultTheme.grayLightest};
    vertical-align: initial;
  }

  .Select-clear {
    line-height: inherit;
  }

  .Select-clear-zone:hover {
    color: ${props => mergeTheme(props.theme, defaultTheme).danger};
  }
`;

function SelectBox({ options, ...rest }: Props) {
  return (
    <SelectContainer className="sc-select">
      <Select options={options} {...rest} />
    </SelectContainer>
  );
}

export default SelectBox;
