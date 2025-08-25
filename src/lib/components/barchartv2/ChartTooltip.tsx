import styled from 'styled-components';
import { spacing, Stack, Wrap } from '../../spacing';
import { Text } from '../text/Text.component';
import { BarchartBars } from './Barchart.component';
import { fontSize, fontWeight } from '../../style/theme';
import { LegendShape } from '../chartlegend/ChartLegend';

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
  currentPoint,
  colorSet,
}: {
  type: 'time' | 'category';
  currentPoint: {
    category: string | number;
    values: { label: T[number]['label']; value: number; isHovered: boolean }[];
  };
  colorSet: Record<string, string>;
}) => {
  return (
    <ChartTooltipContainer>
      <Text isEmphazed>
        {type === 'time'
          ? new Date(currentPoint.category).toLocaleDateString('en-GB', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : currentPoint.category}
      </Text>
      <Stack direction="vertical" gap="r8" style={{ width: '100%' }}>
        {currentPoint.values.map((value) => {
          return (
            <Wrap key={value.label}>
              <ChartTooltipItem isHovered={value.isHovered}>
                <LegendShape
                  color={colorSet[value.label as keyof typeof colorSet]}
                  shape="rectangle"
                  chartColors={colorSet}
                />
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
