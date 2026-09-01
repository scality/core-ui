import { CSSProperties, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { spacing } from '../../spacing';
import { Icon } from '../icon/Icon.component';
import { fontSize } from '../../style/theme';
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

/**
 * The icon's footprint. Exported because a caller that has to reserve room for
 * the icon in its own layout needs the same number: read independently, the two
 * agree until the day this one changes, and then the reservation is silently
 * wrong with nothing to catch it.
 */
export const HELP_ICON_SIZE = fontSize.base;

/**
 * `helpIconReserve` and `HelpIconSlot` are a pair -- use both or neither. Together
 * they keep an `IconHelp` on the last line of the label it annotates, for any
 * label, at any width.
 *
 * The icon is an atomic inline, so there is a soft-wrap opportunity in front of it
 * that nothing inside it can suppress: `white-space: nowrap` on a box containing
 * only the icon prevents breaks *within* the box, not the break *before* it. Once
 * the last line of a label filled its column, the icon took that opportunity and
 * landed alone on the next line.
 *
 * `helpIconReserve` goes on the label's own inline box. End padding on a
 * non-replaced inline is applied at the end of its *last* line -- exactly where the
 * icon goes -- and it counts toward the label's min-content width, so a column that
 * sizes itself to its text sizes itself to the icon too.
 *
 * `HelpIconSlot` wraps the icon and is pulled back onto that reserved room by
 * exactly its own width, so its advance is zero: it costs the line nothing to place
 * and no break is ever needed to fit it.
 *
 * Both halves read `HELP_ICON_SIZE`, so the reservation cannot drift from the icon.
 *
 * Two dead ends, both measured, so nobody re-walks them: a plain space between
 * label and icon does not hold them together, and neither does U+2060 WORD JOINER
 * -- Chrome takes the break opportunity at an inline-block boundary regardless.
 */
export const helpIconReserve = css`
  padding-right: calc(${HELP_ICON_SIZE} + ${spacing.r8});
`;

export const HelpIconSlot = styled.span`
  display: inline-block;
  margin-left: -${HELP_ICON_SIZE};
`;

const HelpButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${HELP_ICON_SIZE};
  height: ${HELP_ICON_SIZE};
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  color: inherit;
  font-size: ${HELP_ICON_SIZE};
  line-height: 0;
  vertical-align: -0.125em;
  cursor: default;
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
