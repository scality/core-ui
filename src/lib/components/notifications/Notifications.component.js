import React from "react";
import styled, { css } from "styled-components";
import Button from "../button/Button.component";
import { Timer } from "../../utils";
import * as defaultTheme from "../../style/theme";
import { mergeTheme } from "../../utils";
import Notification, {
  Props as NotificationProps
} from "./Notification.component";

export const TOP_LEFT = "tl";
export const TOP_RIGHT = "tr";
export const BOTTOM_LEFT = "bl";
export const BOTTOM_RIGHT = "br";

type Position = TOP_LEFT | TOP_RIGHT | BOTTOM_LEFT | BOTTOM_RIGHT;
type Props = {
  position: Position,
  notifications: Array<NotificationProps>
};

const NotificationsContainer = styled.div`
  position: fixed;
  z-index: ${defaultTheme.zIndex.notification};
  margin: ${defaultTheme.padding.larger};
  ${props => {
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

function Notifications(props: Props) {
  return (
    <NotificationsContainer
      className="sc-notifications"
      position={props.position}
    >
      {props.notifications.map((notification, index) => (
        <Notification key={index} {...notification} />
      ))}
    </NotificationsContainer>
  );
}

export default Notifications;
