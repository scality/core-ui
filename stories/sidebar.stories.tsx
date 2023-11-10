import React, { useState } from 'react';
import { Sidebar } from '../src/lib/components/sidebar/Sidebar.component';
import { action } from '@storybook/addon-actions';
import { StoryObj } from '@storybook/react';
import { Wrapper } from './common';

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

export default {
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

export const DefaultSidebar: StoryObj = {};

export const ExpandedSidebar = {
  args: {
    expanded: true,
  },
};

export const SidebarWithToggle = {
  render: (args) => {
    const [expandedWithToggle, setExpandedWithToggle] = useState(false);
    return (
      <Sidebar
        expanded={expandedWithToggle}
        onToggleClick={() => setExpandedWithToggle(!expandedWithToggle)}
        {...args}
      />
    );
  },
};

export const HoverableSidebar = {
  args: {
    hoverable: true,
  },
};
