import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import styled, { useTheme } from 'styled-components';
import { Navbar } from '../../src/lib/components/navbar/Navbar.component';
import { ScrollbarWrapper } from '../../src/lib/components/scrollbarwrapper/ScrollbarWrapper.component';
import { Stack, spacing } from '../../src/lib/spacing';
import { Text } from '../../src/lib/components/text/Text.component';
import { TextBadge } from '../../src/lib/components/textbadge/TextBadge.component';
import { Barchart, ChartLegendWrapper, ChartLegend } from '../../src/lib/components/charts';
import { CoreUITheme } from '../../src/lib/style/theme';
import { getThemePropSelector } from '../../src/lib/utils';

// ─── Layout ───────────────────────────────────────────────────────────────────

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
  padding: ${spacing.r8};
  overflow: hidden;
`;

const MiddlePanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${spacing.r24};
  padding: ${spacing.r24};
  background: ${getThemePropSelector('backgroundLevel2')};
  border-radius: 4px;
  overflow: hidden;
`;

const RightPanel = styled.div`
  width: 466px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: ${spacing.r16};
  padding: ${spacing.r16};
  background: ${getThemePropSelector('backgroundLevel2')};
  border-radius: 4px;
  overflow-y: auto;
`;

// ─── SHM row layout ───────────────────────────────────────────────────────────

const ShmRow = styled.div`
  display: flex;
  align-items: flex-start;
`;

const ShmLeftArea = styled.div`
  width: 198px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
  padding: ${spacing.r8};
`;

const ShmCards = styled.div`
  display: flex;
  gap: ${spacing.r8};
  align-items: flex-start;
  flex-wrap: wrap;
`;

const ShmCard = styled.div`
  display: flex;
  flex-direction: column;
  height: 130px;
  background: ${getThemePropSelector('backgroundLevel3')};
  border-radius: 3px;
  overflow: hidden;
`;

const ShmCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
  padding: ${spacing.r8};
  background: ${getThemePropSelector('backgroundLevel4')};
  border-radius: 3px;
  flex-shrink: 0;
`;

const ShmCardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.r8};
  width: 160px;
  height: 90px;
`;

const ShmIcon = styled.i`
  color: ${getThemePropSelector('statusHealthy')};
`;

// ─── Platform / Datacenter card ───────────────────────────────────────────────

const DatacenterCard = styled.div`
  display: flex;
  flex-direction: column;
  background: ${getThemePropSelector('backgroundLevel3')};
  border-radius: 3px;
  overflow: hidden;
`;

const DatacenterHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
  height: 40px;
  padding-left: ${spacing.r16};
  background: ${getThemePropSelector('backgroundLevel4')};
  border-radius: 3px;
  flex-shrink: 0;
`;

const DatacenterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.r16};
  justify-content: center;
  height: 90px;
  padding-left: ${spacing.r24};
  width: 412px;
`;

const DatacenterRow = styled.div`
  display: flex;
  align-items: center;
  height: 28px;
`;

const DatacenterCell = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
  flex: 1;
  overflow: hidden;
`;

const FaIcon = styled.i<{ size?: number; color?: string }>`
  font-size: ${({ size }) => size ?? 16}px;
  color: ${({ color, theme }) => color ?? (theme as CoreUITheme).statusHealthy};
  width: ${({ size }) => (size ?? 16) + 8}px;
  text-align: center;
  flex-shrink: 0;
`;

const Divider = styled.div`
  height: 1px;
  background: ${getThemePropSelector('backgroundLevel4')};
  flex-shrink: 0;
`;

// ─── KPI ──────────────────────────────────────────────────────────────────────

const KpiValue = styled.span`
  font-size: 20px;
  font-weight: 400;
  line-height: 32px;
  color: ${getThemePropSelector('textPrimary')};
  white-space: nowrap;
`;

const TooltipCue = () => (
  <i
    className="fas fa-question-circle"
    style={{ fontSize: 14, color: '#595a78', marginLeft: 4 }}
  />
);

// ─── Storage ring (donut) ─────────────────────────────────────────────────────

const StorageRing: React.FC<{ usedPercent: number }> = ({ usedPercent }) => {
  const r = 18;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * r;
  const usedDash = (usedPercent / 100) * circumference;

  return (
    <svg width={48} height={48} viewBox="0 0 48 48">
      <circle cx={24} cy={24} r={r} fill="none" stroke="#2a2a3a" strokeWidth={strokeWidth} />
      <circle
        cx={24}
        cy={24}
        r={r}
        fill="none"
        stroke="#0aada6"
        strokeWidth={strokeWidth}
        strokeDasharray={`${usedDash} ${circumference - usedDash}`}
        transform="rotate(-90 24 24)"
      />
      <text x={24} y={21} textAnchor="middle" fill="#eaeaea" fontSize={10} fontFamily="Lato">
        {usedPercent}%
      </text>
      <text x={24} y={32} textAnchor="middle" fill="#b5b5b5" fontSize={8} fontFamily="Lato">
        Used
      </text>
    </svg>
  );
};

// ─── Donut chart (Restore validation) ────────────────────────────────────────

const RestoreDonut: React.FC<{ successful: number; failed: number }> = ({
  successful,
  failed,
}) => {
  const total = successful + failed;
  const r = 38;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * r;
  const successDash = (successful / total) * circumference;

  return (
    <svg width={98} height={98} viewBox="0 0 98 98">
      {/* fail (red) full ring as background */}
      <circle cx={49} cy={49} r={r} fill="none" stroke="#e84855" strokeWidth={strokeWidth} />
      {/* success (teal) arc on top */}
      <circle
        cx={49}
        cy={49}
        r={r}
        fill="none"
        stroke="#0aada6"
        strokeWidth={strokeWidth}
        strokeDasharray={`${successDash} ${circumference - successDash}`}
        transform="rotate(-90 49 49)"
      />
    </svg>
  );
};

// ─── Right panel cards ────────────────────────────────────────────────────────

const VeeamCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.r12};
  padding: ${spacing.r16};
  background: ${getThemePropSelector('backgroundLevel4')};
  border-radius: 4px;
`;

const VeeamLogoText = styled.span`
  background: #00b336;
  color: white;
  font-size: 12px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 2px;
  font-family: 'Lato';
`;

const KpiRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
`;

const LegendDot = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ color }) => color};
  flex-shrink: 0;
`;

// ─── Navbar right actions helpers ─────────────────────────────────────────────

const NavIconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${spacing.r8};
  height: 48px;
  color: ${getThemePropSelector('textSecondary')};
  font-size: 18px;
  &:hover {
    background: ${getThemePropSelector('highlight')};
  }
`;

// ─── Mock data ────────────────────────────────────────────────────────────────

const now = Date.now();
const DAY = 24 * 60 * 60 * 1000;

const backupJobsBars = [
  {
    label: 'Success',
    data: [
      [new Date(now - 6 * DAY), 48],
      [new Date(now - 5 * DAY), 52],
      [new Date(now - 4 * DAY), 45],
      [new Date(now - 3 * DAY), 58],
      [new Date(now - 2 * DAY), 50],
      [new Date(now - 1 * DAY), 55],
      [new Date(now), 60],
    ] as [Date, number][],
  },
  {
    label: 'Fail',
    data: [
      [new Date(now - 6 * DAY), 12],
      [new Date(now - 5 * DAY), 8],
      [new Date(now - 4 * DAY), 15],
      [new Date(now - 3 * DAY), 2],
      [new Date(now - 2 * DAY), 10],
      [new Date(now - 1 * DAY), 5],
      [new Date(now), 0],
    ] as [Date, number][],
  },
] as const;

// ─── Story component ──────────────────────────────────────────────────────────

const ArtescaVeeamOverview = () => {
  const theme = useTheme() as CoreUITheme;

  return (
    <PageWrapper>
      <Navbar
        tabs={[
          { title: 'Overview', selected: true },
          { title: 'Identity' },
          { title: 'Platform' },
          { title: 'Storage Services' },
          { title: 'Data Management' },
          { title: 'Alerts' },
        ]}
        rightActions={[
          {
            type: 'custom',
            render: () => (
              <NavIconButton aria-label="Notifications">
                <i className="fas fa-bell" />
              </NavIconButton>
            ),
          },
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
        {/* ── Middle panel ── */}
        <MiddlePanel>
          <ScrollbarWrapper>
            <Stack direction="vertical" gap="r24">

              {/* Overview */}
              <ShmRow>
                <ShmLeftArea>
                  <Text isEmphazed>Overview</Text>
                </ShmLeftArea>
                <Stack gap="r8" style={{ alignItems: 'flex-end' }}>
                  <Stack direction="vertical" gap="r4">
                    <Stack gap="r4" style={{ alignItems: 'flex-end' }}>
                      <Text variant="Basic" color="textSecondary">Total Managed Data</Text>
                      <TooltipCue />
                    </Stack>
                    <KpiValue>15.8 TiB</KpiValue>
                  </Stack>
                </Stack>
              </ShmRow>

              <Divider />

              {/* Data Services */}
              <ShmRow>
                <ShmLeftArea>
                  <Text isEmphazed>Data Services</Text>
                  <TooltipCue />
                  <TextBadge text="1" variant="infoPrimary" />
                </ShmLeftArea>
                <ShmCards>
                  <ShmCard>
                    <ShmCardHeader>
                      <Text isEmphazed>S3</Text>
                    </ShmCardHeader>
                    <ShmCardContent>
                      <i
                        className="fas fa-cubes"
                        style={{ fontSize: 36, color: theme.textSecondary }}
                      />
                      <Text variant="Smaller" color="textSecondary">
                        s3.myneworg.public
                      </Text>
                    </ShmCardContent>
                  </ShmCard>
                </ShmCards>
              </ShmRow>

              <Divider />

              {/* Storage Services */}
              <ShmRow>
                <ShmLeftArea>
                  <Text isEmphazed>Storage Services</Text>
                  <TooltipCue />
                  <TextBadge text="1" variant="infoPrimary" />
                </ShmLeftArea>
                <ShmCards>
                  <ShmCard>
                    <ShmCardHeader>
                      <ShmIcon className="fas fa-network-wired" style={{ fontSize: 16 }} />
                      <Text isEmphazed>ARTESCA</Text>
                    </ShmCardHeader>
                    <ShmCardContent>
                      <StorageRing usedPercent={32} />
                      <Stack gap="r4" style={{ alignItems: 'baseline' }}>
                        <Text isEmphazed>358.4 TiB</Text>
                        <Text variant="Smaller" color="textSecondary">Used</Text>
                      </Stack>
                    </ShmCardContent>
                  </ShmCard>
                </ShmCards>
              </ShmRow>

              <Divider />

              {/* Platform */}
              <ShmRow>
                <ShmLeftArea>
                  <Text isEmphazed>Platform</Text>
                  <TooltipCue />
                  <TextBadge text="1" variant="infoPrimary" />
                </ShmLeftArea>
                <ShmCards>
                  <DatacenterCard>
                    <DatacenterHeader>
                      <ShmIcon className="fas fa-warehouse" style={{ fontSize: 16 }} />
                      <Text isEmphazed>Datacenter</Text>
                    </DatacenterHeader>
                    <DatacenterContent>
                      <DatacenterRow>
                        <DatacenterCell>
                          <FaIcon className="fas fa-server" size={24} />
                          <Text isEmphazed style={{ width: 28, textAlign: 'right' }}>1</Text>
                          <Text isEmphazed>Node</Text>
                        </DatacenterCell>
                        <DatacenterCell>
                          <FaIcon className="fas fa-toolbox" size={24} />
                          <Text isEmphazed>Services</Text>
                        </DatacenterCell>
                      </DatacenterRow>
                      <DatacenterRow>
                        <DatacenterCell>
                          <FaIcon className="fas fa-hdd" size={24} />
                          <Text isEmphazed style={{ width: 28, textAlign: 'right' }}>10</Text>
                          <Text isEmphazed>Volumes</Text>
                        </DatacenterCell>
                        <DatacenterCell>
                          <FaIcon className="fas fa-project-diagram" size={24} />
                          <Text isEmphazed>Network</Text>
                        </DatacenterCell>
                      </DatacenterRow>
                    </DatacenterContent>
                  </DatacenterCard>
                </ShmCards>
              </ShmRow>

            </Stack>
          </ScrollbarWrapper>
        </MiddlePanel>

        {/* ── Right panel (Veeam) ── */}
        <RightPanel>
          {/* Integration header */}
          <Stack direction="vertical" gap="r4" style={{ paddingBottom: spacing.r8 }}>
            <Text variant="Large">Integration with</Text>
            <Stack gap="r8" style={{ alignItems: 'center' }}>
              <VeeamLogoText>veeam</VeeamLogoText>
              <Text isEmphazed>Backup &amp; Replication</Text>
            </Stack>
            <Text variant="Basic" color="textSecondary">v12.3.1</Text>
          </Stack>

          {/* Backup Jobs chart */}
          <VeeamCard>
            <Stack gap="r8" style={{ alignItems: 'center' }}>
              <Text variant="Large">Backup Jobs</Text>
              <TooltipCue />
              <Text variant="Basic" color="textSecondary">7 days</Text>
            </Stack>
            <ChartLegendWrapper
              colorSet={{
                Success: theme.statusHealthy,
                Fail: theme.statusCritical,
              }}
            >
              <Barchart
                title=""
                type={{
                  type: 'time',
                  timeRange: {
                    startDate: new Date(now - 6 * DAY),
                    endDate: new Date(now),
                    interval: DAY,
                  },
                }}
                bars={backupJobsBars}
                stacked
                height={80}
              />
              <ChartLegend shape="rectangle" direction="horizontal" />
            </ChartLegendWrapper>
          </VeeamCard>

          {/* Backup overview */}
          <VeeamCard>
            <Text variant="Large">Backup overview</Text>
            <Stack direction="vertical" gap="r12">
              <KpiRow>
                <Stack gap="r4" style={{ alignItems: 'center' }}>
                  <Text variant="Basic" color="textSecondary">Backed-up VMs</Text>
                  <TooltipCue />
                </Stack>
                <Text isEmphazed>32</Text>
              </KpiRow>
              <KpiRow>
                <Stack gap="r4" style={{ alignItems: 'center' }}>
                  <Text variant="Basic" color="textSecondary">Protected data (source VM size)</Text>
                  <TooltipCue />
                </Stack>
                <Text isEmphazed>41.21 TiB</Text>
              </KpiRow>
              <KpiRow>
                <Stack gap="r4" style={{ alignItems: 'center' }}>
                  <Text variant="Basic" color="textSecondary">Stored backups (repository usage)</Text>
                  <TooltipCue />
                </Stack>
                <Text isEmphazed>89.47 TiB</Text>
              </KpiRow>
            </Stack>
          </VeeamCard>

          {/* Restore validation */}
          <VeeamCard>
            <Stack style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Stack gap="r8" style={{ alignItems: 'center' }}>
                <Text variant="Large">Restore validation (SureBackup)</Text>
                <TooltipCue />
              </Stack>
              <Text variant="Basic" color="textSecondary">Last 14 days</Text>
            </Stack>
            <Stack gap="r12" style={{ alignItems: 'center' }}>
              <RestoreDonut successful={20} failed={1} />
              <Stack direction="vertical" gap="r8" style={{ justifyContent: 'flex-end' }}>
                <Stack gap="r8" style={{ alignItems: 'center' }}>
                  <LegendDot color={theme.statusHealthy} />
                  <Text variant="Basic">Successful (20)</Text>
                </Stack>
                <Stack gap="r8" style={{ alignItems: 'center' }}>
                  <LegendDot color={theme.statusCritical} />
                  <Text variant="Basic">Warning / Failed (1)</Text>
                </Stack>
              </Stack>
            </Stack>
          </VeeamCard>
        </RightPanel>
      </ContentArea>
    </PageWrapper>
  );
};

// ─── Storybook meta ───────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Templates/ARTESCA Veeam Overview',
  parameters: {
    layout: 'fullscreen',
    fullPage: true,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <ArtescaVeeamOverview />,
};
