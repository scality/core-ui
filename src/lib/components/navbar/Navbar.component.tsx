import React from 'react';
import styled, { css } from 'styled-components';
import { Logo } from '../../icons/branding';
import { spacing } from '../../spacing';
import { fontSize, navbarHeight, navbarItemWidth } from '../../style/theme';
import { getThemePropSelector } from '../../utils';
import { Button } from '../button/Button.component';
import { Dropdown, Item } from '../dropdown/Dropdown.component';
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
    border-bottom: ${spacing.r1} solid
      ${getThemePropSelector('backgroundLevel1')};
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
        color: ${getThemePropSelector('textTertiary')};
        &:hover {
          background-color: ${getThemePropSelector('highlight')};
        }
        &.selected {
          color: ${getThemePropSelector('textPrimary')};
          font-weight: bold;
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
    width: ${navbarItemWidth};
  }
`;
const ProductNameSpan = styled.h1`
  text-transform: uppercase;
  font-size: ${fontSize.larger};
  padding: 0 ${spacing.r16};
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
    return (
      <Button
        key={`navbar_right_action_${index}`}
        size="larger"
        variant="backgroundLevel1"
        {...rest}
      />
    );
  } else if (type === 'custom') {
    return <rest.render key={`navbar_right_action_${index}`} />;
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
                selected={!!selected}
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
