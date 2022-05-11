import React from 'react';
import { render } from '@testing-library/react';
import PrettyBytes from './PrettyBytes.component';
describe('PrettyBytes', () => {
  test('simple/advanced bytes', () => {
    const cases = [
      {
        bytes: 0,
        prettyBytes: '0 B',
      },
      {
        bytes: Math.pow(1024, 0),
        prettyBytes: '1 B',
      },
      {
        bytes: Math.pow(1024, 1),
        prettyBytes: '1 KiB',
      },
      {
        bytes: Math.pow(1024, 2),
        prettyBytes: '1 MiB',
      },
      {
        bytes: Math.pow(1024, 3),
        prettyBytes: '1 GiB',
      },
      {
        bytes: Math.pow(1024, 4),
        prettyBytes: '1 TiB',
      },
      {
        bytes: Math.pow(1024, 5),
        prettyBytes: '1 PiB',
      },
      {
        bytes: Math.pow(1024, 6),
        prettyBytes: '1 EiB',
      },
      {
        bytes: Math.pow(1024, 7),
        prettyBytes: '1 ZiB',
      },
      {
        bytes: Math.pow(1024, 8),
        prettyBytes: '1 YiB',
      },
      {
        bytes: Math.pow(232312, 5),
        prettyBytes: '560 YiB',
      },
      {
        bytes: Math.pow(2398123, 5),
        prettyBytes: '65 608 124 YiB',
      },
      {
        bytes: 2.10239,
        prettyBytes: '2 B',
      },
      {
        bytes: 0.1,
        prettyBytes: '0 B',
      },
      {
        bytes: 0.00000001,
        prettyBytes: '0 B',
      },
      {
        bytes: 1000,
        prettyBytes: '1 000 B',
      },
      {
        bytes: 2232134.10239,
        prettyBytes: '2 MiB',
      },
      {
        decimals: 0,
        bytes: 0,
        prettyBytes: '0 B',
      },
      {
        decimals: 2,
        bytes: 0,
        prettyBytes: '0 B',
      },
      {
        decimals: 0,
        bytes: 1,
        prettyBytes: '1 B',
      },
      {
        decimals: 1,
        bytes: 1,
        prettyBytes: '1.0 B',
      },
      {
        decimals: 3,
        bytes: 1,
        prettyBytes: '1.000 B',
      },
      {
        decimals: 3,
        bytes: Math.pow(1024, 5),
        prettyBytes: '1.000 PiB',
      },
      {
        decimals: 0,
        bytes: 3.12345,
        prettyBytes: '3 B',
      },
      {
        decimals: 3,
        bytes: 3.12345,
        prettyBytes: '3.123 B',
      },
      {
        decimals: 4,
        bytes: 32398322.12345,
        prettyBytes: '30.8974 MiB',
      },
      {
        decimals: 4.5,
        bytes: 32398322.12345,
        prettyBytes: '30.8974 MiB',
      },
      {
        decimals: 4.8,
        bytes: 32398322.12345,
        prettyBytes: '30.8974 MiB',
      },
    ];
    cases.forEach((testCase) => {
      expect(
        render(
          <PrettyBytes decimals={testCase.decimals} bytes={testCase.bytes} />,
        ).container,
      ).toHaveTextContent(testCase.prettyBytes);
    });
  });
  test('error bytes / error decimals', () => {
    const cases = [
      {
        bytes: null,
        prettyBytes: '-',
      },
      {
        bytes: undefined,
        prettyBytes: '-',
      },
      {
        bytes: Infinity,
        prettyBytes: '0 B',
      },
      {
        bytes: -Infinity,
        prettyBytes: '0 B',
      },
      {
        bytes: -0,
        prettyBytes: '-',
      },
      {
        bytes: -1,
        prettyBytes: '-',
      },
      {
        bytes: -0.23,
        prettyBytes: '-',
      },
      {
        bytes: NaN,
        prettyBytes: '-',
      },
      {
        decimals: null,
        bytes: Math.pow(1024, 1),
        prettyBytes: '1 KiB',
      },
      {
        decimals: undefined,
        bytes: Math.pow(1024, 1),
        prettyBytes: '1 KiB',
      },
      {
        decimals: Infinity,
        bytes: Math.pow(1024, 1),
        prettyBytes: '1 KiB',
      },
      {
        decimals: -Infinity,
        bytes: Math.pow(1024, 1),
        prettyBytes: '1 KiB',
      },
      {
        decimals: -0,
        bytes: Math.pow(1024, 1),
        prettyBytes: '1 KiB',
      },
      {
        decimals: -1,
        bytes: Math.pow(1024, 1),
        prettyBytes: '1 KiB',
      },
      {
        decimals: -0.23,
        bytes: Math.pow(1024, 1),
        prettyBytes: '1 KiB',
      },
    ];
    cases.forEach((testCase) => {
      expect(
        render(
          <PrettyBytes decimals={testCase.decimals} bytes={testCase.bytes} />,
        ).container,
      ).toHaveTextContent(testCase.prettyBytes);
    });
  });
});