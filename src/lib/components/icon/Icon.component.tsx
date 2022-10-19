import React, {
  HTMLProps,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import styled, { css } from 'styled-components';
import { brand } from '../../style/theme';
import { getTheme } from '../../utils';
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
  'Lat-menu': 'fas faBars',
  Dashboard: 'fas faDesktop',
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
  'Deletion-marker': 'fas faBan',
  'Map-marker': 'fas faMapMarkerAlt',
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
  'File-alt': 'fas faFilesAlt',
  Policy: 'fas faFileSignature',
  Pen: 'fa faPen',
  Pencil: 'fas faPencilAlt',
  Eye: 'fas faEye',
  Snowflake: 'fas faSnowflake',
  Key: 'fas faKey',
  Filter: 'fas faFilter',
  Download: 'fas faDownload',
};

const IconStyled = styled(FontAwesomeIcon)`
  ${(props) => {
    const theme = getTheme(props);
    if (props.color && theme[props.color]) {
      return css`
        color: ${theme[props.color]};
      `;
    }
  }}
`;

export type IconName = keyof typeof iconTable;
export type IconColor = keyof typeof brand;
type Props = {
  name: IconName;
  size?: SizeProp;
  color?: IconColor;
  ariaLabel?: string;
  withWrapper?: boolean;
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

function getLazyStyledIcon(iconInfo: string) {
  const [iconType, iconClass] = iconInfo.split(' ');
  return React.lazy(async () => {
    try {
      const fontAwesomeType =
        iconType === 'far' ? 'free-regular-svg-icons' : 'free-solid-svg-icons';
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
  });
}

export const IconWrapper = styled.div<{size: SizeProp}>`
  ${(props) => {
    const brand = getTheme(props);
    return css`
      color: ${brand.infoPrimary};
      border: 1px solid ${brand.infoPrimary};
      background: ${brand.backgroundLevel1};
      ${props.size === 'lg' ? `
        width: 2.5rem;
        height: 2.5rem;
      ` : props.size === 'sm' ? `
        width: 1.75rem;
        height: 1.75rem;
      ` : props.size === 'xs' ? `
        width: 1.5rem;
        height: 1.5rem;
      ` : `
        width: ${ parseInt(props.size.replace('x', ''))*2 }rem;
        height: ${ parseInt(props.size.replace('x', ''))*2 }rem;
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
  color = null,
  ariaLabel = '',
  ...rest
}: Omit<Props, 'withWrapper'>) {
  const iconInfo = iconTable[name];
  if (!iconInfo) throw new Error(`${name}: is not a valid icon.`);

  const { data, status } = useQuery({
    queryKey: ['icon', name],
    queryFn: async () => {
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
    return <IconWrapper size={props.size}><NonWrappedIcon {...props} /></IconWrapper>;
  }

  return <NonWrappedIcon {...props} />;
}

export { Icon };
