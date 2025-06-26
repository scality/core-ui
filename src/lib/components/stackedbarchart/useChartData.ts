import { DataSchema } from './StackedBarChart.component';
import { useState, useMemo } from 'react';
import { KeysByType, sumDataValues } from './utils';

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

  const sortedData = useMemo(() => {
    if (!sortBy) return data;

    return data.toSorted((a, b) => {
      const aSum = sumDataValues(a, keysByType, typeToDisplay, selectedLegend);
      const bSum = sumDataValues(b, keysByType, typeToDisplay, selectedLegend);
      if (sortBy === 'asc') {
        return aSum - bSum;
      } else {
        return bSum - aSum;
      }
    });
  }, [data, keysByType, sortBy, typeToDisplay, selectedLegend]);

  return {
    keysByType,
    filteredDataToDisplay,
    sortedData,
    setSelectedLegend,
    selectedLegend,
  };
};
