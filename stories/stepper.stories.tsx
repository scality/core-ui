import React from 'react';
import {
  Stepper,
  useStepper,
} from '../src/lib/components/steppers/Stepper.component';
import { Steppers } from '../src/lib/components/steppers/Steppers.component';
import styled, { css } from 'styled-components';
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

// --- Centring comparison ----------------------------------------------------
// Three states of the same stepper, to decide where the step content belongs.
// Each case runs the real Form and the real Stepper; the only difference is a
// CSS overlay restoring an earlier state, so nothing here is a mock.

const CaseFrame = styled.div<{ $variant: 'legacy' | 'regression' | 'fixed' }>`
  position: relative;
  height: 26rem;
  border: 1px solid rgba(128, 128, 128, 0.35);
  border-radius: 6px;
  overflow: hidden;

  /* The page's centre line, to read each case against. */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 1px;
    background: rgba(255, 64, 64, 0.85);
    z-index: 3;
    pointer-events: none;
  }

  /* The form's three columns — header, scroll area, footer — are what carries
     the centring, so outline them to make their position readable. */
  & form > div {
    outline: 1px dashed rgba(0, 170, 255, 0.8);
    outline-offset: -1px;
  }

  ${({ $variant }) =>
    $variant === 'legacy' &&
    css`
      /* Form.component.tsx before ba01ece6: the containment had no width
         companion, so the form resolved to 0 as a content-sized flex item and
         its columns, pinned at 45rem, overflowed it to the right. */
      & form {
        flex: 0 1 auto;
        min-width: auto;
      }
      & form > div {
        box-sizing: content-box;
        width: 45rem;
        max-width: none;
      }
    `}

  ${({ $variant }) =>
    $variant === 'regression' &&
    css`
      /* The Stepper without its reservation: the last child of its flex row. */
      & > div > *:last-child {
        display: none;
      }
    `}
`;

const CENTRING_CASES = [
  {
    variant: 'legacy',
    title: '1 — Before the Form change',
    note: 'Containment with no width companion: the form box is 0 wide and its 45rem columns overflow it, starting just right of the rail. Lands a little left of centre, by accident.',
  },
  {
    variant: 'regression',
    title: '2 — Today',
    note: 'The form now takes its width from the parent, so it fills the column beside the rail and centres its content on that column. Half a rail right of centre.',
  },
  {
    variant: 'fixed',
    title: '3 — With the rail reservation',
    note: "The rail's width is reserved again on the right, capped at what is left once the form has the width it wants. On centre.",
  },
] as const;

export const StepContentCentring: Story = {
  name: 'Step content centring — before / today / fix',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {CENTRING_CASES.map(({ variant, title, note }) => (
        <div key={variant}>
          <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{title}</div>
          <div style={{ opacity: 0.7, marginBottom: '0.5rem', maxWidth: '60rem' }}>
            {note}
          </div>
          <CaseFrame $variant={variant}>
            <Stepper steps={PAGE_STEPS} />
          </CaseFrame>
        </div>
      ))}
    </div>
  ),
};
