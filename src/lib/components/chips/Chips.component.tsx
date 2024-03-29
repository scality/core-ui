import { lighten } from 'polished';
import styled, { css } from 'styled-components';
import { fontSize, grayLight, white } from '../../style/theme';
import { Button } from '../button/Button.component';
import { Size } from '../constants';

import { Icon } from '../icon/Icon.component';
type Props = {
  text: string;
  variant?:
    | 'statusHealthy'
    | 'statusWarning'
    | 'statusCritical'
    | 'infoPrimary'
    | 'infoSecondary';
  icon?: JSX.Element;
  onClick?: (arg0: any) => void;
  onRemove?: (arg0: any) => void;
  size?: Size;
};
const ChipsContainer = styled.div<{
  size?: string;
  variant?: any;
  icon?: JSX.Element;
}>`
  display: inline-flex;
  .sc-chips-remove {
    padding-right: 10px;
    color: ${white};
    &:hover {
      color: ${grayLight};
    }
  }
  ${(props) => {
    switch (props.size) {
      case 'smaller':
        return css`
          border-radius: 10px;
          .sc-chips-icon {
            border-radius: 10px;
            padding: 5px;
          }
        `;

      case 'small':
        return css`
          border-radius: 12px;
          .sc-chips-icon {
            border-radius: 12px;
            padding: 6px;
          }
        `;

      case 'large':
        return css`
          border-radius: 14px;
          .sc-chips-icon {
            border-radius: 14px;
            padding: 6px;
          }
        `;

      case 'larger':
        return css`
          border-radius: 17px;
          .sc-chips-icon {
            border-radius: 17px;
            padding: 7px;
          }
        `;

      default:
        return css`
          border-radius: 12px;
          .sc-chips-icon {
            border-radius: 12px;
            padding: 6px;
          }
        `;
    }
  }}
  ${(props) => {
    const brand = props.theme;
    return css`
      color: ${brand.textReverse};
    `;
  }}

  ${(props) => {
    const brand = props.theme;
    const brandLight = lighten(0.1, brand[props.variant]).toString();
    return props.onClick
      ? css`
          background-color: ${brand[props.variant]};
          font-size: ${fontSize[props.size || 'base']};
          &:hover {
            cursor: pointer;
            background-color: ${brandLight};
          }
          &:active {
            background-color: ${brand[props.variant]};
          }
        `
      : css`
          background-color: ${brand[props.variant]};
          font-size: ${fontSize[props.size || 'base']};
        `;
  }}
`;
export const ChipsIcon = styled.span<{
  variant: any;
  text: string;
  size: Size;
}>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    lighten(0.15, props.theme[props.variant]).toString()};
`;
export const ChipsText = styled.span<{ icon: any; isRemovable: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => (props.icon || props.isRemovable ? '5px' : '5px 10px')};
`;

const Chips = ({
  text = '',
  variant = 'infoPrimary',
  icon = undefined,
  onClick,
  onRemove,
  size = 'base',
}: Props) => (
  <ChipsContainer
    className="sc-chips"
    onClick={onClick}
    variant={variant}
    icon={icon}
    size={size}
  >
    {icon && (
      <ChipsIcon
        className="sc-chips-icon"
        text={text}
        variant={variant}
        size={size}
      >
        {icon}
      </ChipsIcon>
    )}
    <ChipsText className="sc-chips-text" icon={icon} isRemovable={!!onRemove}>
      {text}
    </ChipsText>
    {onRemove && (
      <Button
        // @ts-ignore
        className="sc-chips-remove"
        size={size}
        inverted={true}
        icon={<Icon name="Close" />}
        onClick={onRemove}
      />
    )}
  </ChipsContainer>
);

export { Chips };
