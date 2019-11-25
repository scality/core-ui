//@flow
import React from "react";
import styled, { css } from "styled-components";
import type { Node } from "react";
import * as defaultTheme from "../../style/theme";
import { getThemeProp } from "../../utils";

type Item = {
  title: string,
  selected?: boolean,
  onClick: any => void
};

type Props = {
  items: Array<Item>,
  children: Node
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
          background-color: ${props =>
            getThemeProp('backgroundContrast2')};
        }
      `
    );
  }}
`;

const TabItemTitle = styled.p`
  margin: 0;
  font-size: ${defaultTheme.fontSize.large};
  padding: ${defaultTheme.padding.base} 0 14px;
  ${props => {
    const brandingTheme = getTheme(props);
    return props.selected
      ? css`
          color: ${brandingTheme.primary};
          border-bottom: 2px solid ${brandingTheme.primary};
          font-weight: ${defaultTheme.fontWeight.bold};
        `
      : css`
          color: ${brandingTheme.text};
        `;
  }}
`;

const TabContent = styled.div`
  margin: 0;
  padding: ${defaultTheme.padding.larger};
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
