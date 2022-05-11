import React, { useState } from 'react';
import Sidebar from '../src/lib/components/sidebar/Sidebar.component';
import { action } from '@storybook/addon-actions';
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
};
export const Default = () => {
  const [expandedWithToggle, setExpandedWithToggle] = useState(false);
  const [expandedHoverable, setExpandedHoverable] = useState(false);
  return (
    <div>
      <h3>Sidebar docked</h3>
      <div
        style={{
          width: '55px',
        }}
      >
        <Sidebar actions={actions} />
      </div>

      <h3>Sidebar expanded</h3>
      <div
        style={{
          width: '150px',
        }}
      >
        <Sidebar expanded actions={actions} />
      </div>

      <h3>Sidebar with toggle</h3>
      <div
        style={{
          width: '150px',
        }}
      >
        <Sidebar
          actions={actions}
          expanded={expandedWithToggle}
          onToggleClick={() => setExpandedWithToggle(!expandedWithToggle)}
        />
      </div>

      <h3>Hoverable Sidebar</h3>
      <div
        style={{
          width: '150px',
        }}
      >
        <Sidebar
          actions={actions}
          expanded={expandedHoverable}
          hoverable
          onToggleClick={() => setExpandedHoverable(!expandedHoverable)}
        />
      </div>
    </div>
  );
};