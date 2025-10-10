import { TooltipContentProps } from 'recharts';
import { LegendShape } from '../chartlegend/ChartLegend';
import {
  ChartTooltipContainer,
  ChartTooltipHeader,
  ChartTooltipItem,
  ChartTooltipItemsContainer,
  TooltipHeader,
} from '../charttooltip/ChartTooltip';
import {
  BarchartBars,
  BarchartTooltipFn,
  CategoryType,
  TimeType,
} from './Barchart.component';
import { getCurrentPoint } from './utils';

export const BarchartTooltip = <T extends BarchartBars>({
  type,
  tooltipProps,
  colorSet,
  hoveredValue,
  tooltip,
  unitLabel,
}: {
  type: TimeType | CategoryType;
  tooltipProps: TooltipContentProps<number, string>;
  colorSet?: Record<string, string>;
  hoveredValue: string | undefined;
  tooltip?: BarchartTooltipFn<T>;
  unitLabel?: string;
}) => {
  const { active } = tooltipProps;

  if (!active) {
    return null;
  }

  const currentPoint = getCurrentPoint(tooltipProps, hoveredValue);
  if (tooltip) {
    return tooltip(currentPoint);
  }
  const duration =
    type.type === 'time'
      ? type.timeRange.startDate.getTime() - type.timeRange.endDate.getTime()
      : 0;
  return (
    <ChartTooltipContainer>
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
              color={colorSet[value.label as keyof typeof colorSet]}
              shape="rectangle"
              chartColors={colorSet}
            />
          );

          const formattedValue = Number.isInteger(value.value)
            ? `${value.value}`
            : value.value.toFixed(2);
          const valueWithUnit = unitLabel
            ? `${formattedValue} ${unitLabel}`
            : formattedValue;
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
    </ChartTooltipContainer>
  );
};
