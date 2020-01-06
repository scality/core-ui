import styled from "styled-components";
import * as defaultTheme from "../../style/theme";
import { getThemePropSelector, getTheme } from "../../utils";

export const CircularProgressBarContainer = styled.div`
  display: inline-block;
  color: ${getThemePropSelector("text")};
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
  stroke: ${props => props.color || getTheme(props).primary};
  stroke-width: ${props => props.strokeWidth};
  stroke-linecap: round;
  fill: none;
`;

export const BackgroundCircle = styled.circle`
  fill: none;
  stroke: ${props =>
    props.backgroundColor || getTheme(props).backgroundContrast2};
  stroke-width: ${props => props.strokeWidth};
`;
