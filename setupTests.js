import 'jest-canvas-mock';
import '@testing-library/jest-dom/extend-expect';
import 'regenerator-runtime/runtime';

import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });
