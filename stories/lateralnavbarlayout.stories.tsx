import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import LateralNavbarLayout from '../src/lib/components/lateralnavbarlayout/LateralNavbarLayout.component';
import Loader from '../src/lib/components/loader/Loader.component';
const sideBarActions = [
  {
    label: 'Dashboard',
    icon: <i className="fas fa-tachometer-alt" />,
    onClick: action('dashboard clicked'),
    active: true,
    'data-cy': 'Dashboard',
  },
  {
    label: 'Servers',
    icon: <i className="fas fa-server" />,
    onClick: action('server clicked'),
    'data-cy': 'Servers',
  },
  {
    label: 'Disks',
    icon: <i className="fas fa-hdd" />,
    onClick: action('disk clicked'),
    'data-cy': 'Disks',
  },
];
export default {
  title: 'Components/Navigation/LateralNavbarLayout',
  component: LateralNavbarLayout,
  decorators: [withKnobs],
};
export const SidebarDocked = () => {
  const expanded = boolean('Sidebar Expanded', false);
  const sidebar = {
    expanded,
    actions: sideBarActions,
  };
  return (
    <div>
      <LateralNavbarLayout sidebar={sidebar}>
        <Loader size="massive" />
      </LateralNavbarLayout>
    </div>
  );
};
export const SidebarExpanded = () => {
  const sidebar = {
    expanded: true,
    actions: sideBarActions,
  };
  return (
    <LateralNavbarLayout sidebar={sidebar}>
      <Loader size="massive" />
    </LateralNavbarLayout>
  );
};
export const SidebarWithToggle = () => {
  const [expanded, setExpanded] = useState(false);
  const sidebar = {
    expanded: expanded,
    actions: sideBarActions,
    onToggleClick: () => setExpanded(!expanded),
  };
  return (
    <LateralNavbarLayout sidebar={sidebar}>
      <Loader size="massive" />
    </LateralNavbarLayout>
  );
};
export const HoverableSidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const sidebar = {
    expanded: expanded,
    hoverable: true,
    actions: sideBarActions,
    onToggleClick: () => setExpanded(!expanded),
  };
  return (
    <LateralNavbarLayout sidebar={sidebar}>
      <Loader size="massive" />
    </LateralNavbarLayout>
  );
};