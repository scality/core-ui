import styled from 'styled-components';
import { spacing, fontSize } from '../../style/theme';
import { getThemePropSelector } from '../../utils';

export const ErrorPageContainer = styled.div`
  background-color: ${getThemePropSelector('backgroundLevel1')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Title = styled.h2`
  color: ${getThemePropSelector('textPrimary')};
  margin: 0;
  margin-left: ${spacing.sp20};
`;

export const Description = styled.div`
  color: ${getThemePropSelector('textPrimary')};
  font-size: ${fontSize.larger};
  text-align: center;
  padding: ${spacing.sp24};
`;

export const DescriptionContent = styled.p`
  margin: 0;
  padding: ${spacing.sp4};
`;

export const Row = styled.div`
  display: flex;
  align-items: baseline;
`;

export const WarningIcon = styled.i`
  color: ${getThemePropSelector('statusWarning')};
`;

export const InfoIcon = styled.i`
  color: ${getThemePropSelector('textPrimary')};
`;

export const Link = styled.a`
  color: ${getThemePropSelector('textLink')};
  text-decoration: none;
`;
