import {
  convert2VegaData,
  getUnitLabel,
  addMissingDataPoint,
} from './ChartUtil.js';

const series = [
  {
    resource: 'node1',
    data: [
      [1627460232, '18.73333333333335'],
      [1627460952, '18.73333333333335'],
    ],
    getTooltipLabel: (metricPrefix, resource) => {
      return resource;
    },
    isLineDashed: false,
  },
  {
    resource: 'node2',
    data: [
      [1627460232, '18.73333333333335'],
      [1627460952, null],
    ],
    getTooltipLabel: (metricPrefix, resource) => {
      return resource;
    },
    isLineDashed: false,
  },
];

const seriesSymmetrical = [
  {
    metricPrefix: 'read',
    resource: 'node1',
    data: [
      [1627460232, '18.73333333333335'],
      [1627460952, '18.73333333333335'],
    ],
    getTooltipLabel: (metricPrefix, resource) => {
      return `${resource}-${metricPrefix}`;
    },
    isLineDashed: false,
  },
  {
    metricPrefix: 'write',
    resource: 'node1',
    data: [
      [1627460232, '18.73333333333335'],
      [1627460952, '18.73333333333335'],
    ],
    getTooltipLabel: (metricPrefix, resource) => {
      return `${resource}-${metricPrefix}`;
    },
    isLineDashed: false,
  },
];

it('converts the series to a flat data structure', () => {
  const result = convert2VegaData(series);
  expect(result).toEqual([
    {
      timestamp: 1627460232000,
      label: 'node1',
      resource: 'node1',
      value: 18.73333333333335,
      isNegativeValue: false,
      isDashed: false,
    },
    {
      timestamp: 1627460952000,
      label: 'node1',
      resource: 'node1',
      value: 18.73333333333335,
      isNegativeValue: false,
      isDashed: false,
    },
    {
      timestamp: 1627460232000,
      label: 'node2',
      resource: 'node2',
      value: 18.73333333333335,
      isNegativeValue: false,
      isDashed: false,
    },
    {
      timestamp: 1627460952000,
      label: 'node2',
      resource: 'node2',
      value: 'NAN',
      isNegativeValue: false,
      isDashed: false,
    },
  ]);
});

it('converts the series to a flat data structure for symmetrical chart', () => {
  const result = convert2VegaData(seriesSymmetrical);

  expect(result).toEqual([
    {
      timestamp: 1627460232000,
      label: 'node1-read',
      resource: 'node1',
      value: 18.73333333333335,
      isNegativeValue: true,
      isDashed: false,
    },
    {
      timestamp: 1627460952000,
      label: 'node1-read',
      resource: 'node1',
      value: 18.73333333333335,
      isNegativeValue: true,
      isDashed: false,
    },
    {
      timestamp: 1627460232000,
      label: 'node1-write',
      resource: 'node1',
      value: 18.73333333333335,
      isNegativeValue: false,
      isDashed: false,
    },
    {
      timestamp: 1627460952000,
      label: 'node1-write',
      resource: 'node1',
      value: 18.73333333333335,
      isNegativeValue: false,
      isDashed: false,
    },
  ]);
});

const unitRange = [
  { threshold: 0, label: 'B/Sec' },
  { threshold: 1024, label: 'KiB/Sec' },
  { threshold: 1024 * 1024, label: 'MiB/Sec' },
  { threshold: 1024 * 1024 * 1024, label: 'GiB/Sec' },
];

it('returns the unit label B/Sec with 0 as valueBase', () => {
  const maxValue = 1023;
  const { unitLabel, valueBase } = getUnitLabel(unitRange, maxValue);
  expect(unitLabel).toEqual('B/Sec');
  expect(valueBase).toEqual(0);
});

it('returns the unit label KiB/Sec', () => {
  const maxValue = 1024;
  const { unitLabel, valueBase } = getUnitLabel(unitRange, maxValue);
  expect(unitLabel).toEqual('KiB/Sec');
  expect(valueBase).toEqual(1024);
});

it('returns the unit label GiB/Sec', () => {
  const maxValue = 1024 * 1024 * 1024 + 1;
  const { unitLabel, valueBase } = getUnitLabel(unitRange, maxValue);
  expect(unitLabel).toEqual('GiB/Sec');
  expect(valueBase).toEqual(1024 * 1024 * 1024);
});

// test for addMissingDataPoint function
const originalValue = [
  [0, 0],
  [1, 1],
  [2, 2],
  [3, 3],
  [4, 4],
  [5, 5],
  [6, 6],
  [8, 8],
  [9, 9],
  [10, 10],
];
const startingTimeStamp = 0;
const sampleDuration = 10;
const sampleFrequency = 1;
const newValues = [
  [0, 0],
  [1, 1],
  [2, 2],
  [3, 3],
  [4, 4],
  [5, 5],
  [6, 6],
  [7, 'NAN'],
  [8, 8],
  [9, 9],
  [10, 10],
];
it('should add missing data point with null', () => {
  const result = addMissingDataPoint(
    originalValue,
    startingTimeStamp,
    sampleDuration,
    sampleFrequency,
  );
  expect(result).toEqual(newValues);
});

// We manually add
it('should return the array with string NAN when the original dataset is empty', () => {
  const result = addMissingDataPoint(
    [],
    startingTimeStamp,
    sampleDuration,
    sampleFrequency,
  );
  expect(result).toEqual([
    [0, 'NAN'],
    [1, 'NAN'],
    [2, 'NAN'],
    [3, 'NAN'],
    [4, 'NAN'],
    [5, 'NAN'],
    [6, 'NAN'],
    [7, 'NAN'],
    [8, 'NAN'],
    [9, 'NAN'],
    [10, 'NAN'],
  ]);
});

it('should return an empty array when the starting timestamp is undefined', () => {
  const result = addMissingDataPoint(
    originalValue,
    undefined,
    sampleDuration,
    sampleFrequency,
  );
  expect(result).toEqual([]);
});

it('should return an empty array when sample duration is less than or equal to zero', () => {
  const result = addMissingDataPoint(
    originalValue,
    startingTimeStamp,
    0,
    sampleFrequency,
  );
  expect(result).toEqual([]);
});

it('should return an empty array when sample frequency is less than or equal to zero', () => {
  const result = addMissingDataPoint(
    originalValue,
    startingTimeStamp,
    sampleDuration,
    -1,
  );
  expect(result).toEqual([]);
});

it('should return an empty array when sample frequency is undefined', () => {
  const result = addMissingDataPoint(
    originalValue,
    startingTimeStamp,
    sampleDuration,
    undefined,
  );
  expect(result).toEqual([]);
});
