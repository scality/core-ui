import React from 'react';
import { Layout as Layout2 } from '../src/lib/components/layout/v2';
import { TwoPanelLayout } from '../src/lib/components/layout/v2/panels';
import { AppContainer } from '../src/lib/components/layout/v2/AppContainer';
import styled from 'styled-components';
import { Stack } from '../src/lib/spacing';
import { Icon } from '../src/lib/components/icon/Icon.component';
import { Link, Text } from '../src/lib/components/text/Text.component';
import { TextBadge } from '../src/lib/components/textbadge/TextBadge.component';
import { Breadcrumb } from '../src/lib/components/breadcrumb/Breadcrumb.component';
import { ScrollbarWrapper } from '../src/lib/components/scrollbarwrapper/ScrollbarWrapper.component';
import {
  Column,
  Table,
} from '../src/lib/components/tablev2/Tablev2.component';
import { Button } from '../src/lib/next';
import { BrowserRouter } from 'react-router-dom';
import { Meta } from '@storybook/react-webpack5';

const meta: Meta<typeof Layout2> = {
  title: 'Templates/Layout',
  component: Layout2,
  args: {},
  parameters: {
    docs: {
      // The guideline embeds stories whose demo header is an <h3>. Restricting
      // the table of contents to direct children keeps those out of it.
      toc: { headingSelector: '.sbdocs-content > h2, .sbdocs-content > h3' },
    },
  },
};
export default meta;

const HeaderComponent = styled.div`
  background: #ff9c54;
  flex: 1;
  color: black;
`;

const AppHeader = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  background: ${(props) => props.theme.backgroundLevel1};
  color: ${(props) => props.theme.textPrimary};
`;

const TableArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  min-height: 0;
`;

const TableToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  /* Matches the table's own cell padding so both edges line up. */
  padding: 0 0.25rem 0 1rem;
  margin: 1rem 0;
`;

type AccountRow = {
  id: string;
  name: string;
  owner: string;
  createdOn: string;
};

const accountData: AccountRow[] = [
  { id: '1', name: 'analytics-team', owner: 'Dana Moreau', createdOn: '2026-01-14 09:24' },
  { id: '2', name: 'archive-long-term', owner: 'Priya Raman', createdOn: '2025-11-02 17:03' },
  { id: '3', name: 'backup-primary', owner: 'Dana Moreau', createdOn: '2026-03-21 08:15' },
  { id: '4', name: 'media-delivery', owner: 'Tomas Lind', createdOn: '2024-09-09 14:47' },
  { id: '5', name: 'research-sandbox', owner: 'Priya Raman', createdOn: '2026-06-30 11:52' },
  { id: '6', name: 'shared-services', owner: 'Tomas Lind', createdOn: '2025-02-28 06:38' },
];

const accountColumns: Column<AccountRow>[] = [
  {
    Header: 'Name',
    accessor: 'name',
    cellStyle: { width: 'unset', flex: 2, textAlign: 'left' },
  },
  {
    Header: 'Owner',
    accessor: 'owner',
    cellStyle: { width: 'unset', flex: 2, textAlign: 'left' },
  },
  {
    Header: 'Created on',
    accessor: 'createdOn',
    cellStyle: { width: 'unset', flex: 1, textAlign: 'right' },
  },
];

export const ResourceListPage = {
  parameters: {
    // The story is a full page. Rendering it in a fixed-height frame keeps the
    // guideline readable while leaving "Show code" available.
    docs: { story: { inline: false, height: '520px' } },
  },
  render: () => (
    <BrowserRouter>
      <Layout2
        headerNavigation={
          <AppHeader>
            <Text isEmphazed>Product name</Text>
          </AppHeader>
        }
      >
        <AppContainer>
          <AppContainer.OverallSummary>
            <Stack gap="r20">
              <Icon name="Account" size="2x" withWrapper />
              <Text variant="Larger">Accounts</Text>
            </Stack>
          </AppContainer.OverallSummary>
          <AppContainer.MainContent>
            <TableArea>
              <Table
                columns={accountColumns}
                data={accountData}
                defaultSortingKey="name"
                entityName={{ en: { singular: 'account', plural: 'accounts' } }}
              >
                <TableToolbar>
                  <Table.SearchWithQueryParams />
                  <Button
                    variant="primary"
                    label="Create account"
                    icon={<Icon name="Create-add" />}
                  />
                </TableToolbar>
                <Table.SingleSelectableContent
                  rowHeight="h40"
                  separationLineVariant="backgroundLevel3"
                />
              </Table>
            </TableArea>
          </AppContainer.MainContent>
        </AppContainer>
      </Layout2>
    </BrowserRouter>
  ),
};

export const Layout2Simplest = {
  render: () => {
    return (
      <Layout2
        headerNavigation={
          <HeaderComponent>
            <h3>Header navigation</h3>
          </HeaderComponent>
        }
      >
        <AppContainer>
          <AppContainer.ContextContainer background="backgroundLevel1">
            <>Context bar</>
          </AppContainer.ContextContainer>
          <AppContainer.OverallSummary noPadding>
            <Stack withSeparators={true} gap="r32">
              <Stack gap="r20">
                <Icon name="Account" size="2x" withWrapper />
                <Stack direction="vertical" gap="r4">
                  <Text variant="Larger">Title</Text>
                  <Text variant="Smaller" color="textSecondary">
                    subtitle
                  </Text>
                </Stack>
              </Stack>
              <Stack gap="r32">
                <Stack>
                  <Icon name={'Check-circle'} color={'statusHealthy'} />
                  <Text color="textSecondary">Status 1</Text>
                </Stack>
                <Stack>
                  <Icon name={'Check-circle'} color={'statusHealthy'} />
                  <Text color="textSecondary">Status 2</Text>
                </Stack>
                <Stack>
                  <Icon name={'Check-circle'} color={'statusHealthy'} />
                  <Text color="textSecondary">Status 3</Text>
                </Stack>
              </Stack>
              <Stack direction="vertical" gap="r4">
                <Stack gap="r4">
                  <Text isEmphazed>Alerts</Text>
                  <TextBadge text="0" variant="infoPrimary" />
                </Stack>
                <Text variant="Smaller" color="textSecondary">
                  No alerts
                </Text>
              </Stack>
            </Stack>
          </AppContainer.OverallSummary>
          <AppContainer.MainContent>Main content</AppContainer.MainContent>
        </AppContainer>
      </Layout2>
    );
  },
};

export const Layout2SimplestWithMainContentPadding = {
  render: ({}) => (
    <Layout2
      headerNavigation={
        <HeaderComponent>
          <h3>Header navigation</h3>
        </HeaderComponent>
      }
    >
      <AppContainer>
        <AppContainer.ContextContainer background="backgroundLevel1">
          <>Context bar</>
        </AppContainer.ContextContainer>
        <AppContainer.OverallSummary>
          Overall summary (optional)
        </AppContainer.OverallSummary>
        <AppContainer.MainContent background="statusCritical" hasPadding>
          Main content
        </AppContainer.MainContent>
      </AppContainer>
    </Layout2>
  ),
};

export const Layout2MainContentOnly = {
  render: ({}) => (
    <Layout2
      headerNavigation={
        <HeaderComponent>
          <h3>Header navigation</h3>
        </HeaderComponent>
      }
    >
      <AppContainer>
        <AppContainer.MainContent background="statusCritical" hasTopMargin>
          Main content
        </AppContainer.MainContent>
      </AppContainer>
    </Layout2>
  ),
};

export const Layout2TransparentBackground = {
  render: () => (
    <Layout2
      variant='transparent'
      headerNavigation={
        <HeaderComponent>
          <h3>Header navigation</h3>
        </HeaderComponent>
      }
    >
      <AppContainer>
        <AppContainer.MainContent hasTopMargin>
          Main content
        </AppContainer.MainContent>
      </AppContainer>
    </Layout2>
  ),
};

export const Layout2OverallSummaryAndMainContent = {
  render: () => (
    <Layout2
      headerNavigation={
        <HeaderComponent>
          <h3>Header navigation</h3>
        </HeaderComponent>
      }
    >
      <ScrollbarWrapper>
        <AppContainer>
          <AppContainer.ContextContainer background="backgroundLevel1">
            <Breadcrumb
              paths={[
                <Link href="home">home</Link>,
                <Link href="cluster">cluster_1</Link>,
                <Link href="cluster">cluster_1</Link>,
                <Link href="cluster">cluster_1</Link>,
                <Link href="cluster">cluster_1</Link>,
                <Link href="cluster">cluster_1</Link>,
                <Link href="cluster">cluster_1</Link>,
                <Link href="cluster">cluster_1</Link>,
                <Link href="cluster">cluster_1</Link>,
                <Link href="cluster">cluster_1</Link>,
                <Link href="cluster">cluster_1</Link>,
                <Link href="cluster">cluster_1</Link>,
                <Link href="cluster">cluster_1</Link>,
                <Link href="cluster">cluster_1</Link>,
                <Link href="cluster">cluster_1</Link>,
                <Link
                  href="node"
                  title={'node_longlonglonglonglonglonglonglonglonglonglong'}
                >
                  node_longlonglonglonglonglonglonglonglonglonglong
                </Link>,
                <Link href="cluster">cluster_1</Link>,
                <Link href="cluster">cluster_1</Link>,
                <Link href="cluster">cluster_1</Link>,
                <Link href="cluster">cluster_1</Link>,
                <Link href="cluster">cluster_1</Link>,
                <Link href="cluster">cluster_1</Link>,
                <Link href="cluster">cluster_1</Link>,
                <Link href="cluster">cluster_1</Link>,
                <Link href="cluster">cluster_1</Link>,
                <Link href="cluster">cluster_1</Link>,
                <Link href="cluster">cluster_1</Link>,
                <Link href="cluster">cluster_1</Link>,
                <Text>volumes</Text>,
              ]}
            />
          </AppContainer.ContextContainer>
          <AppContainer.OverallSummary hasTopMargin>
            Overall summary (optional)
          </AppContainer.OverallSummary>
          <AppContainer.MainContent background="statusCritical">
            Main content
          </AppContainer.MainContent>
        </AppContainer>
      </ScrollbarWrapper>
    </Layout2>
  ),
};

export const Layout2SimplestSidebar = {
  render: ({}) => (
    <Layout2
      headerNavigation={
        <HeaderComponent>
          <h3>Header navigation</h3>
        </HeaderComponent>
      }
    >
      <AppContainer
        sidebarNavigation={
          <div style={{ background: '#fff3e8' }}>Sidebar navigation</div>
        }
      >
        <AppContainer.ContextContainer background="backgroundLevel1">
          <>Context bar</>
        </AppContainer.ContextContainer>
        <AppContainer.OverallSummary>
          Overall summary (optional)
        </AppContainer.OverallSummary>
        <AppContainer.MainContent background="statusCritical">
          Main content
        </AppContainer.MainContent>
      </AppContainer>
    </Layout2>
  ),
};

export const Layout2TwoEqualPanelsWithPadding = {
  render: () => (
    <Layout2
      headerNavigation={
        <HeaderComponent>
          <h3>Header navigation</h3>
        </HeaderComponent>
      }
    >
      <AppContainer
        sidebarNavigation={
          <div style={{ background: '#fff3e8' }}>Navigation</div>
        }
      >
        <AppContainer.ContextContainer background="backgroundLevel1">
          <>Context bar</>
        </AppContainer.ContextContainer>
        <AppContainer.OverallSummary>
          Overall summary (optional)
        </AppContainer.OverallSummary>
        <AppContainer.MainContent>
          <TwoPanelLayout
            panelsRatio="50-50"
            leftPanel={{
              children: <div style={{ flex: 1 }}>Left Panel content</div>,
              background: 'backgroundLevel3',
            }}
            rightPanel={{
              children: <div style={{ flex: 1 }}>Right Panel content</div>,
              background: 'backgroundLevel4',
            }}
          />
        </AppContainer.MainContent>
      </AppContainer>
    </Layout2>
  ),
};

export const Layout2TwoPanelsThirtySeventy = {
  render: () => (
    <Layout2
      headerNavigation={
        <HeaderComponent>
          <h3>Header navigation</h3>
        </HeaderComponent>
      }
    >
      <AppContainer
        sidebarNavigation={
          <div style={{ background: '#fff3e8' }}>Navigation</div>
        }
      >
        <AppContainer.ContextContainer background="backgroundLevel1">
          <>Context bar</>
        </AppContainer.ContextContainer>
        <AppContainer.OverallSummary>
          Overall summary (optional)
        </AppContainer.OverallSummary>
        <AppContainer.MainContent background="statusCritical">
          <TwoPanelLayout
            panelsRatio="30-70"
            leftPanel={{
              children: <div style={{ flex: 1 }}>Left Panel content</div>,
              background: 'backgroundLevel3',
            }}
            rightPanel={{
              children: <div style={{ flex: 1 }}>Right Panel content</div>,
              background: 'backgroundLevel4',
            }}
          />
        </AppContainer.MainContent>
      </AppContainer>
    </Layout2>
  ),
};

export const Layout2TwoPanelsSeventyThirty = {
  render: () => (
    <Layout2
      headerNavigation={
        <HeaderComponent>
          <h3>Header navigation</h3>
        </HeaderComponent>
      }
    >
      <AppContainer
        sidebarNavigation={
          <div style={{ background: '#fff3e8' }}>Navigation</div>
        }
      >
        <AppContainer.ContextContainer background="backgroundLevel1">
          <>Context bar</>
        </AppContainer.ContextContainer>
        <AppContainer.OverallSummary>
          <div>Overall summary (optional)</div>
        </AppContainer.OverallSummary>
        <AppContainer.MainContent background="selectedActive">
          <TwoPanelLayout
            panelsRatio="65-35"
            leftPanel={{
              children: <div style={{ flex: 1 }}>Left Panel content</div>,
              background: 'backgroundLevel3',
            }}
            rightPanel={{
              children: <div style={{ flex: 1 }}>Right Panel content</div>,
              background: 'backgroundLevel4',
            }}
          />
        </AppContainer.MainContent>
      </AppContainer>
    </Layout2>
  ),
};
