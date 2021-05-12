//@flow
import React from 'react';
import styled from 'styled-components';
import * as defaultTheme from '../../style/theme';
import { getTheme } from '../../utils';

type Props = {
  toggle: boolean,
  onChange: (e: SyntheticEvent<HTMLInputElement>) => void,
  label?: string,
};

const width = 20;
const height = 10;

const Switch = styled.label`
  cursor: pointer;
  & input {
    width: 0;
    height: 0;
    margin: 0;
    position: absolute;
  }

  & span {
    display: block;
    position: relative;
    width: ${width}px;
    height: ${height}px;
    border-radius: ${width}px;
    padding: 2px;
    background-color: ${(props) =>
  getTheme(props)[props.toggle ? 'selectedActive' : 'infoPrimary']};
    transition: 0.4s;
  }

  & span:before {
    content: '';
    position: absolute;
    inset: 0;
    border: 1px solid transparent;
    background-clip: padding-box;
    background-color: ${(props) =>
  getTheme(props)[props.toggle ? 'selectedActive' : 'backgroundLevel1']};
    border-radius: ${width}px;
    transition: 0.4s;
  }

  & span:after {
    content: '';
    display: block;
    width: ${height}px;
    height: 100%;
    background-color: ${(props) =>
  getTheme(props)[props.toggle ? 'textSecondary' : 'textTertiary']};
    border-radius: 50%;
    position: relative;
    right: 0;
    transition: 0.4s;
  }

  & input:checked + span:after {
    right: calc(-100% + ${height}px);
  }
`;

const ToggleContainer = styled.label`
  display: inline-flex;
  align-items: center;
  position: relative;
`;

const StyledSwitchLabel = styled.span`
  margin-left: ${defaultTheme.padding.smaller};
  font-size: ${defaultTheme.fontSize.base};
  color: ${(props) =>
  getTheme(props)[props.toggle ? 'textPrimary' : 'textTertiary']};
`;

function ToggleSwitch({ toggle, label, onChange, ...rest }: Props) {
  return (
    <ToggleContainer className="sc-toggle">
      <Switch toggle={toggle}>
        <input
          type="checkbox"
          checked={toggle}
          onChange={onChange}
          {...rest}
        />
        <span className="sc-slider"/>
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
