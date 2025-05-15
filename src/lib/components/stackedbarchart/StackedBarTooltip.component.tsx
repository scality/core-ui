import { Text } from '../text/Text.component';
import { Stack, Wrap, spacing } from '../..';
import styled, { css } from 'styled-components';
import { TooltipProps } from 'recharts';
import { DataSchema } from './StackedBarChart.component';

export interface TooltipPayloadItem {
  name: string;
  value: number;
  dataKey: string;
  color?: string;
  payload: Record<string, number | string>;
}

export interface StackedBarTooltipProps
  extends Omit<TooltipProps<number, string>, 'payload'> {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
  hoveredValue?: string;
  yUnit?: string;
  dataSchema: DataSchema;
}

const TooltipText = styled(Text)<{ hoveredValue: boolean }>`
  ${({ theme, hoveredValue }) => css`
    color: ${hoveredValue ? theme.textPrimary : theme.textSecondary};
    font-weight: ${hoveredValue ? '900' : 'normal'};
  `}
`;

const TooltipContainer = styled.div`
  background-color: ${(props) => props.theme.backgroundLevel1};
  padding: ${spacing.r10};
  border-radius: ${spacing.r8};
  width: 150px;
  border: 1px solid ${(props) => props.theme.border};
  display: flex;
  flex-direction: column;
  gap: ${spacing.r10};
  align-items: center;
`;

const TooltipItem = styled(Wrap)`
  width: 100%;
`;

const StackedBarTooltip = (
  props: StackedBarTooltipProps,
): JSX.Element | null => {
  const { dataSchema, payload, active, hoveredValue, label, yUnit } = props;
  // Early return if no active tooltip or no payload
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <TooltipContainer>
      <Text color="textPrimary">{label}</Text>
      {payload && (
        <Stack direction="vertical" gap="r4" style={{ width: '100%' }}>
          {payload.map((item) => (
            <TooltipItem key={item.name} justifyContent="space-between">
              <TooltipText hoveredValue={hoveredValue === item.name}>
                {
                  dataSchema.yValues.find((value) => value.key === item.name)
                    ?.label
                }
              </TooltipText>
              <TooltipText hoveredValue={hoveredValue === item.name}>
                {`${item.value}${yUnit || ''}`}
              </TooltipText>
            </TooltipItem>
          ))}
        </Stack>
      )}
    </TooltipContainer>
  );
};

export default StackedBarTooltip;
