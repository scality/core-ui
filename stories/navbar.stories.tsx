import React from 'react';
import { Navbar } from '../src/lib/components/navbar/Navbar.component';
import { action } from 'storybook/actions';
import { Link } from '../src/lib/components/text/Text.component';
import { InlineInput } from '../src/lib';
import { Stack } from '../src/lib/spacing';
import { Logo } from '../src/lib/icons/branding-logo';
import { Icon } from '../src/lib/components/icon/Icon.component';
import { NAV_ITEMS, PriorityTabStrip } from './navbarResponsivePrototypes';

const InstanceName = ({ children }) => (
  <span
    style={{
      marginLeft: '0.75rem',
      paddingLeft: '0.75rem',
      borderLeft: '1px solid currentColor',
      opacity: 0.85,
      fontWeight: 600,
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </span>
);

const tabs = [
  {
    render: (
      <InlineInput
        id="instanceName"
        // @ts-ignore
        changeMutation={{
          isLoading: false,
          mutate: () => { },
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

const ResizableNavbarFrame = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      resize: 'horizontal',
      overflow: 'hidden',
      border: '1px dashed #888',
      minWidth: '20rem',
      maxWidth: '100%',
      width: '60rem',
    }}
  >
    {children}
  </div>
);

export const Responsive = {
  render: (args: React.ComponentProps<typeof Navbar>) => (
    <ResizableNavbarFrame>
      <Navbar {...args} />
    </ResizableNavbarFrame>
  ),
  args: {
    condenseActionsBreakpoint: 1200,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Drag the bottom-right handle to shrink the container. As space runs out the tabs overflow into a "More" menu one by one (priority+), keeping as many inline as physically fit. The selected tab, custom `render` tabs (e.g. the instance-name field), and any `alwaysVisible` tab stay pinned inline and never collapse into the menu. Separately, right-action labels drop to icon-only below `condenseActionsBreakpoint` (1200px here). The navbar never forces a horizontal scrollbar.',
      },
    },
  },
};

export const NavbarWithLongUserName = {
  args: {
    rightActions: [
      {
        type: 'dropdown',
        text: 'averylongusername.that-would-previously-wrap@example.com',
        icon: <i className="fas fa-user" />,
        items: [{ label: 'Log out', onClick: action('Logout clicked') }],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'A long username stays on a single line, truncated with an ellipsis, and the trigger keeps the navbar height instead of wrapping to two lines.',
      },
    },
  },
};

export const NavbarDropdownShowcase = {
  args: {
    rightActions: [
      {
        type: 'dropdown',
        text: 'Language',
        variant: 'buttonSecondary',
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
        variant: 'backgroundLevel1',
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
        variant: 'buttonPrimary',
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
          'This story showcases different dropdown variants within the navbar. The dropdowns use the button variants buttonSecondary, backgroundLevel1, and buttonPrimary. Notice how the different variants provide visual hierarchy and the icon-only dropdown uses caret: false for a cleaner look.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Exploration: alternative responsive patterns (comparison stories only — not
// part of the Navbar API). Each drives the real Navbar via a single `render`
// tab that the native priority+ fit leaves inline, so the prototype fully
// controls the tab region. `PriorityOverflow` mirrors the behaviour the Navbar
// now ships by default; the others show alternatives that were considered.
// ---------------------------------------------------------------------------

const explorationLogo = (
  <>
    <Logo />
    <InstanceName>prod-cluster-01</InstanceName>
  </>
);

const explorationActions: React.ComponentProps<typeof Navbar>['rightActions'] = [
  {
    type: 'button',
    icon: <Icon name="Bell" />,
    tooltip: { overlay: 'Notifications' },
    onClick: action('notifications clicked'),
  },
  {
    type: 'dropdown',
    text: 'jean-baptiste.de-la-tour@example.com',
    icon: <Icon name="Simple-user" />,
    items: [{ label: 'Log out', onClick: action('Logout clicked') }],
  },
];

export const PriorityOverflow = {
  render: () => (
    <ResizableNavbarFrame>
      <Navbar
        logo={explorationLogo}
        rightActions={explorationActions}
        tabs={[{ render: <PriorityTabStrip items={NAV_ITEMS} /> }]}
      />
    </ResizableNavbarFrame>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Priority+ overflow: drag the handle to resize. The navbar keeps as many tabs inline as physically fit and moves the remainder into a "More" menu, recalculating continuously — no single orphaned tab and no horizontal scrollbar.',
      },
    },
  },
};

