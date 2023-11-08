import { createContext, useContext, useState } from 'react';
import {
  Add,
  ExctractProps,
  StepperContextType,
  Steps,
  Subtract,
} from './types';
import { Steppers } from './Steppers.component';
import { Box } from '../box/Box';

const StepperContext = createContext<StepperContextType | null>(null);

export const useStepper = <
  T extends any[],
  StepIndex extends number,
  NextIndex = Add<StepIndex, 1>,
  PrevIndex = Subtract<StepIndex, 1>,
>(
  index: StepIndex,
  steps: readonly [...Steps<T>],
): (NextIndex extends number
  ? {
      next: (props: ExctractProps<T[NextIndex]>) => void;
    }
  : Record<string, unknown>) &
  (PrevIndex extends -1
    ? Record<string, unknown>
    : PrevIndex extends number
    ? {
        prev: (props: ExctractProps<T[PrevIndex]>) => void;
      }
    : Record<string, unknown>) => {
  const context = useContext(StepperContext);

  if (context === null) {
    throw new Error('Cannot use useStepper outside of Stepper');
  }
  const { next, prev } = context;

  //@ts-expect-error generic type
  return { next, prev };
};

export const Stepper = <T extends any[]>({
  steps,
}: {
  steps: readonly [...Steps<T>];
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [stepProps, setStepProps] = useState<Record<string, unknown>>({});

  const next = (props: Record<string, unknown>) => {
    setCurrentStep(currentStep + 1);
    setStepProps(props);
  };

  const prev = (props: Record<string, unknown>) => {
    setCurrentStep(currentStep - 1);
    setStepProps(props);
  };

  const { Component } = steps[currentStep];

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
