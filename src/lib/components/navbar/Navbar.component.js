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

export type Props = {
  onToggleClick?: () => void,
  toggleVisible?: boolean,
  productName?: string,
  applications?: Items,
  help?: Items,
  user?: User,
  logo?: Node,
  languages?: Items
};

const NavbarContainer = styled.div`
  height: ${defaultTheme.navbarHeight};
  display: flex;
  justify-content: space-between;
  ${props => {
    const brandingTheme = mergeTheme(props.theme, defaultTheme);
    return css`
      background-color: ${brandingTheme.primary};
      color: ${brandingTheme.secondary};
    `;
  }};
`;
const NavbarMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavbarMenuItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${props => {
    const brandingTheme = mergeTheme(props.theme, defaultTheme);
    return css`
      .fas {
        background-color: ${brandingTheme.primary};
        color: ${brandingTheme.secondary};
      }
    `;
  }}

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
        <NavbarMenuItem>
          <ProductNameSpan>{productName}</ProductNameSpan>
        </NavbarMenuItem>
      </NavbarMenu>
      <NavbarMenu>
        {languages.length > 0 && (
          <NavbarMenuItem>
            <Dropdown
              size="larger"
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
