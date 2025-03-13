import { createContext, ReactNode, useContext, useState } from 'react';

export type ResourceStats = {
  min: string;
  mean: string;
  max: string;
};

type ChartLegendContextType = {
  focusedResource: string | null;
  setFocusedResource: (resource: string | null) => void;
  resourceStatistics: Record<string, ResourceStats>;
  setResourceStatistics: (statistics: Record<string, ResourceStats>) => void;
};

const ChartLegendContext = createContext<ChartLegendContextType>({
  focusedResource: null,
  setFocusedResource: () => {},
  resourceStatistics: {},
  setResourceStatistics: () => {},
});

export function useChartLegend() {
  const context = useContext(ChartLegendContext);
  if (!context) {
    throw new Error('useChartLegend must be used within a ChartLegendProvider');
  }
  return context;
}

export const ChartLegendProvider = ({ children }: { children: ReactNode }) => {
  const [focusedResource, setFocusedResource] = useState<string | null>(null);
  const [resourceStatistics, setResourceStatistics] = useState<
    Record<string, ResourceStats>
  >({});

  return (
    <ChartLegendContext.Provider
      value={{
        focusedResource,
        setFocusedResource,
        resourceStatistics,
        setResourceStatistics,
      }}
    >
      {children}
    </ChartLegendContext.Provider>
  );
};
