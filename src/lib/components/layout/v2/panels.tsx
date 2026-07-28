import styled, { css } from 'styled-components';
import { ReactElement } from 'react';
import { ThemeColors } from '../../../style/theme';
import { AppContainer } from './AppContainer';

interface Ratio {
  left: number;
  right: number;
}

const ThirtySeventy: Ratio = {
  left: 0.3,
  right: 0.7,
};

const SixtyFiveThirtyFive: Ratio = {
  left: 0.65,
  right: 0.35,
};

// const SeventyThirty: Ratio = {
//   left: 0.7,
//   right: 0.3,
// };

const FiftyFifty: Ratio = {
  left: 0.5,
  right: 0.5,
};

const PanelsContainer = styled.div<{ $noGap?: boolean }>`
  display: flex;
  flex: 1;
  gap: ${({ $noGap }) => ($noGap ? 0 : AppContainer.sectionDistance)};
`;

const LeftPanel = styled.div<{
  $hasPadding?: boolean;
  $flex?: number;
  $background?: ThemeColors;
  $container?: boolean;
}>`
  flex: ${(props) => props.$flex || '0 auto'};
  background: ${(props) => props.theme[props.$background || 'backgroundLevel3']};
  display: flex;
  min-width: 0;
  ${({ $container }) =>
    $container &&
    css`
      container-type: inline-size;
      container-name: responsive;
    `}
`;

const RightPanel = styled.div<{
  $hasPadding?: boolean;
  $flex?: number;
  $background?: ThemeColors;
  $container?: boolean;
}>`
  flex: ${(props) => props.$flex || '0 auto'};
  background: ${(props) => props.theme[props.$background || 'backgroundLevel4']};
  display: flex;
  min-width: 0;
  ${({ $container }) =>
    $container &&
    css`
      container-type: inline-size;
      container-name: responsive;
    `}
`;

type RatioString = '50-50' | '65-35' | '30-70';

function getPanelsObjectRation(ratio: RatioString) {
  if (ratio === '50-50') {
    return FiftyFifty;
  }
  if (ratio === '65-35') {
    return SixtyFiveThirtyFive;
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
  noGap,
  container,
  ...rest
}: {
  panelsRatio: RatioString;
  leftPanel: { children: ReactElement; background?: ThemeColors };
  rightPanel: { children: ReactElement; background?: ThemeColors };
  noGap?: boolean;
  container?: 'left' | 'right' | 'both';
}) => {
  const panelsObjectRatio = getPanelsObjectRation(panelsRatio);

  return (
    <PanelsContainer $noGap={noGap} {...rest}>
      <LeftPanel
        $flex={panelsObjectRatio.left}
        $background={leftPanel.background}
        $container={container === 'left' || container === 'both'}
      >
        {leftPanel.children}
      </LeftPanel>
      <RightPanel
        $flex={panelsObjectRatio.right}
        $background={rightPanel.background}
        $container={container === 'right' || container === 'both'}
      >
        {rightPanel.children}
      </RightPanel>
    </PanelsContainer>
  );
};
