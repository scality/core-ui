import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { LateralNavbarLayout } from '../src/lib/components/lateralnavbarlayout/LateralNavbarLayout.component';
import { Loader } from '../src/lib/components/loader/Loader.component';

import {DockedSidebar,ExpandedSidebar,HoverableSidebar} from './sidebar.stories';

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
  args:{
    children:<Loader size="massive" />,
  },
  argTypes:{
    children:{
      table:{
        disable:true
      }
    },
  }
};

export const Default = {
  args:{
    sidebar:{
      ...DockedSidebar,
      actions:sideBarActions
    }
  }
}

export const WithExpandedSidebar = {
  args:{
    sidebar: {
      actions:sideBarActions,
      ...ExpandedSidebar.args
    }
  }
}

export const SidebarWithToggle = {
  render: ({}) => {
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
  },
};

export const WithHoverableSidebar = {
  args:{
    sidebar: {
      ...HoverableSidebar.args,
      actions:sideBarActions
    }
  }
};

/*
export const SidebarExpanded = {
  args:{
    sidebar:{
      expanded:true,
      actions:sideBarActions,
    }
  }
}

export const SidebarWithToggle = {
  render: ({}) => {
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
  },
};

export const HoverableSidebar = {
  args:{
    sidebar: {
      expanded:false,
      hoverable:true,
      actions:sideBarActions
    }
  }
};
*/