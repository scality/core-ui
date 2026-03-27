import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import styled, { useTheme } from 'styled-components';
import { Navbar } from '../../src/lib/components/navbar/Navbar.component';
import {
  Table,
  Column,
} from '../../src/lib/components/tablev2/Tablev2.component';
import { Button } from '../../src/lib/next';
import { BrowserRouter } from 'react-router-dom';
import { HealthSelector } from '../../src/lib/components/healthselectorv2/HealthSelector.component';
import { Stack, spacing } from '../../src/lib/spacing';
import { Text } from '../../src/lib/components/text/Text.component';
import { getThemePropSelector } from '../../src/lib/utils';
import { CoreUITheme, coreUIAvailableThemes } from '../../src/lib/style/theme';
import { CoreUiThemeProvider } from '../../src/lib/next';

// ── Data ───────────────────────────────────────────────────────────────────────

type VolumeStatus = 'healthy' | 'warning' | 'critical' | 'unknown';

type Volume = {
  name: string;
  status: VolumeStatus;
  backendRings: string;
  dataProtectionLevel: string;
  protocols: string;
};

const VOLUMES: Volume[] = [
  {
    name: 'VolumeDLM',
    status: 'healthy',
    backendRings: 'DATA - META',
    dataProtectionLevel: 'Standard Durability Erasure Coding (E.C. 9+3)',
    protocols: 'NFS',
  },
  {
    name: 'ReallyDoNotTouch',
    status: 'unknown',
    backendRings: 'DATA - META',
    dataProtectionLevel: 'Standard Durability Erasure Coding (E.C. 9+3)',
    protocols: 'NFS',
  },
  {
    name: 'volume1',
    status: 'healthy',
    backendRings: 'DATA - META',
    dataProtectionLevel: 'Standard Durability Erasure Coding (E.C. 9+3)',
    protocols: 'NFS',
  },
];

const STATUS_COLORS: Record<VolumeStatus, keyof CoreUITheme> = {
  healthy: 'statusHealthy',
  warning: 'statusWarning',
  critical: 'statusCritical',
  unknown: 'infoPrimary',
};

// ── Layout ─────────────────────────────────────────────────────────────────────

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
  overflow: hidden;
`;

const LeftPanel = styled.div`
  width: 420px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: ${spacing.r32};
  padding: ${spacing.r16};
  background: ${getThemePropSelector('backgroundLevel2')};
  overflow-y: auto;
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${spacing.r16};
  padding: ${spacing.r16};
  background: ${getThemePropSelector('backgroundLevel1')};
  overflow: hidden;
`;

// ── Secondary nav tabs ─────────────────────────────────────────────────────────

const SecondaryNav = styled.nav`
  display: flex;
  gap: ${spacing.r4};
  flex-shrink: 0;
`;

const SecondaryNavTab = styled.a<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${spacing.r4};
  height: 32px;
  padding: 0 ${spacing.r8};
  cursor: pointer;
  border-radius: 2px;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  color: ${({ $active, theme }) =>
    $active
      ? (theme as CoreUITheme).textPrimary
      : (theme as CoreUITheme).textSecondary};
  border-bottom: 3px solid
    ${({ $active, theme }) =>
      $active ? (theme as CoreUITheme).selectedActive : 'transparent'};

  &:hover {
    background: ${({ theme }) => (theme as CoreUITheme).highlight};
  }

  i {
    font-size: 18px;
    color: ${({ $active, theme }) =>
      $active
        ? (theme as CoreUITheme).textSecondary
        : (theme as CoreUITheme).infoPrimary};
  }
`;

// ── Section title ──────────────────────────────────────────────────────────────

const SectionTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
`;

const SectionBar = styled.div`
  width: 2px;
  height: 32px;
  border-radius: 1px;
  background: ${getThemePropSelector('textPrimary')};
  flex-shrink: 0;
`;

const InfoIcon = styled.i`
  font-size: 14px;
  color: ${getThemePropSelector('infoPrimary')};
  cursor: help;
`;

const SectionTitle = ({ title }: { title: string }) => (
  <SectionTitleRow>
    <SectionBar />
    <Text variant="Large">{title}</Text>
    <InfoIcon className="fas fa-question-circle" />
  </SectionTitleRow>
);

// ── Storage service cards ──────────────────────────────────────────────────────

const StorageServiceCards = styled.div`
  display: flex;
  gap: ${spacing.r12};
  flex-wrap: wrap;
`;

const ServiceCard = styled.a<{ $status: VolumeStatus }>`
  width: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.r8};
  padding: ${spacing.r8};
  background: ${getThemePropSelector('backgroundLevel1')};
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  text-decoration: none;
  overflow: hidden;
  outline: 2px solid transparent;
  transition: outline-color 0.15s ease, background 0.15s ease;

  border-top: 3px solid
    ${({ $status, theme }) => (theme as CoreUITheme)[STATUS_COLORS[$status]]};

  &:hover {
    background: ${getThemePropSelector('highlight')};
    outline-color: ${getThemePropSelector('selectedActive')};
  }

  &:focus-visible {
    outline-color: ${getThemePropSelector('selectedActive')};
  }
`;

const ServiceIcon = styled.i<{ $status: VolumeStatus }>`
  font-size: 32px;
  color: ${({ $status, theme }) => (theme as CoreUITheme)[STATUS_COLORS[$status]]};
  margin-top: ${spacing.r4};
`;

const ServiceLabel = styled.span`
  font-size: 12px;
  color: ${getThemePropSelector('textSecondary')};
  text-align: center;
  line-height: 1.4;
  word-break: break-word;
  width: 100%;
`;

// ── Scality RINGs ──────────────────────────────────────────────────────────────

const RingsLayout = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r16};
`;

/**
 * Two stacked 3D-perspective rings (elliptical donuts).
 * ring1 = front ring (smaller %, renders on top)
 * ring2 = back ring (larger %, renders behind)
 *
 * The fill arc is drawn with an SVG path `A` command, not strokeDasharray,
 * so it follows the ellipse exactly regardless of perimeter approximation.
 */
const ScalityRings: React.FC<{
  ring1Percent: number;
  ring2Percent: number;
  color: string;
}> = ({ ring1Percent, ring2Percent, color }) => {
  const W = 175;
  const H = 135;
  const cx = 85;
  const rx = 65;
  const ry = 20;
  const sw = 12;

  const cy1 = 38;
  const cy2 = 93;

  // Point on the ellipse at a given angle in degrees
  const pt = (cy: number, deg: number) => ({
    x: cx + rx * Math.cos((deg * Math.PI) / 180),
    y: cy + ry * Math.sin((deg * Math.PI) / 180),
  });

  // Arc path starting from 12 o'clock (−90°), sweeping clockwise by percent×360°
  const arcPath = (cy: number, pct: number): string => {
    if (pct <= 0) return '';
    const sweep = Math.min(pct * 360, 359.9); // avoid degenerate full-circle
    const start = pt(cy, -90);
    const end = pt(cy, -90 + sweep);
    const largeArc = sweep > 180 ? 1 : 0;
    return [
      `M ${start.x.toFixed(3)} ${start.y.toFixed(3)}`,
      `A ${rx} ${ry} 0 ${largeArc} 1 ${end.x.toFixed(3)} ${end.y.toFixed(3)}`,
    ].join(' ');
  };

  const renderRing = (cy: number, pct: number, label: number, opacity = 1) => (
    <g opacity={opacity}>
      {/* Drop-shadow for depth */}
      <ellipse cx={cx} cy={cy + 3} rx={rx} ry={ry} fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth={sw + 4} />
      {/* Background ring body — lighter gray so it contrasts with the panel */}
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="#5a5050" strokeWidth={sw} />
      {/* Colored fill arc — exact path, no dasharray */}
      {pct > 0 && (
        <path
          d={arcPath(cy, pct)}
          fill="none"
          stroke={color}
          strokeWidth={sw}
          strokeLinecap="butt"
        />
      )}
      {/* Percent label — white on transparent hole */}
      <text
        x={cx}
        y={cy + 4}
        textAnchor="middle"
        fill="white"
        fontSize={12}
        fontFamily="Work Sans, sans-serif"
        fontWeight={600}
      >
        {label}%
      </text>
    </g>
  );

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {renderRing(cy2, ring2Percent / 100, ring2Percent, 0.85)}
      {renderRing(cy1, ring1Percent / 100, ring1Percent)}
    </svg>
  );
};

const RingStatCard = styled.a`
  display: flex;
  align-items: stretch;
  gap: ${spacing.r20};
  padding: ${spacing.r8} ${spacing.r12};
  background: ${getThemePropSelector('backgroundLevel1')};
  color: ${getThemePropSelector('textPrimary')};
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  text-decoration: none;
  outline: 2px solid transparent;
  transition: outline-color 0.15s ease, background 0.15s ease;

  &:hover {
    background: ${getThemePropSelector('highlight')};
    outline-color: ${getThemePropSelector('selectedActive')};
  }

  &:focus-visible {
    outline-color: ${getThemePropSelector('selectedActive')};
  }
`;

const RingStatDivider = styled.div`
  width: 2px;
  height: 44px;
  background: ${getThemePropSelector('border')};
  flex-shrink: 0;
`;

// ── Hardware ───────────────────────────────────────────────────────────────────

const HardwareRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
  padding: ${spacing.r2};
  background: ${getThemePropSelector('backgroundLevel2')};
`;

const HardwareLabel = styled.span`
  font-size: 14px;
  color: ${getThemePropSelector('textSecondary')};
  width: 56px;
  flex-shrink: 0;
`;

const StatusCount = styled.div<{ $variant?: 'healthy' | 'warning' | 'critical' | 'inactive' }>`
  display: flex;
  align-items: center;
  gap: ${spacing.r4};
  width: 48px;

  i {
    font-size: 14px;
    color: ${({ $variant, theme }) => {
      const t = theme as CoreUITheme;
      if ($variant === 'healthy') return t.statusHealthy;
      if ($variant === 'warning') return t.statusWarning;
      if ($variant === 'critical') return t.statusCritical;
      /* inactive (count = 0): muted neutral, visible in all themes */
      return t.border;
    }};
  }

  span {
    font-size: 14px;
    color: ${({ $variant, theme }) =>
      $variant === 'healthy'
        ? (theme as CoreUITheme).textSecondary
        : (theme as CoreUITheme).border};
  }
`;

// Server unit icon exported from Figma (64×20px) — served via .storybook/public/
const imgServerUnit = '/ring-server-unit.svg';

const Site1Hardware: React.FC = () => (
  <Stack direction="vertical" gap="r8">
    <Text variant="Smaller" color="textSecondary" style={{ textAlign: 'center' }}>
      site1
    </Text>
    <div style={{ display: 'flex', gap: 8 }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <img
          key={i}
          src={imgServerUnit}
          alt="server unit"
          width={64}
          height={20}
          style={{ display: 'block' }}
        />
      ))}
    </div>
  </Stack>
);

// ── Status cell renderer ───────────────────────────────────────────────────────

const StatusCell: React.FC<{ value: VolumeStatus }> = ({ value }) => {
  const theme = useTheme() as CoreUITheme;
  return (
    <i
      className="fas fa-circle"
      style={{ color: theme[STATUS_COLORS[value]], fontSize: 14 }}
    />
  );
};

// ── Table columns ──────────────────────────────────────────────────────────────

const volumeColumns: Column<Volume>[] = [
  {
    Header: 'Name',
    accessor: 'name',
    cellStyle: { width: 'unset', flex: 2, textAlign: 'left' },
  },
  {
    Header: 'Status',
    accessor: 'status',
    cellStyle: { width: 'unset', flex: 1, textAlign: 'left' },
    Cell: ({ value }) => <StatusCell value={value as VolumeStatus} />,
  },
  {
    Header: 'Backend RINGs',
    accessor: 'backendRings',
    cellStyle: { width: 'unset', flex: 2, textAlign: 'left' },
  },
  {
    Header: 'Data Protection Level',
    accessor: 'dataProtectionLevel',
    cellStyle: { width: 'unset', flex: 4, textAlign: 'left' },
  },
  {
    Header: 'Supported Protocols',
    accessor: 'protocols',
    cellStyle: { width: 'unset', flex: 2, textAlign: 'left' },
  },
];

// ── Navbar right ───────────────────────────────────────────────────────────────

const NavIconBtn = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 ${spacing.r8};
  height: 48px;
  color: ${getThemePropSelector('textSecondary')};
  font-size: 14px;

  &:hover {
    background: ${getThemePropSelector('highlight')};
  }
`;

// ── Main component ─────────────────────────────────────────────────────────────

const RingVolumesList = () => {
  const theme = useTheme() as CoreUITheme;
  const [healthFilter, setHealthFilter] = useState('all');
  const [selectedVolume, setSelectedVolume] = useState<string | null>(null);

  return (
    <PageWrapper>
      {/* ── Top navbar ── */}
      <Navbar
        tabs={[
          { title: 'Overview', selected: true },
          { title: 'Monitoring' },
          { title: 'RING Operations' },
          { title: 'Identity' },
          { title: 'S3 Service' },
        ]}
        rightActions={[
          {
            type: 'custom',
            render: () => (
              <NavIconBtn aria-label="User settings">
                <i className="fas fa-user-cog" />
              </NavIconBtn>
            ),
          },
          {
            type: 'dropdown',
            text: 'Robin Diemer',
            items: [
              { label: 'My account', onClick: () => {} },
              { label: 'Sign out', onClick: () => {} },
            ],
          },
        ]}
      />

      <ContentArea>
        {/* ── Left panel ── */}
        <LeftPanel>
          {/* Secondary nav */}
          <SecondaryNav aria-label="RING navigation">
            <SecondaryNavTab $active href="#">
              <i className="fas fa-database" />
              VOLUMES
            </SecondaryNavTab>
            <SecondaryNavTab href="#">
              <i className="fas fa-network-wired" />
              SERVERS
            </SecondaryNavTab>
            <SecondaryNavTab href="#">
              <i className="fas fa-server" />
              DISKS
            </SecondaryNavTab>
            <SecondaryNavTab href="#">
              <i className="fas fa-globe-americas" />
              ZONES
            </SecondaryNavTab>
          </SecondaryNav>

          {/* Storage Services */}
          <Stack direction="vertical" gap="r16">
            <SectionTitle title="Storage Services" />
            <StorageServiceCards>
              <ServiceCard $status="critical" href="#" title="s3.scality.com">
                <ServiceIcon className="fas fa-cloud" $status="critical" />
                <ServiceLabel>s3.scality.com</ServiceLabel>
              </ServiceCard>
              <ServiceCard $status="unknown" href="#" title="ReallyDoNotTouch">
                <ServiceIcon className="fas fa-hdd" $status="unknown" />
                <ServiceLabel>ReallyDoNotTouch</ServiceLabel>
              </ServiceCard>
              <ServiceCard $status="healthy" href="#" title="volume1">
                <ServiceIcon className="fas fa-hdd" $status="healthy" />
                <ServiceLabel>volume1</ServiceLabel>
              </ServiceCard>
              <ServiceCard $status="healthy" href="#" title="VolumeDLM">
                <ServiceIcon className="fas fa-hdd" $status="healthy" />
                <ServiceLabel>VolumeDLM</ServiceLabel>
              </ServiceCard>
            </StorageServiceCards>
          </Stack>

          {/* Scality RINGs */}
          <Stack direction="vertical" gap="r8">
            <SectionTitle title="The Scality RINGs" />
            <RingsLayout>
              {/* Two stacked 3D elliptical rings */}
              <ScalityRings
                ring1Percent={9}
                ring2Percent={30}
                color={theme.statusHealthy}
              />

              {/* Ring stats */}
              <Stack direction="vertical" gap="r12">
                <RingStatCard href="#">
                  <RingStatDivider />
                  {/* Left col — TOTAL label on top, value on bottom */}
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Text variant="Smaller" color="textSecondary">TOTAL</Text>
                    <Stack gap="r4" style={{ alignItems: 'baseline' }}>
                      <Text variant="Larger">126</Text>
                      <Text variant="Smaller" color="textSecondary">GB</Text>
                    </Stack>
                  </div>
                  {/* Right col — META label on top, status on bottom */}
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Text variant="Large">META</Text>
                    <Text variant="Basic" color="statusHealthy">OK</Text>
                  </div>
                </RingStatCard>

                <RingStatCard href="#">
                  <RingStatDivider />
                  {/* Left col */}
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Text variant="Smaller" color="textSecondary">TOTAL</Text>
                    <Stack gap="r4" style={{ alignItems: 'baseline' }}>
                      <Text variant="Larger">3.8</Text>
                      <Text variant="Smaller" color="textSecondary">PB</Text>
                    </Stack>
                  </div>
                  {/* Right col */}
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Text variant="Large">DATA</Text>
                    <Text variant="Basic" color="statusHealthy">OK</Text>
                  </div>
                </RingStatCard>
              </Stack>
            </RingsLayout>
          </Stack>

          {/* Hardware */}
          <Stack direction="vertical" gap="r8">
            <SectionTitle title="Hardware" />
            <Stack direction="vertical" gap="r8" style={{ paddingLeft: spacing.r32 }}>
              <HardwareRow>
                <HardwareLabel>Servers</HardwareLabel>
                <StatusCount $variant="healthy">
                  <i className="fas fa-check-circle" />
                  <span>12</span>
                </StatusCount>
                <StatusCount $variant="inactive">
                  <i className="fas fa-exclamation-triangle" />
                  <span>0</span>
                </StatusCount>
                <StatusCount $variant="inactive">
                  <i className="fas fa-times-circle" />
                  <span>0</span>
                </StatusCount>
                <i
                  className="fas fa-list-ul"
                  style={{
                    fontSize: 14,
                    color: theme.textSecondary,
                    cursor: 'pointer',
                    marginLeft: spacing.r8,
                  }}
                />
              </HardwareRow>

              <HardwareRow>
                <HardwareLabel>Disks</HardwareLabel>
                <StatusCount $variant="healthy">
                  <i className="fas fa-check-circle" />
                  <span>96</span>
                </StatusCount>
                <StatusCount $variant="inactive">
                  <i className="fas fa-exclamation-triangle" />
                  <span>0</span>
                </StatusCount>
                <StatusCount $variant="inactive">
                  <i className="fas fa-times-circle" />
                  <span>0</span>
                </StatusCount>
                <i
                  className="fas fa-list-ul"
                  style={{
                    fontSize: 14,
                    color: theme.textSecondary,
                    cursor: 'pointer',
                    marginLeft: spacing.r8,
                  }}
                />
              </HardwareRow>
            </Stack>

            {/* Site hardware */}
            <Site1Hardware />
          </Stack>
        </LeftPanel>

        {/* ── Right panel ── */}
        <RightPanel>
          {/* Breadcrumb */}
          <Text variant="Larger">VOLUMES</Text>

          {/* Volumes table with built-in search */}
          <div style={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
            <BrowserRouter>
              <Table
                columns={volumeColumns}
                data={VOLUMES}
                defaultSortingKey="name"
                getRowId={(row) => row.name}
                entityName={{ en: { singular: 'volume', plural: 'volumes' } }}
              >
                <Stack gap="r8" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.r8 }}>
                  <Stack gap="r8" style={{ alignItems: 'center' }}>
                    <Table.SearchWithQueryParams />
                    <HealthSelector
                      id="volumes-health-filter"
                      value={healthFilter}
                      onChange={setHealthFilter}
                      size="2/3"
                    />
                  </Stack>
                  <Button
                    variant="primary"
                    label="Create File Share"
                    icon={<i className="fas fa-plus" />}
                    onClick={() => {}}
                  />
                </Stack>
                <Table.SingleSelectableContent
                  rowHeight="h40"
                  separationLineVariant="backgroundLevel3"
                  selectedId={selectedVolume ?? undefined}
                  onRowSelected={(row) =>
                    setSelectedVolume(row.original.name)
                  }
                />
              </Table>
            </BrowserRouter>
          </div>
        </RightPanel>
      </ContentArea>
    </PageWrapper>
  );
};

// ── Storybook meta ─────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Templates/RING Volumes List',
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
      <RingVolumesList />
    </CoreUiThemeProvider>
  ),
};
