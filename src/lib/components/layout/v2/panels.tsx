import { ReactElement } from 'react';
import styled from 'styled-components';
import { ThemeColors } from '../../../style/theme';
import { getTheme } from '../../../utils';

interface Ratio {
  left: number;
  right: number;
}

const ThirtySeventy: Ratio = {
  left: 0.3,
  right: 0.7,
};

const SeventyThirty: Ratio = {
  left: 0.7,
  right: 0.3,
};

const FiftyFifty: Ratio = {
  left: 0.5,
  right: 0.5,
};

const PanelsContainer = styled.div`
  display: flex;
  flex: 1;
`;

const LeftPanel = styled.div<{
  hasPadding?: boolean;
  flex?: number;
  background?: ThemeColors;
}>`
  flex: ${(props) => props.flex || '0 auto'};
  background: ${(props) =>
    getTheme(props)[props.background || 'backgroundLevel3']};
  display: flex;
  min-width: 0;
`;

const RightPanel = styled.div<{
  hasPadding?: boolean;
  flex?: number;
  background?: ThemeColors;
}>`
  flex: ${(props) => props.flex || '0 auto'};
  background: ${(props) =>
    getTheme(props)[props.background || 'backgroundLevel4']};
  display: flex;
  min-width: 0;
`;

type RatioString = '50-50' | '70-30' | '30-70';

function getPanelsObjectRation(ratio: RatioString) {
  if (ratio === '50-50') {
    return FiftyFifty;
  }
  if (ratio === '70-30') {
    return SeventyThirty;
  }
  if (ratio === '30-70') {
    return ThirtySeventy;
  }

  throw new Error('Unsupported ratio');
}

export const TwoPanelLayout = ({
  panelsRatio,
  leftPanel,
  rightPanel,
  ...rest
}: {
  panelsRatio: RatioString;
  leftPanel: { children: ReactElement; background?: ThemeColors };
  rightPanel: { children: ReactElement; background?: ThemeColors };
}) => {
  const panelsObjectRatio = getPanelsObjectRation(panelsRatio);

  return (
    <PanelsContainer {...rest}>
      <LeftPanel
        flex={panelsObjectRatio.left}
        background={leftPanel.background}
      >
        {leftPanel.children}
      </LeftPanel>
      <RightPanel
        flex={panelsObjectRatio.right}
        background={rightPanel.background}
      >
        {rightPanel.children}
      </RightPanel>
    </PanelsContainer>
  );
};
