import { ReactElement } from 'react';
import styled from 'styled-components';
import { navbarHeight } from '../../../style/theme';

const LayoutContainer = styled.div<{ $variant?: 'transparent' }>`
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
  background: ${props => props.$variant === 'transparent' ? 'transparent' : props.theme.backgroundLevel1};
`;

const Navigation = styled.div`
  height: ${navbarHeight};
`;

export function Layout({
  children: app,
  headerNavigation,
  variant,
}: {
  children: ReactElement | ReactElement[];
  headerNavigation: ReactElement;
  variant?: 'transparent';
}) {
  return (
    <LayoutContainer className="layout-container" $variant={variant}>
      <Navigation>{headerNavigation}</Navigation>
      {app}
    </LayoutContainer>
  );
}
