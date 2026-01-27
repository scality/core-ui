import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

// Import icons individually - bundlers can tree-shake unused ones
// Each icon is imported separately to enable tree-shaking
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons/faAngleDoubleRight';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons/faArrowAltCircleUp';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp';
import { faBalanceScale } from '@fortawesome/free-solid-svg-icons/faBalanceScale';
import { faBan } from '@fortawesome/free-solid-svg-icons/faBan';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faBell as fasBell } from '@fortawesome/free-solid-svg-icons/faBell';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons/faBookOpen';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons/faBullhorn';
import { faCalendarMinus } from '@fortawesome/free-solid-svg-icons/faCalendarMinus';
import { faCalendarWeek } from '@fortawesome/free-solid-svg-icons/faCalendarWeek';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons/faCaretUp';
import { faCertificate } from '@fortawesome/free-solid-svg-icons/faCertificate';
import { faChartLine } from '@fortawesome/free-solid-svg-icons/faChartLine';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { faCircle as fasCircle } from '@fortawesome/free-solid-svg-icons/faCircle';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons/faClipboardList';
import { faCloud } from '@fortawesome/free-solid-svg-icons/faCloud';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import { faCoins } from '@fortawesome/free-solid-svg-icons/faCoins';
import { faColumns } from '@fortawesome/free-solid-svg-icons/faColumns';
import { faComments } from '@fortawesome/free-solid-svg-icons/faComments';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons/faCompactDisc';
import { faCubes } from '@fortawesome/free-solid-svg-icons/faCubes';
import { faDatabase } from '@fortawesome/free-solid-svg-icons/faDatabase';
import { faDesktop } from '@fortawesome/free-solid-svg-icons/faDesktop';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons/faDotCircle';
import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faEraser } from '@fortawesome/free-solid-svg-icons/faEraser';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons/faExchangeAlt';
import { faExclamation } from '@fortawesome/free-solid-svg-icons/faExclamation';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons/faExpandAlt';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash';
import { faFileContract } from '@fortawesome/free-solid-svg-icons/faFileContract';
import { faFileExport } from '@fortawesome/free-solid-svg-icons/faFileExport';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons/faFileInvoice';
import { faFileSignature } from '@fortawesome/free-solid-svg-icons/faFileSignature';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons/faFileUpload';
import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter';
import { faGlassWhiskey } from '@fortawesome/free-solid-svg-icons/faGlassWhiskey';
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe';
import { faHardHat } from '@fortawesome/free-solid-svg-icons/faHardHat';
import { faHatCowboy } from '@fortawesome/free-solid-svg-icons/faHatCowboy';
import { faHdd } from '@fortawesome/free-solid-svg-icons/faHdd';
import { faIdCard } from '@fortawesome/free-solid-svg-icons/faIdCard';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import { faKey } from '@fortawesome/free-solid-svg-icons/faKey';
import { faLanguage } from '@fortawesome/free-solid-svg-icons/faLanguage';
import { faLevelUpAlt } from '@fortawesome/free-solid-svg-icons/faLevelUpAlt';
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import { faLockOpen } from '@fortawesome/free-solid-svg-icons/faLockOpen';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons/faMapMarkerAlt';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons/faMinusSquare';
import { faMoon } from '@fortawesome/free-solid-svg-icons/faMoon';
import { faNetworkWired } from '@fortawesome/free-solid-svg-icons/faNetworkWired';
import { faPalette } from '@fortawesome/free-solid-svg-icons/faPalette';
import { faPause } from '@fortawesome/free-solid-svg-icons/faPause';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons/faPlusSquare';
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons/faProjectDiagram';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons/faQuestionCircle';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons/faRedoAlt';
import { faReply } from '@fortawesome/free-solid-svg-icons/faReply';
import { faRing } from '@fortawesome/free-solid-svg-icons/faRing';
import { faRocket } from '@fortawesome/free-solid-svg-icons/faRocket';
import { faRoute } from '@fortawesome/free-solid-svg-icons/faRoute';
import { faSatelliteDish } from '@fortawesome/free-solid-svg-icons/faSatelliteDish';
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faServer } from '@fortawesome/free-solid-svg-icons/faServer';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons/faShieldAlt';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons/faSnowflake';
import { faSort } from '@fortawesome/free-solid-svg-icons/faSort';
import { faSortDown } from '@fortawesome/free-solid-svg-icons/faSortDown';
import { faSortUp } from '@fortawesome/free-solid-svg-icons/faSortUp';
import { faStop } from '@fortawesome/free-solid-svg-icons/faStop';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons/faStopwatch';
import { faSun } from '@fortawesome/free-solid-svg-icons/faSun';
import { faSync } from '@fortawesome/free-solid-svg-icons/faSync';
import { faTape } from '@fortawesome/free-solid-svg-icons/faTape';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import { faToolbox } from '@fortawesome/free-solid-svg-icons/faToolbox';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faUnlink } from '@fortawesome/free-solid-svg-icons/faUnlink';
import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faUserCog } from '@fortawesome/free-solid-svg-icons/faUserCog';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { faWallet } from '@fortawesome/free-solid-svg-icons/faWallet';
import { faWarehouse } from '@fortawesome/free-solid-svg-icons/faWarehouse';
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons/faBell';
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons/faCircle';
import { faClone } from '@fortawesome/free-regular-svg-icons/faClone';
import { faFile } from '@fortawesome/free-regular-svg-icons/faFile';
import { faFileAlt } from '@fortawesome/free-regular-svg-icons/faFileAlt';
import { faFolder } from '@fortawesome/free-regular-svg-icons/faFolder';
import { faHourglass } from '@fortawesome/free-regular-svg-icons/faHourglass';
import { faPauseCircle } from '@fortawesome/free-regular-svg-icons/faPauseCircle';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons/faPlayCircle';
import { faThumbsDown } from '@fortawesome/free-regular-svg-icons/faThumbsDown';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons/faThumbsUp';

/**
 * Icon mapping - each icon is individually imported to enable tree-shaking.
 * Bundlers can eliminate unused icon imports.
 */
const iconMap: Record<string, IconDefinition> = {
  Account: faWallet,
  Backend: faNetworkWired,
  Tape: faTape,
  'Node-backend': faServer,
  'Volume-backend': faHdd,
  'Node-pdf': faDatabase,
  'Volume-pdf': faCompactDisc,
  Network: faProjectDiagram,
  Bucket: faGlassWhiskey,
  'Cloud-backend': faCloud,
  Datacenter: faWarehouse,
  'Simple-user': faUser,
  User: faUserCog,
  Group: faUsers,
  Alert: fasBell,
  Bell: farBell,
  'Lat-menu': faBars,
  Dashboard: faDesktop,
  Workflow: faRoute,
  Expiration: faStopwatch,
  Replication: faCoins,
  Transition: faRocket,
  Discovery: faReply,
  Metrics: faChartLine,
  Edit: faEdit,
  Logs: faFileAlt,
  Lock: faLock,
  'Lock-open': faLockOpen,
  'Create-add': faPlus,
  Delete: faTrash,
  Save: faSave,
  'External-link': faExternalLinkAlt,
  Link: faLink,
  Unlink: faUnlink,
  Close: faTimes,
  'Dropdown-down': faCaretDown,
  'Dropdown-up': faCaretUp,
  Search: faSearch,
  More: faEllipsisV,
  Info: faQuestionCircle,
  Sync: faSync,
  Export: faFileExport,
  Copy: faClone,
  'Simple-upload': faUpload,
  Upload: faFileUpload,
  'Add-plus': faPlusSquare,
  Minus: faMinus,
  'Remove-minus': faMinusSquare,
  Sort: faSort,
  'Sort-up': faSortUp,
  'Sort-down': faSortDown,
  Calendar: faCalendarWeek,
  'Calendar-minus': faCalendarMinus,
  'Arrow-up': faArrowUp,
  'Arrow-down': faArrowDown,
  'Arrow-right': faArrowRight,
  'Arrow-left': faArrowLeft,
  'Arrow-alt-circle-up': faArrowAltCircleUp,
  Folder: faFolder,
  File: faFile,
  'File-invoice': faFileInvoice,
  License: faFileInvoice,
  'Deletion-marker': faBan,
  'Map-marker': faMapMarkerAlt,
  Location: faMapMarkerAlt,
  'Info-circle': faInfoCircle,
  'Exclamation-triangle': faExclamationTriangle,
  'Exclamation-circle': faExclamationCircle,
  Exclamation: faExclamation,
  Check: faCheck,
  Protected: faShieldAlt,
  'Chevron-left': faChevronLeft,
  'Chevron-right': faChevronRight,
  'Chevron-down': faChevronDown,
  'Chevron-up': faChevronUp,
  'Angle-right': faAngleRight,
  'Angle-double-right': faAngleDoubleRight,
  Language: faLanguage,
  Theme: faPalette,
  Documentation: faClipboardList,
  Support: faComments,
  EULA: faFileContract,
  'Log-out': faSignOutAlt,
  Hourglass: faHourglass,
  Pause: faPause,
  'Pause-circle': faPauseCircle,
  'Play-circle': faPlayCircle,
  Upgrade: faLevelUpAlt,
  Expansion: faExpandAlt,
  Rebalance: faBalanceScale,
  Maintenance: faHardHat,
  Role: faHatCowboy,
  'Change-erasure': faExchangeAlt,
  'Circle-health': fasCircle,
  'Circle-empty': farCircle,
  'Dot-circle': faDotCircle,
  'Check-circle': faCheckCircle,
  'Times-circle': faTimesCircle,
  Toolbox: faToolbox,
  Cubes: faCubes,
  Policy: faFileSignature,
  Pen: faPen,
  Pencil: faPencilAlt,
  Eye: faEye,
  EyeSlash: faEyeSlash,
  Snowflake: faSnowflake,
  Key: faKey,
  Filter: faFilter,
  Download: faDownload,
  Certificate: faCertificate,
  Redo: faRedoAlt,
  Eraser: faEraser,
  'ID-card': faIdCard,
  Setting: faCog,
  Desktop: faDesktop,
  Globe: faGlobe,
  Satellite: faSatelliteDish,
  LightMode: faSun,
  DarkMode: faMoon,
  News: faBullhorn,
  Ring: faRing,
  Stop: faStop,
  Play: faPlay,
  Mail: faEnvelope,
  ThumbsUp: faThumbsUp,
  ThumbsDown: faThumbsDown,
  Sidebar: faColumns,
  Bookopen: faBookOpen,
};

/**
 * Gets an icon definition by name.
 * This function enables tree-shaking because bundlers can see which icons
 * are actually accessed from the iconMap.
 */
export function getIcon(name: string): IconDefinition | undefined {
  return iconMap[name];
}

/**
 * Maps human-readable icon names to FontAwesome IconDefinitions.
 * This table is built from individually imported icons, allowing bundlers
 * to tree-shake unused icons.
 */
export const iconTable: Record<string, IconDefinition> = iconMap;
