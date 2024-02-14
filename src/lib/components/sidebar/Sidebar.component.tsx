import { useState } from 'react';
import styled, { css } from 'styled-components';

import {
  fontSize,
  zIndex,
  sidebarWidth,
  sidebarItemHeight,
} from '../../style/theme';
import { getThemePropSelector } from '../../utils';
import { Button } from '../button/Button.component';
import { Icon } from '../icon/Icon.component';
import { spacing } from '../../spacing';
import { FocusVisibleStyle } from '../buttonv2/Buttonv2.component';
type Item = {
  label: string;
  onClick: (arg0: any) => void;
  active?: boolean;
  icon?: JSX.Element;
};
type Items = Array<Item>;
export type Props = {
  expanded?: boolean;
  actions: Items;
  hoverable?: boolean;
  onToggleClick?: () => void;
};
export type WrapperProps = {
  expanded?: boolean;
  hoverable?: boolean;
  hovered?: boolean;
};
const Wrapper = styled.div<WrapperProps>`
  flex-shrink: 0;
  ${(props) => {
    const { backgroundLevel1, textPrimary } = props.theme;
    return css`
      background-color: ${backgroundLevel1};
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
      width: ${sidebarWidth};
    `;
  }}

  ${(props) => {
    const { backgroundLevel1 } = props.theme;

    if (props.hoverable && props.hovered && !props.expanded) {
      return css`
        .sc-sidebar {
          position: relative;
          width: fit-content;
          height: 100%;
          background-color: ${backgroundLevel1};
          z-index: ${zIndex.sidebar};
        }
      `;
    }
  }}
`;
const SidebarContainer = styled.div<WrapperProps>`
  ${(props) => {
    const { backgroundLevel1 } = props.theme;
    return css`
      background-color: ${backgroundLevel1};
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
      width: ${sidebarWidth};
    `;
  }}

  .sc-button {
    border-radius: 0;
    background-color: ${getThemePropSelector('backgroundLevel1')};
    &:hover {
      background-color: ${getThemePropSelector('highlight')};
    }
    &:focus-visible {
      ${FocusVisibleStyle}
    }
    height: ${sidebarItemHeight};
    width: ${sidebarWidth};
    padding: 0px;
  }
`;
const SidebarItem = styled.div<{ active?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: flex-start;
  .fas {
    font-size: ${fontSize.larger};
  }

  ${(props) => {
    const { textPrimary, highlight } = props.theme;
    return props.active
      ? css`
          background-color: ${highlight};
          color: ${textPrimary};
          cursor: default;
          &:focus-visible {
            ${FocusVisibleStyle}
          }
        `
      : css`
          &:hover {
            background-color: ${highlight};
            color: ${textPrimary};
          }
          &:focus-visible {
            ${FocusVisibleStyle}
          }
          &:active {
            background-color: ${highlight};
            color: ${textPrimary};
          }
        `;
  }}
`;
const MenuItemText = styled.div`
  margin-right: ${spacing.r20};
`;
// selected border-right
const MenuItemSelected = styled.div`
  position: absolute;
  width: 3px;
  height: 100%;
  right: 0;
  background-color: ${getThemePropSelector('selectedActive')};
`;
const MenuItemIcon = styled.div`
  width: ${sidebarWidth};
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${sidebarItemHeight};
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
        {onToggleClick && (
          <MenuItemIcon>
            <Button
              size="larger"
              variant="backgroundLevel1"
              icon={<Icon name="Lat-menu" />}
              onClick={() => {
                setHovered(false);
                onToggleClick();
              }}
            />
          </MenuItemIcon>
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
                tabIndex={0}
                {...actionRest}
              >
                {!!icon && <MenuItemIcon>{icon}</MenuItemIcon>}
                {(expanded || (hoverable && hovered)) && (
                  <MenuItemText>{label}</MenuItemText>
                )}
                {active && <MenuItemSelected />}
              </SidebarItem>
            );
          },
        )}
      </SidebarContainer>
    </Wrapper>
  );
}

export { Sidebar };
