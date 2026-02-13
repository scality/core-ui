import { useEffect, useState } from 'react';
import { Icon } from '../icon/Icon.component';
import { Button, Props } from './Buttonv2.component';

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
      navigator.clipboard.writeText(text);
      setCopyStatus(COPY_STATE_SUCCESS);
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
  return (
    <Button
      {...props}
      variant={variant === 'outline' ? 'outline' : undefined}
      style={{
        minWidth:
          //Just to make sure the width of the button stays the same when copied!
          variant === 'outline'
            ? (label ? label.length / 2 : 0) + 7 + 'rem'
            : undefined,
      }}
      label={
        variant === 'outline'
          ? copyStatus === COPY_STATE_SUCCESS
            ? `Copied${label ? ' ' + label + '' : ''}!`
            : `Copy${label ? ' ' + label : ''}`
          : undefined
      }
      icon={
        <Icon
          name={copyStatus === COPY_STATE_SUCCESS ? 'Check' : 'Copy'}
          color={
            copyStatus === COPY_STATE_SUCCESS ? 'statusHealthy' : undefined
          }
        />
      }
      disabled={copyStatus === COPY_STATE_SUCCESS || props.disabled}
      onClick={() => copy(textToCopy, copyAsHtml)}
      type="button"
      tooltip={
        variant !== 'outline'
          ? {
              overlay:
                copyStatus === COPY_STATE_SUCCESS
                  ? 'Copied !'
                  : `Copy${label ? ' ' + label : ''}`,
              overlayStyle: {
                maxWidth: '20rem',
              },
              placement: 'top',
            }
          : undefined
      }
    />
  );
};
