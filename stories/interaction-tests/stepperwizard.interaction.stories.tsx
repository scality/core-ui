import React from 'react';
import { within, userEvent, expect } from 'storybook/test';
import {
  Stepper,
  useStepper,
} from '../../src/lib/components/steppers/Stepper.component';
import { Button } from '../../src/lib/components/buttonv2/Buttonv2.component';
import { Text } from '../../src/lib/components/text/Text.component';
import { Wrapper } from '../common';

// `play` as living documentation: it walks the wizard forward and back so the
// docs page shows the flow mid-interaction, while also asserting the state
// hand-off between steps (each step receives the props the previous one passed
// through `useStepper().next(...)`) — a cross-component interaction a static
// screenshot can't convey.
const StepShell = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      minWidth: '18rem',
    }}
  >
    {children}
  </div>
);

const NameStep = () => {
  const { next } = useStepper(0, STEPS);
  return (
    <StepShell>
      <Text>First step — choose a name</Text>
      <Button
        label="Next"
        variant="primary"
        onClick={() => next({ name: 'something' })}
      />
    </StepShell>
  );
};

const TypeStep = ({ name }: { name: string }) => {
  const { next, prev } = useStepper(1, STEPS);
  return (
    <StepShell>
      <Text>Second step: {name}</Text>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button label="Back" variant="secondary" onClick={() => prev({})} />
        <Button
          label="Next"
          variant="primary"
          onClick={() => next({ type: 'anything' })}
        />
      </div>
    </StepShell>
  );
};

const ConfirmStep = ({ type }: { type: string }) => {
  const { prev } = useStepper(2, STEPS);
  return (
    <StepShell>
      <Text>Third step: {type}</Text>
      <Button
        label="Back"
        variant="secondary"
        onClick={() => prev({ name: 'something' })}
      />
    </StepShell>
  );
};

const STEPS = [
  { label: 'Name', Component: NameStep },
  { label: 'Type', Component: TypeStep },
  { label: 'Confirm', Component: ConfirmStep },
] as const;

const meta = {
  title: 'Interaction Tests/Stepper Wizard',
  component: Stepper,
  tags: ['interaction-test'],
  decorators: [
    (story: () => React.ReactNode) => (
      <Wrapper style={{ padding: '2rem', minHeight: '16rem' }}>
        {story()}
      </Wrapper>
    ),
  ],
};
export default meta;

export const WalksThroughSteps = {
  render: () => <Stepper steps={STEPS} />,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByText('First step — choose a name'),
    ).toBeInTheDocument();

    // step 1 → 2 hands the `name` prop forward
    await userEvent.click(canvas.getByRole('button', { name: 'Next' }));
    await expect(
      await canvas.findByText('Second step: something'),
    ).toBeInTheDocument();

    // step 2 → 3 hands the `type` prop forward
    await userEvent.click(canvas.getByRole('button', { name: 'Next' }));
    await expect(
      await canvas.findByText('Third step: anything'),
    ).toBeInTheDocument();

    // walking back restores the earlier step and its state
    await userEvent.click(canvas.getByRole('button', { name: 'Back' }));
    await expect(
      await canvas.findByText('Second step: something'),
    ).toBeInTheDocument();
  },
};
