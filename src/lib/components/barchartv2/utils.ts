import { BarchartProps } from './Barchart.component';
import { DAY_MONTH_FORMATER } from '../date/FormattedDateTime';

export const getRoundReferenceValue = (value: number): number => {
  if (value <= 0) return 10; // Default for zero or negative values

  // Get the magnitude (10^n where n is the number of digits - 1)
  const magnitude = Math.pow(10, Math.floor(Math.log10(value)));

  // Normalized value between 1 and 10
  const normalized = value / magnitude;

  // Round to nice numbers based on normalized value
  if (normalized <= 1) return magnitude;
  if (normalized <= 2.5) return 2.5 * magnitude;
  if (normalized <= 5) return 5 * magnitude;
  return 10 * magnitude;
};

export const getMinValue = (data: { [key: string]: string | number }[]) => {
  const values = data.map((item) => {
    const numberValues = Object.keys(item)
      .filter((key) => key !== 'category')
      .map((key) => Number(item[key]));
    return Math.min(...numberValues);
  });
  return Math.min(...values);
};
export const getMaxValue = (data: { [key: string]: string | number }[]) => {
  const values = data.map((item) => {
    //filter out the category key
    const numberValues = Object.keys(item)
      .filter((key) => key !== 'category')
      .map((key) => Number(item[key]));
    return Math.max(...numberValues);
  });
  return Math.max(...values);
};
/**
 * Converts prometheus data to recharts data format
 * @param bars - The bars to convert
 * @param type - The chart type (category or time)
 * @returns Recharts data format
 * @example
 * Category data:
 * const bars = [
 *   { label: 'Success', data: [['category1', 2], ['category2', 4], ['category3', 6]], color: 'green' },
 *   { label: 'Failed', data: [['category1', 8], ['category2', 10], ['category3', 12]], color: 'red' },
 * ];
 * const result = formatPrometheusDataToChartData(bars, 'category');
 * result.data = [
 *   { category: 'category1', success: 2, failed: 8 },
 *   { category: 'category2', success: 4, failed: 10 },
 *   { category: 'category3', success: 6, failed: 12 },
 * ];
 *
 * Time data:
 * const bars = [
 *   { label: 'Success', data: [[timestamp, 2], [timestamp, 1]], color: 'green' },
 *   { label: 'Failed', data: [[timestamp, 3], [timestamp, 0]], color: 'red' },
 * ];
 * const result = formatPrometheusDataToChartData(bars, { type: 'time', timeRange: {...} });
 * result.data = [
 *   { category: 'Mon Jan 01', success: 2, failed: 3 },
 *   { category: 'Tue Jan 02', success: 1, failed: 0 },
 * ];
 */
export const formatPrometheusDataToChartData = (
  bars: BarchartProps['bars'],
  type: BarchartProps['type'],
): {
  data: {
    [key: string]: string | number;
  }[];
  rechartsBars: {
    dataKey: string;
    fill: string;
  }[];
} => {
  const rechartsBars = bars.map((bar) => ({
    dataKey: bar.label.toLowerCase().replace(/\s+/g, ''),
    fill: bar.color,
  }));

  // Create a map to collect all unique categories/keys
  const categoryMap = new Map<
    string | number,
    { [key: string]: string | number }
  >();

  const formatCategory = (key: string | number): string => {
    if (type === 'category') {
      return String(key);
    } else if (type.type === 'time') {
      return DAY_MONTH_FORMATER.format(new Date(key as number)).replace(
        /[ ,]/g,
        '',
      );
    }
    return String(key);
  };

  bars.forEach((bar) => {
    const dataKey = bar.label.toLowerCase().replace(/\s+/g, '');

    bar.data.forEach(([key, value]) => {
      const category = formatCategory(key);

      if (!categoryMap.has(category)) {
        categoryMap.set(category, { category });
      }

      const existingData = categoryMap.get(category)!;
      existingData[dataKey] = value;
    });
  });

  const data = Array.from(categoryMap.values());

  return {
    rechartsBars,
    data,
  };
};
