import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import Color from "color";
import Button from "../button/Button.component";
import * as defaultTheme from "../../style/theme";
import { mergeTheme } from "../../utils";
import type { Variant } from "../constants";

export type Props = {
  title: string,
  message: string,
  variant: Variant,
  dismissAfter: number
};

const NotificationContainer = styled.div`
  position: relative;
  padding: ${defaultTheme.padding.base};
  margin-top: ${defaultTheme.padding.base};
  border-radius: 5px;
  box-shadow: 5px 5px 15px ${defaultTheme.gray};

  ${props => {
    const brandingTheme = mergeTheme(props.theme, defaultTheme);
    return css`
      background-color: ${brandingTheme[props.variant || "primary"]};
      color: ${defaultTheme.white};
    `;
  }};
`;
const NotificationTitle = styled.div`
  padding-bottom: ${defaultTheme.padding.smaller};
  font-weight: ${defaultTheme.fontWeight.bold};
`;

const NotificationMessage = styled.div``;
const NotificationDismissProgress = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 5px;

  ${props => {
    const brandingTheme = mergeTheme(props.theme, defaultTheme);
    const brandDark = Color(brandingTheme[props.variant || "primary"])
      .darken(0.2)
      .hsl()
      .string();

    return css`
      background-color: ${brandDark};
      width: ${(props.value / props.max) * 100}%;
    `;
  }};
`;

function Notification(props: Props) {
  const [visible, setVisible] = useState(true);
  const [dismissProgress, setDismissProgress] = useState(0);

  const dismissProgressRef = useRef(dismissProgress);
  dismissProgressRef.current = dismissProgress;

  useEffect(() => {
    if (props.dismissAfter) {
      if (dismissProgressRef.current === props.dismissAfter) {
        setVisible(false);
      } else {
        let timerId = setTimeout(() => {
          setDismissProgress(dismissProgressRef.current + 1000); // setDismissProgress relaunchs useEffect
        }, 1000);
        return () => {
          clearTimeout(timerId);
        };
      }
    }
  }, [dismissProgress]);

  return visible ? (
    <NotificationContainer className="sc-notification" variant={props.variant}>
      <NotificationTitle>{props.title}</NotificationTitle>
      <NotificationMessage>{props.message}</NotificationMessage>
      <NotificationDismissProgress
        value={dismissProgress}
        max={props.dismissAfter}
        variant={props.variant}
      />
    </NotificationContainer>
  ) : null;
}

export default Notification;
