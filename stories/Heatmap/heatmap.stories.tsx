import { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import styled, { useTheme } from 'styled-components';
import {
  Alert,
  Box,
  ChartLegend,
  ChartLegendWrapper,
  GlobalHealthBar,
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
 *  - `StatusHeatmap`    : Box (CSS grid) + Tooltip + ChartLegendWrapper/ChartLegend
 *  - `HealthBarHeatmap` : one GlobalHealthBar per row
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

const buildBuckets = (start: Date, count: number, step: number): Date[] =>
  Array.from({ length: count }, (_, i) => new Date(start.getTime() + i * step));

/** Deterministic pseudo-random so the stories stay stable between renders. */
const noise = (a: number, b: number) => (a * 73 + b * 151 + a * b * 17) % 100;

const buildStatusRows = (
  labels: string[],
  bucketCount: number,
  /** Index from which the whole column is reported as NONE (no data yet). */
  noDataFrom = bucketCount,
): HeatmapRow<CellStatus>[] =>
  labels.map((label, rowIndex) => ({
    label,
    cells: Array.from({ length: bucketCount }, (_, colIndex) => {
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
  buckets: Date[];
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
  buckets,
  labelEvery = 1,
  cellHeight = spacing.f20,
  columnGap = spacing.f4,
  labelWidth = '7rem',
}: StatusHeatmapProps) => {
  const { getColor, isSelected } = useChartLegend();

  return (
    <Box
      display="grid"
      gridTemplateColumns={`${labelWidth} repeat(${buckets.length}, minmax(0, 1fr))`}
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
                      value={buckets[colIndex]}
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
      {buckets.map((bucket, colIndex) => (
        <Box key={`tick-${colIndex}`} textAlign="center" pt={spacing.f4}>
          {colIndex % labelEvery === 0 && (
            <Text variant="Smaller" color="textSecondary">
              <FormattedDateTime format="time" value={bucket} />
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
/*                    RECIPE 2 — one GlobalHealthBar per row                  */
/* -------------------------------------------------------------------------- */

const SEVERITY_BY_STATUS: Record<CellStatus, Alert['severity'] | null> = {
  // OK needs no alert: the GlobalHealthBar background bar is already healthy
  OK: null,
  WARNING: 'warning',
  CRITICAL: 'critical',
  NONE: 'unavailable',
};

const statusRowToAlerts = (
  row: HeatmapRow<CellStatus>,
  buckets: Date[],
  step: number,
): Alert[] =>
  row.cells.flatMap((status, colIndex) => {
    const severity = SEVERITY_BY_STATUS[status];
    if (!severity) return [];
    const bucketStart = buckets[colIndex];
    return [
      {
        key: `${row.label}-${colIndex}`,
        severity,
        description: `${row.label} — ${status}`,
        startsAt: bucketStart.toISOString(),
        endsAt: new Date(bucketStart.getTime() + step).toISOString(),
      },
    ];
  });

/**
 * GlobalHealthBar draws its own x-axis. On a stack of rows we keep only the
 * last one, and claw back the vertical space the hidden axes still occupy.
 */
const HealthBarCell = styled.div<{ $hideAxis: boolean }>`
  ${({ $hideAxis }) =>
    $hideAxis &&
    `
      .recharts-xAxis {
        visibility: hidden;
      }
      margin-bottom: -0.75rem;
    `}
`;

const HealthBarHeatmap = ({
  title,
  rows,
  buckets,
  step,
  start,
  end,
  labelWidth = '7rem',
}: {
  title: string;
  rows: HeatmapRow<CellStatus>[];
  buckets: Date[];
  step: number;
  start: Date;
  end: Date;
  labelWidth?: string;
}) => {
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
          <Box
            display="grid"
            gridTemplateColumns={`${labelWidth} minmax(0, 1fr)`}
            alignItems="center"
            flex="1"
          >
            {rows.map((row, rowIndex) => (
              <React.Fragment key={row.label}>
                <Box textAlign="right" pr={spacing.f8}>
                  <Text variant="Smaller" color="textSecondary">
                    {row.label}
                  </Text>
                </Box>
                <HealthBarCell $hideAxis={rowIndex !== rows.length - 1}>
                  <GlobalHealthBar
                    id={`healthmap-${row.label}`}
                    start={start}
                    end={end}
                    alerts={statusRowToAlerts(row, buckets, step)}
                  />
                </HealthBarCell>
              </React.Fragment>
            ))}
          </Box>
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
/*                    RECIPE 3 — continuous (numeric) heatmap                 */
/* -------------------------------------------------------------------------- */

const NumericHeatmap = ({
  title,
  rows,
  buckets,
  unit,
  labelEvery = 1,
  labelWidth = '7rem',
}: {
  title: string;
  rows: HeatmapRow<number>[];
  buckets: Date[];
  unit: string;
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
          gridTemplateColumns={`${labelWidth} repeat(${buckets.length}, minmax(0, 1fr))`}
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
                          value={buckets[colIndex]}
                        />
                      </Text>
                      <Text variant="Smaller">{`${value} ${unit}`}</Text>
                    </Stack>
                  }
                >
                  <Cell
                    $color={`rgba(${theme.statusHealthyRGB}, ${(
                      0.1 +
                      0.9 * (value / max)
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
          {buckets.map((bucket, colIndex) => (
            <Box key={`tick-${colIndex}`} textAlign="center" pt={spacing.f4}>
              {colIndex % labelEvery === 0 && (
                <Text variant="Smaller" color="textSecondary">
                  <FormattedDateTime format="time" value={bucket} />
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
                background: `linear-gradient(to top, rgba(${theme.statusHealthyRGB}, 0.1), rgba(${theme.statusHealthyRGB}, 1))`,
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

const meta: Meta = {
  title: 'Components/Data Display/Charts/Heatmap (composition)',
};
export default meta;

type Story = StoryObj;

const HOUR_START = new Date('2026-08-25T10:00:00Z');
const DAY_START = new Date('2026-08-25T00:00:00Z');

/**
 * 1:1 with the reference screenshot: 5 services, 4 buckets, the last column
 * has no data yet.
 */
export const ScreenshotEquivalent: Story = {
  render: () => {
    const buckets = buildBuckets(
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
          buckets={buckets}
        />
      </Box>
    );
  },
};

/** Realistic mix over one hour, 5-minute buckets, label every 15 minutes. */
export const ServiceStatusOverOneHour: Story = {
  render: () => {
    const buckets = buildBuckets(HOUR_START, 12, FIVE_MINUTES);
    const rows = buildStatusRows(MONITORING_SERVICES, 12, 10);

    return (
      <Box maxWidth="60rem">
        <StatusHeatmap
          title="Monitoring Services Status — last hour"
          rows={rows}
          buckets={buckets}
          labelEvery={3}
        />
      </Box>
    );
  },
};

/**
 * Same data, rendered as one GlobalHealthBar per row: continuous timeline,
 * and you get the existing tooltip + keyboard navigation for free.
 */
export const AsGlobalHealthBarRows: Story = {
  render: () => {
    const buckets = buildBuckets(HOUR_START, 12, FIVE_MINUTES);
    const rows = buildStatusRows(MONITORING_SERVICES, 12, 10);

    return (
      <Box maxWidth="60rem">
        <HealthBarHeatmap
          title="Monitoring Services Status — last hour"
          rows={rows}
          buckets={buckets}
          step={FIVE_MINUTES}
          start={HOUR_START}
          end={new Date(HOUR_START.getTime() + ONE_HOUR)}
        />
      </Box>
    );
  },
};

/** Dense grid: 8 nodes x 48 buckets of 30 minutes over 24 hours. */
export const DenseGrid: Story = {
  render: () => {
    const buckets = buildBuckets(DAY_START, 48, ONE_DAY / 48);
    const nodes = Array.from({ length: 8 }, (_, i) => `storage-node-${i + 1}`);
    const rows = buildStatusRows(nodes, 48, 45);

    return (
      <Box maxWidth="75rem">
        <StatusHeatmap
          title="Node health — last 24 hours"
          rows={rows}
          buckets={buckets}
          labelEvery={6}
          columnGap={spacing.f1}
          cellHeight={spacing.f16}
          labelWidth="9rem"
        />
      </Box>
    );
  },
};

/** Continuous values instead of statuses: opacity ramp + gradient scale. */
export const NumericValues: Story = {
  render: () => {
    const buckets = buildBuckets(DAY_START, 24, ONE_HOUR);
    const rows = Array.from({ length: 6 }, (_, rowIndex) => ({
      label: `storage-node-${rowIndex + 1}`,
      cells: Array.from({ length: 24 }, (_, colIndex) =>
        Math.round(noise(rowIndex + 3, colIndex + 5)),
      ),
    }));

    return (
      <Box maxWidth="75rem">
        <NumericHeatmap
          title="CPU usage — last 24 hours"
          rows={rows}
          buckets={buckets}
          unit="%"
          labelEvery={3}
          labelWidth="9rem"
        />
      </Box>
    );
  },
};
