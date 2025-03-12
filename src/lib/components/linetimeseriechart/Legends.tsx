import styled from 'styled-components';
import { useChartColor } from './ChartColorProvider';
import { useChartLegend } from './ChartLegendProvider';
import { Text } from '../text/Text.component';

type LegendsProps = {
  type?: 'dot' | 'line';
};

const LegendsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 8px;
`;

const LegendItem = styled.div<{ isFocused: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  opacity: ${(props) => (props.isFocused ? 1 : 0.5)};
`;

const DotMarker = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
`;

const LineMarker = styled.div<{ color: string }>`
  width: 16px;
  height: 2px;
  background-color: ${(props) => props.color};
`;

export function LineTimeSerieLegends({ type = 'line' }: LegendsProps) {
  const { resourceColorMapping } = useChartColor();
  const { focusedResource, setFocusedResource } = useChartLegend();

  // Get resources directly from the color mapping
  const resources = Array.from(resourceColorMapping.keys());

  const handleResourceClick = (resource: string) => {
    setFocusedResource(focusedResource === resource ? null : resource);
  };

  return (
    <LegendsContainer>
      {resources.map((resource: string) => {
        const color = resourceColorMapping.get(resource) || '';
        const isFocused = !focusedResource || focusedResource === resource;

        return (
          <LegendItem
            key={resource}
            isFocused={isFocused}
            onClick={() => handleResourceClick(resource)}
          >
            {type === 'dot' ? (
              <DotMarker color={color} />
            ) : (
              <LineMarker color={color} />
            )}
            <Text variant={'Smaller'}>{resource}</Text>
          </LegendItem>
        );
      })}
    </LegendsContainer>
  );
}
