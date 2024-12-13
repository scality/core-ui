import React, {
  createContext,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import styled from 'styled-components';
import { ButtonIcon } from '../buttonv2/Buttonv2.component';
import { BasicText, EmphaseText, SecondaryText } from '../text/Text.component';
import { ScrollButton } from './ScrollButton';
import {
  ScrollableContainer,
  TabBar,
  TabContent,
  TabItem,
  TabsContainer,
  TabsScroller,
} from './StyledTabs';
import { Query, Tab, TabProps } from './Tab';
import { useScrollingTabs } from './useScrollingTabs';

type TabsProps = {
  activeTabColor?: string;
  activeTabSeparator?: string;
  tabLineColor?: string;
  inactiveTabColor?: string;
  tabContentColor?: string;
  separatorColor?: string;
  tabHoverColor?: string;
  children: ReactElement<TabProps>[];
  className?: string;
};
export const TabsContext = createContext<boolean>(false);

const TabIcon = styled(ButtonIcon)`
  color: ${(props) => props.theme.textSecondary};
`;

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
  const navigate = useNavigate();
  const url = location.pathname;
  const [selectedTabIndex, setSelectedTabIndex] = useState<
    number | null | undefined
  >(null);
  const queryURL = new URLSearchParams(location.search);
  const filteredTabsChildren: ReactElement<TabProps>[] = React.Children.toArray(
    children,
  ).filter(
    (child) => React.isValidElement(child) && child.type === Tab,
  ) as ReactElement<TabProps>[];

  const matchQuery = useCallback(
    (query: Query): boolean => {
      for (const key of Object.keys(query)) {
        // To support the case of {tab:null}
        if (queryURL.get(key) === null && !query[key]) {
          return true;
        }

        if (!(queryURL.has(key) && queryURL.get(key) === query[key]))
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

  const getPushHistoryPath = (path: string, query?: Query): string => {
    const sanitizedSegment = path.replace(/^\/+/, '');
    const replaceUrl = location.pathname.replace(/[^/]+$/, sanitizedSegment);

    if (path.startsWith('/')) {
      return `${replaceUrl}${serialize(query)}`;
    }

    return `${replaceUrl}/${path}${serialize(query)}`;
  };

  useEffect(() => {
    let hasSelectedTab = false;
    filteredTabsChildren.forEach((child, index) => {
      const fullPath = child.props.path.startsWith('/')
        ? child.props.path
        : url + '/' + child.props.path;

      const isSelected =
        location.pathname.match(new RegExp(`^${fullPath}$`, 'i')) &&
        (child.props.query ? matchQuery(child.props.query) : true);

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
      icon,
      ...childRest
    }: TabProps = child.props;
    const isSelected = selectedTabIndex === index;
    const realPath = `/${path.split('/').pop()}`;
    return (
      <TabItem
        className={`sc-tabs-item ${isSelected ? 'selected' : ''}`}
        key={index}
        role="tab"
        onClick={() => navigate(getPushHistoryPath(realPath, query))}
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
            navigate(getPushHistoryPath(realPath, query));
          }
        }}
        {...childRest}
      >
        {icon && <TabIcon label={label}>{icon}</TabIcon>}
        {isSelected ? (
          <BasicText>{label}</BasicText>
        ) : (
          <SecondaryText>{label}</SecondaryText>
        )}
        {textBadge && <EmphaseText>{textBadge}</EmphaseText>}
      </TabItem>
    );
  });
  return (
    <TabsContext.Provider value={true}>
      <TabsContainer
        style={{ containerType: 'size' }}
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
        <Routes>
          {filteredTabsChildren.map((tab, index) => {
            const path = tab.props.path.split('/').pop();
            return (
              <Route
                key={index}
                path={`/${path}`}
                element={
                  <>
                    <TabContent
                      className="sc-tabs-item-content"
                      tabContentColor={tabContentColor}
                      withoutPadding={tab.props.withoutPadding}
                    >
                      {tab.props.children}
                    </TabContent>
                    <Outlet />
                  </>
                }
              />
            );
          })}
        </Routes>
      </TabsContainer>
    </TabsContext.Provider>
  );
}

Tabs.Tab = Tab;
// re-export Tab
export { Tab, Tabs };
