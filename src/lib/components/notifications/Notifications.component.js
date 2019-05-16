import React from "react";
import styled from "styled-components";
import Button from "../button/Button.component";
import { Timer } from "../../utils";
import * as defaultTheme from "../../style/theme";
import { mergeTheme } from "../../utils";
import Notification, {
  Props as NotificationProps
} from "./Notification.component";

type Props = {
  position: string,
  notifications: Array<NotificationProps>
};

const NotificationsContainer = styled.div`
  position: fixed;
  z-index: ${defaultTheme.zIndex.notification};
  margin: ${defaultTheme.padding.larger};
  bottom: 0;
  left: 0;
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
