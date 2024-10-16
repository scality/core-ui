import styled, { css } from 'styled-components';
import { spacing } from '../../spacing';
import { gray, white } from '../../style/theme';
import { getThemePropSelector } from '../../utils';
import { Icon } from '../icon/Icon.component';
import { Loader } from '../loader/Loader.component';
type StepProps = {
  title: React.ReactNode;
  content?: React.ReactNode;
  active?: boolean;
  completed?: boolean;
  isLast?: boolean;
  index?: number;
  error?: boolean;
  inProgress?: boolean;
};
type Props = {
  steps: Array<StepProps>;
  activeStep: number;
};
const SteppersContainer = styled.div`
  padding-top: 4rem;
  padding-left: 2rem;
`;
const StepContainer = styled.div`
  display: flex;
  min-height: 50px;
  min-width: 20rem;
`;
const Panel = styled.div`
  display: flex;
  flex-direction: column;
`;
const Circle = styled.div<{
  error?: boolean;
  completed?: boolean;
  active?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 30px;
  width: 30px;
  height: 30px;
  border-radius: 50%;

  ${(props) => {
    const { statusCritical, statusHealthy, selectedActive, buttonSecondary } =
      props.theme;

    if (props.error) {
      return css`
        background-color: ${statusCritical};
        color: ${white};
      `;
    } else if (props.active) {
      return css`
        background-color: ${selectedActive};
        color: ${white};
        svg {
          fill: ${white};
        }
      `;
    } else if (props.completed) {
      return css`
        background-color: ${statusHealthy};
        color: ${white};
      `;
    } else {
      return css`
        background-color: ${buttonSecondary};
        color: ${white};
      `;
    }
  }};
`;
const StepHeader = styled.span<{ active?: boolean }>`
  margin-left: ${spacing.r8};
  line-height: 30px;
  color: ${(props) =>
    props.active
      ? getThemePropSelector('textPrimary')
      : getThemePropSelector('textSecondary')};
`;
const StepContent = styled.div`
  padding: ${spacing.r8} 0 ${spacing.r8} ${spacing.r8};
`;
const BottomBar = styled.hr<{ completed?: boolean }>`
  flex-grow: 1;
  margin: 0;
  border: none;
  margin: 4px 14px;

  ${(props) => {
    if (props.completed) {
      return css`
        border-left: 2px solid ${props.theme.statusHealthy};
      `;
    } else {
      return css`
        border-left: 2px solid ${gray};
      `;
    }
  }};
`;

function Step(props: StepProps) {
  const {
    title,
    content,
    active,
    completed,
    isLast,
    index = 0,
    error,
    inProgress,
  } = props;
  const circleContent = completed ? <Icon name="Check" /> : index + 1;

  return (
    <StepContainer>
      <Panel>
        <Circle active={active} error={error} completed={completed}>
          {active && inProgress ? (
            <Loader size="base" />
          ) : (
            <span>{circleContent}</span>
          )}
        </Circle>
        {!isLast && <BottomBar completed={completed} />}
      </Panel>
      <Panel>
        <div
          style={{
            height: '30px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <StepHeader active={active}>{title}</StepHeader>
        </div>
        {active && <StepContent>{content}</StepContent>}
      </Panel>
    </StepContainer>
  );
}

function Steppers({ steps, activeStep, ...rest }: Props) {
  return (
    <SteppersContainer className="sc-steppers" {...rest}>
      {steps.map(({ title, content, ...stepRest }, index) => (
        <Step
          key={index}
          title={title}
          content={content}
          active={index === activeStep}
          completed={index < activeStep}
          isLast={index === steps.length - 1}
          index={index}
          {...stepRest}
        />
      ))}
    </SteppersContainer>
  );
}

export { Steppers };
