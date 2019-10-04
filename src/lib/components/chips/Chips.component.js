//@flow
import * as defaultTheme from "../../style/theme";
import styled, { css } from "styled-components";
import React from "react";
import { lighten } from "polished";
import { mergeTheme } from "../../utils";

type Props = {
  text: string,
  color?: String,
  variant?: Variant,
  icon?: Node,
  buttonIcon?: Node,
  onClick?: any => void,
};

const defaultProps = {
  variant: "base",
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

    const brandLight = lighten(0.1, brandingTheme[props.variant]).toString();
    console.log(brandingTheme);
    
    return css`
      background-color: ${brandingTheme[props.variant]};
      color: ${props.color};
    
      &:hover {
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
  padding-right: ${defaultTheme.padding.smaller};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-left:7px;
    
`;

export const ChipsText = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding:7px 14px;

`;

function Chips({
  text,
  variant,
  icon,
  buttonIcon,
  onClick, 
  color = defaultTheme.white,
}: Props) {
  return ( //tirar negação dos ícone
    <ChipsContainer className="sc-chips" onClick={onClick} variant={variant} color={color}>
      { icon && (
        <ChipsIcon text={text} variant={variant}>
          {icon}
        </ChipsIcon>
      )} 
      <ChipsText>
        {text}
        { buttonIcon && (
          <ChipsButton >
            {buttonIcon}
          </ChipsButton>
        )}
      </ChipsText>
    </ChipsContainer>
  );
}

Chips.defaultProps = defaultProps;

export default Chips;
