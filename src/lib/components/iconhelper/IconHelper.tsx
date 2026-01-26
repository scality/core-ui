import { CSSProperties, ReactNode } from 'react';
import { Icon } from '../icon/Icon.component';
import { Position, Tooltip } from '../tooltip/Tooltip.component';

type IconHelpProps = {
  tooltipMessage: ReactNode;
  placement?: Position;
  overlayStyle?: CSSProperties;
  ariaLabel?: string;
  /** @deprecated Use ariaLabel instead for screen reader accessibility */
  title?: string;
};

export const IconHelp = ({
  tooltipMessage,
  overlayStyle,
  placement = 'right',
  ariaLabel,
  title,
}: IconHelpProps) => (
  <Tooltip
    overlay={tooltipMessage}
    placement={placement}
    overlayStyle={overlayStyle}
  >
    <Icon name="Info" color="buttonSecondary" ariaLabel={ariaLabel || title} />
  </Tooltip>
);
