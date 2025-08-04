import styled from 'styled-components';
import { useChartLegend } from './ChartLegendWrapper';
import { Text } from '../text/Text.component';
import { chartColors } from '../../style/theme';

type ChartLegendProps = {
  shape: 'line' | 'rectangle';
  disabled?: boolean;
  direction?: 'horizontal' | 'vertical';
};

const Legend = styled.div<{ direction: 'horizontal' | 'vertical' }>`
  display: flex;
  flex-direction: ${({ direction }) =>
    direction === 'horizontal' ? 'row' : 'column'};
  gap: ${({ direction }) => (direction === 'horizontal' ? '16px' : '8px')};
  flex-wrap: wrap;
`;

const LegendItem = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const LegendShape = styled.div<{
  color?: string;
  shape: 'line' | 'rectangle';
  chartColors: Record<string, string>;
}>`
  ${({ shape, color, chartColors }) => {
    if (shape === 'line') {
      return `
        width: 20px;
        height: 2px;
        background-color: ${chartColors[color as keyof typeof chartColors] || color};
      `;
    } else if (shape === 'rectangle') {
      return `
        width: 12px;
        height: 12px;
        background-color: ${chartColors[color as keyof typeof chartColors] || color};
        border-radius: 2px;
      `;
    } else {
      console.error(
        'The shape is not valid. Please use "line" or "rectangle".',
      );
    }
  }}
`;

export const ChartLegend = ({
  shape,
  disabled = false,
  direction = 'horizontal',
}: ChartLegendProps) => {
  const { listResources, getColor } = useChartLegend();

  const resources = listResources();

  return (
    <Legend direction={direction}>
      {resources.map((resource) => {
        const color = getColor(resource);
        return (
          <LegendItem key={resource} disabled={disabled}>
            <LegendShape
              color={color}
              shape={shape}
              chartColors={chartColors}
            />
            <Text variant="Basic">{resource}</Text>
          </LegendItem>
        );
      })}
    </Legend>
  );
};
