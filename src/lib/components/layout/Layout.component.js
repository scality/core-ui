//@flow
import React from "react";
import styled from "styled-components";
import type { Node } from "react";
import { navbarHeight } from "../../style/theme";
import Navbar from "../navbar/Navbar.component";
import type { Props as NavbarProps } from "../navbar/Navbar.component";
import type { Props as SidebarProps } from "../sidebar/Sidebar.component";
import Sidebar from "../sidebar/Sidebar.component";
import * as defaultTheme from "../../style/theme";
import { mergeTheme } from "../../utils";
type Props = {
  navbar: NavbarProps,
  sidebar: SidebarProps,
  children: Node
};

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - ${navbarHeight});
`;

const MainContent = styled.div`
  flex-grow: 1;
  background-color: ${props =>
    mergeTheme(props.theme, defaultTheme).background};
`;

function Layout({ children, sidebar, navbar, ...rest }: Props) {
  return (
    <LayoutContainer className="sc-layout" {...rest}>
      <Navbar {...navbar} />
      <ContentContainer>
        <Sidebar {...sidebar} />
        <MainContent className="main">{children}</MainContent>
      </ContentContainer>
    </LayoutContainer>
  );
}

export default Layout;
