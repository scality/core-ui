//@flow
import React from 'react';
import styled from 'styled-components';
import type { Node } from 'react';
import { navbarHeight } from '../../style/theme';
import Navbar from '../navbar/Navbar.component';
import type { Props as NavbarProps } from '../navbar/Navbar.component';
import type { Props as SidebarProps } from '../sidebar/Sidebar.component';
import Sidebar from '../sidebar/Sidebar.component';
import { getThemePropSelector } from '../../utils';
type Props = {
  navbar?: NavbarProps,
  sidebar?: SidebarProps,
  navbarElement?: Node,
  children: Node,
};

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  // there is a 1px border between the navbar and the content
  height: calc(100vh - ${navbarHeight} - 1px);
`;

const MainContent = styled.div`
  flex-grow: 1;
  background-color: ${getThemePropSelector('background')};
`;

function Layout({ children, sidebar, navbar, navbarElement, ...rest }: Props) {
  return (
    <LayoutContainer className="sc-layout" {...rest}>
      {navbar && <Navbar {...navbar} />}
      {!navbar &&
        navbarElement !== undefined &&
        navbarElement !== null &&
        navbarElement}
      <ContentContainer>
        {sidebar && <Sidebar {...sidebar} />}
        <MainContent className="main">{children}</MainContent>
      </ContentContainer>
    </LayoutContainer>
  );
}

export default Layout;
