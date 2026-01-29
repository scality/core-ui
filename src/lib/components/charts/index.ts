// Components
export { Barchart } from './barchart/Barchart';
export type {
  BarchartProps,
  BarchartBars,
  BarchartTooltipFn,
  BarchartSortFn,
  Point,
} from './barchart/Barchart';

export { LineTimeSerieChart } from './linetimeseries/LineTimeSerieChart';
export type {
  LineChartProps,
  Serie,
} from './linetimeseries/LineTimeSerieChart.types';

export { GlobalHealthBar } from './globalhealthbar/GlobalHealthBar';
export type { GlobalHealthProps } from './globalhealthbar/GlobalHealthBar';
export type { Alert } from './globalhealthbar/GlobalHealthBar.hooks';

export { Sparkline } from './sparkline/Sparkline';

// Legend
export { ChartLegend } from './legend/ChartLegend';
export {
  ChartLegendWrapper,
  useChartId,
  useChartLegend,
} from './legend/ChartLegendWrapper';

// Tooltips (for advanced usage)
export { BarchartTooltip } from './barchart/BarchartTooltip';
export {
  ChartTooltipContainer,
  ChartTooltipItem,
  ChartTooltipHeader,
  ChartTooltipItemsContainer,
  ChartTooltipPortal,
} from './common/ChartTooltip';

// Shared utilities (for advanced usage)
export {
  getRoundReferenceValue,
  getTicks,
  getUnitLabel,
  addMissingDataPoint,
  formatXAxisDate,
  getTooltipDateFormat,
  normalizeChartDataWithUnits,
} from './common/chartUtils';

// Context Providers (for backward compatibility)
export {
  MetricsTimeSpanProvider,
  useMetricsTimeSpan,
} from './MetricsTimeSpanProvider';

// Types
export type { UnitRange, TimeType, CategoryType } from './types';
