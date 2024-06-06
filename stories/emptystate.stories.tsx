import { Meta, StoryObj } from '@storybook/react';
import {
  EmptyState,
  Props,
} from '../src/lib/components/emptystate/Emptystate.component';
type Story = StoryObj<Props>;

const meta: Meta<Props> = {
  title: 'Components/Data Display/EmptyState',
  component: EmptyState,
  args: {
    icon: 'Node-backend',
    listedResource: {
      singular: 'resource',
      plural: 'resources',
    },
  },
};

export default meta;

export const Default: Story = {};

export const WithLink: Story = {
  args: {
    link: '',
  },
};
