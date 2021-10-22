//@flow
import React from 'react';
import styled, { css } from 'styled-components';
import * as defaultTheme from '../../style/theme';
import { getTheme } from '../../utils';

type Props = {
  toggle: boolean,
  onChange: (e: SyntheticEvent<HTMLInputElement>) => void,
  label?: string,
};
const ToggleContainer = styled.label`
  display: inline-flex;
  align-items: center;
  position: relative;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const Switch = styled.label`
  position: relative;
  width: 24px;
  height: 14px;
  ${(props) => {
    return css`
      ${props.disabled
        ? `
          cursor: not-allowed;
        `
        : `
          cursor: pointer;
        `}
    `;
  }}
`;

const Slider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => getTheme(props).backgroundLevel1};
  border: 1px solid
    ${(props) =>
      getTheme(props)[props.toggle ? 'selectedActive' : 'infoPrimary']};
  border-radius: 8px;
  transition: 0.4s;
  -moz-transform: rotate(0.02deg);
  &:before {
    border-radius: 100%;
    position: absolute;
    content: '';
    height: 10px;
    width: 10px;
    left: 1px;
    top: 1px;
    background-color: ${(props) =>
      getTheme(props)[props.toggle ? 'textSecondary' : 'textTertiary']};
    transition: 0.4s;
    -moz-transform: rotate(0.02deg);
  }
`;

const ToggleInput = styled.input`
  &:checked + ${Slider} {
    background-color: ${(props) => getTheme(props).selectedActive};
  }
  &:checked + ${Slider}:before {
    transform: translateX(10px);
  }
  display: none;
`;

const StyledSwitchLabel = styled.span`
  margin-left: ${defaultTheme.padding.smaller};
  font-size: ${defaultTheme.fontSize.base};
  color: ${(props) =>
    getTheme(props)[props.toggle ? 'textPrimary' : 'textTertiary']};
`;

function ToggleSwitch({ toggle, label, onChange, ...rest }: Props) {
  return (
    <ToggleContainer className="sc-toggle" {...rest}>
      <Switch {...rest}>
        <ToggleInput
          type="checkbox"
          checked={toggle}
          onChange={onChange}
          {...rest}
        />
        <Slider className="sc-slider" toggle={toggle} />
      </Switch>
      {label && (
        <StyledSwitchLabel toggle={toggle} className="text">
          {label}
        </StyledSwitchLabel>
      )}
    </ToggleContainer>
  );
}

export default ToggleSwitch;
