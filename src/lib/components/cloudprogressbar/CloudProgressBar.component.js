//@flow
import React from 'react';
import styled, { css } from "styled-components";
import * as defaultTheme from "../../style/theme";

export type CloudProgressBarProps = {
  percentage: number,
  borderSize: string,
  color?: string,
  progressColor?: string,
  label?: string,
  fontCOlor?: string,
  fontSizePercentage?: string,
  fontSizeLabel?: string
};

const Container = styled.div`
  ${props => {
    return css`
      width: 100%;
      text-align: center;
      position: relative;
    `;
  }}
`;

const ContainerProgress = styled.div`
  ${props => {
    return css`
      @keyframes heightAnimation {
        from {
          height: 100%;
        }
        to {
          height: ${100 - props.percentage}%;
        }
      }
      animation-duration: 1s;
      animation-fill-mode: both;
      animation-name: heightAnimation;
      position: absolute;
      z-index: 222;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      overflow: hidden;
    `;
  }}
`;

const LabelPercentage = styled.span`
  ${props => {
    return css`
      position: absolute;
      top: 50%;
      left: 50%;
      margin-right: -50%;
      transform: translate(-50%, -50%);
      color: ${props.fontColor};
      font-size: ${props.fontSize};
      font-weight: 900;
    `;
  }}
`;

const Label = styled.span`
  ${props => {
    return css`
      position: absolute;
      top: 60%;
      left: 50%;
      margin-right: -50%;
      transform: translate(-50%, -60%);
      color: ${props.fontColor};
      font-size: ${props.fontSize};
    `;
  }}
`;

const Cloud = ({
  strokeColor,
  borderSize
}) =>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 16 16"
  >
    <path 
      d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925" 
      transform="matrix(.77976 0 0 .78395-299.99-418.63)" 
      fill="transparent"
      stroke={strokeColor}
      stroke-width={borderSize}
      stroke-linejoin='round'
    />
  </svg>

const CloudProgress = ({
  strokeColor,
  size,
  percentage,
  borderSize
}) =>
  <ContainerProgress
    size={size}
    percentage={percentage}
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 16 16"
    >
      <path 
        d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925" 
        transform="matrix(.77976 0 0 .78395-299.99-418.63)" 
        fill="transparent"
        stroke={strokeColor}
        stroke-width={borderSize}
        stroke-linejoin='round'
      />
    </svg>
  </ContainerProgress>

const CloudProgressBar = ({
  percentage = 0,
  borderSize = '2px',
  color = defaultTheme.pink,
  progressColor = defaultTheme.green,
  label = '',
  fontColor = defaultTheme.black,
  fontSizePercentage = '10px',
  fontSizeLabel = '5px'
}: CloudProgressBarProps) =>
  <Container
    color={color}
  >
    <Cloud
      strokeColor={progressColor}
      borderSize={borderSize}
    />
    <CloudProgress
      strokeColor={color}
      percentage={percentage}
      borderSize={borderSize}
    />
    <LabelPercentage
      fontColor={fontColor}
      fontSize={fontSizePercentage}
    >
      {`${percentage}%`}
    </LabelPercentage>
    <Label
      color={fontColor}
      fontSize={fontSizeLabel}
    >
      {label}
    </Label>
  </Container>

export default CloudProgressBar;
