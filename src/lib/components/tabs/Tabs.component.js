//@flow
import React from "react";
import styled, { css } from "styled-components";
import type { Node } from "react";
import * as defaultTheme from "../../style/theme";
import { mergeTheme } from "../../utils";

type Item = {
  title: string,
  selected?: boolean,
  onClick: () => void
};

type Props = {
  items: Array<Item>,
  children: Node,
  activeColor?: string
};

const TabsContainer = styled.div`
  margin: ${defaultTheme.padding.base} 0;
  * {
    box-sizing: border-box;
  }
`;

const TabBar = styled.div`
  display: flex;
  border-bottom: 2px solid ${defaultTheme.grayLight};
  position: relative;
  height: 50px;
`;

const TabItem = styled.div`
  flex-basis: 15%;
  flex-shrink: 1;
  text-align: center;
  ${props => {
    return (
      !props.selected &&
      css`
        &:hover {
          cursor: pointer;
          background-color: ${defaultTheme.grayLightest};
        }
      `
    );
  }}
`;

const TabItemTitle = styled.p`
  margin: 0;
  color: ${defaultTheme.textColor};
  padding: ${defaultTheme.padding.base} 0 14px;
  ${props => {
    const brandingTheme = mergeTheme(props.theme, defaultTheme);
    const activeColor = props.activeColor || brandingTheme.primary;
    return (
      props.selected &&
      css`
        color: ${activeColor};
        border-bottom: 2px solid ${activeColor};
        font-weight: ${defaultTheme.fontWeight.bold};
      `
    );
  }}
  font-size: ${defaultTheme.fontSize.large};
`;

const TabContent = styled.div`
  margin: 0;
  padding: ${defaultTheme.padding.larger};
`;

export default function Tab({ items, children, activeColor, ...rest }: Props) {
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
            <TabItemTitle
              className="sc-tabs-item-title"
              selected={selected}
              activeColor={activeColor}
            >
              {title}
            </TabItemTitle>
          </TabItem>
        ))}
      </TabBar>
      <TabContent className="sc-tabs-item-content">{children}</TabContent>
    </TabsContainer>
  );
}
