import { cloneElement, useCallback, useLayoutEffect, useRef, useState } from 'react';
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
 * Greedy fit: the largest `k` such that the first `k` tabs (plus the "More"
 * trigger, when anything overflows) fit within `available` px. Pure — no DOM.
 */
export function computeVisibleCount(
  itemWidths: number[],
  moreWidth: number,
  available: number,
): number {
  const total = itemWidths.length;
  let sum = 0;
  for (let k = 0; k < total; k++) {
    sum += itemWidths[k];
    const overflowing = k < total - 1;
    const budget = available - (overflowing ? moreWidth : 0);
    if (sum > budget) return k;
  }
  return total;
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
  itemWidths: number[],
  pinned: boolean[],
  moreWidth: number,
  available: number,
): { visibleIndices: number[]; overflowIndices: number[] } {
  const all = itemWidths.map((_, index) => index);
  const fullWidth = itemWidths.reduce((sum, width) => sum + width, 0);
  if (fullWidth <= available) {
    return { visibleIndices: all, overflowIndices: [] };
  }

  // Something overflows, so the "More" trigger will be shown — reserve its
  // width. Pinned tabs are always kept (even if they alone exceed the budget);
  // non-pinned tabs then fill what's left, stopping at the first that no longer
  // fits so the dropped tabs stay a contiguous run on the right.
  const budget = available - moreWidth;
  const keep = new Set<number>(all.filter((index) => pinned[index]));
  let used = all
    .filter((index) => pinned[index])
    .reduce((sum, index) => sum + itemWidths[index], 0);
  for (const index of all) {
    if (pinned[index]) continue;
    if (used + itemWidths[index] > budget) break;
    used += itemWidths[index];
    keep.add(index);
  }

  return {
    visibleIndices: all.filter((index) => keep.has(index)),
    overflowIndices: all.filter((index) => !keep.has(index)),
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

const MoreTriggerContent = () => (
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
        <MoreTriggerContent />
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
 * "More" trigger measures itself through a ref the first time it appears; the
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
  const { ref: containerRef, width } = useContainerWidth<HTMLDivElement>(0);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const [itemWidths, setItemWidths] = useState<number[]>([]);
  const [moreWidth, setMoreWidth] = useState(0);

  useLayoutEffect(() => {
    setItemWidths((prev) =>
      tabs.map((_, index) => {
        const measured = itemRefs.current[index]?.offsetWidth;
        // Keep the cached width for any tab not currently in the row (it sits
        // in the "More" menu and is no longer rendered full-size here).
        return measured && measured > 0 ? measured : prev[index] ?? 0;
      }),
    );
  }, [tabs]);

  const measureMoreWidth = useCallback((node: HTMLElement | null) => {
    if (node) {
      const next = node.offsetWidth;
      setMoreWidth((prev) => (prev === next ? prev : next));
    }
  }, []);

  const pinned = tabs.map(
    (tab) => Boolean(tab.alwaysVisible) || Boolean(tab.selected) || Boolean(tab.render),
  );
  const measured = itemWidths.length === tabs.length;
  const available = width ?? Infinity;
  const { visibleIndices, overflowIndices } = measured
    ? selectVisibleTabs(itemWidths, pinned, moreWidth, available)
    : { visibleIndices: tabs.map((_, index) => index), overflowIndices: [] };

  return (
    <NavbarTabs ref={containerRef}>
      {visibleIndices.map((index) => (
        <TabSlot
          key={`navbar_tab_slot_${index}`}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
        >
          {renderTab(tabs[index], index)}
        </TabSlot>
      ))}
      {overflowIndices.length > 0 && (
        <NavbarTabsMenu
          tabs={overflowIndices.map((index) => tabs[index])}
          triggerRef={measureMoreWidth}
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
  const { ref, isNarrow } = useContainerWidth<HTMLDivElement>(
    condenseActionsBreakpoint,
    { hysteresis: 24 },
  );
  const condenseActions = isNarrow;

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
