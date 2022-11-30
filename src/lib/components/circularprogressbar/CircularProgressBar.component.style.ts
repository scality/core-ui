import styled from 'styled-components';
import * as defaultTheme from '../../style/theme';
import { getThemePropSelector, getTheme } from '../../utils';
export const CircularProgressBarContainer = styled.div`
  display: inline-block;
  color: ${getThemePropSelector('textPrimary')};
`;
export const Title = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${defaultTheme.padding.small}
  font-size: ${defaultTheme.fontSize.large};
  font-weight: ${defaultTheme.fontWeight.bold};
`;
export const ProgressCircle = styled.circle<{
  circumference: number;
  percent: number;
}>`
  stroke-dasharray: ${({ circumference }) => circumference};
  stroke-dashoffset: ${({ percent, circumference }) =>
    ((100 - percent) / 100) * circumference};
  stroke: ${(props) => props.color || getTheme(props).statusHealthy};
  stroke-width: ${(props) => props.strokeWidth};
  stroke-linecap: round;
  fill: none;
`;
export const BackgroundCircle = styled.circle<{ backgroundColor?: string }>`
  fill: none;
  stroke: ${(props) =>
    props.backgroundColor || getTheme(props).backgroundLevel1};
  stroke-width: ${(props) => props.strokeWidth};
`;
