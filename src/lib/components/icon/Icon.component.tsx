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
import { RemoteGroup, RemoteUser } from './CustomsIcons';

// Module-level cache for imported icons
const iconCache: Record<string, any> = {};

export const iconTable = {
  Account: 'fas faWallet',
  Backend: 'fas faNetworkWired',
  Tape: 'fas faTape',
  'Node-backend': 'fas faServer',
  'Volume-backend': 'fas faHdd',
  'Node-pdf': 'fas faDatabase',
  'Volume-pdf': 'fas faCompactDisc',
  Network: 'fas faProjectDiagram',
  Bucket: 'fas faGlassWhiskey',
  'Cloud-backend': 'fas faCloud',
  Datacenter: 'fas faWarehouse',
  'Simple-user': 'fas faUser',
  User: 'fas faUserCog',
  Group: 'fas faUsers',
  Alert: 'fas faBell',
  Bell: 'far faBell',
  'Lat-menu': 'fas faBars',
  Dashboard: 'fas faDesktop',
  Workflow: 'fas faRoute',
  Expiration: 'fas faStopwatch',
  Replication: 'fas faCoins',
  Transition: 'fas faRocket',
  Discovery: 'fas faReply',
  Metrics: 'fas faChartLine',
  Edit: 'fas faEdit',
  Logs: 'far faFileAlt',
  Lock: 'fa faLock',
  'Lock-open': 'fa faLockOpen',
  'Create-add': 'fas faPlus',
  Delete: 'fas faTrash',
  Save: 'fas faSave',
  'External-link': 'fas faExternalLinkAlt',
  Link: 'fas faLink',
  Unlink: 'fas faUnlink',
  Close: 'fas faTimes',
  'Dropdown-down': 'fas faCaretDown',
  'Dropdown-up': 'fas faCaretUp',
  Search: 'fas faSearch',
  More: 'fas faEllipsisV',
  Info: 'fas faQuestionCircle',
  Sync: 'fas faSync',
  Export: 'fas faFileExport',
  Copy: 'far faClone',
  'Simple-upload': 'fas faUpload',
  Upload: 'fas faFileUpload',
  'Add-plus': 'fas faPlusSquare',
  Minus: 'fas faMinus',
  'Remove-minus': 'fas faMinusSquare',
  Sort: 'fas faSort',
  'Sort-up': 'fas faSortUp',
  'Sort-down': 'fas faSortDown',
  Calendar: 'fas faCalendarWeek',
  'Calendar-minus': 'fas faCalendarMinus',
  'Arrow-up': 'fas faArrowUp',
  'Arrow-down': 'fas faArrowDown',
  'Arrow-right': 'fas faArrowRight',
  'Arrow-left': 'fas faArrowLeft',
  'Arrow-alt-circle-up': 'fas faArrowAltCircleUp',
  Folder: 'far faFolder',
  File: 'far faFile',
  'File-invoice': 'fas faFileInvoice',
  License: 'fas faFileInvoice',
  'Deletion-marker': 'fas faBan',
  'Map-marker': 'fas faMapMarkerAlt',
  Location: 'fas faMapMarkerAlt',
  'Info-circle': 'fas faInfoCircle',
  'Exclamation-triangle': 'fas faExclamationTriangle',
  'Exclamation-circle': 'fas faExclamationCircle',
  Exclamation: 'fas faExclamation',
  Check: 'fas faCheck',
  Protected: 'fas faShieldAlt',
  'Chevron-left': 'fas faChevronLeft',
  'Chevron-right': 'fas faChevronRight',
  'Chevron-down': 'fas faChevronDown',
  'Chevron-up': 'fas faChevronUp',
  'Angle-right': 'fas faAngleRight',
  'Angle-double-right': 'fas faAngleDoubleRight',
  Language: 'fas faLanguage',
  Theme: 'fas faPalette',
  Documentation: 'fas faClipboardList',
  Support: 'fas faComments',
  EULA: 'fas faFileContract',
  'Log-out': 'fas faSignOutAlt',
  Hourglass: 'far faHourglass',
  Pause: 'fas faPause',
  'Pause-circle': 'far faPauseCircle',
  'Play-circle': 'far faPlayCircle',
  Upgrade: 'fas faLevelUpAlt',
  Expansion: 'fas faExpandAlt',
  Rebalance: 'fas faBalanceScale',
  Maintenance: 'fas faHardHat',
  Role: 'fas faHatCowboy',
  'Change-erasure': 'fas faExchangeAlt',
  'Circle-health': 'fas faCircle',
  'Circle-empty': 'far faCircle',
  'Dot-circle': 'fas faDotCircle',
  'Check-circle': 'fas faCheckCircle',
  'Times-circle': 'fas faTimesCircle',
  Toolbox: 'fas faToolbox',
  Cubes: 'fas faCubes',
  Policy: 'fas faFileSignature',
  Pen: 'fa faPen',
  Pencil: 'fas faPencilAlt',
  Eye: 'fas faEye',
  EyeSlash: 'fas faEyeSlash',
  Snowflake: 'fas faSnowflake',
  Key: 'fas faKey',
  Filter: 'fas faFilter',
  Download: 'fas faDownload',
  Certificate: 'fas faCertificate',
  Redo: 'fas faRedoAlt',
  Eraser: 'fas faEraser',
  'ID-card': 'fas faIdCard',
  Setting: 'fas faCog', //TODO: Rename to Gear in FA v6 <i class="fa-sharp fa-solid fa-gear"></i>
  Desktop: 'fas faDesktop',
  Globe: 'fas faGlobe',
  Satellite: 'fas faSatelliteDish',
  LightMode: 'fas faSun',
  DarkMode: 'fas faMoon',
  News: 'fas faBullhorn',
  Ring: 'fas faRing',
  Stop: 'fas faStop',
  Play: 'fas faPlay',
  Mail: 'fas faEnvelope',
  ThumbsUp: 'far faThumbsUp',
  ThumbsDown: 'far faThumbsDown',
  Sidebar: 'fas faColumns',
  Bookopen: 'fas faBookOpen',
};

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
    import(`@fortawesome/${fontAwesomeType}/${iconClass}.js`).then((module) => {
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

export { Icon };
