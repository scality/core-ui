// @flow
import React from 'react';
import styled, { css } from 'styled-components';
import * as defaultTheme from '../../style/theme';
import { getTheme, getThemePropSelector } from '../../utils';

type Props = {
  label?: string,
  value?: string,
  checked: boolean,
  disabled?: boolean,
  onChange: (e: SyntheticEvent<HTMLInputElement>) => void,
};

function Checkbox({
  disabled,
  checked,
  label,
  value,
  onChange,
  ...rest
}: Props) {
  const canBeFocused = !checked && !disabled;

  return (
    <StyledCheckbox
      checked={checked}
      disabled={disabled}
      aria-pressed={canBeFocused ? true : null}
      tabIndex={canBeFocused ? 0 : null}
      className="sc-checkbox"
    >
      <i className="fas fa-check" />
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        value={value}
        onChange={onChange}
        {...rest}
      />
      {label && (
        <StyledCheckboxLabel className="text">{label}</StyledCheckboxLabel>
      )}
    </StyledCheckbox>
  );
}

export default Checkbox;

const StyledCheckboxLabel = styled.span`
  font-size: ${defaultTheme.fontSize.large};
  padding-left: ${defaultTheme.padding.base};
  vertical-align: middle;
  color: ${getThemePropSelector('textPrimary')};
`;

const StyledCheckbox = styled.label`
  position: relative;
  display: inline-block;
  ${(props) => {
    return props.disabled
      ? css`
          cursor: default;
          opacity: 0.3;
        `
      : css`
          cursor: pointer;
        `;
  }}

  ${(props) => {
    const {
      textSecondary,
      selectedActive,
      highlight,
      buttonPrimary,
    } = getTheme(props);
    const iconCheckedColor = props.checked ? 'white' : 'transparent';

    const checkBoxFocusBorder = buttonPrimary;
    const checkBoxFocusColor = props.checked ? selectedActive : null;

    const checkBoxBorder = props.checked ? selectedActive : textSecondary;
    let checkBoxColor = null;
    if (props.checked) checkBoxColor = selectedActive;
    else if (props.disabled) checkBoxColor = textSecondary;

    let checkBoxColorHover = null;
    let checkBoxColorBorderHover = null;
    if (props.checked && !props.disabled)
      checkBoxColorHover = checkBoxColorBorderHover = selectedActive;
    else if (!props.checked && !props.disabled) {
      checkBoxColorHover = highlight;
      checkBoxColorBorderHover = selectedActive;
    }

    return css`
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 12px;
        height: 12px;
        border: 2px solid ${checkBoxBorder};
        background: ${checkBoxColor};
        border-radius: 4px;
      }
      i {
        position: absolute;
        top: 3px;
        left: 2px;
        font-size: 12px;
        color: ${iconCheckedColor};
      }

      &:hover {
        &:before {
          background: ${checkBoxColorHover};
          border-color: ${checkBoxColorBorderHover};
        }
      }

      &:focus {
        outline: 0;
        &:before {
          background: ${checkBoxFocusColor};
          border-color: ${checkBoxFocusBorder};
        }
      }
    `;
  }}

  span {
    vertical-align: baseline;
  }

  input {
    ${(props) => {
      return props.disabled
        ? css`
            cursor: default;
          `
        : css`
            cursor: pointer;
          `;
    }}
    margin: 0px;
    opacity: 0;
  }
`;
