import styled from "styled-components";
import { mergeTheme } from "../../utils";
import * as defaultTheme from "../../style/theme";

export const CircularProgressBarContainer = styled.div`
  display: inline-block;
  color: ${props => mergeTheme(props.theme, defaultTheme).text};
`;

export const Title = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${defaultTheme.padding.small}
  font-size: ${defaultTheme.fontSize.large};
  font-weight: ${defaultTheme.fontWeight.bold};
`;
export const ProgressCircle = styled.circle`
  stroke-dasharray: ${({ circumference }) => circumference};
  stroke-dashoffset: ${({ percent, circumference }) =>
    ((100 - percent) / 100) * circumference};
  stroke: ${({ color, theme }) =>
    color || mergeTheme(theme, defaultTheme).primary};
  stroke-width: ${props => props.strokeWidth};
  stroke-linecap: round;
  fill: none;
`;

export const BackgroundCircle = styled.circle`
  fill: none;
  stroke: ${props =>
    props.backgroundColor ||
    mergeTheme(props.theme, defaultTheme).backgroundContrast2};
  stroke-width: ${props => props.strokeWidth};
`;
