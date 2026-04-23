import React from 'react';
import { Navbar } from '../src/lib/components/navbar/Navbar.component';
import { action } from 'storybook/actions';
import { Link } from '../src/lib/components/text/Text.component';
import { InlineInput } from '../src/lib';
import { Stack } from '../src/lib/spacing';
import { Logo } from '../src/lib/icons/branding-logo';

const tabs = [
  {
    render: (
      <InlineInput
        id="instanceName"
        // @ts-ignore
        changeMutation={{
          isLoading: false,
          mutate: () => {},
        }}
        defaultValue="My instance"
        maxLength={14}
      />
    ),
  },
  {
    selected: true,
    title: 'Groups',
    link: <a href="/groups">Groups</a>,
    onClick: action('Groups clicked'),
  },
  {
    selected: false,
    title: 'Users',
    link: <a href="/users">Users</a>,
    onClick: action('Users clicked'),
  },
  {
    selected: false,
    title: 'Policies',
    link: <a href="/policies">Policies</a>,
    onClick: action('Policies clicked'),
  },
  {
    selected: false,
    title: 'Buckets',
    link: <a href="/buckets">Buckets</a>,
    onClick: action('Buckets clicked'),
  },
  {
    selected: false,
    title: 'Workflows',
    link: <a href="/workflows">Workflows</a>,
    onClick: action('Workflows clicked'),
  },
];
const linkTabs = [
  {
    link: <a href="/groups">Groups</a>,
    selected: true,
  },
  {
    link: <a href="/users">Users</a>,
  },
  {
    link: <a href="/policies">Policies</a>,
  },
  {
    link: <a href="/buckets">Buckets</a>,
  },
  {
    link: <a href="/workflows">Workflows</a>,
  },
];
const rightActions = [
  {
    type: 'dropdown',
    text: 'FR',
    icon: <i className="fas fa-globe" />,
    items: [
      {
        label: 'English',
        name: 'EN',
        onClick: action('English selected'),
      },
    ],
  },
  {
    type: 'dropdown',
    icon: <i className="fas fa-th" />,
    items: [
      {
        label: 'App 1',
        onClick: action('App 1 clicked'),
      },
    ],
  },
  {
    type: 'dropdown',
    icon: <i className="fas fa-question-circle" />,
    items: [
      {
        label: 'About',
        onClick: action('About clicked'),
      },
      {
        label: 'Documentation',
        onClick: action('Documentation clicked'),
      },
      {
        label: 'Onboarding',
        onClick: action('Onboarding clicked'),
      },
    ],
  },
  {
    type: 'custom',
    render: () => (
      <Stack>
        <i className="fas fa-exclamation-circle" />{' '}
        <Link>New version available</Link>
      </Stack>
    ),
  },
  {
    type: 'button',
    icon: <i className="fas fa-sun" />,
    tooltip: { overlay: 'Toggle Theme' },
    onClick: action('Theme toggle clicked'),
  },
  {
    type: 'dropdown',
    text: 'Carlito',
    icon: <i className="fas fa-user" />,
    items: [
      {
        label: 'Log out',
        onClick: action('Logout clicked'),
      },
    ],
  },
];

export default {
  title: 'Components/Navigation/Navbar',
  component: Navbar,
  args: {
    productName: 'Hardware UI',
    rightActions,
    tabs,
    logo: <Logo />,
  },
};

export const BasicNavbar = {};

export const NavbarWithToggle = {
  args: {
    onToggleClick: action('toggle clicked'),
  },
};

export const NavbarWithCustomizedLogo = {
  args: {
    logo: <i className="fas fa-ring" />,
  },
};

export const NavbarWithOnlyTabs = {
  args: {
    rightActions: [rightActions[4]],
  },
};

export const NavbarWithOnlyLinkTabs = {
  args: {
    rightActions: [rightActions[4]],
    tabs: linkTabs,
  },
};

export const NavbarDropdownShowcase = {
  args: {
    rightActions: [
      {
        type: 'dropdown',
        text: 'Language',
        variant: 'secondary',
        size: 'default',
        items: [
          {
            label: 'English',
            name: 'EN',
            onClick: action('English selected'),
          },
          {
            label: 'Français',
            name: 'FR',
            onClick: action('French selected'),
          },
          {
            label: 'Español',
            name: 'ES',
            onClick: action('Spanish selected'),
          },
        ],
      },
      {
        type: 'dropdown',
        text: 'Help',
        icon: <i className="fas fa-question-circle" />,
        variant: 'outline',
        size: 'default',
        items: [
          {
            label: 'Documentation',
            onClick: action('Documentation clicked'),
          },
          {
            label: 'Tutorials',
            onClick: action('Tutorials clicked'),
          },
          {
            label: 'Contact Support',
            onClick: action('Contact Support clicked'),
          },
          {
            label: 'Release Notes',
            onClick: action('Release Notes clicked'),
          },
        ],
      },
      {
        type: 'dropdown',
        icon: <i className="fas fa-user" />,
        variant: 'primary',
        size: 'default',
        caret: false,
        items: [
          {
            label: 'Profile Settings',
            onClick: action('Profile clicked'),
          },
          {
            label: 'Preferences',
            onClick: action('Preferences clicked'),
          },
          {
            label: 'API Keys',
            onClick: action('API Keys clicked'),
          },
          {
            label: 'Log out',
            onClick: action('Logout clicked'),
          },
        ],
      },
    ],
    tabs: [
      {
        selected: true,
        title: 'Dashboard',
        link: <a href="/dashboard">Dashboard</a>,
        onClick: action('Dashboard clicked'),
      },
      {
        selected: false,
        title: 'Analytics',
        link: <a href="/analytics">Analytics</a>,
        onClick: action('Analytics clicked'),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story showcases different dropdown variants within the navbar. The dropdowns use the new ButtonV2 styling with variants: secondary, outline, and primary. Notice how the different variants provide visual hierarchy and the icon-only dropdown uses caret: false for a cleaner look.',
      },
    },
  },
};
