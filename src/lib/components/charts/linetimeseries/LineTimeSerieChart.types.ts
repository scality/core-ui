import { TooltipContentProps } from 'recharts';

export type Serie = {
  /** The name of the resource */
  resource: string;
  /** The original data format from prometheus, extend the value to include number type */
  data: [number, number | string | null][];
  /** Function to generate the tooltip label - mandatory for tooltip display */
  getTooltipLabel: (metricPrefix?: string, resource?: string) => string;
  /** The name of the metric prefix (e.g., read, write, in, out) */
  metricPrefix?: string;
  /** Whether the line should be dashed */
  isLineDashed?: boolean;
};

export type NonSymmetricalChartSerie = {
  yAxisType?: 'default' | 'percentage';
  series: Serie[] | undefined;
};

/**
 * The symmetrical chart props are used to display two series on the same chart,
 * such as in/out, write/read
 */
export type SymmetricalChartSerie = {
  yAxisType: 'symmetrical';
  series:
    | {
        above: Serie[] | undefined;
        below: Serie[] | undefined;
      }
    | undefined;
};

export type LineChartProps = (
  | NonSymmetricalChartSerie
  | SymmetricalChartSerie
) & {
  /** The title of the chart */
  title: string;
  /** The height of the chart in pixels */
  height: number;
  /** Starting timestamp in seconds */
  startingTimeStamp: number;
  /** Interval between data points in seconds */
  interval: number;
  /** Total duration of the chart in seconds */
  duration: number;
  /** Unit range configuration for automatic unit scaling */
  unitRange?: {
    threshold: number;
    label: string;
  }[];
  /** Sync ID for synchronizing multiple charts */
  syncId?: string;
  /** Whether the chart is in loading state */
  isLoading?: boolean;
  /** Y-axis title label */
  yAxisTitle?: string;
  /** Help text displayed as a tooltip icon */
  helpText?: string;
  /** Custom tooltip renderer */
  renderTooltip?: (
    tooltipProps: TooltipContentProps<number, string>,
    unitLabel?: string,
    duration?: number,
  ) => React.ReactNode;
};

export type LineTimeSerieChartTooltipProps = {
  tooltipProps: TooltipContentProps<number, string>;
  unitLabel?: string;
  duration: number;
  renderTooltip?: (
    tooltipProps: TooltipContentProps<number, string>,
    unitLabel?: string,
    duration?: number,
  ) => React.ReactNode;
  isSymmetrical?: boolean;
  belowSeriesLabels?: Set<string>;
  chartContainerRef: React.RefObject<HTMLDivElement>;
  /** The unique ID of this chart instance */
  chartId: string;
  /** Whether the mouse is currently over this chart's container */
  isChartHovered: boolean;
};

/**
 * Type guard to check if series is symmetrical (has above/below structure)
 */
export const isSymmetricalSeries = (
  series: Serie[] | { above: Serie[] | undefined; below: Serie[] | undefined },
): series is { above: Serie[]; below: Serie[] } => {
  return 'above' in series && 'below' in series;
};
