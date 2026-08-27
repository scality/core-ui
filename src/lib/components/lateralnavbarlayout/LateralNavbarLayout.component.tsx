import styled from 'styled-components';

import { Props as SidebarProps } from '../sidebar/Sidebar.component';
import { Sidebar } from '../sidebar/Sidebar.component';
import { getThemePropSelector } from '../../utils';
type Props = {
  sidebar: SidebarProps;
  children: JSX.Element;
  className?: string;
};
const LateralNavbarLayoutContainer = styled.div.withConfig({
  componentId: 'sc-lateralnavbarlayout',
})`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;
const MainContent = styled.div`
  flex-grow: 1;
  background-color: ${getThemePropSelector('backgroundLevel1')};
`;

function LateralNavbarLayout({ children, sidebar, ...rest }: Props) {
  return (
    <LateralNavbarLayoutContainer {...rest}>
      <ContentContainer>
        {sidebar && <Sidebar {...sidebar} />}
        <MainContent className="main">{children}</MainContent>
      </ContentContainer>
    </LateralNavbarLayoutContainer>
  );
}

export { LateralNavbarLayout };
