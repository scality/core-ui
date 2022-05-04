import React from 'react';
import styled, { css } from 'styled-components';
import * as defaultTheme from '../../style/theme';
import Notification from './Notification.component';
import { Props as NotificationProps } from './Notification.component';
export const TOP_LEFT = 'tl';
export const TOP_RIGHT = 'tr';
export const BOTTOM_LEFT = 'bl';
export const BOTTOM_RIGHT = 'br';
type Position =
  | typeof TOP_LEFT
  | typeof TOP_RIGHT
  | typeof BOTTOM_LEFT
  | typeof BOTTOM_RIGHT;
type Props = {
  position?: Position;
  notifications: Array<NotificationProps>;
  onDismiss: (arg0: string) => void;
};
const NotificationsContainer = styled.div`
  position: fixed;
  z-index: ${defaultTheme.zIndex.notification};
  margin: ${defaultTheme.padding.larger};
  ${(props) => {
    switch (props.position) {
      case TOP_LEFT:
        return css`
          top: 0;
          left: 0;
        `;

      case BOTTOM_RIGHT:
        return css`
          bottom: 0;
          right: 0;
        `;

      case BOTTOM_LEFT:
        return css`
          bottom: 0;
          left: 0;
        `;

      default:
        return css`
          top: 0;
          right: 0;
        `;
    }
  }};
`;

function Notifications({ position, notifications, onDismiss, ...rest }: Props) {
  return (
    <NotificationsContainer
      className="sc-notifications"
      position={position}
      {...rest}
    >
      {notifications.map((notification) => (
        <Notification
          key={notification.uid}
          {...notification}
          onDismiss={onDismiss}
        />
      ))}
    </NotificationsContainer>
  );
}

export default Notifications;
