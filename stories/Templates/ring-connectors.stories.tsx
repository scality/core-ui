import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import styled, { useTheme } from 'styled-components';
import { Navbar } from '../../src/lib/components/navbar/Navbar.component';
import {
  Table,
  Column,
  useTableContext,
} from '../../src/lib/components/tablev2/Tablev2.component';
import { Button, CoreUiThemeProvider } from '../../src/lib/next';
import { Stack, spacing } from '../../src/lib/spacing';
import { MemoryRouter } from 'react-router-dom';
import { Text } from '../../src/lib/components/text/Text.component';
import { getThemePropSelector } from '../../src/lib/utils';
import { CoreUITheme, coreUIAvailableThemes } from '../../src/lib/style/theme';

// ── Data ────────────────────────────────────────────────────────────────────

type ConnectorStatus = 'ok' | 'warning' | 'error';

type Connector = {
  id: string;
  name: string;
  type: string;
  status: ConnectorStatus;
  address: string;
  resourceType: string;
};

const CONNECTORS: Connector[] = Array.from({ length: 10 }, (_, i) => ({
  id: String(i + 1),
  name: `storage-${i + 1}-weka`,
  type: 'Weka',
  status: 'ok' as ConnectorStatus,
  address: `10.160.117.${253 - i}:8181`,
  resourceType: 'type:connectors',
}));

type StatRow = { label: string; percent?: string; value: string };

const DATA_STATS: StatRow[] = [
  { label: 'Objects', value: '11 871 175 036' },
  { label: 'Unique objects', value: '11 345 678 910' },
  { label: 'Average size', value: '5.47 MB' },
  { label: 'Avg size (unique)', value: '5.42 MB' },
  { label: 'Unique', percent: '02.53 %', value: '500.11 TB' },
  { label: 'Stored', percent: '07.47 %', value: '0.15 PB' },
  { label: 'Used', percent: '39.89 %', value: '0.81 PB' },
  { label: 'Available', percent: '50.11 %', value: '1.01 PB' },
  { label: 'Total', value: '2.02 PB' },
];

// Weka logo — temporary Figma URL (expires after 7 days).
// TODO: export to .storybook/public/weka-icon.svg and reference as '/weka-icon.svg'
const wekaIconUrl =
  'https://www.figma.com/api/mcp/asset/e8de5529-7c7c-4cd3-a123-e4fcdc16dc73';

// ── Page layout ─────────────────────────────────────────────────────────────

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${getThemePropSelector('backgroundLevel1')};
  color: ${getThemePropSelector('textPrimary')};
`;

const ContentArea = styled.div`
  display: flex;
  flex: 1;
  gap: ${spacing.r8};
  overflow: hidden;
`;

// ── Breadcrumb ───────────────────────────────────────────────────────────────

const BreadcrumbBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
  height: 24px;
  padding: 0 120px;
  background: ${getThemePropSelector('infoPrimary')};
  color: white;
  font-size: 14px;
  flex-shrink: 0;
`;

const BreadcrumbSep = styled.span`
  opacity: 0.6;
`;

// ── Sub-navigation level 1 (Dashboard / Operations / Administration) ─────────

const SubNav1 = styled.nav`
  display: flex;
  align-items: flex-end;
  padding: 5px 120px 0;
  background: ${getThemePropSelector('backgroundLevel3')};
  flex-shrink: 0;
`;

const SubNav1Tab = styled.button<{ $active?: boolean }>`
  width: 160px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $active, theme }) =>
    $active ? (theme as CoreUITheme).backgroundLevel4 : 'transparent'};
  border: none;
  border-radius: ${({ $active }) => ($active ? '4px 4px 0 0' : '0')};
  color: ${({ $active, theme }) =>
    $active
      ? (theme as CoreUITheme).textPrimary
      : (theme as CoreUITheme).textSecondary};
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => (theme as CoreUITheme).highlight};
  }
`;

// ── Sub-navigation level 2 (Nodes / Connectors / Actions) ───────────────────

const SubNav2 = styled.nav`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
  padding: 4px 120px;
  background: ${getThemePropSelector('backgroundLevel4')};
  flex-shrink: 0;
`;

const SubNav2Tab = styled.button<{ $active?: boolean }>`
  width: 160px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $active, theme }) =>
    $active ? (theme as CoreUITheme).backgroundLevel1 : 'transparent'};
  border: none;
  border-radius: ${({ $active }) => ($active ? '8px' : '0')};
  color: ${({ $active, theme }) =>
    $active
      ? (theme as CoreUITheme).textPrimary
      : (theme as CoreUITheme).textSecondary};
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => (theme as CoreUITheme).highlight};
  }
`;

// ── DATA card (left panel) ───────────────────────────────────────────────────

const DataCardWrapper = styled.div`
  width: 248px;
  display: flex;
  flex-direction: column;
  gap: ${spacing.r16};
  padding: ${spacing.r16};
  background: ${getThemePropSelector('backgroundLevel2')};
  border-radius: 4px;
`;

const CardSeparator = styled.div`
  height: 1px;
  width: 100%;
  background: ${getThemePropSelector('border')};
  flex-shrink: 0;
`;

/**
 * Simple circular donut using SVG path A command (not strokeDasharray).
 * percent is 0–100.
 */
const DataDonut: React.FC<{ percent: number }> = ({ percent }) => {
  const size = 88;
  const cx = 44;
  const cy = 44;
  const r = 32;
  const sw = 10;

  const pt = (deg: number) => ({
    x: cx + r * Math.cos((deg * Math.PI) / 180),
    y: cy + r * Math.sin((deg * Math.PI) / 180),
  });

  const arcPath = (pct: number): string => {
    if (pct <= 0) return '';
    const sweep = Math.min((pct / 100) * 360, 359.9);
    const start = pt(-90);
    const end = pt(-90 + sweep);
    const largeArc = sweep > 180 ? 1 : 0;
    return `M ${start.x.toFixed(3)} ${start.y.toFixed(3)} A ${r} ${r} 0 ${largeArc} 1 ${end.x.toFixed(3)} ${end.y.toFixed(3)}`;
  };

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#3a3535" strokeWidth={sw} />
        {percent > 0 && (
          <path
            d={arcPath(percent)}
            fill="none"
            stroke="#2BAB51"
            strokeWidth={sw}
            strokeLinecap="butt"
          />
        )}
      </svg>
      <button
        style={{
          position: 'absolute',
          bottom: 4,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 18,
          height: 18,
          borderRadius: '50%',
          border: '1px solid #555',
          background: '#272020',
          color: 'white',
          fontSize: 11,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          padding: 0,
          lineHeight: 1,
        }}
        aria-label="Add"
      >
        +
      </button>
    </div>
  );
};

const StatGroupTitle = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${getThemePropSelector('textPrimary')};
`;

const StatRowLine = styled.div`
  height: 1px;
  width: 100%;
  background: ${getThemePropSelector('border')};
`;

const StatGroupRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: ${getThemePropSelector('textPrimary')};
`;

const StatGroupValue = styled.span<{ $color?: keyof CoreUITheme }>`
  font-weight: 500;
  color: ${({ $color, theme }) =>
    $color ? (theme as CoreUITheme)[$color] : (theme as CoreUITheme).textPrimary};
`;

const MetricRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 16px;
  font-size: 14px;
  color: ${getThemePropSelector('textPrimary')};
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 24px;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $flex: number }>`
  flex: ${({ $flex }) => $flex};
  background: ${getThemePropSelector('selectedActive')};
  border-radius: 4px 0 0 4px;
`;

const ProgressEmpty = styled.div<{ $flex: number }>`
  flex: ${({ $flex }) => $flex};
  background: ${getThemePropSelector('backgroundLevel1')};
  border-radius: 0 4px 4px 0;
`;

// ── Right panel ──────────────────────────────────────────────────────────────

const ConnectorsPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${spacing.r16};
  padding: ${spacing.r24} ${spacing.r16};
  min-width: 0;
  overflow: hidden;
`;

const PanelTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
  color: ${getThemePropSelector('textPrimary')};
  font-size: 26px;
  font-family: 'Roboto', sans-serif;
`;

// ── Connector group badge ────────────────────────────────────────────────────

/** Diagonal-cut shape: top-left and bottom-right corners are rounded */
const ConnectorGroupBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding: 0 ${spacing.r12};
  background: ${getThemePropSelector('infoPrimary')};
  border-radius: 8px 0 8px 0;
  color: white;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  align-self: flex-start;
  flex-shrink: 0;
`;

// ── Table cell components ────────────────────────────────────────────────────

const NameLink = styled.a`
  color: ${getThemePropSelector('textLink')};
  text-decoration: none;
  font-size: 1rem;
  font-family: inherit;

  &:hover {
    text-decoration: underline;
  }
`;

/** Name cell: puzzle-piece icon + link */
const NameCell: React.FC<{ value: string }> = ({ value }) => {
  const theme = useTheme() as CoreUITheme;
  return (
    <Stack gap="r8" style={{ alignItems: 'center' }}>
      <i className="fas fa-puzzle-piece" style={{ fontSize: 14, color: theme.textSecondary, flexShrink: 0 }} />
      <NameLink href="#">{value}</NameLink>
    </Stack>
  );
};

const TypeCell: React.FC<{ value: string }> = ({ value }) => (
  <Stack gap="r8" style={{ alignItems: 'center' }}>
    <img src={wekaIconUrl} alt="Weka" height={16} style={{ display: 'block', flexShrink: 0 }} />
    <Text variant="Basic">{value}</Text>
  </Stack>
);

const OkBadge = styled.span`
  background: ${getThemePropSelector('statusHealthy')};
  color: white;
  padding: 2px 8px;
  border-radius: 2px;
  font-size: 14px;
  font-weight: 700;
`;

const ConnectorStatusCell: React.FC<{ value: ConnectorStatus }> = ({ value }) => {
  if (value === 'ok') return <OkBadge>OK</OkBadge>;
  if (value === 'warning')
    return <OkBadge style={{ background: '#f0a500' }}>WARN</OkBadge>;
  return <OkBadge style={{ background: '#e53935' }}>ERR</OkBadge>;
};

/** Hides columns by id on mount — used to keep resourceType out of the rendered table */
const HideColumns: React.FC<{ ids: string[] }> = ({ ids }) => {
  const { setHiddenColumns } = useTableContext<Connector>();
  useEffect(() => {
    setHiddenColumns((prev) => [...prev, ...ids.filter((id) => !prev.includes(id))]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

const connectorColumns: Column<Connector>[] = [
  {
    Header: 'Name',
    accessor: 'name',
    cellStyle: { width: 'unset', flex: 3, textAlign: 'left' },
    Cell: ({ value }) => <NameCell value={value as string} />,
  },
  {
    Header: 'Type',
    accessor: 'type',
    cellStyle: { width: 'unset', flex: 2, textAlign: 'left' },
    Cell: ({ value }) => <TypeCell value={value as string} />,
  },
  {
    Header: 'Status',
    accessor: 'status',
    cellStyle: { width: 'unset', flex: 1, textAlign: 'left' },
    Cell: ({ value }) => <ConnectorStatusCell value={value as ConnectorStatus} />,
  },
  {
    Header: 'Address',
    accessor: 'address',
    cellStyle: { width: 'unset', flex: 3, textAlign: 'left' },
  },
  {
    Header: 'Action',
    id: 'action',
    accessor: (row: Connector) => row.id,
    cellStyle: { width: 'unset', flex: 2, textAlign: 'left' },
    Cell: () => (
      <Button variant="secondary" size="inline" label="Remove" onClick={() => {}} />
    ),
    disableSortBy: true,
  },
  {
    // Hidden column — participates in global filter only.
    // "type:connectors" pre-fill in the search bar matches this field.
    Header: '',
    accessor: 'resourceType',
    cellStyle: { width: 'unset', flex: 0 },
    disableSortBy: true,
  },
];

// ── Navbar right button ──────────────────────────────────────────────────────

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

// ── Main component ────────────────────────────────────────────────────────────

const RingConnectors = () => {
  const theme = useTheme() as CoreUITheme;
  const usedPercent = 39.89;

  return (
    <PageWrapper>
      {/* ── Top navbar ── */}
      <Navbar
        tabs={[
          { title: 'Overview' },
          { title: 'Monitoring' },
          { title: 'RING Administration', selected: true },
          { title: 'Identity' },
          { title: 'S3 Services' },
        ]}
        rightActions={[
          {
            type: 'custom',
            render: () => (
              <NavIconBtn aria-label="Settings">
                <i className="fas fa-cog" />
              </NavIconBtn>
            ),
          },
          {
            type: 'custom',
            render: () => (
              <NavIconBtn aria-label="Notifications">
                <i className="fas fa-bell" />
              </NavIconBtn>
            ),
          },
          {
            type: 'dropdown',
            text: 'Sid Heller',
            items: [
              { label: 'My account', onClick: () => {} },
              { label: 'Sign out', onClick: () => {} },
            ],
          },
        ]}
      />

      {/* ── Breadcrumb: home > Local > DATA ── */}
      <BreadcrumbBar>
        <i className="fas fa-home" />
        <BreadcrumbSep>{'>'}</BreadcrumbSep>
        <span>Local</span>
        <BreadcrumbSep>{'>'}</BreadcrumbSep>
        <span>DATA</span>
      </BreadcrumbBar>

      {/* ── Sub-nav level 1 ── */}
      <SubNav1 aria-label="Section navigation">
        <SubNav1Tab>Dashboard</SubNav1Tab>
        <SubNav1Tab $active>Operations</SubNav1Tab>
        <SubNav1Tab>Administration</SubNav1Tab>
      </SubNav1>

      {/* ── Sub-nav level 2 ── */}
      <SubNav2 aria-label="Operations navigation">
        <SubNav2Tab>Nodes</SubNav2Tab>
        <SubNav2Tab $active>Connectors</SubNav2Tab>
        <SubNav2Tab>Actions</SubNav2Tab>
      </SubNav2>

      {/* ── Content area ── */}
      <ContentArea>
        {/* ── Left: DATA card ── */}
        <div style={{ padding: spacing.r32, flexShrink: 0 }}>
          <DataCardWrapper>
            {/* Header */}
            <Stack direction="vertical" gap="r4">
              <Text variant="Larger">DATA</Text>
              <Text variant="Basic" isEmphazed color="textSecondary">
                RUN
              </Text>
            </Stack>

            <CardSeparator />

            {/* Donut + Online / Available stats */}
            <div style={{ display: 'flex', gap: 22, alignItems: 'flex-start' }}>
              <DataDonut percent={usedPercent} />
              <Stack direction="vertical" gap="r8" style={{ flex: 1 }}>
                <Stack direction="vertical" gap="r4">
                  <StatGroupTitle>Online</StatGroupTitle>
                  <StatRowLine />
                  <StatGroupRow>
                    <span>Nodes</span>
                    <StatGroupValue $color="statusHealthy">18</StatGroupValue>
                  </StatGroupRow>
                </Stack>
                <Stack direction="vertical" gap="r4">
                  <StatGroupTitle>Available</StatGroupTitle>
                  <StatRowLine />
                  <StatGroupRow>
                    <span>Connectors</span>
                    <StatGroupValue>12</StatGroupValue>
                  </StatGroupRow>
                </Stack>
              </Stack>
            </div>

            {/* Metrics table */}
            <Stack direction="vertical" gap="r4">
              {DATA_STATS.map((row) => (
                <MetricRow key={row.label}>
                  <span style={{ minWidth: 64 }}>{row.label}</span>
                  {row.percent !== undefined && (
                    <span style={{ flex: 1, textAlign: 'center', color: theme.textSecondary }}>
                      {row.percent}
                    </span>
                  )}
                  <span style={{ textAlign: 'right', minWidth: 64 }}>{row.value}</span>
                </MetricRow>
              ))}
            </Stack>

            {/* Progress bar */}
            <ProgressBarWrapper>
              <ProgressFill $flex={usedPercent} />
              <ProgressEmpty $flex={100 - usedPercent} />
            </ProgressBarWrapper>
          </DataCardWrapper>
        </div>

        {/* ── Right: All Connectors ── */}
        <ConnectorsPanel>
          {/* Page title */}
          <PanelTitle>
            <i className="fas fa-puzzle-piece" style={{ fontSize: 20 }} />
            All Connectors
          </PanelTitle>

          {/* Group badge + table with search + count */}
          <Stack direction="vertical" gap="r16" style={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
            <ConnectorGroupBadge>Weka Connectors</ConnectorGroupBadge>
            <div style={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
              <MemoryRouter initialEntries={['/?search=type:connectors']}>
                <Table
                  columns={connectorColumns}
                  data={CONNECTORS}
                  defaultSortingKey="name"
                  getRowId={(row) => row.id}
                  entityName={{
                    en: { singular: 'connector', plural: 'connectors' },
                  }}
                >
                  <HideColumns ids={['resourceType']} />
                  <Table.SearchWithQueryParams />
                  <Table.SingleSelectableContent
                    rowHeight="h32"
                    separationLineVariant="backgroundLevel3"
                  />
                </Table>
              </MemoryRouter>
            </div>
          </Stack>
        </ConnectorsPanel>
      </ContentArea>
    </PageWrapper>
  );
};

// ── Storybook meta ────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Templates/RING Connectors',
  globals: {
    theme: 'ring9dark',
  },
  parameters: {
    layout: 'fullscreen',
    fullPage: true,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <CoreUiThemeProvider theme={coreUIAvailableThemes.ring9dark}>
      <RingConnectors />
    </CoreUiThemeProvider>
  ),
};
