import React, { useState } from 'react';
import { TextBadge } from '../src/lib/components/textbadge/TextBadge.component';
import { Tabs } from '../src/lib/components/tabs/Tabs.component';
import { Wrapper, Title } from './common';
import { brand } from '../src/lib/style/theme';
export default {
  title: 'Components/Navigation/Tabs',
  component: Tabs,
};
export const Default = ({}) => {
  const [tabs, setTabs] = useState([
    {
      selected: true,
      title: (
        <span>
          <TextBadge text="1" variant="statusHealthy" />
          Metrics
        </span>
      ),
      onClick: () => selectTab(0),
    },
    {
      selected: false,
      title: 'Users',
      onClick: () => selectTab(1),
    },
    {
      selected: false,
      title: 'Groups',
      onClick: () => selectTab(2),
    },
    {
      selected: false,
      title: 'Roles',
      onClick: () => selectTab(3),
    },
    {
      selected: false,
      title: 'Policies',
      onClick: () => selectTab(4),
    },
    {
      selected: false,
      title: 'Storage Location',
      onClick: () => selectTab(5),
    },
    {
      selected: false,
      title: 'Properties',
      onClick: () => selectTab(6),
    },
  ]);

  const selectTab = (tabIdx) => {
    let newTabs = tabs.map((tab) => {
      tab.selected = false;
      return tab;
    });
    newTabs[tabIdx].selected = true;
    setTabs(newTabs);
  };

  return (
    <Wrapper>
      <Title>Default Tabs </Title>
      <Tabs items={tabs}>
        <Title>Content Here</Title>
      </Tabs>
      <Title>Customized Colors</Title>
      <Tabs
        items={tabs}
        activeTabColor={brand.selectedActive}
        activeTabSeparator={brand.statusHealthy}
        tabLineColor={brand.backgroundLevel3}
        inactiveTabColor={brand.highlight}
        tabContentColor={brand.buttonPrimary}
        separatorColor={brand.statusCritical}
        tabHoverColor={brand.statusHealthy}
      >
        <Title>Content Here</Title>
      </Tabs>
    </Wrapper>
  );
};
