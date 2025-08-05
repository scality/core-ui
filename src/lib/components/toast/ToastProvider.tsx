import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Toast, ToastProps } from './Toast.component';

export type ToastContextState = Omit<ToastProps, 'onClose'>;

export interface ToastContextType {
  showToast: (toastProps: ToastContextState) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<
  React.PropsWithChildren<ToastProviderProps>
> = ({ children }) => {
  const [toastProps, setToastProps] = useState<ToastContextState | null>(null);

  const toastCtxValue = useMemo(
    () => ({ showToast: setToastProps }),
    [],
  );

  const closeToast = useCallback(
    () => setToastProps(null),
    []
  );

  return (
    <ToastContext.Provider value={toastCtxValue}>
      {children}
      {toastProps && (
        <Toast {...toastProps} onClose={closeToast} />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};
