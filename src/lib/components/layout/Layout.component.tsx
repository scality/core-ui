import React from 'react';
import styled from 'styled-components';

import { Navbar } from '../navbar/Navbar.component';
import { Props as NavbarProps } from '../navbar/Navbar.component';
import { Props as SidebarProps } from '../sidebar/Sidebar.component';
import { Sidebar } from '../sidebar/Sidebar.component';
import { getThemePropSelector } from '../../utils';
type Props = {
  navbar?: NavbarProps;
  sidebar?: SidebarProps;
  navbarElement?: JSX.Element;
  children: JSX.Element;
};
const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
`;
const MainContent = styled.div`
  flex-grow: 1;
  background-color: ${getThemePropSelector('backgroundLevel1')};
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

export { Layout };
