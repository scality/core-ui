/// <reference path="./Stepper.component.d.ts" />
import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Steppers, STEPPERS_WIDTH } from './Steppers.component';
import { PAGE_FORM_WIDTH } from '../form/Form.constants';
import { Box } from '../box/Box';

const STEP_GAP_PX = 32;

const RAIL_COLUMN = `calc(${STEPPERS_WIDTH} + ${STEP_GAP_PX}px)`;

const Rail = styled(Steppers)`
  padding-right: ${STEP_GAP_PX}px;
`;

// A percentage in a grid-template-columns value resolves against the grid
// container, which is this row. The same percentage written in padding-right
// or inside a container-type wrapper would resolve against the parent instead.
const StepRow = styled(Box)`
  display: grid;
  grid-template-columns: ${RAIL_COLUMN} minmax(0, 1fr)
    max(0px, min(${RAIL_COLUMN}, calc(100% - ${RAIL_COLUMN} - ${PAGE_FORM_WIDTH})));
  grid-template-rows: minmax(0, 1fr);
`;

const StepSlot = styled.div`
  display: grid;
  grid-template-rows: minmax(0, 1fr);
  min-width: 0;
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
      <StepRow flex={1} height="100%">
        <Rail
          activeStep={stepProps.step}
          steps={steps.map((step) => {
            return {
              title: step.label,
            };
          })}
        />
        <StepSlot>
          <Component {...stepProps.props} />
        </StepSlot>
      </StepRow>
    </StepperContext.Provider>
  );
};
