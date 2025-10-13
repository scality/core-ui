import { BarchartProps, BarchartBars } from './Barchart.component';
import { TooltipContentProps } from 'recharts';
import { chartColors, ChartColors } from '../../style/theme';
import { useChartLegend } from '../chartlegend/ChartLegendWrapper';

export const getRoundReferenceValue = (value: number): number => {
  if (value <= 0) return 5; // Default for zero or negative values

  // Get the magnitude (10^n where n is the number of digits - 1)
  const magnitude = Math.pow(10, Math.floor(Math.log10(value)));

  // Buffer the value by 10% to avoid being too close to the edge of the chart
  const bufferedValue = value * 1.1;

  // Normalized value between 1 and 10
  const normalized = bufferedValue / magnitude;

  // Round to nice numbers based on normalized value
  let result: number;
  if (normalized <= 1) result = magnitude;
  else if (normalized <= 1.5) result = 1.5 * magnitude;
  else if (normalized <= 2) result = 2 * magnitude;
  else if (normalized <= 3) result = 3 * magnitude;
  else if (normalized <= 4) result = 4 * magnitude;
  else if (normalized <= 5) result = 5 * magnitude;
  // skip 7.5 as top value (but not 75, 750, 7500, etc.) for better chart appearance
  else if (value > 10 && normalized <= 7.5) result = 7.5 * magnitude;
  else result = 10 * magnitude;

  // Ensure minimum value of 5 for Round Reference Value
  // for better chart appearance
  return Math.max(result, 5);
};

export const getTicks = (topValue: number, isSymmetrical: boolean) => {
  if (topValue < 10) {
    if (isSymmetrical) {
      return [-topValue, 0, topValue];
    } else {
      return [0, topValue];
    }
  }
  const numberOfTicks = topValue % 2 === 0 ? 3 : 4;
  const tickInterval = topValue / (numberOfTicks - 1);
  const ticks = Array.from(
    { length: numberOfTicks },
    (_, index) => index * tickInterval,
  );
  if (isSymmetrical) {
    const negativeTicks = Array.from(
      { length: numberOfTicks - 1 },
      (_, index) => -(index + 1) * tickInterval,
    );
    ticks.unshift(...negativeTicks);
  }

  return ticks;
};

export const getMaxBarValue = (
  data: { [key: string]: string | number }[],
  stacked?: boolean,
) => {
  const values = data.map((item) => {
    // If stacked, we need to filter out category and sum the values in the same object
    if (stacked) {
      // Get objects keys except category
      const filterOutCategory = Object.keys(item).filter(
        (key) => key !== 'category',
      );
      // Sum the values in the same object (corresponding to one bar) based on the keys
      const sumValues = filterOutCategory.reduce((acc, curr) => {
        return acc + Number(item[curr]);
      }, 0);
      return sumValues;
    }
    //filter out the category key
    const numberValues = Object.keys(item)
      .filter((key) => key !== 'category')
      .map((key) => Number(item[key]));
    // Get the max value among the values in the object (corresponding to one bar)
    return Math.max(...numberValues, 0); // Ensure we don't get -Infinity
  });
  return Math.max(...values, 0);
};

/**
 * Generates time ranges between start and end dates based on the given interval
 * @param startDate - Start date
 * @param endDate - End date
 * @param interval - Interval in milliseconds
 * @returns Array of time ranges with start and end properties as Date objects
 */
const generateTimeRanges = (
  startDate: Date,
  endDate: Date,
  interval: number,
): { start: Date; end: Date }[] => {
  const ranges: { start: Date; end: Date }[] = [];

  let currentDate = new Date(startDate.getTime());
  while (currentDate.getTime() <= endDate.getTime()) {
    const rangeEnd = new Date(currentDate.getTime() + interval);

    ranges.push({
      start: new Date(currentDate.getTime()),
      end: rangeEnd,
    });

    currentDate = new Date(currentDate.getTime() + interval);
  }

  return ranges;
};

/**
 * Finds the time range that contains the given date
 * @param date - Data point date
 * @param ranges - Array of time ranges
 * @returns The range that contains the date, or null if not found
 */
const findRangeForDate = (
  date: Date,
  ranges: { start: Date; end: Date }[],
): { start: Date; end: Date } | null => {
  const timestamp = date.getTime();
  return (
    ranges.find(
      (range) =>
        timestamp >= range.start.getTime() && timestamp < range.end.getTime(),
    ) || null
  );
};

/**
 * Transforms time-based data into chart format
 */
export const transformTimeData = <T extends BarchartBars>(
  bars: T,
  type: {
    type: 'time';
    timeRange: {
      startDate: Date;
      endDate: Date;
      interval: number;
    };
  },
  barDataKeys: string[],
) => {
  const timeRanges = generateTimeRanges(
    type.timeRange.startDate,
    type.timeRange.endDate,
    type.timeRange.interval,
  );

  const categoryMap = new Map<number, { [key: string]: string | number }>();

  // Initialize all ranges with zeros
  timeRanges.forEach((range) => {
    const initialData: { [key: string]: string | number } = {
      category: range.start.getTime(),
    };
    barDataKeys.forEach((dataKey) => {
      initialData[dataKey] = 0;
    });
    categoryMap.set(range.start.getTime(), initialData);
  });

  // Populate with actual data
  bars.forEach((bar) => {
    bar.data.forEach(([dateValue, value]) => {
      // Convert to Date if it's not already a Date object
      const date =
        dateValue instanceof Date
          ? dateValue
          : new Date(dateValue as string | number);
      const range = findRangeForDate(date, timeRanges);
      if (range) {
        const existingData = categoryMap.get(range.start.getTime())!;
        existingData[bar.label] = value;
      }
    });
  });

  return Array.from(categoryMap.values());
};

/**
 * Transforms category-based data into chart format
 */
export const transformCategoryData = <T extends BarchartBars>(
  bars: T,
  barDataKeys: string[],
) => {
  const categoryMap = new Map<
    string | number,
    { [key: string]: string | number }
  >();

  bars.forEach((bar) => {
    bar.data.forEach(([key, value]) => {
      const categoryKey = String(key);

      if (!categoryMap.has(categoryKey)) {
        const newData: { [key: string]: string | number } = {
          category: categoryKey,
        };
        barDataKeys.forEach((dataKey) => {
          newData[dataKey] = 0;
        });
        categoryMap.set(categoryKey, newData);
      }

      const existingData = categoryMap.get(categoryKey)!;
      existingData[bar.label] = value;
    });
  });

  return Array.from(categoryMap.values());
};

/**
 * Applies custom sorting to chart data
 */
export const applySortingToData = <T extends BarchartBars>(
  data: { [key: string]: string | number }[],
  barDataKeys: string[],
  defaultSort: BarchartProps<T>['defaultSort'],
) => {
  const points = data.map((item) => {
    const point: any = { category: item.category };
    barDataKeys.forEach((dataKey) => {
      point[dataKey] = Number(item[dataKey]) || 0;
    });
    return point;
  });

  points.sort(defaultSort);

  return points.map((point) => {
    const dataItem: { [key: string]: string | number } = {
      category: point.category,
    };
    barDataKeys.forEach((dataKey) => {
      dataItem[dataKey] = point[dataKey];
    });
    return dataItem;
  });
};

const getRechartsBarsAndBarDataKeys = (
  bars: BarchartBars,
  colorSet: Record<string, ChartColors | string>,
  stacked?: boolean,
) => {
  const rechartsBars: { dataKey: string; fill: string; stackId?: string }[] =
    [];
  const barDataKeys: string[] = [];

  bars.forEach((bar) => {
    const colorName = colorSet[bar.label];
    const rechartsBar = {
      dataKey: bar.label,
      fill: chartColors[colorName] || colorName,
      stackId: stacked ? 'stacked' : undefined,
    };

    rechartsBars.push(rechartsBar);
    barDataKeys.push(bar.label);
  });

  return {
    rechartsBars,
    barDataKeys,
  };
};

/**
 * Converts prometheus data to recharts data format
 * @param bars - The bars to convert
 * @param type - The chart type (category or time)
 * @returns Recharts data format
 */
export const formatPrometheusDataToRechartsDataAndBars = <
  T extends BarchartBars,
>(
  bars: T,
  type: BarchartProps<T>['type'],
  colorSet: Record<string, ChartColors | string>,
  stacked?: boolean,
  defaultSort?: BarchartProps<T>['defaultSort'],
  legendOrder?: string[],
): {
  data: { [key: string]: string | number }[];
  rechartsBars: { dataKey: string; fill: string; stackId?: string }[];
} => {
  const { rechartsBars, barDataKeys } = getRechartsBarsAndBarDataKeys(
    bars,
    colorSet,
    stacked,
  );

  let data =
    type.type !== 'category' && type.type === 'time'
      ? transformTimeData(bars, type, barDataKeys)
      : transformCategoryData(bars, barDataKeys);

  if (type.type === 'category' && defaultSort) {
    data = applySortingToData(data, barDataKeys, defaultSort);
  }

  const sortedRechartsBars = sortStackedBars(
    rechartsBars,
    data,
    stacked,
    legendOrder,
  );

  return {
    rechartsBars: sortedRechartsBars,
    data,
  };
};

export type UnitRange = {
  threshold: number;
  label: string;
}[];

export const computeUnitLabelAndRoundReferenceValue = (
  data: any,
  maxValue: number,
  unitRange: UnitRange | undefined,
) => {
  if (!unitRange) {
    const roundReferenceValue = getRoundReferenceValue(maxValue);
    return { unitLabel: '', roundReferenceValue, rechartsData: data };
  }

  const { valueBase, unitLabel } = getUnitLabel(unitRange, maxValue);
  const topValue = Math.ceil(maxValue / valueBase / 10) * 10;
  const roundReferenceValue = getRoundReferenceValue(topValue);
  const rechartsData = data.map((dataPoint) => {
    const normalizedDataPoint = { ...dataPoint };
    Object.entries(dataPoint).forEach(([key, value]) => {
      if (key !== 'category' && typeof value === 'number') {
        normalizedDataPoint[key] = value / valueBase;
      }
    });
    return normalizedDataPoint;
  });
  return { unitLabel, roundReferenceValue, rechartsData };
};

/**
 * Return the unit label base on the current dataset, and the valueBase which is used to convert the data
 * @param {any} unitRange
 * @param {any} maxValue the maximum value among the data set
 * @returns {any}
 */
export function getUnitLabel(
  unitRange: {
    threshold: number;
    label: string;
  }[],
  maxValue: number,
): {
  valueBase: number;
  unitLabel: string;
} {
  // first sort the unitRange
  unitRange.sort(
    (
      unitA: {
        threshold: number;
        label: string;
      },
      unitB: {
        threshold: number;
        label: string;
      },
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
    // if the threshold is 0, we use 1 as the value base to avoid division by 0
    valueBase: unitRange[index - 1].threshold || 1,
    unitLabel: unitRange[index - 1].label,
  };
}

// Sort stacked bars by their average values in descending order or by legend order
// This ensures the largest bars appear at the bottom of the stack (default) or follow legend order
export const sortStackedBars = (
  rechartsBars: {
    dataKey: string;
    fill: string;
    stackId?: string;
  }[],
  data: {
    [key: string]: string | number;
  }[],
  stacked?: boolean,
  legendOrder?: string[],
) => {
  if (!stacked) {
    return rechartsBars;
  }

  // If legend order is provided, sort by legend order
  if (legendOrder && legendOrder.length > 0) {
    return [...rechartsBars].sort((a, b) => {
      const indexA = legendOrder.indexOf(a.dataKey);
      const indexB = legendOrder.indexOf(b.dataKey);

      // If both items are in legend order, sort by their position
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }

      // If only one item is in legend order, prioritize it
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;

      // If neither is in legend order, maintain original order
      return 0;
    });
  }

  // Default behavior: sort by average values
  const barAverages = rechartsBars.map((bar) => {
    const values = data
      .map((item) => Number(item[bar.dataKey]) || 0)
      .filter((value) => !isNaN(value));
    const average =
      values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
    return { ...bar, average };
  });

  // Sort by average in descending order (largest first, which will be at bottom in stack)
  barAverages.sort((a, b) => b.average - a.average);
  // Remove the average property and keep only the bar data
  return barAverages.map(({ average, ...bar }) => bar);
};

/**
 * Filters both chart data and recharts bars to only include selected resources from legend
 * @param data - Array of chart data objects with category and resource values
 * @param rechartsBars - Array of recharts bar configurations
 * @param selectedResources - Array of selected resource names
 * @returns Object containing filtered data and recharts bars
 */
export const filterChartDataAndBarsByLegendSelection = (
  data: { [key: string]: string | number }[],
  rechartsBars: { dataKey: string; fill: string; stackId?: string }[],
  selectedResources: string[],
) => {
  // If no resources are selected, show all data and bars (default behavior)
  if (selectedResources.length === 0) {
    return { filteredData: data, filteredRechartsBars: rechartsBars };
  }

  // Filter recharts bars
  const filteredRechartsBars = rechartsBars.filter((bar) =>
    selectedResources.includes(bar.dataKey),
  );

  // Filter data to only include selected resources
  const filteredData = data.map((item) => {
    const filteredItem: { [key: string]: string | number } = {
      category: item.category,
    };
    selectedResources.forEach((resource) => {
      if (resource in item) {
        filteredItem[resource] = item[resource];
      }
    });
    return filteredItem;
  });

  return { filteredData, filteredRechartsBars };
};

export const useChartData = <T extends BarchartBars>(
  bars: T,
  type: BarchartProps<T>['type'],
  colorSet: Record<string, ChartColors | string>,
  stacked?: boolean,
  defaultSort?: BarchartProps<T>['defaultSort'],
  unitRange?: UnitRange,
  stackedBarSort?: 'default' | 'legend',
) => {
  const { selectedResources, listResources } = useChartLegend();

  // Get legend order when stackedBarSort is 'legend'
  const legendOrder = stackedBarSort === 'legend' ? listResources() : undefined;

  const { data, rechartsBars } = formatPrometheusDataToRechartsDataAndBars(
    bars,
    type,
    colorSet,
    stacked,
    defaultSort,
    legendOrder,
  );

  // Filter both data and bars to only include selected resources for accurate maxValue calculation
  const { filteredData, filteredRechartsBars } =
    filterChartDataAndBarsByLegendSelection(
      data,
      rechartsBars,
      selectedResources,
    );

  const maxValue = getMaxBarValue(filteredData, stacked);

  const { unitLabel, roundReferenceValue, rechartsData } =
    computeUnitLabelAndRoundReferenceValue(filteredData, maxValue, unitRange);

  return {
    rechartsBars: filteredRechartsBars,
    unitLabel,
    roundReferenceValue,
    rechartsData,
  };
};

export const getCurrentPoint = <T extends BarchartBars>(
  props: TooltipContentProps<number, string>,
  hoveredValue: string | undefined,
) => {
  const { payload, label } = props;

  const tooltipValues: {
    label: T[number]['label'];
    value: number;
    isHovered: boolean;
  }[] = payload.map((item) => ({
    label: item.name,
    value: item.value,
    isHovered: item.name === hoveredValue,
  }));

  return {
    category: label as string | number,
    values: tooltipValues,
  };
};
