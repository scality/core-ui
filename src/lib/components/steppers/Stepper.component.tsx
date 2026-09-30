/// <reference path="./Stepper.component.d.ts" />
import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Steppers, STEPPERS_WIDTH } from './Steppers.component';
import { PAGE_FORM_WIDTH } from '../form/Form.constants';
import { Box } from '../box/Box';

const STEP_GAP_PX = 32;

// The rail only takes room on the left, so a step component that centres its own
// content — a page `Form`, which also stretches to fill the row because its
// container query needs a width from the parent — settles half a rail right of
// the page's centre line. Reserving the rail's width again on the right puts it
// back.
//
// The reservation is capped at what is left once the step content has the width
// it wants, so it only ever claims room the content is not using: it gives way
// entirely before the content starts shrinking, and the row falls back to
// left-packed. `100%` resolves against the row's content box.
//
// It carries the row gap twice over — once in its width, once cancelled by the
// negative margin — because the gap is laid out whatever the width is. Without
// that, a collapsed reservation still costs the step content a gap (measured: 32px
// of form content lost below 1100), and a reservation of just the rail lands the
// content half a gap off centre.
const RESERVED_WIDTH = `calc(${STEPPERS_WIDTH} + ${STEP_GAP_PX}px)`;
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
