//@flow
import React from "react";
import styled from "styled-components";
import type { Node } from "react";
import * as defaultTheme from "../../style/theme";
import { getTheme } from "../../utils";

type Item = {
  title: Node | string,
  selected?: boolean,
  onClick: (any) => void,
};

type Props = {
  items: Array<Item>,
  children: Node,
  activeTabColor?: string,
  activeTabSeparator?: string,
  tabLineColor?: string,
  inactiveTabColor?: string,
  tabContentColor?: string,
  separatorColor?: string,
  tabHoverColor?: string,
  className?: string,
};

const TabBar = styled.div`
  display: flex;
  position: relative;
  height: 40px;
`;

const TabItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0 ${defaultTheme.padding.larger} 0 ${defaultTheme.padding.larger};
  border-radius: 4px 4px 0 0;
  border: 1px solid transparent;

  ${(props) => {
    const { highlight, backgroundLevel3, backgroundLevel4, selectedActive } = getTheme(props); 
    return (
      props.selected ? `
        background-color: ${props.activeTabColor || backgroundLevel4};
        &:after {
          content: "";
          background: ${props.activeTabSeparator || selectedActive};
          position: absolute;
          border-radius: 2px 2px 0 0;
          bottom: 0;
          right: 0;
          left: calc(50% - 16px);
          height: 2px;
          width: 32px;
        }
      ` : `
        background-color: ${props.inactiveTabColor || backgroundLevel3};
        &:hover {
          cursor: pointer;
          border: 1px solid ${props.tabHoverColor || highlight};
        }
      `
    );
  }}
`;

const TabsContainer = styled.div`
  background-color: ${props => props.tabLineColor || getTheme(props).backgroundLevel3};
  margin: ${defaultTheme.padding.base} 0;
  padding-top: 2px;
  * {
    box-sizing: border-box;
  }

  & ${TabItem} {
    position: relative;
  }

  & ${TabItem} + ${TabItem}::before {
    content: "";
    background: ${props => props.separatorColor || getTheme(props).infoSecondary};
    position: absolute;
    bottom: 25%;
    left: 0;
    height: ${defaultTheme.padding.base};
    width: 1px;
    margin-left: -1px;
  }
}`;

const TabItemTitle = styled.p`
  margin: 0;
  font-size: ${defaultTheme.fontSize.base};
  font-weight: ${defaultTheme.fontWeight.bold};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  color: ${props => getTheme(props)[props.selected ? 'textPrimary' : 'textTertiary']};
`;

const TabContent = styled.div`
  margin: 0;
  padding: ${defaultTheme.padding.larger};
  background-color: ${props => props.tabContentColor || getTheme(props).backgroundLevel4};
`;

export default function Tab({
  items,
  children,
  activeTabColor,
  activeTabSeparator,
  tabLineColor,
  inactiveTabColor,
  tabContentColor,
  separatorColor,
  tabHoverColor,
  className,
  ...rest
}: Props) {
  return (
    <TabsContainer
      className={["sc-tabs", className].join(" ")}
      tabLineColor={tabLineColor}
      separatorColor={separatorColor}
      {...rest}
    >
      <TabBar className="sc-tabs-bar">
        {items.map(({ onClick, selected, title, ...itemRest }, index) => (
          <TabItem
            className="sc-tabs-item"
            key={index}
            onClick={selected ? () => {} : onClick}
            selected={selected}
            {...itemRest}
            tabHoverColor={tabHoverColor}
            inactiveTabColor={inactiveTabColor}
            activeTabColor={activeTabColor}
            activeTabSeparator={activeTabSeparator}
          >
            <TabItemTitle
              className="sc-tabs-item-title"
              selected={selected}
            >
              {title}
            </TabItemTitle>
          </TabItem>
        ))}
      </TabBar>
      <TabContent
        className="sc-tabs-item-content"
        tabContentColor={tabContentColor}
      >
        {children}
      </TabContent>
    </TabsContainer>
  );
}
