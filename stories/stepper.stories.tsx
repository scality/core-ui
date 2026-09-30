import React from 'react';
import {
  Stepper,
  useStepper,
} from '../src/lib/components/steppers/Stepper.component';
import { Steppers } from '../src/lib/components/steppers/Steppers.component';
import styled from 'styled-components';
import { Button } from '../src/lib/components/buttonv2/Buttonv2.component';
import {
  Form,
  FormGroup,
  FormSection,
} from '../src/lib/components/form/Form.component';
import { Input } from '../src/lib/components/inputv2/inputv2';
import { Text } from '../src/lib/components/text/Text.component';
import { Wrapper as StoryWrapper } from './common';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
  min-width: 16rem;
  border: 1px solid rgba(128, 128, 128, 0.2);
  border-radius: 6px;
  padding: 16px;
`;

const StepBody = styled.div`
  flex: 1;
  padding: 8px 0;
`;

const StepActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding-top: 16px;
`;

const Hidden = styled.span`
  visibility: hidden;
`;

const FirstStepComponent = (props: Record<string, never>) => {
  const { next } = useStepper(StepIndexes.Step1, STEPS);
  return (
    <Wrapper>
      <StepBody>
        <Text>First Step</Text>
      </StepBody>
      <StepActions>
        <Hidden><Button label="Back" variant="secondary" onClick={() => {}} /></Hidden>
        <Button label="Next" variant="primary" onClick={() => next({ name: 'something' })} />
      </StepActions>
    </Wrapper>
  );
};

const SecondStepComponent = ({ name }: { name: string }) => {
  const { next, prev } = useStepper(StepIndexes.Step2, STEPS);
  return (
    <Wrapper>
      <StepBody>
        <Text>Second Step: {name}</Text>
      </StepBody>
      <StepActions>
        <Button label="Back" variant="secondary" onClick={() => prev({})} />
        <Button label="Next" variant="primary" onClick={() => next({ type: 'anything' })} />
      </StepActions>
    </Wrapper>
  );
};

const ThirdStepComponent = ({ type }: { type: string }) => {
  const { prev } = useStepper(StepIndexes.Step3, STEPS);
  return (
    <Wrapper>
      <StepBody>
        <Text>Third Step: {type}</Text>
      </StepBody>
      <StepActions>
        <Button label="Back" variant="secondary" onClick={() => prev({ name: 'something' })} />
        <Hidden><Button label="Next" variant="primary" onClick={() => {}} /></Hidden>
      </StepActions>
    </Wrapper>
  );
};

const STEPS = [
  { label: 'Step 1', Component: FirstStepComponent },
  { label: 'Step 2', Component: SecondStepComponent },
  { label: 'Step 3', Component: ThirdStepComponent },
] as const;

enum StepIndexes {
  Step1,
  Step2,
  Step3,
}

const meta: Meta<typeof Stepper> = {
  tags: ['autodocs'],
  title: 'Components/Progress & loading/Stepper',
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

const PAGE_STEPS = [
  { label: 'Connection', Component: () => <PageStep title="Connection" /> },
  { label: 'Mapping', Component: () => <PageStep title="Mapping" /> },
  { label: 'Review', Component: () => <PageStep title="Review" /> },
] as const;

const PageStep = ({ title }: { title: string }) => (
  <Form
    layout={{ kind: 'page', title: `Create provider — ${title}` }}
    responsive
    leftActions={<Button variant="outline" label="Cancel" onClick={() => {}} />}
    rightActions={<Button variant="primary" label="Continue" onClick={() => {}} />}
  >
    <FormSection title={{ name: title, icon: 'Node-backend' }}>
      <FormGroup
        direction="horizontal"
        label="Provider name"
        id="page-step-name"
        content={<Input id="page-step-name" />}
      />
      <FormGroup
        direction="horizontal"
        label="Endpoint"
        id="page-step-endpoint"
        content={<Input id="page-step-endpoint" />}
      />
    </FormSection>
  </Form>
);

// The production shape: each step is a `page` Form, which centres its own content
// and — being a container — fills whatever column it is given. The rail would
// otherwise push that centre half a rail to the right, so the Stepper reserves the
// rail's width again on the other side. Narrow the window: the reservation gives
// way before the form's content does.
export const StepperWithPageForms: Story = {
  name: 'Steps as page forms',
  render: () => <Stepper steps={PAGE_STEPS} />,
};

const STATE_STEPS = [
  { title: 'Configure' },
  { title: 'Schedule' },
  { title: 'Confirm' },
];

export const StateCompleted = {
  tags: ['!dev'],
  render: () => (
    <Steppers steps={STATE_STEPS} activeStep={2} />
  ),
};

export const StateInProgress = {
  tags: ['!dev'],
  render: () => (
    <Steppers
      steps={[
        { title: 'Configure' },
        { title: 'Schedule', inProgress: true },
        { title: 'Confirm' },
      ]}
      activeStep={1}
    />
  ),
};

export const StateError = {
  tags: ['!dev'],
  render: () => (
    <Steppers
      steps={[
        { title: 'Configure' },
        { title: 'Schedule', error: true },
        { title: 'Confirm' },
      ]}
      activeStep={1}
    />
  ),
};
