//@flow
import React from 'react';
import styled, { css } from 'styled-components';
import type { Node } from 'react';
import Logo from '../../icons/branding';
import Dropdown from '../dropdown/Dropdown.component';
import Button from '../button/Button.component';
import * as defaultTheme from '../../style/theme';
import { getTheme, getThemePropSelector } from '../../utils';
import type { Item } from '../dropdown/Dropdown.component';

type Action = {
  type: string,
  items?: Array<Item>,
};

type Actions = Array<Action>;
type Tab = {
  title?: string,
  selected?: boolean,
  onClick?: (any) => void,
  link?: Node,
};

export type Props = {
  onToggleClick?: () => void,
  rightActions: Actions,
  productName?: string,
  logo?: Node,
  tabs?: Array<Tab>,
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
    border-bottom: 1px solid ${getThemePropSelector('primary')};
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
`;

const TabItem = styled.div`
  box-sizing: border-box;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${defaultTheme.padding.base};
  ${(props) => {
    const { textPrimary, secondary, background } = getTheme(props);
    return css`
      color: ${textPrimary};
      &:hover {
        border-bottom: 2px solid ${secondary};
        border-top: 2px solid ${background};
        cursor: pointer;
      }
    `;
  }};
  ${(props) =>
    props.selected &&
    css`
      border-top: 2px solid ${getTheme(props).background};
      border-bottom: 2px solid ${getTheme(props).secondary};
    `};
`;

const TabLinkItem = styled(TabItem)`
  padding: 0px;
  border-bottom: 2px solid transparent;
  border-top: 2px solid transparent;

  ${(props) =>
    props.selected &&
    css`
      border-bottom: 2px solid ${getTheme(props).secondary};
    `};

  // Disabling TabItem hover to move it to <a> instead
  &:hover {
    border-bottom: none;
    border-top: none;
    cursor: pointer;
  }

  a {
    color: ${getThemePropSelector('textPrimary')};
    text-decoration: none;
    padding: 12px ${defaultTheme.padding.base};
    box-sizing: border-box;
    width: 100%;
    height: 100%;

    ${(props) => {
      const { secondary } = getTheme(props);
      return css`
        &:hover {
          border-bottom: 2px solid ${secondary};
          border-top: 2px solid transparent;
        }
      `;
    }}
  }
`;

const NavbarMenuItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .sc-dropdown {
    .trigger {
      background-color: ${getThemePropSelector('background')};
      &:hover {
        background-color: ${getThemePropSelector('backgroundBluer')};
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
    background-color: ${getThemePropSelector('background')};
    &:hover {
      background-color: ${getThemePropSelector('backgroundBluer')};
    }
    width: ${defaultTheme.navbarItemWidth};
  }
`;

const ProductNameSpan = styled.h1`
  text-transform: uppercase;
  font-size: ${defaultTheme.fontSize.larger};
  padding: 0 15px;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  svg {
    width: 100px;
    height: 30px;
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
              icon={<i className="fas fa-bars" />}
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
              <TabLinkItem
                selected={selected}
                role="tab"
                aria-selected={selected}
                key={`navbar_tab_link_item_${index}`}
              >
                {link}
              </TabLinkItem>
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

export default NavBar;
