import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import Color from "color";
import { DebounceInput } from "react-debounce-input";
import * as defaultTheme from "../../style/theme";
import { mergeTheme } from "../../utils";

const SearchInputContainer = styled.div`
  position: relative;
  input[type="text"] {
    outline: none;
    width: ${props => (props.docked ? "36px" : "100%")};
    box-sizing: border-box;
    border: 1px solid ${props => mergeTheme(props.theme, defaultTheme).primary};
    border-radius: 5px;
    font-size: ${defaultTheme.fontSize.base};
    padding: ${props => (props.docked ? "5px 10px" : "5px 34px")};
    transition: width 0.2s ease-in-out;
  }
`;

const IconButton = styled.button`
  position: absolute;
  border: none;
  outline: none;
  top: 1px;
  padding: 6px 10px 4px 10px;
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

function SearchInput(props) {
  const [docked, setDocked] = useState(true);
  const myInputRef = useRef(null);

  const toggle = () => {
    setDocked(!docked);
    myInputRef.current.focus();
  };

  const reset = () => {
    props.onReset();
    setDocked(true);
  };

  return (
    <SearchInputContainer className="sc-searchinput" docked={docked}>
      <DebounceInput
        minLength={1}
        debounceTimeout={300}
        type="text"
        name="search"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        inputRef={myInputRef}
      />
      <SearchIcon onClick={toggle} disabled={!docked}>
        <i className="fas fa-search" />
      </SearchIcon>
      <ResetIcon onClick={reset} visible={props.value && !docked}>
        <i className="fas fa-times-circle" />
      </ResetIcon>
    </SearchInputContainer>
  );
}

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func
};

export default SearchInput;
