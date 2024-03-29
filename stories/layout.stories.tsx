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
import { Meta } from '@storybook/react';

const meta: Meta<typeof Layout2> = {
  title: 'Templates/Layout',
  component: Layout2,
  args: {},
};
export default meta;

const HeaderComponent = styled.div`
  background: #ff9c54;
  flex: 1;
  color: black;
`;

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
