import { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { darken } from 'polished';
import * as defaultTheme from '../../style/theme';
import { getThemePropSelector } from '../../utils';
import { Variant } from '../constants';
import { Icon } from '../icon/Icon.component';
export type Props = {
  uid: string;
  title: string;
  message?: string;
  variant?: Variant;
  dismissAfter?: number;
  onDismiss?: (arg0: string) => void;
};
const NotificationContainer = styled.div<{ variant?: Variant }>`
  position: relative;
  padding: ${defaultTheme.padding.base};
  margin-top: ${defaultTheme.padding.base};
  border-radius: 5px;
  box-shadow: 0px 0px 3px ${defaultTheme.grayDarkest};

  ${(props) => {
    const variant = props.variant ?? 'backgroundLevel1';
    const background = getThemePropSelector(variant)(props);
    switch (props.variant) {
      case 'warning':
        return css`
          background-color: ${background};
          color: ${defaultTheme.black};
        `;

      default:
        return css`
          background-color: ${background};
          color: ${defaultTheme.white};
        `;
    }
  }}
`;
const NotificationTitle = styled.div`
  padding: 0 ${defaultTheme.padding.base} ${defaultTheme.padding.smaller} 0;
  font-weight: ${defaultTheme.fontWeight.bold};
`;
const NotificationDismissProgress = styled.div<{
  variant?: Variant;
  value: number;
  max: number;
}>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 5px;
  border-radius: 5px;
  ${(props) => {
    const variant = props.variant || 'backgroundLevel1';
    const background = getThemePropSelector(variant)(props);
    const brandDark = darken(0.1, background);
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
  const [timerId, setTimerId] = useState<number | undefined>(undefined);
  const dismissProgressRef = useRef(dismissProgress);
  dismissProgressRef.current = dismissProgress;
  useEffect(() => {
    resumeTimer();
  });

  const clearTimer = () => {
    if (dismissAfter) {
      setTimerId(undefined);
      clearTimeout(timerId);
    }
  };

  const resumeTimer = () => {
    if (dismissAfter) {
      if (dismissProgressRef.current === dismissAfter) {
        dismiss();
      } else if (!timerId) {
        setTimerId(
          //@ts-ignore node typing detected here instead of Dom one
          setTimeout(() => {
            setDismissProgress(dismissProgressRef.current + 1000);
            resumeTimer();
          }, 1000),
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
        <Icon name="Close" />
      </NotificationClose>
    </NotificationContainer>
  );
}

export { Notification };
