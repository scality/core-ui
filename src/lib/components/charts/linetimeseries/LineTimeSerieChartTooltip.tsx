import React from 'react';
import { LegendShape } from '../legend/ChartLegend';
import {
  ChartTooltipHeader,
  ChartTooltipItem,
  ChartTooltipItemsContainer,
  ChartTooltipPortal,
  ChartTooltipSeparator,
  TooltipHeader,
} from '../common/ChartTooltip';
import { LineTimeSerieChartTooltipProps } from './LineTimeSerieChart.types';
import { getCurrentlyHoveredChartId } from './useChartHover';

/**
 * Formats a numeric value for tooltip display
 * - Non-finite values (NaN, null, undefined) → "-"
 * - Zero → "0" with unit
 * - Very small values (< 0.01) → "< 0.01" with unit
 * - Normal values → 2 decimal places with unit
 */
export const formatTooltipValue = (
  value: number,
  unitLabel?: string,
): string => {
  if (!Number.isFinite(value)) return '-';
  if (value === 0) return `0${unitLabel ? ` ${unitLabel}` : ''}`;
  const absValue = Math.abs(value);
  if (absValue > 0 && absValue < 0.01) {
    const sign = value < 0 ? '-' : '';
    return `${sign}< 0.01${unitLabel ? ` ${unitLabel}` : ''}`;
  }
  return `${value.toFixed(2)}${unitLabel ? ` ${unitLabel}` : ''}`;
};

/**
 * Custom tooltip component for LineTimeSerieChart
 * Handles sorting, separator placement for symmetrical charts, and value formatting
 */
export const LineTimeSerieChartTooltip: React.FC<
  LineTimeSerieChartTooltipProps
> = ({
  unitLabel,
  duration,
  tooltipProps,
  renderTooltip,
  isSymmetrical,
  belowSeriesLabels,
  chartContainerRef,
  chartId,
  isChartHovered,
}) => {
    const { active, payload, label, coordinate } = tooltipProps;

    // Check at call time if this chart is the currently hovered one
    // This ensures we always have the latest value, not a stale render-time value
    const isActiveChart = isChartHovered && getCurrentlyHoveredChartId() === chartId;

    if (!active || !payload || !payload.length || !label || !isActiveChart)
      return null;

    const tooltipContent = renderTooltip ? (
      renderTooltip(tooltipProps, unitLabel, duration)
    ) : (
      <>
        <ChartTooltipHeader>
          <TooltipHeader duration={duration} value={label} />
        </ChartTooltipHeader>
        <ChartTooltipItemsContainer>
          {(() => {
            // Sort payload: above series first (descending), then below series (ascending by absolute value)
            const sortedPayload = [...payload].sort((a, b) => {
              const aIsBelow = belowSeriesLabels?.has(a.name) ?? false;
              const bIsBelow = belowSeriesLabels?.has(b.name) ?? false;

              // Above series come before below series
              if (aIsBelow !== bIsBelow) {
                return aIsBelow ? 1 : -1;
              }

              // Within the same group:
              // - Above series: higher values first (descending)
              // - Below series: higher absolute values last (ascending)
              if (aIsBelow) {
                return Math.abs(a.value) - Math.abs(b.value);
              }
              return Math.abs(b.value) - Math.abs(a.value);
            });

            // Find the transition point between above and below series
            const separatorIndex = sortedPayload.findIndex((entry) =>
              belowSeriesLabels?.has(entry.name),
            );
            const hasBothAboveAndBelow =
              isSymmetrical &&
              belowSeriesLabels &&
              belowSeriesLabels.size > 0 &&
              separatorIndex > 0 &&
              separatorIndex < sortedPayload.length;

            return sortedPayload.map((entry, index) => {
              const legendIcon = (
                <LegendShape
                  color={entry.color}
                  shape="line"
                  chartColors={{ [entry.color]: entry.color }}
                />
              );

              const formattedValue = formatTooltipValue(entry.value, unitLabel);

              return (
                <React.Fragment key={index}>
                  {/* Add separator between above and below series for symmetrical charts */}
                  {hasBothAboveAndBelow && index === separatorIndex && (
                    <ChartTooltipSeparator />
                  )}
                  <ChartTooltipItem
                    label={entry.name}
                    value={formattedValue}
                    legendIcon={legendIcon}
                  />
                </React.Fragment>
              );
            });
          })()}
        </ChartTooltipItemsContainer>
      </>
    );

    return (
      <ChartTooltipPortal
        coordinate={coordinate}
        chartContainerRef={chartContainerRef}
        isVisible={active && isActiveChart}
      >
        {tooltipContent}
      </ChartTooltipPortal>
    );
  };
