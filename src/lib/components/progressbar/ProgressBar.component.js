//@flow
import React, { useEffect, useState } from 'react';
import styled, { css } from "styled-components";
import { mergeTheme } from "../../utils";
import * as defaultTheme from "../../style/theme";

export type ProgressBarProps = {
  percentage: number,
  size?: Size,
  color?: string,
  topLeftLabel?: string,
  topRightLabel?: string,
  bottomLeftLabel?: string,
  bottomRightLabel?: string,
}

export const ProgressBarContainer = styled.div`
  background: ${defaultTheme.gray};
  width: 100%;

  ${props => {
    switch (props.size) {
      case "smaller":
        return css`
          border-radius: 12px;
          height: 10px;
        `;

      case "small":
        return css`
          border-radius: 12px;
          height: 15px;
        `;

      case "large":
        return css`
          border-radius: 12px;
          height: 15px;
        `;

      case "larger":
        return css`
          border-radius: 12px;
          height: 20px;
        `;

      default:
        return css`
          border-radius: 12px;
          height: 10px;
        `;
  }
}}
`;

export const Container = styled.div`
  .percentage {
    font-size: 20px;
    display: inline-block;
    font-weight: 800;
    margin-bottom: 4px;
    width: 50%;
    text-align: left;
  }

  .capacity {
    display: inline-block;
    width: 50%;
    text-align: right;
    font-size: 14px;
    color: #908d8d;
  }

  .used {
    display: inline-block;
    width: 50%;
    text-align: left;
  }

  .free {
    display: inline-block;
    width: 50%;
    text-align: right;
  }

  margin: 10px 0 10px 0;
`;

export const LabelContainer = styled.div`
  margin-top: 6px;
  font-size: ${defaultTheme.base};
`;

export const FilledAreaContainer = styled.div`
  transition:All 1s ease;
  -webkit-transition:All 1s ease;
  -moz-transition:All 1s ease;
  -o-transition:All 1s ease;

  ${props => {
    return css`
      border-radius: 12px;
      background-color: ${props => props.color || mergeTheme(props.theme, defaultTheme).primary};
      width: ${props.width}%;
      height: 100%;
    `;
  }
}}
`;

function ProgressBar({
  percentage = 50,
  size = 'base',
  color = '#fcb039',
  topLeftLabel = '55%',
  topRightLabel = '80GB Total',
  bottomLeftLabel = '45GB Used',
  bottomRightLabel = '25GB Free'
} : ProgressBarProps) {
  const [width, setWidth] = useState(0);
  useEffect(() => setWidth(percentage), [percentage]);

  return (
    <Container
      size={size}
    >
      {
        <span className="percentage">
          {topLeftLabel}
        </span>
      }
      {
        <span className="capacity">
          {topRightLabel}
        </span>
      }
      <ProgressBarContainer
        size={size}
      >
        <FilledAreaContainer
          color={color}
          width={width}
        />
      </ProgressBarContainer>
      {
        <LabelContainer>
          <span className="used">
            {bottomLeftLabel}
          </span>
          <span className="free">
            {bottomRightLabel}
          </span>
        </LabelContainer>
      }
    </Container>
  )
}

export default ProgressBar;
