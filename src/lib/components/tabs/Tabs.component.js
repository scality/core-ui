//@flow
import React from "react";
import styled, { css } from "styled-components";
import type { Node } from "react";
import * as defaultTheme from "../../style/theme";
import { getTheme } from "../../utils";

type Item = {
  title: string,
  selected?: boolean,
  onClick: (any) => void,
  activeColor: string,
};

type Props = {
  items: Array<Item>,
  children: Node,
};

const TabsContainer = styled.div`
  margin: ${defaultTheme.padding.base} 0;
  * {
    box-sizing: border-box;
  }
`;

const TabBar = styled.div`
  display: flex;
  position: relative;
  height: 50px;
`;

const TabItem = styled.div`
  flex-basis: 15%;
  flex-shrink: 1;
  text-align: center;
  ${(props) => {
    return (
      !props.selected &&
      css`
        &:hover {
          cursor: pointer;
          background-color: ${props.activeTabColor}||
            ${defaultTheme.brand.primaryDark1};
        }
      `
    );
  }}
`;

const TabItemTitle = styled.p`
  margin: 0;
  font-size: ${defaultTheme.fontSize.large};
  padding: ${defaultTheme.padding.base} 0 16.5px;
  ${(props) => {
    const { textPrimary } = getTheme(props);
    return props.selected
      ? css`
          color: ${textPrimary};
          background-color: ${props.activeTabColor}||
            ${defaultTheme.brand.primaryDark1};
        `
      : css`
          color: ${textPrimary};
        `;
  }}
`;

const TabContent = styled.div`
  margin: 0;
  padding: ${defaultTheme.padding.larger};
  overflow-y: scroll;
`;

export default function Tab({ items, children, ...rest }: Props) {
  return (
    <TabsContainer className="sc-tabs" {...rest}>
      <TabBar className="sc-tabs-bar">
        {items.map(({ onClick, selected, title, ...itemRest }, index) => (
          <TabItem
            className="sc-tabs-item"
            key={index}
            onClick={selected ? () => {} : onClick}
            selected={selected}
            {...itemRest}
          >
            <TabItemTitle className="sc-tabs-item-title" selected={selected}>
              {title}
            </TabItemTitle>
          </TabItem>
        ))}
      </TabBar>
      <TabContent className="sc-tabs-item-content">{children}</TabContent>
    </TabsContainer>
  );
}
