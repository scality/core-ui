import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import * as defaultTheme from "../../style/theme";
import { mergeTheme } from "../../utils";

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
    const brandingTheme = mergeTheme(props.theme, defaultTheme);

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
        background-color: ${brandingTheme.primary};
        &:hover {
          &:before {
            box-shadow: 0 0 3px ${brandingTheme.primary};
          }
        }
      }

      input:checked + .sc-slider:before {
        transform: translateX(26px);
        background-color: ${brandingTheme.primary};
      }
    `;
  }}
`;

const StyledSwitchLabel = styled.span`
  font-size: ${defaultTheme.fontSize.large};
`;

function ToggleSwitch({ toggle, label, onChange, ...rest }) {
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

ToggleSwitch.propTypes = {
  toggle: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string
};

export default ToggleSwitch;
