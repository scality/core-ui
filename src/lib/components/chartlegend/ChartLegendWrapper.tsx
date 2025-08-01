import { createContext, useContext, useState, ReactNode } from 'react';
import { chartColors, ChartColors } from '../../style/theme';

export type ChartLegendState = {
  selectedResources: string[];
  addSelectedResource: (resource: string) => void;
  removeSelectedResource: (resource: string) => void;
  isSelected: (resource: string) => boolean;
  getColor: (resource: string) => string | undefined;
};

const ChartLegendContext = createContext<ChartLegendState | null>(null);

export type ChartLegendWrapperProps = {
  children: ReactNode;
  colorSet: Record<string, ChartColors | string>;
};

export const ChartLegendWrapper = ({
  children,
  colorSet,
}: ChartLegendWrapperProps) => {
  const [selectedResources, setSelectedResources] = useState<string[]>([]);

  const addSelectedResource = (resource: string) => {
    setSelectedResources((prev) =>
      prev.includes(resource) ? prev : [...prev, resource],
    );
  };

  const removeSelectedResource = (resource: string) => {
    setSelectedResources((prev) => prev.filter((r) => r !== resource));
  };

  const isSelected = (resource: string) => {
    return selectedResources.includes(resource);
  };

  const getColor = (resource: string) => {
    const colorName = colorSet[resource];
    if (!colorName) return undefined;

    // Convert ChartColors to actual color values
    return chartColors[colorName as ChartColors] || (colorName as string);
  };

  const legendState: ChartLegendState = {
    selectedResources,
    addSelectedResource,
    removeSelectedResource,
    isSelected,
    getColor,
  };

  return (
    <ChartLegendContext.Provider value={legendState}>
      {children}
    </ChartLegendContext.Provider>
  );
};

// Hook for accessing legend state in custom components
export const useChartLegend = () => {
  const context = useContext(ChartLegendContext);
  if (!context) {
    throw new Error('useChartLegend must be used within a ChartLegendWrapper');
  }
  return context;
};
