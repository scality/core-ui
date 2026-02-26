import { CSSProperties, ReactNode } from 'react';
import styled from 'styled-components';
import { Icon } from '../icon/Icon.component';
import { Position, Tooltip } from '../tooltip/Tooltip.component';

type IconHelpProps = {
  tooltipMessage: ReactNode;
  placement?: Position;
  overlayStyle?: CSSProperties;
  /**
   * Accessible label for the help button.
   * Should describe what information the tooltip provides.
   * Example: "More info about Veeam application"
   */
  'aria-label'?: string;
  /** @deprecated Use aria-label instead */
  title?: string;
};

const HelpButton = styled.button`
  display: inline-flex;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  color: inherit;
  font: inherit;              /* Inherit font sizing */
  vertical-align: text-bottom;     /* Align with text */
  line-height: 1;    
  &:focus-visible {
    outline: 2px dashed ${(props) => props.theme.selectedActive};
    outline-offset: 2px;
    border-radius: 2px;
  }
`;

export const IconHelp = ({
  tooltipMessage,
  overlayStyle,
  placement = 'right',
  'aria-label': ariaLabel,
  title,
}: IconHelpProps) => (
  <Tooltip
    overlay={tooltipMessage}
    placement={placement}
    overlayStyle={overlayStyle}
  >
    <HelpButton
      type="button"
      aria-label={ariaLabel || title || 'More information'}
    >
      <Icon name="Info" color="buttonSecondary" />
    </HelpButton>
  </Tooltip>
);
