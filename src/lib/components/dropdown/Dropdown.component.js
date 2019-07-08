//@flow
import React, { useState, useCallback } from "react";
import type { Node } from "react";
import styled, { css } from "styled-components";
import {
  ButtonStyled,
  ButtonIcon,
  ButtonText
} from "../button/Button.component";
import { darken, lighten } from "polished";
import * as defaultTheme from "../../style/theme";
import { mergeTheme } from "../../utils";

export type Item = {
  label: string,
  name?: string,
  selected?: boolean,
  onClick: () => void
};
type Items = Array<Item>;
type Props = {
  text?: string,
  size?: string,
  variant?: string,
  title?: string,
  items: Items,
  icon?: Node,
  caret?: boolean
};

const DropdownStyled = styled.div`
  position: relative;
  user-select: none;
  .trigger {
    margin: 0;
    border-radius: 0;
    ${props => {
      const brandingTheme = mergeTheme(props.theme, defaultTheme);

      const brandDark = darken(0.1, brandingTheme[props.variant]);
      return props.active
        ? css`
            background-color: ${brandDark};
            color: ${defaultTheme.white};

            &:hover {
              background-color: ${brandDark};
              color: ${defaultTheme.white};
            }
          `
        : null;
    }}
  }
`;

const DropdownMenuStyled = styled.ul`
  position: absolute;
  margin: 0;
  padding: 0;
  box-shadow: 0 1px 3px 0 ${defaultTheme.gray};
  z-index: ${defaultTheme.zIndex.dropdown};
  max-height: 200px;
  min-width: 100%;
  overflow: auto;

  ${props => {
    if (
      props.size &&
      props.triggerSize &&
      props.triggerSize.x + props.size.width > window.innerWidth
    ) {
      return css`
        right: 0;
        top: 100%;
      `;
    } else if (
      props.size &&
      props.triggerSize &&
      props.triggerSize.y + props.size.height > window.innerHeight
    ) {
      return css`
        left: 0;
        bottom: ${props.triggerSize.height + "px"};
      `;
    } else {
      return css`
        left: 0;
        top: 100%;
      `;
    }
  }};
`;

const DropdownMenuItemStyled = styled.li`
  display: flex;
  align-items: center;
  padding: ${defaultTheme.padding.base};
  white-space: nowrap;
  cursor: pointer;
  font-size: ${defaultTheme.fontSize.base};

  ${props => {
    const brandingTheme = mergeTheme(props.theme, defaultTheme);
    const brandLight = lighten(0.1, brandingTheme[props.variant]);
    return css`
      background-color: ${brandingTheme[props.variant]};
      color: ${defaultTheme.white};
      &:hover {
        background-color: ${brandLight};
        color: ${defaultTheme.white};
      }
      &:active {
        background-color: ${brandingTheme[props.variant]};
        color: ${defaultTheme.white};
      }
    `;
  }};
`;

const Caret = styled.span`
  margin-left: ${defaultTheme.padding.base};
`;

const TriggerStyled = ButtonStyled.withComponent("div");

function Dropdown({
  items,
  text,
  icon,
  size = "base",
  variant = "primary",
  title,
  caret = true,
  ...rest
}: Props) {
  const [open, setOpen] = useState(false);
  const [menuSize, setMenuSize] = useState();
  const [triggerSize, setTriggerSize] = useState();

  const refMenuCallback = useCallback(node => {
    if (node !== null) {
      setMenuSize(node.getBoundingClientRect());
    }
  }, []);

  const refTriggerCallback = useCallback(node => {
    if (node !== null) {
      setTriggerSize(node.getBoundingClientRect());
    }
  }, []);

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
        onClick={event => event.stopPropagation()}
        tabIndex="0"
        title={title}
        ref={refTriggerCallback}
      >
        {icon && (
          <ButtonIcon text={text} size={size}>
            {icon}
          </ButtonIcon>
        )}
        {text && <ButtonText className="sc-trigger-text">{text}</ButtonText>}
        {caret && (
          <Caret>
            <i className="fas fa-caret-down" />
          </Caret>
        )}
        {open && (
          <DropdownMenuStyled
            className="menu-item"
            postion={"right"}
            ref={refMenuCallback}
            size={menuSize}
            triggerSize={triggerSize}
          >
            {items.map(({ label, onClick, ...itemRest }) => {
              return (
                <DropdownMenuItemStyled
                  className="menu-item-label"
                  key={label}
                  onClick={onClick}
                  variant={variant}
                  {...itemRest}
                >
                  {label}
                </DropdownMenuItemStyled>
              );
            })}
          </DropdownMenuStyled>
        )}
      </TriggerStyled>
    </DropdownStyled>
  );
}

export default Dropdown;
