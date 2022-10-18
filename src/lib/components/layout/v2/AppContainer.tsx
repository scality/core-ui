import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { getTheme } from '../../../utils';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

const FillAvailableFlexBox = styled.div`
  flex: 1;
`;

const ContextWrapper = styled.div<{
  background?: string;
}>`
  background: ${(props) => props.background || 'initial'};
  height: 3rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

const ContextContainer = ({ children, background, ...rest }) => (
  <ContextWrapper background={background}>
    <FillAvailableFlexBox {...rest}>{children}</FillAvailableFlexBox>
  </ContextWrapper>
);

const OverallSummaryContainer = styled.div`
  background: ${(props) => getTheme(props)['backgroundLevel2']};
  height: 6rem;
  padding: 0 1rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

const OverallSummary = ({ children, ...rest }) => (
  <OverallSummaryContainer>
    <FillAvailableFlexBox {...rest}>{children}</FillAvailableFlexBox>
  </OverallSummaryContainer>
);

const MainContent = styled.div<{
  hasPadding?: boolean;
  background?: string;
}>`
  display: flex;
  flex: 1;
  padding: ${(props) => (props.hasPadding ? '1rem' : 'initial')};
  background: ${(props) =>
    props.background || getTheme(props)['backgroundLevel3']};
`;

const MainContentContainer = styled.div<{
  hasPadding?: boolean;
}>`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${(props) => (props.hasPadding ? '0 1rem' : 'initial')};
`;

function AppContainer({
  children,
  sidebarNavigation,
  hasPadding,
}: {
  children: ReactElement | ReactElement[];
  sidebarNavigation?: ReactElement;
  hasPadding?: boolean;
}) {
  return (
    <Container>
      {sidebarNavigation}
      <MainContentContainer hasPadding={hasPadding}>
        {children}
      </MainContentContainer>
    </Container>
  );
}

AppContainer.ContextContainer = ContextContainer;
AppContainer.OverallSummary = OverallSummary;
AppContainer.MainContent = MainContent;

export { AppContainer };
