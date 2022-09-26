import { CSSProperties } from 'react';
import { Icon } from './icon/Icon.component';
import { Position, Tooltip } from './tooltip/Tooltip.component';

type IconHelpProps = {
  tooltipMessage: string;
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
