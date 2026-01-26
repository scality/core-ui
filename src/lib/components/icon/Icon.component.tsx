import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import { CoreUITheme } from '../../style/theme';
import { RemoteGroup, RemoteUser } from './CustomsIcons';
import { iconTable } from './iconDefinitions';

type IconProps = {
  'aria-label'?: string;
  color?: string;
  size?: string;
  icon?: string;
  title?: string;
};

export const customIcons: Record<
  string,
  ((props: IconProps) => JSX.Element) & { displayName?: string }
> = {
  'Remote-user': ({ 'aria-label': ariaLabel, color, size }) => (
    <RemoteUser ariaLabel={ariaLabel} color={color} size={size} />
  ),
  'Remote-group': ({ 'aria-label': ariaLabel, color, size }) => (
    <RemoteGroup ariaLabel={ariaLabel} color={color} size={size} />
  ),
};

customIcons['Remote-user'].displayName = 'RemoteUser';
customIcons['Remote-group'].displayName = 'RemoteGroup';

const IconStyled = styled(FontAwesomeIcon)`
  ${(props) => {
    const theme = props.theme;
    if (props.color && theme[props.color]) {
      return css`
        color: ${theme[props.color]};
      `;
    }
  }}
`;

export type IconName = keyof typeof iconTable | keyof typeof customIcons;
export type IconColor = keyof CoreUITheme;

type Props = {
  name: IconName;
  size?: SizeProp;
  color?: IconColor | CSSProperties['color'];
  ariaLabel?: string;
  withWrapper?: boolean;
  style?: CSSProperties;
  onClick?: (event: React.MouseEvent) => void;
  title?: string;
};

export const IconWrapper = styled.div<{ size: SizeProp }>`
  ${(props) => {
    const brand = props.theme;
    return css`
      color: ${brand.infoPrimary};
      border: 1px solid ${brand.infoPrimary};
      background: ${brand.backgroundLevel1};
      ${props.size === 'lg'
        ? `
        width: 2.5rem;
        height: 2.5rem;
      `
        : props.size === 'sm'
          ? `
        width: 1.75rem;
        height: 1.75rem;
      `
          : props.size === 'xs'
            ? `
        width: 1.5rem;
        height: 1.5rem;
      `
            : `
        width: ${parseInt(props.size.replace('x', '')) * 2}rem;
        height: ${parseInt(props.size.replace('x', '')) * 2}rem;
      `}
    `;
  }}

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
`;

function NonWrappedIcon({
  name,
  size = '1x',
  color,
  ariaLabel = '',
  title,
  style,
  ...rest
}: Omit<Props, 'withWrapper'>) {
  const accessibleLabel = ariaLabel || name;

  // Check for custom icons first
  const CustomIcon = customIcons[name];
  if (CustomIcon) {
    return (
      <CustomIcon
        color={color}
        size={size}
        title={title}
        aria-label={accessibleLabel}
        {...rest}
      />
    );
  }

  // Get FontAwesome icon from static lookup
  const icon = iconTable[name];
  if (!icon) {
    throw new Error(`${name}: is not a valid icon.`);
  }

  return (
    <IconStyled
      color={color}
      icon={icon}
      size={size}
      title={title}
      aria-label={accessibleLabel}
      style={style as React.CSSProperties & { [key: `--fa-${string}`]: string }}
      {...rest}
    />
  );
}

function Icon({ withWrapper, ...props }: Props) {
  if (withWrapper) {
    return (
      <IconWrapper size={props.size || '1x'}>
        <NonWrappedIcon {...props} />
      </IconWrapper>
    );
  }

  return <NonWrappedIcon {...props} />;
}

export { Icon, iconTable };
