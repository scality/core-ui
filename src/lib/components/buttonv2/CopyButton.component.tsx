import { useEffect, useState } from 'react';
import { Icon } from '../icon/Icon.component';
import { Button, type Props } from './Buttonv2.component';

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
  return (
    <Button
      {...props}
      variant={variant === 'outline' ? 'outline' : undefined}
      style={{
        ...(isSuccess && { cursor: 'not-allowed', opacity: 0.5 }),
        // The floor reserves room for the label swap ("Copy X" -> "Copied X!") so
        // the button keeps its width when clicked. `iconOnly` asks for the opposite
        // — a button narrower than its label — and the floor wins, because it is an
        // inline style the container query cannot reach. So an `iconOnly` copy
        // button gets no floor and may widen by the one character the swap adds.
        minWidth:
          variant === 'outline' && !props.iconOnly
            ? `${(label ? label.length / 2 : 0) + 7}rem`
            : undefined,
        // Last, so a consumer can override the floor (or anything else) from
        // `style`. It used to be first, which made every value here unreachable.
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
