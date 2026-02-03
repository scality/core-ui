import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  CSSProperties,
  HTMLProps,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import styled, { css } from 'styled-components';
import { CoreUITheme } from '../../style/theme';
import { Loader } from '../loader/Loader.component';
import { Bucket, Buckets, RemoteGroup, RemoteUser } from './CustomsIcons';
import { iconTable } from './iconTable';

// Module-level cache for imported icons
const iconCache: Record<string, any> = {};

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
  Bucket: ({ 'aria-label': ariaLabel, color, size }) => (
    <Bucket ariaLabel={ariaLabel} color={color} size={size} />
  ),
  Buckets: ({ 'aria-label': ariaLabel, color, size }) => (
    <Buckets ariaLabel={ariaLabel} color={color} size={size} />
  ),
};

customIcons['Remote-user'].displayName = 'RemoteUser';
customIcons['Remote-group'].displayName = 'RemoteGroup';
customIcons['Bucket'].displayName = 'Bucket';
customIcons['Buckets'].displayName = 'Buckets';

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

const DelayedFallback = ({
  children,
  ...rest
}: PropsWithChildren<HTMLProps<HTMLElement>>) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let timeout = setTimeout(() => setShow(true), 300);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return <i {...rest}>{show && children}</i>;
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
  ...rest
}: Omit<Props, 'withWrapper'>) {
  const iconInfo = iconTable[name] || customIcons[name];
  if (!iconInfo) throw new Error(`${name}: is not a valid icon.`);

  // Loaded fortawesome icon if not a custom icon
  const [icon, setIcon] = useState();

  useEffect(() => {
    if (customIcons[name]) {
      return;
    }

    const [iconType, iconClass] = iconInfo.split(' ');
    const fontAwesomeType =
      iconType === 'far' ? 'free-regular-svg-icons' : 'free-solid-svg-icons';
    const cacheKey = `${fontAwesomeType}/${iconClass}`;
    if (iconCache[cacheKey]) {
      setIcon(iconCache[cacheKey]);
      return () => setIcon(undefined);
    }

    // Handle FontAwesome icons with dynamic import
    import(
      /* webpackExclude: /import\.macro\.js$/ */
      `@fortawesome/${fontAwesomeType}/${iconClass}.js`).then((module) => {
        setIcon(module[iconClass]);
        iconCache[cacheKey] = module[iconClass];
      });
    return () => setIcon(undefined);
  }, [name, iconInfo]);

  if (!icon && !customIcons[name]) {
    return (
      <DelayedFallback aria-label={`${name} ${ariaLabel}`}>
        <Loader size="base" />
      </DelayedFallback>
    );
  }

  const IconComponent = customIcons[name] ?? IconStyled;
  return (
    <IconComponent
      color={color}
      icon={icon}
      size={size}
      title={title}
      aria-label={`${name} ${ariaLabel}`}
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
