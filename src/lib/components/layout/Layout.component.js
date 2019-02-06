import React from "react";
import styled from "styled-components";
import { navbarHeight } from "../../style/theme";
import Navbar from "../navbar/Navbar.component";
import Sidebar from "../sidebar/Sidebar.component";

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
`;

function Layout({ children, sidebar, navbar }) {
  return (
    <LayoutContainer className="sc-layout">
      <Navbar {...navbar} />
      <ContentContainer>
        <Sidebar {...sidebar} />
        <MainContent className="main">{children}</MainContent>
      </ContentContainer>
    </LayoutContainer>
  );
}

export default Layout;
