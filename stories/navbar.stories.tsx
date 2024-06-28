import React from 'react';
import { Navbar } from '../src/lib/components/navbar/Navbar.component';
import { action } from '@storybook/addon-actions';
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
