import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { lineTimeSeriesColorRange } from '../../style/theme';

// We want to make sure that the color is the same for the same resource name
// across different charts.
type ResourceColorMapping = Map<string, string>;

type ColorContextType = {
  resourceColorMapping: ResourceColorMapping;
  setResourceColorMapping: (resourceName: string) => void;
};

const ChartColorContext = createContext<ColorContextType>({
  resourceColorMapping: new Map(),
  setResourceColorMapping: () => {},
});

export function useChartColor() {
  const context = useContext(ChartColorContext);
  if (!context) {
    throw new Error('useChartColor must be used within a ChartColorProvider');
  }
  return context;
}

export function ChartColorProvider({ children }: { children: ReactNode }) {
  const [resourceColorMapping, setResourceColorMapping] = useState<
    Map<string, string>
  >(new Map());

  const setColorForResource = useCallback(
    (resource: string) => {
      if (!resourceColorMapping.has(resource)) {
        setResourceColorMapping((prevMapping) => {
          const colorIndex = prevMapping.size;
          return new Map(prevMapping).set(
            resource,
            lineTimeSeriesColorRange[colorIndex],
          );
        });
      }
    },
    [resourceColorMapping],
  );

  return (
    <ChartColorContext.Provider
      value={{
        resourceColorMapping,
        setResourceColorMapping: setColorForResource,
      }}
    >
      {children}
    </ChartColorContext.Provider>
  );
}
