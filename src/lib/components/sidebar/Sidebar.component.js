//@flow
import React from "react";
import styled, { css } from "styled-components";
import { darken, lighten } from "polished";
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
      color: ${brandingTheme.secondary};
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
  position: relative;
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
    const brandLight = lighten(0.1, brandingTheme.primary);
    const brandDark = darken(0.1, brandingTheme.primary);
    return props.active
      ? css`
          background-color: ${brandDark};
          color: ${brandingTheme.secondary};
          cursor: default;
        `
      : css`
          &:hover {
            background-color: ${brandLight};
            color: ${brandingTheme.secondary};
          }
          &:active {
            background-color: ${brandingTheme.primary};
            color: ${brandingTheme.secondary};
          }
        `;
  }}
`;

const MenuItemText = styled.div`
  margin-right: ${defaultTheme.padding.large};
`;

const MenuItemSelected = styled.div`
  position: absolute;
  width: 5px;
  height: 100%;
  right: 0;
  ${props => {
    const brandingTheme = mergeTheme(props.theme, defaultTheme);
    return css`
      background-color: ${brandingTheme.secondary};
    `;
  }}
`;

const MenuItemIcon = styled.div`
  width: ${defaultTheme.navbarItemWidth};
  display: flex;
  justify-content: center;
  align-items: end;
`;

function Sidebar({ expanded, actions, ...rest }: Props) {
  return (
    <SidebarContainer expanded={expanded} className="sc-sidebar" {...rest}>
      {actions.map(
        ({ active, label, onClick, icon = null, ...actionRest }, index) => {
          return (
            <SidebarItem
              className="sc-sidebar-item"
              key={index}
              active={active}
              title={label}
              onClick={onClick}
              expanded={expanded}
              {...actionRest}
            >
              {!!icon && <MenuItemIcon>{icon}</MenuItemIcon>}
              {expanded && <MenuItemText>{label}</MenuItemText>}
              {active && <MenuItemSelected />}
            </SidebarItem>
          );
        }
      )}
    </SidebarContainer>
  );
}

export default Sidebar;
