import { cloneElement, Fragment, useLayoutEffect, useRef, useState } from 'react';
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
  width: ${navbarItemWidth};
  border: none;
  cursor: pointer;
  color: ${getThemePropSelector('textPrimary')};
  background-color: ${getThemePropSelector('navbarBackground')};
  &:hover {
    background-color: ${getThemePropSelector('highlight')};
  }
  // :focus-visible is the keyboard-only version of :focus
  &:focus-visible {
    ${FocusVisibleStyle}
  }
`;

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
) => {
  if (render) {
    return <Fragment key={`navbar_tab_item_${index}`}>{render}</Fragment>;
  }
  return link ? (
    cloneElement(link, {
      className: selected ? 'selected' : '',
      'aria-selected': selected,
      role: 'tab',
      key: `navbar_tab_item_${index}`,
    })
  ) : (
    <TabItem
      onClick={onClick}
      role="tab"
      selected={!!selected}
      aria-selected={selected}
      key={`navbar_tab_item_${index}`}
    >
      <span>{title}</span>
    </TabItem>
  );
};

function NavbarTabsMenu({ tabs }: { tabs: Array<Tab> }) {
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

  return (
    <>
      <TabsMenuTrigger
        type="button"
        aria-label="Navigation"
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <Icon name="More" />
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
                  {renderTab(tab, index)}
                </li>
              ))}
            </TabsMenuList>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}

const MeasureRow = styled.div`
  position: absolute;
  top: -9999px;
  left: 0;
  display: flex;
  visibility: hidden;
  pointer-events: none;
  white-space: nowrap;
`;

/**
 * Priority+ overflow: keep as many tabs inline as physically fit and move the
 * remainder into a "More" menu, recomputing as the container resizes. Widths
 * are captured from a hidden mirror row (always full-size) so hiding a tab
 * never zeroes its measured width.
 */
function NavbarTabsRow({ tabs }: { tabs: Array<Tab> }) {
  const { ref: containerRef, width } = useContainerWidth<HTMLDivElement>(0);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const moreRef = useRef<HTMLDivElement | null>(null);
  const [itemWidths, setItemWidths] = useState<number[]>([]);
  const [moreWidth, setMoreWidth] = useState(0);

  useLayoutEffect(() => {
    setItemWidths(itemRefs.current.map((el) => el?.offsetWidth ?? 0));
    setMoreWidth(moreRef.current?.offsetWidth ?? 0);
  }, [tabs]);

  const measured = itemWidths.length === tabs.length;
  const available = width ?? Infinity;
  const visibleCount = measured
    ? computeVisibleCount(itemWidths, moreWidth, available)
    : tabs.length;

  const visible = tabs.slice(0, visibleCount);
  const overflow = tabs.slice(visibleCount);

  return (
    <NavbarTabs ref={containerRef}>
      <MeasureRow aria-hidden>
        {tabs.map((tab, index) => (
          <span
            key={`navbar_tab_measure_${index}`}
            style={{ display: 'inline-flex', height: '100%' }}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
          >
            {renderTab(tab, index)}
          </span>
        ))}
        <div ref={moreRef}>
          <TabsMenuTrigger type="button" tabIndex={-1}>
            <Icon name="More" />
          </TabsMenuTrigger>
        </div>
      </MeasureRow>
      {visible.map((tab, index) => renderTab(tab, index))}
      {overflow.length > 0 && <NavbarTabsMenu tabs={overflow} />}
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
      return (
        <Dropdown
          key={`navbar_right_action_${index}`}
          size="larger"
          variant="backgroundLevel1"
          items={items}
          caret={false}
          text={condensed && action.icon ? undefined : text}
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
  const { ref, isNarrowerThan } = useContainerWidth<HTMLDivElement>(
    condenseActionsBreakpoint,
    { hysteresis: 24 },
  );
  const condenseActions = isNarrowerThan(condenseActionsBreakpoint);

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
