//@flow
import * as defaultTheme from "../../style/theme";

import styled, { css } from "styled-components";

import React from "react";
import { lighten } from "polished";
import { mergeTheme } from "../../utils";

type Props = {
  text: String,
  color?: String,
  variant?: Variant,
  icon?: Node,
  buttonIcon?: Node,
  onClick?: any => void,
  onRemove?: any => void,
};

const defaultProps = {
  icon: null,
  buttonIcon:null,
  text: "",
};

const ChipsContainer = styled.div`
  display: inline-flex;
  background-color:${defaultTheme.grayLighter};
  border-radius: 15px;
  cursor: pointer;

  ${props => {
    const brandingTheme = mergeTheme(props.theme, defaultTheme);
    
    return css`
      background-color: ${brandingTheme[props.variant]};
      color: ${props.color};
    
    `;
  }}

  ${props => {
    const brandingTheme = mergeTheme(props.theme, defaultTheme);

    const brandLight = lighten(0.1, brandingTheme[props.variant]).toString();
    
    return props.onClick && css`    
      &:hover {
        pointer: cursor
        background-color: ${brandLight};
        color: ${props.color};
      }
      
      &:active {
        background-color: ${brandingTheme[props.variant]};
        color: ${props.color};
      }
    `;
  }}
`;

export const ChipsIcon = styled.span`
  ${props =>     
    props.text &&
    css`
      padding-right: ${defaultTheme.padding.smaller};
      display: inline-flex;
      justify-content: center;
      align-items: center;
      background-color:${lighten(0.15, defaultTheme.brand[props.variant]).toString()};
      border-radius: 15px;  
      padding:7px 8px;
    `
  }
`;

export const ChipsButton = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-left:7px;
  border-radius: 15px;
  padding: 2px ${defaultTheme.padding.smaller};

  ${props => {
    const brandingTheme = mergeTheme(props.theme, defaultTheme);

    const brandLight = lighten(0.1, brandingTheme[props.variant]).toString();
    
    return props.onClick && css`    
      &:hover {
        background-color: ${brandLight};
        color: ${props.color};
      }
      
      &:active {
        pointer: cursor
        background-color: ${brandingTheme[props.variant]};
        color: ${props.color};
      }
    `;
  }}
    
`;

export const ChipsText = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding:7px 14px;

`;

function Chips({
  text,
  variant = defaultTheme.brand.base,
  icon,
  buttonIcon,
  onClick, 
  onRemove,
  color = defaultTheme.white,
}: Props) {
  return (
    <ChipsContainer 
      className="sc-chips"
      onClick={onClick}
      variant={variant}
      color={color}
    >
      { icon && (
        <ChipsIcon text={text} variant={variant}>
          {icon}
        </ChipsIcon>
      )} 
      <ChipsText>
        {text}
        { onRemove && (
          <ChipsButton
            onClick={onRemove}
            color={color}
            variant={variant}
          >
            {buttonIcon}
          </ChipsButton>
        )}
      </ChipsText>
    </ChipsContainer>
  );
}

Chips.defaultProps = defaultProps;

export default Chips;
