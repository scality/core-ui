import React from 'react';
import styled, { css } from 'styled-components';
import { Logo } from '../../icons/branding';
import { Dropdown } from '../dropdown/Dropdown.component';
import { Button } from '../button/Button.component';
import * as defaultTheme from '../../style/theme';
import { getTheme, getThemePropSelector } from '../../utils';
import { Item } from '../dropdown/Dropdown.component';
import { Icon } from '../icon/Icon.component';
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
};
export type Props = {
  onToggleClick?: () => void;
  rightActions: Actions;
  productName?: string;
  logo?: JSX.Element;
  tabs?: Array<Tab>;
};
const NavbarContainer = styled.div`
  height: ${defaultTheme.navbarHeight};
  display: flex;
  justify-content: space-between;
  ${css`
    background-color: ${getThemePropSelector('backgroundLevel1')};
    color: ${getThemePropSelector('textPrimary')};
    .fas,
    .sc-trigger-text {
      color: ${getThemePropSelector('textPrimary')};
    }
    border-bottom: ${defaultTheme.spacing.sp1} solid
      ${getThemePropSelector('backgroundLevel1')};
  `}};
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
    padding: 0 ${defaultTheme.spacing.sp16};
    border-bottom: ${defaultTheme.spacing.sp2} solid transparent;
    border-top: ${defaultTheme.spacing.sp2} solid transparent;
    ${(props) => {
      const { secondary, background, selectedActive } = getTheme(props);
      return css`
        color: ${getThemePropSelector('textTertiary')};
        &:hover {
          border-bottom-color: ${secondary};
          background-color: ${getThemePropSelector('highlight')};
        }
        &.selected {
          color: ${getThemePropSelector('textPrimary')};
          font-weight: bold;
          border-top-color: ${background};
          border-bottom-color: ${selectedActive};
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
  padding: 0 ${defaultTheme.spacing.sp16};
  ${(props) => {
    const { textPrimary, secondary, background } = getTheme(props);
    return css`
      color: ${textPrimary};
      &:hover {
        border-bottom: ${defaultTheme.spacing.sp2} solid ${secondary};
        border-top: ${defaultTheme.spacing.sp2} solid ${background};
        cursor: pointer;
      }
    `;
  }};
  ${(props) =>
    props.selected &&
    css`
      border-top: ${defaultTheme.spacing.sp2} solid
        ${getTheme(props).background};
      border-bottom: ${defaultTheme.spacing.sp2} solid
        ${getTheme(props).secondary};
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
      height: ${defaultTheme.navbarHeight};
      font-size: ${defaultTheme.fontSize.base};
    }
  }

  .sc-button {
    margin: 0;
    border-radius: 0;
    height: ${defaultTheme.navbarHeight};
    font-size: ${defaultTheme.fontSize.base};
    background-color: ${getThemePropSelector('backgroundLevel1')};
    &:hover {
      background-color: ${getThemePropSelector('highlight')};
    }
    width: ${defaultTheme.navbarItemWidth};
  }
`;
const ProductNameSpan = styled.h1`
  text-transform: uppercase;
  font-size: ${defaultTheme.fontSize.larger};
  padding: 0 ${defaultTheme.spacing.sp16};
`;
const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${defaultTheme.spacing.sp16};
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
    return (
      <Button
        key={`navbar_right_action_${index}`}
        size="larger"
        variant="backgroundLevel1"
        {...rest}
      />
    );
  }

  return null;
};

function NavBar({
  onToggleClick,
  productName,
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
            <Button
              size="larger"
              variant="backgroundLevel1"
              icon={<Icon name="Lat-menu" />}
              title="Main Menu"
            />
          </NavbarMenuItem>
        )}
        <NavbarMenuItem>
          <LogoContainer className="sc-logo">
            {logo ? logo : <Logo />}
          </LogoContainer>
        </NavbarMenuItem>
        {productName && (
          <NavbarMenuItem>
            <ProductNameSpan>{productName}</ProductNameSpan>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
      {tabs.length ? (
        <NavbarTabs>
          {tabs.map(({ link, title, selected, onClick }, index) =>
            link ? (
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
                selected={selected}
                aria-selected={selected}
                key={`navbar_tab_item_${index}`}
              >
                <span>{title}</span>
              </TabItem>
            ),
          )}
        </NavbarTabs>
      ) : null}
      {rightActions.length ? (
        <NavbarMenu>
          <NavbarMenuItem>
            {rightActions.map((action, index) =>
              getActionRenderer(action, index),
            )}
          </NavbarMenuItem>
        </NavbarMenu>
      ) : null}
    </NavbarContainer>
  );
}

export const Navbar = NavBar;
