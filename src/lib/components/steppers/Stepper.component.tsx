/// <reference path="./Stepper.component.d.ts" />
import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Steppers, STEPPERS_WIDTH } from './Steppers.component';
import { PAGE_FORM_WIDTH } from '../form/Form.constants';
import { Box } from '../box/Box';

const STEP_GAP_PX = 32;

const RESERVED_WIDTH = `calc(${STEPPERS_WIDTH} + ${STEP_GAP_PX}px)`;
// The row gap is laid out even when this item collapses to zero width, so the
// width includes one gap and the negative margin cancels it.
const RailMirror = styled.div`
  flex: 0 0 auto;
  width: ${RESERVED_WIDTH};
  margin-left: -${STEP_GAP_PX}px;
  min-width: 0;
  max-width: min(
    ${RESERVED_WIDTH},
    calc(100% - ${STEPPERS_WIDTH} - ${STEP_GAP_PX}px - ${PAGE_FORM_WIDTH})
  );
`;
export interface StepperContextType {
  next: (props: Record<string, unknown>) => void;
  prev: (props: Record<string, unknown>) => void;
}
declare global {
  interface Window {
    StepperContext: React.Context<StepperContextType | null>;
  }
}
if (!window.StepperContext) {
  window.StepperContext = createContext<StepperContextType | null>(null);
}

//@ts-ignore
export const useStepper: UseStepper = (index, steps) => {
  const context = useContext(window.StepperContext);

  if (context === null) {
    throw new Error('Cannot use useStepper outside of Stepper');
  }
  const { next, prev } = context;

  return { next, prev };
};

export const Stepper: Stepper = ({ steps }) => {
  const [stepProps, setStepProps] = useState<{
    step: number;
    props: Record<string, unknown>;
  }>({ step: 0, props: {} });

  const next = useCallback((props: Record<string, unknown>) => {
    setStepProps(current => ({ step: current.step + 1, props }));
  }, []);

  const prev = useCallback((props: Record<string, unknown>) => {
    setStepProps(current => ({ step: current.step - 1, props }));
  }, []);

  const { Component } = steps[stepProps.step];
  const StepperContext = window.StepperContext;

  const stepperValue = useMemo(() => ({ next, prev }), [next, prev]);

  return (
    <StepperContext.Provider value={stepperValue}>
      <Box display="flex" gap={STEP_GAP_PX} flex={1} height="100%">
        <Steppers
          activeStep={stepProps.step}
          steps={steps.map((step) => {
            return {
              title: step.label,
            };
          })}
        />
        <Component {...stepProps.props} />
        <RailMirror aria-hidden="true" />
      </Box>
    </StepperContext.Provider>
  );
};
