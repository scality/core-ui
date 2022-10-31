import { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { spacing } from '../../../spacing';
import { ThemeColors } from '../../../style/theme';
import { getTheme } from '../../../utils';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

const FillAvailableFlexBox = styled.div`
  flex: 1;
`;

const sectionDistance = spacing.r2;

const ContextWrapper = styled.div<{
  background?: ThemeColors;
}>`
  background: ${(props) =>
    props.background ? getTheme(props)[props.background] : 'initial'};
  height: 3rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

const ContextContainer = ({
  children,
  background,
  ...rest
}: {
  background?: ThemeColors;
  children: ReactElement | ReactElement[];
}) => (
  <ContextWrapper background={background}>
    <FillAvailableFlexBox {...rest}>{children}</FillAvailableFlexBox>
  </ContextWrapper>
);

const OverallSummaryContainer = styled.div<{
  noPadding?: boolean;
  noBottomMargin?: boolean;
}>`
  background: ${(props) => getTheme(props)['backgroundLevel2']};
  height: 6rem;
  padding: ${({ noPadding }) => (noPadding ? '0' : '0 1rem')};
  margin-bottom: ${({ noBottomMargin }) =>
    noBottomMargin ? '0' : sectionDistance};
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

const OverallSummary = ({
  children,
  noPadding,
  noBottomMargin,
  ...rest
}: {
  children: any;
  noPadding?: boolean;
  noBottomMargin?: boolean;
}) => (
  <OverallSummaryContainer
    noPadding={noPadding}
    noBottomMargin={noBottomMargin}
  >
    <FillAvailableFlexBox {...rest}>{children}</FillAvailableFlexBox>
  </OverallSummaryContainer>
);

const MainContentContainer = styled.div<{
  hasPadding?: boolean;
  background?: ThemeColors;
}>`
  display: flex;
  flex: 1;
  padding: ${(props) => (props.hasPadding ? '1rem' : 'initial')};
  background: ${(props) =>
    getTheme(props)[props.background || 'backgroundLevel3']};
`;

const MainContent = ({
  children,
  hasPadding,
  background,
  ...rest
}: {
  children: ReactNode;
  hasPadding?: boolean;
  background?: ThemeColors;
}) => (
  <MainContentContainer
    hasPadding={hasPadding}
    background={background}
    {...rest}
  >
    {children}
  </MainContentContainer>
);
const AppChildrenContainer = styled.div<{
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
  ...rest
}: {
  children: ReactElement | ReactElement[];
  sidebarNavigation?: ReactElement;
  hasPadding?: boolean;
}) {
  return (
    <Container {...rest}>
      {sidebarNavigation}
      <AppChildrenContainer hasPadding={hasPadding}>
        {children}
      </AppChildrenContainer>
    </Container>
  );
}

AppContainer.ContextContainer = ContextContainer;
AppContainer.OverallSummary = OverallSummary;
AppContainer.MainContent = MainContent;
AppContainer.sectionDistance = sectionDistance;

export { AppContainer };
