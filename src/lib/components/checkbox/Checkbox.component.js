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
  return (
    <StyledCheckbox
      checked={checked}
      disabled={disabled}
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
          opacity: 0.5;
        `
      : css`
          cursor: pointer;
        `;
  }}

  ${(props) => {
    const { border, secondary } = getTheme(props);
    const iconCheckedColor = props.checked ? 'white' : 'transparent';

    const checkBoxColor = props.checked ? secondary : border;
    const checkBoxColorHover = props.disabled ? checkBoxColor : secondary;

    return css`
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 12px;
        height: 12px;
        border: 2px solid ${checkBoxColor};
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
          border-color: ${checkBoxColorHover};
        }
      }
    `;
  }}

  span {
    vertical-align: baseline;
  }

  input {
    margin: 0px;
    opacity: 0;
  }
`;
