//@flow
import React from "react";
import * as defaultTheme from "../../style/theme";
import styled, { css } from "styled-components";

export type NotificationProps = {
  important: boolean,
  text: string
};

export type NotificationListProps = {
  notifications: Array<NotificationProps>,
  borderColor: string,
  fontColor: string,
  importantBackground: string,
  fontSize: string
};

const ContainerNotification = styled.div`
  ${props => {
    return css`
      margin: 5px 0 10px 0;
      position: relative;
    `;
  }}
`;

const ContainerNotificationList = styled.div`
  ${props => {
    return css`
      background: transparent;
      width: 100%;
      height: auto;
      border: solid 1px ${props.borderColor};
      border-radius: 4px;
      color: ${props.fontColor};
      padding: 5px 20px 5px 20px;
      font-size: ${props.fontSize};
    `;
  }}
`;

const Bullet = styled.div`
  ${props => {
    return css`
      display: inline-block;
      background: ${props.important ? props.importantBackground : 'transparent'};
      width: 12px;
      height: 12px;
      margin: 0 15px 0 0;
      border-radius: 100%;
      border: solid 1px ${props.borderColor};
    `;
  }};
`;

const Notification = ({
  important,
  text,
  importantBackground,
  borderColor
}) =>
  <ContainerNotification>
    <Bullet
      important={important}
      importantBackground={importantBackground}
      borderColor={borderColor}
    />
    { text }
  </ContainerNotification>

const NotificationList = ({
  notifications = [],
  borderColor = defaultTheme.brand.primary,
  fontColor = defaultTheme.brand.primary,
  importantBackground = defaultTheme.warmRed,
  fontSize = defaultTheme.fontSize.small
}: NotificationListProps) =>
  <ContainerNotificationList
    borderColor={borderColor}
    color={fontColor}
    fontSize={fontSize}
  >
    {
      notifications.map(({ important, text }) =>
        <Notification
          important={important}
          text={text}
          importantBackground={importantBackground}
          borderColor={borderColor}
          key={text}
        />
      )
    }
  </ContainerNotificationList>

export default NotificationList;
