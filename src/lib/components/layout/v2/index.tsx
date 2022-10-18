import { ReactElement } from 'react';
import styled from 'styled-components';
import * as defaultTheme from '../../../style/theme';
import { getTheme } from '../../../utils';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
  background: ${(props) => getTheme(props)['backgroundLevel1']};
`;

const Navigation = styled.div`
  height: ${defaultTheme.navbarHeight};
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
