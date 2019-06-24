//@flow
import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";
import Color from "color";
import Input from "../input/Input.component";
import * as defaultTheme from "../../style/theme";
import { mergeTheme } from "../../utils";

type Props = {
  placeholder?: string,
  value: string,
  onChange: () => void,
  onReset: () => void
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
          color: ${Color(mergeTheme(props.theme, defaultTheme).primary)
            .lighten(0.3)
            .hsl()
            .string()};
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
  placeholder,
  value,
  onChange,
  onReset,
  ...rest
}: Props) {
  const [docked, setDocked] = useState(true);
  const myInputRef = useRef(null);

  const toggle = () => {
    setDocked(!docked);
    //$FlowFixMe
    myInputRef.current.focus();
  };

  const reset = () => {
    onReset();
    setDocked(true);
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
      <ResetIcon onClick={reset} visible={value && !docked}>
        <i className="fas fa-times-circle" />
      </ResetIcon>
    </SearchInputContainer>
  );
}

export default SearchInput;
