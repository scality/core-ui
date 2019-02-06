import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import {
  ButtonStyled,
  ButtonIcon,
  ButtonText
} from "../button/Button.component";
import Color from "color";
import * as defaultTheme from "../../style/theme";
import { mergeTheme } from "../../utils";

const DropdownStyled = styled.div`
  position: relative;
  user-select: none;
  .trigger {
    margin: 0;
    border-radius: 0;
    ${props => {
      const brandingTheme = mergeTheme(props.theme, defaultTheme);

      const brandDark = Color(brandingTheme[props.variant])
        .darken(0.1)
        .hsl()
        .string();
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
    const brandLight = Color(brandingTheme[props.variant])
      .lighten(0.1)
      .hsl()
      .string();
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
class Dropdown extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      menuSize: null,
      triggerSize: null
    };
  }

  handleOpenCloseDropdown() {
    this.setState({
      open: !this.state.open
    });
  }

  refMenuCallback = element => {
    if (element) {
      this.setState({ menuSize: element.getBoundingClientRect() });
    }
  };

  refTriggerCallback = element => {
    if (element) {
      this.setState({ triggerSize: element.getBoundingClientRect() });
    }
  };

  render() {
    const { open, menuSize, triggerSize } = this.state;
    const {
      items,
      text,
      icon,
      size = "base",
      variant = "primary",
      title,
      caret = true
    } = this.props;

    return (
      <DropdownStyled active={open} variant={variant} className="sc-dropdown">
        <TriggerStyled
          variant={variant}
          size={size}
          className="trigger"
          onBlur={() => this.handleOpenCloseDropdown()}
          onFocus={() => this.handleOpenCloseDropdown()}
          tabIndex="0"
          title={title}
          ref={this.refTriggerCallback}
        >
          {icon && (
            <ButtonIcon text={text} size={size}>
              {icon}
            </ButtonIcon>
          )}
          {text && <ButtonText>{text}</ButtonText>}
          {caret && (
            <Caret>
              <i className="fas fa-caret-down" />
            </Caret>
          )}
          {open && (
            <DropdownMenuStyled
              className="menu-item"
              postion={"right"}
              ref={this.refMenuCallback}
              size={menuSize}
              triggerSize={triggerSize}
            >
              {items.map(item => {
                const { label, onClick } = item;
                return (
                  <DropdownMenuItemStyled
                    key={label}
                    onClick={onClick}
                    variant={variant}
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
}

Dropdown.propTypes = {
  size: PropTypes.oneOf(["smaller", "small", "base", "large", "larger"]),
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "danger",
    "success",
    "warning",
    "info",
    "base"
  ]),
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  text: PropTypes.string,
  items: PropTypes.array,
  caret: PropTypes.bool
};

export default Dropdown;
