//@flow
import React from "react";
import styled, { css } from "styled-components";
import type { Node } from "react";
import * as defaultTheme from "../../style/theme";
import { mergeTheme } from "../../utils";

type Item = {
  label: string,
  onClick: any => void,
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
      background-color: ${brandingTheme.base};
      color: ${brandingTheme.primary};
      .fas {
        color: ${brandingTheme.primary};
      }
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
    return props.active
      ? css`
          background-color: ${brandingTheme.baseContrast1};
          color: ${brandingTheme.primary};
          cursor: default;
        `
      : css`
          &:hover {
            background-color: ${brandingTheme.baseContrast1};
            color: ${brandingTheme.primary};
          }
          &:active {
            background-color: ${brandingTheme.baseContrast1};
            color: ${brandingTheme.primary};
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
      background-color: ${brandingTheme.primary};
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
