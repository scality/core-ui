import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import Logo from "../../icons/branding";
import Dropdown from "../dropdown/Dropdown.component";
import Button from "../button/Button.component";
import * as defaultTheme from "../../style/theme";
import { mergeTheme } from "../../utils";

const NavbarContainer = styled.div`
  height: ${defaultTheme.navbarHeight};
  display: flex;
  justify-content: space-between;
  ${props => {
    const brandingTheme = mergeTheme(props.theme, defaultTheme);
    return css`
      background-color: ${brandingTheme.primary};
      color: ${defaultTheme.white};
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

  .fas {
    font-size: ${defaultTheme.fontSize.large};
  }
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

const ProductNameSpan = styled.span`
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
  logo
}) {
  return (
    <NavbarContainer className="sc-navbar">
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

NavBar.propTypes = {
  onToggleClick: PropTypes.func,
  toggleVisible: PropTypes.bool,
  productName: PropTypes.string,
  applications: PropTypes.array,
  help: PropTypes.array,
  user: PropTypes.object
};

export default NavBar;
