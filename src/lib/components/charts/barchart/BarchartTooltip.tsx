import { TooltipContentProps } from 'recharts';
import { LegendShape } from '../legend/ChartLegend';
import {
  ChartTooltipPortal,
  ChartTooltipHeader,
  ChartTooltipItem,
  ChartTooltipItemsContainer,
  TooltipHeader,
} from '../common/ChartTooltip';
import { BarchartBars, BarchartTooltipFn } from './Barchart';
import { CategoryType, TimeType, UnitRange } from '../types';
import { getCurrentPoint } from './Barchart.utils';
import { formatTooltipValueWithUnit } from '../common/chartUtils';

export const BarchartTooltip = <T extends BarchartBars>({
  type,
  tooltipProps,
  colorSet,
  hoveredValue,
  tooltip,
  unitLabel,
  unitRange,
  valueBase = 1,
  logZeroValue = null,
  chartContainerRef,
}: {
  type: TimeType | CategoryType;
  tooltipProps: TooltipContentProps<number, string>;
  colorSet?: Record<string, string>;
  hoveredValue: string | undefined;
  tooltip?: BarchartTooltipFn<T>;
  unitLabel?: string;
  unitRange?: UnitRange;
  valueBase?: number;
  /**
   * Where a measured zero was drawn, as a Y-axis value.
   *
   * A log axis has no position for `0`, so it reserves the decade below its
   * lowest and plots zeros there. This is that coordinate, so a tooltip can
   * report the `0` that was measured rather than where it was parked. `null`
   * when no slot was reserved.
   */
  logZeroValue?: number | null;
  chartContainerRef: React.RefObject<HTMLDivElement>;
}) => {
  const { active, coordinate } = tooltipProps;

  if (!active) {
    return null;
  }

  const currentPoint = getCurrentPoint(tooltipProps, hoveredValue, logZeroValue);

  const duration =
    type.type === 'time'
      ? type.timeRange.startDate.getTime() - type.timeRange.endDate.getTime()
      : 0;

  const tooltipContent = tooltip ? (
    tooltip(currentPoint)
  ) : (
    <>
      <ChartTooltipHeader>
        {type.type === 'time' ? (
          <TooltipHeader duration={duration} value={currentPoint.category} />
        ) : (
          currentPoint.category
        )}
      </ChartTooltipHeader>
      <ChartTooltipItemsContainer>
        {currentPoint.values.map((value) => {
          const legendIcon = colorSet && (
            <LegendShape
              $color={colorSet[value.label as keyof typeof colorSet]}
              $shape="rectangle"
              $chartColors={colorSet}
            />
          );

          const valueWithUnit = formatTooltipValueWithUnit(
            value.value,
            valueBase,
            unitRange,
            unitLabel,
            false,
          );
          return (
            <ChartTooltipItem
              key={value.label}
              label={value.label}
              value={valueWithUnit}
              isHovered={value.isHovered}
              legendIcon={legendIcon}
            />
          );
        })}
      </ChartTooltipItemsContainer>
    </>
  );

  return (
    <ChartTooltipPortal
      coordinate={coordinate}
      chartContainerRef={chartContainerRef}
      isVisible={active}
    >
      {tooltipContent}
    </ChartTooltipPortal>
  );
};
