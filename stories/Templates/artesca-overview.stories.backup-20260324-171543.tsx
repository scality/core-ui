import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import styled, { useTheme } from 'styled-components';
import { Navbar } from '../../src/lib/components/navbar/Navbar.component';
import { ScrollbarWrapper } from '../../src/lib/components/scrollbarwrapper/ScrollbarWrapper.component';
import { Stack, spacing } from '../../src/lib/spacing';
import { Text } from '../../src/lib/components/text/Text.component';
import { TextBadge } from '../../src/lib/components/textbadge/TextBadge.component';
import { Button } from '../../src/lib/components/buttonv2/Buttonv2.component';
import {
  LineTimeSerieChart,
  ChartLegendWrapper,
  ChartLegend,
  GlobalHealthBar,
  Alert,
} from '../../src/lib/components/charts';
import { CoreUITheme } from '../../src/lib/style/theme';
import { getThemePropSelector } from '../../src/lib/utils';

// ─── Layout ───────────────────────────────────────────────────────────────────

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background:
    radial-gradient(ellipse 80% 60% at 100% 100%, rgba(51, 51, 102, 0.45) 0%, transparent 70%),
    radial-gradient(ellipse 60% 50% at 0% 0%, rgba(0, 0, 0, 0.7) 0%, transparent 65%),
    ${getThemePropSelector('backgroundLevel1')};
  color: ${getThemePropSelector('textPrimary')};
  overflow: hidden;
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${spacing.r8};
  padding: ${spacing.r8} ${spacing.r16} 0;
  overflow-y: auto;
  min-height: 0;
`;

const OverviewRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`;

const ActionBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r16};
`;

const DateRangePicker = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
  cursor: pointer;
  color: ${getThemePropSelector('textPrimary')};
  font-size: 14px;
  font-family: 'Lato', sans-serif;
`;

// ─── KPI Banner ───────────────────────────────────────────────────────────────

const KpiBanner = styled.div`
  display: flex;
  align-items: center;
  background: ${getThemePropSelector('backgroundLevel3')};
  border: 1px solid rgba(169, 169, 169, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07);
  border-radius: 8px 8px 0 0;
  flex-shrink: 0;
  overflow: hidden;
`;

const KpiBlock = styled.div`
  padding: ${spacing.r12};
  flex-shrink: 0;
  align-self: stretch;
  display: flex;
  align-items: center;
`;

const KpiCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.r8};
  justify-content: center;
  padding: ${spacing.r12} ${spacing.r16};
  background: ${getThemePropSelector('backgroundLevel4')};
  border-radius: 8px;
  white-space: nowrap;
`;

const KpiMetrics = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r24};
  flex: 1;
  min-width: 0;
  padding: 0 ${spacing.r16};
`;

const MetricCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-shrink: 0;
`;

const KpiSeparator = styled.div`
  width: 1px;
  align-self: stretch;
  background: ${getThemePropSelector('backgroundLevel1')};
  flex-shrink: 0;
  margin: ${spacing.r12} 0;
`;

const ProtectionBadge = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
  height: 24px;
  padding: 2px 8px;
  background: #333366;
  border-radius: 4px;
  white-space: nowrap;
  font-size: 14px;
  color: #eaeaea;
  font-family: 'Lato', sans-serif;
`;

// ─── Storage donut ────────────────────────────────────────────────────────────

const StorageDonut: React.FC<{ usedPercent: number }> = ({ usedPercent }) => {
  const r = 22;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * r;
  const usedDash = (usedPercent / 100) * circumference;
  return (
    <svg width={56} height={56} viewBox="0 0 56 56" style={{ flexShrink: 0 }}>
      <circle cx={28} cy={28} r={r} fill="none" stroke="#2a2a3a" strokeWidth={strokeWidth} />
      <circle
        cx={28} cy={28} r={r} fill="none" stroke="#0aada6"
        strokeWidth={strokeWidth}
        strokeDasharray={`${usedDash} ${circumference - usedDash}`}
        transform="rotate(-90 28 28)"
      />
      <text x={28} y={32} textAnchor="middle" fill="#eaeaea" fontSize={12} fontFamily="Lato">
        {usedPercent}%
      </text>
    </svg>
  );
};

// ─── Panels ───────────────────────────────────────────────────────────────────

const PanelRow = styled.div`
  display: flex;
  gap: 2px;
  min-width: 0;
`;

const Panel = styled.div`
  background: ${getThemePropSelector('backgroundLevel3')};
  border: 1px solid rgba(169, 169, 169, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

// ~55% of row width — mirrors the 760px fixed panel in the Figma at 1440px
const PanelDominant = styled(Panel)`
  flex: 0 0 55%;
  min-width: 0;
`;

// ~45% — takes the remaining space
const PanelSecondary = styled(Panel)`
  flex: 1;
  min-width: 0;
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  padding: ${spacing.r12} ${spacing.r16} ${spacing.r16};
  flex-shrink: 0;
`;

// ─── Chart panel ──────────────────────────────────────────────────────────────

const ChartPanelBody = styled.div`
  padding: ${spacing.r8} ${spacing.r16} ${spacing.r16};
  display: flex;
  flex-direction: column;
  gap: ${spacing.r8};
  overflow: hidden;
  .recharts-xAxis .recharts-cartesian-axis-line,
  .recharts-yAxis .recharts-cartesian-axis-line {
    stroke: none;
  }
  .recharts-cartesian-grid-vertical line:first-child,
  .recharts-cartesian-grid-horizontal line:first-child {
    stroke: none;
  }
`;


// ─── Endpoints panel ──────────────────────────────────────────────────────────

const EndpointsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0 ${spacing.r16} ${spacing.r8};
  overflow: hidden;
`;

const EndpointItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
  padding: ${spacing.r8} ${spacing.r12};
  background: ${getThemePropSelector('backgroundLevel4')};
  border-radius: 4px;
  overflow: hidden;
  min-width: 0;
`;

// ─── Alerts panel ─────────────────────────────────────────────────────────────

const AlertDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${getThemePropSelector('statusWarning')};
  flex-shrink: 0;
`;

const AlertItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
  height: 40px;
  padding: 0 ${spacing.r16};
  border-bottom: 1px solid ${getThemePropSelector('backgroundLevel1')};
  overflow: hidden;
  min-width: 0;
`;

// ─── Platform Status panel ────────────────────────────────────────────────────

const PlatformBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.r12};
  padding: 0 ${spacing.r16} ${spacing.r16};
`;

const HealthBarWrapper = styled.div`
  background: ${getThemePropSelector('backgroundLevel4')};
  border-radius: 6px;
  padding: ${spacing.r8} ${spacing.r12};
  overflow: hidden;
`;

const EntityCard = styled.div<{ highlight?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
  padding: ${spacing.r8};
  border-radius: 4px;
  ${({ highlight }) => highlight ? 'background: rgba(248, 243, 43, 0.2);' : ''}
`;

const EntityIconBox = styled.div<{ color: string }>`
  width: 24px;
  height: 24px;
  border-radius: 3.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ color }) => color};
  flex-shrink: 0;
`;

const TooltipCue = () => (
  <i className="fas fa-question-circle" style={{ fontSize: 14, color: '#595a78' }} />
);

const FaIcon = styled.i<{ color?: string; size?: number }>`
  font-size: ${({ size }) => size ?? 14}px;
  color: ${({ color }) => color ?? '#eaeaea'};
`;

// ─── S3 icon ──────────────────────────────────────────────────────────────────

const S3Icon = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <circle cx={12} cy={12} r={10} stroke="#0aada6" strokeWidth={1.5} />
    <ellipse cx={12} cy={12} rx={4} ry={10} stroke="#0aada6" strokeWidth={1} />
    <line x1={2} y1={12} x2={22} y2={12} stroke="#0aada6" strokeWidth={1} />
  </svg>
);

// ─── Mock data ────────────────────────────────────────────────────────────────

const now = Date.now();
const DAY = 24 * 60 * 60 * 1000;
const DAY_S = 24 * 60 * 60; // seconds
const SIX_MONTHS = 180; // days

const netStorageSeries = [
  {
    resource: 'Net storage',
    getTooltipLabel: (_prefix?: string, resource?: string) => resource ?? '',
    data: Array.from({ length: SIX_MONTHS }, (_, i) => [
      Math.floor(now / 1000) - (SIX_MONTHS - 1 - i) * DAY_S,
      // gradual growth from ~45 TiB to ~72 TiB with realistic noise
      45 + (i / SIX_MONTHS) * 27 + Math.sin(i * 0.3) * 1.5 + Math.sin(i * 0.07) * 3,
    ] as [number, number]),
  },
];

const HEALTH_START = new Date(now - 7 * DAY);
const healthAlerts: Alert[] = [
  {
    id: 'a1',
    severity: 'warning',
    startsAt: new Date(now - 5.5 * DAY).toISOString(),
    endsAt: new Date(now - 4.8 * DAY).toISOString(),
    description: 'Platform degraded',
  },
  {
    id: 'a2',
    severity: 'warning',
    startsAt: new Date(now - 3.2 * DAY).toISOString(),
    endsAt: new Date(now - 3 * DAY).toISOString(),
    description: 'Observability services degraded',
  },
  {
    id: 'a3',
    severity: 'warning',
    startsAt: new Date(now - 1.5 * DAY).toISOString(),
    endsAt: new Date(now - 1.2 * DAY).toISOString(),
    description: 'Volume at risk',
  },
];

const endpoints = ['s3.pod-choco.local', 's3.jm.com', 's3.zy.local'];

const alertItems = [
  { text: 'The Platform is degraded', time: 'a moment ago' },
  { text: 'The observability services are degraded', time: '3 min ago' },
  { text: 'Service app.kubernetes.io/name=loki is degraded', time: '10 min ago' },
  { text: 'The volume logging-vol-1 on node prod-main-node-1 is at risk', time: '11 min ago' },
];

// ─── Story component ──────────────────────────────────────────────────────────

const ArtescaOverview = () => {
  const theme = useTheme() as CoreUITheme;

  return (
    <PageWrapper>
      <Navbar
        tabs={[
          { title: 'Overview', selected: true },
          { title: 'Identity' },
          { title: 'Platform' },
          { title: 'Storage Services' },
          { title: 'Data Services' },
          {
            render: (
              <Stack gap="r4" style={{ alignItems: 'center' }}>
                <span>Alerts</span>
                <TextBadge text="4" variant="statusWarning" />
              </Stack>
            ),
          },
        ]}
        rightActions={[
          {
            type: 'dropdown',
            icon: <i className="fas fa-user-cog" style={{ fontSize: 14 }} />,
            text: 'Sid Heller',
            items: [
              { label: 'My account', onClick: () => {} },
              { label: 'Sign out', onClick: () => {} },
            ],
          },
        ]}
      />

      <ContentArea>
        {/* ── Overview title + actions ── */}
        <OverviewRow>
          <Text variant="Larger" isEmphazed>Overview</Text>
          <ActionBar>
            <DateRangePicker>
              <i className="fas fa-calendar-week" />
              <Text isEmphazed>Last 24 hours</Text>
              <i className="fas fa-caret-down" />
            </DateRangePicker>
            <Button
              variant="primary"
              label="Add Connectors"
              icon={<i className="fas fa-plus" />}
            />
          </ActionBar>
        </OverviewRow>

        <ScrollbarWrapper>
          <Stack direction="vertical" gap="r2" style={{ flex: 1, minHeight: 0, height: '100%' }}>

            {/* ── KPI banner ── */}
            <KpiBanner>
              <KpiBlock>
                <KpiCard>
                  <Stack gap="r4" style={{ alignItems: 'center' }}>
                    <Text variant="Basic">Protected Data</Text>
                    <TooltipCue />
                  </Stack>
                  <Stack gap="r8" style={{ alignItems: 'baseline' }}>
                    <Text style={{ fontSize: 20, fontWeight: 700, lineHeight: '28px' }}>52 TiB</Text>
                    <Text variant="Basic" color="textSecondary">+5 TiB /month</Text>
                  </Stack>
                </KpiCard>
              </KpiBlock>

              <KpiSeparator />

              <KpiMetrics>
                <Stack gap="r16" style={{ alignItems: 'center', flexShrink: 0 }}>
                  <StorageDonut usedPercent={51} />
                  <MetricCard>
                    <Text variant="Basic" color="textSecondary">Net Storage</Text>
                    <Stack gap="r0" style={{ alignItems: 'baseline' }}>
                      <Text variant="Basic">72.14 TiB</Text>
                      <Text variant="Basic" color="textSecondary">/140 TiB</Text>
                    </Stack>
                  </MetricCard>
                </Stack>

                <KpiSeparator />

                <MetricCard>
                  <Text variant="Basic" color="textSecondary">Objects</Text>
                  <Text variant="Basic">720 M</Text>
                </MetricCard>

                <KpiSeparator />

                <MetricCard>
                  <Text variant="Basic" color="textSecondary">Protection</Text>
                  <ProtectionBadge>
                    <i className="fas fa-shield-alt" style={{ fontSize: 14 }} />
                    Protected
                  </ProtectionBadge>
                </MetricCard>
              </KpiMetrics>
            </KpiBanner>

            {/* ── Middle row: chart (dominant left) + endpoints (secondary right) ── */}
            <PanelRow>
              <PanelDominant>
                <ChartPanelBody>
                  <Text variant="Large" isEmphazed>Net Storage (TiB)</Text>
                  <ChartLegendWrapper
                    colorSet={{ 'Net storage': '#8b5cf6' }}
                  >
                    <LineTimeSerieChart
                      title=""
                      series={netStorageSeries}
                      height={180}
                      startingTimeStamp={Math.floor(now / 1000) - (SIX_MONTHS - 1) * DAY_S}
                      duration={(SIX_MONTHS - 1) * DAY_S}
                      interval={DAY_S}
                      isLoading={false}
                    />
                    <ChartLegend shape="line" direction="horizontal" />
                  </ChartLegendWrapper>
                </ChartPanelBody>
              </PanelDominant>

              <PanelSecondary>
                <PanelHeader>
                  <Stack gap="r8" style={{ alignItems: 'center', flex: 1, minWidth: 0 }}>
                    <TextBadge text="3" variant="infoPrimary" />
                    <Text variant="Large" isEmphazed>Endpoints</Text>
                  </Stack>
                  <Button
                    variant="outline"
                    label="Configure"
                    icon={<i className="fas fa-cog" />}
                  />
                </PanelHeader>
                <EndpointsList>
                  {endpoints.map((ep) => (
                    <EndpointItem key={ep}>
                      <S3Icon />
                      <Text
                        variant="Basic"
                        style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0 }}
                      >
                        {ep}
                      </Text>
                    </EndpointItem>
                  ))}
                </EndpointsList>
              </PanelSecondary>
            </PanelRow>

            {/* ── Bottom row: alerts (secondary left) + platform status (dominant right) ── */}
            <PanelRow style={{ flex: 1, minHeight: 0 }}>
              <PanelSecondary>
                <PanelHeader>
                  <Text variant="Large" isEmphazed style={{ flex: 1 }}>Alerts</Text>
                  <Stack gap="r16" style={{ alignItems: 'center' }}>
                    <Stack gap="r8" style={{ alignItems: 'center' }}>
                      <Text variant="Smaller" color="textSecondary" style={{ textTransform: 'uppercase' }}>
                        Warning
                      </Text>
                      <TextBadge text="4" variant="statusWarning" />
                    </Stack>
                    <Stack gap="r8" style={{ alignItems: 'center' }}>
                      <Text variant="Smaller" color="textSecondary">CRITICAL</Text>
                      <TextBadge text="0" variant="statusCritical" style={{ opacity: 0.4 }} />
                    </Stack>
                  </Stack>
                </PanelHeader>
                {alertItems.map((item, i) => (
                  <AlertItem key={i}>
                    <AlertDot />
                    <Text
                      variant="Basic"
                      style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0 }}
                    >
                      {item.text}
                    </Text>
                    <Text variant="Smaller" color="textSecondary" style={{ flexShrink: 0, paddingLeft: spacing.r8 }}>
                      {item.time}
                    </Text>
                  </AlertItem>
                ))}
              </PanelSecondary>

              <PanelDominant>
                <PanelHeader>
                  <Text variant="Large" isEmphazed>Platform Status</Text>
                </PanelHeader>
                <PlatformBody>
                  <Stack direction="vertical" gap="r8">
                    <Stack gap="r8" style={{ alignItems: 'center' }}>
                      <FaIcon className="fas fa-exclamation-circle" color={theme.statusWarning} size={16} />
                      <Text variant="Basic">Platform Health</Text>
                      <TooltipCue />
                    </Stack>
                    <HealthBarWrapper>
                      <GlobalHealthBar
                        id="platform-health"
                        start={HEALTH_START}
                        end={new Date(now)}
                        alerts={healthAlerts}
                      />
                    </HealthBarWrapper>
                  </Stack>

                  <Stack gap="r0" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
                    <EntityCard highlight>
                      <EntityIconBox color={theme.statusWarning}>
                        <i className="fas fa-hdd" style={{ fontSize: 14, color: '#121219' }} />
                      </EntityIconBox>
                      <Stack gap="r4" style={{ alignItems: 'baseline' }}>
                        <Text style={{ fontSize: 18, fontFamily: 'Lato' }}>12</Text>
                        <Text variant="Basic" style={{ textDecoration: 'underline' }}>volumes</Text>
                      </Stack>
                    </EntityCard>

                    <EntityCard>
                      <FaIcon className="fas fa-server" color={theme.statusHealthy} size={16} />
                      <Stack gap="r4" style={{ alignItems: 'baseline' }}>
                        <Text style={{ fontSize: 18, fontFamily: 'Lato' }}>01</Text>
                        <Text variant="Basic">node</Text>
                      </Stack>
                    </EntityCard>

                    <EntityCard>
                      <FaIcon className="fas fa-project-diagram" color={theme.statusHealthy} size={14} />
                      <Text variant="Basic">Network</Text>
                    </EntityCard>
                  </Stack>
                </PlatformBody>
              </PanelDominant>
            </PanelRow>

          </Stack>
        </ScrollbarWrapper>
      </ContentArea>
    </PageWrapper>
  );
};

// ─── Storybook meta ───────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Templates/ARTESCA Overview',
  parameters: {
    layout: 'fullscreen',
    fullPage: true,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <ArtescaOverview />,
};
