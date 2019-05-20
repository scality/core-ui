//@flow
import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import Color from "color";
import Button from "../button/Button.component";
import * as defaultTheme from "../../style/theme";
import { mergeTheme } from "../../utils";
import type { Variant } from "../constants";

export type Props = {
  uid: string,
  title: string,
  message?: string,
  variant?: Variant,
  dismissAfter?: number,
  onDismiss?: string => void
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
  padding: 0 ${defaultTheme.padding.base} ${defaultTheme.padding.smaller} 0;
  font-weight: ${defaultTheme.fontWeight.bold};
`;
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

const NotificationClose = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
  &:hover {
    color: ${defaultTheme.grayLightest};
  }
`;

function Notification(props: Props) {
  const [dismissProgress, setDismissProgress] = useState(0);

  const dismissProgressRef = useRef(dismissProgress);
  dismissProgressRef.current = dismissProgress;

  useEffect(() => {
    if (props.dismissAfter) {
      if (dismissProgressRef.current === props.dismissAfter) {
        dismiss();
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

  const dismiss = () => {
    props.onDismiss && props.onDismiss(props.uid);
  };
  return (
    <NotificationContainer className="sc-notification" variant={props.variant}>
      <NotificationTitle>{props.title}</NotificationTitle>
      <div>{props.message}</div>
      {!!props.dismissAfter && (
        <NotificationDismissProgress
          value={dismissProgress}
          max={props.dismissAfter}
          variant={props.variant}
        />
      )}
      <NotificationClose onClick={dismiss}>
        <i className="fas fa-times" />
      </NotificationClose>
    </NotificationContainer>
  );
}

export default Notification;
