//@flow
import { type Series } from './LineTemporalChart.component.js';
import { NAN_STRING } from '../constants.js';
export type VegaData = {
  timestamp: number,
  label: string, // same as the tooltip label
  value: number | 'NAN', // the "NAN" is used by the tooltip to display a dash for the data which are not exist.
  isNegativeValue: boolean, // if the metricPrefix is read and out, we need to convert the value to negative before assigning it to the vega-lite spec
  isDashed: boolean,
}[];

export function convert2VegaData(
  addedMissingDataPointSeries: Series,
): VegaData {
  const flatArr = [];
  addedMissingDataPointSeries.forEach((line) => {
    line.data.forEach((datum) => {
      const obj = {
        timestamp: datum[0] * 1000, // convert to million second
        label: line.getTooltipLabel(line.metricPrefix, line.resource),
        value:
          datum[1] && datum[1] !== NAN_STRING ? Number(datum[1]) : NAN_STRING,
        isNegativeValue:
          line.metricPrefix === 'read' || line.metricPrefix === 'out',
        isDashed: line.isLineDashed || false,
      };
      flatArr.push(obj);
    });
  });
  return flatArr;
}

// base on the current base value, convert the original vegadata to
export function convertDataBaseValue(data: VegaData, base: number): VegaData {
  return data.map((datum) => {
    return {
      ...datum,
      value: typeof datum.value === 'number' ? datum.value / base : NAN_STRING,
    };
  });
}

/**
 * Return the unit label base on the current dataset, and the valueBase which is used to convert the data
 * @param {any} unitRange
 * @param {any} maxValue the maximum value among the data set
 * @returns {any}
 */
export function getUnitLabel(
  unitRange: { threshold: number, label: string }[],
  maxValue: number,
): { valueBase: number, unitLabel: string } {
  // first sort the unitRange
  unitRange.sort(
    (
      unitA: { threshold: number, label: string },
      unitB: { threshold: number, label: string },
    ) => {
      return unitA.threshold - unitB.threshold;
    },
  );

  let index = unitRange.findIndex((range) => range.threshold > maxValue);
  // last unit
  if (index === -1) {
    index = unitRange.length;
  }
  if (index === 0) {
    return {
      valueBase: unitRange[index].threshold,
      unitLabel: unitRange[index].label,
    };
  }
  return {
    valueBase: unitRange[index - 1].threshold,
    unitLabel: unitRange[index - 1].label,
  };
}

/**
 * This function manually adds the missing data points with `null` value caused by downtime of the VMs
 *
 * @param {array} orginalValues - The array of the data points are already sorted according to the time series
 * @param {number} startingTimeStamp - The starting timestamp in seconds
 * @param {number} sampleDuration - The time span value in seconds
 * @param {number} sampleFrequency - The time difference between two data points in seconds
 *
 */
export function addMissingDataPoint(
  orginalValues: [number, string | null][],
  startingTimeStamp: number,
  sampleDuration: number,
  sampleFrequency: number,
): [number, string | null][] {
  if (
    !orginalValues ||
    startingTimeStamp === undefined ||
    !sampleDuration ||
    !sampleFrequency ||
    startingTimeStamp < 0 ||
    sampleDuration <= 0 ||
    sampleFrequency <= 0
  ) {
    return [];
  }

  const newValues = [];
  const numberOfDataPoints = sampleDuration / sampleFrequency;
  let samplingPointTime = startingTimeStamp;

  // initialize the array with all `null` value
  for (let i = 0; i < numberOfDataPoints; i++) {
    newValues.push([samplingPointTime, NAN_STRING]);
    samplingPointTime += sampleFrequency;
  }

  // copy the existing data points from `orginalValue` array to `newValues`
  if (newValues.length === 0) return [];
  let nextIndex = 0;
  for (let i = 0; i < newValues.length; i++) {
    if (
      orginalValues[nextIndex] &&
      newValues[i][0] === orginalValues[nextIndex][0]
    ) {
      newValues[i][1] = orginalValues[nextIndex][1];
      nextIndex++;
    }
  }
  return newValues;
}
