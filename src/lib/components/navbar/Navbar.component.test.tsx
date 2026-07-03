import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { Navbar, selectVisibleTabs, getInitials } from './Navbar.component';
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

describe('getInitials', () => {
  it('takes the first letter of a single-word name', () => {
    expect(getInitials('Carlito')).toBe('C');
  });

  it('takes the first letters of the first two words', () => {
    expect(getInitials('Carlito Gonzalez')).toBe('CG');
  });

  it('uses only the first letter for an unspaced token', () => {
    expect(getInitials('jean-marc.millet')).toBe('J');
  });

  it('ignores surrounding and repeated whitespace', () => {
    expect(getInitials('  Carlito   Gonzalez  ')).toBe('CG');
  });

  it('returns an empty string for empty input', () => {
    expect(getInitials('')).toBe('');
  });
});

describe('selectVisibleTabs (priority+ fit)', () => {
  it('keeps every tab inline when they all fit', () => {
    const { visibleTabIndices, overflowTabIndices } = selectVisibleTabs(
      [100, 100, 100],
      [false, false, false],
      80,
      1000,
    );
    expect(visibleTabIndices).toEqual([0, 1, 2]);
    expect(overflowTabIndices).toEqual([]);
  });

  it('drops tabs from the right and reserves room for the menu trigger', () => {
    // availableWidth 260, menu trigger 80 -> budget 180: the first tab (100)
    // fits, a second (200) would not, so one stays and the rest overflow.
    const { visibleTabIndices, overflowTabIndices } = selectVisibleTabs(
      [100, 100, 100],
      [false, false, false],
      80,
      260,
    );
    expect(visibleTabIndices).toEqual([0]);
    expect(overflowTabIndices).toEqual([1, 2]);
  });

  it('keeps a pinned tab inline even when earlier tabs overflow', () => {
    // The last tab is pinned; the budget only fits one tab beside the menu
    // trigger, so the pinned tab wins and the earlier ones overflow.
    const { visibleTabIndices, overflowTabIndices } = selectVisibleTabs(
      [100, 100, 100],
      [false, false, true],
      80,
      260,
    );
    expect(visibleTabIndices).toEqual([2]);
    expect(overflowTabIndices).toEqual([0, 1]);
  });

  it('preserves original tab order across both rows', () => {
    const { visibleTabIndices, overflowTabIndices } = selectVisibleTabs(
      [100, 100, 100, 100],
      [false, true, false, false],
      80,
      300,
    );
    expect(visibleTabIndices).toEqual([...visibleTabIndices].sort((a, b) => a - b));
    expect(overflowTabIndices).toEqual([...overflowTabIndices].sort((a, b) => a - b));
  });
});

describe('Navbar responsiveness', () => {
  it('shows every navigation tab inline when the navbar is wide', () => {
    stubNavbarWidth(1200);
    renderNavbar({ tabs, rightActions: [userAction] });

    expect(screen.getByRole('tab', { name: 'Groups' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Users' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Policies' })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /more/i }),
    ).not.toBeInTheDocument();
  });

  it('overflows tabs that do not fit into a "More" menu, keeping the rest inline', async () => {
    // available 220: first tab (100) fits alongside the More trigger (100),
    // the next would not — so 1 stays inline and 2 overflow into the menu.
    stubNavbarWidth(220);
    renderNavbar({ tabs, rightActions: [userAction] });

    expect(screen.getByRole('tab', { name: 'Groups' })).toBeInTheDocument();
    expect(screen.queryByRole('tab', { name: 'Users' })).not.toBeInTheDocument();

    const menuTrigger = screen.getByRole('button', { name: /more/i });
    expect(menuTrigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(menuTrigger);
    expect(menuTrigger).toHaveAttribute('aria-expanded', 'true');

    const menu = screen.getByRole('navigation', { name: /more/i });
    expect(within(menu).getByRole('link', { name: 'Users' })).toBeInTheDocument();
    expect(within(menu).getByRole('link', { name: 'Policies' })).toBeInTheDocument();
    expect(within(menu).queryByRole('link', { name: 'Groups' })).not.toBeInTheDocument();
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

  it('keeps the account menu reachable by name when condensed to an icon', () => {
    stubNavbarWidth(360);
    renderNavbar({ tabs, rightActions: [userAction] });

    expect(screen.queryByText('Carlito')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Carlito')).toBeInTheDocument();
  });

  it('condenses an opted-in dropdown to its initials, keeping the full name accessible', () => {
    stubNavbarWidth(360);
    renderNavbar({
      tabs,
      rightActions: [
        {
          type: 'dropdown' as const,
          text: 'Carlito Gonzalez',
          icon: <i className="fas fa-user" />,
          abbreviateWhenCondensed: true,
          items: [{ label: 'Log out', onClick: () => {} }],
        },
      ],
    });

    expect(screen.getByText('CG')).toBeInTheDocument();
    expect(screen.queryByText('Carlito Gonzalez')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Carlito Gonzalez')).toBeInTheDocument();
  });

  it('gives the condensed name precedence over an aria-label on the action', () => {
    // The action type is porous — a consumer can pass extra props. A stray
    // aria-label must not clobber the condensed accessible name.
    stubNavbarWidth(360);
    renderNavbar({
      tabs,
      // @ts-ignore - exercising the porous action-prop boundary on purpose
      rightActions: [{ ...userAction, 'aria-label': 'wrong name' }],
    });

    expect(screen.getByLabelText('Carlito')).toBeInTheDocument();
    expect(screen.queryByLabelText('wrong name')).not.toBeInTheDocument();
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

  it('keeps the selected tab inline even when earlier tabs overflow', async () => {
    // 220px only fits one tab alongside the More trigger. The selected tab sits
    // last, so a plain prefix fit would hide it — it must stay inline instead.
    stubNavbarWidth(220);
    renderNavbar({
      tabs: [
        { title: 'Groups', link: <a href="/groups">Groups</a> },
        { title: 'Users', link: <a href="/users">Users</a> },
        { title: 'Policies', selected: true, link: <a href="/policies">Policies</a> },
      ],
      rightActions: [userAction],
    });

    expect(screen.getByRole('tab', { name: 'Policies' })).toBeInTheDocument();
    expect(screen.queryByRole('tab', { name: 'Groups' })).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /more/i }));
    const menu = screen.getByRole('navigation', { name: /more/i });
    expect(within(menu).getByRole('link', { name: 'Groups' })).toBeInTheDocument();
    expect(within(menu).queryByRole('link', { name: 'Policies' })).not.toBeInTheDocument();
  });

  it('keeps a custom render tab inline at every width instead of hiding it', async () => {
    // An editable instance-name field cannot live inside a dropdown, so a
    // render tab is pinned: it stays visible while plain nav tabs overflow.
    stubNavbarWidth(220);
    renderNavbar({
      tabs: [
        { render: <span>My instance</span> },
        { title: 'Groups', selected: true, link: <a href="/groups">Groups</a> },
        { title: 'Users', link: <a href="/users">Users</a> },
        { title: 'Policies', link: <a href="/policies">Policies</a> },
      ],
      rightActions: [userAction],
    });

    expect(screen.getByText('My instance')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Groups' })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /more/i }));
    const menu = screen.getByRole('navigation', { name: /more/i });
    expect(within(menu).getByRole('link', { name: 'Users' })).toBeInTheDocument();
    expect(within(menu).queryByText('My instance')).not.toBeInTheDocument();
  });

  it('does not render a navigation menu when there are no tabs', () => {
    stubNavbarWidth(360);
    renderNavbar({ tabs: [], rightActions: [userAction] });

    expect(
      screen.queryByRole('button', { name: /more/i }),
    ).not.toBeInTheDocument();
  });
});
