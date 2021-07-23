//@flow
import React from 'react';
import type { Node } from 'react';
import styled, { css } from 'styled-components';
import Tooltip from '../tooltip/Tooltip.component.js';
import type { Props as TooltipProps } from '../tooltip/Tooltip.component.js';
import { getTheme } from '../../utils';
import * as defaultTheme from '../../style/theme';
import { spacing } from '../../style/theme.js';

export type Props = {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline',
  disabled?: boolean,
  onClick?: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  icon?: Node,
  label?: string,
  tooltip?: TooltipProps,
};

export const ButtonStyled = styled.button`
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
  text-decoration: none;
  font-weight: ${defaultTheme.fontWeight.base};

  padding: ${spacing.sp4} ${spacing.sp8};
  font-size: ${defaultTheme.fontSize.base};
  border-radius: ${spacing.sp4};
  height: ${spacing.sp32};

  ${(props) => {
    const brand = getTheme(props);
    switch (props.variant) {
      case 'primary':
        return css`
          background-color: ${brand.buttonPrimary};
          border: ${spacing.sp1} solid ${brand.buttonPrimary};
          color: ${brand.textSecondary};
          &:hover:enabled {
            cursor: pointer;
            border: ${spacing.sp1} solid ${brand.infoPrimary};
            color: ${brand.textPrimary};
          }
          // :focus-visible is the keyboard-only version of :focus
          &:focus-visible:enabled {
            outline: dashed ${spacing.sp2} ${brand.selectedActive};
            outline-offset: ${spacing.sp2};
            color: ${brand.textPrimary};
          }
          &:active:enabled {
            cursor: pointer;
            color: ${brand.textTertiary};
            border: ${spacing.sp1} solid ${brand.infoSecondary};
          }
        `;
      case 'secondary':
        return css`
          background-color: ${brand.buttonSecondary};
          border: ${spacing.sp1} solid ${brand.buttonSecondary};
          color: ${brand.textSecondary};
          &:hover:enabled {
            cursor: pointer;
            border: ${spacing.sp1} solid ${brand.infoPrimary};
            color: ${brand.textPrimary};
          }
          &:focus-visible:enabled {
            outline: dashed ${spacing.sp2} ${brand.selectedActive};
            outline-offset: ${spacing.sp2};
            color: ${brand.textPrimary};
          }
          &:active:enabled {
            cursor: pointer;
            color: ${brand.textTertiary};
            border: ${spacing.sp1} solid ${brand.buttonSecondary};
          }
        `;
      case 'danger':
        return css`
          background-color: ${brand.buttonDelete};
          border: ${spacing.sp1} solid ${brand.buttonDelete};
          color: ${brand.statusCritical};
          &:hover:enabled {
            cursor: pointer;
            border: ${spacing.sp1} solid ${brand.infoPrimary};
          }
          &:focus-visible:enabled {
            outline: dashed ${spacing.sp2} ${brand.selectedActive};
            outline-offset: ${spacing.sp2};
          }
          &:active:enabled {
            cursor: pointer;
            border: ${spacing.sp1} solid ${brand.infoSecondary};
          }
        `;
      case 'outline':
        return css`
          border: ${spacing.sp1} solid ${brand.buttonSecondary};
          background-color: transparent;
          color: ${brand.textTertiary};
          &:hover:enabled {
            cursor: pointer;
            border-color: ${brand.infoPrimary};
            color: ${brand.textPrimary};
          }
          &:focus-visible:enabled {
            outline: dashed ${spacing.sp2} ${brand.selectedActive};
            outline-offset: ${spacing.sp2};
            border-color: ${brand.buttonSecondary};
          }
          &:active:enabled {
            cursor: pointer;
            border: ${spacing.sp1} solid ${brand.infoSecondary};
            color: ${brand.textTertiary};
          }
        `;
      default:
    }
  }}

  ${(props) => {
    return css`
      ${props.disabled
        ? `
          cursor: not-allowed !important;
          pointer-events: auto !important;
          opacity: 0.5;
        `
        : null}
    `;
  }}


  ${(props) => {
    const brand = getTheme(props);
    return css`
      ${props.icon && !props.label && !props.variant
        ? `
          background-color: transparent;
          border: none;
          color: ${brand.textSecondary};

        &:hover{
          cursor: pointer;
          border: none;
          color: ${brand.textPrimary};
        }
        &:focus-visible:enabled {
          outline: dashed ${spacing.sp2} ${brand.selectedActive};
        }
        &:active {
          cursor: pointer;
          color: ${brand.textTertiary};
        }
        `
        : null}
    `;
  }}


`;

export const ButtonLabel = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonIcon = styled.span`
  ${(props) =>
    props.label &&
    css`
      padding-right: ${spacing.sp8};
      display: inline-flex;
      justify-content: center;
      align-items: center;
    `}
`;

function Button({
  variant,
  disabled,
  label,
  icon,
  onClick,
  tooltip,
  ...rest
}: Props) {
  if (!icon && !label) {
    console.warn(
      'Please specify either icon or label prop for the button component.',
    );
  }

  if (!label && icon && !tooltip) {
    console.warn('Please specify the tooltip for the standalone icon button.');
  }

  return (
    <Tooltip
      placement={tooltip && tooltip.placement}
      overlay={tooltip && tooltip.overlay}
      overlayStyle={tooltip && tooltip.overlayStyle}
    >
      <ButtonStyled
        className="sc-button"
        variant={variant}
        disabled={disabled}
        label={label}
        icon={icon}
        onClick={onClick}
        {...rest}
      >
        {icon && (
          <ButtonIcon label={label} aria-label={tooltip && tooltip.overlay}>
            {icon}
          </ButtonIcon>
        )}
        <ButtonLabel>{label}</ButtonLabel>
      </ButtonStyled>
    </Tooltip>
  );
}

export default Button;
