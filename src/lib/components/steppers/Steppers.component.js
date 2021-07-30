//@flow
import React from 'react';
import styled, { css } from 'styled-components';
import type { Node } from 'react';
import * as defaultTheme from '../../style/theme';
import Loader from '../loader/Loader.component';
import { getTheme, getThemePropSelector } from '../../utils';
type StepProps = {
  title: Node,
  content: Node,
  active?: boolean,
  completed?: boolean,
  isLast?: boolean,
  index?: number,
  error?: boolean,
  inProgress?: boolean,
};

type Props = {
  steps: Array<StepProps>,
  activeStep: number,
};
const SteppersContainer = styled.div``;

const StepContainer = styled.div`
  display: flex;
  min-height: 50px;
`;
const Panel = styled.div`
  display: flex;
  flex-direction: column;
`;

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;

  ${(props) => {
    const { statusCritical, statusHealthy, selectedActive } = getTheme(props);
    if (props.error) {
      return css`
        background-color: ${statusCritical};
        color: ${defaultTheme.white};
      `;
    } else if (props.active) {
      return css`
        background-color: ${selectedActive};
        color: ${defaultTheme.white};
        svg {
          fill: ${defaultTheme.white};
        }
      `;
    } else if (props.completed) {
      return css`
        background-color: ${statusHealthy};
        color: ${defaultTheme.white};
      `;
    } else {
      return css`
        background-color: ${defaultTheme.gray};
        color: ${defaultTheme.white};
      `;
    }
  }};
`;

const StepHeader = styled.span`
  padding: 8px;
  color: ${getThemePropSelector('textPrimary')};
`;
const StepContent = styled.div`
  padding: ${defaultTheme.padding.small};
`;
const BottomBar = styled.hr`
  flex-grow: 1;
  margin: 0;
  border: none;
  margin: 2px 14px;

  ${(props) => {
    if (props.completed) {
      return css`
        border-left: 2px solid ${getTheme(props).statusHealthy};
      `;
    } else {
      return css`
        border-left: 2px solid ${defaultTheme.gray};
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
    index,
    error,
    inProgress,
  } = props;

  const circleContent = completed ? <i className="fas fa-check" /> : index + 1;

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
        <StepHeader completed={completed}>{title}</StepHeader>
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

export default Steppers;
