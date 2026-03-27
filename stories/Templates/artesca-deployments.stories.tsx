import React, { useState, useMemo, useRef, useCallback, useEffect, useLayoutEffect } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import styled, { useTheme } from 'styled-components';
import { Navbar } from '../../src/lib/components/navbar/Navbar.component';
import { Button, CoreUiThemeProvider } from '../../src/lib/next';
import { SearchInput } from '../../src/lib/components/searchinput/SearchInput.component';
import { ScrollbarWrapper } from '../../src/lib/components/scrollbarwrapper/ScrollbarWrapper.component';
import { Stack, spacing } from '../../src/lib/spacing';
import { Text } from '../../src/lib/components/text/Text.component';
import { getThemePropSelector } from '../../src/lib/utils';
import { Tooltip } from '../../src/lib/components/tooltip/Tooltip.component';
import { CoreUITheme, coreUIAvailableThemes } from '../../src/lib/style/theme';

// ── Label color assignment ──────────────────────────────────────────────────────
// Subtle pastel palette: low saturation, slightly tinted backgrounds with
// legible text. Same label always gets the same color via a hash.
// These are organisational tags, not status indicators — colors are intentionally muted.

type LabelColor = { bg: string; text: string };

// 12 colors, hues spaced 30° apart on the HSL wheel.
// bg: hsla(H, 35%, 55%, 0.15) — consistent muted tint
// text: hsl(H, 50%, 68%) — consistent readable weight on dark background
const LABEL_COLOR_PALETTE: LabelColor[] = [
  { bg: 'hsla(  0, 35%, 55%, 0.15)', text: 'hsl(  0, 50%, 68%)' },  //   0° red
  { bg: 'hsla( 30, 40%, 52%, 0.15)', text: 'hsl( 30, 55%, 65%)' },  //  30° orange
  { bg: 'hsla( 60, 38%, 48%, 0.15)', text: 'hsl( 60, 45%, 62%)' },  //  60° amber
  { bg: 'hsla( 90, 35%, 50%, 0.15)', text: 'hsl( 90, 45%, 63%)' },  //  90° lime
  { bg: 'hsla(120, 32%, 50%, 0.15)', text: 'hsl(120, 40%, 63%)' },  // 120° green
  { bg: 'hsla(150, 35%, 50%, 0.15)', text: 'hsl(150, 45%, 62%)' },  // 150° spring
  { bg: 'hsla(180, 38%, 50%, 0.15)', text: 'hsl(180, 48%, 60%)' },  // 180° cyan
  { bg: 'hsla(210, 40%, 55%, 0.15)', text: 'hsl(210, 52%, 68%)' },  // 210° sky
  { bg: 'hsla(240, 38%, 58%, 0.15)', text: 'hsl(240, 48%, 70%)' },  // 240° blue
  { bg: 'hsla(270, 35%, 55%, 0.15)', text: 'hsl(270, 45%, 70%)' },  // 270° violet
  { bg: 'hsla(300, 32%, 52%, 0.15)', text: 'hsl(300, 40%, 68%)' },  // 300° magenta
  { bg: 'hsla(330, 35%, 54%, 0.15)', text: 'hsl(330, 48%, 68%)' },  // 330° rose
];

const getLabelColor = (label: string): LabelColor => {
  let hash = 0;
  for (let i = 0; i < label.length; i++) {
    hash = label.charCodeAt(i) + ((hash << 5) - hash);
  }
  return LABEL_COLOR_PALETTE[Math.abs(hash) % LABEL_COLOR_PALETTE.length];
};

const PRESET_LABELS = ['production', 'staging', 'eu-west', 'us-east', 'critical-client'];

// ── Types ──────────────────────────────────────────────────────────────────────

type DeploymentStatus = 'connected' | 'degraded' | 'disconnected';

type Deployment = {
  id: string;
  name: string;
  status: DeploymentStatus;
  nodes: number;
  volumes: number;
  managedDataTiB: number;
  managedDataTB: number;
  monthlyCapacityTiB: number;
  monthlyCapacityTB: number;
  version: string;
  labels: string[];
};

// ── Mock data ──────────────────────────────────────────────────────────────────

const INITIAL_DEPLOYMENTS: Deployment[] = [
  // 3-digit data / 2-digit capacity
  { id: '1',  name: 'artesca-acme-prod',    status: 'connected',    nodes: 1, volumes: 12, managedDataTiB: 234.56, managedDataTB: 257.93, monthlyCapacityTiB: 87.33,  monthlyCapacityTB: 96.02,  version: '4.2.0', labels: ['production', 'eu-west'] },
  // 3-digit data / 1-digit capacity (TB of capacity crosses boundary: 8.40 → 9.24)
  { id: '2',  name: 'vandelay-primary',     status: 'connected',    nodes: 1, volumes: 12, managedDataTiB: 119.48, managedDataTB: 131.37, monthlyCapacityTiB: 8.40,   monthlyCapacityTB: 9.24,   version: '4.2.0', labels: ['production', 'us-east'] },
  // 2-digit data / 1-digit capacity
  { id: '3',  name: 'artesca-initech-stg',  status: 'degraded',     nodes: 3, volumes: 36, managedDataTiB: 23.14,  managedDataTB: 25.44,  monthlyCapacityTiB: 2.18,   monthlyCapacityTB: 2.40,   version: '4.1.1', labels: ['staging'] },
  // 2-digit data / 1-digit capacity
  { id: '4',  name: 'ams-dc01',             status: 'connected',    nodes: 3, volumes: 36, managedDataTiB: 67.80,  managedDataTB: 74.55,  monthlyCapacityTiB: 7.20,   monthlyCapacityTB: 7.92,   version: '4.1.1', labels: ['staging', 'eu-west'] },
  // 3-digit data / 2-digit capacity
  { id: '5',  name: 'umbrella-corp-prod',   status: 'connected',    nodes: 5, volumes: 60, managedDataTiB: 178.23, managedDataTB: 195.97, monthlyCapacityTiB: 54.71,  monthlyCapacityTB: 60.16,  version: '4.2.0', labels: ['production', 'critical-client'] },
  // 1-digit data / sub-unit capacity
  { id: '6',  name: 'dev-lab-internal',     status: 'disconnected', nodes: 1, volumes: 4,  managedDataTiB: 1.50,   managedDataTB: 1.65,   monthlyCapacityTiB: 0.80,   monthlyCapacityTB: 0.88,   version: '3.3.0', labels: [] },
  // 2-digit data / sub-unit capacity
  { id: '7',  name: 'fra-prod-02',          status: 'connected',    nodes: 2, volumes: 24, managedDataTiB: 12.60,  managedDataTB: 13.85,  monthlyCapacityTiB: 0.40,   monthlyCapacityTB: 0.44,   version: '4.1.0', labels: ['production', 'us-east'] },
  // 2-digit data / 1-digit capacity (TB of capacity crosses boundary: 9.10 → 10.01)
  { id: '8',  name: 'umbrella-backup-eu',   status: 'degraded',     nodes: 2, volumes: 24, managedDataTiB: 44.90,  managedDataTB: 49.37,  monthlyCapacityTiB: 9.10,   monthlyCapacityTB: 10.01,  version: '4.1.0', labels: ['staging'] },
  // 3-digit data / 2-digit capacity
  { id: '9',  name: 'artesca-emea-dr',      status: 'connected',    nodes: 4, volumes: 48, managedDataTiB: 156.78, managedDataTB: 172.37, monthlyCapacityTiB: 34.20,  monthlyCapacityTB: 37.60,  version: '4.1.1', labels: ['production', 'eu-west'] },
  // sub-unit data / sub-unit capacity
  { id: '10', name: 'sin-object-01',        status: 'disconnected', nodes: 1, volumes: 4,  managedDataTiB: 0.45,   managedDataTB: 0.49,   monthlyCapacityTiB: 0.20,   monthlyCapacityTB: 0.22,   version: '3.2.5', labels: [] },
  // 2-digit data / 1-digit capacity (TB of capacity crosses boundary: 8.92 → 9.81)
  { id: '11', name: 'globex-us-east',       status: 'connected',    nodes: 3, volumes: 36, managedDataTiB: 87.44,  managedDataTB: 96.14,  monthlyCapacityTiB: 8.92,   monthlyCapacityTB: 9.81,   version: '4.1.0', labels: ['critical-client', 'us-east'] },
];

// ── Page layout ────────────────────────────────────────────────────────────────
// MiddlePanel has NO horizontal padding so that the scroll container spans its
// full width — this places the scrollbar at the panel's right edge.

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: ${getThemePropSelector('backgroundLevel1')};
  color: ${getThemePropSelector('textPrimary')};
`;

const ContentArea = styled.div`
  flex: 1;
  padding: ${spacing.r8} ${spacing.r16} 0;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const MiddlePanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${spacing.r16} 0 0 0;
  background: ${getThemePropSelector('backgroundLevel2')};
  border-radius: 4px 4px 0 0;
  overflow: hidden;
  min-width: 0;
`;

// Static section has its own horizontal padding to match the rest of the layout.
// padding-right compensates for the scrollbar gutter via --sb-gutter CSS custom property.
const StaticSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.r16};
  flex-shrink: 0;
  padding: 0 calc(${spacing.r32} + var(--sb-gutter, 0px)) 0 ${spacing.r32};
`;

// Scroll container spans the full panel width → scrollbar at the panel's right edge.
// Uses display:flex so that ScrollableCards can fill the height with flex:1.
// The fade gradient hides when scrolled to the bottom ($showFade).
const ScrollableCardsWrapper = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: ${spacing.r8};
`;

const ScrollableCards = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  scrollbar-gutter: stable;
`;

// Inner content within the scroll area, aligned with the static section above.
// 32px (StaticSection padding) + 198px (SectionLeft width) = 230px left indent.
const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.r8};
  padding: ${spacing.r8} ${spacing.r32} ${spacing.r16} 230px;
`;

// Always in the DOM — opacity is driven imperatively via ref to avoid React re-renders
// (state-based toggling caused scrollbar blink on Windows).
// right uses --sb-gutter CSS custom property set on MiddlePanel (measured at mount).
const FadeOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: var(--sb-gutter, 0px);
  height: 32px;
  background: linear-gradient(
    to bottom,
    transparent,
    ${getThemePropSelector('backgroundLevel2')}bb
  );
  pointer-events: none;
  transition: opacity 0.2s;
`;

// ── KPI row ────────────────────────────────────────────────────────────────────
// Compact single-line summary: label · count on the left, data metric on the right.

const KpiRow = styled.div`
  display: flex;
  align-items: flex-start;
`;

const KpiLeftLabel = styled.div`
  width: 198px;
  flex-shrink: 0;
  padding-left: ${spacing.r10};
  display: flex;
  align-items: baseline;
  gap: ${spacing.r8};
`;

const KpiBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`;

const KpiValueRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${spacing.r8};
  font-size: 16px;
  font-family: 'Lato', sans-serif;
  color: ${getThemePropSelector('textPrimary')};
`;

const Divider = styled.div`
  height: 1px;
  background: ${getThemePropSelector('backgroundLevel4')};
  flex-shrink: 0;
`;

// ── Section layout (used in StaticSection only) ────────────────────────────────

const SectionRow = styled.div`
  display: flex;
  align-items: center;
`;

const SectionLeft = styled.div`
  width: 198px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
`;

const SectionRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${spacing.r8};
  min-width: 0;
`;

// ── Toolbar ────────────────────────────────────────────────────────────────────

const ToolbarRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r12};
  min-width: 0;
`;

const ControlRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.r8};
`;

const ControlLabel = styled.span`
  font-size: 12px;
  font-family: 'Lato', sans-serif;
  color: ${getThemePropSelector('textSecondary')};
  white-space: nowrap;
  flex-shrink: 0;
`;

const SegmentGroup = styled.div`
  display: inline-flex;
  border: 1px solid ${getThemePropSelector('border')};
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
`;

const SegmentBtn = styled.button<{ $active: boolean }>`
  height: 32px;
  padding: 0 ${spacing.r12};
  background: ${({ $active, theme }) =>
    $active ? `${(theme as CoreUITheme).selectedActive}1a` : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? (theme as CoreUITheme).textPrimary : (theme as CoreUITheme).textSecondary};
  font-weight: 400;
  border: none;
  border-left: 1px solid ${getThemePropSelector('border')};
  border-bottom: 2px solid ${({ $active, theme }) =>
    $active ? (theme as CoreUITheme).selectedActive : 'transparent'};
  cursor: pointer;
  font-size: 13px;
  font-family: 'Lato', sans-serif;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: ${spacing.r4};
  transition: background 0.15s, border-color 0.15s, color 0.15s;

  &:first-child {
    border-left: none;
  }

  &:hover {
    background: ${({ theme }) => `${(theme as CoreUITheme).selectedActive}0d`};
    color: ${getThemePropSelector('textPrimary')};
  }
`;

// ── Group header ───────────────────────────────────────────────────────────────

const GroupHeaderRow = styled.div<{ $first?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
  padding: ${({ $first }) => ($first ? spacing.r4 : spacing.r20)} 0 ${spacing.r4};
`;

const GroupHeaderLine = styled.div`
  flex: 1;
  height: 1px;
  background: ${getThemePropSelector('border')};
`;

// ── Deployment card ────────────────────────────────────────────────────────────

const DeploymentCard = styled.div`
  display: flex;
  flex-direction: column;
  background: ${getThemePropSelector('backgroundLevel3')};
  border-radius: 3px;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 0 ${spacing.r16};
  background: ${getThemePropSelector('backgroundLevel4')};
  border-radius: 3px;
  gap: ${spacing.r8};
`;

const CardHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
  flex: 1;
  min-width: 0;
`;

const CardHeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r4};
  flex-shrink: 0;
`;

const DeploymentLink = styled.a`
  color: ${getThemePropSelector('textLink')};
  font-weight: 700;
  font-size: 14px;
  font-family: 'Lato', sans-serif;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    text-decoration: underline;
  }
`;

const CardBody = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 ${spacing.r8} 0 ${spacing.r32};
  gap: ${spacing.r16};
`;

const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  row-gap: 2px;
  align-items: baseline;
  width: fit-content;
`;

const MetricKey = styled(Text).attrs({ variant: 'Smaller', color: 'textSecondary' })`
  white-space: nowrap;
  padding-right: ${spacing.r12};
`;

const MetricNum = styled(Text).attrs({ variant: 'Smaller' })`
  font-variant-numeric: tabular-nums;
  text-align: right;
  white-space: nowrap;
  padding-right: 3px;
  min-width: 6ch;
`;

const MetricUnit = styled(Text).attrs({ variant: 'Smaller' })`
  white-space: nowrap;
  padding-right: ${spacing.r12};
`;

const MetricSecondary = styled(Text).attrs({ variant: 'Smaller', color: 'textSecondary' })`
  font-variant-numeric: tabular-nums;
  text-align: right;
  white-space: nowrap;
  min-width: 11ch;
`;

// ── Label pill ─────────────────────────────────────────────────────────────────
// Custom pill component with subtle muted colors. TextBadge uses theme status
// colors which are too vivid for organisational tags.

const LabelPill = styled.span<{ $bg: string; $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 2px 6px;
  border-radius: 10px;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  font-size: 12px;
  font-weight: 600;
  font-family: 'Lato', sans-serif;
  line-height: 1.4;
  white-space: nowrap;
`;

const RemoveBtn = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0 2px;
  opacity: 0.5;
  font-size: 14px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  color: inherit;

  &:hover {
    opacity: 1;
  }
`;

// ── Tag icon button (V7 style) ─────────────────────────────────────────────────
// Always visible at 15% opacity. Card hover → 50%. Direct hover → 100%.

const DeploymentCardHoverable = styled.div`
  display: flex;
  flex-direction: column;
  background: ${getThemePropSelector('backgroundLevel3')};
  border-radius: 3px;
`;

// Hover zone restricted to the label area — keeps the tag icon reveal local to that zone.
const LabelZone = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
  margin-left: ${spacing.r8};
  &:hover .tag-add-btn { opacity: 0.5; }
`;

const TagAddBtn = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 2px 4px;
  display: inline-flex;
  align-items: center;
  color: ${getThemePropSelector('textSecondary')};
  font-size: 14px;
  opacity: 0.15;
  transition: opacity 0.15s;
  flex-shrink: 0;
  &:hover { opacity: 1 !important; }
`;

// Delays tooltip content by 20ms — DOM structure stays stable so no layout jump.
// Tooltip is always mounted; overlay is withheld until the delay elapses.
function DelayedTagTooltip({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  return (
    <Tooltip overlay={show ? 'Add label' : undefined} placement="top">
      <span
        style={{ display: 'contents' }}
        onPointerEnter={() => { timer.current = setTimeout(() => setShow(true), 20); }}
        onPointerLeave={() => { clearTimeout(timer.current); setShow(false); }}
      >
        {children}
      </span>
    </Tooltip>
  );
}

// ── Inline label picker ─────────────────────────────────────────────────────────

const CardLabelPicker = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
  padding: ${spacing.r8} ${spacing.r16};
  background: ${getThemePropSelector('backgroundLevel4')};
  border-top: 1px solid ${getThemePropSelector('border')};
  flex-wrap: wrap;
`;

const LabelPickerBtn = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  opacity: 0.8;
  transition: opacity 0.1s;

  &:hover {
    opacity: 1;
  }
`;

const LabelInput = styled.input`
  height: 24px;
  padding: 0 ${spacing.r8};
  background: ${getThemePropSelector('backgroundLevel3')};
  border: 1px solid ${getThemePropSelector('border')};
  border-radius: 3px;
  color: ${getThemePropSelector('textPrimary')};
  font-size: 13px;
  font-family: 'Lato', sans-serif;
  outline: none;
  width: 140px;

  &:focus {
    border-color: ${getThemePropSelector('selectedActive')};
  }

  &::placeholder {
    color: ${getThemePropSelector('textSecondary')};
  }
`;

// ── Navbar helper ──────────────────────────────────────────────────────────────

// Override NavbarContainer's border-bottom to tone down the separator line.
const NavbarShell = styled.div`
  & > div {
    border-bottom-color: ${getThemePropSelector('backgroundLevel1')} !important;
  }
`;

const NavIconBtn = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 ${spacing.r8};
  height: 48px;
  color: ${getThemePropSelector('textSecondary')};
  font-size: 18px;

  &:hover {
    background: ${getThemePropSelector('highlight')};
  }
`;

const TooltipCue = () => (
  <i className="fas fa-question-circle" style={{ fontSize: 14, color: '#595a78' }} />
);

// ── Main component ─────────────────────────────────────────────────────────────

type SortKey = 'name' | 'data' | 'version';
type GroupKey = 'label' | 'status' | 'version';
type Group = { key: string; label: string; items: Deployment[] };

const STATUS_META: Record<DeploymentStatus, {
  // Telemetry connectivity
  icon: string; color: (t: CoreUITheme) => string; label: string;
  // Health (derived from telemetry data — unknown when disconnected)
  healthIcon: string; healthColor: (t: CoreUITheme) => string; healthLabel: string;
}> = {
  connected:    { icon: 'fa-check-circle',       color: (t) => t.statusHealthy, label: 'Connected',    healthIcon: 'fa-check-circle',     healthColor: (t) => t.statusHealthy, healthLabel: 'Healthy'  },
  degraded:     { icon: 'fa-exclamation-circle', color: (t) => t.statusWarning, label: 'Degraded',     healthIcon: 'fa-exclamation-circle',healthColor: (t) => t.statusWarning, healthLabel: 'Warning'  },
  disconnected: { icon: 'fa-times-circle',       color: (t) => t.textSecondary, label: 'Disconnected', healthIcon: 'fa-question-circle',   healthColor: (t) => t.textSecondary, healthLabel: 'Unknown'  },
};

const MaestroDeployments = () => {
  const theme = useTheme() as CoreUITheme;

  const [deployments, setDeployments] = useState<Deployment[]>(INITIAL_DEPLOYMENTS);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [groupBy, setGroupBy] = useState<GroupKey | null>(null);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  const handleGroup = (key: GroupKey) =>
    setGroupBy((current) => (current === key ? null : key));
  const [addingLabelFor, setAddingLabelFor] = useState<string | null>(null);
  const [newLabelText, setNewLabelText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);

  // Measure the actual scrollbar gutter width once after mount (Chrome = 17px, Firefox overlay = 0).
  useLayoutEffect(() => {
    if (scrollRef.current) {
      setScrollbarWidth(scrollRef.current.offsetWidth - scrollRef.current.clientWidth);
    }
  }, []);

  const updateFade = useCallback(() => {
    if (!scrollRef.current || !fadeRef.current) return;
    const el = scrollRef.current;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 4;
    fadeRef.current.style.opacity = atBottom ? '0' : '1';
  }, []);

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(key);
      setSortDir('asc');
    }
  };

  const removeLabel = (id: string, label: string) => {
    setDeployments((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, labels: d.labels.filter((l) => l !== label) } : d,
      ),
    );
  };

  const addLabel = (id: string, label: string) => {
    const trimmed = label.trim();
    if (!trimmed) return;
    setDeployments((prev) =>
      prev.map((d) =>
        d.id === id && !d.labels.includes(trimmed)
          ? { ...d, labels: [...d.labels, trimmed] }
          : d,
      ),
    );
    setNewLabelText('');
    setAddingLabelFor(null);
  };

  const openPicker = (id: string) => {
    setAddingLabelFor(id);
    setNewLabelText('');
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  // Presets + any custom labels already in use across deployments
  const allKnownLabels = useMemo(() => {
    const set = new Set<string>(PRESET_LABELS);
    deployments.forEach((d) => d.labels.forEach((l) => set.add(l)));
    return Array.from(set);
  }, [deployments]);

  const sortedFiltered = useMemo(() => {
    const q = search.toLowerCase();
    const list = deployments.filter((d) =>
      d.name.toLowerCase().includes(q) ||
      d.version.toLowerCase().includes(q) ||
      STATUS_META[d.status].label.toLowerCase().includes(q) ||
      d.labels.some((l) => l.toLowerCase().includes(q)),
    );
    return [...list].sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortBy === 'data') cmp = a.managedDataTiB - b.managedDataTiB;
      else if (sortBy === 'version') cmp = a.version.localeCompare(b.version);
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [deployments, search, sortBy, sortDir]);

  // Re-evaluate fade when displayed content changes (filtering, grouping, sorting).
  useEffect(() => { updateFade(); }, [sortedFiltered.length, groupBy, sortBy, sortDir, updateFade]);

  const groups = useMemo((): Group[] => {
    if (groupBy === null) {
      return [{ key: '__all', label: '', items: sortedFiltered }];
    }

    if (groupBy === 'status') {
      const order: DeploymentStatus[] = ['degraded', 'disconnected', 'connected'];
      const map: Record<string, Deployment[]> = {};
      for (const d of sortedFiltered) {
        if (!map[d.status]) map[d.status] = [];
        map[d.status].push(d);
      }
      return order
        .filter((s) => map[s]?.length)
        .map((s) => ({ key: s, label: STATUS_META[s].healthLabel, items: map[s] }));
    }

    if (groupBy === 'version') {
      const map: Record<string, Deployment[]> = {};
      for (const d of sortedFiltered) {
        if (!map[d.version]) map[d.version] = [];
        map[d.version].push(d);
      }
      // Sort versions descending
      return Object.entries(map)
        .sort(([a], [b]) => b.localeCompare(a))
        .map(([v, items]) => ({ key: v, label: v, items }));
    }

    // groupBy === 'label': each deployment appears in every group matching one of its labels
    const labelMap: Record<string, Deployment[]> = {};
    const unlabeled: Deployment[] = [];
    for (const d of sortedFiltered) {
      if (d.labels.length === 0) {
        unlabeled.push(d);
      } else {
        for (const label of d.labels) {
          if (!labelMap[label]) labelMap[label] = [];
          labelMap[label].push(d);
        }
      }
    }
    // Sort label groups alphabetically
    const result: Group[] = Object.entries(labelMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, items]) => ({ key, label: key, items }));
    if (unlabeled.length > 0) {
      result.push({ key: '__unlabeled', label: 'Unlabeled', items: unlabeled });
    }
    return result;
  }, [sortedFiltered, groupBy]);

  const formatNum = (n: number, decimals = 2) => {
    const [int, dec] = n.toFixed(decimals).split('.');
    return int.replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0') + (dec !== undefined ? `.${dec}` : '');
  };

  const totalData = deployments.reduce((sum, d) => sum + d.managedDataTiB, 0);
  const issueCount = deployments.filter((d) => d.status !== 'connected').length;
  const latestVersion = [...new Set(deployments.map((d) => d.version))]
    .sort((a, b) => b.localeCompare(a))[0];
  const onLatestCount = deployments.filter((d) => d.version === latestVersion).length;

  // Arrow is always rendered (invisible when inactive) to prevent layout shift on click.
  const sortArrow = (key: SortKey) => (
    <span style={{ opacity: sortBy === key ? 1 : 0, fontSize: 10, lineHeight: 1 }}>
      {sortBy === key && sortDir === 'asc' ? '↓' : '↑'}
    </span>
  );

  return (
    <PageWrapper onClick={() => setAddingLabelFor(null)}>
      <NavbarShell>
      <Navbar
        rightActions={[
          {
            type: 'custom',
            render: () => (
              <NavIconBtn aria-label="Theme">
                <i className="fas fa-sun" />
              </NavIconBtn>
            ),
          },
          {
            type: 'dropdown',
            icon: <i className="fas fa-user-cog" style={{ fontSize: 14 }} />,
            text: 'Sam Thalberg',
            items: [
              { label: 'My account', onClick: () => {} },
              { label: 'Sign out', onClick: () => {} },
            ],
          },
        ]}
      />
      </NavbarShell>

      <ContentArea>
        <MiddlePanel style={{ '--sb-gutter': `${scrollbarWidth}px` } as React.CSSProperties}>
          <StaticSection>
            {/* KPI row — compact single line */}
            <KpiRow>
              <KpiBlock style={{ width: 198, flexShrink: 0 }}>
                <span style={{ fontSize: 13, fontFamily: 'Lato', color: theme.textSecondary }}>Deployments</span>
                <KpiValueRow>{deployments.length}</KpiValueRow>
              </KpiBlock>
              <KpiBlock style={{ flex: 1 }}>
                <Stack gap="r8" style={{ alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontFamily: 'Lato', color: theme.textSecondary }}>Total Managed Data (live)</span>
                  <TooltipCue />
                </Stack>
                <KpiValueRow>
                  {formatNum(totalData)} TiB
                  <span style={{ color: theme.textSecondary }}>({formatNum(totalData * 1.099)} TB)</span>
                </KpiValueRow>
              </KpiBlock>

              <KpiBlock style={{ flex: 1 }}>
                <span style={{ fontSize: 13, fontFamily: 'Lato', color: theme.textSecondary }}>Fleet health</span>
                <KpiValueRow>
                  {issueCount === 0 ? (
                    <>
                      <i className="fas fa-check-circle" style={{ fontSize: 14, color: theme.statusHealthy }} />
                      <span>All deployments healthy</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-exclamation-circle" style={{ fontSize: 14, color: theme.statusWarning }} />
                      <span>{issueCount} deployment{issueCount > 1 ? 's' : ''} unhealthy</span>
                    </>
                  )}
                </KpiValueRow>
              </KpiBlock>

              <KpiBlock style={{ flex: 1 }}>
                <span style={{ fontSize: 13, fontFamily: 'Lato', color: theme.textSecondary }}>ARTESCA latest version</span>
                <KpiValueRow>
                  {latestVersion}
                  <span style={{ color: theme.textSecondary }}>
                    {onLatestCount === deployments.length
                      ? '· all up to date'
                      : `· ${onLatestCount} of ${deployments.length} up to date`}
                  </span>
                </KpiValueRow>
              </KpiBlock>
            </KpiRow>

            <Divider />

            {/* Section header + toolbar */}
            <SectionRow>
              <SectionLeft>
                <Text isEmphazed variant="Large">Deployments</Text>
                <TooltipCue />
              </SectionLeft>

              <SectionRight>
                {/* Single row: [search + count] · [sort+group — centered] · [add] */}
                <ToolbarRow>
                  {/* Left: search + count */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: spacing.r8, flexShrink: 0 }}>
                    <SearchInput
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onReset={() => setSearch('')}
                      placeholder="Search..."
                      size="2/3"
                    />
                    <span style={{ fontSize: '0.8rem', color: theme.textSecondary, whiteSpace: 'nowrap', display: 'inline-block', minWidth: '9rem', fontVariantNumeric: 'tabular-nums' }}>
                      {search
                        ? `${sortedFiltered.length} / ${deployments.length} deployments`
                        : `${deployments.length} deployments`}
                    </span>
                  </div>

                  {/* Center: sort + group — distributed */}
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: spacing.r16 }}>
                    <ControlRow>
                      <ControlLabel>Sort by</ControlLabel>
                      <SegmentGroup>
                        {(['name', 'data', 'version'] as SortKey[]).map((key) => (
                          <SegmentBtn
                            key={key}
                            $active={sortBy === key}
                            onClick={() => handleSort(key)}
                          >
                            {key === 'name' ? 'Name' : key === 'data' ? 'Managed data' : 'Version'}
                            {sortArrow(key)}
                          </SegmentBtn>
                        ))}
                      </SegmentGroup>
                    </ControlRow>

                    <ControlRow>
                      <ControlLabel>Group by</ControlLabel>
                      <SegmentGroup>
                        {(['label', 'status', 'version'] as GroupKey[]).map((key) => (
                          <SegmentBtn key={key} $active={groupBy === key} onClick={() => handleGroup(key)}>
                            {key === 'status' ? 'Health' : key.charAt(0).toUpperCase() + key.slice(1)}
                          </SegmentBtn>
                        ))}
                      </SegmentGroup>
                    </ControlRow>
                  </div>

                  {/* Right: add button */}
                  <div style={{ flexShrink: 0 }}>
                    <Button
                      variant="primary"
                      size="default"
                      label="Add deployment"
                      icon={<i className="fas fa-plus" />}
                      onClick={() => {}}
                    />
                  </div>
                </ToolbarRow>
              </SectionRight>
            </SectionRow>
          </StaticSection>

          {/* Scrollable card list — full panel width, scrollbar at panel edge */}
          <ScrollableCardsWrapper>
            <ScrollableCards ref={scrollRef} onScroll={updateFade}>
              <CardList>
                {sortedFiltered.length === 0 ? (
                  <div style={{ padding: `${spacing.r40} 0`, display: 'flex', justifyContent: 'center' }}>
                    <Text color="textSecondary">No deployments match your search.</Text>
                  </div>
                ) : groups.map((group, groupIdx) => (
                  <React.Fragment key={group.key}>
                    {groupBy !== null && (
                      <GroupHeaderRow $first={groupIdx === 0}>
                        <GroupHeaderLine />
                        {groupBy === 'status' ? (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: STATUS_META[group.key as DeploymentStatus].healthColor(theme), whiteSpace: 'nowrap' }}>
                            <i className={`fas ${STATUS_META[group.key as DeploymentStatus].healthIcon}`} style={{ fontSize: 12 }} />
                            {group.label} ({group.items.length})
                          </span>
                        ) : groupBy === 'version' ? (
                          <span style={{ fontSize: 12, color: theme.textSecondary, whiteSpace: 'nowrap', fontFamily: 'monospace' }}>
                            v{group.label} &nbsp;·&nbsp; {group.items.length} {group.items.length === 1 ? 'deployment' : 'deployments'}
                          </span>
                        ) : (
                          (() => {
                            const c = getLabelColor(group.label);
                            return (
                              <LabelPill $bg={c.bg} $color={c.text}>
                                {group.label} ({group.items.length})
                              </LabelPill>
                            );
                          })()
                        )}
                        <GroupHeaderLine />
                      </GroupHeaderRow>
                    )}

                    {group.items.map((d) => {
                      const availableLabels = allKnownLabels.filter(
                        (l) => !d.labels.includes(l),
                      );
                      const isPickerOpen = addingLabelFor === d.id;
                      return (
                        <DeploymentCardHoverable key={d.id}>
                          <CardHeader>
                            <CardHeaderLeft>
                              <i
                                className={`fas ${STATUS_META[d.status].healthIcon}`}
                                style={{ fontSize: 16, color: STATUS_META[d.status].healthColor(theme), flexShrink: 0 }}
                              />
                              <DeploymentLink href="#">{d.name} ↗</DeploymentLink>

                              <LabelZone>
                              {d.labels.map((label) => {
                                const c = getLabelColor(label);
                                return (
                                  <LabelPill key={label} $bg={c.bg} $color={c.text}>
                                    {label}
                                    <RemoveBtn
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        removeLabel(d.id, label);
                                      }}
                                      aria-label={`Remove label ${label}`}
                                    >
                                      ×
                                    </RemoveBtn>
                                  </LabelPill>
                                );
                              })}

                              {isPickerOpen
                                ? <Button variant="outline" size="inline" label="Cancel" onClick={(e) => { e.stopPropagation(); setAddingLabelFor(null); }} />
                                : (
                                  <DelayedTagTooltip>
                                    <TagAddBtn
                                      className="tag-add-btn"
                                      onClick={(e) => { e.stopPropagation(); openPicker(d.id); }}
                                    >
                                      <i className="fas fa-tag" />
                                    </TagAddBtn>
                                  </DelayedTagTooltip>
                                )
                              }
                              </LabelZone>
                            </CardHeaderLeft>

                            <CardHeaderRight>
                              <i className="fas fa-link" style={{ fontSize: 13, color: STATUS_META[d.status].color(theme) }} />
                              <Text variant="Smaller" color="textSecondary">{STATUS_META[d.status].label}</Text>
                              <TooltipCue />
                            </CardHeaderRight>
                          </CardHeader>

                          {/* Inline label picker — no z-index/overflow issues */}
                          {isPickerOpen && (
                            <CardLabelPicker onClick={(e) => e.stopPropagation()}>
                              {availableLabels.length > 0 && (
                                <>
                                  <Text variant="Smaller" color="textSecondary">Suggestions:</Text>
                                  {availableLabels.map((l) => {
                                    const c = getLabelColor(l);
                                    return (
                                      <LabelPickerBtn key={l} onClick={() => addLabel(d.id, l)}>
                                        <LabelPill $bg={c.bg} $color={c.text}>{l}</LabelPill>
                                      </LabelPickerBtn>
                                    );
                                  })}
                                  <span style={{ color: theme.textSecondary, fontSize: '0.8rem', marginLeft: spacing.r4 }}>or</span>
                                </>
                              )}
                              <LabelInput
                                ref={inputRef}
                                placeholder="New label..."
                                value={newLabelText}
                                onChange={(e) => setNewLabelText(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') addLabel(d.id, newLabelText);
                                  if (e.key === 'Escape') setAddingLabelFor(null);
                                }}
                                onClick={(e) => e.stopPropagation()}
                              />
                              {newLabelText.trim() && (
                                <Button
                                  variant="outline"
                                  size="inline"
                                  label="Add"
                                  onClick={() => addLabel(d.id, newLabelText)}
                                />
                              )}
                            </CardLabelPicker>
                          )}

                          <CardBody>
                            <div style={{ width: 180, flexShrink: 0 }}>
                              <Stack gap="r16" style={{ alignItems: 'center' }}>
                                <Text isEmphazed style={{ minWidth: '3.8rem' }}>{d.nodes} {d.nodes === 1 ? 'Node' : 'Nodes'}</Text>
                                <Text color="textSecondary">{d.volumes} Volumes</Text>
                              </Stack>
                            </div>

                            <div style={{ flex: 1, minWidth: 0, marginLeft: spacing.r16 }}>
                              <MetricGrid>
                                <MetricKey>Managed Data</MetricKey>
                                <MetricNum>{d.managedDataTiB.toFixed(2)}</MetricNum>
                                <MetricUnit>TiB</MetricUnit>
                                <MetricSecondary>({d.managedDataTB.toFixed(2)} TB)</MetricSecondary>
                                <MetricKey>Monthly Used Capacity</MetricKey>
                                <MetricNum>{d.monthlyCapacityTiB.toFixed(2)}</MetricNum>
                                <MetricUnit>TiB</MetricUnit>
                                <MetricSecondary>({d.monthlyCapacityTB.toFixed(2)} TB)</MetricSecondary>
                              </MetricGrid>
                            </div>

                            <div style={{ width: 80, flexShrink: 0, display: 'flex', alignItems: 'center', gap: spacing.r4 }}>
                              <span style={{ width: 12, flexShrink: 0, display: 'inline-flex', justifyContent: 'center' }}>
                                {d.version === latestVersion && (
                                  <i className="fas fa-check" style={{ fontSize: 10, color: theme.statusHealthy }} />
                                )}
                              </span>
                              <Text color="textSecondary">v {d.version}</Text>
                            </div>

                            <Stack gap="r4" style={{ alignItems: 'center', flexShrink: 0 }}>
                              <Tooltip overlay="Manage tokens" placement="top">
                                <span>
                                  <Button variant="secondary" size="inline" icon={<i className="fas fa-key" />} aria-label="Manage tokens" onClick={() => {}} />
                                </span>
                              </Tooltip>
                              <Tooltip overlay="Remove deployment" placement="top">
                                <span>
                                  <Button variant="danger" size="inline" icon={<i className="fas fa-trash" />} aria-label="Remove deployment" onClick={() => {}} />
                                </span>
                              </Tooltip>
                            </Stack>
                          </CardBody>
                        </DeploymentCardHoverable>
                      );
                    })}
                  </React.Fragment>
                ))}
              </CardList>

            </ScrollableCards>
            <FadeOverlay ref={fadeRef} />
          </ScrollableCardsWrapper>

        </MiddlePanel>
      </ContentArea>
    </PageWrapper>
  );
};

// ── Storybook meta ─────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Templates/Maestro Deployments',
  parameters: {
    layout: 'fullscreen',
    fullPage: true,
    docs: { toc: { disable: true } },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <CoreUiThemeProvider theme={coreUIAvailableThemes.darkRebrand}>
      <ScrollbarWrapper>
        <MaestroDeployments />
      </ScrollbarWrapper>
    </CoreUiThemeProvider>
  ),
};

// ── Focused stories for design proposal (hidden from sidebar) ───────────────────

const Padded = ({ children }: { children: React.ReactNode }) => (
  <CoreUiThemeProvider theme={coreUIAvailableThemes.darkRebrand}>
    <div style={{ padding: '1.5rem', background: coreUIAvailableThemes.darkRebrand.backgroundLevel2, display: 'inline-flex', flexDirection: 'column', gap: '0.75rem' }}>
      {children}
    </div>
  </CoreUiThemeProvider>
);

export const FocusLabelSystem: Story = {
  tags: ['!dev'],
  name: 'Focus — Label system',
  render: () => {
    const labels = ['production', 'eu-west', 'critical-client'];
    return (
      <Padded>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {labels.map((label) => {
            const c = getLabelColor(label);
            return (
              <LabelPill key={label} $bg={c.bg} $color={c.text}>
                {label}
                <RemoveBtn aria-label={`Remove ${label}`}>×</RemoveBtn>
              </LabelPill>
            );
          })}
          <TagAddBtn style={{ opacity: 1 }}>
            <i className="fas fa-tag" />
          </TagAddBtn>
        </div>
        <CardLabelPicker style={{ borderRadius: 4 }}>
          <Text variant="Smaller" color="textSecondary">Suggestions:</Text>
          {['staging', 'us-east'].map((l) => {
            const c = getLabelColor(l);
            return (
              <LabelPickerBtn key={l}>
                <LabelPill $bg={c.bg} $color={c.text}>{l}</LabelPill>
              </LabelPickerBtn>
            );
          })}
          <LabelInput placeholder="New label..." defaultValue="" />
        </CardLabelPicker>
      </Padded>
    );
  },
};

export const FocusToolbar: Story = {
  tags: ['!dev'],
  name: 'Focus — Sort & Group by',
  render: () => (
    <Padded>
      <ToolbarRow>
        <ControlRow>
          <ControlLabel>Sort by</ControlLabel>
          <SegmentGroup>
            {(['Name', 'Managed data', 'Version'] as const).map((label, i) => (
              <SegmentBtn key={label} $active={i === 0}>
                {label}
                {i === 0 && <span style={{ fontSize: 10, lineHeight: 1 }}>↓</span>}
              </SegmentBtn>
            ))}
          </SegmentGroup>
        </ControlRow>
        <ControlRow>
          <ControlLabel>Group by</ControlLabel>
          <SegmentGroup>
            {(['Label', 'Health', 'Version'] as const).map((label, i) => (
              <SegmentBtn key={label} $active={i === 1}>{label}</SegmentBtn>
            ))}
          </SegmentGroup>
        </ControlRow>
      </ToolbarRow>
    </Padded>
  ),
};

export const FocusVersionIndicator: Story = {
  tags: ['!dev'],
  name: 'Focus — Version indicator',
  render: () => {
    const theme = coreUIAvailableThemes.darkRebrand;
    const rows = [
      { version: '4.2.0', latest: true },
      { version: '4.1.1', latest: false },
      { version: '3.3.0', latest: false },
    ];
    return (
      <Padded>
        {rows.map(({ version, latest }) => (
          <div key={version} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ width: 16, display: 'inline-flex', justifyContent: 'center' }}>
              {latest && <i className="fas fa-check" style={{ fontSize: 10, color: theme.statusHealthy }} />}
            </span>
            <Text color="textSecondary">v {version}</Text>
          </div>
        ))}
      </Padded>
    );
  },
};

export const FocusMetricAlignment: Story = {
  tags: ['!dev'],
  name: 'Focus — Metric alignment',
  render: () => (
    <Padded>
      <MetricGrid>
        <MetricKey>Managed Data</MetricKey>
        <MetricNum>234.56</MetricNum>
        <MetricUnit>TiB</MetricUnit>
        <MetricSecondary>(257.93 TB)</MetricSecondary>

        <MetricKey>Managed Data</MetricKey>
        <MetricNum>8.40</MetricNum>
        <MetricUnit>TiB</MetricUnit>
        <MetricSecondary>(9.24 TB)</MetricSecondary>

        <MetricKey>Managed Data</MetricKey>
        <MetricNum>0.45</MetricNum>
        <MetricUnit>TiB</MetricUnit>
        <MetricSecondary>(0.49 TB)</MetricSecondary>
      </MetricGrid>
    </Padded>
  ),
};

export const FocusScrollFade: Story = {
  tags: ['!dev'],
  name: 'Focus — Scroll fade',
  render: () => {
    const theme = coreUIAvailableThemes.darkRebrand;
    const items = INITIAL_DEPLOYMENTS.slice(0, 6);
    return (
      <CoreUiThemeProvider theme={coreUIAvailableThemes.darkRebrand}>
        <div style={{ width: 400, background: theme.backgroundLevel2, borderRadius: 4, overflow: 'hidden' }}>
          <ScrollableCardsWrapper style={{ height: 180 }}>
            <ScrollableCards>
              <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.r8, padding: spacing.r8 }}>
                {items.map((d) => (
                  <div key={d.id} style={{ background: theme.backgroundLevel3, borderRadius: 3, padding: `${spacing.r8} ${spacing.r12}`, fontSize: 13, fontFamily: 'Lato', color: theme.textPrimary }}>
                    {d.name}
                  </div>
                ))}
              </div>
            </ScrollableCards>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 32, background: `linear-gradient(to bottom, transparent, ${theme.backgroundLevel2}bb)`, pointerEvents: 'none' }} />
          </ScrollableCardsWrapper>
        </div>
      </CoreUiThemeProvider>
    );
  },
};

export const FocusFullToolbar: Story = {
  tags: ['!dev'],
  name: 'Focus — Full toolbar',
  render: () => (
    <CoreUiThemeProvider theme={coreUIAvailableThemes.darkRebrand}>
      <div style={{ padding: '1rem', background: coreUIAvailableThemes.darkRebrand.backgroundLevel2 }}>
        <ToolbarRow>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.r8, flexShrink: 0 }}>
            <SearchInput value="" onChange={() => {}} onReset={() => {}} placeholder="Search..." size="2/3" />
            <span style={{ fontSize: '0.8rem', color: coreUIAvailableThemes.darkRebrand.textSecondary, whiteSpace: 'nowrap', minWidth: '9rem', fontVariantNumeric: 'tabular-nums' }}>
              11 deployments
            </span>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: spacing.r16 }}>
            <ControlRow>
              <ControlLabel>Sort by</ControlLabel>
              <SegmentGroup>
                {(['Name', 'Managed data', 'Version'] as const).map((label, i) => (
                  <SegmentBtn key={label} $active={i === 0}>{label}</SegmentBtn>
                ))}
              </SegmentGroup>
            </ControlRow>
            <ControlRow>
              <ControlLabel>Group by</ControlLabel>
              <SegmentGroup>
                {(['Label', 'Health', 'Version'] as const).map((label) => (
                  <SegmentBtn key={label} $active={false}>{label}</SegmentBtn>
                ))}
              </SegmentGroup>
            </ControlRow>
          </div>
          <div style={{ flexShrink: 0 }}>
            <Button variant="primary" size="default" label="Add deployment" icon={<i className="fas fa-plus" />} onClick={() => {}} />
          </div>
        </ToolbarRow>
      </div>
    </CoreUiThemeProvider>
  ),
};

export const FocusActionButtons: Story = {
  tags: ['!dev'],
  name: 'Focus — Action buttons',
  render: () => (
    <CoreUiThemeProvider theme={coreUIAvailableThemes.darkRebrand}>
      <div style={{ padding: '1rem', background: coreUIAvailableThemes.darkRebrand.backgroundLevel2, display: 'inline-flex', gap: spacing.r4 }}>
        <Tooltip overlay="Manage tokens" placement="top">
          <span>
            <Button variant="secondary" size="inline" icon={<i className="fas fa-key" />} aria-label="Manage tokens" onClick={() => {}} />
          </span>
        </Tooltip>
        <Tooltip overlay="Remove deployment" placement="top">
          <span>
            <Button variant="danger" size="inline" icon={<i className="fas fa-trash" />} aria-label="Remove deployment" onClick={() => {}} />
          </span>
        </Tooltip>
      </div>
    </CoreUiThemeProvider>
  ),
};

export const FocusSearchEmpty: Story = {
  tags: ['!dev'],
  name: 'Focus — Search empty state',
  render: () => {
    const theme = coreUIAvailableThemes.darkRebrand;
    return (
      <CoreUiThemeProvider theme={coreUIAvailableThemes.darkRebrand}>
        <div style={{ width: 480, background: theme.backgroundLevel2, display: 'flex', flexDirection: 'column', gap: spacing.r8 }}>
          <div style={{ padding: `0 ${spacing.r8}`, display: 'flex', alignItems: 'center', gap: spacing.r8 }}>
            <SearchInput value="xyz-not-found" onChange={() => {}} onReset={() => {}} placeholder="Search..." size="2/3" />
            <span style={{ fontSize: '0.8rem', color: theme.textSecondary, whiteSpace: 'nowrap', minWidth: '9rem', fontVariantNumeric: 'tabular-nums' }}>
              0 / 11 deployments
            </span>
          </div>
          <div style={{ padding: `${spacing.r40} 0`, display: 'flex', justifyContent: 'center' }}>
            <Text color="textSecondary">No deployments match your search.</Text>
          </div>
        </div>
      </CoreUiThemeProvider>
    );
  },
};

export const FocusFleetHealth: Story = {
  tags: ['!dev'],
  name: 'Focus — Fleet health KPI',
  render: () => {
    const theme = coreUIAvailableThemes.darkRebrand;
    const cases = [0, 2];
    return (
      <Padded>
        {cases.map((issueCount) => (
          <div key={issueCount} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 13, fontFamily: 'Lato', color: theme.textSecondary }}>Fleet health</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: spacing.r8, fontSize: 16, fontFamily: 'Lato', color: theme.textPrimary }}>
              {issueCount === 0 ? (
                <>
                  <i className="fas fa-check-circle" style={{ fontSize: 14, color: theme.statusHealthy }} />
                  <span>All deployments healthy</span>
                </>
              ) : (
                <>
                  <i className="fas fa-exclamation-circle" style={{ fontSize: 14, color: theme.statusWarning }} />
                  <span>{issueCount} deployments unhealthy</span>
                </>
              )}
            </div>
          </div>
        ))}
      </Padded>
    );
  },
};

export const FocusLatestVersion: Story = {
  tags: ['!dev'],
  name: 'Focus — Latest version KPI',
  render: () => {
    const theme = coreUIAvailableThemes.darkRebrand;
    const cases = [
      { latestVersion: '4.2.0', onLatestCount: 11, total: 11 },
      { latestVersion: '4.2.0', onLatestCount: 3, total: 11 },
    ];
    return (
      <Padded>
        {cases.map(({ latestVersion, onLatestCount, total }) => (
          <div key={onLatestCount} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 13, fontFamily: 'Lato', color: theme.textSecondary }}>ARTESCA latest version</span>
            <KpiValueRow>
              {latestVersion}
              <span style={{ color: theme.textSecondary }}>
                {onLatestCount === total ? '· all up to date' : `· ${onLatestCount} of ${total} up to date`}
              </span>
            </KpiValueRow>
          </div>
        ))}
      </Padded>
    );
  },
};

export const FocusColorWheel: Story = {
  tags: ['!dev'],
  name: 'Focus — HSL color wheel',
  render: () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const size = 220;
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 8;

    React.useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw the hue ring
      for (let angle = 0; angle < 360; angle++) {
        const start = (angle - 1) * Math.PI / 180;
        const end = (angle + 1) * Math.PI / 180;
        const gradient = ctx.createRadialGradient(cx, cy, r * 0.55, cx, cy, r);
        gradient.addColorStop(0, `hsla(${angle}, 0%, 60%, 0)`);
        gradient.addColorStop(1, `hsl(${angle}, 45%, 62%)`);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, r, start, end);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Mark the 12 palette positions
      const hues = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
      const dotR = r * 0.78;
      hues.forEach((hue) => {
        const rad = (hue - 90) * Math.PI / 180;
        const x = cx + dotR * Math.cos(rad);
        const y = cy + dotR * Math.sin(rad);
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${hue}, 50%, 62%)`;
        ctx.fill();
      });
    }, []);

    return (
      <CoreUiThemeProvider theme={coreUIAvailableThemes.darkRebrand}>
        <div style={{ padding: '1.5rem', background: coreUIAvailableThemes.darkRebrand.backgroundLevel2, display: 'inline-flex' }}>
          <canvas ref={canvasRef} width={size} height={size} />
        </div>
      </CoreUiThemeProvider>
    );
  },
};

export const FocusLabelPalette: Story = {
  tags: ['!dev'],
  name: 'Focus — Label color palette',
  render: () => {
    const examples = [
      'production', 'staging', 'eu-west', 'us-east',
      'critical-client', 'dev', 'fra-dc01', 'sin-object',
      'backup', 'dr-site', 'internal', 'partner',
    ];
    return (
      <Padded>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing.r8, maxWidth: 480 }}>
          {LABEL_COLOR_PALETTE.map((c, i) => (
            <LabelPill key={i} $bg={c.bg} $color={c.text}>
              {examples[i]}
            </LabelPill>
          ))}
        </div>
      </Padded>
    );
  },
};

export const FocusSearch: Story = {
  tags: ['!dev'],
  name: 'Focus — Search',
  render: () => {
    const [value, setValue] = React.useState('prod');
    const theme = coreUIAvailableThemes.darkRebrand;
    const all = INITIAL_DEPLOYMENTS;
    const filtered = all.filter((d) =>
      d.name.toLowerCase().includes(value.toLowerCase()) ||
      d.version.toLowerCase().includes(value.toLowerCase()) ||
      STATUS_META[d.status].label.toLowerCase().includes(value.toLowerCase()) ||
      d.labels.some((l) => l.toLowerCase().includes(value.toLowerCase())),
    );
    return (
      <CoreUiThemeProvider theme={coreUIAvailableThemes.darkRebrand}>
        <div style={{ padding: '1rem', background: theme.backgroundLevel2, display: 'flex', flexDirection: 'column', gap: spacing.r8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.r8 }}>
            <SearchInput value={value} onChange={(e) => setValue(e.target.value)} onReset={() => setValue('')} placeholder="Search..." size="2/3" />
            <span style={{ fontSize: '0.8rem', color: theme.textSecondary, whiteSpace: 'nowrap', minWidth: '9rem', fontVariantNumeric: 'tabular-nums' }}>
              {value ? `${filtered.length} / ${all.length} deployments` : `${all.length} deployments`}
            </span>
          </div>
          {filtered.map((d) => (
            <div key={d.id} style={{ background: theme.backgroundLevel3, borderRadius: 3, padding: `${spacing.r8} ${spacing.r12}`, fontSize: 13, fontFamily: 'Lato', color: theme.textPrimary }}>
              {d.name}
            </div>
          ))}
        </div>
      </CoreUiThemeProvider>
    );
  },
};

export const FocusGroupBy: Story = {
  tags: ['!dev'],
  name: 'Focus — Group by label',
  render: () => {
    const theme = coreUIAvailableThemes.darkRebrand;
    const groups = [
      { label: 'production', items: ['artesca-acme-prod', 'umbrella-corp-prod'] },
      { label: 'staging', items: ['artesca-initech-stg', 'ams-dc01'] },
    ];
    return (
      <CoreUiThemeProvider theme={coreUIAvailableThemes.darkRebrand}>
        <div style={{ width: 480, padding: `${spacing.r8} ${spacing.r16}`, background: theme.backgroundLevel2, display: 'flex', flexDirection: 'column' }}>
          {groups.map((group, idx) => {
            const c = getLabelColor(group.label);
            return (
              <React.Fragment key={group.label}>
                <GroupHeaderRow $first={idx === 0}>
                  <GroupHeaderLine />
                  <LabelPill $bg={c.bg} $color={c.text}>{group.label} ({group.items.length})</LabelPill>
                  <GroupHeaderLine />
                </GroupHeaderRow>
                {group.items.map((name) => (
                  <div key={name} style={{ background: theme.backgroundLevel3, borderRadius: 3, padding: `${spacing.r8} ${spacing.r12}`, fontSize: 13, fontFamily: 'Lato', color: theme.textPrimary, marginBottom: spacing.r8 }}>
                    {name}
                  </div>
                ))}
              </React.Fragment>
            );
          })}
        </div>
      </CoreUiThemeProvider>
    );
  },
};

export const FocusBackgroundLevels: Story = {
  tags: ['!dev'],
  name: 'Focus — Background levels',
  render: () => {
    const theme = coreUIAvailableThemes.darkRebrand;
    const levels = [
      { bg: theme.backgroundLevel1, label: 'backgroundLevel1', usage: 'Page background — outermost surface' },
      { bg: theme.backgroundLevel2, label: 'backgroundLevel2', usage: 'Panels, sidebars, card list area' },
      { bg: theme.backgroundLevel3, label: 'backgroundLevel3', usage: 'Cards, table rows, input fields' },
      { bg: theme.backgroundLevel4, label: 'backgroundLevel4', usage: 'Card headers, nested inset sections' },
    ];
    return (
      <CoreUiThemeProvider theme={theme}>
        <div style={{ padding: '1.5rem', background: theme.backgroundLevel2, display: 'flex', gap: '2.5rem', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {levels.map(({ bg, label, usage }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: 4, background: bg, border: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <code style={{ fontSize: 12, fontFamily: 'monospace', color: theme.textPrimary }}>{label}</code>
                  <span style={{ fontSize: 11, fontFamily: 'Lato', color: theme.textSecondary }}>{usage}</span>
                </div>
                <code style={{ marginLeft: '0.5rem', fontSize: 10, fontFamily: 'monospace', color: theme.textSecondary, background: theme.backgroundLevel3, padding: '2px 5px', borderRadius: 3 }}>{bg}</code>
              </div>
            ))}
          </div>
          <div style={{ padding: '1rem', background: theme.backgroundLevel1, borderRadius: 4 }}>
            <div style={{ fontSize: 10, fontFamily: 'monospace', color: theme.textSecondary, marginBottom: '0.5rem' }}>Level 1</div>
            <div style={{ padding: '0.75rem', background: theme.backgroundLevel2, borderRadius: 3 }}>
              <div style={{ fontSize: 10, fontFamily: 'monospace', color: theme.textSecondary, marginBottom: '0.5rem' }}>Level 2</div>
              <div style={{ padding: '0.5rem', background: theme.backgroundLevel3, borderRadius: 3 }}>
                <div style={{ fontSize: 10, fontFamily: 'monospace', color: theme.textSecondary, marginBottom: '0.5rem' }}>Level 3</div>
                <div style={{ padding: '0.4rem 0.6rem', background: theme.backgroundLevel4, borderRadius: 2 }}>
                  <div style={{ fontSize: 10, fontFamily: 'monospace', color: theme.textSecondary }}>Level 4</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CoreUiThemeProvider>
    );
  },
};

export const FocusRedline: Story = {
  tags: ['!dev'],
  name: 'Focus — Layout redline',
  render: () => {
    const theme = coreUIAvailableThemes.darkRebrand;
    const ac = '#ff6b6b';

    // Intentionally neutral wireframe colors — not theme colors
    const wfPage       = '#13131c';
    const wfPanel      = '#1d1d2c';
    const wfCard       = '#252538';
    const wfCardHeader = '#2d2d46';
    const wfBlock      = '#3a3a5a';
    const wfBlockDim   = '#2e2e48';
    const wfStatus0    = '#b87800';
    const wfStatus1    = '#1f6e4a';
    const wfBlue       = '#1a4a80';

    const mockW = 400;
    const kpiH = 56;
    const toolbarH = 44;
    const cardHeaderH = 40;
    const cardBodyH = 60;
    const listPad = 8;
    const cardGap = 8;
    const mockH = kpiH + toolbarH + listPad + cardHeaderH + cardBodyH + cardGap + cardHeaderH + cardBodyH + listPad;

    const zones: Array<{ y1: number; y2: number; label: string; dim: string; bg: string }> = [
      { y1: 0,                                         y2: kpiH,                                                     label: 'KPI row',     dim: '56px', bg: 'backgroundLevel2' },
      { y1: kpiH,                                      y2: kpiH + toolbarH,                                          label: 'Toolbar',     dim: '44px', bg: 'backgroundLevel2' },
      { y1: kpiH + toolbarH + listPad,                 y2: kpiH + toolbarH + listPad + cardHeaderH,                 label: 'Card header', dim: '40px', bg: 'backgroundLevel4' },
      { y1: kpiH + toolbarH + listPad + cardHeaderH,   y2: kpiH + toolbarH + listPad + cardHeaderH + cardBodyH,     label: 'Card body',   dim: '60px', bg: 'backgroundLevel3' },
    ];

    const bracketX = mockW + 28;
    const svgW = mockW + 290;

    return (
      <CoreUiThemeProvider theme={theme}>
        <div style={{ padding: '1.5rem', background: theme.backgroundLevel2, display: 'inline-flex' }}>
          <div style={{ position: 'relative', width: svgW, height: mockH }}>

            {/* Layout mock — neutral wireframe palette, not the live theme colors */}
            <div style={{ position: 'absolute', left: 0, top: 0, width: mockW, height: mockH, background: wfPage, borderRadius: 4, overflow: 'hidden' }}>
              {/* KPI row */}
              <div style={{ height: kpiH, background: wfPanel, display: 'flex', alignItems: 'center', padding: '0 16px', gap: 16 }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ height: 9, background: wfBlockDim, borderRadius: 2 }} />
                    <div style={{ height: 18, background: wfBlock, borderRadius: 2 }} />
                  </div>
                ))}
              </div>
              {/* Toolbar */}
              <div style={{ height: toolbarH, background: wfPanel, display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8 }}>
                <div style={{ flex: 1, height: 28, background: wfCard, borderRadius: 3, border: `1px solid ${wfBlock}` }} />
                <div style={{ width: 70, height: 28, background: wfCard, borderRadius: 3 }} />
                <div style={{ width: 70, height: 28, background: wfCard, borderRadius: 3 }} />
                <div style={{ width: 88, height: 32, background: wfBlue, borderRadius: 3 }} />
              </div>
              {/* Card list */}
              <div style={{ padding: `${listPad}px 12px`, display: 'flex', flexDirection: 'column', gap: cardGap }}>
                {[0, 1].map((i) => (
                  <div key={i} style={{ background: wfCard, borderRadius: 3 }}>
                    {/* Card header — fixed 40px */}
                    <div style={{ height: cardHeaderH, background: wfCardHeader, borderRadius: '3px 3px 0 0', display: 'flex', alignItems: 'center', padding: '0 12px', gap: 8 }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: i === 0 ? wfStatus0 : wfStatus1, flexShrink: 0 }} />
                      <div style={{ flex: 1, height: 10, background: wfBlock, borderRadius: 2 }} />
                      <div style={{ width: 10, height: 10, background: wfBlock, borderRadius: '50%' }} />
                      <div style={{ width: 10, height: 10, background: wfBlock, borderRadius: '50%' }} />
                    </div>
                    {/* Card body — fixed 60px */}
                    <div style={{ height: cardBodyH, display: 'flex', alignItems: 'center', padding: '0 12px', gap: 10 }}>
                      {[0, 1, 2, 3].map((j) => (
                        <div key={j} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
                          <div style={{ height: 9, background: wfBlockDim, borderRadius: 2 }} />
                          <div style={{ height: 18, background: wfBlock, borderRadius: 2 }} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SVG redline overlay */}
            <svg style={{ position: 'absolute', left: 0, top: 0, width: svgW, height: mockH, pointerEvents: 'none', overflow: 'visible' }}>
              {/* Outer frame border */}
              <rect x={0} y={0} width={mockW} height={mockH} rx={4} ry={4} fill="none" stroke={ac} strokeWidth={1} opacity={0.5} />

              {/* Zone highlight borders */}
              {zones.map(({ y1, y2 }, i) => (
                <rect key={`zr${i}`} x={0.5} y={y1} width={mockW - 1} height={y2 - y1} fill={`${ac}08`} stroke={ac} strokeWidth={0.75} opacity={0.6} />
              ))}

              {/* Dimension brackets + labels */}
              {zones.map(({ y1, y2, label, dim, bg }, i) => {
                const mid = (y1 + y2) / 2;
                return (
                  <g key={i}>
                    {/* Dashed guide lines from mock edge to bracket */}
                    <line x1={mockW} y1={y1} x2={bracketX - 2} y2={y1} stroke={ac} strokeWidth={0.75} strokeDasharray="3 3" opacity={0.5} />
                    <line x1={mockW} y1={y2} x2={bracketX - 2} y2={y2} stroke={ac} strokeWidth={0.75} strokeDasharray="3 3" opacity={0.5} />
                    {/* Tick marks */}
                    <line x1={bracketX - 5} y1={y1} x2={bracketX + 5} y2={y1} stroke={ac} strokeWidth={1.5} />
                    <line x1={bracketX - 5} y1={y2} x2={bracketX + 5} y2={y2} stroke={ac} strokeWidth={1.5} />
                    {/* Vertical bracket */}
                    <line x1={bracketX} y1={y1 + 1} x2={bracketX} y2={y2 - 1} stroke={ac} strokeWidth={1.5} />
                    {/* Horizontal leader */}
                    <line x1={bracketX} y1={mid} x2={bracketX + 16} y2={mid} stroke={ac} strokeWidth={0.75} opacity={0.6} />
                    {/* Label lines */}
                    <text x={bracketX + 22} y={mid - 4} fontSize={12} fontFamily="monospace" fontWeight="600" fill={ac}>{label} · {dim}</text>
                    <text x={bracketX + 22} y={mid + 10} fontSize={10} fontFamily="monospace" fill={ac} opacity={0.55}>{bg}</text>
                  </g>
                );
              })}
            </svg>

          </div>
        </div>
      </CoreUiThemeProvider>
    );
  },
};
