import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { Navbar } from '../src/lib/components/navbar/Navbar.component';
import { action } from 'storybook/actions';
import { Link } from '../src/lib/components/text/Text.component';
import { InlineInput } from '../src/lib';
import { Stack } from '../src/lib/spacing';
import { Logo } from '../src/lib/icons/branding-logo';
import { Icon } from '../src/lib/components/icon/Icon.component';
import { coreUIAvailableThemes } from '../src/lib/style/theme';
import {
  AdaptiveLabelTabStrip,
  CollapsedNavMenu,
  NAV_ITEMS,
  PriorityTabStrip,
  type CollapseTrigger,
} from './navbarResponsivePrototypes';

// ARTESCA wordmark. The mark keeps its teal brand colour; the lettering uses
// `currentColor` so it follows the navbar text colour across light/dark themes.
const ArtescaLogo = () => (
  <svg viewBox="0 0 112 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.6851 10.0037C15.7096 12.5959 17.7902 14.6368 20.4155 15.5768V4.39855C17.7902 5.33827 15.7096 7.37945 14.6851 10.0037ZM4.28577 4.39855V15.5768C6.91081 14.6368 9.0236 12.5959 10.0159 10.0037C9.0236 7.37945 6.91081 5.33827 4.28577 4.39855ZM22.2312 20C18.2296 20 14.6728 18.1002 12.3505 15.15C10.0535 18.1002 6.4717 20 2.47004 20H0V0H2.47004C6.4717 0 10.0535 1.87487 12.3505 4.825C14.6728 1.87487 18.2296 0 22.2312 0H24.7013V20H22.2312Z"
      fill="#0AADA6"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M36.8166 12.9633L35.5967 5.2971L34.4013 12.9633H36.8166ZM33.3059 0.5H37.8626L41.7471 19.5476H37.9622L37.2153 15.3621H34.0279L33.2561 19.5476H29.3965L33.3059 0.5Z M48.8527 8.61292C49.7612 8.61292 50.4 8.38941 50.7683 7.94268C51.1363 7.49594 51.3207 6.79444 51.3207 5.83818C51.3207 4.89769 51.1562 4.2078 50.8272 3.7688C50.4978 3.32981 49.9022 3.11016 49.0407 3.11016H47.7007V8.61292H48.8527ZM43.8457 0.5H48.7821C50.8346 0.5 52.3786 0.876196 53.4128 1.62889C54.4475 2.38128 54.9645 3.68279 54.9645 5.53222C54.9645 6.77123 54.7917 7.77035 54.4475 8.53078C54.1024 9.29091 53.491 9.86741 52.6137 10.2588L55.2463 19.5476H51.2737L49.1112 10.9174H47.7007V19.5476H43.8457V0.5Z M58.7147 3.36879H55.8037V0.5H65.3042V3.36879H62.4383V19.5476H58.7147V3.36879Z M66.2668 0.5H74.7691V3.18099H70.2168V8.23643H73.7333V10.9409H70.2168V16.9139H74.8173V19.5476H66.2668V0.5Z M75.7334 13.9349L79.1215 13.3574C79.1535 14.5929 79.3244 15.5037 79.6348 16.0894C79.9446 16.6749 80.41 16.9673 81.0305 16.9673C81.4913 16.9673 81.8253 16.8193 82.0324 16.5223C82.239 16.2256 82.3426 15.8448 82.3426 15.3791C82.3426 14.609 82.1714 13.9553 81.8295 13.4177C81.4874 12.8801 80.9505 12.2907 80.2191 11.6485L78.215 9.89186C77.4036 9.16964 76.7912 8.44406 76.3775 7.71361C75.9635 6.98376 75.7573 6.06506 75.7573 4.95812C75.7573 3.36958 76.2262 2.14627 77.165 1.28789C78.1035 0.429194 79.3996 0 81.0544 0C82.7877 0 83.9925 0.50961 84.6689 1.52822C85.3447 2.54714 85.7303 3.84294 85.8261 5.41533L82.4141 5.92068C82.3821 4.90968 82.271 4.15608 82.0802 3.65835C81.889 3.16123 81.5152 2.91206 80.9587 2.91206C80.4972 2.91206 80.1433 3.07259 79.8972 3.39365C79.6502 3.7144 79.527 4.10795 79.527 4.57309C79.527 5.23105 79.6705 5.77599 79.9567 6.20945C80.243 6.64291 80.6805 7.12419 81.2691 7.6536L83.2252 9.38652C84.1637 10.2528 84.8915 11.131 85.4085 12.0217C85.9251 12.9124 86.1839 13.959 86.1839 15.1625C86.1839 16.0934 85.9771 16.9235 85.5634 17.6533C85.1497 18.3841 84.5654 18.9576 83.8098 19.3746C83.0543 19.7916 82.1834 20 81.1972 20C79.4159 20 78.0797 19.5065 77.1889 18.5199C76.2978 17.5333 75.8125 16.0048 75.7334 13.9349Z M107.07 12.9633L105.85 5.2971L104.654 12.9633H107.07ZM103.559 0.5H108.116L112 19.5476H108.215L107.468 15.3621H104.281L103.509 19.5476H99.6494L103.559 0.5Z M87.1931 13.5018V6.52228C87.1931 4.37235 87.6316 2.74788 88.5078 1.64854C89.3838 0.549819 90.8866 0 93.0164 0C95.0469 0 96.4841 0.485546 97.3281 1.45603C98.1714 2.42712 98.5937 3.81857 98.5937 5.63161V7.26827H94.6623V5.46346C94.6623 4.88562 94.6337 4.42079 94.5764 4.06744C94.5189 3.7144 94.3712 3.42167 94.1343 3.18895C93.8964 2.95653 93.5322 2.83987 93.0406 2.83987C92.3037 2.83987 91.8285 3.07259 91.6158 3.53773C91.4028 4.00378 91.2965 4.68549 91.2965 5.58378V14.4406C91.2965 15.355 91.4193 16.037 91.665 16.486C91.9106 16.9356 92.369 17.1601 93.0406 17.1601C93.7288 17.1601 94.171 16.9317 94.3675 16.4742C94.564 16.0169 94.6623 15.3389 94.6623 14.4406V12.5392H98.5937V14.1515C98.5937 16.013 98.1757 17.4529 97.3402 18.4721C96.505 19.491 95.0634 20 93.0164 20C90.9031 20 89.4046 19.4429 88.52 18.3274C87.6356 17.2125 87.1931 15.6039 87.1931 13.5018Z"
      fill="currentColor"
    />
  </svg>
);

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
          'Drag the bottom-right handle to shrink the container. As space runs out the tabs overflow into a "More" menu one by one (priority+), keeping as many inline as physically fit; separately, right-action labels drop to icon-only below `condenseActionsBreakpoint` (1200px here). The navbar never forces a horizontal scrollbar.',
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

const ARTESCA_TABS = [
  'Overview',
  'Identity',
  'Platform',
  'Storage Services',
  'Data Management',
  'Alerts',
];

export const ArtescaInstance = {
  render: () => {
    const [themeName, setThemeName] = useState('darkRebrand');
    const [guardianOpen, setGuardianOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Overview');
    const theme = coreUIAvailableThemes[themeName];

    const tabs = ARTESCA_TABS.map((title) => ({
      title,
      selected: title === activeTab,
      onClick: () => setActiveTab(title),
    }));

    const rightActions: React.ComponentProps<typeof Navbar>['rightActions'] = [
      {
        type: 'button',
        icon: <Icon name={themeName === 'darkRebrand' ? 'LightMode' : 'DarkMode'} />,
        tooltip: { overlay: 'Toggle theme' },
        onClick: () =>
          setThemeName((name) =>
            name === 'darkRebrand' ? 'artescaLight' : 'darkRebrand',
          ),
      },
      {
        type: 'button',
        icon: <Icon name="HandSparkles" />,
        tooltip: { overlay: 'Guardian AI' },
        onClick: () => setGuardianOpen((open) => !open),
      },
      {
        type: 'button',
        icon: <Icon name="Bell" />,
        tooltip: { overlay: 'Notifications' },
        onClick: action('notifications clicked'),
      },
      {
        type: 'dropdown',
        text: 'jean-baptiste.de-la-tour@artesca.example.com',
        icon: <Icon name="Simple-user" />,
        items: [
          { label: 'Profile', onClick: action('Profile clicked') },
          { label: 'Log out', onClick: action('Logout clicked') },
        ],
      },
    ];

    return (
      <ThemeProvider theme={theme}>
        <div
          style={{
            display: 'flex',
            height: '420px',
            width: '100%',
            background: theme.backgroundLevel1,
            color: theme.textPrimary,
          }}
        >
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Navbar
              logo={
                <>
                  <ArtescaLogo />
                  <InstanceName>prod-cluster-01</InstanceName>
                </>
              }
              tabs={tabs}
              rightActions={rightActions}
              condenseActionsBreakpoint={1200}
            />
            <div style={{ flex: 1, padding: '1.5rem' }}>
              <h3 style={{ marginTop: 0 }}>{activeTab}</h3>
              <p style={{ opacity: 0.7 }}>
                Toggle Guardian (hand-sparkles icon) to open the AI agent panel.
                It narrows the navbar's container, so its tabs overflow into the
                "More" menu one by one — the layout reacts to the available
                width, not the viewport.
              </p>
            </div>
          </div>
          {guardianOpen && (
            <aside
              style={{
                width: '360px',
                flexShrink: 0,
                borderLeft: `1px solid ${theme.border}`,
                background: theme.backgroundLevel2,
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <strong style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Icon name="HandSparkles" /> Guardian
              </strong>
              <p style={{ opacity: 0.7, margin: 0 }}>
                AI agent (rendered in an iframe in the real app). Opening it
                takes width away from the main column.
              </p>
            </aside>
          )}
        </div>
      </ThemeProvider>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A realistic ARTESCA navbar: logo + instance name, the platform tabs, and theme / Guardian AI / notification actions (no left toggle). Toggling Guardian opens a side panel that shrinks the navbar container — the tabs overflow into the "More" menu as space runs out and, below 1200px, the action labels condense to icon-only. The theme toggle switches between the dark and light ARTESCA themes.',
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
    <ArtescaLogo />
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
    text: 'jean-baptiste.de-la-tour@artesca.example.com',
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

export const AdaptiveLabelTabs = {
  render: () => (
    <ResizableNavbarFrame>
      <Navbar
        logo={explorationLogo}
        rightActions={explorationActions}
        tabs={[{ render: <AdaptiveLabelTabStrip items={NAV_ITEMS} /> }]}
      />
    </ResizableNavbarFrame>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Adaptive label density: as the navbar narrows, every tab stays visible but degrades from full label → short label → icon-only (full label available on hover). Nothing is hidden in a menu.',
      },
    },
  },
};

const COLLAPSE_TRIGGERS: { trigger: CollapseTrigger; caption: string }[] = [
  { trigger: 'more-caret', caption: '"More" + caret' },
  { trigger: 'kebab', caption: 'Kebab — ⋮ (current default)' },
  { trigger: 'burger', caption: 'Burger — ☰ (best for navigation)' },
  { trigger: 'labelled', caption: 'Labelled menu (☰ + "Menu")' },
  { trigger: 'more-horizontal', caption: 'Horizontal ellipsis — •••' },
  { trigger: 'apps', caption: 'Apps grid — ▦' },
  { trigger: 'list', caption: 'List — ≣' },
];

export const CollapseTriggerVariants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {COLLAPSE_TRIGGERS.map(({ trigger, caption }) => (
        <div key={trigger}>
          <div style={{ marginBottom: '0.25rem', opacity: 0.7, fontSize: '0.85rem' }}>
            {caption}
          </div>
          <Navbar
            logo={explorationLogo}
            rightActions={explorationActions}
            tabs={[{ render: <CollapsedNavMenu items={NAV_ITEMS} trigger={trigger} /> }]}
          />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The same collapsed navigation menu shown with four trigger affordances — "More" + caret, kebab (⋮, the current default), burger (☰), and a labelled menu — so the clearest affordance can be chosen. Each opens the same list of tabs.',
      },
    },
  },
};
