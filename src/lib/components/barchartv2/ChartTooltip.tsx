import styled from 'styled-components';
import { spacing, Stack, Wrap } from '../../spacing';
import { Text } from '../text/Text.component';
import {
  BarchartBars,
  BarchartTooltipFn,
  CategoryType,
  TimeType,
} from './Barchart.component';
import { fontSize, fontWeight } from '../../style/theme';
import { LegendShape } from '../chartlegend/ChartLegend';
import { FormattedDateTime } from '../date/FormattedDateTime';
import { TooltipContentProps } from 'recharts';
import { getCurrentPoint } from './utils';

export const ChartTooltipContainer = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1};
  padding: ${spacing.r4} ${spacing.r8};
  border-radius: 4px;
  width: max-content;
  max-width: 40rem;
  border: 1px solid ${({ theme }) => theme.border};
  display: flex;
  font-size: ${fontSize.small};
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

export const ChartTooltipItem = styled.div<{ isHovered: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: ${({ isHovered }) =>
    isHovered ? fontWeight.bold : fontWeight.base};
`;

export const ChartTooltip = <T extends BarchartBars>({
  type,
  tooltipProps,
  colorSet,
  hoveredValue,
  tooltip,
}: {
  type: TimeType | CategoryType;
  tooltipProps: TooltipContentProps<number, string>;
  colorSet?: Record<string, string>;
  hoveredValue: string | undefined;
  tooltip?: BarchartTooltipFn<T>;
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
      <Text isEmphazed>
        {type.type === 'time' ? (
          <>
            <FormattedDateTime
              format="long-date"
              value={new Date(currentPoint.category)}
            />{' '}
            {type.type === 'time' &&
              type.timeRange.interval < 24 * 60 * 60 * 1000 && (
                <FormattedDateTime
                  format="time"
                  value={new Date(currentPoint.category)}
                />
              )}
          </>
        ) : (
          currentPoint.category
        )}
      </Text>
      <Stack direction="vertical" gap="r8" style={{ width: '100%' }}>
        {currentPoint.values.map((value) => {
          return (
            <Wrap key={value.label} gap={spacing.r32}>
              <ChartTooltipItem isHovered={value.isHovered}>
                {colorSet && (
                  <LegendShape
                    color={colorSet[value.label as keyof typeof colorSet]}
                    shape="rectangle"
                    chartColors={colorSet}
                  />
                )}
                {value.label}
              </ChartTooltipItem>
              <ChartTooltipItem isHovered={value.isHovered}>
                {value.value}
              </ChartTooltipItem>
            </Wrap>
          );
        })}
      </Stack>
    </ChartTooltipContainer>
  );
};
