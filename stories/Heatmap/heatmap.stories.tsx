import { Meta, StoryObj } from '@storybook/react-webpack5';
import { useTheme } from 'styled-components';
import {
  Box,
  Heatmap,
  HeatmapDiscreteScale,
  HeatmapRow,
} from '../../src/lib/next';
import { FormattedDateTime } from '../../src/lib/components/date/FormattedDateTime';
import {
  CoreUITheme,
  lineColor1,
  lineColor2,
  lineColor3,
  lineColor4,
  lineColor6,
  lineColor7,
} from '../../src/lib/style/theme';

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

type CellStatus = 'Ok' | 'Warning' | 'Critical' | 'No data';

const STATUS_ORDER: CellStatus[] = ['Ok', 'Warning', 'Critical', 'No data'];

const MONITORING_SERVICES = [
  'Alertmanager',
  'Grafana',
  'Prometheus',
  'Supervisor',
  'Thanos',
];

const FIVE_MINUTES = 5 * 60 * 1000;
const ONE_HOUR = 60 * 60 * 1000;
const ONE_DAY = 24 * ONE_HOUR;

const buildTimeSlots = (start: Date, count: number, step: number): Date[] =>
  Array.from({ length: count }, (_, i) => new Date(start.getTime() + i * step));

/** Deterministic pseudo-random so the stories stay stable between renders. */
const noise = (a: number, b: number) => (a * 73 + b * 151 + a * b * 17) % 100;

const buildStatusRows = (
  labels: string[],
  columnCount: number,
  /** Index from which the whole column is reported as 'No data' (not collected yet). */
  noDataFrom = columnCount,
): HeatmapRow<CellStatus>[] =>
  labels.map((label, rowIndex) => ({
    label,
    cells: Array.from({ length: columnCount }, (_, colIndex) => {
      if (colIndex >= noDataFrom) return 'No data' as CellStatus;
      const value = noise(rowIndex + 1, colIndex + 1);
      if (value < 7) return 'Critical' as CellStatus;
      if (value < 22) return 'Warning' as CellStatus;
      return 'Ok' as CellStatus;
    }),
  }));

/* -- Value sets the colorSet stories are built on -------------------------- */

const BACKUP_OUTCOMES = [
  'Full',
  'Incremental',
  'Snapshot',
  'Skipped',
  'Failed',
] as const;

const BACKUP_POLICIES = [
  'vault-01 nightly',
  'vault-02 nightly',
  'archive weekly',
  'metadata hourly',
  'config hourly',
];

const WORKLOAD_PROFILES = [
  'Read-heavy',
  'Write-heavy',
  'Mixed',
  'Idle',
] as const;

const BUCKETS = [
  'ingest-raw',
  'media-thumbnails',
  'analytics-exports',
  'backup-archive',
  'user-uploads',
  'logs-audit',
];

/** Codes, not sentences: the legend spells them out through `labelMap`. */
const RESPONSE_CODES = ['200', '206', '403', '500'] as const;

const S3_ENDPOINTS = [
  'GET /objects',
  'PUT /objects',
  'POST /multipart',
  'DELETE /objects',
  'GET /buckets',
];

/** Picks from `values` by geometric share, given a 0-99 draw. */
const pickWeighted = <T,>(values: readonly T[], draw: number): T => {
  let remaining = draw;

  for (let index = 0; index < values.length - 1; index++) {
    const share = 100 / 2 ** (index + 1);
    if (remaining < share) return values[index];
    remaining -= share;
  }

  return values[values.length - 1];
};

/**
 * Rows over any value set: the generated stories differ in what their values
 * are called, not in how the grid is filled.
 *
 * Each value is half as frequent as the one before it, so a generated grid has
 * a dominant value and a rare tail — an even wash would hide which color means
 * what, which is the only thing these stories are about.
 */
const buildCategoryRows = <T extends string>(
  labels: string[],
  columnCount: number,
  /** Values from most to least frequent. */
  values: readonly T[],
): HeatmapRow<T>[] =>
  labels.map((label, rowIndex) => ({
    label,
    cells: Array.from({ length: columnCount }, (_, colIndex) =>
      pickWeighted(values, noise(rowIndex + 2, colIndex + 3)),
    ),
  }));

/** `sortOrder` that keeps the legend in the order the values are declared. */
const inDeclaredOrder = (values: readonly string[]) => (a: string, b: string) =>
  values.indexOf(a) - values.indexOf(b);

/**
 * The one thing an app brings to a discrete heatmap: what its values mean, in
 * its own colors and its own order.
 */
const useStatusScale = (): HeatmapDiscreteScale => {
  const theme = useTheme() as CoreUITheme;

  return {
    colorSet: {
      Ok: theme.statusHealthy,
      Warning: theme.statusWarning,
      Critical: theme.statusCritical,
      'No data': theme.textSecondary,
    },
    sortOrder: inDeclaredOrder(STATUS_ORDER),
  };
};

/* -------------------------------------------------------------------------- */
/*                                  STORIES                                   */
/* -------------------------------------------------------------------------- */

/** Presentational props, shared by every story so a control means the same thing. */
type LayoutArgs = {
  cellHeight: number;
  cellGap: number;
  labelEvery: number;
  labelWidth: string;
};

/** Stories whose grid is typed in by hand. The data is the source of truth. */
type DataArgs = LayoutArgs & { rows: HeatmapRow<CellStatus>[] };

/** Stories whose grid is generated, because hand-editing 400 cells is not a thing. */
type GeneratedArgs = LayoutArgs & {
  /** Rows — one per monitored entity: a bucket, a service, a node. */
  entities: number;
  /** Columns — one per time slot on the x-axis. */
  columns: number;
  /** Trailing columns reported as 'No data': the "collection has not caught up" tail. */
  noDataColumns: number;
};

const layoutArgTypes = {
  cellHeight: {
    control: { type: 'range' as const, min: 4, max: 48, step: 1 },
    description: 'Cell height in px',
  },
  cellGap: {
    control: { type: 'range' as const, min: 0, max: 16, step: 1 },
    description:
      'Gap between cells in px. At 0 the grid reads as a continuous timeline',
  },
  labelEvery: {
    control: { type: 'range' as const, min: 1, max: 12, step: 1 },
    description: 'Show one column label every N columns',
  },
  labelWidth: {
    control: 'text' as const,
    description: 'Row label gutter. Labels truncate rather than widen it',
  },
};

const layoutArgs: LayoutArgs = {
  cellHeight: 20,
  cellGap: 4,
  labelEvery: 1,
  labelWidth: '7rem',
};

const layoutProps = (args: LayoutArgs) => ({
  labelEvery: args.labelEvery,
  labelWidth: args.labelWidth,
  cellHeight: `${args.cellHeight}px`,
  cellGap: `${args.cellGap}px`,
});

const meta: Meta<typeof Heatmap> = {
  title: 'Components/Data Display/Charts/Heatmap',
  component: Heatmap,
};
export default meta;

const HOUR_START = new Date('2026-08-25T10:00:00Z');
const DAY_START = new Date('2026-08-25T00:00:00Z');

/** Row labels for the generated stories, so the count control is honest at any N. */
const entityLabels = (count: number) =>
  Array.from(
    { length: count },
    (_, index) =>
      MONITORING_SERVICES[index] ??
      `storage-node-${index - MONITORING_SERVICES.length + 1}`,
  );

/**
 * The interactive one: edit the grid itself.
 *
 * `rows` is a real control — add a row, rename one, or change any cell to Ok,
 * Warning, Critical or 'No data' and the grid follows. The x-axis is derived from the
 * longest row, so adding cells adds columns; a row with fewer cells leaves the
 * rest of its line empty rather than shifting anything.
 */
export const Playground: StoryObj<DataArgs> = {
  argTypes: {
    ...layoutArgTypes,
    rows: {
      control: 'object',
      description:
        "One entry per row: { label, cells }. A cell is Ok | Warning | Critical | 'No data'",
    },
  },
  args: {
    ...layoutArgs,
    rows: [
      {
        label: 'Alertmanager',
        cells: ['Ok', 'Ok', 'Warning', 'Ok', 'No data'],
      },
      { label: 'Grafana', cells: ['Ok', 'Ok', 'Ok', 'Ok', 'No data'] },
      {
        label: 'Prometheus',
        cells: ['Warning', 'Critical', 'Critical', 'Ok', 'No data'],
      },
      { label: 'Supervisor', cells: ['Ok', 'Ok', 'Ok', 'Ok', 'No data'] },
      { label: 'Thanos', cells: ['Ok', 'Warning', 'Ok', 'Ok', 'No data'] },
    ],
  },
  render: (args) => {
    const scale = useStatusScale();
    const columnCount = Math.max(
      1,
      ...args.rows.map((row) => row.cells.length),
    );

    return (
      <Box maxWidth="60rem">
        <Heatmap
          title="Monitoring Services Status"
          legendTitle="Service Status"
          scale={scale}
          rows={args.rows}
          columns={buildTimeSlots(HOUR_START, columnCount, FIVE_MINUTES)}
          {...layoutProps(args)}
        />
      </Box>
    );
  },
};

/**
 * 1:1 with the reference screenshot: 5 services, 4 columns, the last one has no
 * data yet.
 */
export const ScreenshotEquivalent: StoryObj<LayoutArgs> = {
  argTypes: layoutArgTypes,
  args: layoutArgs,
  render: (args) => {
    const scale = useStatusScale();

    return (
      <Box maxWidth="60rem">
        <Heatmap
          title="Monitoring Services Status"
          legendTitle="Service Status"
          scale={scale}
          rows={MONITORING_SERVICES.map((label) => ({
            label,
            cells: ['Ok', 'Ok', 'Ok', 'No data'] as CellStatus[],
          }))}
          columns={buildTimeSlots(
            new Date('2026-08-25T10:30:00Z'),
            4,
            FIVE_MINUTES,
          )}
          {...layoutProps(args)}
        />
      </Box>
    );
  },
};

/** Realistic generated mix over one hour, 5-minute slots, label every 15 minutes. */
export const ServiceStatusOverOneHour: StoryObj<LayoutArgs> = {
  argTypes: layoutArgTypes,
  args: { ...layoutArgs, labelEvery: 3 },
  render: (args) => {
    const scale = useStatusScale();

    return (
      <Box maxWidth="60rem">
        <Heatmap
          title="Monitoring Services Status"
          legendTitle="Service Status"
          scale={scale}
          rows={buildStatusRows(MONITORING_SERVICES, 12, 10)}
          columns={buildTimeSlots(HOUR_START, 12, FIVE_MINUTES)}
          {...layoutProps(args)}
        />
      </Box>
    );
  },
};

/**
 * Dense grid, generated: entities against time slots. Push the gap to 0 and the
 * grid reads as a continuous timeline; the label frequency is what keeps the
 * x-axis legible.
 */
export const DenseGrid: StoryObj<GeneratedArgs> = {
  argTypes: {
    ...layoutArgTypes,
    entities: {
      control: { type: 'range', min: 1, max: 24, step: 1 },
      description: 'Rows — one per monitored entity',
    },
    columns: {
      control: { type: 'range', min: 2, max: 96, step: 1 },
      description: 'Columns — one per time slot',
    },
    noDataColumns: { control: { type: 'range', min: 0, max: 12, step: 1 } },
  },
  args: {
    ...layoutArgs,
    entities: 8,
    columns: 48,
    noDataColumns: 3,
    cellHeight: 16,
    cellGap: 1,
    labelEvery: 6,
    labelWidth: '9rem',
  },
  render: (args) => {
    const scale = useStatusScale();

    return (
      <Box maxWidth="75rem">
        <Heatmap
          title="Node health"
          legendTitle="Service Status"
          scale={scale}
          rows={buildStatusRows(
            entityLabels(args.entities),
            args.columns,
            args.columns - args.noDataColumns,
          )}
          columns={buildTimeSlots(
            DAY_START,
            args.columns,
            ONE_DAY / args.columns,
          )}
          {...layoutProps(args)}
        />
      </Box>
    );
  },
};

/**
 * Continuous values instead of statuses: opacity ramp + gradient scale.
 *
 * `pinnedToHundred` is what the top of the ramp is worth. This grid peaks
 * around 60 %, so leaving `max` to the data burns the whole ramp on the range
 * the data happens to occupy and the busiest node reads as fully saturated —
 * true of this chart, and a lie next to another one whose peak is 20 %. Pinning
 * `max: 100` spends the ramp on the scale the unit actually has, so two grids
 * side by side mean the same thing. Flip the control and watch both the cells
 * and the number at the top of the gradient move.
 */
export const NumericValues: StoryObj<
  Omit<GeneratedArgs, 'noDataColumns'> & {
    minOpacity: number;
    pinnedToHundred: boolean;
  }
> = {
  argTypes: {
    ...layoutArgTypes,
    entities: { control: { type: 'range', min: 1, max: 24, step: 1 } },
    columns: { control: { type: 'range', min: 2, max: 48, step: 1 } },
    minOpacity: {
      control: { type: 'range', min: 0, max: 0.6, step: 0.05 },
      description: 'Opacity floor, so the low values stay visible',
    },
    pinnedToHundred: {
      control: 'boolean',
      description:
        'Top of the ramp: 100 % (comparable between charts) or the largest value in the data',
    },
  },
  args: {
    ...layoutArgs,
    entities: 6,
    columns: 24,
    labelEvery: 3,
    labelWidth: '9rem',
    minOpacity: 0.1,
    pinnedToHundred: true,
  },
  render: (args) => {
    const theme = useTheme() as CoreUITheme;

    return (
      <Box maxWidth="75rem">
        <Heatmap
          title="CPU usage"
          legendTitle="%"
          scale={{
            type: 'continuous',
            colorRGB: theme.statusHealthyRGB,
            minOpacity: args.minOpacity,
            // undefined hands the top of the ramp back to the data
            max: args.pinnedToHundred ? 100 : undefined,
          }}
          rows={entityLabels(args.entities).map((label, rowIndex) => ({
            label,
            // a load that peaks around 60 %, so pinning the top to 100 is
            // visible rather than a change of one percent
            cells: Array.from({ length: args.columns }, (_, colIndex) =>
              Math.round(noise(rowIndex + 3, colIndex + 5) * 0.6),
            ),
          }))}
          columns={buildTimeSlots(DAY_START, args.columns, ONE_HOUR)}
          formatValue={(value: number) => `${value} %`}
          {...layoutProps(args)}
        />
      </Box>
    );
  },
};

/**
 * The colors are the caller's, and so are the values. Five backup outcomes,
 * none of them a health status, and so none of them painted from the status
 * tokens: a categorical scale takes the theme's series colors, and leaves
 * `statusHealthy` and `statusCritical` to mean health where health is what is
 * being shown.
 *
 * `sortOrder` is what keeps the legend in pipeline order rather than
 * alphabetical, so the rare outcomes stay at the bottom where they are looked
 * for.
 */
export const CustomColorSet: StoryObj<LayoutArgs> = {
  argTypes: layoutArgTypes,
  args: { ...layoutArgs, labelEvery: 2, labelWidth: '9rem' },
  render: (args) => (
    <Box maxWidth="60rem">
      <Heatmap
        title="Backup jobs"
        legendTitle="Job outcome"
        scale={{
          colorSet: {
            Full: lineColor1,
            Incremental: lineColor2,
            Snapshot: lineColor3,
            Skipped: lineColor4,
            Failed: lineColor6,
          },
          sortOrder: inDeclaredOrder(BACKUP_OUTCOMES),
        }}
        rows={buildCategoryRows(BACKUP_POLICIES, 14, BACKUP_OUTCOMES)}
        columns={buildTimeSlots(DAY_START, 14, ONE_DAY)}
        formatColumnTick={(column) => (
          <FormattedDateTime format="day-month-abbreviated" value={column} />
        )}
        {...layoutProps(args)}
      />
    </Box>
  ),
};

/**
 * Discrete does not mean three states of health. Here the values are workload
 * profiles, colored from the series palette because that is what a categorical
 * scale is for, and the grid behaves exactly the same: click *Write-heavy* in
 * the legend and every other slot dims, leaving the write bursts alone on the
 * timeline.
 */
export const NonStatusValues: StoryObj<LayoutArgs> = {
  argTypes: layoutArgTypes,
  args: { ...layoutArgs, labelEvery: 3, labelWidth: '10rem', cellGap: 2 },
  render: (args) => {
    const theme = useTheme() as CoreUITheme;

    return (
      <Box maxWidth="75rem">
        <Heatmap
          title="Bucket workload profile"
          legendTitle="Profile"
          scale={{
            colorSet: {
              'Read-heavy': lineColor3,
              'Write-heavy': lineColor7,
              Mixed: lineColor1,
              // the one value that is an absence: a theme neutral, not a hue
              Idle: theme.infoPrimary,
            },
            sortOrder: inDeclaredOrder(WORKLOAD_PROFILES),
          }}
          rows={buildCategoryRows(BUCKETS, 24, WORKLOAD_PROFILES)}
          columns={buildTimeSlots(DAY_START, 24, ONE_HOUR)}
          {...layoutProps(args)}
        />
      </Box>
    );
  },
};

/**
 * When the values in the data are not what a reader should see: the cells hold
 * bare response codes, `labelMap` spells them out in the legend, `formatValue`
 * does the same for the tooltip and the cell's `aria-label`, and `sortOrder`
 * compares them as the numbers they are rather than as the strings they arrive
 * as.
 */
export const LabelledValues: StoryObj<LayoutArgs> = {
  argTypes: layoutArgTypes,
  args: { ...layoutArgs, labelEvery: 3, labelWidth: '9rem' },
  render: (args) => {
    const theme = useTheme() as CoreUITheme;
    const labelMap = {
      '200': '200 OK',
      '206': '206 Partial Content',
      '403': '403 Forbidden',
      '500': '500 Internal Error',
    };

    return (
      <Box maxWidth="70rem">
        <Heatmap
          title="Dominant response code"
          legendTitle="HTTP status"
          scale={{
            colorSet: {
              '200': theme.statusHealthy,
              '206': lineColor1,
              '403': theme.statusWarning,
              '500': theme.statusCritical,
            },
            labelMap,
            sortOrder: (a, b) => Number(a) - Number(b),
          }}
          rows={buildCategoryRows(S3_ENDPOINTS, 12, RESPONSE_CODES)}
          columns={buildTimeSlots(HOUR_START, 12, ONE_HOUR)}
          formatValue={(value) => labelMap[value] ?? value}
          {...layoutProps(args)}
        />
      </Box>
    );
  },
};

/**
 * The axis crosses midnight, which no other story does. The tick rolls from
 * 23:00 to 00:00 and says nothing else about the day changing — the date is one
 * hover away in the tooltip, and a date on the axis would cost more room than
 * the change is worth. That is a decision rather than an oversight, which is
 * why it has a story.
 */
export const AcrossMidnight: StoryObj<LayoutArgs> = {
  argTypes: layoutArgTypes,
  args: { ...layoutArgs, labelEvery: 1 },
  render: (args) => {
    const scale = useStatusScale();

    return (
      <Box maxWidth="60rem">
        <Heatmap
          title="Monitoring Services Status"
          legendTitle="Service Status"
          scale={scale}
          rows={buildStatusRows(MONITORING_SERVICES, 10)}
          columns={buildTimeSlots(
            new Date('2026-08-25T19:00:00'),
            10,
            ONE_HOUR,
          )}
          {...layoutProps(args)}
        />
      </Box>
    );
  },
};
