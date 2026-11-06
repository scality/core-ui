import { useContext } from 'react';
import { TabsContext } from './Tabsv2.component';
export type Query = Record<string, string>;

export type TabPadding = 'all' | 'exceptRight' | 'none';

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
  /**
   * Which sides of its inset the tab gives this content. Defaults to `'all'`.
   *
   * - `'all'` — content that owns none of its own edges and leaves all four to
   *   the tab.
   * - `'exceptRight'` — content that owns its right edge because it scrolls
   *   itself and reserves a gutter for its scrollbar. A `Form` with
   *   `layout={{ kind: 'tab' }}` is the case to recognise: a fixed header with
   *   the fields scrolling under it. Left on `'all'`, the tab's inset stacks on
   *   the form's own and the scrollbar sits in the middle of a gap.
   * - `'none'` — content that draws to the tab's frame on all four sides: a
   *   table or a list, or anything painting its own background.
   */
  padding?: TabPadding;
  /** @deprecated Use `padding="none"`. Ignored when `padding` is also set. */
  withoutPadding?: boolean;
};

function Tab(_: TabProps) {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('Tab cannot be rendered outside the Tabs component');
  }

  return null;
}

export { Tab };
