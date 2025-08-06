import { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';
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

  const addSelectedResource = useCallback((resource: string) => {
    setSelectedResources((prev) =>
      prev.includes(resource) ? prev : [...prev, resource],
    );
  }, []);

  const removeSelectedResource = useCallback((resource: string) => {
    setSelectedResources((prev) => prev.filter((r) => r !== resource));
  }, []);

  const isSelected = useCallback((resource: string) => {
    return selectedResources.includes(resource);
  }, [selectedResources]);

  const getColor = useCallback((resource: string) => {
    const color = colorSet[resource];
    if (!color) {
      console.warn(
        `ChartLegendWrapper: No color defined for resource "${resource}"`,
      );
      return undefined;
    }
    return color;
  }, [colorSet]);

  const listResources = useCallback(() => {
    return Object.keys(colorSet);
  }, [colorSet]);

  const chartLegendState = useMemo(() => ({
    selectedResources,
    addSelectedResource,
    removeSelectedResource,
    isSelected,
    getColor,
    listResources,
  }), [
    selectedResources,
    addSelectedResource,
    removeSelectedResource,
    isSelected,
    getColor,
    listResources,
  ]);

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
