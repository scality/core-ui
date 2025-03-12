import { createContext, ReactNode, useContext, useState } from 'react';

// The context for the chart synchronization.
// The activeChartId indicates the current hover chart, and ONLY the tooltip of the current active chart will be shown.
const ChartSyncedCursorContext = createContext<{
  syncId?: string;
  activeChartId: string | null;
  setActiveChartId: (id: string | null) => void;
}>({
  syncId: undefined,
  activeChartId: null,
  setActiveChartId: () => {},
});

export const useChartSyncedCursor = () => {
  const context = useContext(ChartSyncedCursorContext);
  if (!context) {
    throw new Error(
      'useChartSyncedCursor must be used within a ChartSyncCursorProvider',
    );
  }
  return context;
};

export function ChartSyncCursorProvider({
  children,
  syncId,
}: {
  children: ReactNode;
  syncId?: string;
}) {
  const [activeChartId, setActiveChartId] = useState<string | null>(null);

  return (
    <ChartSyncedCursorContext.Provider
      value={{ syncId, activeChartId, setActiveChartId }}
    >
      {children}
    </ChartSyncedCursorContext.Provider>
  );
}
