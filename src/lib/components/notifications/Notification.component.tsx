import { darken } from 'polished';
import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { spacing } from '../../spacing';
import {
  fontWeight,
  grayDarkest,
  black,
  white,
  grayLightest,
} from '../../style/theme';
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
  padding: ${spacing.r16};
  margin-top: ${spacing.r16};
  border-radius: 5px;
  box-shadow: 0px 0px 3px ${grayDarkest};

  ${(props) => {
    const variant = props.variant ?? 'backgroundLevel1';
    const background = getThemePropSelector(variant)(props);
    switch (props.variant) {
      case 'warning':
        return css`
          background-color: ${background};
          color: ${black};
        `;
      case undefined:
        return css`
          background-color: ${background};
          color: ${props.theme.textPrimary};
        `;
      default:
        return css`
          background-color: ${background};
          color: ${white};
        `;
    }
  }};
`;
const NotificationTitle = styled.div`
  padding: 0 ${spacing.r16} ${spacing.r4} 0;
  font-weight: ${fontWeight.bold};
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
    color: ${grayLightest};
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
