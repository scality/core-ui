/// <reference path="./Stepper.component.d.ts" />
import { createContext, useContext, useState } from 'react';
import { Steppers } from './Steppers.component';
import { Box } from '../box/Box';
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

  const next = (props: Record<string, unknown>) => {
    setStepProps({ step: stepProps.step + 1, props });
  };

  const prev = (props: Record<string, unknown>) => {
    setStepProps({ step: stepProps.step - 1, props });
  };

  const { Component } = steps[stepProps.step];
  const StepperContext = window.StepperContext;

  return (
    <StepperContext.Provider value={{ next, prev }}>
      <Box display="flex" gap={32} flex={1} height="100%">
        <Steppers
          activeStep={stepProps.step}
          steps={steps.map((step) => {
            return {
              title: step.label,
            };
          })}
        />
        <Component {...stepProps.props} />
      </Box>
    </StepperContext.Provider>
  );
};
