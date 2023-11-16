import React, { useState } from 'react';
import { Sidebar } from '../src/lib/components/sidebar/Sidebar.component';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { Wrapper } from './common';
import { useArgs } from '@storybook/preview-api';

type Story = StoryObj<typeof Sidebar>;

const actions = [
  {
    label: 'Dashboard',
    icon: <i className="fas fa-tachometer-alt" />,
    onClick: action('dashboard clicked'),
    active: true,
  },
  {
    label: 'Servers',
    icon: <i className="fas fa-server" />,
    onClick: action('server clicked'),
  },
  {
    label: 'Disks',
    icon: <i className="fas fa-hdd" />,
    onClick: action('disk clicked'),
  },
];

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Navigation/Sidebar',
  component: Sidebar,
  decorators: [
    (story) => {
      return (
        <Wrapper style={{ padding: '0' }}>
          <div style={{ width: '130px' }}>{story()}</div>
        </Wrapper>
      );
    },
  ],
  args: {
    actions,
  },
};
export default meta;

export const DefaultSidebar: Story = {};

export const ExpandedSidebar: Story = {
  args: {
    expanded: true,
  },
};

export const SidebarWithToggle: Story = {
  render: (args) => {
    const [{ expanded }, updateArgs] = useArgs();
    return (
      <Sidebar
        expanded={expanded}
        onToggleClick={() => updateArgs({ expanded: !expanded })}
        {...args}
      />
    );
  },
};

export const HoverableSidebar: Story = {
  args: {
    hoverable: true,
  },
};
