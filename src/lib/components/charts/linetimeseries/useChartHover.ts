import { useCallback, useId } from 'react';

/**
 * Module-level tracker to ensure only one chart tooltip is shown at a time
 * when multiple charts are synced via syncId.
 */
let currentlyHoveredChartId: string | null = null;

/**
 * Gets the currently hovered chart ID.
 * Called at tooltip render time to get the latest value.
 */
export function getCurrentlyHoveredChartId(): string | null {
  return currentlyHoveredChartId;
}

/**
 * Hook to manage chart hover state for tooltip display.
 * Ensures only one chart shows its tooltip at a time when using syncId.
 */
export function useChartHover() {
  const chartId = useId();

  const handleMouseEnter = useCallback(() => {
    currentlyHoveredChartId = chartId;
  }, [chartId]);

  const handleMouseLeave = useCallback(() => {
    if (currentlyHoveredChartId === chartId) {
      currentlyHoveredChartId = null;
    }
  }, [chartId]);

  return { handleMouseEnter, handleMouseLeave, chartId };
}
