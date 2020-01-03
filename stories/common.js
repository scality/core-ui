import React from "react";
import styled from "styled-components";
import { getThemePropSelector } from "../src/lib/utils";

const StyledWrapper = styled.div`
  padding: 30px;
  min-height: 100vh;
  background-color: ${getThemePropSelector("background")};
`;

const StyledTitle = styled.h3`
  color: ${getThemePropSelector("text")};
`;

const StyledSubTitle = styled.span`
  color: ${getThemePropSelector("text")};
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
