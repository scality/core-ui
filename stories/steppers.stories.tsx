import React from 'react';
import Steppers from '../src/lib/components/steppers/Steppers.component';
import { action } from '@storybook/addon-actions';
import Button from '../src/lib/components/button/Button.component';
import { Wrapper, Title } from './common';
const steps = [
  {
    title: 'Node Registerd',
    content: (
      <Button
        size="small"
        text="Apply"
        onClick={action('Button Apply Click')}
      />
    ),
    'data-cy': 'Node_Registerd',
  },
  {
    title: 'Deploy Salt Minion on node',
    inProgress: false,
    content: (
      <Button
        size="small"
        text="Apply"
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
        size="small"
        text="Apply"
        onClick={action('Button Apply Click')}
      />
    ),
    'data-cy': 'Add_Node_WP',
  },
  {
    title: 'Add node to Control Plane',
    content: (
      <Button
        size="small"
        text="Apply"
        onClick={action('Button Apply Click')}
      />
    ),
    'data-cy': 'Add_Node_CP',
  },
  {
    title: 'Extend etcd cluster to node',
    content: (
      <Button
        size="small"
        text="Apply"
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
    <Button size="small" text="Apply" onClick={action('Button Apply Click')} />
  ),
  'data-cy': 'Deploy_Salt',
};
const stepsWithError = [...steps];
stepsWithError[2] = {
  title: 'Add node to Workload Plane',
  error: true,
  content: (
    <Button size="small" text="Apply" onClick={action('Button Apply Click')} />
  ),
  'data-cy': 'Add_Node_WP',
};
export default {
  title: 'Components/Progress & loading/Steppers',
  component: Steppers,
};
export const Default = () => {
  return (
    <Wrapper>
      <Title>Default Steppers </Title>
      <Steppers steps={steps} activeStep={1} />
      <Title>Steppers with loading</Title>
      <Steppers steps={stepsWithProgress} activeStep={1} />
      <Title>Steppers with error</Title>
      <Steppers steps={stepsWithError} activeStep={2} />
    </Wrapper>
  );
};