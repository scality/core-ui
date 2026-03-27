import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import styled, { useTheme } from 'styled-components';
import {
  ComposedChart,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { Navbar } from '../../src/lib/components/navbar/Navbar.component';
import { ScrollbarWrapper } from '../../src/lib/components/scrollbarwrapper/ScrollbarWrapper.component';
import { Stack, spacing } from '../../src/lib/spacing';
import { Text } from '../../src/lib/components/text/Text.component';
import { TextBadge } from '../../src/lib/components/textbadge/TextBadge.component';
import { Button } from '../../src/lib/components/buttonv2/Buttonv2.component';
import {
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
  padding: ${spacing.r8} ${spacing.r16};
  overflow: hidden;
  min-height: 0;
`;

const PanelsArea = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  gap: ${spacing.r8};
  overflow: hidden;
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
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.07),
    0 0 40px rgba(139, 92, 246, 0.12);
  border-radius: 8px 8px 0 0;
  flex-shrink: 0;
  overflow: hidden;
  padding: ${spacing.r8};
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
  background: ${getThemePropSelector('infoSecondary')};
  border-radius: 4px;
  white-space: nowrap;
  font-size: 14px;
  color: #eaeaea;
  font-family: 'Lato', sans-serif;
`;

// ─── Storage donut ────────────────────────────────────────────────────────────

const StorageDonut: React.FC<{ usedPercent: number }> = ({ usedPercent }) => {
  const theme = useTheme() as CoreUITheme;
  const r = 27;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * r;
  const usedDash = (usedPercent / 100) * circumference;
  return (
    <svg width={70} height={70} viewBox="0 0 70 70" style={{ flexShrink: 0 }}>
      <circle cx={35} cy={35} r={r} fill="none" stroke={theme.backgroundLevel1} strokeWidth={strokeWidth} />
      <circle
        cx={35} cy={35} r={r} fill="none" stroke="#8b5cf6"
        strokeWidth={strokeWidth}
        strokeDasharray={`${usedDash} ${circumference - usedDash}`}
        transform="rotate(-90 35 35)"
      />
      <text x={35} y={39} textAnchor="middle" fill="#eaeaea" fontSize={11} fontFamily="Lato">
        {usedPercent.toFixed(1)}%
      </text>
    </svg>
  );
};

// ─── Panels ───────────────────────────────────────────────────────────────────

const PanelRow = styled.div`
  display: flex;
  gap: 2px;
  min-width: 0;
  background: ${getThemePropSelector('backgroundLevel1')};
`;

const Panel = styled.div`
  background: ${getThemePropSelector('backgroundLevel3')};
  border: 1px solid rgba(169, 169, 169, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: ${spacing.r8};
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

const AlertsFadeOuter = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
  overflow: hidden;
`;

const AlertsFadeWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const AlertsFadeGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: linear-gradient(to bottom, transparent, ${getThemePropSelector('backgroundLevel3')});
  pointer-events: none;
  z-index: 1;
`;

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
  gap: ${spacing.r20};
  padding: 0 ${spacing.r16} ${spacing.r16};
`;

const HealthBarWrapper = styled.div`
  background: ${getThemePropSelector('backgroundLevel4')};
  border-radius: 6px;
  padding: ${spacing.r8} ${spacing.r12};
  overflow: hidden;
  .recharts-bar-rectangle path {
    stroke: transparent;
    stroke-width: ${spacing.r28};
    transition: filter 0.15s ease;
  }
  .recharts-layer.recharts-bar:not(:first-child) .recharts-bar-rectangle:hover path {
    filter: brightness(1.5) drop-shadow(0 0 ${spacing.r4} currentColor);
  }
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

// Monthly tick timestamps — 1st of each month for the past 6 months
const monthlyTicks = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(now);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  d.setMonth(d.getMonth() - 6 + i);
  return Math.floor(d.getTime() / 1000);
});

const netStorageData = Array.from({ length: SIX_MONTHS }, (_, i) => ({
  t: Math.floor(now / 1000) - (SIX_MONTHS - 1 - i) * DAY_S,
  v: 45 + (i / SIX_MONTHS) * 27 + Math.sin(i * 0.3) * 1.5 + Math.sin(i * 0.07) * 3,
  cap: 140.27,
}));

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
  { text: 'Node prod-worker-node-3 is unreachable', time: '18 min ago' },
  { text: 'S3 bucket replication lag exceeds threshold', time: '24 min ago' },
  { text: 'Certificate expiry in 7 days for s3.pod-choco.local', time: '1 hour ago' },
];

// ─── Veeam connector mock data ────────────────────────────────────────────────

const veeamJobsData = [
  { day: 'Mon', success: 14, inProgress: 0, warning: 1, errors: 0 },
  { day: 'Tue', success: 12, inProgress: 0, warning: 0, errors: 1 },
  { day: 'Wed', success: 15, inProgress: 1, warning: 0, errors: 0 },
  { day: 'Thu', success: 11, inProgress: 0, warning: 2, errors: 0 },
  { day: 'Fri', success: 13, inProgress: 2, warning: 0, errors: 0 },
  { day: 'Sat', success: 10, inProgress: 0, warning: 0, errors: 0 },
  { day: 'Sun', success: 9,  inProgress: 0, warning: 1, errors: 1 },
];

// ─── Veeam connector panel styled components ──────────────────────────────────

const ConnectorPanelContainer = styled.div`
  width: 420px;
  flex-shrink: 0;
  background: ${getThemePropSelector('backgroundLevel3')};
  border: 1px solid rgba(169, 169, 169, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07);
  border-radius: 8px 8px 0 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ConnectorHeader = styled.div`
  padding: ${spacing.r16};
  border-bottom: 1px solid ${getThemePropSelector('backgroundLevel1')};
  display: flex;
  flex-direction: column;
  gap: ${spacing.r4};
`;

const ConnectorKpiGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid ${getThemePropSelector('backgroundLevel1')};
  flex-shrink: 0;
`;

const ConnectorKpiCell = styled.div`
  padding: ${spacing.r12} ${spacing.r16};
  display: flex;
  flex-direction: column;
  gap: ${spacing.r4};
`;

const ConnectorChartSection = styled.div`
  flex: 1;
  padding: ${spacing.r12} ${spacing.r16};
  display: flex;
  flex-direction: column;
  gap: ${spacing.r8};
  min-height: 0;
`;

const ConnectorFooter = styled.div`
  padding: ${spacing.r12} ${spacing.r16};
  border-top: 1px solid ${getThemePropSelector('backgroundLevel1')};
  display: flex;
  flex-direction: column;
  gap: ${spacing.r8};
  flex-shrink: 0;
`;

const VeeamLogoMark = styled.div`
  width: 20px;
  height: 20px;
  background: #00b336;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

// ─── Veeam connector panel component ─────────────────────────────────────────

const VeeamPanel = () => {
  const theme = useTheme() as CoreUITheme;
  return (
    <ConnectorPanelContainer>
      <ConnectorHeader>
        <Stack gap="r12" style={{ alignItems: 'center' }}>
          <VeeamLogoMark>
            <i className="fas fa-shield-alt" style={{ fontSize: 10, color: 'white' }} />
          </VeeamLogoMark>
          <Text variant="Large" isEmphazed>Veeam</Text>
          <Text variant="Large" color="textSecondary">Backup & Replication</Text>
        </Stack>
      </ConnectorHeader>

      <ConnectorKpiGrid>
        <ConnectorKpiCell>
          <Text variant="Basic" color="textSecondary">Source VMs</Text>
          <Text style={{ fontSize: 32, fontWeight: 700, lineHeight: 1, fontFamily: 'Lato' }}>2</Text>
        </ConnectorKpiCell>
        <ConnectorKpiCell>
          <Text variant="Basic" color="textSecondary">Protected Data</Text>
          <Text style={{ fontSize: 20, fontWeight: 700, lineHeight: '28px', fontFamily: 'Lato' }}>323.1 GiB</Text>
        </ConnectorKpiCell>
        <ConnectorKpiCell style={{ gridColumn: '1 / -1' }}>
          <Text variant="Basic" color="textSecondary">Stored Backup Repository Usage</Text>
          <Text style={{ fontSize: 20, fontWeight: 700, lineHeight: '28px', fontFamily: 'Lato' }}>57.8 GiB</Text>
        </ConnectorKpiCell>
      </ConnectorKpiGrid>

      <ConnectorChartSection>
        <Text variant="Basic" isEmphazed>Backup Jobs</Text>
        <ResponsiveContainer width="100%" height={150}>
          <ComposedChart data={veeamJobsData} margin={{ top: 4, right: 0, bottom: 0, left: -20 }} barSize={10} barCategoryGap="40%">
            <CartesianGrid vertical={false} syncWithTicks stroke={theme.border} strokeOpacity={0.4} />
            <XAxis dataKey="day" tick={{ fill: theme.textSecondary, fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 16]} ticks={[0, 4, 8, 12, 16]} interval={0} tick={{ fill: theme.textSecondary, fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: theme.backgroundLevel2, border: `1px solid ${theme.border}`, borderRadius: 4, fontSize: 12, color: theme.textPrimary }}
              cursor={{ fill: 'rgba(255,255,255,0.04)' }}
            />
            <Bar dataKey="success"    stackId="jobs" fill={theme.statusHealthy}  isAnimationActive={false} />
            <Bar dataKey="inProgress" stackId="jobs" fill={theme.infoPrimary}    isAnimationActive={false} />
            <Bar dataKey="warning"    stackId="jobs" fill={theme.statusWarning}  isAnimationActive={false} />
            <Bar dataKey="errors"     stackId="jobs" fill={theme.statusCritical} isAnimationActive={false} />
          </ComposedChart>
        </ResponsiveContainer>
        <Stack gap="r16" style={{ flexWrap: 'wrap' }}>
          {([
            { color: theme.statusHealthy, label: 'Success' },
            { color: theme.infoPrimary,   label: 'In progress' },
            { color: theme.statusWarning, label: 'Warning' },
            { color: theme.statusCritical, label: 'Errors' },
          ] as { color: string; label: string }[]).map(({ color, label }) => (
            <Stack key={label} gap="r4" style={{ alignItems: 'center' }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: color, flexShrink: 0 }} />
              <Text variant="Smaller" color="textSecondary">{label}</Text>
            </Stack>
          ))}
        </Stack>
      </ConnectorChartSection>

      <ConnectorFooter>
        <Text variant="Smaller" color="textSecondary">Version 13.0.0.4967</Text>
        <Stack gap="r8">
          <Button variant="outline" label="Veeam Host Manager" icon={<i className="fas fa-share-square" />} style={{ flex: 1 }} />
          <Button variant="outline" label="Veeam Dashboard"    icon={<i className="fas fa-share-square" />} style={{ flex: 1 }} />
        </Stack>
      </ConnectorFooter>
    </ConnectorPanelContainer>
  );
};

// ─── Empty state ──────────────────────────────────────────────────────────────

const EmptyAlerts = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${spacing.r8};
  color: ${getThemePropSelector('textSecondary')};
`;

// ─── Story component ──────────────────────────────────────────────────────────

type ArtescaOverviewProps = {
  alerts?: typeof alertItems;
  healthAlertData?: typeof healthAlerts;
  connectorPanel?: React.ReactNode;
};

const ArtescaOverview = ({ alerts = alertItems, healthAlertData = healthAlerts, connectorPanel }: ArtescaOverviewProps) => {
  const theme = useTheme() as CoreUITheme;
  const [alertsHasMore, setAlertsHasMore] = React.useState(true);
  const handleAlertsScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    setAlertsHasMore(scrollTop + clientHeight < scrollHeight - 2);
  };

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
                {alerts.length > 0 && <TextBadge text={String(alerts.length)} variant="statusWarning" />}
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
            <Button
              variant="primary"
              label="Add Connectors"
              icon={<i className="fas fa-plus" />}
            />
          </ActionBar>
        </OverviewRow>

        <PanelsArea>
        <ScrollbarWrapper style={{ flex: 1, minWidth: 0 }}>
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
                    <Text style={{ fontSize: 20, fontWeight: 700, lineHeight: '28px' }}>52.26 TiB</Text>
                    <Text variant="Basic" color="textSecondary">+5.43 TiB /month</Text>
                  </Stack>
                </KpiCard>
              </KpiBlock>

              <KpiSeparator />

              <KpiMetrics>
                <Stack gap="r16" style={{ alignItems: 'center', flexShrink: 0 }}>
                  <StorageDonut usedPercent={51} />
                  <MetricCard>
                    <Text variant="Basic" color="textSecondary">Net Capacity</Text>
                    <Text variant="Basic">
                      72.14 TiB{' '}
                      <span style={{ color: theme.textSecondary }}>/ 140.27 TiB</span>
                    </Text>
                  </MetricCard>
                </Stack>

                <KpiSeparator />

                <MetricCard>
                  <Text variant="Basic" color="textSecondary">Objects</Text>
                  <Text variant="Basic">720 458 785</Text>
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
                  <Stack gap="r8" style={{ alignItems: 'center' }}>
                    <Text variant="Large" isEmphazed>Net Capacity (TiB)</Text>
                    <Stack gap="r16" style={{ alignItems: 'center', marginLeft: 'auto' }}>
                      <Stack gap="r8" style={{ alignItems: 'center' }}>
                        <svg width={24} height={2}>
                          <line x1={0} y1={1} x2={24} y2={1} stroke="#8b5cf6" strokeWidth={2} />
                        </svg>
                        <Text variant="Smaller" color="textSecondary">Net capacity</Text>
                      </Stack>
                      <Stack gap="r8" style={{ alignItems: 'center' }}>
                        <svg width={24} height={2}>
                          <line x1={0} y1={1} x2={24} y2={1} stroke="#6b6b8a" strokeWidth={1.5} />
                        </svg>
                        <Text variant="Smaller" color="textSecondary">Total capacity</Text>
                      </Stack>
                    </Stack>
                  </Stack>
                  <ResponsiveContainer width="100%" height={180}>
                    <ComposedChart data={netStorageData} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
                      <defs>
                        <linearGradient id="netStorageGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.18} />
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        vertical={false}
                        stroke={theme.border}
                        strokeOpacity={0.4}
                      />
                      <XAxis
                        dataKey="t"
                        type="number"
                        domain={['dataMin', 'dataMax']}
                        ticks={monthlyTicks}
                        tickFormatter={(ts: number) => {
                          const d = new Date(ts * 1000);
                          const month = d.toLocaleDateString('en-US', { month: 'short' });
                          return d.getMonth() === 0 ? `${month} '${String(d.getFullYear()).slice(2)}` : month;
                        }}
                        tick={{ fill: theme.textSecondary, fontSize: 10 }}
                        axisLine={false}
                        tickLine={{ stroke: theme.textSecondary, strokeOpacity: 0.25 }}
                      />
                      <YAxis
                        orientation="right"
                        domain={[0, 150]}
                        ticks={[0, 50, 100, 150]}
                        tick={{ fill: theme.textSecondary, fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (!active || !payload?.length) return null;
                          const d = new Date(label * 1000);
                          const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                          const seriesMeta = { v: { label: 'Net capacity', color: '#8b5cf6' }, cap: { label: 'Total capacity', color: '#6b6b8a' } };
                          return (
                            <div style={{ background: theme.backgroundLevel2, border: `1px solid ${theme.border}`, borderRadius: 4, padding: '8px 10px', fontSize: 12, color: theme.textPrimary }}>
                              <div style={{ marginBottom: 6, color: theme.textSecondary }}>{date}</div>
                              {[...payload].reverse().map((entry) => {
                                const meta = seriesMeta[entry.dataKey as keyof typeof seriesMeta];
                                return (
                                  <div key={entry.dataKey} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                                    <svg width={16} height={2}><line x1={0} y1={1} x2={16} y2={1} stroke={meta.color} strokeWidth={1.5} /></svg>
                                    <span>{meta.label}</span>
                                    <span style={{ marginLeft: 'auto', paddingLeft: 16 }}>{(entry.value as number).toFixed(2)} TiB</span>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        }}
                      />
                      <ReferenceLine y={0} stroke={theme.textSecondary} strokeOpacity={0.3} strokeWidth={1} />
                      <Area
                        type="monotone"
                        dataKey="v"
                        stroke="#8b5cf6"
                        strokeWidth={1.5}
                        fill="url(#netStorageGradient)"
                        dot={false}
                        isAnimationActive={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="cap"
                        stroke="#6b6b8a"
                        strokeWidth={1.5}
                        dot={false}
                        isAnimationActive={false}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
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
                      <TextBadge text={String(alerts.length)} variant="statusWarning" style={{ opacity: alerts.length === 0 ? 0.4 : 1 }} />
                    </Stack>
                    <Stack gap="r8" style={{ alignItems: 'center' }}>
                      <Text variant="Smaller" color="textSecondary">CRITICAL</Text>
                      <TextBadge text="0" variant="statusCritical" style={{ opacity: 0.4 }} />
                    </Stack>
                  </Stack>
                </PanelHeader>
                <AlertsFadeOuter>
                  {alerts.length === 0 ? (
                    <EmptyAlerts>
                      <i className="fas fa-check-circle" style={{ fontSize: 18, opacity: 0.4 }} />
                      <Text variant="Small" color="textSecondary" style={{ opacity: 0.6 }}>No active alerts</Text>
                    </EmptyAlerts>
                  ) : (
                  <AlertsFadeWrapper onScroll={handleAlertsScroll}>
                    {alerts.map((item, i) => (
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
                  </AlertsFadeWrapper>
                  )}
                  {alerts.length > 0 && alertsHasMore && <AlertsFadeGradient />}
                </AlertsFadeOuter>
              </PanelSecondary>

              <PanelDominant>
                <PanelHeader>
                  <Text variant="Large" isEmphazed>Platform Status</Text>
                </PanelHeader>
                <PlatformBody>
                  <HealthBarWrapper>
                    <Stack gap="r8" style={{ alignItems: 'center', marginBottom: spacing.r8 }}>
                      <FaIcon
                        className={alerts.length === 0 ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}
                        color={alerts.length === 0 ? theme.statusHealthy : theme.statusWarning}
                        size={16}
                      />
                      <Text variant="Basic">Platform Health</Text>
                      <TooltipCue />
                    </Stack>
                    <GlobalHealthBar
                      id="platform-health"
                      start={HEALTH_START}
                      end={new Date(now)}
                      alerts={healthAlertData}
                    />
                  </HealthBarWrapper>

                  <Stack gap="r0" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
                    <EntityCard highlight={alerts.length > 0}>
                      <EntityIconBox color={alerts.length === 0 ? theme.statusHealthy : theme.statusWarning}>
                        <i className="fas fa-hdd" style={{ fontSize: 14, color: '#121219' }} />
                      </EntityIconBox>
                      <Stack gap="r4" style={{ alignItems: 'baseline' }}>
                        <Text style={{ fontSize: 18, fontFamily: 'Lato' }}>12</Text>
                        <Text variant="Basic" style={{ textDecoration: alerts.length > 0 ? 'underline' : 'none' }}>volumes</Text>
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
        {connectorPanel}
        </PanelsArea>
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

export const NoAlerts: Story = {
  render: () => <ArtescaOverview alerts={[]} healthAlertData={[]} />,
};

export const WithVeeam: Story = {
  render: () => <ArtescaOverview connectorPanel={<VeeamPanel />} />,
};
