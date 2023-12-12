import { ReactElement } from 'react';
import styled from 'styled-components';
import { navbarHeight } from '../../../style/theme';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
  background: ${(props) => props.theme['backgroundLevel1']};
`;

const Navigation = styled.div`
  height: ${navbarHeight};
`;

export function Layout({
  children: app,
  headerNavigation,
}: {
  children: ReactElement | ReactElement[];
  headerNavigation: ReactElement;
}) {
  return (
    <LayoutContainer className="layout-container">
      <Navigation>{headerNavigation}</Navigation>
      {app}
    </LayoutContainer>
  );
}
