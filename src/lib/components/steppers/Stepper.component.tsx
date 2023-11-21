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

declare global {
  interface Window {
    StepperContext: React.Context<StepperContextType | null>;
  }
}

if (!window.StepperContext) {
  window.StepperContext = createContext<StepperContextType | null>(null);
}

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
  const context = useContext(window.StepperContext);

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

  return (
    <window.StepperContext.Provider value={{ next, prev }}>
      <Box display={'flex'} gap={32} padding={16} flex={1}>
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
    </window.StepperContext.Provider>
  );
};
