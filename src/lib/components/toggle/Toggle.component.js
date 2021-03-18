//@flow
import React from 'react';
import styled, { css } from 'styled-components';
import * as defaultTheme from '../../style/theme';
import { getTheme, getThemePropSelector } from '../../utils';

type Props = {
  toggle: boolean,
  onChange: (e: SyntheticEvent<HTMLInputElement>) => void,
  label: string,
};
const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: ${defaultTheme.padding.small};

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  ${(props) => {
    const { secondary } = getTheme(props);
    return css`
      .sc-slider {
        position: absolute;
        cursor: pointer;
        top: 10px;
        left: 0;
        right: 0;
        background-color: ${defaultTheme.grayLight};
        transition: 0.5s;
        height: 4px;
        border-radius: 4px;

        &:hover {
          &:before {
            box-shadow: 0 0 3px ${defaultTheme.grayLight};
          }
        }
      }

      .sc-slider:before {
        position: absolute;
        content: '';
        height: 12px;
        width: 12px;
        top: -4px;
        background-color: ${defaultTheme.grayLight};
        transition: 0.5s;
        border-radius: 50%;
      }

      input:checked + .sc-slider {
        background-color: ${secondary};
        &:hover {
          &:before {
            box-shadow: 0 0 3px ${secondary};
          }
        }
      }

      input:checked + .sc-slider:before {
        transform: translateX(12px);
        background-color: ${secondary};
      }
    `;
  }}
`;

const StyledSwitchLabel = styled.span`
  font-size: ${defaultTheme.fontSize.large};
  color: ${getThemePropSelector('textPrimary')};
`;

function ToggleSwitch({ toggle, label, onChange, ...rest }: Props) {
  return (
    <ToggleContainer className="sc-toggle">
      <Switch>
        <input type="checkbox" checked={toggle} onChange={onChange} {...rest} />
        <span className="sc-slider" />
      </Switch>
      <StyledSwitchLabel className="text">{label}</StyledSwitchLabel>
    </ToggleContainer>
  );
}

export default ToggleSwitch;
