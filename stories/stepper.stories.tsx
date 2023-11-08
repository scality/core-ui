import React from 'react';
import {
  Stepper,
  useStepper,
} from '../src/lib/components/steppers/Stepper.component';
import styled from 'styled-components';
import { Box } from '../src/lib/components/box/Box';
import { Stack } from '../src/lib/spacing';
import { Button } from '../src/lib/components/buttonv2/Buttonv2.component';
import { Text } from '../src/lib/components/text/Text.component';
import { Wrapper as StoryWrapper } from './common';
import type { Meta, StoryObj } from '@storybook/react';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
`;

const FirstStepComponent = (props: Record<string, never>) => {
  const { next } = useStepper(StepIndexes.Step1, STEPS);
  return (
    <Wrapper>
      <Box
        display="flex"
        flexDirection={'row'}
        alignItems="baseline"
        gap={'2rem'}
      ></Box>
      <Stack>
        <Text>First Step</Text>
        <Button
          label="Next"
          variant="secondary"
          onClick={() => next({ name: 'something' })}
        />
      </Stack>
    </Wrapper>
  );
};

const SecondStepComponent = ({ name }: { name: string }) => {
  const { next, prev } = useStepper(StepIndexes.Step2, STEPS);
  return (
    <Wrapper>
      <Box
        display="flex"
        flexDirection={'row'}
        alignItems="baseline"
        gap={'2rem'}
      ></Box>
      <Stack>
        <Text>Second Step : {name}</Text>
        <Button label="Back" variant="secondary" onClick={() => prev({})} />
        <Button
          label="Next"
          variant="secondary"
          onClick={() => next({ type: 'anything' })}
        />
      </Stack>
    </Wrapper>
  );
};

const ThirdStepComponent = ({ type }: { type: string }) => {
  const { prev } = useStepper(StepIndexes.Step3, STEPS);
  return (
    <Wrapper>
      <Box
        display="flex"
        flexDirection={'row'}
        alignItems="baseline"
        gap={'2rem'}
      ></Box>
      <Stack>
        <Text>Third Step : {type}</Text>
        <Button
          label="Back"
          variant="secondary"
          onClick={() => prev({ name: 'something' })}
        />
      </Stack>
    </Wrapper>
  );
};

const STEPS = [
  {
    label: 'Step 1',
    Component: FirstStepComponent,
  },
  {
    label: 'Step 2',
    Component: SecondStepComponent,
  },
  {
    label: 'Step 3',
    Component: ThirdStepComponent,
  },
] as const;

enum StepIndexes {
  Step1,
  Step2,
  Step3,
}

const meta: Meta<typeof Stepper> = {
  tags: ['autodocs'],
  title: 'Components/Stepper',
  component: Stepper,
};
export default meta;

type Story = StoryObj<typeof Stepper>;
export const SimpleStepper: Story = {
  name: 'Simple Stepper',
  render: () => (
    <StoryWrapper>
      <Stepper steps={STEPS} />
    </StoryWrapper>
  ),
};
