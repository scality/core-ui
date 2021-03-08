//@flow
import React from "react";
import type { Node } from "react";
import styled from "styled-components";
import * as defaultTheme from "../../style/theme";
import { getThemePropSelector, getThemeVariantSelector } from "../../utils";
import type { Variant } from "../constants";

export type Props = {
  icon?: Object,
  title?: string,
  children: Node,
  variant: Variant
};

const BannerContainer = styled.div`
  display: flex;
  padding: ${defaultTheme.padding.small};
  font-size: ${defaultTheme.fontSize.small};
  color: ${getThemePropSelector("textPrimary")};

  border: 1px solid;
  border-left: 5px solid;
  border-radius: 3px;
  border-color: ${getThemeVariantSelector()};
  background-color: ${getThemePropSelector("primary")};
  i {
    display: flex;
    align-items: center;
    margin-left: ${defaultTheme.padding.small};
    color: ${getThemeVariantSelector()};
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.span`
  margin-left: ${defaultTheme.padding.base};
`;

const Title = styled.div`
  margin-left: ${defaultTheme.padding.base};
  font-weight: ${defaultTheme.fontWeight.bold};
`;

function Banner({ icon, title, children, variant, ...rest }: Props) {
  return (
    <BannerContainer className="sc-banner" variant={variant}>
      {icon}
      <TextContainer>
        {title && <Title>{title}</Title>}
        <Text>{children}</Text>
      </TextContainer>
    </BannerContainer>
  );
}

export default Banner;
