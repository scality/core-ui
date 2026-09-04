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
  /** Whether to render a gradient fill under the line */
  withGradient?: boolean;
};

export type NonSymmetricalChartSerie = {
  yAxisType?: 'default' | 'percentage';
  series: Serie[] | undefined;
  /**
   * Y-axis scale.
   *
   * `'log'` is for a metric whose values span orders of magnitude: on a linear
   * axis the quiet periods flatten onto the baseline and only the spikes are
   * readable, and a log axis gives each decade the same height instead. The
   * axis is bounded by the decades enclosing the data, and its ticks are the
   * decades themselves.
   *
   * It changes the display and nothing else: no value is rescaled, and the
   * tooltip, the legend and the unit scaling all keep the numbers the caller
   * passed in.
   *
   * One thing to know before reaching for it. Zero has no logarithm, so a
   * sample of zero or less is dropped and leaves a gap — which is exactly what
   * a missing sample leaves. On a log axis "measured zero" and "no data" become
   * indistinguishable, and they are different facts: a zero is a measurement,
   * missing data is the absence of one. A metric that legitimately reads zero
   * belongs on a linear axis.
   *
   * The negative half of a `'symmetrical'` axis has no logarithm either, which
   * is why the option does not exist there.
   *
   * @default 'linear'
   */
  yAxisScale?: 'linear' | 'log';
};

/**
 * The symmetrical chart props are used to display two series on the same chart,
 * such as in/out, write/read
 */
export type SymmetricalChartSerie = {
  yAxisType: 'symmetrical';
  /**
   * Not available on a symmetrical chart: its axis spans negative values, which
   * have no logarithm.
   */
  yAxisScale?: never;
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
  /** Optional content rendered on the right side of the chart header */
  rightTitle?: React.ReactNode;
  /**
   * Named display preset that sets a group of visual defaults at once.
   *
   * - `'default'` — opaque background, no grid lines, header visible, Y-axis line visible.
   * - `'modern'`  — transparent background, horizontal grid lines, no header, no Y-axis line.
   *
   * Individual values can be overridden with `displayOptions`.
   * Defaults to `'default'` when omitted.
   *
   * @example
   * // Use the modern preset as-is
   * <LineTimeSerieChart displayPreset="modern" ... />
   *
   * // Use modern but keep the header
   * <LineTimeSerieChart displayPreset="modern" displayOptions={{ noHeader: false }} ... />
   */
  displayPreset?: 'default' | 'modern';
  /**
   * Fine-grained overrides applied on top of the active `preset`.
   * Only the properties you specify are overridden; the rest come from the preset.
   *
   * - `noBackground`            — removes the chart background (transparent).
   * - `showHorizontalGridLines` — draws horizontal grid lines across the plot area.
   * - `noHeader`                — hides the title/help-text/right-title header row.
   * - `noYAxisLine`             — hides the vertical Y-axis line.
   * - `noTickLine`              — hides the tick marks on the Y-axis.
   *
   * @example
   * // Add grid lines to the default preset
   * <LineTimeSerieChart displayOptions={{ showHorizontalGridLines: true }} ... />
   */
  displayOptions?: {
    noBackground?: boolean;
    showHorizontalGridLines?: boolean;
    noHeader?: boolean;
    noYAxisLine?: boolean;
    noTickLine?: boolean;
  };
  /** Custom tooltip renderer */
  renderTooltip?: (
    tooltipProps: TooltipContentProps<number, string>,
    unitLabel?: string,
    duration?: number,
  ) => React.ReactNode;
};

type DisplayOptions = Required<NonNullable<LineChartProps['displayOptions']>>;

export const CHART_PRESETS: Record<'default' | 'modern', DisplayOptions> = {
  default: { noBackground: false, showHorizontalGridLines: false, noHeader: false, noYAxisLine: false, noTickLine: false },
  modern:  { noBackground: true,  showHorizontalGridLines: true,  noHeader: true,  noYAxisLine: true,  noTickLine: true  },
};

export type LineTimeSerieChartTooltipProps = {
  tooltipProps: TooltipContentProps<number, string>;
  unitLabel?: string;
  valueBase?: number;
  unitRange?: {
    threshold: number;
    label: string;
  }[];
  duration: number;
  renderTooltip?: (
    tooltipProps: TooltipContentProps<number, string>,
    unitLabel?: string,
    duration?: number,
  ) => React.ReactNode;
  isSymmetrical?: boolean;
  /**
   * A log axis's reserved zero band. A value drawn there is reported as the 0 it
   * actually is, not as the position it occupies.
   */
  logZeroValue?: number | null;
  belowSeriesLabels?: Set<string>;
  chartContainerRef: React.RefObject<HTMLDivElement>;
  /** The unique ID of this chart instance */
  chartId: string;
};

/**
 * Type guard to check if series is symmetrical (has above/below structure)
 */
export const isSymmetricalSeries = (
  series: Serie[] | { above: Serie[] | undefined; below: Serie[] | undefined },
): series is { above: Serie[]; below: Serie[] } => {
  return 'above' in series && 'below' in series;
};
