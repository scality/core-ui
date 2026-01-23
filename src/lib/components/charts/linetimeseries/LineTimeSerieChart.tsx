import React, { useCallback, useRef } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  Tooltip,
  TooltipContentProps,
  XAxis,
  YAxis,
} from 'recharts';
import styled, { useTheme } from 'styled-components';
import { Stack } from '../../../spacing';
import { fontSize } from '../../../style/theme';
import { IconHelp } from '../../iconhelper/IconHelper';
import { Loader } from '../../loader/Loader.component';
import { ChartTitleText } from '../../text/Text.component';
import { StyledResponsiveContainer } from '../common/SharedComponents';
import { formatTickValue, getTicks, maxWidthTooltip } from '../common/chartUtils';
import { formatXAxisLabel } from './LineTimeSerieChart.utils';
import { LineChartProps } from './LineTimeSerieChart.types';
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
  syncId,
  renderTooltip,
}: LineChartProps) {
  const theme = useTheme();
  const chartRef = useRef<HTMLDivElement>(null);

  // Hover state management for tooltip display
  const { isChartHovered, handleMouseEnter, handleMouseLeave, chartId } =
    useChartHover();

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
      <Stack gap="r4">
        <ChartTitleText>
          {title} {unitLabel && `(${unitLabel})`}
        </ChartTitleText>
        {helpText && (
          <IconHelp tooltipMessage={helpText} overlayStyle={maxWidthTooltip} />
        )}
        {isLoading && <Loader />}
      </Stack>

      <div
        ref={chartRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <StyledResponsiveContainer width="100%" height={height}>
          <LineChart
            data={rechartsData}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            aria-label={`Time series chart for ${title}`}
            syncId={syncId}
            accessibilityLayer
          >
            <CartesianGrid
              vertical={true}
              horizontal={true}
              verticalPoints={[0]}
              horizontalPoints={[0]}
              stroke={theme.border}
              fill={theme.backgroundLevel4}
              strokeWidth={1}
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
              axisLine={{ stroke: theme.border }}
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
                  isChartHovered={isChartHovered}
                />
              )}
            />
            {/* Add horizontal line at y=0 for symmetrical charts */}
            {yAxisType === 'symmetrical' && (
              <ReferenceLine y={0} stroke={theme.border} />
            )}

            {/* Chart lines */}
            {linesToRender.map((line) => (
              <Line
                key={`${title}-${line.key}`}
                type="monotone"
                dataKey={line.dataKey}
                stroke={line.stroke}
                dot={false}
                isAnimationActive={false}
                strokeDasharray={line.strokeDasharray}
              />
            ))}
          </LineChart>
        </StyledResponsiveContainer>
      </div>
    </LineTemporalChartWrapper>
  );
}
