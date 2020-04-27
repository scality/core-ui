//@flow
import React from "react";
import styled, { css } from "styled-components";
import type { Node } from "react";
import * as defaultTheme from "../../style/theme";
import { getTheme, getThemePropSelector } from "../../utils";
import Button from "../button/Button.component";

type Item = {
  label: string,
  onClick: (any) => void,
  active?: boolean,
  icon?: Node,
};
type Items = Array<Item>;
export type Props = {
  expanded?: boolean,
  actions: Items,
  onToggleClick?: () => void,
};

const SidebarContainer = styled.div`
  ${(props) => {
    const { primary, textPrimary } = getTheme(props);
    return css`
      background-color: ${primary};
      color: ${textPrimary};
      .fas {
        color: ${textPrimary};
      }
    `;
  }}

  ${(props) => {
    if (props.expanded) {
      return css`
        width: auto;
      `;
    }
    return css`
      width: ${defaultTheme.sidebarWidth};
    `;
  }}

  .sc-button {
    border-radius: 0;
    background-color: ${getThemePropSelector("primary")};
    &:hover {
      background-color: ${getThemePropSelector("backgroundBluer")};
    }
    height: ${defaultTheme.sidebarItemHeight};
    width: ${defaultTheme.sidebarWidth};
  }
`;

const SidebarItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: flex-start;
  .fas {
    font-size: ${defaultTheme.fontSize.large};
  }

  ${(props) => {
    const { textPrimary, backgroundBluer } = getTheme(props);

    return props.active
      ? css`
          background-color: ${backgroundBluer};
          color: ${textPrimary};
          cursor: default;
        `
      : css`
          &:hover {
            background-color: ${backgroundBluer};
            color: ${textPrimary};
          }
          &:active {
            background-color: ${backgroundBluer};
            color: ${textPrimary};
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
  background-color: ${getThemePropSelector("secondary")};
`;

const MenuItemIcon = styled.div`
  width: ${defaultTheme.sidebarWidth};
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${defaultTheme.sidebarItemHeight};
`;

function Sidebar({ expanded, actions, onToggleClick, ...rest }: Props) {
  return (
    <SidebarContainer expanded={expanded} className="sc-sidebar" {...rest}>
      {onToggleClick && expanded && (
        <MenuItemIcon>
          <Button
            size="larger"
            variant="base"
            icon={<i className="fas fa-chevron-left" />}
            onClick={() => onToggleClick()}
          />
        </MenuItemIcon>
      )}
      {onToggleClick && !expanded && (
        <Button
          size="larger"
          variant="base"
          icon={<i className="fas fa-chevron-right" />}
          onClick={() => onToggleClick()}
        />
      )}
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
              {active && expanded && <MenuItemSelected />}
            </SidebarItem>
          );
        }
      )}
    </SidebarContainer>
  );
}

export default Sidebar;
