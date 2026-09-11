import { ReactNode } from 'react';
import { Box } from '../../box/Box';
import { spacing, Stack } from '../../../spacing';
import { Text } from '../../text/Text.component';
import { DEFAULT_MIN_OPACITY } from './Heatmap.utils';

export type HeatmapGradientScaleProps = {
  /** The ramped color, same RGB triple the heatmap's continuous scale got. */
  colorRGB: string;
  /** Top of the domain — `getHeatmapMaxValue(rows)` when the data sets it. */
  max: number;
  min?: number;
  minOpacity?: number;
  /** What is being measured: a unit, a metric name. */
  label?: ReactNode;
  height?: string;
  formatValue?: (value: number) => ReactNode;
};

/**
 * The legend of a continuous `Heatmap`: `ChartLegend` enumerates discrete
 * series, a ramp has no items to enumerate — only its two ends.
 *
 * Placed by the caller, like `ChartLegend`, so the same component serves a
 * heatmap standing beside its scale and one sharing a scale with its siblings.
 * It takes the domain rather than the data: the numbers it prints have to be
 * the ones the grid ramped against, so they come from the same place.
 */
export const HeatmapGradientScale = ({
  colorRGB,
  max,
  min = 0,
  minOpacity = DEFAULT_MIN_OPACITY,
  label,
  height = '6rem',
  formatValue = (value) => String(value),
}: HeatmapGradientScaleProps) => (
  <Stack direction="vertical" gap="r8">
    {label !== undefined && (
      <Text variant="Smaller" isEmphazed>
        {label}
      </Text>
    )}
    <Stack direction="horizontal" gap="r8">
      <Box
        width={spacing.f12}
        height={height}
        borderRadius={spacing.f2}
        style={{
          background: `linear-gradient(to top, rgba(${colorRGB}, ${minOpacity}), rgba(${colorRGB}, 1))`,
        }}
      />
      {/* the same height as the bar, so the two ends line up with the ramp
          rather than collapsing to the height of the two labels */}
      <Box
        height={height}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Text variant="Smaller" color="textSecondary">
          {formatValue(max)}
        </Text>
        <Text variant="Smaller" color="textSecondary">
          {formatValue(min)}
        </Text>
      </Box>
    </Stack>
  </Stack>
);
