import React, { useState, createElement } from 'react';
import { Layout } from '../src/lib/components/layout/Layout.component';
import { Layout as Layout2 } from '../src/lib/components/layout/v2';
import { TwoPanelLayout } from '../src/lib/components/layout/v2/panels';
import { AppContainer } from '../src/lib/components/layout/v2/AppContainer';
import { Loader } from '../src/lib/components/loader/Loader.component';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { addDecorator } from '@storybook/react';
import styled from 'styled-components';

addDecorator(createElement);
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
export default {
  title: 'Components/Navigation/Layout',
  component: Layout,
  decorators: [withKnobs],
};

const HeaderComponent = styled.div`
  background: #ff9c54;
  flex: 1;
  color: black;
}`;

export const Layout2Simplest = ({}) => {
  return (
    <Layout2
      headerNavigation={
        <HeaderComponent>
          <h3>Header navigation</h3>
        </HeaderComponent>
      }
    >
      <AppContainer>
        <AppContainer.ContextContainer background="#95ca20">
          Context bar
        </AppContainer.ContextContainer>
        <AppContainer.OverallSummary>
          Overall summary (optional)
        </AppContainer.OverallSummary>
        <AppContainer.MainContent>Main content</AppContainer.MainContent>
      </AppContainer>
    </Layout2>
  );
};

export const Layout2SimplestWithMainContentPadding = ({}) => (
  <Layout2
    headerNavigation={
      <HeaderComponent>
        <h3>Header navigation</h3>
      </HeaderComponent>
    }
  >
    <AppContainer>
      <AppContainer.ContextContainer background="#95ca20">
        Context bar
      </AppContainer.ContextContainer>
      <AppContainer.OverallSummary>
        Overall summary (optional)
      </AppContainer.OverallSummary>
      <AppContainer.MainContent background="#ffcf75" hasPadding>
        Main content
      </AppContainer.MainContent>
    </AppContainer>
  </Layout2>
);

export const Layout2SimplestSidebar = ({}) => (
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
      <AppContainer.ContextContainer background="#95ca20">
        Context bar
      </AppContainer.ContextContainer>
      <AppContainer.OverallSummary>
        Overall summary (optional)
      </AppContainer.OverallSummary>
      <AppContainer.MainContent background="#ffcf75">
        Main content
      </AppContainer.MainContent>
    </AppContainer>
  </Layout2>
);

export const Layout2TwoEqualPanelsWithPadding = ({}) => (
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
      <AppContainer.ContextContainer background="#95ca20">
        Context bar
      </AppContainer.ContextContainer>
      <AppContainer.OverallSummary>
        Overall summary (optional)
      </AppContainer.OverallSummary>
      <AppContainer.MainContent background="#ffcf75">
        <TwoPanelLayout
          leftPanel={
            <div style={{ background: '#7171af' }}>Left Panel content</div>
          }
          rightPanel={
            <div style={{ background: '#e6c92f' }}>Right panel content</div>
          }
          panelsRatio="50-50"
        />
      </AppContainer.MainContent>
    </AppContainer>
  </Layout2>
);

export const Layout2TwoPanelsThirtySeventy = ({}) => (
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
      <AppContainer.ContextContainer background="#95ca20">
        Context bar
      </AppContainer.ContextContainer>
      <AppContainer.OverallSummary>
        Overall summary (optional)
      </AppContainer.OverallSummary>
      <AppContainer.MainContent background="#ffcf75">
        <TwoPanelLayout
          leftPanel={
            <div style={{ background: '#7171af' }}>
              Left Panel content (with padding)
            </div>
          }
          rightPanel={
            <div style={{ background: '#e6c92f', flex: 1 }}>
              Right panel content (element has flex: 1, thus the full width)
            </div>
          }
          panelsRatio="30-70"
        />
      </AppContainer.MainContent>
    </AppContainer>
  </Layout2>
);

export const Layout2TwoPanelsSeventyThirty = ({}) => (
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
      <AppContainer.ContextContainer background="#95ca20">
        Context bar
      </AppContainer.ContextContainer>
      <AppContainer.OverallSummary>
        <div>Overall summary (optional)</div>
      </AppContainer.OverallSummary>
      <AppContainer.MainContent background="#ffcf75">
        <TwoPanelLayout
          panelsRatio="70-30"
          leftPanel={
            <div style={{ background: '#7171af' }}>Left Panel content</div>
          }
          rightPanel={
            <div style={{ background: '#e6c92f' }}>Right panel content</div>
          }
        />
      </AppContainer.MainContent>
    </AppContainer>
  </Layout2>
);

export const SidebarDocked = ({}) => {
  const expanded = boolean('Sidebar Expanded', false);
  const sidebar = {
    expanded,
    actions: sideBarActions,
  };
  const navbar = {
    onToggleClick: action('toggle clicked'),
    productName: 'Harware UI',
    rightActions,
  };
  return (
    <Layout sidebar={sidebar} navbar={navbar}>
      <Loader size="massive" />
    </Layout>
  );
};
export const SidebarExpanded = ({}) => {
  const sidebar = {
    expanded: true,
    actions: sideBarActions,
  };
  const navbar = {
    onToggleClick: action('toggle clicked'),
    productName: 'Harware UI',
    rightActions,
  };
  return (
    <Layout sidebar={sidebar} navbar={navbar}>
      <Loader size="massive" />
    </Layout>
  );
};
export const SidebarWithToggle = ({}) => {
  const [expanded, setExpanded] = useState(false);
  const sidebar = {
    expanded: expanded,
    actions: sideBarActions,
    onToggleClick: () => setExpanded(!expanded),
  };
  const navbar = {
    productName: 'Harware UI',
    rightActions,
  };
  return (
    <Layout sidebar={sidebar} navbar={navbar}>
      <Loader size="massive" />
    </Layout>
  );
};
export const HoverableSidebar = ({}) => {
  const [expanded, setExpanded] = useState(false);
  const sidebar = {
    expanded: expanded,
    hoverable: true,
    actions: sideBarActions,
    onToggleClick: () => setExpanded(!expanded),
  };
  const navbar = {
    productName: 'Harware UI',
    rightActions,
  };
  return (
    <Layout sidebar={sidebar} navbar={navbar}>
      <Loader size="massive" />
    </Layout>
  );
};
