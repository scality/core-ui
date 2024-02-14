import React, { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { spacing } from '../../spacing';
import { fontSize, fontWeight } from '../../style/theme';
import { Loader } from '../loader/Loader.component';
import { Tooltip, Props as TooltipProps } from '../tooltip/Tooltip.component';

export const FocusVisibleStyle = css`
  outline: dashed ${spacing.r2} ${(props) => props.theme.selectedActive};
  outline-offset: ${spacing.r2};
  z-index: 1000;
`;

export type Props = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'size' | 'label'
> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'default' | 'inline';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  tooltip?: Omit<TooltipProps, 'children'>;
  isLoading?: boolean;
};
export const ButtonStyled = styled.button<Props>`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
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
  font-family: 'Lato';
  font-weight: ${fontWeight.base};

  padding: ${spacing.r4} ${spacing.r8};
  font-size: ${fontSize.base};
  border-radius: ${spacing.r4};
  height: ${(props) => (props.size === 'inline' ? spacing.r24 : spacing.r32)};
  ${(props) => {
    const brand = props.theme;

    switch (props.variant) {
      case 'primary':
        return css`
          background-color: ${brand.buttonPrimary};
          border: ${spacing.r1} solid ${brand.buttonPrimary};
          color: ${brand.textSecondary};
          &:hover:enabled {
            cursor: pointer;
            border: ${spacing.r1} solid ${brand.infoPrimary};
            color: ${brand.textPrimary};
          }
          // :focus-visible is the keyboard-only version of :focus
          &:focus-visible:enabled {
            ${FocusVisibleStyle}
            color: ${brand.textPrimary};
          }
          &:active:enabled {
            cursor: pointer;
            color: ${brand.textPrimary};
            border: ${spacing.r1} solid ${brand.infoSecondary};
          }
        `;

      case 'secondary':
        return css`
          background-color: ${brand.buttonSecondary};
          border: ${spacing.r1} solid ${brand.buttonSecondary};
          color: ${brand.textSecondary};
          &:hover:enabled {
            cursor: pointer;
            border: ${spacing.r1} solid ${brand.infoPrimary};
            color: ${brand.textPrimary};
          }
          &:focus-visible:enabled {
            ${FocusVisibleStyle}
            color: ${brand.textPrimary};
          }
          &:active:enabled {
            cursor: pointer;
            color: ${brand.textPrimary};
            border: ${spacing.r1} solid ${brand.buttonSecondary};
          }
        `;

      case 'danger':
        return css`
          background-color: ${brand.buttonDelete};
          border: ${spacing.r1} solid ${brand.buttonDelete};
          color: ${brand.statusCritical};
          &:hover:enabled {
            cursor: pointer;
            border: ${spacing.r1} solid ${brand.infoPrimary};
          }
          &:focus-visible:enabled {
            ${FocusVisibleStyle}s
          }
          &:active:enabled {
            cursor: pointer;
            border: ${spacing.r1} solid ${brand.infoSecondary};
          }
        `;

      case 'outline':
        return css`
          border: ${spacing.r1} solid ${brand.buttonSecondary};
          background-color: transparent;
          color: ${brand.textPrimary};
          &:hover:enabled {
            cursor: pointer;
            border-color: ${brand.infoPrimary};
            color: ${brand.textPrimary};
          }
          &:focus-visible:enabled {
            ${FocusVisibleStyle}
            border-color: ${brand.buttonSecondary};
          }
          &:active:enabled {
            cursor: pointer;
            border: ${spacing.r1} solid ${brand.infoSecondary};
            color: ${brand.textPrimary};
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
    const brand = props.theme;
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
          outline: dashed ${spacing.r2} ${brand.selectedActive};
        }
        &:active {
          cursor: pointer;
          color: ${brand.textPrimary};
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
export const ButtonIcon = styled.span<{ label: React.ReactNode }>`
  ${(props) =>
    props.label &&
    css`
      padding-right: ${spacing.r8};
      display: inline-flex;
      justify-content: center;
      align-items: center;
    `}
`;

export const ButtonLoader = styled(Loader)<{ label; variant }>`
  ${(props) => {
    return css`
      margin-right: ${props.label ? spacing.r8 : '0'};
      svg {
        fill: ${props.variant === 'danger'
          ? props.theme.statusCritical
          : props.variant === 'outline'
          ? props.theme.textPrimary
          : props.theme.textSecondary};
      }
    `;
  }}
`;

function Button({
  variant,
  size,
  disabled,
  label,
  icon,
  onClick,
  tooltip,
  isLoading,
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
      placement={tooltip ? tooltip.placement : undefined}
      overlay={tooltip && tooltip.overlay}
      overlayStyle={tooltip && tooltip.overlayStyle}
    >
      <ButtonStyled
        className="sc-button"
        variant={variant}
        disabled={isLoading || disabled}
        label={label}
        icon={icon}
        onClick={onClick}
        size={size}
        {...rest}
      >
        <>
          {icon &&
            (isLoading ? (
              <ButtonLoader size="small" variant={variant} label={label} />
            ) : (
              <ButtonIcon
                label={label}
                aria-label={
                  tooltip &&
                  tooltip.overlay &&
                  typeof tooltip.overlay === 'string'
                    ? tooltip.overlay
                    : undefined
                }
              >
                {icon}
              </ButtonIcon>
            ))}
          {!icon && isLoading && (
            <ButtonLoader size="small" variant={variant} label={label} />
          )}
          <ButtonLabel>{label}</ButtonLabel>
        </>
      </ButtonStyled>
    </Tooltip>
  );
}

export { Button };
