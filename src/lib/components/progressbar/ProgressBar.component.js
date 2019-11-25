//@flow
import React from "react";
import styled, { css } from "styled-components";
import { getTheme, getThemePropSelector } from "../../utils";
import * as defaultTheme from "../../style/theme";
import type { Size } from "../constants";

export type ProgressBarProps = {
  percentage: number,
  size?: Size,
  color?: string,
  topLeftLabel?: string,
  topRightLabel?: string,
  bottomLeftLabel?: string,
  bottomRightLabel?: string
};

const Container = styled.div`
  margin: ${defaultTheme.padding.small};
`;

const ProgressBarContainer = styled.div`
  background: ${defaultTheme.grayLight};
  border-radius: 12px;

  ${props => {
    switch (props.size) {
      case "smaller":
        return css`
          height: 10px;
        `;

      case "small":
        return css`
          height: 15px;
        `;

      case "large":
        return css`
          height: 15px;
        `;

      case "larger":
        return css`
          height: 20px;
        `;

      default:
        return css`
          height: 10px;
        `;
    }
  }}
`;

const TopLeftLabel = styled.span`
  font-size: ${defaultTheme.fontSize.large};
  display: inline-block;
  font-weight: ${defaultTheme.fontWeight.bold};
  color: ${getThemePropSelector("text")}};
`;

const TopRightLabel = styled.span`
  display: inline-block;
  color: ${defaultTheme.gray};
  font-size: ${defaultTheme.fontSize.small};
`;

const BottomLabel = styled.span`
  color: ${getThemePropSelector("text")}};
  display: inline-block;
`;

const TopLabelsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 ${defaultTheme.padding.smaller} 0;
`;

const BottomLabelsContainer = styled(TopLabelsContainer)`
  margin: ${defaultTheme.padding.smaller} 0 0 0;
`;

const FilledAreaContainer = styled.div`
  border-radius: 12px;
  height: 100%;
  ${props => {
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
  }}
`;

function ProgressBar({
  percentage = 50,
  size = "base",
  color,
  topLeftLabel = "",
  topRightLabel = "",
  bottomLeftLabel = "",
  bottomRightLabel = ""
}: ProgressBarProps) {
  return (
    <Container className="sc-progressbar">
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
      <ProgressBarContainer size={size}>
        <FilledAreaContainer color={color} width={percentage} />
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

export default ProgressBar;
