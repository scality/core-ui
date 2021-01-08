//@flow
import React, { useState } from "react";
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
  hoverable?: boolean,
  onToggleClick?: () => void,
};

const Wrapper = styled.div`
  flex-shrink: 0;
  ${(props) => {
    const { background, textPrimary } = getTheme(props);
    return css`
      background-color: ${background};
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

  ${(props) => {
    const { background } = getTheme(props);

    if (props.hoverable && props.hovered && !props.expanded) {
      return css`
        .sc-sidebar {
          position: absolute;
          height: 100%;
          background-color: ${background};
          z-index: ${defaultTheme.zIndex.sidebar};
        }
      `;
    }
  }}
`;

const SidebarContainer = styled.div`
  ${(props) => {
    const { background } = getTheme(props);
    return css`
      background-color: ${background};
    `;
  }}

  ${(props) => {
    if (
      props.expanded ||
      (props.hoverable && props.hovered && !props.expanded)
    ) {
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

function Sidebar({
  expanded,
  actions,
  onToggleClick,
  hoverable,
  ...rest
}: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <Wrapper
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      hoverable={hoverable}
      hovered={hovered}
      expanded={expanded}
    >
      <SidebarContainer
        expanded={expanded}
        className="sc-sidebar"
        hoverable={hoverable}
        hovered={hovered}
        {...rest}
      >
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
                expanded={expanded || (hoverable && hovered)}
                {...actionRest}
              >
                {!!icon && <MenuItemIcon>{icon}</MenuItemIcon>}
                {(expanded || (hoverable && hovered)) && (
                  <MenuItemText>{label}</MenuItemText>
                )}
                {active && (expanded || (hoverable && hovered)) && (
                  <MenuItemSelected />
                )}
              </SidebarItem>
            );
          },
        )}
      </SidebarContainer>
    </Wrapper>
  );
}

export default Sidebar;
