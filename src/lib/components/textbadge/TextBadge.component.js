//@flow
import React from "react";
import styled from "styled-components";
import * as defaultTheme from "../../style/theme";
import { getThemeVariantSelector, getThemePropSelector } from '../../utils';
import type { Variant } from "../constants";

const StyledTextBadge = styled.span`
  background-color: ${getThemeVariantSelector};
  color: ${getThemePropSelector('textPrimary')};
  padding: 2px 0.6rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: ${defaultTheme.fontWeight.bold};
  margin: 0 ${defaultTheme.padding.smaller} 0 ${defaultTheme.padding.smaller};
`;

type Props = {
  text: string,
  variant?: Variant,
};
export default function TextBadge({
  text,
  variant,
  ...rest
} : Props) {
  return <StyledTextBadge className='sc-text-badge' variant={ variant } { ...rest }>
    { text }
  </StyledTextBadge>
}
