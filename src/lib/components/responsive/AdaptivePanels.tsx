import { ReactNode, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ThemeColors } from '../../style/theme';
import { spacing } from '../../spacing';
import { useContainerWidth } from './useContainerWidth';

/**
 * Narrow-width strategies for a list + detail layout. The component renders the
 * two panels side-by-side while the container is wide; below `breakpoint` it
 * switches to the chosen strategy. All strategies share one component so a
 * playground can flip between them live and the chosen one can graduate to a
 * production default.
 *
 * - `ratio-static`   — keep both panels at the wide ratio (baseline; cramped).
 * - `ratio-adaptive` — keep both panels but shift the ratio toward the detail.
 * - `splitter`       — both panels with a user-draggable divider (all widths).
 * - `collapse`       — detail collapses to a rail with a chevron (user toggle, all widths).
 * - `master-detail`  — show the list only; selecting an item reveals the detail with a Back action.
 * - `tabs`           — a "List / Details" segmented control swaps a single panel.
 */
export type AdaptivePanelsStrategy =
  | 'ratio-static'
  | 'ratio-adaptive'
  | 'splitter'
  | 'collapse'
  | 'master-detail'
  | 'tabs';

type RatioString = '50-50' | '65-35' | '30-70';

type PanelSpec = {
  children: ReactNode;
  background?: ThemeColors;
  /** Label used for tabs / back button / collapsed rail. */
  label?: string;
};

export type AdaptivePanelsProps = {
  /** Panel split while the container is wide. */
  panelsRatio: RatioString;
  /** Narrow-width behavior. */
  strategy: AdaptivePanelsStrategy;
  /** Container width (px) below which the strategy kicks in. */
  breakpoint?: number;
  leftPanel: PanelSpec;
  rightPanel: PanelSpec;
  /**
   * Whether a detail item is currently selected. Drives `master-detail`
   * (show detail when true) and the initial tab for `tabs`.
   */
  detailActive?: boolean;
  /** Called when the user returns to the list (master-detail back). */
  onBack?: () => void;
  noGap?: boolean;
};

const RATIO_FRACTION: Record<RatioString, number> = {
  '50-50': 0.5,
  '65-35': 0.65,
  '30-70': 0.3,
};

const Container = styled.div<{ noGap?: boolean }>`
  display: flex;
  flex: 1;
  min-height: 0;
  gap: ${({ noGap }) => (noGap ? 0 : spacing.r2)};
`;

const Panel = styled.div<{ background?: ThemeColors }>`
  background: ${(props) => props.theme[props.background || 'backgroundLevel3']};
  display: flex;
  min-width: 0;
  min-height: 0;
  overflow: auto;
  transition: flex-basis 160ms ease;
`;

const SplitHandle = styled.div`
  flex: 0 0 6px;
  cursor: col-resize;
  background: ${(props) => props.theme.backgroundLevel1};
  align-self: stretch;
  &:hover {
    background: ${(props) => props.theme.selectedActive};
  }
`;

const CollapseHandle = styled.button`
  flex: 0 0 18px;
  align-self: stretch;
  border: none;
  cursor: pointer;
  background: ${(props) => props.theme.backgroundLevel1};
  color: ${(props) => props.theme.textSecondary};
  &:hover {
    color: ${(props) => props.theme.textPrimary};
  }
`;

const Rail = styled.button`
  flex: 0 0 28px;
  align-self: stretch;
  border: none;
  cursor: pointer;
  background: ${(props) => props.theme.backgroundLevel3};
  color: ${(props) => props.theme.textSecondary};
  writing-mode: vertical-rl;
  font-size: 0.8rem;
  &:hover {
    background: ${(props) => props.theme.backgroundLevel1};
  }
`;

const Segmented = styled.div`
  display: flex;
  gap: ${spacing.r4};
  padding: ${spacing.r8};
  background: ${(props) => props.theme.backgroundLevel1};
`;

const SegBtn = styled.button<{ active?: boolean }>`
  flex: 1;
  padding: ${spacing.r8} ${spacing.r12};
  border: 1px solid ${(props) => props.theme.border};
  cursor: pointer;
  background: ${(props) =>
    props.active ? props.theme.selectedActive : props.theme.backgroundLevel2};
  color: ${(props) =>
    props.active ? props.theme.textReverse : props.theme.textPrimary};
`;

const BackBar = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
  padding: ${spacing.r8} ${spacing.r12};
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.border};
  width: 100%;
  cursor: pointer;
  background: ${(props) => props.theme.backgroundLevel2};
  color: ${(props) => props.theme.textPrimary};
`;

const FullColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  min-height: 0;
`;

export const AdaptivePanels = ({
  panelsRatio,
  strategy,
  breakpoint = 640,
  leftPanel,
  rightPanel,
  detailActive = false,
  onBack,
  noGap,
}: AdaptivePanelsProps) => {
  const { ref, isNarrow } = useContainerWidth<HTMLDivElement>(breakpoint, {
    hysteresis: 24,
  });

  const wideLeft = RATIO_FRACTION[panelsRatio];

  const [splitFraction, setSplitFraction] = useState(wideLeft);
  const draggingRef = useRef(false);
  const containerElRef = useRef<HTMLDivElement | null>(null);

  const [collapsed, setCollapsed] = useState(false);

  const [tab, setTab] = useState<'list' | 'detail'>(
    detailActive ? 'detail' : 'list',
  );
  useEffect(() => {
    if (detailActive) setTab('detail');
  }, [detailActive]);

  const setContainer = (node: HTMLDivElement | null) => {
    containerElRef.current = node;
    ref(node);
  };

  const onHandleDown = () => {
    draggingRef.current = true;
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current || !containerElRef.current) return;
      const rect = containerElRef.current.getBoundingClientRect();
      const f = (e.clientX - rect.left) / rect.width;
      setSplitFraction(Math.min(0.8, Math.max(0.2, f)));
    };
    const onUp = () => {
      draggingRef.current = false;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  const left = (basis: string) => (
    <Panel style={{ flex: `1 1 ${basis}` }} background={leftPanel.background}>
      <FullColumn>{leftPanel.children}</FullColumn>
    </Panel>
  );
  const right = (basis: string) => (
    <Panel style={{ flex: `1 1 ${basis}` }} background={rightPanel.background}>
      <FullColumn>{rightPanel.children}</FullColumn>
    </Panel>
  );

  const sideBySide = (leftFraction: number, withHandle = false) => (
    <Container noGap={noGap}>
      {left(`${leftFraction * 100}%`)}
      {withHandle && <SplitHandle onPointerDown={onHandleDown} role="separator" />}
      {right(`${(1 - leftFraction) * 100}%`)}
    </Container>
  );

  const collapsedView = () => (
    <Container noGap={noGap}>
      {left('100%')}
      <Rail
        onClick={() => setCollapsed(false)}
        aria-label={`Expand ${rightPanel.label ?? 'details'}`}
      >
        {`${rightPanel.label ?? 'Details'} ›`}
      </Rail>
    </Container>
  );

  const collapsibleView = (leftFraction: number) =>
    collapsed ? (
      collapsedView()
    ) : (
      <Container noGap={noGap}>
        {left(`${leftFraction * 100}%`)}
        <CollapseHandle
          onClick={() => setCollapsed(true)}
          aria-label={`Collapse ${rightPanel.label ?? 'details'}`}
        >
          ‹
        </CollapseHandle>
        {right(`${(1 - leftFraction) * 100}%`)}
      </Container>
    );

  let content: ReactNode;

  if (!isNarrow) {
    if (strategy === 'splitter') content = sideBySide(splitFraction, true);
    else if (strategy === 'collapse') content = collapsibleView(wideLeft);
    else content = sideBySide(wideLeft);
  } else {
    switch (strategy) {
      case 'ratio-adaptive':
        content = sideBySide(0.4);
        break;
      case 'splitter':
        content = sideBySide(splitFraction, true);
        break;
      case 'collapse':
        content = collapsibleView(0.4);
        break;
      case 'master-detail':
        content = detailActive ? (
          <FullColumn>
            <BackBar onClick={onBack}>
              {`‹ Back to ${leftPanel.label ?? 'list'}`}
            </BackBar>
            {right('100%')}
          </FullColumn>
        ) : (
          <Container noGap={noGap}>{left('100%')}</Container>
        );
        break;
      case 'tabs':
        content = (
          <FullColumn>
            <Segmented>
              <SegBtn active={tab === 'list'} onClick={() => setTab('list')}>
                {leftPanel.label ?? 'List'}
              </SegBtn>
              <SegBtn active={tab === 'detail'} onClick={() => setTab('detail')}>
                {rightPanel.label ?? 'Details'}
              </SegBtn>
            </Segmented>
            <Container noGap={noGap}>
              {tab === 'list' ? left('100%') : right('100%')}
            </Container>
          </FullColumn>
        );
        break;
      case 'ratio-static':
      default:
        content = sideBySide(wideLeft);
    }
  }

  return (
    <div
      ref={setContainer}
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minWidth: 0,
        minHeight: 0,
      }}
    >
      {content}
    </div>
  );
};
