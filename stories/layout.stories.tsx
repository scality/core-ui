import React, { useState } from 'react';
import { Layout } from '../src/lib/components/layout/Layout.component';
import { Layout as Layout2 } from '../src/lib/components/layout/v2';
import { TwoPanelLayout } from '../src/lib/components/layout/v2/panels';
import { AppContainer } from '../src/lib/components/layout/v2/AppContainer';
import { Loader } from '../src/lib/components/loader/Loader.component';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import { Stack } from '../src/lib/spacing';
import { Icon } from '../src/lib/components/icon/Icon.component';
import { Link, Text } from '../src/lib/components/text/Text.component';
import { TextBadge } from '../src/lib/components/textbadge/TextBadge.component';
import { Breadcrumb } from '../src/lib/components/breadcrumb/Breadcrumb.component';
import { ScrollbarWrapper } from '../src/lib/components/scrollbarwrapper/ScrollbarWrapper.component';
import { DefaultSidebar } from './sidebar.stories';
import { Meta } from '@storybook/react';

const sideBarActions = [
  {
    label: 'Dashboard',
    icon: <i className="fas fa-tachometer-alt" />,
    onClick: action('dashboard clicked'),
    active: true,
    'data-cy': 'Dashboard',
  },
  {
    label: 'Servers',
    icon: <i className="fas fa-server" />,
    onClick: action('server clicked'),
    'data-cy': 'Servers',
  },
  {
    label: 'Disks',
    icon: <i className="fas fa-hdd" />,
    onClick: action('disk clicked'),
    'data-cy': 'Disks',
  },
];
const rightActions = [
  {
    type: 'dropdown',
    text: 'FR',
    icon: <i className="fas fa-globe" />,
    items: [
      {
        label: 'English',
        name: 'EN',
        onClick: action('English selected'),
      },
    ],
  },
  {
    type: 'dropdown',
    icon: <i className="fas fa-th" />,
    items: [
      {
        label: 'Hyperdrive UI',
        onClick: action('Hyperdrive UI clicked'),
      },
    ],
  },
  {
    type: 'dropdown',
    icon: <i className="fas fa-question-circle" />,
    items: [
      {
        label: 'About',
        onClick: action('About clicked'),
      },
      {
        label: 'Documentation',
        onClick: action('Documentation clicked'),
      },
      {
        label: 'Onboarding',
        onClick: action('Onboarding clicked'),
      },
    ],
  },
  {
    type: 'dropdown',
    text: 'Carlito',
    icon: <i className="fas fa-user" />,
    items: [
      {
        label: 'Log out',
        onClick: action('Logout clicked'),
      },
    ],
  },
];
// const  meta: Meta<typeof Layout> = {
//   title: 'Components/Navigation/Layout',
//   component: Layout,
//   args:{
//     sidebar:{
//       actions: sideBarActions,
//     },
//     navbar:{
//       productName: 'Harware UI',
//       rightActions,
//     }
//   }
// };

const meta: Meta<typeof Layout2> = {
  title: 'Components/Navigation/Layout',
  component: Layout2,
  args: {},
};
export default meta;

const HeaderComponent = styled.div`
  background: #ff9c54;
  flex: 1;
  color: black;
}`;

export const Layout2SimplestV2 = {
  args: {
    children: (
      <AppContainer>
        <AppContainer.ContextContainer background="backgroundLevel1">
          <>Context bar</>
        </AppContainer.ContextContainer>
        <AppContainer.OverallSummary noPadding>
          <Stack withSeparators={true} gap="r32">
            <Stack gap="r20">
              <Icon name="Account" size="2x" withWrapper />
              <Stack direction="vertical" gap="r4">
                <Text variant="Larger">6 Accounts</Text>
                <Text variant="Smaller" color="textSecondary">
                  for this instance
                </Text>
              </Stack>
            </Stack>
            <Stack gap="r32">
              <Stack>
                <Icon name={'Check-circle'} color={'statusHealthy'} />
                <Text color="textSecondary">Replication</Text>
              </Stack>
              <Stack>
                <Icon name={'Check-circle'} color={'statusHealthy'} />
                <Text color="textSecondary">Expiration</Text>
              </Stack>
              <Stack>
                <Icon name={'Check-circle'} color={'statusHealthy'} />
                <Text color="textSecondary">Transition</Text>
              </Stack>
            </Stack>
            <Stack direction="vertical" gap="r4">
              <Stack gap="r4">
                <Text isEmphazed>Active Alerts</Text>
                <TextBadge text="0" variant="infoPrimary" />
              </Stack>
              <Text variant="Smaller" color="textSecondary">
                No active alerts
              </Text>
            </Stack>
          </Stack>
        </AppContainer.OverallSummary>
        <AppContainer.MainContent>Main content</AppContainer.MainContent>
      </AppContainer>
    ),
  },
};

export const Layout2Simplest = {
  render: () => {
    return (
      <Layout2
        headerNavigation={
          // <HeaderComponent>
          <h3>Header navigation</h3>
          // </HeaderComponent>
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
                  <Text variant="Larger">6 Accounts</Text>
                  <Text variant="Smaller" color="textSecondary">
                    for this instance
                  </Text>
                </Stack>
              </Stack>
              <Stack gap="r32">
                <Stack>
                  <Icon name={'Check-circle'} color={'statusHealthy'} />
                  <Text color="textSecondary">Replication</Text>
                </Stack>
                <Stack>
                  <Icon name={'Check-circle'} color={'statusHealthy'} />
                  <Text color="textSecondary">Expiration</Text>
                </Stack>
                <Stack>
                  <Icon name={'Check-circle'} color={'statusHealthy'} />
                  <Text color="textSecondary">Transition</Text>
                </Stack>
              </Stack>
              <Stack direction="vertical" gap="r4">
                <Stack gap="r4">
                  <Text isEmphazed>Active Alerts</Text>
                  <TextBadge text="0" variant="infoPrimary" />
                </Stack>
                <Text variant="Smaller" color="textSecondary">
                  No active alerts
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
