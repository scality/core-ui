import { createContext, ReactNode, useContext, useState } from 'react';

// For chart synchronization
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
