// @ts-nocheck
import styled, { css } from 'styled-components';
import { getTheme, getThemePropSelector } from '../../utils';
import * as defaultTheme from '../../style/theme';
import { Size } from '../constants';
export type ProgressBarProps = {
  percentage: number;
  size?: Size;
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
};
const Container = styled.div``;
const ProgressBarContainer = styled.div`
  display: flex;
  border-radius: 4px;
  justify-content: space-between;
  align-items: center;

  ${(props) => {
    switch (props.size) {
      case 'smaller':
        return css`
          height: ${defaultTheme.fontSize.smaller};
          font-size: ${defaultTheme.fontSize.smaller};
        `;

      case 'base':
        return css`
          height: ${defaultTheme.fontSize.small};
          font-size: ${defaultTheme.fontSize.small};
        `;

      case 'large':
        return css`
          height: ${defaultTheme.fontSize.base};
          font-size: ${defaultTheme.fontSize.base};
        `;

      case 'larger':
        return css`
          height: 20px;
        `;

      default:
        return css`
          height: ${defaultTheme.fontSize.base};
          font-size: ${defaultTheme.fontSize.base};
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
     border-color: ${getThemePropSelector('border')}};`;
    }
  }};
`;
const TopLeftLabel = styled.span`
  display: inline-block;
  font-size: ${defaultTheme.fontSize.large};
  font-weight: ${defaultTheme.fontWeight.bold};
  color: ${getThemePropSelector('textPrimary')}};
`;
const TopRightLabel = styled.span`
  display: inline-block;
  font-size: ${defaultTheme.fontSize.small};
  color: ${getThemePropSelector('textPrimary')}};
`;
const BottomLabel = styled.span`
  display: inline-block; 
  color: ${getThemePropSelector('textSecondary')}};
`;
const TopLabelsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 ${defaultTheme.padding.smaller} 0;
`;
const BottomLabelsContainer = styled(TopLabelsContainer)`
  margin: ${defaultTheme.padding.smaller} 0 0 0;
  font-size: ${defaultTheme.fontSize.smaller};
`;
const FilledAreaContainer = styled.div`
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

      background-color: ${props.color || getTheme(props).secondary}
      width: ${props.width}%;
    `;
    } else {
      return css`
        background-color: ${props.color || getTheme(props).secondary};
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
  backgroundColor = '#332C2C',
  topLeftLabel,
  topRightLabel,
  bottomLeftLabel,
  bottomRightLabel,
  buildinLabel,
  isAnimation = false,
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
