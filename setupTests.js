import 'jest-canvas-mock';
import '@testing-library/jest-dom/extend-expect';
import 'regenerator-runtime/runtime';

import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
