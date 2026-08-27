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
import {
  formatTooltipValueWithUnit,
  readLogPlottedValue,
} from '../common/chartUtils';

/**
 * Custom tooltip component for LineTimeSerieChart
 * Handles sorting, separator placement for symmetrical charts, and value formatting
 */
export const LineTimeSerieChartTooltip: React.FC<
  LineTimeSerieChartTooltipProps
> = ({
  unitLabel,
  valueBase = 1,
  unitRange,
  duration,
  tooltipProps,
  renderTooltip,
  isSymmetrical,
  logZeroValue = null,
  belowSeriesLabels,
  chartContainerRef,
  chartId,
}) => {
    const { active, payload, label, coordinate } = tooltipProps;

    // Check at render time if this chart is the currently hovered one
    // Using only the module-level variable avoids race conditions with React state updates
    const isActiveChart = getCurrentlyHoveredChartId() === chartId;

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
                  $color={entry.color}
                  $shape="line"
                  $chartColors={{ [entry.color]: entry.color }}
                />
              );

              const formattedValue = formatTooltipValueWithUnit(
                // A zero is plotted at the axis's reserved band so it can be
                // drawn; the tooltip has to report the 0 that was measured.
                readLogPlottedValue(entry.value, logZeroValue),
                valueBase,
                unitRange,
                unitLabel,
              );

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
