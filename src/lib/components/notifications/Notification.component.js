import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Button from "../button/Button.component";
import { Timer } from "../../utils";
import * as defaultTheme from "../../style/theme";
import { mergeTheme } from "../../utils";
import type { Variant } from "../constants";

type Item = { label: string, onClick: () => void };
type Items = Array<Item>;

export type Props = {
  title: string,
  message: string,
  variant: Variant,
  dismissAfter: number,
  actions: Items
};

const NotificationContainer = styled.div`
  padding: ${defaultTheme.padding.base};
  margin-top: ${defaultTheme.padding.base};
  border-radius: 5px;

  ${props => {
    const brandingTheme = mergeTheme(props.theme, defaultTheme);
    return css`
      background-color: ${brandingTheme[props.variant || "primary"]};
      color: ${defaultTheme.white};
    `;
  }};
`;
const NotificationTitle = styled.div``;
const NotificationMessage = styled.div``;
const NotificationDismiss = styled.div``;
const NotificationActions = styled.div``;

function Notification(props: Props) {
  const [notificationTimer, setNotificationTimer] = useState();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (props.dismissAfter) {
      setNotificationTimer(
        new Timer(() => {
          setVisible(false);
        }, props.dismissAfter)
      );
    }
  });

  const _handleMouseEnter = () => {
    if (props.dismissAfter) {
      notificationTimer.pause();
    }
  };

  const _handleMouseLeave = () => {
    if (props.dismissAfter) {
      notificationTimer.resume();
    }
  };

  return visible ? (
    <NotificationContainer
      className="sc-notification"
      onMouseEnter={_handleMouseEnter}
      onMouseLeave={_handleMouseLeave}
      variant={props.variant}
    >
      <NotificationTitle>{props.title}</NotificationTitle>
      <NotificationMessage>{props.message}</NotificationMessage>
      <NotificationDismiss />
      {props.actions && props.actions.length && (
        <NotificationActions>
          {props.actions.map((action, index) => (
            <Button key={index} text={action.label} onClick={action.onClick} />
          ))}
        </NotificationActions>
      )}
    </NotificationContainer>
  ) : null;
}

export default Notification;
