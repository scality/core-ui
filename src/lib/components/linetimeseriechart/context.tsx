import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { lineTimeSeriesColorRange } from '../../style/theme';

// The context for the chart synchronization.
const SyncedCursorChartContext = createContext<{ syncId?: string }>({
  syncId: undefined,
});

export const useSyncedCursorChart = () => {
  const context = useContext(SyncedCursorChartContext);
  if (!context) {
    throw new Error(
      'useSyncedCursorChart must be used within a SyncedCursorChartProvider',
    );
  }
  return context;
};

export function ChartSyncProvider({
  children,
  syncId,
}: {
  children: ReactNode;
  syncId?: string;
}) {
  return (
    <SyncedCursorChartContext.Provider value={{ syncId }}>
      {children}
    </SyncedCursorChartContext.Provider>
  );
}

type TooltipContextType = {
  activeChartId: string | null;
  setActiveChartId: (id: string | null) => void;
};

const ChartTooltipContext = createContext<TooltipContextType>({
  activeChartId: null,
  setActiveChartId: () => {},
});

export const useChartTooltip = () => {
  const context = useContext(ChartTooltipContext);
  if (!context) {
    throw new Error(
      'useChartTooltip must be used within a ChartTooltipProvider',
    );
  }
  return context;
};

export function ChartTooltipProvider({ children }: { children: ReactNode }) {
  const [activeChartId, setActiveChartId] = useState<string | null>(null);

  return (
    <ChartTooltipContext.Provider value={{ activeChartId, setActiveChartId }}>
      {children}
    </ChartTooltipContext.Provider>
  );
}

// Context for the color mapping of the resources.
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
