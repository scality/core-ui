import React, { useCallback, useRef } from 'react';
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  Tooltip,
  TooltipContentProps,
  XAxis,
  YAxis,
} from 'recharts';
import styled, { useTheme } from 'styled-components';
import { fontSize } from '../../../style/theme';
import { ChartHeader, StyledResponsiveContainer } from '../common/SharedComponents';
import { formatTickValue, getTicks } from '../common/chartUtils';
import { formatXAxisLabel } from './LineTimeSerieChart.utils';
import { LineChartProps, CHART_PRESETS } from './LineTimeSerieChart.types';
import { LineTimeSerieChartTooltip } from './LineTimeSerieChartTooltip';
import { useChartHover } from './useChartHover';
import { useChartData } from './useChartData';

const LineTemporalChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

/**
 * LineTimeSerieChart - A time series line chart component
 *
 * @param series - The data series to display (can be symmetrical with above/below)
 * @param title - The title of the chart
 * @param height - The height of the chart in pixels
 * @param startingTimeStamp - Starting timestamp in seconds
 * @param interval - Interval between data points in seconds
 * @param duration - Total duration of the chart in seconds
 * @param unitRange - Configuration for automatic unit scaling
 * @param syncId - ID to synchronize multiple charts
 * @param isLoading - Whether to show loading state
 * @param yAxisType - Type of Y-axis: 'default', 'percentage', or 'symmetrical'
 * @param yAxisTitle - Label for the Y-axis
 * @param helpText - Help text shown as tooltip
 * @param renderTooltip - Custom tooltip renderer
 */
export function LineTimeSerieChart({
  series,
  title,
  height,
  startingTimeStamp,
  interval,
  duration,
  unitRange,
  isLoading = false,
  yAxisType = 'default',
  yAxisTitle,
  helpText,
  rightTitle,
  displayPreset = 'default',
  displayOptions,
  syncId,
  renderTooltip,
}: LineChartProps) {
  const presetOptions = CHART_PRESETS[displayPreset];
  const resolvedNoBackground = displayOptions?.noBackground ?? presetOptions.noBackground;
  const resolvedShowHorizontalGridLines = displayOptions?.showHorizontalGridLines ?? presetOptions.showHorizontalGridLines;
  const resolvedNoHeader = displayOptions?.noHeader ?? presetOptions.noHeader;
  const resolvedNoYAxisLine = displayOptions?.noYAxisLine ?? presetOptions.noYAxisLine;
  const resolvedNoTickLine = displayOptions?.noTickLine ?? presetOptions.noTickLine;

  const theme = useTheme();
  const chartRef = useRef(null);

  // Hover state management for tooltip display
  const { handleMouseEnter, handleMouseLeave, chartId } = useChartHover();

  // Process chart data
  const {
    rechartsData,
    topDomain,
    topValue,
    unitLabel,
    xAxisTicks,
    linesToRender,
    belowSeriesLabels,
  } = useChartData({
    series,
    startingTimeStamp,
    duration,
    interval,
    yAxisType,
    unitRange,
  });

  // Format X-axis labels based on duration
  const formatXAxisLabelCallback = useCallback(
    (timestamp: number) => formatXAxisLabel(timestamp, duration),
    [duration],
  );

  // Format Y-axis tick values
  const tickFormatter = useCallback(
    (value: number) => formatTickValue(value, topValue),
    [topValue],
  );

  return (
    <LineTemporalChartWrapper>
      {!resolvedNoHeader && (
        <ChartHeader
          title={`${title}${unitLabel ? ` (${unitLabel})` : ''}`}
          helpTooltip={helpText}
          isLoading={isLoading}
          rightTitle={rightTitle}
        />
      )}

      <StyledResponsiveContainer width="100%" height={height}>
        <ComposedChart
          ref={chartRef}
          data={rechartsData}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          aria-label={`Time series chart for ${title}`}
          syncId={syncId}
          accessibilityLayer
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Gradient definitions for series with withGradient */}
          <defs>
            {linesToRender.filter((l) => l.withGradient).map((line) => (
              <linearGradient
                key={`${title}-${line.key}`}
                id={`gradient-${chartId}-${line.key}`}
                x1="0" y1="0" x2="0" y2="1"
              >
                <stop offset="5%" stopColor={line.stroke} stopOpacity={0.18} />
                <stop offset="95%" stopColor={line.stroke} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>

          <CartesianGrid
            vertical={false}
            horizontal={resolvedShowHorizontalGridLines}
            stroke={theme.border}
            strokeOpacity={0.4}
            syncWithTicks={true}
            fill={resolvedNoBackground ? 'transparent' : theme.backgroundLevel4}
          />
          <XAxis
            dataKey="timestamp"
            type="number"
            domain={['dataMin', 'dataMax']}
            ticks={xAxisTicks}
            tickFormatter={formatXAxisLabelCallback}
            tickCount={5}
            tick={{
              fill: theme.textSecondary,
              fontSize: fontSize.smaller,
            }}
            axisLine={{ stroke: theme.border }}
          />
          <YAxis
            orientation="right"
            label={{
              value: yAxisTitle,
              angle: 90,
              dx: 20,
              style: {
                fill: theme.textSecondary,
                fontSize: fontSize.smaller,
              },
            }}
            domain={
              yAxisType === 'symmetrical'
                ? [-topDomain, topDomain]
                : [0, topDomain]
            }
            allowDataOverflow={true}
            axisLine={resolvedNoYAxisLine ? false : { stroke: theme.border }}
            tickLine={resolvedNoTickLine ? false : { stroke: theme.border }}
            tick={{
              fill: theme.textSecondary,
              fontSize: fontSize.smaller,
            }}
            tickFormatter={tickFormatter}
            ticks={getTicks(topValue, yAxisType === 'symmetrical')}
            interval={0}
          />
          <Tooltip
            content={(props: TooltipContentProps<number, string>) => (
              <LineTimeSerieChartTooltip
                unitLabel={unitLabel}
                duration={duration}
                renderTooltip={renderTooltip}
                isSymmetrical={yAxisType === 'symmetrical'}
                belowSeriesLabels={belowSeriesLabels}
                tooltipProps={props}
                chartContainerRef={chartRef}
                chartId={chartId}
              />
            )}
          />
          {/* Horizontal reference line at y=0 for symmetrical charts */}
          {yAxisType === 'symmetrical' && (
            <ReferenceLine y={0} stroke={theme.border} />
          )}

          {/* Chart lines — Area for gradient series, Line otherwise */}
          {linesToRender.map((line) =>
            line.withGradient ? (
              <Area
                key={`${title}-${line.key}`}
                type="monotone"
                dataKey={line.dataKey}
                stroke={line.stroke}
                strokeWidth={1.5}
                fill={`url(#gradient-${chartId}-${line.key})`}
                fillOpacity={1}
                dot={false}
                isAnimationActive={false}
              />
            ) : (
              <Line
                key={`${title}-${line.key}`}
                type="monotone"
                dataKey={line.dataKey}
                stroke={line.stroke}
                dot={false}
                isAnimationActive={false}
                strokeDasharray={line.strokeDasharray}
              />
            )
          )}
        </ComposedChart>
      </StyledResponsiveContainer>
    </LineTemporalChartWrapper >
  );
}
