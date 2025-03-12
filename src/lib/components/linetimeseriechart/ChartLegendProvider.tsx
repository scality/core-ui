import { createContext, ReactNode, useContext, useState } from 'react';

type FocusContextType = {
  focusedResource: string | null;
  setFocusedResource: (resource: string | null) => void;
};
const ChartLegendContext = createContext<FocusContextType>({
  focusedResource: null,
  setFocusedResource: () => {},
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
  return (
    <ChartLegendContext.Provider
      value={{
        focusedResource,
        setFocusedResource,
      }}
    >
      {children}
    </ChartLegendContext.Provider>
  );
};
