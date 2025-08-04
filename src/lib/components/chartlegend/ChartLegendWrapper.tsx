import { createContext, useContext, useState, ReactNode } from 'react';
import { ChartColors } from '../../style/theme';

export type ChartLegendState = {
  selectedResources: string[];
  addSelectedResource: (resource: string) => void;
  removeSelectedResource: (resource: string) => void;
  isSelected: (resource: string) => boolean;
  getColor: (resource: string) => string | undefined;
  listResources: () => string[];
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
    const color = colorSet[resource];
    if (!color) {
      console.warn(
        `ChartLegendWrapper: No color defined for resource "${resource}"`,
      );
      return undefined;
    }
    return color;
  };

  const listResources = () => {
    return Object.keys(colorSet);
  };

  const chartLegendState = {
    selectedResources,
    addSelectedResource,
    removeSelectedResource,
    isSelected,
    getColor,
    listResources,
  };

  return (
    <ChartLegendContext.Provider value={chartLegendState}>
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
