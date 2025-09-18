import {
  BarchartBars,
  BarchartTooltipFn,
  CategoryType,
  TimeType,
} from './Barchart.component';
import { FormattedDateTime } from '../date/FormattedDateTime';
import { TooltipContentProps } from 'recharts';
import { getCurrentPoint } from './utils';
import {
  ChartTooltipContainer,
  ChartTooltipItem,
  ChartTooltipHeader,
  ChartTooltipItemsContainer,
} from '../charttooltip/ChartTooltip';
import { LegendShape } from '../chartlegend/ChartLegend';

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

  return (
    <ChartTooltipContainer>
      <ChartTooltipHeader>
        {type.type === 'time' ? (
          <FormattedDateTime
            format={
              type.timeRange.interval < 24 * 60 * 60 * 1000
                ? 'day-month-abbreviated-hour-minute-second'
                : 'long-date-without-weekday'
            }
            value={new Date(currentPoint.category)}
          />
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
