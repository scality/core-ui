import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import { Logo } from '../../icons/branding';
import { spacing } from '../../spacing';
import { fontSize, navbarHeight, navbarItemWidth } from '../../style/theme';
import { getThemePropSelector } from '../../utils';
import { Dropdown, Item } from '../dropdown/Dropdown.component';
import { Icon } from '../icon/Icon.component';
import { Button, FocusVisibleStyle } from '../buttonv2/Buttonv2.component';
type Action = {
  type: string;
  items?: Array<Item>;
};
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
};
const NavbarContainer = styled.div`
  height: ${navbarHeight};
  display: flex;
  justify-content: space-between;
  ${css`
    background-color: ${getThemePropSelector('backgroundLevel1')};
    color: ${getThemePropSelector('textPrimary')};
    .fas,
    .sc-trigger-text {
      color: ${getThemePropSelector('textPrimary')};
    }
    border-bottom: 0.5px solid ${(props) => props.theme.backgroundLevel3};
  `};
`;
const NavbarMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NavbarTabs = styled.div`
  flex: 1;
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
      return css`
        color: ${getThemePropSelector('textPrimary')};
        &:hover {
          background-color: ${getThemePropSelector('highlight')};
        }
        &.selected {
          color: ${getThemePropSelector('textPrimary')};
          font-weight: bold;
          border-bottom-color: ${selectedActive};
        }
        // :focus-visible is the keyboard-only version of :focus
        &:focus-visible {
          ${FocusVisibleStyle}
          color: ${props.theme.textPrimary};
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
    const { textPrimary } = props.theme;
    return css`
      color: ${textPrimary};
      &:hover {
        border-bottom: ${spacing.r2} solid;
        border-top: ${spacing.r2} solid;
        cursor: pointer;
      }
      // :focus-visible is the keyboard-only version of :focus
      &:focus-visible {
        ${FocusVisibleStyle}
        color: ${props.theme.textPrimary};
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
      background-color: ${getThemePropSelector('backgroundLevel1')};
      &:hover {
        background-color: ${getThemePropSelector('highlight')};
      }
      height: ${navbarHeight};
      font-size: ${fontSize.base};
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
    background-color: ${getThemePropSelector('backgroundLevel1')};
    &:hover {
      background-color: ${getThemePropSelector('highlight')};
    }
    // :focus-visible is the keyboard-only version of :focus
    &:focus-visible {
      ${FocusVisibleStyle}
      color: ${(props) => props.theme.textPrimary};
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

const getActionRenderer = ({ type, items = null, ...rest }, index) => {
  if (type === 'dropdown') {
    return items ? (
      <Dropdown
        key={`navbar_right_action_${index}`}
        size="larger"
        variant="backgroundLevel1"
        items={items}
        caret={false}
        {...rest}
      />
    ) : null;
  } else if (type === 'button') {
    return <Button key={`navbar_right_action_${index}`} {...rest} />;
  } else if (type === 'custom') {
    return <rest.render key={`navbar_right_action_${index}`} />;
  }

  return null;
};

function NavBar({
  onToggleClick,
  logo,
  tabs = [],
  rightActions = [],
  ...rest
}: Props) {
  return (
    <NavbarContainer className="sc-navbar" {...rest}>
      <NavbarMenu>
        {onToggleClick && (
          <NavbarMenuItem onClick={onToggleClick}>
            <Button icon={<Icon name="Lat-menu" />} title="Main Menu" />
          </NavbarMenuItem>
        )}
        <NavbarMenuItem>
          <LogoContainer className="sc-logo">
            {logo ? logo : <Logo />}
          </LogoContainer>
        </NavbarMenuItem>
      </NavbarMenu>
      {tabs.length ? (
        <NavbarTabs>
          {tabs.map(({ link, title, selected, onClick, render }, index) => {
            if (render) {
              return (
                <Fragment key={`navbar_tab_item_${index}`}>{render}</Fragment>
              );
            }
            return link ? (
              React.cloneElement(link, {
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
          })}
        </NavbarTabs>
      ) : null}
      {rightActions.length ? (
        <NavbarMenu>
          <NavbarMenuItem>
            {rightActions.map((action, index) =>
              //@ts-ignore too costly to type this one now
              getActionRenderer(action, index),
            )}
          </NavbarMenuItem>
        </NavbarMenu>
      ) : null}
    </NavbarContainer>
  );
}

export const Navbar = NavBar;
