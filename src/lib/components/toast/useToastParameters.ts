import { useCallback, useEffect, useRef } from 'react';

interface ToastParameters {
  duration?: number | null;
  open?: boolean;
  onClose?: () => void;
}

export function useToastParameters(params: ToastParameters) {
  const { duration = null, open, onClose } = params;

  const timerAutoHide = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    function handleKeyDown(nativeEvent: KeyboardEvent) {
      if (!nativeEvent.defaultPrevented) {
        if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
          onClose?.();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  const setAutoHideTimer = useCallback(
    (autoHideDurationParam: number | null) => {
      if (!onClose || autoHideDurationParam == null) {
        return;
      }

      clearTimeout(timerAutoHide.current);
      timerAutoHide.current = setTimeout(() => {
        onClose?.();
      }, autoHideDurationParam);
    },
    [onClose],
  );

  useEffect(() => {
    if (open) {
      setAutoHideTimer(duration);
    }

    return () => {
      clearTimeout(timerAutoHide.current);
    };
  }, [open, duration, setAutoHideTimer]);

  return { params };
}
