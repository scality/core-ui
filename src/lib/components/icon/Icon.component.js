// @flow
import React, { Suspense } from 'react';
import styled, { css } from 'styled-components';
import { brand } from '../../style/theme';
import { getTheme } from '../../utils';
import Loader from '../loader/Loader.component';
import type { SizeProp } from '@fortawesome/react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const iconTable = {
  "Account": "fas faWallet",
  "Backend": "fas faNetworkWired",
  "Tape": "fas faTape",
  "Node-backend": "fas faServer",
  "Volume-backend": "fas faHdd",
  "Node-pdf": "fas faDatabase",
  "Volume-pdf": "fas faCompactDisc",
  "Network": "fas faProjectDiagram",
  "Bucket": "fas faGlassWhiskey",
  "Cloud-backend": "fas faCloud",
  "Datacenter": "fas faWarehouse",
  "User": "fas faUserCog",
  "Alert": "fas faBell",
  "Lat-menu": "fas faBars",
  "Dashboard": "fas faDesktop",
  "Expiration": "fas faStopwatch",
  "Replication": "fas faCoins",
  "Transition": "fas faThermometerEmpty",
  "Discovery": "fas faReply",
  "Metrics": "fas faChartLine",
  "Edit": "fas faEdit",
  "Logs": "far faFileAlt",
  "Create-add": "fas faPlus",
  "Delete": "fas faTrash",
  "Save": "fas faSave",
  "External-link": "fas faExternalLinkAlt",
  "Close": "fas faTimes",
  "Dropdown-down": "fas faCaretDown",
  "Dropdown-up": "fas faCaretUp",
  "Search": "fas faSearch",
  "More": "fas faEllipsisV",
  "Info": "fas faQuestionCircle",
  "Sync": "fas faSync",
  "Export": "fas faFileExport",
  "Copy": "far faClone",
  "Upload": "fas faFileUpload",
  "Add-plus": "fas faPlusSquare",
  "Remove-minus": "fas faMinusSquare",
  "Sort": "fas faSort",
  "Sort-up": "fas faSortUp",
  "Sort-down": "fas faSortDown",
  "Calendar": "fas faCalendarWeek",
  "Arrow-up": "fas faArrowUp",
  "Arrow-down": "fas faArrowDown",
  "Folder": "far faFolder",
  "File": "far faFile",
  "Deletion-marker": "fas faBan",
  "Info-circle": "fas faInfoCircle",
  "Exclamation-triangle": "fas faExclamationTriangle",
  "Exclamation-circle": "fas faExclamationCircle",
  "Check": "fas faCheck",
  "Protected": "fas faShieldAlt",
  "Chevron-left": "fas faChevronLeft",
  "Chevron-right": "fas faChevronRight",
  "Angle-double-right": "fas faAngleDoubleRight",
  "Language": "fas faLanguage",
  "Theme": "fas faPalette",
  "Documentation": "fas faClipboardList",
  "Support": "fas faComments",
  "EULA": "fas faFileContract",
  "Log-out": "fas faSignOutAlt",
  "Hourglass": "far faHourglass",
  "Pause": "fas faPause",
  "Upgrade": "fas faLevelUpAlt",
  "Expansion": "fas faExpandAlt",
  "Rebalance": "fas faBalanceScale",
  "Maintenance": "fas faHardHat",
  "Change-erasure": "fas faExchangeAlt",
  "Circle-health": "fas faCircle",
  "Circle-empty": "far faCircle",
};

const IconStyled = styled(FontAwesomeIcon)`
  ${props => {
    const theme = getTheme(props);
    if (props.color && theme[props.color]) {
      return css`
          color: ${theme[props.color]};
      `;
    }
  }}
`;

type Props = {
  name: $Keys<typeof iconTable>,
  size?: SizeProp,
  color?: $Keys<typeof brand>,
};

function getLazyStyledIcon(iconInfo) {
  const [iconType, iconClass] = iconInfo.split(' ');
  return React.lazy(async () => {
    try {
      const fontAwesomeType = iconType === "far" ? "free-regular-svg-icons" : "free-solid-svg-icons";
      const icon = await import(`@fortawesome/${fontAwesomeType}/${iconClass}.js`);
      return { default: ({ color, size, ...rest }) => <IconStyled color={ color } icon={ icon[iconClass] } size={ size } { ...rest } /> }
    } catch {
      return { default: () => <Loader size="base" /> };
    }
  })
}

function Icon({
  name,
  size = "1x",
  color = null,
  ...rest
}: Props) {
  const iconClass = iconTable[name];

  if (!iconClass)
    throw new Error(`${name}: is not a valid icon.`);

  const LazyStyledIcon = getLazyStyledIcon(iconClass);

  return (
    <Suspense fallback={<Loader size="base" />}>
      <LazyStyledIcon color={ color } size={ size } { ...rest }/>
    </Suspense>
  );
}

export default Icon;
