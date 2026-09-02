import {
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useId,
} from 'react';
import styled, { css } from 'styled-components';
import { spacing } from '../../spacing';

import {
  helpIconReserve,
  HelpIconSlot,
  IconHelp,
} from '../iconhelper/IconHelper';
import { COMPACT_LINE_HEIGHT, Text } from '../text/Text.component';
import { FocusVisibleStyle } from '../buttonv2/Buttonv2.component';

const maxWidthTooltip = { maxWidth: '20rem' };

const getCheckmarkSvgUrl = (color: string) => {
  const encodedColor = color.replace('#', '%23');
  return `url('data:image/svg+xml,%3Csvg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"%3E %3Cpath d="M3 6.68646L5.0671 9L9 3" stroke="${encodedColor}" stroke-width="1.5"/%3E %3C/svg%3E')`;
};

const getIndeterminateSvgUrl = (color: string) => {
  const encodedColor = color.replace('#', '%23');
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E %3Cline x1='6' y1='12' x2='20' y2='12' style='stroke:${encodedColor};stroke-width:4'/%3E %3C/svg%3E")`;
};

const CheckboxInput = styled.input`
	transform: scale(1.5);`;

/**
 * The box and its label, side by side. Typography is declared here so `BoxSlot`
 * can read the line box in `em` and stay in step with it.
 */
const CheckboxRow = styled.span<{ $hasLabel: boolean }>`
  display: flex;
  gap: ${spacing.r8};
  font-size: 1rem;
  line-height: ${COMPACT_LINE_HEIGHT};
  /* A wrapped label hangs under its own first line; centring would put the box
     in the gutter between two lines. */
  align-items: ${({ $hasLabel }) => ($hasLabel ? 'flex-start' : 'center')};
`;

/**
 * Holds the box on the label's first line: a slot one line box tall centring its
 * own content, so neither side has to know how tall the other is. Sized only when
 * there is a label, so a bare `Checkbox` keeps the geometry it had.
 */
const BoxSlot = styled.span<{ $hasLabel: boolean }>`
  display: flex;
  align-items: center;
  flex: none;
  ${({ $hasLabel }) =>
    $hasLabel &&
    css`
      height: ${COMPACT_LINE_HEIGHT}em;
    `}
`;

// A block, so the label's lines and its help icon share one inline formatting
// context and the reserve lands on the last of them. A `span`, because this is
// inside a `<label>`. `min-width: 0` is load-bearing: `break-word` below does not
// lower the min-content width, so without it this flex item refuses to shrink and
// overflows instead of wrapping.
const LabelBlock = styled.span`
  display: block;
  min-width: 0;
`;

/**
 * `overflow-wrap` because a label is not always prose: an event name such as
 * `s3:ObjectCreated:CompleteMultipartUpload` offers nowhere to break, so without it
 * the label overflows instead of wrapping. `break-word` rather than `anywhere`:
 * both break the same way here, but `anywhere` also drops the min-content width to
 * one character, collapsing any label column sized to its content.
 */
const LabelText = styled(Text)<{ $reserveHelpIcon: boolean }>`
  overflow-wrap: break-word;
  ${({ $reserveHelpIcon }) => $reserveHelpIcon && helpIconReserve}
`;

export type Props = {
  /**
   * Label displayed next to the checkbox.
   * Use only for standalone checkboxes (not inside a FormGroup).
   * When inside a FormGroup, set the label on FormGroup's `label` prop instead.
   */
  label?: string;
  /**
   * Help text for a `?` icon at the end of the label, mirroring `FormGroup`'s prop
   * of the same name. Ignored without a `label`.
   */
  labelHelpTooltip?: ReactNode;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const Checkbox = forwardRef<HTMLInputElement, Props>(
  (
    { disabled, checked, label, labelHelpTooltip, value, onChange, ...rest },
    ref,
  ) => {
    const hasLabel = !!label;
    // A `<button>` descendant of the `<label>` contributes its own name to the
    // name the label gives the control, so the box was called "Short label More
    // information". Pointing at the label text alone fixes that. Skipped when the
    // caller names the box itself. jsdom cannot reproduce it -- see the story.
    const labelTextId = useId();
    const callerNamesIt =
      rest['aria-label'] !== undefined || rest['aria-labelledby'] !== undefined;
    return (
      <StyledCheckbox $disabled={disabled} className="sc-checkbox">
        <CheckboxRow $hasLabel={hasLabel}>
          <BoxSlot $hasLabel={hasLabel}>
            <CheckboxInput
              type="checkbox"
              checked={checked}
              disabled={disabled}
              value={value}
              onChange={onChange}
              ref={ref}
              aria-labelledby={
                hasLabel && !callerNamesIt ? labelTextId : undefined
              }
              {...rest}
            />
          </BoxSlot>
          {hasLabel && (
            <LabelBlock>
              <LabelText
                id={labelTextId}
                compact
                $reserveHelpIcon={!!labelHelpTooltip}
              >
                {label}
              </LabelText>
              {labelHelpTooltip && (
                <HelpIconSlot>
                  <IconHelp
                    tooltipMessage={labelHelpTooltip}
                    overlayStyle={maxWidthTooltip}
                  />
                </HelpIconSlot>
              )}
            </LabelBlock>
          )}
        </CheckboxRow>
      </StyledCheckbox>
    );
  },
);

export { Checkbox };

const StyledCheckbox = styled.label<{
  $disabled?: boolean;
}>`
  ${(props) => (props.$disabled ? 'opacity: 0.5;' : '')}
  /* Basic styling */

  [type='checkbox'] {
    width: 0.75rem;
    height: 0.75rem;
    color: ${(props) => props.theme.textPrimary};
    vertical-align: middle;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: none;
    border: 0;
    outline: 0;
    flex-grow: 0;
    border-radius: ${spacing.r2};
    background-color: ${(props) => props.theme.backgroundLevel1};
    transition: background 300ms;
    cursor: pointer;
  }

  /* Pseudo element for check styling */

  [type='checkbox']::before {
    content: '';
    color: transparent;
    display: block;
    width: inherit;
    height: inherit;
    border-radius: inherit;
    border: 0;
    background-color: transparent;
    background-size: contain;
    box-shadow: inset 0 0 0 ${spacing.r1} ${(props) => props.theme.textSecondary};
  }

  /* Checked */

  [type='checkbox']:checked {
    background-color: ${(props) => props.theme.selectedActive};
  }

  [type='checkbox']:checked::before {
    box-shadow: none;
    background-image: ${(props) => getCheckmarkSvgUrl(props.theme.textPrimary)};
    background-repeat: no-repeat;
    background-position: center;
  }

  /* Indeterminate */

  [type='checkbox']:indeterminate::before {
    box-shadow: inset 0 0 0 ${spacing.r1} ${(props) => props.theme.selectedActive};
    background-color: ${(props) => props.theme.highlight};
    background-image: ${(props) => getIndeterminateSvgUrl(props.theme.textPrimary)};
  }

  /* Hover & focus */
  [type='checkbox']:hover {
    ${(props) =>
      !props.$disabled && `background-color: ${props.theme.highlight};`}
  }

  [type='checkbox']:hover::before {
    ${(props) =>
      !props.$disabled &&
      `box-shadow: inset 0 0 0 ${spacing.r1} ${props.theme.selectedActive};`}
  }

  [type='checkbox']:focus-visible:enabled {
    ${FocusVisibleStyle}
  }

  /* Disabled */

  [type='checkbox']:checked:disabled {
    cursor: not-allowed;
    background-color: ${(props) => props.theme.selectedActive};
  }

  [type='checkbox']:not(:checked):disabled {
    cursor: not-allowed;
    background-color: ${(props) => props.theme.textSecondary};
  }
`
