import type { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { spacing } from '../../spacing';
import { fontSize, fontWeight } from '../../style/theme';
import { getContrastText } from '../../utils';
import { Loader } from '../loader/Loader.component';
import { Tooltip, Props as TooltipProps } from '../tooltip/Tooltip.component';

export const FocusVisibleStyle = css`
  outline: dashed ${spacing.r2} ${(props) => props.theme.selectedActive};
  outline-offset: ${spacing.r2};
  z-index: 1000;
`;

/** Props used by ButtonStyled for styling (no tooltip) */
type ButtonStyledProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'size' | 'label'
> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'default' | 'inline';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  isLoading?: boolean;
  /**
   * When true, a button that has both an icon and a label collapses to
   * icon-only: the label is hidden but kept as the accessible name and, unless
   * a tooltip is already provided, shown as a tooltip on hover. Lets a parent
   * (e.g. a toolbar measured with `useContainerWidth`) shrink its buttons when
   * space runs out. Has no effect on icon-only or label-only buttons.
   */
  iconOnly?: boolean;
};

/** Button with a visible label - tooltip is optional */
type ButtonWithLabel = ButtonStyledProps & {
  label: React.ReactNode;
  tooltip?: Omit<TooltipProps, 'children'>;
};

/** Icon-only button - requires either string tooltip OR explicit aria-label */
type IconOnlyButton = ButtonStyledProps & {
  label?: never;
} & (
  | {
      tooltip: Omit<TooltipProps, 'children'> & { overlay: string };
      'aria-label'?: string;
    }
  | {
      tooltip: Omit<TooltipProps, 'children'>;
      'aria-label': string;
    }
);

export type Props = ButtonWithLabel | IconOnlyButton;
export const ButtonStyled = styled.button<ButtonStyledProps>`
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
  white-space: nowrap;
  height: ${(props) => (props.size === 'inline' ? spacing.r24 : spacing.r32)};
  ${(props) => {
    const brand = props.theme;

    switch (props.variant) {
      case 'primary': {
        const primaryTextColor = getContrastText(brand.buttonPrimary, brand.textPrimary, brand.textReverse) ?? brand.textPrimary;
        return css`
          background: ${brand.buttonPrimary};
          background-clip: padding-box, border-box;
          border: ${spacing.r1} solid transparent;
          border-color: ${brand.buttonPrimary};
          color: ${primaryTextColor};
          &:hover:enabled {
            cursor: pointer;
            border: ${spacing.r1} solid ${brand.infoPrimary};
            color: ${primaryTextColor};
          }
          // :focus-visible is the keyboard-only version of :focus
          &:focus-visible:enabled {
            ${FocusVisibleStyle}
            color: ${primaryTextColor};
          }
          &:active:enabled {
            cursor: pointer;
            color: ${primaryTextColor};
            border: ${spacing.r1} solid ${brand.infoSecondary};
          }
        `;
      }

      case 'secondary':
        return css`
          background: ${brand.buttonSecondary};
          background-clip: padding-box, border-box;
          border: ${spacing.r1} solid transparent;
          border-color: ${brand.buttonSecondary};
          color: ${brand.textPrimary};
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
            border: ${spacing.r1} solid transparent;
            border-color: ${brand.buttonSecondary};
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
            ${FocusVisibleStyle}
          }
          &:active:enabled {
            cursor: pointer;
            border: ${spacing.r1} solid ${brand.infoSecondary};
          }
        `;

      case 'outline':
        return css`
          border: ${spacing.r1} solid transparent;
          border-color: ${brand.border}; // fallback for linear-gradient button themes
          border-color: ${brand.buttonSecondary};
          background-color: transparent;
          color: ${brand.textPrimary};
          &:hover:enabled {
            cursor: pointer;
            border-color: ${brand.infoPrimary};
            color: ${brand.textPrimary};

            &::before {
              background-image: ${brand.buttonPrimary};
            }
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
          &::before {
            content: '';
            position: absolute;
            inset: 0;
            padding: ${spacing.r1};
            border-radius: inherit;
            mask: linear-gradient(white, white) content-box, linear-gradient(white, white);
            mask-composite: exclude;
            pointer-events: none;
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
  iconOnly,
  ...rest
}: Props) {
  if (!icon && !label) {
    console.warn(
      'Please specify either icon or label prop for the button component.',
    );
  }

  // When collapsing a labelled button to icon-only, drop the visible label but
  // preserve it as the accessible name + tooltip.
  const collapsed = Boolean(iconOnly && icon && label);
  const effectiveLabel = collapsed ? undefined : label;
  const labelText = typeof label === 'string' ? label : undefined;
  const effectiveTooltip =
    collapsed && !tooltip && labelText ? { overlay: labelText } : tooltip;

  // For icon-only buttons, use tooltip.overlay as aria-label (typed as string for IconOnlyButton)
  const buttonAriaLabel =
    !effectiveLabel && icon && effectiveTooltip?.overlay
      ? (effectiveTooltip.overlay as string)
      : undefined;

  return (
    <Tooltip
      placement={effectiveTooltip ? effectiveTooltip.placement : undefined}
      overlay={effectiveTooltip && effectiveTooltip.overlay}
      overlayStyle={effectiveTooltip && effectiveTooltip.overlayStyle}
    >
      <ButtonStyled
        className="sc-button"
        variant={variant}
        disabled={isLoading || disabled}
        label={effectiveLabel}
        icon={icon}
        onClick={onClick}
        size={size}
        aria-label={buttonAriaLabel}
        {...rest}
      >
        {icon &&
          (isLoading ? (
            <ButtonLoader size="small" variant={variant} label={effectiveLabel} />
          ) : (
            <ButtonIcon label={effectiveLabel}>{icon}</ButtonIcon>
          ))}
        {!icon && isLoading && (
          <ButtonLoader size="small" variant={variant} label={effectiveLabel} />
        )}
        <ButtonLabel>{effectiveLabel}</ButtonLabel>
      </ButtonStyled>
    </Tooltip>
  );
}

export { Button };
