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
 * The icon's footprint. Exported so a caller reserving room for the icon reads this
 * number rather than a copy that can drift.
 */
export const HELP_ICON_SIZE = fontSize.base;

/**
 * Room for a help icon at the end of a label's last line. Pair it with
 * `LabelHelpIcon`, which sits back in that room -- use both or neither.
 *
 * The icon is an atomic inline with a soft-wrap opportunity in front of it that
 * nothing inside it can suppress, so it landed alone on the next line. Padding the
 * label's own inline box puts the room on its last line, where the icon goes, and
 * counts it toward min-content, so a column sized to its text fits the icon too.
 */
export const helpIconReserve = css`
  padding-right: calc(${HELP_ICON_SIZE} + ${spacing.r8});
`;

/**
 * Strips a label's trailing whitespace before `helpIconReserve` is applied to it.
 * The reserve sits at the end of the label's own inline box, so a trailing space
 * leaves a soft-wrap opportunity in front of it and the icon lands alone on the
 * next line -- the one thing the reserve exists to prevent. A label built from a
 * template literal picks one up easily: `` `${name} ${suffix}` `` with an empty
 * suffix ends in a space.
 */
export const trimLabelEnd = (label: string) => label.trimEnd();

const HelpIconSlot = styled.span`
  display: inline-block;
  margin-left: -${HELP_ICON_SIZE};
`;

const maxWidthTooltip = { maxWidth: '20rem' };

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

/**
 * A help icon annotating a label, pulled back onto the room `helpIconReserve` left
 * for it by exactly its own width, so it costs the last line nothing to place.
 */
export const LabelHelpIcon = ({
  tooltipMessage,
}: {
  tooltipMessage: ReactNode;
}) => (
  <HelpIconSlot>
    <IconHelp tooltipMessage={tooltipMessage} overlayStyle={maxWidthTooltip} />
  </HelpIconSlot>
);
