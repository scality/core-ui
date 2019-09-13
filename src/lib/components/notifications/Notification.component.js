//@flow
import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { darken } from "polished";
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
  border-radius: 5px;
  ${props => {
    const brandingTheme = mergeTheme(props.theme, defaultTheme);
    const brandDark = darken(0.1, brandingTheme[props.variant || "primary"]);

    return css`
      background-color: ${brandDark};
      width: ${(props.value / props.max) * 100}%;
      transition: width 1s;
      transition-timing-function: linear;
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

function Notification({
  uid,
  title,
  message,
  variant,
  dismissAfter,
  onDismiss,
  ...rest
}: Props) {
  const [dismissProgress, setDismissProgress] = useState(0);
  const [timerId, setTimerId] = useState(null);

  const dismissProgressRef = useRef(dismissProgress);
  dismissProgressRef.current = dismissProgress;

  useEffect(() => {
    resumeTimer();
  }, [dismissProgress]);

  const clearTimer = () => {
    if (dismissAfter) {
      setTimerId(null);
      clearInterval(timerId);
    }
  };

  const resumeTimer = () => {
    if (dismissAfter) {
      if (dismissProgressRef.current === dismissAfter) {
        dismiss();
      } else if (!timerId) {
        setTimerId(
          setInterval(() => {
            setDismissProgress(dismissProgressRef.current + 1000);
          }, 1000)
        );
      }
    }
  };

  const dismiss = () => {
    if (timerId) {
      clearTimer();
    }
    onDismiss && onDismiss(uid);
  };

  return (
    <NotificationContainer
      className="sc-notification"
      variant={variant}
      onMouseEnter={clearTimer}
      onMouseLeave={resumeTimer}
      {...rest}
    >
      <NotificationTitle>{title}</NotificationTitle>
      <div>{message}</div>
      {!!dismissAfter && (
        <NotificationDismissProgress
          value={dismissProgress}
          max={dismissAfter}
          variant={variant}
        />
      )}
      <NotificationClose onClick={dismiss}>
        <i className="fas fa-times" />
      </NotificationClose>
    </NotificationContainer>
  );
}

export default Notification;
