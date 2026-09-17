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
   * Y-axis scale, for a metric spanning orders of magnitude: on a linear axis
   * the quiet periods flatten onto the baseline and only the spikes are
   * readable. Display only — no value is rescaled, and the tooltip, legend and
   * unit scaling keep the numbers you passed in.
   *
   * `'log'` gives each decade the same height and ticks the decades. Zero has
   * no logarithm, so it reserves the slot below the first decade, labels it
   * `0`, and runs zeros there — a measured zero stays distinguishable from a
   * missing sample, which a gap would not. Negatives are dropped.
   *
   * `'symlog'` is linear near zero and logarithmic beyond, so it plots both
   * signs and zero itself with no reserved slot. Its price: distances read as
   * differences near zero and as ratios further out.
   *
   * @default 'linear'
   */
  yAxisScale?: 'linear' | 'log' | 'symlog';
};

/**
 * The symmetrical chart props are used to display two series on the same chart,
 * such as in/out, write/read
 */
export type SymmetricalChartSerie = {
  yAxisType: 'symmetrical';
  /**
   * Y-axis scale. `'log'` is not available here: half of a symmetrical axis is
   * negative by construction, and negatives have no logarithm.
   *
   * `'symlog'` is linear within a window around zero and logarithmic outside
   * it, so both halves compress and zero keeps the centre line. Worth it when
   * the two directions span orders of magnitude — the usual shape of an in/out
   * pair, where a linear axis sized by the busy side flattens the quiet one.
   *
   * @default 'linear'
   */
  yAxisScale?: 'linear' | 'symlog';
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
   * - `'default'` — opaque background, horizontal grid lines, header visible, Y-axis line visible.
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
   * // Remove grid lines from the default preset
   * <LineTimeSerieChart displayOptions={{ showHorizontalGridLines: false }} ... />
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
  default: { noBackground: false, showHorizontalGridLines: true, noHeader: false, noYAxisLine: false, noTickLine: false },
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
   * Where a measured zero was drawn, as a Y-axis value.
   *
   * A log axis has no position for `0`, so it reserves the decade below its
   * lowest and plots zeros there. This is that coordinate, so a tooltip can
   * report the `0` that was measured rather than where it was parked. `null`
   * when no slot was reserved.
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
