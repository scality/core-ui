//@flow
import React, { useState, useCallback } from 'react';
import type { Node } from 'react';
import styled, { css } from 'styled-components';
import {
  ButtonStyled,
  ButtonIcon,
  ButtonText,
} from '../button/Button.component';
import * as defaultTheme from '../../style/theme';
import { getThemePropSelector } from '../../utils';
import { getPositionDropdownMenu } from './utils';

export type Item = {
  label: string,
  name?: string,
  selected?: boolean,
  onClick?: (SyntheticMouseEvent<HTMLDivElement>) => void,
  iconExternal?: Node,
  submenuIcon?: Node,
  submenuItems?: Array<Item>,
};

type Items = Array<Item>;
type Props = {
  isItem?: boolean,
  text?: string,
  size?: string,
  variant?: string,
  title?: string,
  items: Items,
  icon?: Node,
  caret?: boolean,
  dataIndex?: number,
  iconExternal?: Node,
  onClick?: (SyntheticMouseEvent<HTMLDivElement>) => void,
};

const DropdownStyled = styled.div`
  position: relative;
  user-select: none;
  cursor: pointer;
  .trigger {
    margin: 0;
    border-radius: 0;
  }
`;

const DropdownMenuItemStyled = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${defaultTheme.padding.base};
  box-sizing: border-box;
  border-bottom: 1px solid ${getThemePropSelector('border')};
  white-space: nowrap;
  cursor: pointer;
  font-size: ${defaultTheme.fontSize.base};

  &:last-child {
    border-bottom: 0px;
  }

  ${css`
    background-color: ${getThemePropSelector('primary')};
    color: ${getThemePropSelector('textPrimary')};
    &:hover {
      background-color: ${getThemePropSelector('primaryDark2')};
    }
    &:active {
      background-color: ${getThemePropSelector('primaryDark2')};
    }
  `};
`;

const DropdownMenuStyled = styled.ul`
  position: absolute;
  margin: 0;
  padding: 0;
  z-index: ${defaultTheme.zIndex.dropdown};
  max-height: 200px;
  min-width: 100%;
  ${({ nbItems }) =>
    nbItems > 0
      ? css`
          border: 1px solid ${getThemePropSelector('border')};
        `
      : css``};
  ${({ triggerSize, isItem = false, size, itemIndex = 0, nbItems }) => {
    return css`
      ${getPositionDropdownMenu({
        isItem,
        triggerSize,
        size,
        nbItems,
        itemIndex,
      })}
    `;
  }};
`;

const Caret = styled.span`
  margin-left: ${defaultTheme.padding.base};
`;

const TriggerStyled = ButtonStyled.withComponent('div');

const DropdownAsAnItem = ({
  items = [],
  text,
  icon = null,
  size = 'base',
  caret = true,
  iconExternal = null,
  dataIndex = null,
  onClick = null,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [menuSize, setMenuSize] = useState();
  const [triggerSize, setTriggerSize] = useState();
  const [itemIndex, setItemIndex] = useState();

  const refMenuCallback = useCallback(
    (node) => {
      if (node !== null) {
        setMenuSize(node.getBoundingClientRect());
      }
    },
    [setMenuSize],
  );

  const refTriggerCallback = useCallback(
    (node) => {
      if (node !== null) {
        setTriggerSize(node.getBoundingClientRect());
      }
    },
    [setTriggerSize],
  );

  return (
    <DropdownMenuItemStyled
      onMouseEnter={(e) => {
        setItemIndex(
          e && e.currentTarget && e.currentTarget.getAttribute('data-index'),
        );
        setOpen(true);
      }}
      onMouseLeave={() => setOpen(false)}
      data-index={dataIndex}
      onClick={onClick}
      ref={refTriggerCallback}
    >
      {icon && (
        <ButtonIcon text={text} size={size}>
          {icon}
        </ButtonIcon>
      )}
      {text && <ButtonText className="sc-trigger-text">{text}</ButtonText>}
      {caret && items.length > 0 && (
        <Caret>
          <i className="fas fa-chevron-right" />
        </Caret>
      )}
      {iconExternal && <ButtonIcon size={size}>{iconExternal}</ButtonIcon>}
      {open && (
        <DropdownMenuStyled
          className="menu-item"
          ref={refMenuCallback}
          size={menuSize}
          triggerSize={triggerSize}
          itemIndex={itemIndex}
          nbItems={items.length}
          isItem
        >
          {items.map(
            (
              {
                label,
                onClick,
                submenuIcon = null,
                submenuItems = [],
                iconExternal = null,
              },
              index,
            ) => {
              return (
                <DropdownAsAnItem
                  key={label}
                  text={label}
                  icon={submenuIcon}
                  items={submenuItems}
                  dataIndex={index}
                  iconExternal={iconExternal}
                  onClick={onClick}
                />
              );
            },
          )}
        </DropdownMenuStyled>
      )}
    </DropdownMenuItemStyled>
  );
};

function Dropdown({
  items,
  text,
  icon,
  size = 'base',
  variant = 'base',
  title,
  caret = true,
  onClick = null,
  ...rest
}: Props) {
  const [open, setOpen] = useState(false);
  const [menuSize, setMenuSize] = useState();
  const [triggerSize, setTriggerSize] = useState();

  const refMenuCallback = useCallback(
    (node) => {
      if (node !== null) {
        setMenuSize(node.getBoundingClientRect());
      }
    },
    [setMenuSize],
  );

  const refTriggerCallback = useCallback(
    (node) => {
      if (node !== null) {
        setTriggerSize(node.getBoundingClientRect());
      }
    },
    [setTriggerSize],
  );

  return (
    <DropdownStyled
      active={open}
      variant={variant}
      className="sc-dropdown"
      {...rest}
    >
      <TriggerStyled
        variant={variant}
        size={size}
        className="trigger"
        onBlur={() => setOpen(!open)}
        onFocus={() => setOpen(!open)}
        onClick={(event) => event.stopPropagation()}
        tabIndex="0"
        title={title}
        ref={refTriggerCallback}
        {...rest}
      >
        {icon && (
          <ButtonIcon text={text} size={size}>
            {icon}
          </ButtonIcon>
        )}
        {text && <ButtonText className="sc-trigger-text">{text}</ButtonText>}
        {caret && items.length > 0 && (
          <Caret>
            <i className="fas fa-caret-down" />
          </Caret>
        )}
        {open && (
          <DropdownMenuStyled
            className="menu-item"
            ref={refMenuCallback}
            size={menuSize}
            triggerSize={triggerSize}
            nbItems={items.length}
          >
            {items.map(
              (
                {
                  label,
                  onClick,
                  submenuIcon = null,
                  submenuItems = [],
                  iconExternal = null,
                },
                index,
              ) => {
                return (
                  <DropdownAsAnItem
                    key={label}
                    text={label}
                    icon={submenuIcon}
                    items={submenuItems}
                    dataIndex={index}
                    iconExternal={iconExternal}
                    onClick={onClick}
                  />
                );
              },
            )}
          </DropdownMenuStyled>
        )}
      </TriggerStyled>
    </DropdownStyled>
  );
}

export default Dropdown;
