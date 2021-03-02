// @flow
import React from "react";
import type { Node } from "react";
import styled, { css } from "styled-components";
import { lighten } from "polished";
import { getTheme } from "../../utils";
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
  onClick?: (any) => void,
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
    cursor: pointer;
  }

  ${(props) => {
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
          padding: 12px 16px;
          font-size: ${defaultTheme.fontSize.base};
          border-radius: 6px;
          height: 32px;
        `;
    }
  }}

  ${(props) => {
    const brand = getTheme(props);
    const brandLight = lighten(0.1, brand[props.variant]).toString();

    if (props.isLoading) {
      return css`
        > span {
          display: flex;
          .sc-loader {
            margin: 0px ${defaultTheme.padding.smaller};
            svg {
              fill: ${brand.textPrimary} !important;
            }
          }
        }
      `;
    }

    if (props.outlined) {
      return css`
        border-width: 1px;
        border-style: solid;
        border-color: ${brand.secondaryDark1};
        background-color: ${brand.background};
        color: ${brand.textPrimary};

        &:hover {
          border-color: ${brand.secondaryDark1};
          background-color: ${brand.secondaryDark2};
          color: ${defaultTheme.white};
        }

        &:active {
          border-color: ${brand.secondaryDark1};
          background-color: ${brand.secondaryDark2};
          color: ${defaultTheme.white};
        }
      `;
    } else if (props.variant === "warning") {
      return css`
        background-color: ${brand[props.variant]};
        color: ${defaultTheme.blackLight};
        &:hover {
          background-color: ${brandLight};
          color: ${defaultTheme.blackLight};
        }
        &:active {
          background-color: ${brand[props.variant]};
          color: ${defaultTheme.blackLight};
        }
      `;
    } else {
      return css`
        background-color: ${brand[props.variant]};
        color: ${defaultTheme.white};

        &:hover {
          background-color: ${brandLight};
          color: ${defaultTheme.white};
        }

        &:active {
          background-color: ${brand[props.variant]};
          color: ${defaultTheme.white};
        }
      `;
    }
  }}

${(props) => {
  const brand = getTheme(props);
  const brandLighter = lighten(0.2, brand[props.variant]).toString();

  return css`
    ${props.disabled
      ? `
          box-shadow: none;
          pointer-events: none;
          opacity: 0.2;
          border-color: ${brandLighter};
          color: ${defaultTheme.white};
        `
      : null}
  `;
}}

${(props) => {
  const brand = getTheme(props);

  const brandLighter = lighten(0.2, brand[props.variant]).toString();
  const brandLight = lighten(0.1, brand[props.variant]).toString();

  return css`
    ${!props.text && props.icon && props.inverted
      ? `
        padding: 0;
        height: auto;
        border: none;
        background-color: transparent;
        color: ${props.disabled ? brandLight : brand[props.variant]};

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
  ${(props) =>
    props.text &&
    css`
      padding-right: 8px;
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
  variant = "base",
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
