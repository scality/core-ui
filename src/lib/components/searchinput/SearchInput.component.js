import React from "react";
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

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.reset = this.reset.bind(this);
    this.state = { docked: true };
    this.myInputRef = React.createRef();
  }

  toggle() {
    this.setState({ docked: !this.state.docked });
    this.myInputRef.current.focus();
  }

  reset() {
    this.setState({ docked: true });
    this.props.onReset();
  }

  render() {
    return (
      <SearchInputContainer
        className="sc-searchinput"
        docked={this.state.docked}
      >
        <DebounceInput
          minLength={1}
          debounceTimeout={300}
          type="text"
          name="search"
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={event => this.props.onChange(event.target.value)}
          inputRef={this.myInputRef}
        />
        <SearchIcon onClick={this.toggle} disabled={!this.state.docked}>
          <i className="fas fa-search" />
        </SearchIcon>
        <ResetIcon
          onClick={this.reset}
          visible={this.props.value && !this.state.docked}
        >
          <i className="fas fa-times-circle" />
        </ResetIcon>
      </SearchInputContainer>
    );
  }
}

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func
};

export default SearchInput;
