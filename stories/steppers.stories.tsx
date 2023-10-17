import React from 'react';
import { Steppers } from '../src/lib/components/steppers/Steppers.component';
import { action } from '@storybook/addon-actions';
import { Button } from '../src/lib/components/buttonv2/Buttonv2.component';
import { Wrapper } from './common';
const steps = [
  {
    title: 'Node Registered',
    content: (
      <Button
        variant='secondary'
        label="Apply"
        onClick={action('Button Apply Click')}
      />
    ),
    'data-cy': 'Node_Registered',
  },
  {
    title: 'Deploy Salt Minion on node',
    inProgress: false,
    content: (
      <Button
        label="Apply"
        variant='secondary'
        onClick={action('Button Apply Click')}
      />
    ),
    'data-cy': 'Deploy_Salt',
  },
  {
    title: 'Add node to Workload Plane',
    error: false,
    content: (
      <Button
        label="Apply"
        variant='secondary'
        onClick={action('Button Apply Click')}
      />
    ),
    'data-cy': 'Add_Node_WP',
  },
  {
    title: 'Add node to Control Plane',
    content: (
      <Button
        label="Apply"
        variant='secondary'
        onClick={action('Button Apply Click')}
      />
    ),
    'data-cy': 'Add_Node_CP',
  },
  {
    title: 'Extend etcd cluster to node',
    content: (
      <Button
        label="Apply"
        variant='secondary'
        onClick={action('Button Apply Click')}
      />
    ),
    'data-cy': 'Extend_Node',
  },
];
const stepsWithProgress = [...steps];
stepsWithProgress[1] = {
  title: 'Deploy Salt Minion on node',
  inProgress: true,
  content: (
    <Button label="Apply" variant='secondary' onClick={action('Button Apply Click')} />
  ),
  'data-cy': 'Deploy_Salt',
};
const stepsWithError = [...steps];
stepsWithError[2] = {
  title: 'Add node to Workload Plane',
  error: true,
  content: (
    <Button label="Apply" variant='secondary' onClick={action('Button Apply Click')} />
  ),
  'data-cy': 'Add_Node_WP',
};
export default {
  title: 'Components/Progress & loading/Steppers',
  component: Steppers,
  decorators:[story => <Wrapper>{story()}</Wrapper>]
};

export const DefaultSteppers = {
  args:{
    steps,
    activeStep:1
  }
}

export const SteppersWithLoading = {
  args:{
    steps:stepsWithProgress,
    activeStep:1
  }
}

export const SteppersWithError = {
  args:{
    steps:stepsWithError,
    activeStep:2
  }
}