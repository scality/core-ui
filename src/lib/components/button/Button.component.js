// @flow
import React from "react";
import type { Node } from "react";
import styled, { css } from "styled-components";
import Color from "color";
import { mergeTheme } from "../../utils";
import * as defaultTheme from "../../style/theme";
import Loader from "../loader/Loader.component";
import type { LoaderSize, Variant } from "../constants";

type Props = {
  text: string,
  size?: LoaderSize,
  variant?: Variant,
  outlined?: boolean,
  disabled?: boolean,
  icon?: Node,
  href?: string,
  title?: string,
  type?: string,
  isLoading?: boolean,
  onClick?: () => void
};

const defaultProps = {
  size: "base",
  variant: "primary",
  outlined: false,
  disabled: false,
  icon: null,
  href: "",
  text: "",
  title: "",
  type: "button",
  isLoading: false
};

export const ButtonStyled = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
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

    const brandLighter = Color(brandingTheme[props.variant])
      .lighten(0.5)
      .hsl()
      .string();
    const brandLight = Color(brandingTheme[props.variant])
      .lighten(0.3)
      .hsl()
      .string();

    return css`
      ${props.outlined
        ? `
        border-width: 1px;
        border-style: solid;
        border-color: ${brandingTheme[props.variant]};
        background-color: ${defaultTheme.white};
        color: ${brandingTheme[props.variant]};
        
        &:hover{      
          border-color: ${brandingTheme[props.variant]};
          background-color: ${brandLight};
          color: ${defaultTheme.white};
        }

        &:active {      
          border-color: ${brandingTheme[props.variant]};
          background-color: ${brandLighter};
          color: ${defaultTheme.white};
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
  const brandingTheme = mergeTheme(props.theme, defaultTheme);
  const brandLighter = Color(brandingTheme[props.variant])
    .lighten(0.5)
    .hsl()
    .string();

  return css`
    ${props.disabled
      ? `
          box-shadow: none;
          pointer-events: none;
          &,
          &:hover,
          &:focus,
          &:active {
            cursor: default;
            background-color: ${brandLighter};
            border-color: ${brandLighter};
            color: ${defaultTheme.white};
            box-shadow: none;
          };
        `
      : null}
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
  text,
  href,
  icon,
  size,
  variant,
  outlined,
  disabled,
  onClick,
  title,
  isLoading,
  type
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

Button.defaultProps = defaultProps;

export default Button;
