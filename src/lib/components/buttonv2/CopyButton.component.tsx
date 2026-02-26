import { useEffect, useState } from 'react';
import { Icon } from '../icon/Icon.component';
import { Button, type Props } from './Buttonv2.component';

export const COPY_STATE_IDLE = 'idle';
export const COPY_STATE_SUCCESS = 'success';
export const COPY_STATE_UNSUPPORTED = 'unsupported';
export const useClipboard = () => {
  const [copyStatus, setCopyStatus] = useState(COPY_STATE_IDLE);
  useEffect(() => {
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
        ...props.style,
        ...(isSuccess && { cursor: 'not-allowed', opacity: 0.5 }),
        minWidth:
          variant === 'outline'
            ? `${(label ? label.length / 2 : 0) + 7}rem`
            : undefined,
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
