import { CSSProperties } from 'react';

export type ToastPosition =
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center';

export const positionOutput: Record<ToastPosition, CSSProperties> = {
  'top-left': {
    top: '3rem',
    left: '1rem',
  },
  'top-right': {
    top: '3rem',
    right: '1rem',
  },
  'top-center': {
    top: '1rem',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  'bottom-left': {
    bottom: '1rem',
    left: '1rem',
  },
  'bottom-right': {
    bottom: '1rem',
    right: '1rem',
  },
  'bottom-center': {
    bottom: '1rem',
    left: '50%',
    transform: 'translateX(-50%)',
  },
};
