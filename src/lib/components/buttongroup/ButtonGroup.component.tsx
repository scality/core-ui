import {
  Children,
  cloneElement,
  isValidElement,
  type HTMLAttributes,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import styled, { css } from 'styled-components';
import { spacing } from '../../spacing';

type Orientation = 'horizontal' | 'vertical';

export type ButtonGroupProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange'
> & {
  /** Lay the buttons out in a row (default) or a column. */
  orientation?: Orientation;
  /**
   * Value of the selected button. Providing `value` together with `onChange`
   * turns the group into a single-select segmented control: every child must
   * carry a `value`, and the child whose `value` matches is rendered selected.
   * Pass `null` to render no selection.
   */
  value?: string | null;
  /** Called with the clicked child's `value` when selection is enabled. */
  onChange?: (value: string) => void;
  /** The buttons to group — typically `Button` from `@scality/core-ui/next`. */
  children: ReactNode;
};

const ButtonGroupContainer = styled.div.withConfig({
  componentId: 'sc-button-group',
})<{ $orientation: Orientation }>`
  display: inline-flex;
  flex-direction: ${(props) =>
    props.$orientation === 'vertical' ? 'column' : 'row'};
  align-items: stretch;
  border: ${spacing.r1} solid ${(props) => props.theme.border};
  border-radius: ${spacing.r4};
  overflow: hidden;

  /* Each child button is wrapped (by Button's Tooltip) in extra elements.
     Let those wrappers and the button itself fill their cell so a vertical
     group reads as equal-width rows; horizontal cells keep their natural
     width since the group never stretches them on the main axis. */
  & > * {
    display: flex;
  }
  & > * > * {
    flex: 1;
    display: flex;
  }

  /* Strip each child button of its own framing so the group reads as one
     segmented control rather than a row of separate buttons. */
  .sc-button {
    flex: 1;
    border: none;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
    color: ${(props) => props.theme.textSecondary};
    /* Trailing icon: the label reads first, the icon (e.g. the sort
       direction arrow) sits to its right. */
    flex-direction: row-reverse;
  }
  .sc-button:enabled {
    cursor: pointer;
  }

  /* An icon accompanying a label carries a right gap from Button; with the
     row reversed the gap belongs on its left instead. */
  .sc-button > span:first-child:not(:last-child) {
    padding-right: 0;
    padding-left: ${spacing.r8};
  }

  /* A single hairline separator between adjacent buttons. */
  ${(props) =>
    props.$orientation === 'vertical'
      ? css`
          & > *:not(:last-child) .sc-button {
            border-bottom: ${spacing.r1} solid ${props.theme.border};
          }
        `
      : css`
          & > *:not(:last-child) .sc-button {
            border-right: ${spacing.r1} solid ${props.theme.border};
          }
        `}

  /* Doubled class selector keeps these states above Button's own variant
     rules without resorting to !important. */
  && .sc-button:hover:enabled {
    background: ${(props) => props.theme.backgroundLevel1};
    color: ${(props) => props.theme.textPrimary};
  }

  && .sc-button[aria-pressed='true'] {
    background: ${(props) => props.theme.highlight};
    color: ${(props) => props.theme.textPrimary};
    box-shadow: inset 0 calc(-1 * ${spacing.r2}) 0
      ${(props) => props.theme.selectedActive};
  }
`;

type SelectableChildProps = {
  value?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

function ButtonGroup({
  orientation = 'horizontal',
  value,
  onChange,
  children,
  ...rest
}: ButtonGroupProps) {
  const selectable = typeof onChange === 'function';

  const items = selectable
    ? Children.map(children, (child) => {
        if (!isValidElement(child)) {
          return child;
        }

        const element = child as ReactElement<SelectableChildProps>;
        const childValue = element.props.value;
        const selected = childValue != null && childValue === value;

        return cloneElement(element, {
          // Only a child with a `value` is a real toggle button; without one,
          // clicking is a no-op, so it must not advertise a pressed state.
          ...(childValue != null && { 'aria-pressed': selected }),
          onClick: (event: MouseEvent<HTMLButtonElement>) => {
            element.props.onClick?.(event);
            if (childValue != null) {
              onChange(childValue);
            }
          },
        } as Partial<SelectableChildProps> & { 'aria-pressed'?: boolean });
      })
    : children;

  return (
    <ButtonGroupContainer role="group" $orientation={orientation} {...rest}>
      {items}
    </ButtonGroupContainer>
  );
}

export { ButtonGroup };
