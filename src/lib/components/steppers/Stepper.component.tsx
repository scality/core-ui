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
  const [currentStep, setCurrentStep] = useState(0);
  const [stepProps, setStepProps] = useState({});

  const next = (props: Record<string, unknown>) => {
    setCurrentStep(currentStep + 1);
    setStepProps(props);
  };

  const prev = (props: Record<string, unknown>) => {
    setCurrentStep(currentStep - 1);
    setStepProps(props);
  };

  const { Component } = steps[currentStep];
  const StepperContext = window.StepperContext;

  return (
    <StepperContext.Provider value={{ next, prev }}>
      <Box display={'flex'} gap={32} padding={32}>
        <Steppers
          activeStep={currentStep}
          steps={steps.map((step) => {
            return {
              title: step.label,
            };
          })}
        />
        <Component {...stepProps} />
      </Box>
    </StepperContext.Provider>
  );
};
