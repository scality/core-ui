// @ts-nocheck
import { useState, useCallback } from 'react';
import styled, { css } from 'styled-components';

import {
  ButtonStyled,
  ButtonIcon,
  ButtonText,
} from '../button/Button.component';
import { zIndex } from '../../style/theme';
import { spacing } from '../../spacing';
import { fontSize } from '../../style/theme';
import { getThemePropSelector } from '../../utils';
import { Icon } from '../icon/Icon.component';
import { useSelect } from 'downshift';
import { FocusVisibleStyle } from '../buttonv2/Buttonv2.component';
export type Item = {
  label: string;
  name?: string;
  selected?: boolean;
  onClick: (arg0: any) => void;
};
type Items = Array<Item>;
type Props = {
  text?: string;
  size?: string;
  variant?: string;
  title?: string;
  items: Items;
  icon?: JSX.Element;
  caret?: boolean;
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
  top: 50px;
  border: 1px solid ${getThemePropSelector('backgroundLevel1')};
  z-index: ${zIndex.dropdown};
  max-height: 200px;
  min-width: 100%;
  overflow: auto;
  border-bottom: 0.3px solid ${getThemePropSelector('border')};
  display: ${(props) => (props.isOpen ? 'auto' : 'none')};
`;
const DropdownMenuItemStyled = styled.li`
  display: flex;
  align-items: center;
  padding: ${spacing.r16};
  white-space: nowrap;
  cursor: pointer;
  font-size: ${fontSize.base};
  ${(props) => {
    console.log(props.isSelected);
    return props.isSelected
      ? `background-color: ${props.theme.highlight};`
      : `background-color: ${props.theme.backgroundLevel1};`;
  }}

  color: ${getThemePropSelector('textPrimary')};
  border-top: 0.3px solid ${getThemePropSelector('border')};
  border-left: 0.3px solid ${getThemePropSelector('border')};
  border-right: 0.3px solid ${getThemePropSelector('border')};

  &:hover {
    background-color: ${getThemePropSelector('highlight')};
  }
  &:active {
    background-color: ${getThemePropSelector('highlight')};
  }
`;
const Caret = styled.span`
  margin-left: ${spacing.r16};
`;
const Trigger = ButtonStyled.withComponent('div');
const TriggerStyled = styled(Trigger)`
  // :focus-visible is the keyboard-only version of :focus
  &:focus-visible {
    ${FocusVisibleStyle}
    color: ${(props) => props.theme.textPrimary};
  }
`;

function Dropdown({
  items,
  text,
  icon,
  size = 'base',
  variant = 'buttonSecondary',
  title,
  caret = true,
  ...rest
}: Props) {
  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
  } = useSelect({
    items,
    itemToString: (item) => item?.label || '',
  });
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
        title={title}
        {...getToggleButtonProps()}
      >
        {icon && (
          <ButtonIcon text={text} size={size}>
            {icon}
          </ButtonIcon>
        )}
        {text && <ButtonText className="sc-trigger-text">{text}</ButtonText>}
        {caret && (
          <Caret>
            <Icon name="Dropdown-down" />
          </Caret>
        )}

        <DropdownMenuStyled
          className="menu-item"
          isOpen={isOpen}
          {...getMenuProps()}
        >
          {items.map((item, index) => {
            return (
              <DropdownMenuItemStyled
                className="menu-item-label"
                key={item.label}
                variant={item.variant}
                {...item}
                {...getItemProps({
                  item,
                  index,
                  onClick: item.onClick,
                })}
                isSelected={index === highlightedIndex}
              >
                {item.label}
              </DropdownMenuItemStyled>
            );
          })}
        </DropdownMenuStyled>
      </TriggerStyled>
    </DropdownStyled>
  );
}

export { Dropdown };
