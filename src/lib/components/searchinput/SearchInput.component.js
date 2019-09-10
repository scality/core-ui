//@flow
import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";
import { lighten } from "polished";
import Input from "../input/Input.component";
import * as defaultTheme from "../../style/theme";
import { mergeTheme } from "../../utils";

type Props = {
  placeholder?: string,
  value: string,
  onChange: () => void,
  onReset?: () => void,
  disableToggle: boolean
};

const SearchInputContainer = styled.div`
  position: relative;

  .sc-input {
    display: block;
    input[type="text"] {
      width: ${props => (props.docked ? "40px" : "100%")};
      box-sizing: border-box;
      padding-right: ${props => (props.docked ? "12px" : "40px")};
      padding-left: ${props => (props.docked ? "12px" : "40px")};
      transition: width 0.2s ease-in-out;
    }
  }
`;

const IconButton = styled.button`
  position: absolute;
  border: none;
  outline: none;
  top: 1px;
  padding: 8px 12px;
  border-radius: 5px;
  font-size: ${defaultTheme.fontSize.base};
  color: ${props => mergeTheme(props.theme, defaultTheme).primary};
  background-color: ${defaultTheme.white};
  ${props => {
    return (
      !props.disabled &&
      css`
        cursor: pointer;
        &:hover {
          color: ${lighten(0.1, mergeTheme(props.theme, defaultTheme).primary)};
        }
      `
    );
  }};
`;

const SearchIcon = styled(IconButton)`
  left: 1px;
`;

const ResetIcon = styled(IconButton)`
  right: 1px;
  visibility: ${props => (props.visible ? "visible" : "hidden")};
  opacity: ${props => (props.visible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

function SearchInput({
  disableToggle,
  placeholder,
  value,
  onChange,
  onReset,
  ...rest
}: Props) {
  const [docked, setDocked] = useState(!disableToggle);
  const myInputRef = useRef(null);

  const toggle = () => {
    if (!disableToggle) {
      setDocked(!docked);
      //$FlowFixMe
      myInputRef.current.focus();
    }
  };

  const reset = () => {
    onReset();
    if (!disableToggle) {
      setDocked(true);
    }
  };

  return (
    <SearchInputContainer className="sc-searchinput" docked={docked} {...rest}>
      <Input
        minLength={1}
        debounceTimeout={300}
        type="text"
        name="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        inputRef={myInputRef}
      />
      <SearchIcon onClick={toggle} disabled={!docked}>
        <i className="fas fa-search" />
      </SearchIcon>
      <ResetIcon onClick={reset} visible={value && !docked && onReset}>
        <i className="fas fa-times-circle" />
      </ResetIcon>
    </SearchInputContainer>
  );
}

export default SearchInput;
