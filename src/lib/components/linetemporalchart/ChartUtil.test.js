import {
  convert2VegaData,
  getUnitLabel,
  getLegendLabelfromSeries,
} from './ChartUtil.js';

const series = [
  {
    label: 'node1',
    instance: 'node1',
    data: [
      { timestamp: 1627460232000, value: 18.73333333333335 },
      { timestamp: 1627460952000, value: 18.73333333333335 },
    ],
  },
  {
    label: 'node2',
    instance: 'node2',
    data: [
      { timestamp: 1627460232000, value: 18.73333333333335 },
      { timestamp: 1627460952000, value: 18.73333333333335 },
    ],
  },
];

const seriesReadWrite = [
  {
    label: 'node1-read',
    instance: 'node1',
    data: [
      { timestamp: 1627460232000, value: 18.73333333333335 },
      { timestamp: 1627460952000, value: 18.73333333333335 },
    ],
  },
  {
    label: 'node1-write',
    instance: 'node1',
    data: [
      { timestamp: 1627460232000, value: 18.73333333333335 },
      { timestamp: 1627460952000, value: 18.73333333333335 },
    ],
  },
  {
    label: 'node2-read',
    instance: 'node2',
    data: [
      { timestamp: 1627460232000, value: 18.73333333333335 },
      { timestamp: 1627460952000, value: 18.73333333333335 },
    ],
  },
  {
    label: 'node2-write',
    instance: 'node2',
    data: [
      { timestamp: 1627460232000, value: 18.73333333333335 },
      { timestamp: 1627460952000, value: 18.73333333333335 },
    ],
  },
];

it('converts the series to a flat data structure', () => {
  const result = convert2VegaData(series);
  expect([
    { timestamp: 1627460232000, label: 'node1', value: 18.73333333333335 },
    { timestamp: 1627460952000, label: 'node1', value: 18.73333333333335 },
    { timestamp: 1627460232000, label: 'node2', value: 18.73333333333335 },
    { timestamp: 1627460952000, label: 'node2', value: 18.73333333333335 },
  ]).toEqual(result);
});

const unitRange = [
  { threshold: 1, label: 'B/Sec' },
  { threshold: 1024, label: 'KiB/Sec' },
  { threshold: 1024 * 1024, label: 'MiB/Sec' },
  { threshold: 1024 * 1024 * 1024, label: 'GiB/Sec' },
];

it('returns the unit label B/Sec', () => {
  const maxValue = 1023;
  const { unitLabel, valueBase } = getUnitLabel(unitRange, maxValue);
  expect(unitLabel).toEqual('B/Sec');
  expect(valueBase).toEqual(1);
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

it('returns the array of legend labels', () => {
  const legendsLabel = getLegendLabelfromSeries(series);
  expect(legendsLabel).toEqual(['node1', 'node2']);
});

it('returns only the instance name', () => {
  const legendsLabel = getLegendLabelfromSeries(seriesReadWrite);
  expect(legendsLabel).toEqual(['node1', 'node2']);
});
