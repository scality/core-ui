import React from 'react';
import { Navbar } from '../src/lib/components/navbar/Navbar.component';
import { action } from 'storybook/actions';
import { Link } from '../src/lib/components/text/Text.component';
import { InlineInput } from '../src/lib';
import { Stack } from '../src/lib/spacing';
import { Logo } from '../src/lib/icons/branding-logo';

// A short, typical set of navigation tabs — the shape most apps start from.
const tabs = [
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
];

// A custom, non-link tab: an editable instance-name field. Render tabs stay
// pinned inline and never collapse into the "More" menu.
const instanceNameTab = {
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
};

// A longer tab set (with the custom instance-name tab) used to demonstrate
// overflow into the "More" menu when width runs out.
const overflowTabs = [
  instanceNameTab,
  ...tabs,
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

// The account menu — the one right-action that pairs an icon with a text label.
const userAction = {
  type: 'dropdown',
  text: 'Carlito Gonzalez',
  icon: <i className="fas fa-user" />,
  items: [
    {
      label: 'Log out',
      onClick: action('Logout clicked'),
    },
  ],
};

const themeButton = {
  type: 'button',
  icon: <i className="fas fa-sun" />,
  tooltip: { overlay: 'Toggle Theme' },
  onClick: action('Theme toggle clicked'),
};

// A fuller set of right actions used to show icon-only condensing and overflow.
const manyRightActions = [
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
      { label: 'About', onClick: action('About clicked') },
      { label: 'Documentation', onClick: action('Documentation clicked') },
      { label: 'Onboarding', onClick: action('Onboarding clicked') },
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
  themeButton,
  userAction,
];

export default {
  title: 'Components/Navigation/Navbar',
  component: Navbar,
  args: {
    productName: 'Hardware UI',
    logo: <Logo />,
    tabs,
    rightActions: [],
  },
};

export const BasicNavbar = {
  parameters: {
    docs: {
      description: {
        story: 'The minimal navbar: a logo and a few navigation tabs.',
      },
    },
  },
};

export const NavbarWithRightActions = {
  args: {
    rightActions: [themeButton, userAction],
  },
  parameters: {
    docs: {
      description: {
        story:
          'A typical navbar: tabs on the left, an account menu and a theme-toggle button on the right.',
      },
    },
  },
};

export const NavbarWithToggle = {
  args: {
    onToggleClick: action('toggle clicked'),
    rightActions: [themeButton, userAction],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Passing `onToggleClick` adds a built-in menu button at the far left, used to toggle the host application\'s main/side menu.',
      },
    },
  },
};

export const NavbarWithLogo = {
  args: {
    logo: (
      <span
        style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700 }}
      >
        <i className="fas fa-cube" /> Acme Cloud
      </span>
    ),
    rightActions: [userAction],
  },
  parameters: {
    docs: {
      description: {
        story:
          'The `logo` slot accepts any node, so a product can drop in its own brand mark instead of the default one.',
      },
    },
  },
};

export const NavbarWithSpecialTab = {
  args: {
    tabs: [instanceNameTab, ...tabs],
    rightActions: [userAction],
  },
  parameters: {
    docs: {
      description: {
        story:
          'A tab can render arbitrary content via `render` instead of a link — here an editable instance-name field. Custom render tabs stay pinned inline and never collapse into the "More" menu.',
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
          'A long username stays on a single line, truncated with an ellipsis, and the trigger keeps the navbar height instead of wrapping to two lines. The trigger has no background fill so the navbar bottom border stays visible.',
      },
    },
  },
};

export const ResponsiveTabOverflow = {
  args: {
    tabs: overflowTabs,
    rightActions: manyRightActions,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: 720,
          resize: 'horizontal',
          overflow: 'auto',
          border: '1px dashed #888',
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Drag the right edge to resize the container. As it narrows, tabs that no longer fit collapse from the right into a "More" menu (the selected tab and the custom instance-name field stay pinned inline), and below the condense breakpoint each right-action label that has an icon condenses to its initials next to that icon (e.g. the account dropdown "Carlito Gonzalez" → "CG"), keeping the full label as its accessible name; icon-only actions stay icon-only. The navbar measures its own width, so this responds to the container, not the viewport.',
      },
    },
  },
};
