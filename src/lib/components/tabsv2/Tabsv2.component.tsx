import React, { createContext, useEffect, useState, useCallback } from 'react';
import { Element, ChildrenArray } from 'react';
import {
  TabBar,
  ScrollableContainer,
  TabContent,
  TabItem,
  TabsContainer,
  TabsScroller,
} from './StyledTabs';
import { useHistory, useLocation } from 'react-router-dom';
import { matchPath, Route, Switch } from 'react-router';
import { SecondaryText, BasicText, EmphaseText } from '../text/Text.component';
import ScrollButton from './ScrollButton';
import Tab from './Tab';
import { TabProps, Query } from './Tab';
import useScrollingTabs from './useScrollingTabs';
type TabsProps = {
  activeTabColor?: string;
  activeTabSeparator?: string;
  tabLineColor?: string;
  inactiveTabColor?: string;
  tabContentColor?: string;
  separatorColor?: string;
  tabHoverColor?: string;
  children: ChildrenArray<Element<typeof Tab>>;
  className?: string;
};
export const TabsContext = createContext<boolean>(false);

function Tabs({
  activeTabColor,
  activeTabSeparator,
  tabLineColor,
  inactiveTabColor,
  tabContentColor,
  separatorColor,
  tabHoverColor,
  children,
  className,
  ...rest
}: TabsProps) {
  const location = useLocation();
  const history = useHistory();
  const [selectedTabIndex, setSelectedTabIndex] = useState<
    number | null | undefined
  >(null);
  const queryURL = new URLSearchParams(location.search);
  const filteredTabsChildren = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === Tab,
  );
  const matchQuery = useCallback(
    (query: Query): boolean => {
      for (const key of Object.keys(query)) {
        // To support the case of {tab:null}
        if (queryURL.get(key) === null && !query[key]) {
          return true;
        }

        if (
          !(
            queryURL.has(key) &&
            decodeURIComponent(queryURL.get(key) || '') === query[key]
          )
        )
          return false;
      }

      return true;
    },
    [queryURL],
  );

  const serialize = (query?: Query): string => {
    if (!query) {
      return '';
    } else {
      const o = Object.fromEntries(
        Object.entries(query).filter(([_, v]) => v != null),
      );
      //$FlowFixMe
      return '?' + new URLSearchParams(o).toString();
    }
  };

  const getPushHistoryPath = (path: string, query?: Query): string =>
    `${path}${serialize(query)}`;

  useEffect(() => {
    let hasSelectedTab = false;
    filteredTabsChildren.forEach((child, index) => {
      const isSelected =
        !!matchPath(location.pathname, {
          path: child.props.path,
          exact: child.props.exact,
          strict: child.props.strict,
          sensitive: child.props.sensitive,
        }) && (child.props.query ? matchQuery(child.props.query) : true);

      if (isSelected) {
        setSelectedTabIndex(index);
        hasSelectedTab = true;
      }
    });
    if (!hasSelectedTab) setSelectedTabIndex(null);
  }, [location.pathname, filteredTabsChildren, matchQuery]);
  const {
    scrollButtonEndRef,
    scrollButtonStartRef,
    tabsListRef,
    tabsRef,
    handleStartScrollClick,
    handleEndScrollClick,
    handleTabsScroll,
    handleKeyDown,
    displayScroll,
  } = useScrollingTabs(selectedTabIndex);
  const tabItems = filteredTabsChildren.map((child, index) => {
    const {
      path,
      query,
      label,
      textBadge,
      children,
      ...childRest
    }: TabProps = child.props;
    const isSelected = selectedTabIndex === index;
    return (
      <TabItem
        className={`sc-tabs-item ${isSelected ? 'selected' : ''}`}
        key={index}
        role="tab"
        onClick={() => history.push(getPushHistoryPath(path, query))}
        selected={isSelected}
        tabHoverColor={tabHoverColor}
        inactiveTabColor={inactiveTabColor}
        activeTabColor={activeTabColor}
        activeTabSeparator={activeTabSeparator}
        tabIndex={isSelected ? 0 : -1}
        onKeyDown={(event) => {
          if (
            event.key === ' ' ||
            event.key === 'Enter' ||
            event.key === 'Spacebar'
          ) {
            event.preventDefault();
            history.push(getPushHistoryPath(path, query));
          }
        }}
        {...childRest}
      >
        {isSelected ? (
          <BasicText className="sc-tabs-item-title">{label}</BasicText>
        ) : (
          <SecondaryText className="sc-tabs-item-title">{label}</SecondaryText>
        )}
        {textBadge && (
          <EmphaseText className="sc-tabs-item-icon">{textBadge}</EmphaseText>
        )}
      </TabItem>
    );
  });
  return (
    <TabsContext.Provider value={true}>
      <TabsContainer
        className={['sc-tabs', className].join(' ')}
        tabLineColor={tabLineColor}
        separatorColor={separatorColor}
        {...rest}
      >
        <ScrollableContainer>
          {displayScroll.start && (
            <ScrollButton
              ref={scrollButtonStartRef}
              direction="left"
              onClick={handleStartScrollClick}
            />
          )}
          <TabsScroller ref={tabsRef} onScroll={handleTabsScroll}>
            <TabBar
              onKeyDown={handleKeyDown}
              ref={tabsListRef}
              className="sc-tabs-bar"
              role="tablist"
            >
              {tabItems}
            </TabBar>
          </TabsScroller>
          {displayScroll.end && (
            <ScrollButton
              ref={scrollButtonEndRef}
              direction="right"
              onClick={handleEndScrollClick}
            />
          )}
        </ScrollableContainer>
        <TabContent
          className="sc-tabs-item-content"
          tabContentColor={tabContentColor}
        >
          <Switch>
            {filteredTabsChildren.map((tab: Element<typeof Tab>, index) => (
              <Route
                exact={tab.props.exact}
                sensitive={tab.props.sensitive}
                strict={tab.props.strict}
                key={index}
                path={tab.props.path}
              >
                {tab.props.children}
              </Route>
            ))}
          </Switch>
        </TabContent>
      </TabsContainer>
    </TabsContext.Provider>
  );
}

Tabs.Tab = Tab;
// re-export Tab
export { Tab };
export default Tabs;
