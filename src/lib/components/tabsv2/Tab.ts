import { useContext } from 'react';
import { TabsContext } from './Tabsv2.component';
export type Query = Record<string, string>;
export type TabProps = {
  path: string;
  query?: Query;
  label: JSX.Element | string;
  icon?: JSX.Element;
  textBadge?: JSX.Element;
  children: JSX.Element;
  className?: string;
  exact?: boolean;
  strict?: boolean;
  sensitive?: boolean;
};

function Tab(_: TabProps) {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('Tab cannot be rendered outside the Tabs component');
  }

  return null;
}

export { Tab };
