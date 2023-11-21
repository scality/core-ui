import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CopyButton } from '../src/lib/next';
import { Wrapper } from './common';

type Story = StoryObj<typeof CopyButton>;

const meta: Meta = {
  title: 'Components/CopyButton',
  component: CopyButton,
  decorators: [
    (story) => (
      <Wrapper className="storybook-button" style={{ height: 'auto' }}>
        {story()}
      </Wrapper>
    ),
  ],
};

export default meta;

export const CopyButtons: Story = {
  args: {
    textToCopy: 'Playground',
  },
};
export const CopyButtonsWithLabel: Story = {
  ...CopyButtons,
  args: {
    ...CopyButtons.args,
    label: 'Test',
  },
};

export const OutlinedCopyButton: Story = {
  ...CopyButtons,
  args: {
    ...CopyButtons.args,
    variant: 'outline',
  },
};

export const OutlinedCopyButtonWithLabel: Story = {
  ...OutlinedCopyButton,
  args: {
    ...OutlinedCopyButton.args,
    label: 'Test',
  },
};

export const OutlinedCopyButtonWithBigLabel: Story = {
  ...OutlinedCopyButton,
  args: {
    ...OutlinedCopyButton.args,
    label: 'Certificate',
    textToCopy: 'Certificate',
  },
};
