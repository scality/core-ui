import React from 'react';
import styled from 'styled-components';
import { getThemePropSelector } from '../src/lib/utils';
const StyledWrapper = styled.div`
  padding: 3rem;
  height: 100%;
  background-color: ${(props) => props.theme.backgroundLevel1};
  color: ${(props) => props.theme.textPrimary};
  box-sizing: border-box;
`;
const StyledTitle = styled.h3`
  color: ${getThemePropSelector('textPrimary')};
`;
const StyledSubTitle = styled.span`
  color: ${getThemePropSelector('textPrimary')};
`;
const StyledText = styled.text`
  fill: ${getThemePropSelector('textPrimary')};
`;
export const Wrapper = ({ children, className = '', style = {} }) => {
  return (
    <StyledWrapper className={className} style={style}>
      {children}
    </StyledWrapper>
  );
};
export const Title = ({ children, className = '' }) => {
  return <StyledTitle className={className}>{children}</StyledTitle>;
};
export const SubTitle = ({ children, className = '' }) => {
  return <StyledSubTitle className={className}>{children}</StyledSubTitle>;
};
export const Text = ({ children, className = '', ...rest }) => {
  return (
    <StyledText className={className} {...rest}>
      {children}
    </StyledText>
  );
};
