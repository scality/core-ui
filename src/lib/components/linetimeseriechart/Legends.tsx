import styled from 'styled-components';
import { useChartColor } from './ChartColorProvider';
import { useChartLegend } from './ChartLegendProvider';
import { Text } from '../text/Text.component';

// Container for the entire legends section
const LegendsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
`;

// Container for the legend items
const LegendItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 8px;
`;

// Individual legend item
const LegendItem = styled.div<{ isFocused: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  opacity: ${(props) => (props.isFocused ? 1 : 0.5)};
`;

// Dot marker for legend
const DotMarker = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
`;

// Line marker for legend
const LineMarker = styled.div<{ color: string }>`
  width: 16px;
  height: 2px;
  background-color: ${(props) => props.color};
`;

// Statistics table
const StatsTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  font-size: 12px;
  margin-top: 8px;
`;

const StatsHeader = styled.th`
  text-align: right;
  font-weight: bold;
  padding: 2px 8px;
`;

const ResourceHeader = styled.th`
  text-align: left;
  font-weight: bold;
  padding: 2px 8px;
`;

const StatsCell = styled.td`
  text-align: right;
  padding: 2px 8px;
`;

const ResourceCell = styled.td<{ color: string }>`
  text-align: left;
  padding: 2px 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  &::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 2px;
    background-color: ${(props) => props.color};
  }
`;

type LegendsProps = {
  type?: 'dot' | 'line';
  showStatistics?: boolean;
};

export function LineTimeSerieLegends({
  type = 'line',
  showStatistics = true,
}: LegendsProps) {
  const { resourceColorMapping } = useChartColor();
  const { focusedResource, setFocusedResource, resourceStatistics } =
    useChartLegend();

  const resources = Array.from(resourceColorMapping.keys());
  const hasStatistics =
    showStatistics && Object.keys(resourceStatistics).length > 0;

  const handleResourceClick = (resource: string) => {
    setFocusedResource(focusedResource === resource ? null : resource);
  };

  return (
    <LegendsContainer>
      {/* Show either legend items or statistics table based on state */}
      {!showStatistics || !hasStatistics ? (
        <LegendItemsContainer>
          {resources.map((resource) => {
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
                <Text variant="Smaller">{resource}</Text>
              </LegendItem>
            );
          })}
        </LegendItemsContainer>
      ) : (
        <StatsTable>
          <thead>
            <tr>
              <ResourceHeader>
                <Text variant="Smaller" color="textSecondary">
                  NAME
                </Text>
              </ResourceHeader>
              <StatsHeader>
                <Text variant="Smaller" color="textSecondary">
                  MIN
                </Text>
              </StatsHeader>
              <StatsHeader>
                <Text variant="Smaller" color="textSecondary">
                  MEAN
                </Text>
              </StatsHeader>
              <StatsHeader>
                <Text variant="Smaller" color="textSecondary">
                  MAX
                </Text>
              </StatsHeader>
            </tr>
          </thead>
          <tbody>
            {Object.entries(resourceStatistics).map(([resource, stats]) => {
              // Skip if this resource isn't in the current filtered set
              if (focusedResource && focusedResource !== resource) return null;

              const color = resourceColorMapping.get(resource) || '';

              return (
                <tr key={resource}>
                  <ResourceCell
                    color={color}
                    onClick={() => handleResourceClick(resource)}
                  >
                    {resource}
                  </ResourceCell>
                  <StatsCell>{stats.min}</StatsCell>
                  <StatsCell>{stats.mean}</StatsCell>
                  <StatsCell>{stats.max}</StatsCell>
                </tr>
              );
            })}
          </tbody>
        </StatsTable>
      )}
    </LegendsContainer>
  );
}
