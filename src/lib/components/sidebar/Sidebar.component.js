//@flow
import React from "react";
import styled, { css } from "styled-components";
import Color from "color";
import type { Node } from "react";
import * as defaultTheme from "../../style/theme";
import { mergeTheme } from "../../utils";

type Item = {
  label: string,
  onClick: () => void,
  active?: boolean,
  icon?: Node
};
type Items = Array<Item>;
export type Props = {
  expanded?: boolean,
  actions: Items
};

const SidebarContainer = styled.div`
  ${props => {
    const brandingTheme = mergeTheme(props.theme, defaultTheme);
    return css`
      background-color: ${brandingTheme.primary};
      color: ${defaultTheme.white};
    `;
  }}

  ${props => {
    if (props.expanded) {
      return css`
        width: auto;
      `;
    }
    return css`
      width: ${defaultTheme.navbarItemWidth};
    `;
  }}
`;

const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  padding: ${defaultTheme.padding.base} 0;
  cursor: pointer;
  justify-content: flex-start;

  .fas {
    font-size: ${defaultTheme.fontSize.large};
  }

  ${props => {
    const brandingTheme = mergeTheme(props.theme, defaultTheme);
    const brandLight = Color(brandingTheme.primary)
      .lighten(0.1)
      .hsl()
      .string();
    const brandDark = Color(brandingTheme.primary)
      .darken(0.1)
      .hsl()
      .string();
    return props.active
      ? css`
          background-color: ${brandDark};
          color: ${defaultTheme.white};
          cursor: default;
        `
      : css`
          &:hover {
            background-color: ${brandLight};
            color: ${defaultTheme.white};
          }
          &:active {
            background-color: ${brandingTheme.primary};
            color: ${defaultTheme.white};
          }
        `;
  }}
`;

const MenuItemText = styled.div`
  margin-right: ${defaultTheme.padding.large};
`;

const MenuItemIcon = styled.div`
  width: ${defaultTheme.navbarItemWidth};
  display: flex;
  justify-content: center;
  align-items: end;
`;

function Sidebar({ expanded, actions }: Props) {
  return (
    <SidebarContainer expanded={expanded} className="sc-sidebar">
      {actions.map((action, index) => {
        return (
          <SidebarItem
            className="sc-sidebar-item"
            key={index}
            active={action.active}
            title={action.label}
            onClick={action.onClick}
            expanded={expanded}
          >
            {action.icon && <MenuItemIcon>{action.icon}</MenuItemIcon>}
            {expanded && <MenuItemText>{action.label}</MenuItemText>}
          </SidebarItem>
        );
      })}
    </SidebarContainer>
  );
}

export default Sidebar;
