import { useState, createContext, useContext, useMemo, useCallback } from 'react';
export const SyncedCursorChartsContext = createContext<{
  cursorX: number;
  setCursorX: (cursorX: number) => void;
} | null>(null);
export const useCursorX = (): {
  cursorX: number;
  setCursorX: (cursorX: number) => void;
} | null => {
  const contextValue = useContext(SyncedCursorChartsContext);

  if (contextValue === null) {
    console.error("Can't use useCursorX() outside SyncedCursorCharts");
  }

  return contextValue;
};
export function SyncedCursorCharts({ children }: { children: JSX.Element }) {
  const [cursorX, setCursorX] = useState(0);

  const contextValue = useMemo(() => ({cursorX, setCursorX}), [cursorX]);

  return (
    <SyncedCursorChartsContext.Provider value={contextValue}>
      {children}
    </SyncedCursorChartsContext.Provider>
  );
}
