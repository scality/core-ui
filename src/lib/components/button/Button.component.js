// @flow
import React from "react";
import type { Node } from "react";
import styled, { css } from "styled-components";
import { lighten } from "polished";
import { mergeTheme } from "../../utils";
import * as defaultTheme from "../../style/theme";
import Loader from "../loader/Loader.component";
import type { Size, Variant } from "../constants";

type Props = {
  text?: string,
  size?: Size,
  variant?: Variant,
  outlined?: boolean,
  inverted?: boolean,
  disabled?: boolean,
  icon?: Node,
  href?: string,
  title?: string,
  type?: string,
  isLoading?: boolean,
  onClick?: any => void
};

export const ButtonStyled = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;
  display: inline-flex;
  user-select: none;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  text-decoration: none;
  border: none;
  text-decoration: none;
  font-weight: ${defaultTheme.fontWeight.base};

  &:hover,
  &:focus,
  &:active {
    outline: none;
  }

  ${props => {
    switch (props.size) {
      case "smaller":
        return css`
          padding: 7px 14px;
          font-size: ${defaultTheme.fontSize.smaller};
          border-radius: 4px;
          height: 27px;
        `;
      case "small":
        return css`
          padding: 8px 16px;
          font-size: ${defaultTheme.fontSize.small};
          border-radius: 5px;
          height: 30px;
        `;
      case "large":
        return css`
          padding: 10px 20px;
          font-size: ${defaultTheme.fontSize.large};
          border-radius: 7px;
          height: 40px;
        `;
      case "larger":
        return css`
          padding: 11px 22px;
          font-size: ${defaultTheme.fontSize.larger};
          border-radius: 8px;
          height: 48px;
        `;
      default:
        return css`
          padding: 9px 18px;
          font-size: ${defaultTheme.fontSize.base};
          border-radius: 6px;
          height: 37px;
        `;
    }
  }}

  ${props => {
    const brandingTheme = mergeTheme(props.theme, defaultTheme);

    const brandLighter = lighten(0.3, brandingTheme[props.variant]).toString();
    const brandLight = lighten(0.1, brandingTheme[props.variant]).toString();
    return css`
      ${props.outlined
        ? `
        border-width: 1px;
        border-style: solid;
        border-color: ${brandingTheme[props.variant]};
        background-color: ${brandingTheme.background};
        color: ${brandingTheme[props.variant]};
        
        &:hover{      
          border-color: ${brandingTheme[props.variant]};
          background-color: ${brandLight};
          color: ${brandingTheme.background};
        }

        &:active {      
          border-color: ${brandingTheme[props.variant]};
          background-color: ${brandLighter};
          color:  ${brandingTheme.background};
        }
        `
        : `          
        background-color: ${brandingTheme[props.variant]};
        color: ${defaultTheme.white};
  
        &:hover {
          background-color: ${brandLight};
          color: ${defaultTheme.white};
        }
        
        &:active {      
          background-color: ${brandingTheme[props.variant]};
          color: ${defaultTheme.white};
        }
      `}
    `;
  }}

${props => {
  return css`
    ${props.isLoading
      ? `
          .sc-button-text {
            visibility: hidden;
          }
          .sc-loader {
            svg {
              fill: ${defaultTheme.white};
            }
            > span {
              position: absolute;
              right: 0;
              left: 0;
            }
          }
        `
      : null}
  `;
}}

${props => {
  const brandingTheme = mergeTheme(props.theme, defaultTheme);
  const brandLighter = lighten(0.2, brandingTheme[props.variant]).toString();

  return css`
    ${props.disabled
      ? `
          box-shadow: none;
          pointer-events: none;
          background-color: ${brandLighter};
          border-color: ${brandLighter};
          color: ${defaultTheme.white};
        `
      : null}
  `;
}}

${props => {
  const brandingTheme = mergeTheme(props.theme, defaultTheme);
  const brandLighter = lighten(0.2, brandingTheme[props.variant]).toString();
  const brandLight = lighten(0.1, brandingTheme[props.variant]).toString();

  return css`
    ${!props.text && props.icon && props.inverted
      ? `
        padding: 0;
        height: auto;
        border: none;
        background-color: transparent;
        color: ${props.disabled ? brandLight : brandingTheme[props.variant]};
        
        &:hover{      
          background-color: transparent;
          color: ${brandLight};
        }

        &:active {  
          background-color: transparent;
          color: ${brandLighter};
        }
        `
      : null}
  `;
}}

`;
export const ButtonIcon = styled.span`
  ${props =>
    props.text &&
    css`
      padding-right: ${defaultTheme.padding.smaller};
      display: inline-flex;
      justify-content: center;
      align-items: center;
    `}
`;

export const ButtonText = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonContent = styled.span`
  position: relative;
`;

const Anchor = ButtonStyled.withComponent("a");

function Button({
  text = "",
  href = "",
  icon = null,
  size = "base",
  variant = "primary",
  outlined = false,
  disabled = false,
  onClick,
  title = "",
  isLoading = false,
  type = "button",
  inverted = false,
  ...rest
}: Props) {
  return href && href.length ? (
    <Anchor
      className="sc-button"
      href={href}
      variant={variant}
      outlined={outlined}
      disabled={disabled}
      size={size}
      title={title}
      {...rest}
    >
      {icon && (
        <ButtonIcon text={text} size={size}>
          {icon}
        </ButtonIcon>
      )}
      <ButtonText>{text}</ButtonText>
    </Anchor>
  ) : (
    <ButtonStyled
      className="sc-button"
      variant={variant}
      outlined={outlined}
      disabled={disabled || isLoading}
      size={size}
      onClick={onClick}
      title={title}
      isLoading={isLoading}
      type={type}
      inverted={inverted}
      icon={icon}
      text={text}
      {...rest}
    >
      <ButtonContent>
        {isLoading && <Loader size={size} />}
        <span className="sc-button-text">
          {icon && (
            <ButtonIcon text={text} size={size}>
              {icon}
            </ButtonIcon>
          )}
          <ButtonText>{text}</ButtonText>
        </span>
      </ButtonContent>
    </ButtonStyled>
  );
}
export default Button;
