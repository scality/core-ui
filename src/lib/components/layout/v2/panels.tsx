import { ReactElement } from 'react';
import styled from 'styled-components';

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

const LeftPanel = styled.div<{ hasPadding?: boolean; flex?: number }>`
  flex: ${(props) => props.flex || '0 auto'};
  display: flex;
`;

const RightPanel = styled.div<{ hasPadding?: boolean; flex?: number }>`
  flex: ${(props) => props.flex || '0 auto'};
  display: flex;
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
  leftPanel: ReactElement;
  rightPanel: ReactElement;
}) => {
  const panelsObjectRatio = getPanelsObjectRation(panelsRatio);

  return (
    <PanelsContainer {...rest}>
      <LeftPanel flex={panelsObjectRatio.left}>{leftPanel}</LeftPanel>
      <RightPanel flex={panelsObjectRatio.right}>{rightPanel}</RightPanel>
    </PanelsContainer>
  );
};
