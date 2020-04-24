//@flow
import React from "react";
import styled, { css } from "styled-components";
import type { Node } from "react";
import * as defaultTheme from "../../style/theme";
import { getTheme, getThemePropSelector } from "../../utils";

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
  isClosing?: boolean,
  isOpening?: boolean,
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
    if (props.isClosing) {
      return css`
        @-webkit-keyframes closingSidebar {
          0% {
            width: auto;
          }
          100% {
            width: 0;
          }
        }
        @-moz-keyframes closingSidebar {
          0% {
            width: auto;
          }
          100% {
            width: 0;
          }
        }
        @keyframes closingSidebar {
          0% {
            width: auto;
          }
          100% {
            width: 0;
          }
        }
        -moz-animation: closingSidebar 0.4s;
        animation: closingSidebar 0.4s;
        width: 0;
      `;
    } else if (props.isOpening) {
      return css`
        @-webkit-keyframes openingSidebar {
          0% {
            width: 0;
          }
          100% {
            width: auto;
          }
        }
        @-moz-keyframes openingSidebar {
          0% {
            width: 0;
          }
          100% {
            width: auto;
          }
        }
        @keyframes openingSidebar {
          0% {
            width: 0;
          }
          100% {
            width: auto;
          }
        }
        -moz-animation: openingSidebar 0.4s;
        animation: openingSidebar 0.4s;
        width: auto;
      `;
    }
    if (props.expanded) {
      return css`
        width: auto;
      `;
    }
    if (!props.expanded) {
      return css`
        width: 0;
      `;
    }
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
  width: ${defaultTheme.navbarItemWidth};
  display: flex;
  justify-content: center;
  align-items: end;
`;

function Sidebar({
  expanded,
  actions,
  isClosing = false,
  isOpening = false,
  ...rest
}: Props) {
  return (
    <SidebarContainer
      expanded={expanded}
      className="sc-sidebar"
      isClosing={isClosing}
      isOpening={isOpening}
      {...rest}
    >
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
              {!!icon && expanded && <MenuItemIcon>{icon}</MenuItemIcon>}
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
