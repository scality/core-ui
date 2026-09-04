import { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import styled, { useTheme } from 'styled-components';
import {
  Box,
  ChartLegend,
  ChartLegendWrapper,
  useChartLegend,
} from '../../src/lib/next';
import { spacing, Stack } from '../../src/lib/spacing';
import { Text } from '../../src/lib/components/text/Text.component';
import { Tooltip } from '../../src/lib/components/tooltip/Tooltip.component';
import { FormattedDateTime } from '../../src/lib/components/date/FormattedDateTime';

/**
 * Heatmap built by composing existing core-ui primitives — no new component.
 *
 * Two recipes:
 *  - `StatusHeatmap`  : discrete statuses — Box (CSS grid) + Tooltip + ChartLegend
 *  - `NumericHeatmap` : continuous values — the same grid under an opacity ramp
 */

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

type CellStatus = 'OK' | 'WARNING' | 'CRITICAL' | 'NONE';

const STATUS_ORDER: CellStatus[] = ['OK', 'WARNING', 'CRITICAL', 'NONE'];

type HeatmapRow<T> = { label: string; cells: T[] };

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
  /** Index from which the whole column is reported as NONE (no data yet). */
  noDataFrom = columnCount,
): HeatmapRow<CellStatus>[] =>
  labels.map((label, rowIndex) => ({
    label,
    cells: Array.from({ length: columnCount }, (_, colIndex) => {
      if (colIndex >= noDataFrom) return 'NONE' as CellStatus;
      const value = noise(rowIndex + 1, colIndex + 1);
      if (value < 7) return 'CRITICAL' as CellStatus;
      if (value < 22) return 'WARNING' as CellStatus;
      return 'OK' as CellStatus;
    }),
  }));

/* -------------------------------------------------------------------------- */
/*                        RECIPE 1 — Box grid + Tooltip                       */
/* -------------------------------------------------------------------------- */

const Cell = styled.div<{ $color: string; $dimmed: boolean; $height: string }>`
  height: ${({ $height }) => $height};
  border-radius: ${spacing.f2};
  background-color: ${({ $color }) => $color};
  opacity: ${({ $dimmed }) => ($dimmed ? 0.15 : 1)};
  transition: opacity 0.15s ease;
  cursor: pointer;

  /* outline, not border: it paints outside the box so nothing is re-laid out */
  &:hover {
    outline: ${spacing.f2} solid ${({ theme }) => theme.selectedActive};
    outline-offset: ${spacing.f1};
  }
`;

type StatusHeatmapProps = {
  rows: HeatmapRow<CellStatus>[];
  timeSlots: Date[];
  /** Show one label every N columns. */
  labelEvery?: number;
  cellHeight?: string;
  columnGap?: string;
  labelWidth?: string;
};

/**
 * Reads its colors from the ChartLegendWrapper context, so the legend is the
 * single source of truth and clicking a legend item actually filters the grid.
 */
const StatusGrid = ({
  rows,
  timeSlots,
  labelEvery = 1,
  cellHeight = spacing.f20,
  columnGap = spacing.f4,
  labelWidth = '7rem',
}: StatusHeatmapProps) => {
  const { getColor, isSelected } = useChartLegend();

  return (
    <Box
      display="grid"
      gridTemplateColumns={`${labelWidth} repeat(${timeSlots.length}, minmax(0, 1fr))`}
      gap={columnGap}
      alignItems="center"
      flex="1"
    >
      {rows.map((row) => (
        <React.Fragment key={row.label}>
          <Box textAlign="right" pr={spacing.f8}>
            <Text variant="Smaller" color="textSecondary">
              {row.label}
            </Text>
          </Box>
          {row.cells.map((status, colIndex) => (
            <Tooltip
              key={`${row.label}-${colIndex}`}
              placement="top"
              overlay={
                <Stack direction="vertical" gap="r2">
                  <Text variant="Smaller" isEmphazed>
                    {row.label}
                  </Text>
                  <Text variant="Smaller" color="textSecondary">
                    <FormattedDateTime
                      format="date-time"
                      value={timeSlots[colIndex]}
                    />
                  </Text>
                  <Text variant="Smaller">{status}</Text>
                </Stack>
              }
            >
              <Cell
                $color={getColor(status) ?? 'transparent'}
                $dimmed={!isSelected(status)}
                $height={cellHeight}
                tabIndex={0}
                role="img"
                aria-label={`${row.label} ${status}`}
              />
            </Tooltip>
          ))}
        </React.Fragment>
      ))}

      {/* x-axis labels row */}
      <Box />
      {timeSlots.map((timeSlot, colIndex) => (
        <Box key={`tick-${colIndex}`} textAlign="center" pt={spacing.f4}>
          {colIndex % labelEvery === 0 && (
            <Text variant="Smaller" color="textSecondary">
              <FormattedDateTime format="time" value={timeSlot} />
            </Text>
          )}
        </Box>
      ))}
    </Box>
  );
};

const StatusHeatmap = ({
  title,
  ...gridProps
}: StatusHeatmapProps & { title: string }) => {
  const theme = useTheme();

  return (
    <ChartLegendWrapper
      colorSet={{
        OK: theme.statusHealthy,
        WARNING: theme.statusWarning,
        CRITICAL: theme.statusCritical,
        NONE: theme.textSecondary,
      }}
      sortOrder={(a, b) =>
        STATUS_ORDER.indexOf(a as CellStatus) -
        STATUS_ORDER.indexOf(b as CellStatus)
      }
    >
      <Stack direction="vertical" gap="r16">
        <Text variant="Large" isEmphazed>
          {title}
        </Text>
        <Box display="flex" gap={spacing.f24} alignItems="flex-start">
          <StatusGrid {...gridProps} />
          <Stack direction="vertical" gap="r8">
            <Text variant="Smaller" isEmphazed>
              Service Status
            </Text>
            <ChartLegend
              shape="rectangle"
              direction="vertical"
              legendSize="Smaller"
              legendColor="textSecondary"
            />
          </Stack>
        </Box>
      </Stack>
    </ChartLegendWrapper>
  );
};

/* -------------------------------------------------------------------------- */
/*                   RECIPE 2 — continuous (numeric) heatmap                  */
/* -------------------------------------------------------------------------- */

const NumericHeatmap = ({
  title,
  rows,
  timeSlots,
  unit,
  minOpacity = 0.1,
  labelEvery = 1,
  labelWidth = '7rem',
}: {
  title: string;
  rows: HeatmapRow<number>[];
  timeSlots: Date[];
  unit: string;
  /** Opacity given to the lowest value, so it stays visible instead of dissolving. */
  minOpacity?: number;
  labelEvery?: number;
  labelWidth?: string;
}) => {
  const theme = useTheme();
  const max = Math.max(...rows.flatMap((row) => row.cells));

  return (
    <Stack direction="vertical" gap="r16">
      <Text variant="Large" isEmphazed>
        {title}
      </Text>
      <Box display="flex" gap={spacing.f24} alignItems="flex-start">
        <Box
          display="grid"
          gridTemplateColumns={`${labelWidth} repeat(${timeSlots.length}, minmax(0, 1fr))`}
          gap={spacing.f2}
          alignItems="center"
          flex="1"
        >
          {rows.map((row) => (
            <React.Fragment key={row.label}>
              <Box textAlign="right" pr={spacing.f8}>
                <Text variant="Smaller" color="textSecondary">
                  {row.label}
                </Text>
              </Box>
              {row.cells.map((value, colIndex) => (
                <Tooltip
                  key={`${row.label}-${colIndex}`}
                  placement="top"
                  overlay={
                    <Stack direction="vertical" gap="r2">
                      <Text variant="Smaller" isEmphazed>
                        {row.label}
                      </Text>
                      <Text variant="Smaller" color="textSecondary">
                        <FormattedDateTime
                          format="date-time"
                          value={timeSlots[colIndex]}
                        />
                      </Text>
                      <Text variant="Smaller">{`${value} ${unit}`}</Text>
                    </Stack>
                  }
                >
                  <Cell
                    $color={`rgba(${theme.statusHealthyRGB}, ${(
                      minOpacity +
                      (1 - minOpacity) * (value / max)
                    ).toFixed(2)})`}
                    $dimmed={false}
                    $height={spacing.f20}
                    tabIndex={0}
                    role="img"
                    aria-label={`${row.label} ${value} ${unit}`}
                  />
                </Tooltip>
              ))}
            </React.Fragment>
          ))}

          <Box />
          {timeSlots.map((timeSlot, colIndex) => (
            <Box key={`tick-${colIndex}`} textAlign="center" pt={spacing.f4}>
              {colIndex % labelEvery === 0 && (
                <Text variant="Smaller" color="textSecondary">
                  <FormattedDateTime format="time" value={timeSlot} />
                </Text>
              )}
            </Box>
          ))}
        </Box>

        {/* continuous scale: a gradient instead of discrete legend items */}
        <Stack direction="vertical" gap="r8">
          <Text variant="Smaller" isEmphazed>
            {unit}
          </Text>
          <Stack direction="horizontal" gap="r8">
            <Box
              width={spacing.f12}
              height="6rem"
              borderRadius={spacing.f2}
              style={{
                background: `linear-gradient(to top, rgba(${theme.statusHealthyRGB}, ${minOpacity}), rgba(${theme.statusHealthyRGB}, 1))`,
              }}
            />
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Text variant="Smaller" color="textSecondary">
                {max}
              </Text>
              <Text variant="Smaller" color="textSecondary">
                0
              </Text>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

/* -------------------------------------------------------------------------- */
/*                                  STORIES                                   */
/* -------------------------------------------------------------------------- */

/** Presentational props, shared by every story so a control means the same thing. */
type LayoutArgs = {
  cellHeight: number;
  columnGap: number;
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
  /** Trailing columns reported as NONE: the "collection has not caught up" tail. */
  noDataColumns: number;
};

const layoutArgTypes = {
  cellHeight: {
    control: { type: 'range' as const, min: 4, max: 48, step: 1 },
    description: 'Cell height in px',
  },
  columnGap: {
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
  columnGap: 4,
  labelEvery: 1,
  labelWidth: '7rem',
};

const gridProps = (args: LayoutArgs) => ({
  labelEvery: args.labelEvery,
  labelWidth: args.labelWidth,
  cellHeight: `${args.cellHeight}px`,
  columnGap: `${args.columnGap}px`,
});

const meta: Meta = {
  title: 'Components/Data Display/Charts/Heatmap (composition)',
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
 * `rows` is a real control — add a row, rename one, or change any cell to OK,
 * WARNING, CRITICAL or NONE and the grid follows. The x-axis is derived from the
 * longest row, so adding cells adds columns; a row with fewer cells leaves the
 * rest of its line empty rather than shifting anything.
 */
export const Playground: StoryObj<DataArgs> = {
  argTypes: {
    ...layoutArgTypes,
    rows: {
      control: 'object',
      description:
        'One entry per row: { label, cells }. A cell is OK | WARNING | CRITICAL | NONE',
    },
  },
  args: {
    ...layoutArgs,
    rows: [
      { label: 'Alertmanager', cells: ['OK', 'OK', 'WARNING', 'OK', 'NONE'] },
      { label: 'Grafana', cells: ['OK', 'OK', 'OK', 'OK', 'NONE'] },
      {
        label: 'Prometheus',
        cells: ['WARNING', 'CRITICAL', 'CRITICAL', 'OK', 'NONE'],
      },
      { label: 'Supervisor', cells: ['OK', 'OK', 'OK', 'OK', 'NONE'] },
      { label: 'Thanos', cells: ['OK', 'WARNING', 'OK', 'OK', 'NONE'] },
    ],
  },
  render: (args) => {
    const columns = Math.max(1, ...args.rows.map((row) => row.cells.length));
    const timeSlots = buildTimeSlots(HOUR_START, columns, FIVE_MINUTES);

    return (
      <Box maxWidth="60rem">
        <StatusHeatmap
          title="Monitoring Services Status"
          rows={args.rows}
          timeSlots={timeSlots}
          {...gridProps(args)}
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
    const timeSlots = buildTimeSlots(
      new Date('2026-08-25T10:30:00Z'),
      4,
      FIVE_MINUTES,
    );
    const rows = MONITORING_SERVICES.map((label) => ({
      label,
      cells: ['OK', 'OK', 'OK', 'NONE'] as CellStatus[],
    }));

    return (
      <Box maxWidth="60rem">
        <StatusHeatmap
          title="Monitoring Services Status"
          rows={rows}
          timeSlots={timeSlots}
          {...gridProps(args)}
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
    const timeSlots = buildTimeSlots(HOUR_START, 12, FIVE_MINUTES);
    const rows = buildStatusRows(MONITORING_SERVICES, 12, 10);

    return (
      <Box maxWidth="60rem">
        <StatusHeatmap
          title="Monitoring Services Status — last hour"
          rows={rows}
          timeSlots={timeSlots}
          {...gridProps(args)}
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
    columnGap: 1,
    labelEvery: 6,
    labelWidth: '9rem',
  },
  render: (args) => {
    const timeSlots = buildTimeSlots(
      DAY_START,
      args.columns,
      ONE_DAY / args.columns,
    );
    const rows = buildStatusRows(
      entityLabels(args.entities),
      args.columns,
      args.columns - args.noDataColumns,
    );

    return (
      <Box maxWidth="75rem">
        <StatusHeatmap
          title="Node health — last 24 hours"
          rows={rows}
          timeSlots={timeSlots}
          {...gridProps(args)}
        />
      </Box>
    );
  },
};

/** Continuous values instead of statuses: opacity ramp + gradient scale. */
export const NumericValues: StoryObj<
  Omit<GeneratedArgs, 'noDataColumns'> & { minOpacity: number }
> = {
  argTypes: {
    ...layoutArgTypes,
    entities: { control: { type: 'range', min: 1, max: 24, step: 1 } },
    columns: { control: { type: 'range', min: 2, max: 48, step: 1 } },
    minOpacity: {
      control: { type: 'range', min: 0, max: 0.6, step: 0.05 },
      description: 'Opacity floor, so the low values stay visible',
    },
  },
  args: {
    ...layoutArgs,
    entities: 6,
    columns: 24,
    labelEvery: 3,
    labelWidth: '9rem',
    minOpacity: 0.1,
  },
  render: (args) => {
    const timeSlots = buildTimeSlots(DAY_START, args.columns, ONE_HOUR);
    const rows = entityLabels(args.entities).map((label, rowIndex) => ({
      label,
      cells: Array.from({ length: args.columns }, (_, colIndex) =>
        Math.round(noise(rowIndex + 3, colIndex + 5)),
      ),
    }));

    return (
      <Box maxWidth="75rem">
        <NumericHeatmap
          title="CPU usage — last 24 hours"
          rows={rows}
          timeSlots={timeSlots}
          unit="%"
          minOpacity={args.minOpacity}
          labelEvery={args.labelEvery}
          labelWidth={args.labelWidth}
        />
      </Box>
    );
  },
};
