import { CSSProperties, ReactNode } from 'react';
import { Icon } from './icon/Icon.component';
import { Position, Tooltip } from './tooltip/Tooltip.component';

type IconHelpProps = {
  tooltipMessage: ReactNode;
  placement?: Position;
  overlayStyle?: CSSProperties;
};

export const IconHelp = ({
  tooltipMessage,
  overlayStyle,
  placement = 'right',
}: IconHelpProps) => (
  <Tooltip
    overlay={tooltipMessage}
    placement={placement}
    overlayStyle={overlayStyle}
  >
    <Icon name="Info" color="buttonSecondary" />
  </Tooltip>
);
