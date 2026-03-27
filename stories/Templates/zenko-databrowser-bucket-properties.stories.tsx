import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import { Navbar } from '../../src/lib/components/navbar/Navbar.component';
import { Sidebar } from '../../src/lib/components/sidebar/Sidebar.component';
import { Toggle } from '../../src/lib/components/toggle/Toggle.component';
import {
  Table,
  Column,
} from '../../src/lib/components/tablev2/Tablev2.component';
import { Stack, spacing } from '../../src/lib/spacing';
import { Text } from '../../src/lib/components/text/Text.component';
import { TextBadge } from '../../src/lib/components/textbadge/TextBadge.component';
import { Button } from '../../src/lib/next';
import { getThemePropSelector } from '../../src/lib/utils';
import { CoreUITheme } from '../../src/lib/style/theme';

// ─── Layout ───────────────────────────────────────────────────────────────────

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${getThemePropSelector('backgroundLevel1')};
  color: ${getThemePropSelector('textPrimary')};
`;

const MainContainer = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;


// ─── Main content ─────────────────────────────────────────────────────────────

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 ${spacing.r16};
  min-width: 0;
  overflow: hidden;
`;

const TitleBar = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
  font-size: 14px;
  flex-shrink: 0;
`;

const BreadcrumbBtn = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
  height: 24px;
  padding: 0 ${spacing.r8};
  background: ${getThemePropSelector('buttonPrimary')};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: ${getThemePropSelector('textPrimary')};
  font-size: 14px;
  font-family: 'Lato', sans-serif;
  white-space: nowrap;
`;

const BreadcrumbSeparator = styled.span`
  color: ${getThemePropSelector('textSecondary')};
  font-family: 'Font Awesome 5 Free', 'Font Awesome 7 Free';
  font-weight: 900;
`;

const Summary = styled.div`
  height: 80px;
  background: ${getThemePropSelector('backgroundLevel2')};
  border-radius: 2px 2px 0 0;
  display: flex;
  align-items: center;
  padding: ${spacing.r16};
  flex-shrink: 0;
`;

const HeroIconWrapper = styled.div`
  width: 64px;
  height: 64px;
  background: ${getThemePropSelector('backgroundLevel3')};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: ${spacing.r16};
`;

// ─── Content area ─────────────────────────────────────────────────────────────

const ContentArea = styled.div`
  display: flex;
  flex: 1;
  gap: 1px;
  overflow: hidden;
`;

const LeftPanel = styled.div`
  width: 800px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: ${getThemePropSelector('backgroundLevel3')};
  overflow: hidden;
  padding-bottom: 10px;
`;

const SearchActionsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.r16};
  flex-shrink: 0;
`;

const SearchField = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
  height: 32px;
  padding: 0 ${spacing.r8};
  background: ${getThemePropSelector('backgroundLevel1')};
  border: 1px solid ${getThemePropSelector('border')};
  border-radius: 4px;
  width: 196px;
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  font-size: 14px;
  font-style: italic;
  color: ${getThemePropSelector('textPrimary')};
  opacity: 0.5;
  font-family: 'Lato', sans-serif;
  width: 100%;
  &::placeholder {
    color: ${getThemePropSelector('textPrimary')};
    opacity: 0.5;
  }
`;

const TableContainer = styled.div`
  flex: 1;
  overflow: hidden;
`;

// ─── Right panel ──────────────────────────────────────────────────────────────

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: ${getThemePropSelector('backgroundLevel4')};
  overflow: hidden;
  min-width: 0;
`;

// ─── Simple Tabs (no react-router) ────────────────────────────────────────────

const TabBar = styled.div`
  display: flex;
  align-items: center;
  background: ${getThemePropSelector('backgroundLevel3')};
  padding-top: 2px;
  flex-shrink: 0;
`;

const TabItem = styled.button<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 ${spacing.r24};
  height: 40px;
  background: ${({ active, theme }) =>
    active
      ? (theme as CoreUITheme).backgroundLevel4
      : (theme as CoreUITheme).backgroundLevel3};
  border: none;
  cursor: pointer;
  border-radius: 4px 4px 0 0;
  color: ${({ active, theme }) =>
    active
      ? (theme as CoreUITheme).textPrimary
      : (theme as CoreUITheme).textSecondary};
  font-size: 14px;
  font-family: 'Lato', sans-serif;
  white-space: nowrap;
`;

const TabActiveBar = styled.div<{ active?: boolean }>`
  height: 2px;
  width: 32px;
  border-radius: 2px;
  background: ${({ active, theme }) =>
    active ? (theme as CoreUITheme).selectedActive : 'transparent'};
  margin-top: 2px;
`;

const TabSep = styled.div`
  width: 1px;
  height: 16px;
  background: #336;
`;

const TabContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${spacing.r16};
  padding: ${spacing.r16};
  background: ${getThemePropSelector('backgroundLevel4')};
  overflow-y: auto;
`;

// ─── Properties panel ─────────────────────────────────────────────────────────

const PropertiesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.r8};
`;

const PropRow = styled.div`
  display: flex;
  align-items: flex-start;
`;

const PropLabel = styled.div`
  width: 160px;
  flex-shrink: 0;
`;

const DangerButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
  height: 32px;
  padding: 0 ${spacing.r8};
  background: #3d0808;
  border: none;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  color: #e84855;
  font-size: 14px;
  font-family: 'Lato', sans-serif;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  white-space: nowrap;
`;

// ─── Mock data ────────────────────────────────────────────────────────────────

type Bucket = {
  id: string;
  name: string;
  location: string;
  dataUsed: string;
  createdOn: string;
};

const buckets: Bucket[] = [
  { id: '0', name: 'bucket-name-02', location: 'us-east-1 / Storage Service', dataUsed: '1.6 TiB', createdOn: '2025-10-23 14:48:09' },
  { id: '1', name: 'bucket-name-02', location: 'us-east-1 / Storage Service', dataUsed: '3.5 TiB', createdOn: '2025-02-18 18:43:50' },
  { id: '2', name: 'bucket-name-03', location: 'us-east-1 / Storage Service', dataUsed: '2.1 TiB', createdOn: '2025-02-18 18:26:41' },
  { id: '3', name: 'bucket-name-04', location: 'us-east-1 / Storage Service', dataUsed: '2.0 TiB', createdOn: '2025-02-18 18:26:41' },
  { id: '4', name: 'bucket-name-05', location: 'us-east-1 / Storage Service', dataUsed: '1.8 TiB', createdOn: '2025-02-18 18:33:47' },
  { id: '5', name: 'bucket-name-06', location: 'us-east-1 / Storage Service', dataUsed: '13.1 TiB', createdOn: '2025-02-18 19:02:17' },
];

const BucketLink = styled.span`
  color: #71aeff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const bucketColumns: Column<Bucket>[] = [
  {
    Header: 'Bucket Name',
    accessor: 'name',
    cellStyle: { width: 'unset', flex: 2.5, textAlign: 'left' },
    Cell: ({ value }: { value: string }) => <BucketLink>{value}</BucketLink>,
  },
  {
    Header: 'Storage Location',
    accessor: 'location',
    cellStyle: { width: 'unset', flex: 2.5, textAlign: 'left' },
  },
  {
    Header: 'Data Used',
    accessor: 'dataUsed',
    cellStyle: { width: 'unset', flex: 1, textAlign: 'right', paddingRight: 8 },
    Cell: ({ value }: { value: string }) => (
      <div style={{ width: '100%', textAlign: 'right', paddingRight: 8 }}>{value}</div>
    ),
  },
  {
    Header: 'Created on',
    accessor: 'createdOn',
    cellStyle: { width: 'unset', flex: 2, textAlign: 'right', paddingRight: 8 },
    Cell: ({ value }: { value: string }) => (
      <div style={{ width: '100%', textAlign: 'right', paddingRight: 8 }}>{value}</div>
    ),
  },
];

// ─── Story component ──────────────────────────────────────────────────────────

const ZenkoDataBrowserBucketProperties = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [selectedBucketId, setSelectedBucketId] = useState('1');
  const [activeTab, setActiveTab] = useState<'overview' | 'workflow' | 'tags'>('overview');
  const [versioningEnabled, setVersioningEnabled] = useState(true);

  const selectedBucket = buckets.find((b) => b.id === selectedBucketId) ?? buckets[1];

  return (
    <PageWrapper>
      <Navbar
        tabs={[
          { title: 'Overview' },
          { title: 'Identity' },
          { title: 'Platform' },
          { title: 'Storage Services' },
          { title: 'Data Management', selected: true },
          { title: 'Alerts' },
        ]}
        rightActions={[
          {
            type: 'custom',
            render: () => (
              <button
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0 12px',
                  height: 48,
                  color: '#b5b5b5',
                  fontSize: 18,
                }}
                aria-label="Notifications"
              >
                <i className="fas fa-bell" />
              </button>
            ),
          },
          {
            type: 'dropdown',
            icon: <i className="fas fa-user-cog" style={{ fontSize: 14 }} />,
            text: 'Robin Diemer - Platform Admin',
            items: [
              { label: 'My account', onClick: () => {} },
              { label: 'Sign out', onClick: () => {} },
            ],
          },
        ]}
      />

      <MainContainer>
        {/* ── Side nav ── */}
        <Sidebar
          expanded={sidebarExpanded}
          onToggleClick={() => setSidebarExpanded((v) => !v)}
          actions={[
            {
              label: 'Accounts',
              onClick: () => {},
              icon: <i className="fas fa-wallet" />,
            },
            {
              label: 'Data Browser',
              onClick: () => {},
              active: true,
              icon: <i className="fas fa-glass-whiskey" />,
            },
            {
              label: 'Workflows',
              onClick: () => {},
              icon: <i className="fas fa-route" />,
            },
            {
              label: 'Locations',
              onClick: () => {},
              icon: <i className="fas fa-map-marker-alt" />,
            },
            {
              label: 'Data Services',
              onClick: () => {},
              icon: <i className="fas fa-cubes" />,
            },
          ]}
        />

        {/* ── Main content ── */}
        <ContentContainer>
          {/* Breadcrumb */}
          <TitleBar>
            <BreadcrumbBtn>
              <i className="fas fa-wallet" style={{ fontSize: 14 }} />
              account
              <i className="fas fa-chevron-down" style={{ fontSize: 12 }} />
            </BreadcrumbBtn>
            <BreadcrumbSeparator>
              <i className="fas fa-chevron-right" style={{ fontSize: 12 }} />
            </BreadcrumbSeparator>
            <Text variant="Basic">All Buckets</Text>
          </TitleBar>

          {/* Summary header */}
          <Summary>
            <HeroIconWrapper>
              <i
                className="fas fa-glass-whiskey"
                style={{ fontSize: 28, color: '#8e8eac' }}
              />
            </HeroIconWrapper>
            <Stack gap="r8" style={{ alignItems: 'baseline' }}>
              <Text style={{ fontSize: 20, lineHeight: '32px' }}>All buckets</Text>
              <TextBadge text="6" variant="infoPrimary" />
            </Stack>
          </Summary>

          {/* Content: left table + right panel */}
          <ContentArea>
            {/* Left panel: table */}
            <LeftPanel>
              <SearchActionsBar>
                <Stack gap="r8" style={{ alignItems: 'center' }}>
                  <Stack direction="vertical" gap="r0">
                    <Text variant="Basic">Total:</Text>
                    <Text isEmphazed>6 buckets</Text>
                  </Stack>
                  <SearchField>
                    <i
                      className="fas fa-search"
                      style={{ fontSize: 14, color: '#eaeaea' }}
                    />
                    <SearchInput placeholder="Example: Search" />
                  </SearchField>
                </Stack>
                <Stack gap="r8">
                  <Button variant="secondary" label="Start ISV Connector" />
                  <Button
                    variant="primary"
                    label="Create Bucket"
                    icon={<i className="fas fa-plus" style={{ fontSize: 12 }} />}
                  />
                </Stack>
              </SearchActionsBar>

              <TableContainer>
                <Table
                  columns={bucketColumns}
                  data={buckets}
                  defaultSortingKey="name"
                  getRowId={(row: Bucket) => row.id}
                >
                  <Table.SingleSelectableContent
                    rowHeight="h48"
                    separationLineVariant="backgroundLevel1"
                    selectedId={selectedBucketId}
                    onRowSelected={(row) => setSelectedBucketId(row.id)}
                  />
                </Table>
              </TableContainer>
            </LeftPanel>

            {/* Right panel: properties */}
            <RightPanel>
              <TabBar>
                <TabItem
                  active={activeTab === 'overview'}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                  <TabActiveBar active={activeTab === 'overview'} />
                </TabItem>
                <TabSep />
                <TabItem
                  active={activeTab === 'workflow'}
                  onClick={() => setActiveTab('workflow')}
                >
                  Workflow
                  <TabActiveBar active={activeTab === 'workflow'} />
                </TabItem>
                <TabSep />
                <TabItem
                  active={activeTab === 'tags'}
                  onClick={() => setActiveTab('tags')}
                >
                  Tags
                  <TabActiveBar active={activeTab === 'tags'} />
                </TabItem>
                <TabSep />
              </TabBar>

              <TabContent>
                {/* Action buttons */}
                <Stack gap="r8" style={{ justifyContent: 'flex-end' }}>
                  <DangerButton>
                    <i className="fas fa-eraser" />
                    Empty Bucket
                  </DangerButton>
                  <DangerButton disabled>
                    <i className="fas fa-arrow-right" />
                    Delete Bucket
                  </DangerButton>
                </Stack>

                {/* General */}
                <PropertiesSection>
                  <Text variant="Large">General</Text>
                  <PropRow>
                    <PropLabel>
                      <Text variant="Basic" color="textSecondary">Name</Text>
                    </PropLabel>
                    <Text variant="Basic">{selectedBucket.name}</Text>
                  </PropRow>
                  <PropRow>
                    <PropLabel>
                      <Text variant="Basic" color="textSecondary">Versioning</Text>
                    </PropLabel>
                    <Toggle
                      toggle={versioningEnabled}
                      onChange={(e) => setVersioningEnabled(e.target.checked)}
                      label={versioningEnabled ? 'Active' : 'Inactive'}
                    />
                  </PropRow>
                  <PropRow>
                    <PropLabel>
                      <Text variant="Basic" color="textSecondary">Location</Text>
                    </PropLabel>
                    <Text variant="Basic">us-east-1 / Storage Service for ARTESCA</Text>
                  </PropRow>
                </PropertiesSection>

                {/* Permissions */}
                <PropertiesSection>
                  <Text variant="Large">Permissions</Text>
                  <PropRow>
                    <PropLabel>
                      <Text variant="Basic" color="textSecondary">Owner</Text>
                    </PropLabel>
                    <Text variant="Basic">Alex Hay</Text>
                  </PropRow>
                  <PropRow>
                    <PropLabel>
                      <Text variant="Basic" color="textSecondary">ACL</Text>
                    </PropLabel>
                    <Text variant="Basic">1 Grantee</Text>
                  </PropRow>
                  <PropRow>
                    <PropLabel>
                      <Text variant="Basic" color="textSecondary">CORS</Text>
                    </PropLabel>
                    <Text variant="Basic">No</Text>
                  </PropRow>
                  <PropRow>
                    <PropLabel>
                      <Text variant="Basic" color="textSecondary">Public</Text>
                    </PropLabel>
                    <Text variant="Basic">No</Text>
                  </PropRow>
                </PropertiesSection>
              </TabContent>
            </RightPanel>
          </ContentArea>
        </ContentContainer>
      </MainContainer>
    </PageWrapper>
  );
};

// ─── Storybook meta ───────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Templates/Zenko Data Browser - Bucket Properties',
  parameters: {
    layout: 'fullscreen',
    fullPage: true,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <ZenkoDataBrowserBucketProperties />,
};
