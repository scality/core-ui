// @ts-nocheck
import { useState, useRef, useCallback, useEffect } from 'react';
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
import { flip, offset, Placement, shift } from '@floating-ui/dom';
import { useFloating, useInteractions, autoUpdate } from '@floating-ui/react';

// use of floating-ui/react ?
// Oui : ça permet de faciliter le float -> pourra etre utilisé pour d'autres composants ; éviter useEffect et une couche de complexité utilisant floating-ui/dom

// NON : utilisation d'une bibliothèque externe

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
  placement?: Placement;
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

// ------------------- replace first 4 lines with floatin-ui --------------
// position: absolute;
// margin: 0;
// padding: 0;
// top: 50px;

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
  display: ${(props) => (props.isOpen ? 'auto' : 'none')};
`;
// border-bottom: 0.3px solid ${getThemePropSelector('border')};

const DropdownMenuItemStyled = styled.li`
  display: flex;
  align-items: center;
  padding: ${spacing.r16};
  white-space: nowrap;
  cursor: pointer;
  font-size: ${fontSize.base};
  ${(props) => {
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
  placement = 'bottom',
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

  const { refs, floatingStyles } = useFloating({
    // open: isOpen,
    middleware: [offset(10), flip(), shift()],
    placement: placement,
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions();

  return (
    <DropdownStyled
      // active={open}
      variant={variant}
      className="sc-dropdown"
      {...rest}
      ref={refs.setReference}
    >
      <TriggerStyled
        variant={variant}
        size={size}
        className="trigger"
        title={title}
        {...getToggleButtonProps()}
        {...getReferenceProps()}
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
      </TriggerStyled>
      <DropdownMenuStyled
        className="menu-item"
        isOpen={isOpen}
        style={floatingStyles}
        {...getFloatingProps()}
        {...getMenuProps({ ref: refs.setFloating })}
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
    </DropdownStyled>
  );
}

export { Dropdown };
