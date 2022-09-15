import * as React from 'react';
import styled, { css } from 'styled-components';
import { getTheme } from '../../utils';
import { Status } from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faQuestionCircle,
  faExclamationCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
const BadgeWrapper = styled.span`
  height: fit-content;
  width: fit-content;
  position: relative;
  margin-right: 0.5rem;
  display: inline-block;
`;
const BadgeStyled = styled(FontAwesomeIcon)`
  ${(props) => {
    const theme = getTheme(props);
    return css`
      background: ${theme.backgroundLevel1};
      border-radius: 50%;
      color: ${theme.textSecondary};
      position: absolute;
      top: -25%;
      right: -35%;
      transform: scale(0.5);
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    `;
  }}
`;

const getBadgeIcon = (status: Status) => {
  switch (status) {
    case 'warning':
      return faExclamationCircle;

    case 'critical':
      return faTimesCircle;

    case 'unknown':
      return faQuestionCircle;

    case 'healthy':
    default:
      return null;
  }
};

type Props = {
  status: Status;
  children: React.ReactNode;
};

function StatusWrapper({ status, children }: Props) {
  const icon = getBadgeIcon(status);
  return (
    <BadgeWrapper>
      {children}
      {icon !== null && <BadgeStyled icon={icon} />}
    </BadgeWrapper>
  );
}

export { StatusWrapper };
