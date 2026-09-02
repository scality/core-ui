import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Icon } from '../icon/Icon.component';
import { Button, type Props } from './Buttonv2.component';

// The outline variant swaps its label on success ("Copy X" -> "Copied X!"), so the
// button reserves room for the longer string and keeps its width when clicked.
//
// The reservation is a character-count heuristic, carried over unchanged from when
// this was an inline style: `7rem` is the fixed part -- icon, padding, border and
// the word "Copied!" -- and `length / 2` adds 0.5rem per label character as a
// stand-in for average character width. That average is the weak point. Measured at
// the 14px root the floor grows 7px per character against ~6px of real text, so it
// over-reserves for a narrow label and is too small for an all-uppercase one, where
// the content outgrows the floor and the button resizes on click anyway.
const outlineWidthFloor = (label?: string) =>
  `${(label ? label.length / 2 : 0) + 7}rem`;

/**
 * A `Button` carrying the outline variant's width floor.
 *
 * The floor is a stylesheet rule rather than an inline `style` because `iconOnly`
 * hides the label through a `@container` query and an inline style outranks every
 * stylesheet rule — so an inline floor held a collapsed button at its full labelled
 * width with nothing in it. The breakpoint is read from `iconOnly` itself rather
 * than passed in beside it, so the floor and the label cannot answer to different
 * widths.
 */
const FlooredButton = styled(Button)<{ $floor?: string }>`
  min-width: ${({ $floor }) => $floor ?? 'auto'};
  ${({ iconOnly }) =>
    typeof iconOnly === 'number' &&
    `@container responsive (max-width: ${iconOnly}px) { min-width: auto; }`}
`;

export const COPY_STATE_IDLE = 'idle';
export const COPY_STATE_SUCCESS = 'success';
export const COPY_STATE_UNSUPPORTED = 'unsupported';
export const useClipboard = () => {
  const [copyStatus, setCopyStatus] = useState(COPY_STATE_IDLE);
  useEffect(() => {
    if (copyStatus === COPY_STATE_IDLE) return;
    const timer = setTimeout(() => {
      setCopyStatus(COPY_STATE_IDLE);
    }, 2000);
    return () => clearTimeout(timer);
  }, [copyStatus]);

  const copyToClipboard = (text: string, asHtml?: boolean) => {
    if (!navigator || !navigator.clipboard) {
      setCopyStatus(COPY_STATE_UNSUPPORTED);
      return;
    }

    if (asHtml) {
      // Copy as HTML with plain text fallback
      const el = document.createElement('div');
      el.innerHTML = text;
      const plainText = el.innerText;

      const clipboardItem = new ClipboardItem({
        'text/html': new Blob([text], { type: 'text/html' }),
        'text/plain': new Blob([plainText], { type: 'text/plain' }),
      });

      navigator.clipboard
        .write([clipboardItem])
        .then(() => {
          setCopyStatus(COPY_STATE_SUCCESS);
        })
        .catch(() => {
          setCopyStatus(COPY_STATE_UNSUPPORTED);
        });
    } else {
      // Copy as plain text only
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopyStatus(COPY_STATE_SUCCESS);
        })
        .catch(() => {
          setCopyStatus(COPY_STATE_UNSUPPORTED);
        });
    }
  };

  return {
    copy: copyToClipboard,
    copyStatus: copyStatus,
  };
};

export const CopyButton = ({
  label,
  textToCopy,
  copyAsHtml,
  variant,
  ...props
}: {
  label?: string;
  textToCopy: string;
  copyAsHtml?: boolean;
  variant?: 'outline' | 'ghost';
} & Omit<Props, 'tooltip' | 'label'>) => {
  const { copy, copyStatus } = useClipboard();
  const isSuccess = copyStatus === COPY_STATE_SUCCESS;
  const { iconOnly } = props;
  return (
    <FlooredButton
      {...props}
      variant={variant === 'outline' ? 'outline' : undefined}
      // A button collapsed at every width has no label to reserve room for.
      $floor={
        variant === 'outline' && iconOnly !== true
          ? outlineWidthFloor(label)
          : undefined
      }
      style={{
        ...(isSuccess && { cursor: 'not-allowed', opacity: 0.5 }),
        // Last, so a consumer can override anything here from `style`. It used to
        // be first, which made every value here unreachable.
        ...props.style,
      }}
      label={
        variant === 'outline'
          ? isSuccess
            ? `Copied${label ? ` ${label}` : ''}!`
            : `Copy${label ? ` ${label}` : ''}`
          : undefined
      }
      icon={
        <Icon
          name={isSuccess ? 'Check' : 'Copy'}
          color={isSuccess ? 'statusHealthy' : undefined}
        />
      }
      disabled={props.disabled}
      aria-disabled={isSuccess || props.disabled}
      onClick={() => {
        if (!isSuccess) copy(textToCopy, copyAsHtml);
      }}
      type="button"
      tooltip={
        variant !== 'outline'
          ? {
              overlay: isSuccess
                ? 'Copied !'
                : `Copy${label ? ` ${label}` : ''}`,
              overlayStyle: { maxWidth: '20rem' },
              placement: 'top',
            }
          : undefined
      }
    />
  );
};
