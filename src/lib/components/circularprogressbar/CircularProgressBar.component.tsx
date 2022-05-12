import {
  CircularProgressBarContainer,
  Title,
  ProgressCircle,
  BackgroundCircle,
} from './CircularProgressBar.component.style';
type Props = {
  percent: number;
  radius: number;
  strokeWidth?: number;
  title?: string;
  color?: string;
  backgroundColor?: string;
  children?: JSX.Element;
};

function CircularProgressBar({
  percent,
  radius,
  strokeWidth = 10,
  title,
  color,
  backgroundColor,
  children,
  ...rest
}: Props) {
  const centerPointCoordinate = strokeWidth / 2 + radius;
  const svgSize = centerPointCoordinate * 2;
  const CIRCUMFERENCE = Math.PI * (radius * 2);
  return (
    <CircularProgressBarContainer className="sc-circularprogressbar" {...rest}>
      {title && <Title>{title}</Title>}

      <svg width={svgSize} height={svgSize}>
        <BackgroundCircle
          cx={centerPointCoordinate}
          cy={centerPointCoordinate}
          backgroundColor={backgroundColor}
          r={radius}
          strokeWidth={strokeWidth}
        ></BackgroundCircle>
        <ProgressCircle
          percent={percent}
          color={color}
          circumference={CIRCUMFERENCE}
          cx={centerPointCoordinate}
          cy={centerPointCoordinate}
          r={radius}
          strokeWidth={strokeWidth}
          transform={`rotate(-90 ${centerPointCoordinate}  ${centerPointCoordinate})`} // To start at 0 o'clock
        ></ProgressCircle>
        {children}
      </svg>
    </CircularProgressBarContainer>
  );
}

export { CircularProgressBar };
