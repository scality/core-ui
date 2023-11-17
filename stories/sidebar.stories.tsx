import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { LateralNavbarLayout, Loader } from '../src/lib';
import { Sidebar } from '../src/lib/components/sidebar/Sidebar.component';

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
  args: {
    actions,
  },
  parameters: {
    layout: 'fullscreen',
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

export const SidebarInLayout: StoryObj<typeof Sidebar> = {
  render: (args) => {
    return (
      <LateralNavbarLayout sidebar={{ ...args }}>
        <Loader size="massive" />
      </LateralNavbarLayout>
    );
  },
};

export const SidebarinLayoutWithToggle: Story = {
  render: (args) => {
    const [expandedWithToggle, setExpandedWithToggle] = useState(false);
    return (
      <LateralNavbarLayout
        sidebar={{
          expanded: expandedWithToggle,
          onToggleClick: () => {
            setExpandedWithToggle(!expandedWithToggle);
          },
          ...args,
        }}
      >
        <Loader size="massive" />
      </LateralNavbarLayout>
    );
  },
};
