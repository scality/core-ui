//@flow
import { useContext } from 'react';
import type { Element, Node } from 'react';
import TextBadge from '../textbadge/TextBadge.component';
import { TabsContext } from './Tabsv2.component';

export type TabProps = {
  path: string,
  label: string,
  textBadge?: Element<typeof TextBadge>,
  children: Node,
  className?: string,
  exact?: boolean,
  strict?: boolean,
  sensitive?: boolean,
};

function Tab(_: TabProps) {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('Tab cannot be rendered outside the Tabs component');
  }
  return null;
}

export default Tab;
