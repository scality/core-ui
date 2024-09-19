import React, {
  CSSProperties,
  HTMLProps,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import styled, { css, useTheme } from 'styled-components';
import { CoreUITheme } from '../../style/theme';

import { Loader } from '../loader/Loader.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { useQuery } from 'react-query';

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
};

const getColor = (color: string | undefined): string => {
  const theme = useTheme();
  if (!color) return 'currentColor';

  return theme[color] || color;
};

export const customIcons = {
  'Remote-user': ({ ariaLabel, color, size }) => (
    <svg
      viewBox="0 0 19 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={'svg-inline--fa ' + (size ? `fa-${size}` : '')}
      aria-label={ariaLabel}
    >
      <path
        d="M16.5902 0.5C17.4071 0.5 18.0984 1.1875 18.0984 2V12C18.0984 12.8438 17.4071 13.5 16.5902 13.5H10.5574L11.0601 15H13.3224C13.7309 15 14.0765 15.3438 14.0765 15.75C14.0765 16.1875 13.7309 16.5 13.3224 16.5H4.77596C4.33607 16.5 4.02186 16.1875 4.02186 15.75C4.02186 15.3438 4.33607 15 4.77596 15H7.03825L7.54098 13.5H1.5082C0.659836 13.5 0 12.8438 0 12V2C0 1.1875 0.659836 0.5 1.5082 0.5H16.5902ZM16.0874 11.5V2.5H2.01093V11.5H16.0874Z"
        fill={getColor(color)}
      />
      <path
        d="M9.18043 7.97631C8.0165 7.97631 7.08207 7.01268 7.08207 5.81237C7.08207 4.62897 8.0165 3.64844 9.18043 3.64844C10.328 3.64844 11.2788 4.62897 11.2788 5.81237C11.2788 7.01268 10.328 7.97631 9.18043 7.97631ZM10.6394 8.51729C11.8526 8.51729 12.8526 9.54854 12.8526 10.7996V11.4927C12.8526 11.9492 12.4919 12.3042 12.0657 12.3042H6.29519C5.85256 12.3042 5.5083 11.9492 5.5083 11.4927V10.7996C5.5083 9.54854 6.49191 8.51729 7.70502 8.51729H7.98371C8.34437 8.70325 8.7542 8.78778 9.18043 8.78778C9.60666 8.78778 10.0001 8.70325 10.3608 8.51729H10.6394Z"
        fill={getColor(color)}
      />
    </svg>
  ),
  'Remote-group': ({ ariaLabel, color, size }) => (
    <svg
      viewBox="0 0 19 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={'svg-inline--fa ' + (size ? `fa-${size}` : '')}
      aria-label={ariaLabel}
    >
      <path
        d="M16.5902 0.5C17.4071 0.5 18.0984 1.1875 18.0984 2V12C18.0984 12.8438 17.4071 13.5 16.5902 13.5H10.5574L11.0601 15H13.3224C13.7309 15 14.0765 15.3438 14.0765 15.75C14.0765 16.1875 13.7309 16.5 13.3224 16.5H4.77596C4.33607 16.5 4.02186 16.1875 4.02186 15.75C4.02186 15.3438 4.33607 15 4.77596 15H7.03825L7.54098 13.5H1.5082C0.659836 13.5 0 12.8438 0 12V2C0 1.1875 0.659836 0.5 1.5082 0.5H16.5902ZM16.0874 11.5V2.5H2.01093V11.5H16.0874Z"
        fill={getColor(color)}
      />
      <path
        d="M4.8 7.85714C4.125 7.85714 3.6 7.29464 3.6 6.57143C3.6 5.8683 4.125 5.28571 4.8 5.28571C5.45625 5.28571 6 5.8683 6 6.57143C6 7.29464 5.45625 7.85714 4.8 7.85714ZM13.2 7.85714C12.525 7.85714 12 7.29464 12 6.57143C12 5.8683 12.525 5.28571 13.2 5.28571C13.8563 5.28571 14.4 5.8683 14.4 6.57143C14.4 7.29464 13.8563 7.85714 13.2 7.85714ZM13.8 8.5C14.4563 8.5 15 9.08259 15 9.78571V10.4286C15 10.7902 14.7188 11.0714 14.4 11.0714H13.1625C13.0313 10.1272 12.5063 9.32366 11.7375 8.8817C11.9625 8.66071 12.2625 8.5 12.6 8.5H13.8ZM9 8.5C7.8375 8.5 6.9 7.49554 6.9 6.25C6.9 5.02455 7.8375 4 9 4C10.1438 4 11.1 5.02455 11.1 6.25C11.1 7.49554 10.1438 8.5 9 8.5ZM10.425 9.14286C11.625 9.14286 12.6 10.1875 12.6 11.4732V12.0357C12.6 12.5781 12.1875 13 11.7 13H6.3C5.79375 13 5.4 12.5781 5.4 12.0357V11.4732C5.4 10.1875 6.35625 9.14286 7.55625 9.14286H7.70625C8.1 9.34375 8.53125 9.46429 9 9.46429C9.45 9.46429 9.88125 9.34375 10.275 9.14286H10.425ZM6.24375 8.8817C5.475 9.32366 4.95 10.1272 4.81875 11.0714H3.6C3.2625 11.0714 3 10.7902 3 10.4286V9.78571C3 9.08259 3.525 8.5 4.2 8.5H5.4C5.71875 8.5 6.01875 8.66071 6.24375 8.8817Z"
        fill={getColor(color)}
      />
    </svg>
  ),
};

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
  onClick?: () => void;
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
  color = undefined,
  ariaLabel = '',
  ...rest
}: Omit<Props, 'withWrapper'>) {
  const iconInfo = iconTable[name] || customIcons[name];
  if (!iconInfo) throw new Error(`${name}: is not a valid icon.`);

  const { data, status } = useQuery({
    queryKey: ['icon', name],
    queryFn: async () => {
      if (customIcons[name]) {
        return {
          default: customIcons[name],
        };
      }
      const [iconType, iconClass] = iconInfo.split(' ');
      try {
        const fontAwesomeType =
          iconType === 'far'
            ? 'free-regular-svg-icons'
            : 'free-solid-svg-icons';
        const icon = await import(
          `@fortawesome/${fontAwesomeType}/${iconClass}.js`
        );
        return {
          default: ({ name, color, size, ariaLabel, ...rest }) => (
            <IconStyled
              color={color}
              icon={icon[iconClass]}
              size={size}
              aria-label={`${name} ${ariaLabel}`}
              {...rest}
            />
          ),
        };
      } catch {
        return {
          default: ({ name, ariaLabel }) => (
            <Loader size="base" aria-label={`${name} ${ariaLabel}`} />
          ),
        };
      }
    },
  });

  return (
    <>
      {(status === 'loading' || status === 'error') && (
        <DelayedFallback aria-label={`${name} ${ariaLabel}`}>
          <Loader size="base" />
        </DelayedFallback>
      )}

      {status === 'success' && (
        <data.default
          name={name}
          color={color}
          size={size}
          ariaLabel={ariaLabel}
          {...rest}
        />
      )}
    </>
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
