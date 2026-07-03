// @ts-nocheck
import styled, { css } from 'styled-components';
import { zIndex } from '../../style/theme';
import { spacing } from '../../spacing';
import { fontSize, fontWeight } from '../../style/theme';
import { getThemePropSelector } from '../../utils';
import { Icon } from '../icon/Icon.component';
import { useSelect } from 'downshift';
import { FocusVisibleStyle } from '../buttonv2/Buttonv2.component';
import { flip, offset, Placement, shift } from '@floating-ui/dom';
import { useFloating, useInteractions, autoUpdate } from '@floating-ui/react';

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
  &:last-child {
    border-bottom: 0.3px solid ${getThemePropSelector('border')};
  }
`;
const Caret = styled.span`
  margin-left: ${spacing.r16};
`;

const ButtonStyled = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;
  display: inline-flex;
  user-select: none;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  text-decoration: none;
  border: none;
  font-weight: ${fontWeight.base};

  &:hover,
  &:focus,
  &:active {
    outline: none;
    cursor: pointer;
  }

  ${(props) => {
    switch (props.size) {
      case 'smaller':
        return css`
          padding: 7px 14px;
          font-size: ${fontSize.smaller};
          border-radius: 4px;
          height: 27px;
        `;

      case 'small':
        return css`
          padding: 8px 16px;
          font-size: ${fontSize.small};
          border-radius: 5px;
          height: 30px;
        `;

      case 'large':
        return css`
          padding: 10px 20px;
          font-size: ${fontSize.large};
          border-radius: 7px;
          height: 40px;
        `;

      case 'larger':
        return css`
          padding: 11px 22px;
          font-size: ${fontSize.larger};
          border-radius: 8px;
          height: 48px;
        `;

      case 'base':
      default:
        return css`
          padding: 12px 16px;
          font-size: ${fontSize.base};
          border-radius: 6px;
          height: 32px;
        `;
    }
  }}

  ${(props) => {
    if (props.variant === 'buttonPrimary') {
      return css`
        background-color: ${props.theme.buttonPrimary};
        border: 1px solid ${props.theme.buttonPrimary};
        color: ${props.theme.textPrimary};
        &:hover {
          background-color: ${props.theme.highlight};
          outline: none;
          border: 1px solid ${props.theme.infoPrimary};
        }
      `;
    } else if (props.variant === 'buttonSecondary') {
      return css`
        background-color: ${props.theme.buttonSecondary};
        border: 1px solid ${props.theme.buttonSecondary};
        color: ${props.theme.textPrimary};
        &:hover {
          background-color: ${props.theme.infoPrimary};
          border: 1px solid ${props.theme.infoPrimary};
        }
      `;
    } else if (props.variant === 'buttonDelete') {
      return css`
        background-color: ${props.theme.buttonDelete};
        border: 1px solid ${props.theme.buttonDelete};
        color: ${props.theme.statusCritical};
        &:hover {
          background-color: ${props.theme.statusCritical};
          border: 1px solid ${props.theme.infoPrimary};
          color: ${props.theme.textPrimary};
        }
      `;
    } else if (props.variant === 'backgroundLevel1') {
      return css`
        background-color: ${props.theme.backgroundLevel1};
        color: ${props.theme.textPrimary};
        &:hover {
          background-color: ${props.theme.highlight};
        }
      `;
    } else {
      return css`
        background-color: ${props.theme.backgroundLevel1};
        border: 1px solid ${props.theme.backgroundLevel1};
        color: ${props.theme.statusCritical};
        &:hover {
          background-color: ${props.theme.backgroundLevel1};
          border: 1px solid ${props.theme.infoPrimary};
          color: ${props.theme.textPrimary};
        }
      `;
    }
  }}
`;

const ButtonIcon = styled.span`
  ${(props) =>
    props.text &&
    css`
      padding-right: 8px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
    `}
`;

const ButtonText = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
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
    middleware: [offset(10), flip(), shift()],
    placement: placement,
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions();

  return (
    <DropdownStyled
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
