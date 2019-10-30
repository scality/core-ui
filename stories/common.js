import React from "react";
import styled from "styled-components";
import { mergeTheme } from "../src/lib/utils";
import * as defaultTheme from "../src/lib/style/theme";

const StyledWrapper = styled.div`
  padding: 30px;
  min-height: 100vh;
  background-color: ${props => {
    const brandingTheme = mergeTheme(props.theme, defaultTheme);
    return brandingTheme.background;
  }};
`;

const StyledTitle = styled.h3`
  color: ${props => {
    const brandingTheme = mergeTheme(props.theme, defaultTheme);
    return brandingTheme.text;
  }};
`;

const StyledSubTitle = styled.span`
  color: ${props => {
    const brandingTheme = mergeTheme(props.theme, defaultTheme);
    return brandingTheme.text;
  }};
`;

export const Wrapper = ({ children, className }) => {
  return <StyledWrapper className={className}>{children}</StyledWrapper>;
};

export const Title = ({ children, className }) => {
  return <StyledTitle className={className}>{children}</StyledTitle>;
};

export const SubTitle = ({ children, className }) => {
  return <StyledSubTitle className={className}>{children}</StyledSubTitle>;
};
