//@flow
import * as defaultTheme from "../../style/theme";
import type { Variant } from "../constants";
import type { Node } from "react";
import styled, { css } from "styled-components";

import React from "react";
import { lighten } from "polished";
import { mergeTheme } from "../../utils";

type Props = {
  text: string,
  variant?: Variant,
  icon?: Node,
  buttonIcon?: Node,
  onClick?: any => void,
  onRemove?: any => void
};

const ChipsContainer = styled.div`
  display: inline-flex;
  background-color: ${defaultTheme.grayLighter};
  border-radius: 15px;

  ${props => {
    const brandingTheme = mergeTheme(props.theme, defaultTheme);
    const brandLight = lighten(0.1, brandingTheme[props.variant]).toString();
    return props.onClick
      ? css`
          background-color: ${brandingTheme[props.variant]};
          color: ${defaultTheme.white};
          &:hover {
            cursor: pointer;
            background-color: ${brandLight};
          }
          &:active {
            background-color: ${brandingTheme[props.variant]};
          }
        `
      : css`
          background-color: ${brandingTheme[props.variant]};
          color: ${defaultTheme.white};
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
      background-color: ${lighten(
        0.1,
        mergeTheme(props.theme, defaultTheme)[props.variant]
      ).toString()};
      border-radius: 15px;
      padding: 7px 8px;
    `}
`;

export const ChipsButton = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-left: 7px;
  border-radius: 15px;
  padding: 2px ${defaultTheme.padding.smaller};
  color: ${defaultTheme.white};

  ${props => {
    const brandingTheme = mergeTheme(props.theme, defaultTheme);
    const brandLight = lighten(0.1, brandingTheme[props.variant]).toString();

    return (
      props.onClick &&
      css`
        &:hover {
          background-color: ${brandLight};
          cursor: pointer;
        }

        &:active {
          background-color: ${brandingTheme[props.variant]};
        }
      `
    );
  }}
`;

export const ChipsText = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 7px 14px;
`;

function Chips({
  text = "",
  variant = defaultTheme.brand.primary,
  icon = null,
  buttonIcon = null,
  onClick,
  onRemove
}: Props) {
  return (
    <ChipsContainer className="sc-chips" onClick={onClick} variant={variant}>
      {icon && (
        <ChipsIcon text={text} variant={variant}>
          {icon}
        </ChipsIcon>
      )}
      <ChipsText>
        {text}
        {onRemove && (
          <ChipsButton onClick={onRemove} variant={variant}>
            {buttonIcon}
          </ChipsButton>
        )}
      </ChipsText>
    </ChipsContainer>
  );
}

export default Chips;
