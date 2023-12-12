import styled, { css } from 'styled-components';
import { spacing } from '../../spacing';
import { fontSize, fontWeight, coreUIAvailableThemes } from '../../style/theme';
import { getThemePropSelector } from '../../utils';
import { Size } from '../constants';
export type ProgressBarProps = {
  percentage: number;
  size?: Size | 'custom';
  color?: string;
  // The color of unfill bar
  backgroundColor?: string;
  topLeftLabel?: string;
  topRightLabel?: string;
  bottomLeftLabel?: string;
  bottomRightLabel?: string;
  buildinLabel?: string;
  // The animation to full the progress bar
  isAnimation?: boolean;
  height?: React.CSSProperties['height'];
};
const Container = styled.div``;
const ProgressBarContainer = styled.div<{
  backgroundColor: string;
  size: keyof typeof fontSize | 'custom';
  buildinLabel?: string;
  height?: React.CSSProperties['height'];
}>`
  display: flex;
  border-radius: 4px;
  justify-content: space-between;
  align-items: center;

  ${(props) => {
    switch (props.size) {
      case 'smaller':
        return css`
          height: ${fontSize.smaller};
          font-size: ${fontSize.smaller};
        `;

      case 'base':
        return css`
          height: ${fontSize.small};
          font-size: ${fontSize.small};
        `;

      case 'large':
        return css`
          height: ${fontSize.base};
          font-size: ${fontSize.base};
        `;

      case 'larger':
        return css`
          height: 20px;
        `;

      case 'custom':
        return css`
          height: ${props.height};
          font-size: ${props.height};
        `;
      default:
        return css`
          height: ${fontSize.base};
          font-size: ${fontSize.base};
        `;
    }
  }};

  background-color: ${(props) => {
    return props.backgroundColor;
  }};
  /* Add the border for the progress bar when there is label inside.*/
  ${(props) => {
    if (props.buildinLabel) {
      return css`
        border: 1px solid;
        border-color: ${getThemePropSelector('border')};
      `;
    }
  }};
`;
const TopLeftLabel = styled.span`
  display: inline-block;
  font-size: ${fontSize.large};
  font-weight: ${fontWeight.bold};
  color: ${getThemePropSelector('textPrimary')};
`;
const TopRightLabel = styled.span`
  display: inline-block;
  font-size: ${fontSize.small};
  color: ${getThemePropSelector('textPrimary')};
`;
const BottomLabel = styled.span`
  display: inline-block;
  color: ${getThemePropSelector('textSecondary')};
`;
const TopLabelsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 ${spacing.r4} 0;
`;
const BottomLabelsContainer = styled(TopLabelsContainer)`
  margin: ${spacing.r4} 0 0 0;
  font-size: ${fontSize.smaller};
`;
const FilledAreaContainer = styled.div<{
  isAnimation?: boolean;
  width: number;
}>`
  display: flex;
  justify-content: flex-start;
  border-radius: 4px;
  height: 100%;
  ${(props) => {
    if (props.isAnimation) {
      return css`
      @keyframes widthAnimation {
        from {
          width: 0%;
        }
        to {
          width: ${props.width} + "%";
        }
      }
      animation-duration: 1s;
      animation-fill-mode: both;
      animation-name: widthAnimation;

      background-color: ${props.color || props.theme.selectedActive}
      width: ${props.width}%;
    `;
    } else {
      return css`
        background-color: ${props.color || props.theme.selectedActive};
        width: ${props.width}%;
      `;
    }
  }}
`;
const BuildinLabel = styled.div`
  color: ${getThemePropSelector('textPrimary')};
  padding-left: 5px;
  white-space: nowrap;
`;

function ProgressBar({
  percentage = 50,
  size = 'base',
  color,
  backgroundColor = coreUIAvailableThemes.darkRebrand.backgroundLevel2,
  topLeftLabel,
  topRightLabel,
  bottomLeftLabel,
  bottomRightLabel,
  buildinLabel,
  isAnimation = false,
  height,
  ...rest
}: ProgressBarProps) {
  return (
    <Container className="sc-progressbar" {...rest}>
      {(topLeftLabel || topRightLabel) && (
        <TopLabelsContainer>
          {topLeftLabel && (
            <TopLeftLabel className="sc-progressbar-topLeftLabel">
              {topLeftLabel}
            </TopLeftLabel>
          )}
          {topRightLabel && (
            <TopRightLabel className="sc-progressbar-toprightlabel">
              {topRightLabel}
            </TopRightLabel>
          )}
        </TopLabelsContainer>
      )}
      <ProgressBarContainer
        className="sc-progressbarcontainer"
        size={size}
        buildinLabel={buildinLabel}
        backgroundColor={backgroundColor}
        height={height}
      >
        <FilledAreaContainer
          color={color}
          width={percentage}
          isAnimation={isAnimation}
        >
          <BuildinLabel>{buildinLabel}</BuildinLabel>
        </FilledAreaContainer>
      </ProgressBarContainer>

      {(bottomLeftLabel || bottomRightLabel) && (
        <BottomLabelsContainer>
          {bottomLeftLabel && (
            <BottomLabel className="sc-progressbar-bottomleftlabel">
              {bottomLeftLabel}
            </BottomLabel>
          )}
          {bottomRightLabel && (
            <BottomLabel className="sc-progressbar-bottomrightlabel">
              {bottomRightLabel}
            </BottomLabel>
          )}
        </BottomLabelsContainer>
      )}
    </Container>
  );
}

export { ProgressBar };
