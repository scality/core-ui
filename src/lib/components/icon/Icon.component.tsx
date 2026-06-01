import type { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  type CSSProperties,
  type HTMLProps,
  type PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import styled, { css } from 'styled-components';
import type { CoreUITheme } from '../../style/theme';
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
customIcons.Bucket.displayName = 'Bucket';
customIcons.Buckets.displayName = 'Buckets';

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
  /**
   * Accessible label for meaningful icons.
   * When provided, the icon is announced to screen readers.
   * When omitted, the icon is decorative (hidden from assistive technologies).
   */
  ariaLabel?: string;
  withWrapper?: boolean;
  style?: CSSProperties;
  onClick?: (event: React.MouseEvent) => void;
  title?: string;
};

const DelayedFallback = ({
  size,
  children,
  ...rest
}: PropsWithChildren<Omit<HTMLProps<HTMLElement>, 'size'> & { size?: SizeProp }>) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let timeout = setTimeout(() => setShow(true), 300);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // Reserve the icon's box so a cold-loading icon doesn't paint zero-width and shift
  // neighbouring content. svg-inline--fa gives height:1em and the icon baseline, and
  // fa-${size} scales font-size so 1em tracks the requested size. Width has no intrinsic
  // SVG to derive from, so set a 1em square — matches the glyph height exactly and
  // approximates its (variable) width without altering how loaded icons render.
  return (
    <i
      {...rest}
      className={`svg-inline--fa${size ? ` fa-${size}` : ''}`}
      style={{ width: '1em' }}
    >
      {show && children}
    </i>
  );
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
        width: ${parseInt(props.size.replace('x', ''), 10) * 2}rem;
        height: ${parseInt(props.size.replace('x', ''), 10) * 2}rem;
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
  ariaLabel,
  title,
  ...rest
}: Omit<Props, 'withWrapper'>) {
  const iconInfo = iconTable[name] || customIcons[name];
  if (!iconInfo) throw new Error(`${name}: is not a valid icon.`);

  const [fontAwesomeType, iconClass] = customIcons[name]
    ? []
    : (() => {
        const [type, cls] = iconInfo.split(' ');
        return [
          type === 'far' ? 'free-regular-svg-icons' : 'free-solid-svg-icons',
          cls,
        ];
      })();
  const cacheKey = iconClass ? `${fontAwesomeType}/${iconClass}` : undefined;

  // Seed from the module-level cache synchronously so an already-loaded icon paints on the
  // first render. Reading the cache only inside the effect (which runs after paint) makes a
  // freshly-mounted icon — e.g. a virtualized table row scrolling into view — render the empty
  // zero-width fallback for a frame, shifting neighbouring content before the real glyph appears.
  const [icon, setIcon] = useState(() =>
    cacheKey ? iconCache[cacheKey] : undefined,
  );

  useEffect(() => {
    if (!cacheKey || !iconClass) {
      return;
    }
    if (iconCache[cacheKey]) {
      setIcon(iconCache[cacheKey]);
      return;
    }

    // Handle FontAwesome icons with dynamic import
    import(
      /* webpackExclude: /import\.macro\.js$/ */
      /* webpackInclude: /\.js$/ */
      `@fortawesome/${fontAwesomeType}/${iconClass}`).then((module) => {
        setIcon(module[iconClass]);
        iconCache[cacheKey] = module[iconClass];
      }).catch((err) => {
        console.warn(`Icon ${iconClass} could not be loaded:`, err.message);
      });
  }, [cacheKey, fontAwesomeType, iconClass]);

  // Icons are decorative by default (aria-hidden: true)
  // If ariaLabel is provided, the icon is meaningful (aria-hidden: false)
  const accessibilityProps = ariaLabel
    ? { 'aria-hidden': false as const, 'aria-label': ariaLabel }
    : { 'aria-hidden': true as const };

  if (!icon && !customIcons[name]) {
    return (
      <DelayedFallback size={size} {...accessibilityProps}>
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
      {...accessibilityProps}
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
