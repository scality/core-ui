import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import {
  UnsuccessfulResult,
  UnsuccessfulResultProps,
} from '../src/lib/components/UnsuccessfulResult.component.tsx';

type Story = StoryObj<UnsuccessfulResultProps>;

const meta: Meta<UnsuccessfulResultProps> = {
  title: 'Components/NoResult',
  component: UnsuccessfulResult,
};

export default meta;

export const Loading: Story = {
  render: () => {
    return <UnsuccessfulResult status="loading" />;
  },
};

export const Error: Story = {
  render: () => {
    return <UnsuccessfulResult status="error" />;
  },
};

export const NoResult: Story = {
  render: () => {
    return <UnsuccessfulResult status="noResult" />;
  },
};
