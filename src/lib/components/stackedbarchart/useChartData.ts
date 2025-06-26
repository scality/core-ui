import { DataSchema } from './StackedBarChart.component';
import { useState, useMemo } from 'react';
import {
  getMaxValueFromPreCalculatedSums,
  getRoundReferenceValue,
  KeysByType,
  sumDataValues,
} from './utils';

export const useChartData = (
  data: Array<{ [key: string]: number | string }>,
  dataSchema: DataSchema,
  typeToDisplay?: string,
  sortBy?: 'asc' | 'desc',
) => {
  const [selectedLegend, setSelectedLegend] = useState<string>();

  const keysByType: KeysByType = useMemo(() => {
    const result: KeysByType = {};
    dataSchema.yValues.forEach(({ key, type }) => {
      // Use type or 'default' if type is undefined
      const typeKey = type || 'default';
      if (!result[typeKey]) {
        result[typeKey] = [];
      }
      result[typeKey].push(key);
    });
    return result;
  }, [dataSchema.yValues]);

  const filteredDataToDisplay = useMemo(
    () =>
      dataSchema.yValues.filter((yValue) =>
        typeToDisplay ? yValue.type === typeToDisplay : true,
      ),
    [dataSchema.yValues, typeToDisplay],
  );

  // Pre-calculate sums for all data points to avoid recalculating during sort
  const dataWithSums = useMemo(() => {
    return data.map((item) => ({
      ...item,
      _sum: sumDataValues(item, keysByType, typeToDisplay, selectedLegend),
    }));
  }, [data, keysByType, typeToDisplay, selectedLegend]);

  const sortedData = useMemo(() => {
    if (!sortBy) return data;

    return dataWithSums
      .toSorted((a, b) => {
        if (sortBy === 'asc') {
          return a._sum - b._sum;
        } else {
          return b._sum - a._sum;
        }
      })
      .map(({ _sum, ...item }) => item); // Remove the _sum property
  }, [dataWithSums, sortBy, data]);

  const referenceLineValue = useMemo(() => {
    const maxValue = getMaxValueFromPreCalculatedSums(dataWithSums);
    return getRoundReferenceValue(maxValue);
  }, [dataWithSums]);

  return {
    keysByType,
    filteredDataToDisplay,
    sortedData,
    setSelectedLegend,
    selectedLegend,
    referenceLineValue,
  };
};
