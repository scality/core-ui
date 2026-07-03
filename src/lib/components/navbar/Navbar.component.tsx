import {
  cloneElement,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import styled, { css } from 'styled-components';
import { flip, offset, shift } from '@floating-ui/dom';
import {
  autoUpdate,
  FloatingFocusManager,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { Logo } from '../../icons/branding';
import { spacing } from '../../spacing';
import {
  fontSize,
  fontWeight,
  navbarHeight,
  navbarItemWidth,
  zIndex,
} from '../../style/theme';
import { getContrastText, getThemePropSelector } from '../../utils';
import { Dropdown, type Item } from '../dropdown/Dropdown.component';
import { Icon } from '../icon/Icon.component';
import { Button, FocusVisibleStyle, type Props as ButtonProps } from '../buttonv2/Buttonv2.component';
import { useContainerWidth } from '../responsive/useContainerWidth';

/**
 * Default container width (px) below which the navbar condenses its
 * right-action labels to icon-only. Content-dependent — override per app via
 * the `condenseActionsBreakpoint` prop. Tabs overflow into a "More" menu
 * automatically as space runs out, independent of this value.
 */
export const NAVBAR_COLLAPSE_BREAKPOINT_PX = 768;

/**
 * Hysteresis band (px) for the condense toggle. Once condensed, the navbar must
 * grow back to `breakpoint + this` before the labels return, so a container
 * dragged to rest right on the breakpoint doesn't flicker.
 */
const CONDENSE_HYSTERESIS_PX = 24;

/**
 * Wraps the measure-only width primitive with a hysteresis band and reports a
 * single condense flag. Wide-first until the first measurement lands
 * (`undefined < n` is `false`), then condensed once the container drops below
 * `breakpoint`, staying condensed until it grows back past
 * `breakpoint + CONDENSE_HYSTERESIS_PX`. This is the one place the navbar needs
 * a threshold, so the hysteresis lives here rather than in the shared hook.
 */
function useCondensedActions(breakpoint: number): {
  ref: (node: HTMLDivElement | null) => void;
  condensed: boolean;
} {
  const { ref, width } = useContainerWidth<HTMLDivElement>();
  const condensedRef = useRef(false);

  let condensed = condensedRef.current;
  if (width !== undefined) {
    if (condensed) {
      if (width >= breakpoint + CONDENSE_HYSTERESIS_PX) condensed = false;
    } else if (width < breakpoint) {
      condensed = true;
    }
    condensedRef.current = condensed;
  }

  return { ref, condensed };
}

/**
 * Decide which tabs stay inline and which move into the "More" menu.
 *
 * Pinned tabs (the selected tab, custom `render` tabs, and any tab flagged
 * `alwaysVisible`) never overflow — the current location and instance-level
 * controls must stay reachable. The remaining tabs fill the leftover space
 * left-to-right, priority+ style: as the navbar narrows they drop from the
 * right, one by one, into the menu. Pure — no DOM. Indices are returned in
 * original order so both rows preserve the author's tab order.
 */
export function selectVisibleTabs(
  tabWidths: number[],
  pinned: boolean[],
  menuTriggerWidth: number,
  availableWidth: number,
): { visibleTabIndices: number[]; overflowTabIndices: number[] } {
  const allTabIndices = tabWidths.map((_, index) => index);
  const totalTabsWidth = tabWidths.reduce((sum, width) => sum + width, 0);
  if (totalTabsWidth <= availableWidth) {
    return { visibleTabIndices: allTabIndices, overflowTabIndices: [] };
  }

  // Something overflows, so the "More" menu trigger will be shown — reserve its
  // width. Pinned tabs are always kept (even if they alone exceed the budget);
  // non-pinned tabs then fill what's left, stopping at the first that no longer
  // fits so the dropped tabs stay a contiguous run on the right.
  const widthBudget = availableWidth - menuTriggerWidth;
  const keptTabIndices = new Set<number>(allTabIndices.filter((index) => pinned[index]));
  let usedWidth = allTabIndices
    .filter((index) => pinned[index])
    .reduce((sum, index) => sum + tabWidths[index], 0);
  for (const index of allTabIndices) {
    if (pinned[index]) continue;
    if (usedWidth + tabWidths[index] > widthBudget) break;
    usedWidth += tabWidths[index];
    keptTabIndices.add(index);
  }

  return {
    visibleTabIndices: allTabIndices.filter((index) => keptTabIndices.has(index)),
    overflowTabIndices: allTabIndices.filter((index) => !keptTabIndices.has(index)),
  };
}

type ButtonAction = {
  type: 'button';
} & ButtonProps;
type DropdownAction = {
  type: 'dropdown';
  items: Array<Item>;
  text?: string;
  icon?: JSX.Element;
};

type CustomAction = {
  type: 'custom';
  render: React.ComponentType;
};

type Action = DropdownAction | ButtonAction | CustomAction;
type Actions = Array<Action>;
type Tab = {
  title?: string;
  selected?: boolean;
  onClick?: (arg0: any) => void;
  link?: JSX.Element;
  render?: JSX.Element;
  /**
   * Keep this tab inline at all widths instead of letting it overflow into the
   * "More" menu. The selected tab and custom `render` tabs are pinned
   * automatically; set this for any other tab that must always stay visible.
   */
  alwaysVisible?: boolean;
};
export type Props = {
  onToggleClick?: () => void;
  rightActions: Actions;
  logo?: JSX.Element;
  tabs?: Array<Tab>;
  /**
   * Container width (px) below which right-action labels drop to icon-only
   * (e.g. the username dropdown shows just its icon). Tabs overflow into a
   * "More" menu automatically as space runs out, independent of this value.
   * Defaults to {@link NAVBAR_COLLAPSE_BREAKPOINT_PX}.
   */
  condenseActionsBreakpoint?: number;
};
const getNavbarTextColor = (props) =>
  getContrastText(props.theme.navbarBackground, props.theme.textPrimary, props.theme.textReverse) ?? props.theme.textPrimary;

const NavbarContainer = styled.div`
  height: ${navbarHeight};
  display: flex;
  justify-content: space-between;
  ${css`
    background-color: ${getThemePropSelector('navbarBackground')};
    color: ${getNavbarTextColor};
    .fas,
    .sc-trigger-text {
      color: ${getNavbarTextColor};
    }
    box-sizing: border-box;
    border-bottom: 0.5px solid ${(props) => props.theme.backgroundLevel2};
  `};
`;
const NavbarMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NavbarTabs = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  a {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    height: 100%;
    padding: 0 ${spacing.r16};
    border-bottom: ${spacing.r2} solid transparent;
    border-top: ${spacing.r2} solid transparent;
    ${(props) => {
    const { selectedActive } = props.theme;
    const navTextColor = getContrastText(props.theme.navbarBackground, props.theme.textPrimary, props.theme.textReverse) ?? props.theme.textPrimary;
    return css`
        color: ${navTextColor};
        &:hover {
          background-color: ${getThemePropSelector('highlight')};
        }
        &.selected {
          color: ${navTextColor};
          font-weight: bold;
          border-bottom-color: ${selectedActive};
        }
        // :focus-visible is the keyboard-only version of :focus
        &:focus-visible {
          ${FocusVisibleStyle}
          color: ${navTextColor};
        }
      `;
  }};
  }
`;
const TabItem = styled.div<{ selected: boolean }>`
  box-sizing: border-box;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${spacing.r16};
  ${(props) => {
    const navTextColor = getContrastText(props.theme.navbarBackground, props.theme.textPrimary, props.theme.textReverse) ?? props.theme.textPrimary;
    return css`
      color: ${navTextColor};
      &:hover {
        border-bottom: ${spacing.r2} solid;
        border-top: ${spacing.r2} solid;
        cursor: pointer;
      }
      // :focus-visible is the keyboard-only version of :focus
      &:focus-visible {
        ${FocusVisibleStyle}
        color: ${navTextColor};
      }
    `;
  }};
  ${(props) =>
    props.selected &&
    css`
      border-top: ${spacing.r2} solid;
      border-bottom: ${spacing.r2} solid;
    `};
`;
const NavbarMenuItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .sc-dropdown {
    .trigger {
      background-color: transparent;
      &:hover {
        background-color: ${getThemePropSelector('highlight')};
      }
      height: ${navbarHeight};
      white-space: nowrap;
      font-size: ${fontSize.base};
      .sc-trigger-text {
        display: block;
        max-width: 12rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .menu-item {
      max-height: unset;
    }
  }

  .sc-button {
    margin: 0;
    border-radius: 0;
    height: ${navbarHeight};
    font-size: ${fontSize.base};
    background-color: ${getThemePropSelector('navbarBackground')};
    color: ${(props) => getContrastText(props.theme.navbarBackground, props.theme.textPrimary, props.theme.textReverse) ?? props.theme.textPrimary};
    &:hover {
      background-color: ${getThemePropSelector('highlight')};
    }
    // :focus-visible is the keyboard-only version of :focus
    &:focus-visible {
      ${FocusVisibleStyle}
      color: ${(props) => getContrastText(props.theme.navbarBackground, props.theme.textPrimary, props.theme.textReverse) ?? props.theme.textPrimary};
    }
    width: ${navbarItemWidth};
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${spacing.r16};
  svg {
    width: 7.143rem;
    height: 2.143rem;
  }
`;

const TabsMenuTrigger = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${navbarHeight};
  padding: 0 ${spacing.r16};
  border: none;
  cursor: pointer;
  white-space: nowrap;
  font-size: ${fontSize.base};
  color: inherit;
  background-color: transparent;
  &:hover {
    background-color: ${getThemePropSelector('highlight')};
  }
  // :focus-visible is the keyboard-only version of :focus
  &:focus-visible {
    ${FocusVisibleStyle}
  }
`;

const TabsMenuCaret = styled.span`
  display: inline-flex;
  margin-left: ${spacing.r8};
`;

const MenuTriggerContent = () => (
  <>
    More
    <TabsMenuCaret>
      <Icon name="Dropdown-down" />
    </TabsMenuCaret>
  </>
);

const TabsMenuList = styled.ul`
  margin: 0;
  padding: ${spacing.r4} 0;
  list-style: none;
  min-width: 14rem;
  background-color: ${getThemePropSelector('backgroundLevel1')};
  border: 1px solid ${getThemePropSelector('border')};
  z-index: ${zIndex.dropdown};

  li {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    color: ${getThemePropSelector('textPrimary')};
    &:hover {
      background-color: ${getThemePropSelector('highlight')};
    }
    a,
    & > div {
      display: flex;
      align-items: center;
      height: auto;
      padding: ${spacing.r12} ${spacing.r16};
      color: inherit;
      text-decoration: none;
      border: none;
    }
    a.selected,
    & > .selected {
      font-weight: ${fontWeight.bold};
    }
  }
`;

const renderTab = (
  { link, title, selected, onClick, render }: Tab,
  index: number,
  { inMenu = false }: { inMenu?: boolean } = {},
) => {
  const key = `navbar_tab_item_${index}`;
  if (render) {
    return render;
  }
  // Inside the "More" menu each tab sits in a role="menuitem" <li>, so the tab
  // role/aria-selected would be invalid nesting — mark the current page with
  // aria-current instead.
  const selectionProps = inMenu
    ? { 'aria-current': selected ? ('page' as const) : undefined }
    : { role: 'tab', 'aria-selected': selected };
  return link ? (
    cloneElement(link, {
      className: selected ? 'selected' : '',
      key,
      ...selectionProps,
    })
  ) : (
    <TabItem
      onClick={onClick}
      selected={!!selected}
      key={key}
      {...selectionProps}
    >
      <span>{title}</span>
    </TabItem>
  );
};

function NavbarTabsMenu({
  tabs,
  triggerRef,
}: {
  tabs: Array<Tab>;
  triggerRef?: (node: HTMLElement | null) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom-end',
    middleware: [offset(0), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context),
    useRole(context, { role: 'menu' }),
  ]);

  const setTriggerRef = useCallback(
    (node: HTMLButtonElement | null) => {
      refs.setReference(node);
      triggerRef?.(node);
    },
    [refs, triggerRef],
  );

  return (
    <>
      <TabsMenuTrigger
        type="button"
        ref={setTriggerRef}
        {...getReferenceProps()}
      >
        <MenuTriggerContent />
      </TabsMenuTrigger>
      {isOpen && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
            <TabsMenuList
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              onClick={() => setIsOpen(false)}
            >
              {tabs.map((tab, index) => (
                <li role="menuitem" key={`navbar_tab_menu_item_${index}`}>
                  {renderTab(tab, index, { inMenu: true })}
                </li>
              ))}
            </TabsMenuList>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}

const TabSlot = styled.span`
  display: inline-flex;
  align-items: center;
  height: 100%;
  white-space: nowrap;
`;

/**
 * Priority+ overflow: keep as many tabs inline as physically fit and move the
 * remainder into a "More" menu, recomputing as the container resizes.
 *
 * Widths come from the real row: every tab renders full-size on the first pass
 * (before anything overflows), and each tab's measured width is cached per
 * index. Collapsing a tab into the menu drops it from the row but keeps its
 * cached width, so the fit math stays accurate without a hidden mirror. The
 * menu trigger measures itself through a ref the first time it appears; the
 * fit then settles within the same commit, before paint.
 *
 * Tabs are assumed stable. If their labels ever become dynamic (e.g. i18n),
 * force a fresh measure by giving this component a `key` that changes with the
 * locale.
 *
 * The selected tab, custom `render` tabs, and any `alwaysVisible` tab are
 * pinned: they always stay inline so the current location and instance-level
 * controls (e.g. an editable deployment name) never disappear into the menu.
 */
function NavbarTabsRow({ tabs }: { tabs: Array<Tab> }) {
  const { ref: containerRef, width: availableWidth } = useContainerWidth<HTMLDivElement>();
  const tabRefs = useRef<Array<HTMLElement | null>>([]);
  const [tabWidths, setTabWidths] = useState<number[]>([]);
  const [menuTriggerWidth, setMenuTriggerWidth] = useState(0);

  useLayoutEffect(() => {
    setTabWidths((previousWidths) =>
      tabs.map((_, index) => {
        const measured = tabRefs.current[index]?.offsetWidth;
        // Keep the cached width for any tab not currently in the row (it sits
        // in the "More" menu and is no longer rendered full-size here).
        return measured && measured > 0 ? measured : previousWidths[index] ?? 0;
      }),
    );
  }, [tabs]);

  const measureMenuTrigger = useCallback((node: HTMLElement | null) => {
    if (node) {
      const nextWidth = node.offsetWidth;
      setMenuTriggerWidth((previousWidth) =>
        previousWidth === nextWidth ? previousWidth : nextWidth,
      );
    }
  }, []);

  const pinned = tabs.map(
    (tab) => Boolean(tab.alwaysVisible) || Boolean(tab.selected) || Boolean(tab.render),
  );
  const allTabsMeasured = tabWidths.length === tabs.length;
  const { visibleTabIndices, overflowTabIndices } = allTabsMeasured
    ? selectVisibleTabs(tabWidths, pinned, menuTriggerWidth, availableWidth ?? Infinity)
    : { visibleTabIndices: tabs.map((_, index) => index), overflowTabIndices: [] };

  return (
    <NavbarTabs ref={containerRef}>
      {visibleTabIndices.map((index) => (
        <TabSlot
          key={`navbar_tab_slot_${index}`}
          ref={(el) => {
            tabRefs.current[index] = el;
          }}
        >
          {renderTab(tabs[index], index)}
        </TabSlot>
      ))}
      {overflowTabIndices.length > 0 && (
        <NavbarTabsMenu
          tabs={overflowTabIndices.map((index) => tabs[index])}
          triggerRef={measureMenuTrigger}
        />
      )}
    </NavbarTabs>
  );
}

const getActionRenderer = (
  action: Action,
  index: number,
  condensed: boolean,
) => {
  switch (action.type) {
    case 'dropdown': {
      const { type, items, text, ...rest } = action;
      const condenseToIcon = condensed && Boolean(action.icon);
      return (
        <Dropdown
          key={`navbar_right_action_${index}`}
          size="larger"
          variant="backgroundLevel1"
          items={items}
          caret={false}
          text={condenseToIcon ? undefined : text}
          title={condenseToIcon ? text : undefined}
          {...rest}
        />
      );
    }
    case 'button': {
      const { type, ...rest } = action;
      return <Button key={`navbar_right_action_${index}`} {...rest} />;
    }
    case 'custom': {
      const CustomComponent = action.render;
      return <CustomComponent key={`navbar_right_action_${index}`} />;
    }
    default:
      return null;
  }
};

function NavBar({
  onToggleClick,
  logo,
  tabs = [],
  rightActions = [],
  condenseActionsBreakpoint = NAVBAR_COLLAPSE_BREAKPOINT_PX,
  ...rest
}: Props) {
  const { ref, condensed: condenseActions } = useCondensedActions(
    condenseActionsBreakpoint,
  );

  return (
    <NavbarContainer className="sc-navbar" ref={ref} {...rest}>
      <NavbarMenu>
        {onToggleClick && (
          <NavbarMenuItem onClick={onToggleClick}>
            <Button icon={<Icon name="Lat-menu" />} tooltip={{ overlay: "Toggle Main Menu" }} />
          </NavbarMenuItem>
        )}
        <NavbarMenuItem>
          <LogoContainer className="sc-logo">
            {logo ? logo : <Logo />}
          </LogoContainer>
        </NavbarMenuItem>
      </NavbarMenu>
      {tabs.length ? <NavbarTabsRow tabs={tabs} /> : null}
      {rightActions.length ? (
        <NavbarMenu>
          <NavbarMenuItem>
            {rightActions.map((action, index) =>
              getActionRenderer(action, index, condenseActions),
            )}
          </NavbarMenuItem>
        </NavbarMenu>
      ) : null}
    </NavbarContainer>
  );
}

export const Navbar = NavBar;
