import React from 'react';
import { Steppers } from '../src/lib/components/steppers/Steppers.component';
import { action } from '@storybook/addon-actions';
import { Button } from '../src/lib/components/buttonv2/Buttonv2.component';
const steps = [
  {
    title: 'Step 1',
    content: (
      <Button
        variant="secondary"
        label="Apply"
        onClick={action('Button Apply Click')}
      />
    ),
    'data-cy': 'Step_1',
  },
  {
    title: 'Step 2',
    inProgress: false,
    content: (
      <Button
        label="Apply"
        variant="secondary"
        onClick={action('Button Apply Click')}
      />
    ),
    'data-cy': 'Step_2',
  },
  {
    title: 'Step 3',
    error: false,
    content: (
      <Button
        label="Apply"
        variant="secondary"
        onClick={action('Button Apply Click')}
      />
    ),
    'data-cy': 'Step_3',
  },
  {
    title: 'Step 4',
    content: (
      <Button
        label="Apply"
        variant="secondary"
        onClick={action('Button Apply Click')}
      />
    ),
    'data-cy': 'Step_4',
  },
  {
    title: 'Step 5',
    content: (
      <Button
        label="Apply"
        variant="secondary"
        onClick={action('Button Apply Click')}
      />
    ),
    'data-cy': 'Step_5',
  },
];
const stepsWithProgress = [...steps];
stepsWithProgress[1] = {
  title: 'Step 2',
  inProgress: true,
  content: (
    <Button
      label="Apply"
      variant="secondary"
      onClick={action('Button Apply Click')}
    />
  ),
  'data-cy': 'Step_2',
};
const stepsWithError = [...steps];
stepsWithError[2] = {
  title: 'Step 3',
  error: true,
  content: (
    <Button
      label="Apply"
      variant="secondary"
      onClick={action('Button Apply Click')}
    />
  ),
  'data-cy': 'Step_3',
};
export default {
  title: 'Components/Progress & loading/Steppers',
  component: Steppers,
};

export const DefaultSteppers = {
  args: {
    steps,
    activeStep: 1,
  },
};

export const SteppersWithLoading = {
  args: {
    steps: stepsWithProgress,
    activeStep: 1,
  },
};

export const SteppersWithError = {
  args: {
    steps: stepsWithError,
    activeStep: 2,
  },
};
