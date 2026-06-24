import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { Navbar } from './Navbar.component';
import { coreUIAvailableThemes } from '../../style/theme';

const theme = coreUIAvailableThemes.darkRebrand;

const renderNavbar = (props) =>
  render(
    <ThemeProvider theme={theme}>
      <Navbar {...props} />
    </ThemeProvider>,
  );

const tabs = [
  { title: 'Groups', selected: true, link: <a href="/groups">Groups</a> },
  { title: 'Users', link: <a href="/users">Users</a> },
  { title: 'Policies', link: <a href="/policies">Policies</a> },
];

const userAction = {
  type: 'dropdown' as const,
  text: 'Carlito',
  icon: <i className="fas fa-user" />,
  items: [{ label: 'Log out', onClick: () => {} }],
};

// useContainerWidth reads getBoundingClientRect().width on mount (the global
// ResizeObserver mock never fires), so we drive the available width by stubbing
// it. jsdom has no layout, so every element reports offsetWidth 0 by default —
// we pin a uniform per-tab width so the priority+ fit has something to measure.
const TAB_WIDTH = 100;
const stubNavbarWidth = (width: number) => {
  jest
    .spyOn(Element.prototype, 'getBoundingClientRect')
    .mockReturnValue({ width } as DOMRect);
};

const originalOffsetWidth = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  'offsetWidth',
);
beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    get: () => TAB_WIDTH,
  });
});
afterAll(() => {
  if (originalOffsetWidth) {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth);
  }
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Navbar responsiveness', () => {
  it('shows every navigation tab inline when the navbar is wide', () => {
    stubNavbarWidth(1200);
    renderNavbar({ tabs, rightActions: [userAction] });

    expect(screen.getByRole('tab', { name: 'Groups' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Users' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Policies' })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /navigation/i }),
    ).not.toBeInTheDocument();
  });

  it('overflows tabs that do not fit into a "More" menu, keeping the rest inline', async () => {
    // available 220: first tab (100) fits alongside the More trigger (100),
    // the next would not — so 1 stays inline and 2 overflow into the menu.
    stubNavbarWidth(220);
    renderNavbar({ tabs, rightActions: [userAction] });

    expect(screen.getByRole('tab', { name: 'Groups' })).toBeInTheDocument();
    expect(screen.queryByRole('tab', { name: 'Users' })).not.toBeInTheDocument();

    const menuTrigger = screen.getByRole('button', { name: /navigation/i });
    await userEvent.click(menuTrigger);

    const menu = screen.getByRole('menu');
    expect(within(menu).getByText('Users')).toBeInTheDocument();
    expect(within(menu).getByText('Policies')).toBeInTheDocument();
    expect(within(menu).queryByText('Groups')).not.toBeInTheDocument();
  });

  it('keeps the username label visible when the navbar is wide', () => {
    stubNavbarWidth(1200);
    renderNavbar({ tabs, rightActions: [userAction] });

    expect(screen.getByText('Carlito')).toBeInTheDocument();
  });

  it('drops the username label to an icon-only trigger when narrow', () => {
    stubNavbarWidth(360);
    renderNavbar({ tabs, rightActions: [userAction] });

    expect(screen.queryByText('Carlito')).not.toBeInTheDocument();
  });

  it('can condense the actions to icons while tabs are still shown inline', () => {
    // 900 < 1000 condenses the actions, but all three tabs (300 + More) still
    // fit inline at 900.
    stubNavbarWidth(900);
    renderNavbar({
      tabs,
      rightActions: [userAction],
      condenseActionsBreakpoint: 1000,
    });

    expect(screen.getByRole('tab', { name: 'Groups' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Policies' })).toBeInTheDocument();
    expect(screen.queryByText('Carlito')).not.toBeInTheDocument();
  });

  it('does not render a navigation menu when there are no tabs', () => {
    stubNavbarWidth(360);
    renderNavbar({ tabs: [], rightActions: [userAction] });

    expect(
      screen.queryByRole('button', { name: /navigation/i }),
    ).not.toBeInTheDocument();
  });
});
