import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import styled, { useTheme } from 'styled-components';
import { Navbar } from '../../src/lib/components/navbar/Navbar.component';
import { ScrollbarWrapper } from '../../src/lib/components/scrollbarwrapper/ScrollbarWrapper.component';
import { Stack, spacing } from '../../src/lib/spacing';
import { Text } from '../../src/lib/components/text/Text.component';
import { TextBadge } from '../../src/lib/components/textbadge/TextBadge.component';
import { Icon } from '../../src/lib/components/icon/Icon.component';
import {
  StatusIcon,
  Status,
} from '../../src/lib/components/statusicon/StatusIcon.component';
import {
  Table,
  Column,
} from '../../src/lib/components/tablev2/Tablev2.component';
import {
  Barchart,
  LineTimeSerieChart,
  ChartLegendWrapper,
  ChartLegend,
  Serie,
} from '../../src/lib/components/charts';
import {
  CoreUITheme,
  lineTimeSeriesColorRange,
} from '../../src/lib/style/theme';
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
  overflow: hidden;
`;

const LeftPanel = styled.div`
  flex: 0 0 30%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: ${getThemePropSelector('backgroundLevel2')};
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: ${spacing.r2};
  background: ${getThemePropSelector('backgroundLevel1')};
`;

// ─── Section blocks ───────────────────────────────────────────────────────────

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${spacing.r16};
  gap: ${spacing.r12};
  background: ${getThemePropSelector('backgroundLevel2')};
`;

const SectionTitle = styled.div`
  padding-bottom: ${spacing.r8};
  border-bottom: 1px solid ${getThemePropSelector('backgroundLevel3')};
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Divider = styled.div`
  height: 1px;
  background: ${getThemePropSelector('backgroundLevel3')};
`;

const AlertItem = styled.div<{ severity: 'critical' | 'warning' }>`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
  padding: ${spacing.r6} ${spacing.r8};
  border-radius: ${spacing.r4};
  background: ${({ severity, theme }) => {
    const t = theme as CoreUITheme;
    return severity === 'critical'
      ? `${t.statusCritical}22`
      : `${t.statusWarning}22`;
  }};
`;

const ChartsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.r2};
`;

// ─── Mock data ────────────────────────────────────────────────────────────────

const platformServices = [
  { name: 'Object Storage', status: Status.HEALTHY },
  { name: 'Replication', status: Status.HEALTHY },
  { name: 'Metadata', status: Status.WARNING },
  { name: 'IAM', status: Status.HEALTHY },
  { name: 'Lifecycle', status: Status.CRITICAL },
];

const endpoints = [
  { name: 's3.us-east-1.example.com', protocol: 'HTTPS', port: 443 },
  { name: 's3.eu-west-1.example.com', protocol: 'HTTPS', port: 443 },
  { name: 's3-internal.example.com', protocol: 'HTTP', port: 80 },
];

const alerts = [
  { message: 'Lifecycle service unreachable', severity: 'critical' as const },
  { message: 'Metadata latency above threshold', severity: 'warning' as const },
  { message: 'Replication lag: 3 min', severity: 'warning' as const },
];

const now = Date.now();
const DAY = 24 * 60 * 60 * 1000;

const netStorageSeries: Serie[] = [
  {
    resource: 'Used storage',
    getTooltipLabel: () => 'Used storage',
    data: [
      [Math.floor((now - 6 * DAY) / 1000), '420000000000'],
      [Math.floor((now - 5 * DAY) / 1000), '435000000000'],
      [Math.floor((now - 4 * DAY) / 1000), '448000000000'],
      [Math.floor((now - 3 * DAY) / 1000), '460000000000'],
      [Math.floor((now - 2 * DAY) / 1000), '471000000000'],
      [Math.floor((now - 1 * DAY) / 1000), '485000000000'],
      [Math.floor(now / 1000), '492000000000'],
    ],
  },
];

type Bucket = {
  name: string;
  location: string;
  objects: number;
  capacity: string;
  versioning: boolean;
  created: string;
};

const buckets: Bucket[] = [
  { name: 'artesca-backups', location: 'us-east-1', objects: 12480, capacity: '148 GiB', versioning: true, created: '2024-01-15' },
  { name: 'media-assets', location: 'eu-west-1', objects: 54200, capacity: '310 GiB', versioning: false, created: '2024-02-03' },
  { name: 'logs-archive', location: 'us-east-1', objects: 890000, capacity: '72 GiB', versioning: false, created: '2024-03-10' },
  { name: 'db-snapshots', location: 'eu-central-1', objects: 342, capacity: '221 GiB', versioning: true, created: '2024-04-01' },
  { name: 'ml-datasets', location: 'us-west-2', objects: 4800, capacity: '503 GiB', versioning: true, created: '2024-05-20' },
  { name: 'static-assets', location: 'eu-west-1', objects: 2100, capacity: '8 GiB', versioning: false, created: '2024-06-11' },
];

const bucketColumns: Column<Bucket>[] = [
  {
    Header: 'Name',
    accessor: 'name',
    cellStyle: { flex: 2, textAlign: 'left' },
  },
  {
    Header: 'Location',
    accessor: 'location',
    cellStyle: { flex: 1, textAlign: 'left' },
  },
  {
    Header: 'Objects',
    accessor: 'objects',
    cellStyle: { flex: 1, textAlign: 'right' },
    Cell: ({ value }: { value: number }) => <>{value.toLocaleString()}</>,
  },
  {
    Header: 'Capacity',
    accessor: 'capacity',
    cellStyle: { flex: 1, textAlign: 'right' },
  },
  {
    Header: 'Versioning',
    accessor: 'versioning',
    cellStyle: { flex: '0 0 90px', textAlign: 'center' },
    Cell: ({ value }: { value: boolean }) => (
      <Icon
        name={value ? 'Check' : 'Close'}
        color={value ? 'statusHealthy' : 'textTertiary'}
      />
    ),
  },
  {
    Header: 'Created',
    accessor: 'created',
    cellStyle: { flex: 1, textAlign: 'left' },
  },
];

const throughputBars = [
  {
    label: 'Ingress',
    data: [
      [new Date(now - 6 * DAY), 12],
      [new Date(now - 5 * DAY), 18],
      [new Date(now - 4 * DAY), 14],
      [new Date(now - 3 * DAY), 22],
      [new Date(now - 2 * DAY), 19],
      [new Date(now - 1 * DAY), 25],
    ] as [Date, number][],
  },
  {
    label: 'Egress',
    data: [
      [new Date(now - 6 * DAY), 8],
      [new Date(now - 5 * DAY), 11],
      [new Date(now - 4 * DAY), 7],
      [new Date(now - 3 * DAY), 15],
      [new Date(now - 2 * DAY), 13],
      [new Date(now - 1 * DAY), 17],
    ] as [Date, number][],
  },
] as const;

const requestsBars = [
  {
    label: 'GET',
    data: [
      ['artesca-backups', 4200],
      ['media-assets', 18500],
      ['logs-archive', 9100],
      ['db-snapshots', 820],
      ['ml-datasets', 3400],
    ],
  },
  {
    label: 'PUT',
    data: [
      ['artesca-backups', 1100],
      ['media-assets', 3200],
      ['logs-archive', 12400],
      ['db-snapshots', 240],
      ['ml-datasets', 890],
    ],
  },
] as const;

// ─── Story component ──────────────────────────────────────────────────────────

const WelcomePage = () => {
  const theme = useTheme() as CoreUITheme;

  const criticalCount = alerts.filter((a) => a.severity === 'critical').length;
  const warningCount = alerts.filter((a) => a.severity === 'warning').length;

  return (
    <PageWrapper>
      <Navbar
        tabs={[
          { title: 'Overview', selected: true },
          { title: 'Buckets' },
          { title: 'Users' },
          { title: 'Workflows' },
        ]}
        rightActions={[
          {
            type: 'dropdown',
            text: 'admin',
            icon: <Icon name="Account" />,
            items: [
              { label: 'My account', onClick: () => {} },
              { label: 'Sign out', onClick: () => {} },
            ],
          },
        ]}
      />

      <ContentArea>
        {/* ── Left panel (30%) ── */}
        <LeftPanel>
          <ScrollbarWrapper>
            <Stack direction="vertical" gap="r2">
              {/* Platform Status */}
              <Section>
                <SectionTitle>
                  <Text variant="Large">Platform Status</Text>
                </SectionTitle>
                <Stack direction="vertical" gap="r8">
                  {platformServices.map((svc) => (
                    <Row key={svc.name}>
                      <Text variant="Basic">{svc.name}</Text>
                      <Stack gap="r8">
                        <StatusIcon status={svc.status} />
                        <Text
                          variant="Smaller"
                          color={
                            svc.status === Status.HEALTHY
                              ? 'statusHealthy'
                              : svc.status === Status.WARNING
                              ? 'statusWarning'
                              : 'statusCritical'
                          }
                        >
                          {svc.status}
                        </Text>
                      </Stack>
                    </Row>
                  ))}
                </Stack>
              </Section>

              {/* Protected Data */}
              <Section>
                <SectionTitle>
                  <Text variant="Large">Protected Data</Text>
                </SectionTitle>
                <Stack direction="vertical" gap="r8">
                  <Row>
                    <Text variant="Basic" color="textSecondary">Buckets</Text>
                    <Text isEmphazed>6</Text>
                  </Row>
                  <Row>
                    <Text variant="Basic" color="textSecondary">Objects</Text>
                    <Text isEmphazed>963 922</Text>
                  </Row>
                  <Row>
                    <Text variant="Basic" color="textSecondary">Capacity</Text>
                    <Text isEmphazed>1.24 TiB</Text>
                  </Row>
                  <Row>
                    <Text variant="Basic" color="textSecondary">Replicated</Text>
                    <Stack gap="r8">
                      <Icon name="Check-circle" color="statusHealthy" />
                      <Text isEmphazed color="statusHealthy">87%</Text>
                    </Stack>
                  </Row>
                  <Row>
                    <Text variant="Basic" color="textSecondary">Alerts</Text>
                    <Stack gap="r8">
                      <TextBadge text={String(criticalCount)} variant="statusCritical" />
                      <TextBadge text={String(warningCount)} variant="statusWarning" />
                    </Stack>
                  </Row>
                </Stack>
              </Section>

              {/* Net Storage */}
              <Section>
                <SectionTitle>
                  <Text variant="Large">Net Storage</Text>
                </SectionTitle>

                <ChartLegendWrapper
                  colorSet={{ 'Used storage': lineTimeSeriesColorRange[0] }}
                >
                  <LineTimeSerieChart
                    title="Storage evolution (7 days)"
                    series={netStorageSeries}
                    height={160}
                    startingTimeStamp={Math.floor((now - 6 * DAY) / 1000)}
                    duration={6 * 24 * 60 * 60}
                    interval={24 * 60 * 60}
                    unitRange={[
                      { threshold: 0, label: 'B' },
                      { threshold: 1024, label: 'KiB' },
                      { threshold: 1024 ** 2, label: 'MiB' },
                      { threshold: 1024 ** 3, label: 'GiB' },
                      { threshold: 1024 ** 4, label: 'TiB' },
                    ]}
                  />
                  <ChartLegend shape="line" direction="horizontal" />
                </ChartLegendWrapper>

                <Divider />

                <Stack direction="vertical" gap="r4">
                  <Text variant="Smaller" color="textSecondary">Endpoints</Text>
                  {endpoints.map((ep) => (
                    <Row key={ep.name}>
                      <Text variant="Smaller">{ep.name}</Text>
                      <Text variant="Smaller" color="textSecondary">
                        {ep.protocol}:{ep.port}
                      </Text>
                    </Row>
                  ))}
                </Stack>

                <Divider />

                <Stack direction="vertical" gap="r6">
                  <Text variant="Smaller" color="textSecondary">Alerts</Text>
                  {alerts.map((alert, i) => (
                    <AlertItem key={i} severity={alert.severity}>
                      <Icon
                        name={alert.severity === 'critical' ? 'Times-circle' : 'Exclamation-triangle'}
                        color={alert.severity === 'critical' ? 'statusCritical' : 'statusWarning'}
                        size="smaller"
                      />
                      <Text variant="Smaller">{alert.message}</Text>
                    </AlertItem>
                  ))}
                </Stack>
              </Section>
            </Stack>
          </ScrollbarWrapper>
        </LeftPanel>

        {/* ── Right panel (70%) ── */}
        <RightPanel>
          <ScrollbarWrapper>
            <Stack direction="vertical" gap="r2">
              {/* Buckets */}
              <Section>
                <SectionTitle>
                  <Text variant="Large">Buckets</Text>
                </SectionTitle>
                <Table
                  columns={bucketColumns}
                  data={buckets}
                  defaultSortingKey="name"
                />
              </Section>

              {/* Charts */}
              <ChartsRow>
                <Section>
                  <ChartLegendWrapper
                    colorSet={{
                      Ingress: theme.selectedActive,
                      Egress: lineTimeSeriesColorRange[1],
                    }}
                  >
                    <Barchart
                      title="Throughput (GiB/day)"
                      type={{
                        type: 'time',
                        timeRange: {
                          startDate: new Date(now - 6 * DAY),
                          endDate: new Date(now),
                          interval: DAY,
                        },
                      }}
                      bars={throughputBars}
                      height={200}
                    />
                    <ChartLegend shape="rectangle" direction="horizontal" />
                  </ChartLegendWrapper>
                </Section>

                <Section>
                  <ChartLegendWrapper
                    colorSet={{
                      GET: lineTimeSeriesColorRange[0],
                      PUT: lineTimeSeriesColorRange[2],
                    }}
                  >
                    <Barchart
                      title="Requests per bucket"
                      type={{ type: 'category' }}
                      bars={requestsBars}
                      stacked
                      height={200}
                    />
                    <ChartLegend shape="rectangle" direction="horizontal" />
                  </ChartLegendWrapper>
                </Section>
              </ChartsRow>
            </Stack>
          </ScrollbarWrapper>
        </RightPanel>
      </ContentArea>
    </PageWrapper>
  );
};

// ─── Storybook meta ───────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Templates/Welcome Page',
  parameters: {
    layout: 'fullscreen',
    fullPage: true,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <WelcomePage />,
};
