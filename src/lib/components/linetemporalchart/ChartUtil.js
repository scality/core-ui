//@flow
import { type Series } from './LineTemporalChart.component.js';

export type VegaData = { timestamp: number, label: string, value: number }[];

export function convert2VegaData(series: Series): VegaData {
  const flatArr = [];
  series.forEach((line) => {
    line.data.forEach((datum) => {
      const obj = {
        timestamp: datum.timestamp,
        label: line.label,
        value: Number(datum.value),
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
      timestamp: datum.timestamp,
      label: datum.label,
      value: datum.value / base,
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
  let unitLabel, valueBase;
  if (!unitRange) {
    console.error('The unitRange is not yet specified.');
    return { valueBase: 1, unitLabel: '' };
  } else {
    for (let i = 0; i <= unitRange.length - 1; i++) {
      if (i < unitRange.length - 1) {
        if (
          unitRange[i].threshold <= maxValue &&
          unitRange[i + 1].threshold > maxValue
        ) {
          unitLabel = unitRange[i].label;
          valueBase = unitRange[i].threshold;
          return { valueBase, unitLabel };
        }
      } else if (i === unitRange.length - 1) {
        unitLabel = unitRange[i].label;
        valueBase = unitRange[i].threshold;
        return { valueBase, unitLabel };
      }
    }
    return { valueBase: 1, unitLabel: '' };
  }
}

export function getLegendLabelfromSeries(series: Series): [] {
  const legends = [];
  series.forEach((line) => {
    if (!legends.find((legend) => legend === line.instance)) {
      legends.push(line.instance);
    }
  });
  return legends;
}
