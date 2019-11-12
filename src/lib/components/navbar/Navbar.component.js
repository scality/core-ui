//@flow
import React from "react";
import styled, { css } from "styled-components";
import type { Node } from "react";
import Logo from "../../icons/branding";
import Dropdown from "../dropdown/Dropdown.component";
import Button from "../button/Button.component";
import * as defaultTheme from "../../style/theme";
import { mergeTheme } from "../../utils";
import type { Item } from "../dropdown/Dropdown.component";

type Items = Array<Item>;
type User = {
  name: string,
  actions: Items
};
type Tab = {
  title: string,
  selected?: boolean,
  onClick: any => void
};

export type Props = {
  onToggleClick?: () => void,
  toggleVisible?: boolean,
  productName?: string,
  applications?: Items,
  help?: Items,
  user?: User,
  logo?: Node,
  languages?: Items,
  tabs?: Array<Tab>
};

const NavbarContainer = styled.div`
  height: ${defaultTheme.navbarHeight};
  display: flex;
  justify-content: space-between;
  ${props => {
    const brandingTheme = mergeTheme(props.theme, defaultTheme);
    return css`
      background-color: ${brandingTheme.base};
      color: ${brandingTheme.primary};
      .fas,
      .sc-trigger-text {
        color: ${brandingTheme.primary};
      }
    `;
  }};
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
    const brandingTheme = mergeTheme(props.theme, defaultTheme);
    return css`
      color: ${brandingTheme.primary};
      &:hover {
        border-bottom: 2px solid ${brandingTheme.primary};
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
      border-bottom: 2px solid ${mergeTheme(props.theme, defaultTheme).primary};
      span {
        padding-top: 2px;
      }
    `};
`;

const NavbarMenuItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    margin: 0;
    border-radius: 0;
    height: ${defaultTheme.navbarHeight};
    width: ${defaultTheme.navbarItemWidth};
  }
  .trigger {
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

function NavBar({
  onToggleClick,
  toggleVisible,
  productName,
  applications,
  help,
  user,
  logo,
  tabs = [],
  languages = [],
  ...rest
}: Props) {
  const filterLanguage = languages.filter(language => !language.selected);
  const currentLanguage = languages.find(
    language => language.selected === true
  );

  return (
    <NavbarContainer className="sc-navbar" {...rest}>
      <NavbarMenu>
        {toggleVisible && (
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
      <NavbarTabs>
        {tabs.length > 0 &&
          tabs.map(({ title, selected, onClick }) => (
            <TabItems onClick={onClick} selected={selected}>
              <span>{title}</span>
            </TabItems>
          ))}
      </NavbarTabs>
      <NavbarMenu>
        {languages.length > 0 && (
          <NavbarMenuItem>
            <Dropdown
              size="larger"
              variant="base"
              items={filterLanguage}
              icon={<i className="fas fa-globe" />}
              title={currentLanguage ? currentLanguage.name : languages[0].name}
              caret={false}
              text={currentLanguage ? currentLanguage.name : languages[0].name}
            />
          </NavbarMenuItem>
        )}
        {applications && (
          <NavbarMenuItem>
            <Dropdown
              size="larger"
              variant="base"
              items={applications}
              icon={<i className="fas fa-th" />}
              title="Scality Apps"
              caret={false}
            />
          </NavbarMenuItem>
        )}
        {help && (
          <NavbarMenuItem>
            <Dropdown
              size="larger"
              variant="base"
              items={help}
              icon={<i className="fas fa-question-circle" />}
              title="Help"
              caret={false}
            />
          </NavbarMenuItem>
        )}
        {user && (
          <NavbarMenuItem>
            <Dropdown
              variant="base"
              items={user.actions}
              icon={<i className="fas fa-user" />}
              title={user.name}
              text={user.name}
              size="larger"
              caret={false}
            />
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </NavbarContainer>
  );
}

export default NavBar;
