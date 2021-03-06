import React from 'react';
import TextBadge from '../src/lib/components/textbadge/TextBadge.component';
import Tabs, { Tab } from '../src/lib/components/tabsv2/Tabsv2.component';
import { Wrapper, Title } from './common';
import { BrowserRouter } from 'react-router-dom';
import { brand, spacing } from '../src/lib/style/theme';
import styled from 'styled-components';

const Content = styled.div`
  padding: ${spacing.sp24};
  color: ${(props) => props.theme.textPrimary};
`;

export default {
  title: 'Components/v2/Tabs',
  component: Tabs,
};

const messages = [
  'Really long',
  'Long',
  'Really long long long long long',
  'Hello',
  'Metalk8s',
  'ZENKO-UI',
];

const generateTab = (n = 10, selectedIndex = 0) => {
  return Array.from(new Array(n)).map((_, index) => (
    <Tab
      key={index}
      path={index === selectedIndex ? '/iframe.html' : `/path${index}`}
      exact={index !== 0}
      label={`Tab ${index}${
        messages.length > index ? ` ${messages[index]}` : ''
      }`}
      textBadge={index % 3 === 0 ? <TextBadge text="0" /> : null}
    >
      <Content>Content {index}</Content>
    </Tab>
  ));
};

const customTabStyle = {
  activeTabColor: brand.selectedActive,
  activeTabSeparator: brand.statusHealthy,
  tabLineColor: brand.backgroundLevel3,
  inactiveTabColor: brand.highlight,
  tabContentColor: brand.buttonPrimary,
  separatorColor: brand.statusCritical,
  tabHoverColor: brand.statusHealthy,
};

export const Default = () => (
  <Wrapper>
    <BrowserRouter>
      <Title>Default Tabs</Title>
      <Tabs>
        <Tab path="/iframe.html" label="Users">
          <Content>Users Content</Content>
        </Tab>
        <Tab path="/path1" label="Groups">
          <Content>Groups Content</Content>
        </Tab>
        <Tab path="/path2" label="Roles">
          <Content>Roles Content</Content>
        </Tab>
        <Tab path="/path3" label="Policies">
          <Content>Policies Content</Content>
        </Tab>
        <Tab path="/path4" label="Storage Location">
          <Content>Storage Location Content</Content>
        </Tab>
        <Tab path="/path5" label="Properties">
          <Content>Properties Content</Content>
        </Tab>
      </Tabs>
      <Title>Customized Tabs</Title>
      <Tabs {...customTabStyle}>
        <Tab path="/iframe.html" label="Users">
          <Content>Users Content</Content>
        </Tab>
        <Tab path="/path1" label="Groups">
          <Content>Groups Content</Content>
        </Tab>
        <Tab path="/path2" label="Roles">
          <Content>Roles Content</Content>
        </Tab>
        <Tab path="/path3" label="Policies">
          <Content>Policies Content</Content>
        </Tab>
        <Tab path="/path4" label="Storage Location">
          <Content>Storage Location Content</Content>
        </Tab>
        <Tab path="/path5" label="Properties">
          <Content>Properties Content</Content>
        </Tab>
      </Tabs>
    </BrowserRouter>
  </Wrapper>
);

export const ScrollableTabs = () => (
  <Wrapper>
    <BrowserRouter>
      <Title>Default Tabs - scrollable 10 tabs</Title>
      <Tabs>{generateTab(10, 10)}</Tabs>
      <Title>Default Tabs - scrollable 20 tabs</Title>
      <Tabs>{generateTab(20, 10)}</Tabs>
      <Title>Default Tabs - scrollable 35 tabs</Title>
      <Tabs>{generateTab(35, 10)}</Tabs>
    </BrowserRouter>
  </Wrapper>
);
