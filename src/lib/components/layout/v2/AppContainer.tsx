import { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { spacing } from '../../../spacing';
import { ThemeColors } from '../../../style/theme';
import { getTheme } from '../../../utils';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  overflow: hidden;
`;

const FillAvailableFlexBox = styled.div`
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
`;

const sectionDistance = spacing.r2;

const ContextWrapper = styled.div<{
  background?: ThemeColors;
}>`
  background: ${(props) =>
    props.background ? getTheme(props)[props.background] : 'initial'};
  height: 2.5rem;
  min-height: 2.5rem;
  max-height: 2.5rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
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
  hasTopMargin?: boolean;
  noBottomMargin?: boolean;
  background?: ThemeColors;
}>`
  background: ${(props) =>
    getTheme(props)[props.background || 'backgroundLevel2']};
  height: 6rem;
  padding: ${({ noPadding }) => (noPadding ? '0' : '0 1rem')};
  margin-bottom: ${({ noBottomMargin }) =>
    noBottomMargin ? '0' : sectionDistance};
  margin-top: ${({ hasTopMargin }) => (hasTopMargin ? '1rem' : '0')};
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

const OverallSummary = ({
  children,
  noPadding,
  noBottomMargin,
  hasTopMargin,
  background,
  ...rest
}: {
  children: any;
  noPadding?: boolean;
  noBottomMargin?: boolean;
  hasTopMargin?: boolean;
  background?: ThemeColors;
}) => (
  <OverallSummaryContainer
    background={background}
    noPadding={noPadding}
    noBottomMargin={noBottomMargin}
    hasTopMargin={hasTopMargin}
  >
    <FillAvailableFlexBox {...rest}>{children}</FillAvailableFlexBox>
  </OverallSummaryContainer>
);

const MainContentContainer = styled.div<{
  hasPadding?: boolean;
  hasTopMargin?: boolean;
  background?: ThemeColors;
}>`
  display: flex;
  flex: 1;
  padding: ${(props) => (props.hasPadding ? '1rem' : 'initial')};
  margin-top: ${({ hasTopMargin }) => (hasTopMargin ? '1rem' : '0')};
  background: ${(props) =>
    getTheme(props)[props.background || 'backgroundLevel3']};
  overflow: hidden;
`;

const MainContent = ({
  children,
  hasPadding,
  background,
  hasTopMargin,
  ...rest
}: {
  children: ReactNode;
  hasPadding?: boolean;
  hasTopMargin?: boolean;
  background?: ThemeColors;
}) => (
  <MainContentContainer
    hasPadding={hasPadding}
    hasTopMargin={hasTopMargin}
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
  width: 100%;
  box-sizing: border-box;
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
