//@flow
import React from "react";
import styled, { css } from "styled-components";
import type { Node } from "react";
import Logo from "../../icons/branding";
import Dropdown from "../dropdown/Dropdown.component";
import Button from "../button/Button.component";
import * as defaultTheme from "../../style/theme";
import { getTheme, getThemePropSelector } from "../../utils";
import type { Item } from "../dropdown/Dropdown.component";

type Action = {
  type: string,
  items?: Array<Item>
};

type Actions = Array<Action>;
type Tab = {
  title: string,
  selected?: boolean,
  onClick: any => void
};

export type Props = {
  onToggleClick?: () => void,
  rightActions: Actions,
  productName?: string,
  logo?: Node,
  tabs?: Array<Tab>
};

const NavbarContainer = styled.div`
  height: ${defaultTheme.navbarHeight};
  display: flex;
  justify-content: space-between;
  ${css`
    background-color: ${getThemePropSelector("base")};
    color: ${getThemePropSelector("primary")};
    .fas,
    .sc-trigger-text {
      color: ${getThemePropSelector("primary")};
    }
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

const TabItems = styled.div`
  box-sizing: border-box;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${defaultTheme.padding.base};
  ${props => {
    const { primary } = getTheme(props);
    return css`
      color: ${primary};
      &:hover {
        border-bottom: 2px solid ${primary};
        span {
          padding-top: 2px;
        }
        cursor: pointer;
      }
    `;
  }};
  ${props =>
    props.selected &&
    css`
      border-bottom: 2px solid ${getTheme(props).primary};
      span {
        padding-top: 2px;
      }
    `};
`;

const NavbarMenuItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .sc-dropdown {
    .trigger {
      height: ${defaultTheme.navbarHeight};
      font-size: ${defaultTheme.fontSize.base};
    }
  }

  .sc-button {
    margin: 0;
    border-radius: 0;
    height: ${defaultTheme.navbarHeight};
    font-size: ${defaultTheme.fontSize.base};
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
  if (type === "dropdown") {
    return items ? (
      <Dropdown
        key={`navbar_right_action_${index}`}
        size="larger"
        variant="base"
        items={items}
        caret={false}
        {...rest}
      />
    ) : null;
  } else if (type === "button") {
    return (
      <Button
        key={`navbar_right_action_${index}`}
        size="larger"
        variant="base"
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
              variant="base"
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
          {tabs.map(({ title, selected, onClick }, index) => (
            <TabItems
              onClick={onClick}
              selected={selected}
              key={`navbar_tab_item_${index}`}
            >
              <span>{title}</span>
            </TabItems>
          ))}
        </NavbarTabs>
      ) : null}
      {rightActions.length ? (
        <NavbarMenu>
          <NavbarMenuItem>
            {rightActions.map((action, index) =>
              getActionRenderer(action, index)
            )}
          </NavbarMenuItem>
        </NavbarMenu>
      ) : null}
    </NavbarContainer>
  );
}

export default NavBar;
