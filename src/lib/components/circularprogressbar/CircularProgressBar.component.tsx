import {
  BackgroundCircle,
  CircularProgressBarContainer,
  ProgressCircle,
  Title,
} from './CircularProgressBar.component.style';

type Props = {
  percent: number;
  radius: number;
  strokeWidth?: number;
  title?: string;
  color?: string;
  backgroundColor?: string;
  children?: JSX.Element;
  className?: string;
};

/**
 *
 * 
 * @example 
 * <CircularProgressBar 
 * title="Total Capacity" 
 * percent={60} 
 * radius={70} 
 * color="red" 
 * backgroundColor="blue" 
 * strokeWidth={10} 
 * > 
 * 	<text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"  
        fontSize={fontSize.smaller}
      >
        text content
      </text> 
    </CircularProgressBar>
 */
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
    <CircularProgressBarContainer {...rest}>
      {title && <Title>{title}</Title>}

      <svg width={svgSize} height={svgSize}>
        <BackgroundCircle
          cx={centerPointCoordinate}
          cy={centerPointCoordinate}
          $backgroundColor={backgroundColor}
          r={radius}
          $strokeWidth={strokeWidth}
        />
        <ProgressCircle
          $percent={percent}
          $color={color}
          $circumference={CIRCUMFERENCE}
          cx={centerPointCoordinate}
          cy={centerPointCoordinate}
          r={radius}
          $strokeWidth={strokeWidth}
          transform={`rotate(-90 ${centerPointCoordinate}  ${centerPointCoordinate})`} // To start at 0 o'clock
        />
        {children}
      </svg>
    </CircularProgressBarContainer>
  );
}

export { CircularProgressBar };
