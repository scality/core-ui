import styled from 'styled-components';
import { spacing } from '../../spacing';
import { getThemePropSelector } from '../../utils';
import { EmphaseText } from '../text/Text.component';
export const CircularProgressBarContainer = styled.div`
  display: inline-block;
  color: ${getThemePropSelector('textPrimary')};
`;
export const Title = styled(EmphaseText)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${spacing.r8};
`;
export const ProgressCircle = styled.circle<{
  circumference: number;
  percent: number;
}>`
  stroke-dasharray: ${({ circumference }) => circumference};
  stroke-dashoffset: ${({ percent, circumference }) =>
    ((100 - percent) / 100) * circumference};
  stroke: ${(props) => props.color || props.theme.statusHealthy};
  stroke-width: ${(props) => props.strokeWidth};
  stroke-linecap: round;
  fill: none;
`;
export const BackgroundCircle = styled.circle<{ backgroundColor?: string }>`
  fill: none;
  stroke: ${(props) => props.backgroundColor || props.theme.backgroundLevel1};
  stroke-width: ${(props) => props.strokeWidth};
`;
