import styled, { css, keyframes } from 'styled-components';
import { coreUIAvailableThemes } from '../../style/theme';
export type CloudProgressBarProps = {
  percentage: number;
  borderSize: string;
  cloudColor?: string;
  progressCloudColor?: string;
  children: JSX.Element;
};

const keyFrameCloud = (props) => {
  return keyframes`
    from {
      height:100%
    } 
    to {
      height:${100 - props.percentage}%
    }`;
};

const Container = styled.div`
  ${(props) => {
    return css`
      text-align: center;
      position: relative;
    `;
  }}
`;
const ContainerProgress = styled.div`
  ${(props) => {
    return css`
      animation-duration: 1s;
      animation-fill-mode: both;
      animation-name: ${keyFrameCloud};
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      overflow: hidden;
    `;
  }}
`;

const Cloud = ({ strokeColor, borderSize }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 15 72 42"
    enableBackground="new 0 0 72 72"
  >
    <g>
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth={borderSize}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        d="M15.9,30.3c0,0.4-0.4,0.8-0.8,0.8C10,31.6,6,36.7,6,42.9c0,6.6,4.5,11.9,10.2,11.9h38.7C61,54.8,66,49.1,66,42.2c0-6.6-4.6-12.1-10.4-12.5c-0.4,0-0.8-0.3-0.9-0.8c-1.3-6.7-7.3-11.7-14.3-11.7c-4.6,0-8.7,2.1-11.3,5.4C28.8,23,28.3,23.1,28,23c-1-0.4-2.1-0.6-3.3-0.6C20.1,22.3,16.3,25.8,15.9,30.3z"
      />
    </g>
  </svg>
);

const CloudProgress = ({ strokeColor, percentage, borderSize }) => (
  <ContainerProgress percentage={percentage}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 15 72 42"
      enableBackground="new 0 0 72 72"
    >
      <g>
        <path
          fill="none"
          stroke={strokeColor}
          strokeWidth={borderSize}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M15.9,30.3c0,0.4-0.4,0.8-0.8,0.8C10,31.6,6,36.7,6,42.9c0,6.6,4.5,11.9,10.2,11.9h38.7C61,54.8,66,49.1,66,42.2c0-6.6-4.6-12.1-10.4-12.5c-0.4,0-0.8-0.3-0.9-0.8c-1.3-6.7-7.3-11.7-14.3-11.7c-4.6,0-8.7,2.1-11.3,5.4C28.8,23,28.3,23.1,28,23c-1-0.4-2.1-0.6-3.3-0.6C20.1,22.3,16.3,25.8,15.9,30.3z"
        />
      </g>
    </svg>
  </ContainerProgress>
);

const CloudProgressBar = ({
  percentage = 0,
  borderSize = '2px',
  cloudColor = coreUIAvailableThemes.darkRebrand.statusHealthy,
  progressCloudColor = coreUIAvailableThemes.darkRebrand.backgroundLevel1,
  children,
}: CloudProgressBarProps) => (
  <Container className="sc-cloudprogressbar">
    <Cloud strokeColor={progressCloudColor} borderSize={borderSize} />
    <CloudProgress
      strokeColor={cloudColor}
      percentage={percentage}
      borderSize={borderSize}
    />

    {children}
  </Container>
);

export { CloudProgressBar };
