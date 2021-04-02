//@flow
import React, { useState, useCallback, forwardRef } from "react";
import type { Node } from "react";
import styled, { css } from "styled-components";
import {
  ButtonStyled,
  ButtonIcon,
  ButtonText
} from "../button/Button.component";
import * as defaultTheme from "../../style/theme";
import { getThemePropSelector } from '../../utils';
import { getPositionDropdownMenu } from './utils';

export type Item = {
  label: string,
  name?: string,
  selected?: boolean,
  onClick?: any => void,
  submenuIcon?: Node,
  submenuItems?: Array<Item>
};

type DropdownTriggerContainerProps = {
  isItem?: boolean,
  dataIndex: number,
  open?: boolean,
  size?: string,
  variant?: string,
  title?: string,
  onBlur: any => void,
  onFocus: any => void,
  onClick: any => void,
  onMouseEnter: any => void,
  onMouseLeave: any => void,
  children: Node,
}

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
  onClick?: any => void,
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

const DropdownMenuStyled = styled.ul`
  position: absolute;
  margin: 0;
  padding: 0;
  z-index: ${defaultTheme.zIndex.dropdown};
  max-height: 200px;
  min-width: 100%;

  ${({ triggerSize, isItem, size, itemIndex = 0, nbItems}) => {
    return getPositionDropdownMenu({ isItem, triggerSize, size, nbItems, itemIndex })
  }};
`;

const DropdownMenuItemStyled = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${defaultTheme.padding.base};
  white-space: nowrap;
  cursor: pointer;
  font-size: ${defaultTheme.fontSize.base};

  ${css`
    background-color: ${getThemePropSelector("primary")};
    color: ${getThemePropSelector("textPrimary")};
    &:hover {
      background-color: ${getThemePropSelector("primaryDark2")};
    }
    &:active {
      background-color: ${getThemePropSelector("primaryDark2")};
    }
  `};
`;

const Caret = styled.span`
  margin-left: ${defaultTheme.padding.base};
`;

const TriggerStyled = ButtonStyled.withComponent("div");

const DropdownTriggerContainer = forwardRef<DropdownTriggerContainerProps, Element>(({isItem, dataIndex, open, size , variant, title, onBlur, onFocus, onClick, onMouseEnter, onMouseLeave, children, ...rest}, ref) => {
  return isItem ? (
    <DropdownMenuItemStyled
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-index={dataIndex}
      onClick={onClick}
      ref={ref}
    >
      {children}
    </DropdownMenuItemStyled>
  ) : (
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
      onBlur={onBlur}
      onFocus={onFocus}
      onClick={onClick}
      tabIndex="0"
      title={title}
      ref={ref}
    >
      {children}
    </TriggerStyled>
    </DropdownStyled>
  )
})

function Dropdown({
  isItem = false,
  items,
  text,
  icon,
  size = "base",
  variant = "base",
  title,
  caret = true,
  dataIndex = null,
  onClick = null,
  ...rest
}: Props) {
  const [open, setOpen] = useState(false);
  const [menuSize, setMenuSize] = useState();
  const [triggerSize, setTriggerSize] = useState();
  const [itemIndex, setItemIndex] = useState()

  const refMenuCallback = useCallback(node => {
    if (node !== null) {
      setMenuSize(node.getBoundingClientRect());
    }
  }, [setMenuSize]);

  const refTriggerCallback = useCallback(node => {
    if (node !== null) {
      setTriggerSize(node.getBoundingClientRect());
    }
  }, [setTriggerSize]);

  return (
      <DropdownTriggerContainer
        open={open}
        isItem={isItem}
        onMouseEnter={(e) => {
          setItemIndex(e && e.target && e.target.getAttribute('data-index') || 0)
          setOpen(true)
        }}
        onMouseLeave={() => setOpen(false)}
        variant={variant}
        size={size}
        onBlur={() => setOpen(!open)}
        onFocus={() => setOpen(!open)}
        onClick={onClick ? onClick : event => event.stopPropagation()}
        title={title}
        ref={refTriggerCallback}
        dataIndex={dataIndex}
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
            <i className={`fas fa-caret-${isItem ? 'right' : 'down'}`} />
          </Caret>
        )}
        {open && (
          <DropdownMenuStyled
            className="menu-item"
            ref={refMenuCallback}
            size={menuSize}
            triggerSize={triggerSize}
            itemIndex={itemIndex}
            nbItems={items.length}
            isItem={isItem}
          >
            {items.map(({ label, onClick, submenuIcon = null, submenuItems = [], ...itemRest }, index) => {
               return <Dropdown
                 isItem
                 key={label}
                 text={label}
                 icon={submenuIcon}
                 items={submenuItems}
                 dataIndex={index}
                 onClick={onClick}
               />
            })}
          </DropdownMenuStyled>
        )}
      </DropdownTriggerContainer>
  );
}

export default Dropdown;
