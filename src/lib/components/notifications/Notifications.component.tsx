import styled, { css } from 'styled-components';
import { spacing } from '../../spacing';
import { zIndex } from '../../style/theme';
import {
  Notification,
  Props as NotificationProps,
} from './Notification.component';
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
  className?: string;
};
const NotificationsContainer = styled.div.withConfig({
  componentId: 'sc-notifications',
})<{ $position?: Position }>`
  position: fixed;
  z-index: ${zIndex.notification};
  margin: ${spacing.r24};
  ${(props) => {
    switch (props.$position) {
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

/**
 * Stacks a list of dismissible messages in one corner of the screen, driven by
 * an array the caller owns. Toast is the single-message counterpart: it needs
 * no such list and dismisses itself by default.
 */
function Notifications({
  position,
  notifications,
  onDismiss,
  ...rest
}: Props) {
  return (
    <NotificationsContainer
      $position={position}
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

export { Notifications };
