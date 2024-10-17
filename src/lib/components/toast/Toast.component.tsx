import { motion } from 'framer-motion';
import React, { ReactNode, useRef } from 'react';
import { useTheme } from 'styled-components';
import { Box } from '../box/Box';
import { Button } from '../buttonv2/Buttonv2.component';
import { Icon } from '../icon/Icon.component';
import { BasicText } from '../text/Text.component';
import { ToastPosition, positionOutput } from './ToastPositionHelpers';
import { DurationBasedProgressBar } from './DurationBasedProgressBar';
import { useToastParameters } from './useToastParameters';
import styled from 'styled-components';

export type ToastStatus = 'success' | 'error' | 'warning' | 'info';

export type ToastProps = {
  open: boolean;
  message: ReactNode;
  onClose: () => void;
  status?: ToastStatus;
  position?: ToastPosition;
  autoDismiss?: boolean;
  duration?: number;
  icon?: React.ReactNode;
  width?: React.CSSProperties['width'];
  withProgressBar?: boolean;
  style?: React.CSSProperties;
};

export const useGetBackgroundColor = (status: string) => {
  const theme = useTheme();
  switch (status) {
    case 'success':
      return theme.statusHealthy;
    case 'error':
      return theme.statusCritical;
    case 'warning':
      return theme.statusWarning;
    default:
      return theme.infoPrimary;
  }
};

const useGetRgbBackgroundColor = (status: string) => {
  const theme = useTheme();
  switch (status) {
    case 'success':
      return `rgba(${theme.statusHealthyRGB}, 0.4)`;
    case 'error':
      return `rgba(${theme.statusCriticalRGB}, 0.4)`;
    case 'warning':
      return `rgba(${theme.statusWarningRGB}, 0.4)`;
    default:
      return theme.infoSecondary;
  }
};

const defaultIconName = (status: string) => {
  switch (status) {
    case 'success':
      return 'Check-circle';
    case 'error':
      return 'Times-circle';
    case 'warning':
      return 'Exclamation-circle';
    default:
      return 'Info-circle';
  }
};

const DefaultIcon = ({ status }: { status: string }) => {
  const color = useGetBackgroundColor(status);
  const iconName = defaultIconName(status);

  return <Icon name={iconName} color={color} />;
};

const DEFAULT_WIDTH = '25rem';

const IconContainer = styled.div<{ bgColor: string }>`
  align-items: center;
  align-self: stretch;
  border-radius: 4px 0px 0px 4px;
  display: flex;
  gap: 16px;
  justify-content: center;
  position: relative;
  width: 32px;
  background-color: ${(props) => props.bgColor};
`;

const ContentContainer = styled.div`
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 1;
  flex-grow: 1;
  gap: 8px;
  padding: 0px 16px;
  position: relative;
`;

function Toast({
  open,
  message,
  onClose,
  position = 'top-right',
  status = 'info',
  autoDismiss = true,
  duration = 5000,
  icon = <DefaultIcon status={status} />,
  width = DEFAULT_WIDTH,
  withProgressBar = false,
  style,
}: ToastProps) {
  const ref = useRef(null);
  const { params } = useToastParameters({
    open,
    duration: autoDismiss ? duration : null,
    onClose,
  });

  const positionStyle = positionOutput[position];

  const bgColor = useGetBackgroundColor(status);
  const rgbBgColor = useGetRgbBackgroundColor(status);
  const theme = useTheme();

  if (!open) {
    return null;
  }

  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      aria-labelledby={`${status}_toast`}
      style={{
        position: 'fixed',
        ...(style || positionStyle),
        width,
      }}
    >
      <motion.div
        key="toast"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        style={{
          alignItems: 'flex-end',
          backgroundColor: theme.backgroundLevel1,
          border: `1px solid ${theme.border}`,
          boxShadow: '0px 4px 10px 4px #000',
          display: 'flex',
          borderRadius: '4px',
          position: 'relative',
        }}
      >
        <IconContainer bgColor={rgbBgColor}>{icon}</IconContainer>
        <ContentContainer>
          <BasicText>{message}</BasicText>
        </ContentContainer>
        <Box display="flex" alignItems="center" alignSelf="stretch">
          <Button
            icon={<Icon name="Close" size="lg" color="textSecondary" />}
            onClick={params?.onClose}
            aria-label="Close"
            tooltip={{ overlay: 'Close', placement: 'top' }}
          />
        </Box>
      </motion.div>
      {withProgressBar && (
        <DurationBasedProgressBar
          duration={autoDismiss ? duration : null}
          color={bgColor}
        />
      )}
    </div>
  );
}

export { Toast };
