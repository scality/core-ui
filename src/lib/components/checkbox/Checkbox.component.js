import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import Color from "color";
import * as defaultTheme from "../../style/theme";
import { mergeTheme } from "../../utils";

class Checkbox extends Component {
  constructor() {
    super();
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(event) {
    if (!this.props.disabled) {
      this.props.onChange(!this.props.checked);
    } else {
      event.stopPropagation();
    }
  }

  render() {
    return (
      <StyledCheckboxContainer
        onClick={this.handleOnClick}
        className="sc-checkbox"
        disabled={this.props.disabled}
      >
        <StyledCheckbox
          className="checkbox"
          checked={this.props.checked}
          disabled={this.props.disabled}
        >
          <input
            type="checkbox"
            checked={this.props.checked}
            disabled={this.props.disabled}
          />
          <i className="fas fa-check" />
        </StyledCheckbox>
        <StyledCheckboxLabel className="text">
          {this.props.label}
        </StyledCheckboxLabel>
      </StyledCheckboxContainer>
    );
  }
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string
};

export default Checkbox;

const StyledCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  ${props => {
    return props.disabled
      ? css`
          cursor: default;
          opacity: 0.5;
        `
      : css`
          cursor: pointer;
        `;
  }}
`;

const StyledCheckboxLabel = styled.span`
  font-size: ${defaultTheme.fontSize.large};
`;

const StyledCheckbox = styled.div`
  position: relative;
  width: 22px;
  height: 22px;
  padding-right: ${defaultTheme.padding.small};

  ${props => {
    const brandingTheme = mergeTheme(props.theme, defaultTheme);
    const brandDark = Color(brandingTheme.primary)
      .darken(0.1)
      .hsl()
      .string();

    const iconCheckedColor =
      props.checked || props.disabled ? brandingTheme.primary : "transparent";

    const checkBoxColor =
      props.checked || props.disabled
        ? brandingTheme.primary
        : defaultTheme.grayLight;

    return css`
      &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 18px;
        height: 18px;
        border: 2px solid ${checkBoxColor};
        background: ${defaultTheme.white};
        border-radius: 4px;
      }
      i {
        position: absolute;
        top: 3px;
        left: 3px;
        font-size: 16px;
        color: ${iconCheckedColor};
      }

      &:hover {
        &:before {
          border-color: ${brandDark};
        }
      }
    `;
  }}

  input {
    opacity: 0;
  }
`;
