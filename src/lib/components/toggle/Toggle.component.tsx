import React from 'react';
import styled, { css } from 'styled-components';
import * as defaultTheme from '../../style/theme';
import { getTheme } from '../../utils';
import { spacing } from '../../style/theme';
type Props = {
  toggle: boolean;
  onChange: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  label?: string;
  disabled?: boolean;
};
const ToggleContainer = styled.span`
  display: inline-flex;
  align-items: center;
  position: relative;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;
const Switch = styled.label`
  position: relative;
  width: ${spacing.sp24};
  height: ${spacing.sp14};
  ${(props) => {
    return css`
      ${
        props.disabled
          ? `
          cursor: not-allowed;
        `
          : `
          cursor: pointer;
        `
      }
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
  border: ${spacing.sp1} solid
    ${(props) =>
      getTheme(props)[props.toggle ? 'selectedActive' : 'infoPrimary']};
  border-radius: ${spacing.sp8};
  transition: 0.4s;
  -moz-transform: rotate(0.02deg);
  &:before {
    border-radius: 100%;
    position: absolute;
    content: '';
    height: ${spacing.sp10};
    width: ${spacing.sp10};
    left: ${spacing.sp1};
    top: ${spacing.sp1};
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
    transform: translateX(${spacing.sp10});
  }
  display: none;
`;
const StyledSwitchLabel = styled.span`
  margin-left: ${defaultTheme.padding.smaller};
  font-size: ${defaultTheme.fontSize.base};
  color: ${(props) =>
    getTheme(props)[props.toggle ? 'textPrimary' : 'textTertiary']};
`;

function ToggleSwitch({ toggle, label, onChange, disabled, ...rest }: Props) {
  return (
    <ToggleContainer className="sc-toggle" disabled={disabled}>
      <Switch>
        <ToggleInput
          type="checkbox"
          checked={toggle}
          onChange={onChange}
          disabled={disabled}
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