//@flow
import * as defaultTheme from "../../style/theme";
import type { Variant, Size } from "../constants";
import type { Node } from "react";
import styled, { css } from "styled-components";
import Button from "../button/Button.component";
import React from "react";
import { lighten } from "polished";
import { getTheme } from "../../utils";

type Props = {
  text: string,
  variant?: Variant,
  icon?: Node,
  onClick?: any => void,
  onRemove?: any => void,
  size?: Size
};

const ChipsContainer = styled.div`
  display: inline-flex;
  .sc-chips-remove {
    padding-right: 10px;
    color: ${defaultTheme.white};
    &:hover {
      color: ${defaultTheme.grayLight};
    }
  }
  ${props => {
    switch (props.size) {
      case "smaller":
        return css`
          border-radius: 10px;
          .sc-chips-icon {
            border-radius: 10px;
            padding: 5px;
          }
        `;

      case "small":
        return css`
          border-radius: 12px;
          .sc-chips-icon {
            border-radius: 12px;
            padding: 6px;
          }
        `;

      case "large":
        return css`
          border-radius: 14px;
          .sc-chips-icon {
            border-radius: 14px;
            padding: 6px;
          }
        `;

      case "larger":
        return css`
          border-radius: 17px;
          .sc-chips-icon {
            border-radius: 17px;
            padding: 7px;
          }
        `;

      default:
        return css`
          border-radius: 12px;
          .sc-chips-icon {
            border-radius: 12px;
            padding: 6px;
          }
        `;
    }
  }}
${props => {
  return css`
    ${props.variant === "warning"
      ? `color: ${defaultTheme.blackLight};`
      : `color: ${defaultTheme.white};`}
  `;
}}

  ${props => {
    const brand = getTheme(props);
    const brandLight = lighten(0.1, brand[props.variant]).toString();
    return props.onClick
      ? css`
          background-color: ${brand[props.variant]};
          font-size: ${defaultTheme.fontSize[props.size]};
          &:hover {
            cursor: pointer;
            background-color: ${brandLight};
          }
          &:active {
            background-color: ${brand[props.variant]};
          }
        `
      : css`
          background-color: ${brand[props.variant]};
          font-size: ${defaultTheme.fontSize[props.size]};
        `;
  }}
`;

export const ChipsIcon = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    lighten(0.15, getTheme(props)[props.variant]).toString()};
`;

export const ChipsText = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: ${props => (props.icon || props.onRemove ? "5px" : "5px 10px")};
`;

const Chips = ({
  text = "",
  variant = defaultTheme.brand.primary,
  icon = null,
  onClick,
  onRemove,
  size = "base"
}: Props) => (
  <ChipsContainer
    className="sc-chips"
    onClick={onClick}
    variant={variant}
    icon={icon}
    size={size}
  >
    {icon && (
      <ChipsIcon
        className="sc-chips-icon"
        text={text}
        variant={variant}
        size={size}
      >
        {icon}
      </ChipsIcon>
    )}
    <ChipsText className="sc-chips-text" icon={icon} onRemove={onRemove}>
      {text}
    </ChipsText>
    {onRemove && (
      <Button
        className="sc-chips-remove"
        size={size}
        inverted={true}
        icon={<i className="fas fa-times" />}
        onClick={onRemove}
      />
    )}
  </ChipsContainer>
);
export default Chips;
