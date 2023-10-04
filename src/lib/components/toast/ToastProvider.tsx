import { ReactNode, createContext, useContext, useState } from 'react';
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
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toastProps, setToastProps] = useState<ToastContextState | null>(null);

  const showToast = (toastProps: ToastContextState) => {
    setToastProps(toastProps);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toastProps && (
        <Toast {...toastProps} onClose={() => setToastProps(null)} />
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
