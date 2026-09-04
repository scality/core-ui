import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Icon } from '../icon/Icon.component';
import { Button, type Props } from './Buttonv2.component';

// The outline variant swaps its label on success ("Copy X" -> "Copied X!"), so the
// button reserves room for the longer string and keeps its width when clicked.
//
// Character-count heuristic, inherited unchanged: `7rem` for the fixed part (icon,
// padding, border, "Copied!") plus 0.5rem per label character as an average width.
// The average under-reserves for an all-uppercase label, which still resizes.
const outlineWidthFloor = (label?: string) =>
  `${(label ? label.length / 2 : 0) + 7}rem`;

/**
 * A `Button` carrying the outline variant's width floor.
 *
 * A stylesheet rule, not an inline `style`: `iconOnly` hides the label via a
 * `@container` query, which an inline style outranks -- so an inline floor held a
 * collapsed button at its full labelled width. The breakpoint is read from
 * `iconOnly` itself so the floor and the label cannot disagree.
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
        ...props.style,
        // Last, so the success state cannot be styled away while clicks are still
        // being swallowed.
        ...(isSuccess && { cursor: 'not-allowed', opacity: 0.5 }),
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
