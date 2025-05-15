import styled from 'styled-components';
import { Icon } from '../icon/Icon.component';
import { Text } from '../text/Text.component';
import { spacing } from '../..';
import { DataSchema } from './StackedBarChart.component';
import { FocusVisibleStyle } from '../buttonv2/Buttonv2.component';

export type StackedBarLegendProps = {
  selectedLegend: string | undefined;
  setSelectedLegend: (selectedLegend: string | undefined) => void;
  dataToDisplay: DataSchema['yValues'];
};

const LegendContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${spacing.r10};
  width: 100%;
  height: fit-content;
`;

const LegendItem = styled.button<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: ${spacing.r10};
  cursor: pointer;
  background: none;
  border-radius: ${spacing.r8};
  border: ${(props) =>
    props.isSelected
      ? `1px solid ${props.theme.highlight}`
      : '1px solid transparent'};
  &:focus-visible {
    ${FocusVisibleStyle}
  }
`;

const StackedBarLegend = ({
  selectedLegend,
  setSelectedLegend,
  dataToDisplay,
}: StackedBarLegendProps) => {
  const handleLegendClick = (value: string) => {
    if (selectedLegend === value) {
      setSelectedLegend(undefined);
    } else {
      setSelectedLegend(value);
    }
  };

  return (
    <LegendContainer>
      {dataToDisplay.map((yValue) => {
        return (
          <LegendItem
            key={yValue.key}
            isSelected={selectedLegend === yValue.key}
            onClick={() => handleLegendClick(yValue.key)}
            aria-pressed={selectedLegend === yValue.key}
            aria-label={`${yValue.label || yValue.key} - ${
              selectedLegend === yValue.key ? 'selected' : 'not selected'
            }. Click to ${
              selectedLegend === yValue.key
                ? 'show all'
                : 'show only this series'
            }`}
          >
            <Icon name="Circle-health" color={yValue.color} size="lg" />
            <Text color="textPrimary">{yValue.label || yValue.key}</Text>
          </LegendItem>
        );
      })}
    </LegendContainer>
  );
};

export default StackedBarLegend;
