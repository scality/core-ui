// @ts-nocheck
// Legacy Button should not be use anymore
import { lighten } from 'polished';
import styled, { css } from 'styled-components';
import { spacing } from '../../spacing';
import { fontSize, fontWeight, white } from '../../style/theme';
import { Size } from '../constants';
import { Loader } from '../loader/Loader.component';
type Props = {
  text?: string;
  size?: Size;

  /* We need to make sure the variant exist in the color-palette
  Otherwise we will encounter the error: Passed an incorrect argument to a color function, please pass a string representation of a color. */
  variant?:
    | 'buttonPrimary'
    | 'buttonSecondary'
    | 'buttonDelete'
    | 'backgroundLevel1';
  // this variant is for the button in navbar and sidebar
  outlined?: boolean;
  inverted?: boolean;
  disabled?: boolean;
  icon?: JSX.Element;
  href?: string;
  title?: string;
  type?: string;
  isLoading?: boolean;
  onClick?: (arg0: any) => void;
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
    if (props.isLoading) {
      return css`
        > span {
          display: flex;
          .sc-loader {
            margin: 0px ${spacing.r4};
            svg {
              fill: ${props.theme.textPrimary} !important;
            }
          }
        }
      `;
    }

    if (props.outlined) {
      return css`
        border-width: 1px;
        border-style: solid;
        border-color: ${props.theme.buttonSecondary};
        // to be checked
        background-color: ${props.theme.backgroundLevel1};
        color: ${props.theme.textTertiary};

        &:hover {
          border-color: ${props.theme.infoPrimary};
          color: ${props.theme.textPrimary};
        }
      `;
    } else if (props.variant === 'buttonPrimary') {
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

${(props) => {
    const brandLighter = lighten(0.2, props.theme[props.variant]).toString();
    return css`
      ${props.disabled
        ? `
          box-shadow: none;
          pointer-events: none;
          opacity: 0.3;
          border-color: ${brandLighter};
          color: ${white};
        `
        : null}
    `;
  }}

${(props) => {
    const brandLighter = lighten(0.2, props.theme[props.variant]).toString();
    const brandLight = lighten(0.1, props.theme[props.variant]).toString();
    return css`
      ${!props.text && props.icon && props.inverted
        ? `
        padding: 0;
        height: auto;
        border: none;
        background-color: transparent;
        color: ${props.disabled ? brandLight : props.theme[props.variant]};

        &:hover{
          background-color: transparent;
          color: ${brandLight};
          border: none;
        }

        &:active {
          background-color: transparent;
          color: ${brandLighter};
        }
        `
        : null}
    `;
  }}
`;
export const ButtonIcon = styled.span`
  ${(props) =>
    props.text &&
    css`
      padding-right: 8px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
    `}
`;
export const ButtonText = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;
export const ButtonContent = styled.span`
  position: relative;
`;
const Anchor = ButtonStyled.withComponent('a');

/**
 * @deprecated
 * You should use ButtonV2 with
 * import { Button } from '@scality/core-ui/dist/next';
 */
function Button({
  text = '',
  href = '',
  icon = null,
  size = 'base',
  variant = 'buttonPrimary',
  outlined = false,
  disabled = false,
  onClick,
  title = '',
  isLoading = false,
  type = 'button',
  inverted = false,
  ...rest
}: Props) {
  return href && href.length ? (
    <Anchor
      className="sc-button"
      href={href}
      variant={variant}
      outlined={outlined}
      disabled={disabled}
      size={size}
      title={title}
      {...rest}
    >
      {icon && (
        <ButtonIcon text={text} size={size}>
          {icon}
        </ButtonIcon>
      )}
      <ButtonText>{text}</ButtonText>
    </Anchor>
  ) : (
    <ButtonStyled
      className="sc-button"
      variant={variant}
      outlined={outlined}
      disabled={disabled || isLoading}
      size={size}
      onClick={onClick}
      title={title}
      isLoading={isLoading}
      type={type}
      inverted={inverted}
      icon={icon}
      text={text}
      {...rest}
    >
      <ButtonContent>
        {isLoading && <Loader size={size} />}
        <span className="sc-button-text">
          {icon && (
            <ButtonIcon text={text} size={size}>
              {icon}
            </ButtonIcon>
          )}
          <ButtonText>{text}</ButtonText>
        </span>
      </ButtonContent>
    </ButtonStyled>
  );
}

export { Button };
