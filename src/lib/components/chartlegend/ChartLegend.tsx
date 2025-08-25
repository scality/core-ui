import styled from 'styled-components';
import { useChartLegend } from './ChartLegendWrapper';
import { Text } from '../text/Text.component';
import { chartColors } from '../../style/theme';
import { useCallback } from 'react';

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

export const LegendItem = styled.div<{
  disabled?: boolean;
  selected?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ selected, disabled }) => (disabled ? 0.5 : selected ? 1 : 0.7)};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  }
`;

export const LegendShape = styled.div<{
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
  const {
    listResources,
    getColor,
    isSelected,
    addSelectedResource,
    removeSelectedResource,
  } = useChartLegend();

  const resources = listResources();

  const handleLegendClick = useCallback(
    (resource: string) => {
      if (disabled) return;

      if (isSelected(resource)) {
        removeSelectedResource(resource);
      } else {
        addSelectedResource(resource);
      }
    },
    [disabled, isSelected, addSelectedResource, removeSelectedResource],
  );

  return (
    <Legend direction={direction}>
      {resources.map((resource) => {
        const color = getColor(resource);
        const selected = isSelected(resource);

        return (
          <LegendItem
            key={resource}
            disabled={disabled}
            selected={selected}
            onClick={() => handleLegendClick(resource)}
          >
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
