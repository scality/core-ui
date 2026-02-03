import { CSSProperties, ReactNode } from 'react';
import { Icon } from '../icon/Icon.component';
import { Position, Tooltip } from '../tooltip/Tooltip.component';

type IconHelpProps = {
  tooltipMessage: ReactNode;
  placement?: Position;
  overlayStyle?: CSSProperties;
  /**
   * Accessible label for screen readers. Defaults to "Info".
   */
  ariaLabel?: string;
  /**
   * @deprecated Use ariaLabel instead. FA7 recommends aria-label over title.
   */
  title?: string;
};

export const IconHelp = ({
  tooltipMessage,
  overlayStyle,
  placement = 'right',
  ariaLabel = 'Info',
  title,
}: IconHelpProps) => (
  <Tooltip
    overlay={tooltipMessage}
    placement={placement}
    overlayStyle={overlayStyle}
  >
    <Icon
      name="Info"
      color="buttonSecondary"
      ariaLabel={ariaLabel || title}
    />
  </Tooltip>
);
