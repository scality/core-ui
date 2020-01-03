//@flow
import React from "react";
import styled, { css } from "styled-components";
import * as defaultTheme from "../../style/theme";
import { getTheme, getThemePropSelector } from "../../utils";

type Props = {
  toggle: boolean,
  onChange: () => void,
  label: string
};
const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  margin-right: ${defaultTheme.padding.small};

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  ${props => {
    const { primary } = getTheme(props);
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
        content: "";
        height: 24px;
        width: 24px;
        top: -10px;
        background-color: ${defaultTheme.grayLight};
        transition: 0.5s;
        border-radius: 50%;
      }

      input:checked + .sc-slider {
        background-color: ${primary};
        &:hover {
          &:before {
            box-shadow: 0 0 3px ${primary};
          }
        }
      }

      input:checked + .sc-slider:before {
        transform: translateX(26px);
        background-color: ${primary};
      }
    `;
  }}
`;

const StyledSwitchLabel = styled.span`
  font-size: ${defaultTheme.fontSize.large};
  color: ${getThemePropSelector("text")};
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
